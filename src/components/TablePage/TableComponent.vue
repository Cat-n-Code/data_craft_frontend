<template>
  <DataTable
    :value="datasets"
    scrollable
    selectionMode="single"
    tableStyle="min-width: 50rem"
    class="mx-auto pt-5 pb-2 p-10 rounded-xl max-h-[500px]"
    scrollHeight="flex"
    @row-select="onRowSelect"
    @row-unselect="onRowUnselect"
  >
    <Column
      v-for="col in columns"
      :header="col.field"
      :key="col.field"
      :field="col.field"
      sortable
    >
    </Column>

    <Column>
      <template v-slot:body @onclick="del">del</template>
    </Column>
    <Column>
      <template v-slot:body>--</template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { ref } from "vue";
import { useRouter } from "vue-router";

const datasets = ref([
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
  { number: 1, title: "Датасет 1", num_fields: 3, num_num: 3, col_5: "smth" },
]);

const columns = Object.keys(datasets.value[0]).map((field) => ({
  field: field,
}));

const router = useRouter();
const onRowSelect = () => {};
const onRowUnselect = () => {};
const del = () => {};
</script>
