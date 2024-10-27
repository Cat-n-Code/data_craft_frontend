<template>
  <RouterView />
  <ConfirmDialog />
</template>

<style scoped></style>

<script setup lang="ts">
import ConfirmDialog from "primevue/confirmdialog";
import { onMounted } from "vue";
import { useDatasetsStore } from "./stores/datasets-store";

const datasetStore = useDatasetsStore();

onMounted(() => {
  datasetStore.preload();
});
</script>
