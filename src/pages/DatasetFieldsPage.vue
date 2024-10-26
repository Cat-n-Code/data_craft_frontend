<template>
  <MainContainer>
    <HeaderContainer
      :breadcrumb="[
        {
          label: 'Таблицы',
          command: () => {
            router.push({ name: 'datasets_list' });
          },
        },
        { label: store.datasetInfo?.name },
        { label: 'Типы данных' },
      ]"
    />
    <Toolbar />
    <ContentContainer>
      <div class="flex gap-4 justify-end">
        <Button
          label="Добавить столбец"
          severity="secondary"
          outlined
          @click="() => {}"
        >
          <template v-slot:icon>
            <IconPlus />
          </template>
        </Button>
      </div>
      <DataTable
        :value="fields"
        scrollable
        :loading="store.dataset == null"
        class="h-[70vh]"
        scroll-height="flex"
        edit-mode="row"
      >
        <template #empty> Столбцы отсутствуют </template>
        <Column field="index" header="#"></Column>
        <Column field="name" header="Название"></Column>
        <Column field="dataType" header="Тип данных"></Column>
        <Column header="Обязательное">
          <template #body="props">
            <Checkbox :model-value="props.data.isRequired" binary />
          </template>
        </Column>
        <Column>
          <template #body>
            <div class="flex justify-end gap-4">
              <Button
                class="size-10"
                severity="secondary"
                outlined
                @click="() => {}"
              >
                <template v-slot:icon>
                  <IconX />
                </template>
              </Button>
              <Button
                class="size-10"
                severity="secondary"
                outlined
                @click="() => {}"
              >
                <template v-slot:icon>
                  <IconEdit />
                </template>
              </Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </ContentContainer>
  </MainContainer>
</template>

<style scoped></style>

<script lang="ts" setup>
import { IconEdit, IconPlus, IconX } from "@tabler/icons-vue";
import { FieldType } from "data_craft_core";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { Ref, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import ContentContainer from "../components/core/ContentContainer.vue";
import HeaderContainer from "../components/core/HeaderComponent.vue";
import MainContainer from "../components/core/MainContainer.vue";
import Toolbar from "../components/core/ToolbarComponent.vue";
import { useActiveDatasetStore } from "../stores/active-dataset-store";

interface FieldInfo {
  index: number;
  name: string;
  dataType: string;
  isRequired: boolean;
}

const dataTypeNames = {
  [FieldType.Text]: "Текстовый",
  [FieldType.Integer]: "Целочисленный",
  [FieldType.Float]: "Числовой с плавающей запятой",
  [FieldType.Date]: "Дата",
  [FieldType.Time]: "Время",
  [FieldType.DateTime]: "Дата и время",
};

const router = useRouter();
const store = useActiveDatasetStore();

const fields: Ref<FieldInfo[] | null> = ref(null);

watchEffect(() => {
  document.title =
    store.datasetInfo == null ? "" : `${store.datasetInfo.name} - типы данных`;

  fields.value =
    store.dataset == null
      ? null
      : store.dataset.fields().map((info, index) => {
          return {
            index: index + 1,
            name: info.name(),
            dataType: dataTypeNames[info.date_type()],
            isRequired: info.is_required(),
          };
        });
});
</script>
