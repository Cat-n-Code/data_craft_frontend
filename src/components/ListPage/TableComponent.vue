<template>
  <DataTable
    :value="datasets"
    scrollable
    tableStyle="min-width: 50rem"
    class="mx-auto pt-5 p-10 rounded-xl h-[700px] cursor-pointer hover"
    scrollHeight="flex"
    @row-click="onRowClick"
  >
    <Column v-for="col in columns" :key="col.field" :field="col.field">
    </Column>
    <Column>
      <template v-slot:body>></template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { ref } from "vue";
import { useRouter } from "vue-router";

const datasets = ref([
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
  { number: 2, title: "Датасет 2", num_fields: 5, num_num: 8 },
]);

const columns = [
  { field: "number", header: "Порядковый номер" },
  { field: "title", header: "Название" },
  { field: "num_fields", header: "Количество полей" },
  { field: "num_num", header: "Количество записей" },
];

//const route = useRoute();
const router = useRouter();

function onRowClick(rowData: any) {
  console.log("Row clicked:", rowData);
  router.push({ name: "dataset_columns" });
}
</script>
