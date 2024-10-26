<template>
  <RouterView />
  <Button @click="loadFile" />
</template>

<style scoped></style>

<script setup lang="ts">
import { Dataset } from "data_craft_core";
import Button from "primevue/button";
import { watchEffect } from "vue";
import { useDatasetStore } from "./stores/dataset-store";

const store = useDatasetStore();

async function loadFile() {
  await store.addFromFile();

  const d = store.datasets![store.datasets!.length - 1];
  let blob = await store.loadFile(d.id);

  const dataset = Dataset.load_from_csv(
    new Uint8Array(await blob!.arrayBuffer())
  );

  for (const f of dataset.fields()) {
    console.log(f.name(), f.date_type(), f.is_required());
  }
}

watchEffect(async () => {
  await store.load();
});
</script>
