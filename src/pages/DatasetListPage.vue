<template>
  <MainContainer>
    <HeaderContainer :breadcrumb="[{ label: 'Таблицы' }]" />
    <ContentContainer>
      <div class="flex gap-4 justify-center">
        <Button label="Загрузить файл" severity="contrast" outlined />
        <Button label="Создать пустой" severity="contrast" outlined />
      </div>
      <div class="flex-grow block overflow-scroll relative">
        <DataTable
          :value="datasets"
          scrollable
          class="absolute w-full"
          @row-click="onRowClick"
        >
          <Column field="number" header="#"></Column>
          <Column field="number" header="Название"></Column>
        </DataTable>
      </div>
    </ContentContainer>
  </MainContainer>
</template>

<style scoped></style>

<script lang="ts" setup>
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import ContentContainer from "../components/core/ContentContainer.vue";
import HeaderContainer from "../components/core/HeaderComponent.vue";
import MainContainer from "../components/core/MainContainer.vue";

const router = useRouter();

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

function onRowClick(rowData: any) {
  console.log("Row clicked:", rowData);
  router.push({ name: "dataset_columns" });
}

watchEffect(() => {
  document.title = "Таблицы";
});
</script>
