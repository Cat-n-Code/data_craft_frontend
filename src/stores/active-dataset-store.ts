import { Dataset } from "data_craft_core";
import { defineStore } from "pinia";
import { computed, Ref, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { DatasetInfo, useDatasetsStore } from "./datasets-store";

export const useActiveDatasetStore = defineStore("activeDataset", () => {
  const route = useRoute();
  const datasetsStore = useDatasetsStore();
  const datasetId = computed(() => {
    let id = Number.parseInt(route.params.id as string);
    return isNaN(id) ? null : id;
  });
  const datasetInfo: Ref<DatasetInfo | null> = ref(null);
  const dataset: Ref<Dataset | null> = ref(null);

  watchEffect(async () => {
    if (datasetId.value == null) {
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

    let buf = new Uint8Array(await blob.arrayBuffer());

    dataset.value = Dataset.load_from_csv(buf);
  });

  return { datasetId, datasetInfo, dataset };
});
