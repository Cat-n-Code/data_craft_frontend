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
        :value="store.fields"
        scrollable
        :loading="store.dataset == null"
        class="h-[70vh]"
        scroll-height="flex"
        edit-mode="row"
      >
        <template #empty> Столбцы отсутствуют </template>
        <Column field="index" header="#"></Column>
        <Column field="name" header="Название"></Column>
        <Column field="dataTypeName" header="Тип данных"></Column>
        <Column header="Обязательное">
          <template #body="props">
            <Checkbox :model-value="props.data.isRequired" binary readonly />
          </template>
        </Column>
        <Column>
          <template #body="props">
            <div class="flex justify-end gap-4">
              <Button
                class="size-10"
                severity="secondary"
                outlined
                @click="() => onRemoveClick(props.index)"
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
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { useConfirm } from "primevue/useconfirm";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import ContentContainer from "../components/core/ContentContainer.vue";
import HeaderContainer from "../components/core/HeaderComponent.vue";
import MainContainer from "../components/core/MainContainer.vue";
import Toolbar from "../components/core/Navbar.vue";
import { useActiveDatasetStore } from "../stores/active-dataset-store";

const router = useRouter();
const store = useActiveDatasetStore();
const confirm = useConfirm();

function onRemoveClick(index: number) {
  console.log(index);
  confirm.require({
    header: "Удаление",
    message: `Вы уверены, что хотите удалить поле "${
      store.fields![index].name
    }"? Это действие необратимо.`,
    icon: "pi pi-exclamation-triangle",
    rejectProps: {
      label: "Отмена",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Удалить",
    },
    accept: () => {
      store.dataset?.remove_field(index);
    },
    reject: () => {},
  });
}

watchEffect(() => {
  document.title =
    store.datasetInfo == null ? "" : `${store.datasetInfo.name} - типы данных`;
});
</script>
