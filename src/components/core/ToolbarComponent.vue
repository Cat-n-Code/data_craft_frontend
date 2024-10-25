<template>
  <div class="md:container mx-auto p-4 rounded-xl flex gap-4 bg-surface-0">
    <Button
      label="Типы данных"
      :severity="route.name == 'dataset_columns' ? 'primary' : 'contrast'"
      :outlined="route.name != 'dataset_columns'"
      @click="router.push({ name: 'dataset_columns' })"
    />
    <Button
      label="Таблица"
      :severity="route.name == 'dataset_table' ? 'primary' : 'contrast'"
      :outlined="route.name != 'dataset_table'"
      @click="router.push({ name: 'dataset_table' })"
    />
    <Button
      label="Дашборды"
      :severity="route.name == 'dataset_dashboard' ? 'primary' : 'contrast'"
      :outlined="route.name != 'dataset_dashboard'"
      @click="router.push({ name: 'dataset_dashboard' })"
    />
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>
