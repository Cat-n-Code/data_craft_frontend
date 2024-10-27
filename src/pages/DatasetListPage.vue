<template>
  <MainContainer>
    <HeaderContainer :breadcrumb="[{ label: 'Таблицы' }]" />
    <ContentContainer>
      <div class="flex gap-4 justify-end">
        <Button
          label="Загрузить файл"
          severity="secondary"
          outlined
          icon-pos="right"
          @click="() => store.addFromFile()"
        >
          <template v-slot:icon>
            <IconUpload />
          </template>
        </Button>
        <Button
          label="Создать пустой"
          severity="secondary"
          outlined
          @click="() => store.addEmpty()"
        >
          <template v-slot:icon>
            <IconPlus />
          </template>
        </Button>
      </div>
      <DataTable
        :value="store.datasets"
        scrollable
        :loading="store.datasets == null"
        class="h-[70vh]"
        @row-click="
          (ev) => router.push({ path: `/datasets/${ev.data.id}/fields` })
        "
        scroll-height="flex"
        selection-mode="single"
      >
        <template #empty> Таблицы отсутствуют </template>
        <Column field="id" header="#"></Column>
        <Column field="name" header="Название"></Column>
        <Column field="fieldsCount" header="Кол-во полей"></Column>
        <Column field="rowsCount" header="Кол-во записей"></Column>
        <Column align-frozen="right">
          <template #body>
            <IconChevronRight class="text-gray-500 float-end me-4" />
          </template>
        </Column>
      </DataTable>
    </ContentContainer>
  </MainContainer>
</template>

<style scoped></style>

<script lang="ts" setup>
import { IconChevronRight, IconPlus, IconUpload } from "@tabler/icons-vue";
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import ContentContainer from "../components/core/ContentContainer.vue";
import HeaderContainer from "../components/core/HeaderComponent.vue";
import MainContainer from "../components/core/MainContainer.vue";
import { useDatasetsStore } from "../stores/datasets-store";

const router = useRouter();
const store = useDatasetsStore();

watchEffect(() => {
  document.title = "Таблицы";

  store.preload();
});
</script>
