import { Dataset, FieldType } from "data_craft_core";
import { defineStore } from "pinia";
import { computed, Ref, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { DatasetInfo, useDatasetsStore } from "./datasets-store";

export interface FieldInfo {
  index: number;
  name: string;
  dataTypeName: string;
  isRequired: boolean;
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
        dataTypeName: dataTypeNames[info.date_type()],
        isRequired: info.is_required(),
      };
    });
  });

  return { datasetId, datasetInfo, dataset, fields };
});
