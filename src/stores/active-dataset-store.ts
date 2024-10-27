import {
  Dataset,
  FieldType,
  FieldFilter as WasmFieldFilter,
} from "data_craft_core";
import { defineStore } from "pinia";
import { computed, reactive, Ref, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { DatasetInfo, useDatasetsStore } from "./datasets-store";

export interface FieldInfo {
  index: number;
  name: string;
  dataType: FieldType;
  dataTypeName: string;
  isRequired: boolean;
}

export interface FieldFilter {
  minValue?: number;
  maxValue?: number;
  pattern?: string;
  values?: any[];
}

const dataTypeNames = {
  [FieldType.Text]: "Текстовый",
  [FieldType.Integer]: "Целочисленный",
  [FieldType.Float]: "Числовой с плавающей запятой",
  [FieldType.Date]: "Дата",
  [FieldType.Time]: "Время",
  [FieldType.DateTime]: "Дата и время",
};

export const useActiveDatasetStore = defineStore("activeDataset", () => {
  const route = useRoute();
  const datasetsStore = useDatasetsStore();
  const datasetId = computed(() => {
    let id = Number.parseInt(route.params.id as string);
    return isNaN(id) ? null : id;
  });
  const datasetInfo: Ref<DatasetInfo | null> = ref(null);
  const dataset: Ref<Dataset | null> = ref(null);
  const fields: Ref<FieldInfo[] | null> = ref(null);
  const fieldsFilters = reactive<Map<number, FieldFilter>>(new Map());
  const filteredDataset = computed(() => {
    if (dataset.value == null) {
      return;
    }

    if (fieldsFilters.size == 0) {
      return dataset.value;
    }

    let filters = new Array<WasmFieldFilter>();
    for (let i = 0; i < fields.value!.length; ++i) {
      if (!fieldsFilters.has(i)) {
        filters.push(new WasmFieldFilter(undefined, undefined, [], ""));
        continue;
      }

      let f = fieldsFilters.get(i);

      filters.push(
        new WasmFieldFilter(
          f?.minValue,
          f?.maxValue,
          (f?.values as string[]) ?? [],
          f?.pattern ?? ""
        )
      );
    }

    return dataset.value != null ? dataset.value.filter_values(filters) : null;
  });

  watchEffect(async () => {
    if (datasetId.value == null) {
      datasetInfo.value = null;
      dataset.value = null;
      return;
    }

    datasetInfo.value = await datasetsStore.getById(datasetId.value);
    if (datasetInfo.value == null) {
      return;
    }

    let blob = await datasetsStore.loadFile(datasetId.value);
    if (blob == null) {
      return;
    }

    let buf: Uint8Array;
    try {
      buf = new Uint8Array(await blob.arrayBuffer());
    } catch {
      datasetInfo.value = null;
      dataset.value = null;
      return;
    }

    dataset.value = Dataset.load_from_csv(buf);
    fields.value = dataset.value.fields().map((info, index) => {
      return {
        index: index + 1,
        name: info.name(),
        dataType: info.date_type(),
        dataTypeName: dataTypeNames[info.date_type()],
        isRequired: info.is_required(),
      };
    });
  });

  return {
    datasetId,
    datasetInfo,
    dataset,
    filteredDataset,
    fields,
    fieldsFilters,
  };
});
