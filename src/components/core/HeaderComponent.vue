<template>
  <header class="flex justify-center bg-surface-0">
    <Breadcrumb :model="props.breadcrumb" />
  </header>
</template>

<script setup lang="ts">
import Breadcrumb from "primevue/breadcrumb";
import { MenuItem } from "primevue/menuitem";

const props = defineProps<{
  breadcrumb: MenuItem[];
}>();
</script>
