<template>
  <RouterView />
</template>

<style scoped></style>

<script setup lang="ts">
import { onMounted } from "vue";
import { useDatasetsStore } from "./stores/datasets-store";

const datasetStore = useDatasetsStore();

onMounted(() => {
  datasetStore.preload();
});
</script>
