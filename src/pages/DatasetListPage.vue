<template>
  <MainContainer>
    <HeaderContainer :breadcrumb="[{ label: 'Таблицы' }]" />
    <ContentContainer>
      <div class="flex gap-4 justify-end">
        <Button
          label="Загрузить файл"
          severity="contrast"
          outlined
          icon-pos="right"
        >
          <template v-slot:icon>
            <IconUpload />
          </template>
        </Button>
        <Button label="Создать пустой" severity="contrast" outlined>
          <template v-slot:icon>
            <IconPlus />
          </template>
        </Button>
      </div>
      <div class="flex-grow block overflow-scroll relative">
        <DataTable
          :value="datasets"
          scrollable
          class="absolute w-full"
          @row-click="onRowClick"
          selection-mode="single"
        >
          <Column field="number" header="#"></Column>
          <Column field="title" header="Название"></Column>
          <Column field="num_fields" header="Кол-во полей"></Column>
          <Column field="num_num" header="Кол-во записей"></Column>
        </DataTable>
      </div>
    </ContentContainer>
  </MainContainer>
</template>

<style scoped></style>

<script lang="ts" setup>
import { IconPlus, IconUpload } from "@tabler/icons-vue";
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

function onRowClick(rowData: any) {
  console.log("Row clicked:", rowData);
  router.push({ name: "dataset_columns" });
}

watchEffect(() => {
  document.title = "Таблицы";
});
</script>
