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
        { label: 'Дашборды' },
      ]"
    />
    <Navbar />
    <ContentContainer>
      <div class="flex gap-4 justify-end">
        <Button
          class="ai-gradient border-0"
          label="AI"
          severity="secondary"
          outlined
          @click="() => {}"
        >
          <template v-slot:icon>
            <IconSparkles />
          </template>
        </Button>
        <Button
          label="Сбросить"
          severity="secondary"
          outlined
          @click="() => {}"
        >
          <template v-slot:icon>
            <IconRotateClockwise />
          </template>
        </Button>
        <Button
          label="Сортировка"
          severity="secondary"
          outlined
          @click="() => {}"
        >
          <template v-slot:icon>
            <IconSortAscending />
          </template>
        </Button>
        <Button label="Экспорт" severity="secondary" outlined @click="() => {}">
          <template v-slot:icon>
            <IconFileExport />
          </template>
        </Button>
        <Button
          label="Добавить запись"
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
        scrollable
        :value="data"
        :loading="data == null"
        class="h-[60vh]"
        scroll-height="flex"
        edit-mode="row"
      >
        <template #empty> Записи отсутствуют </template>
        <Column v-for="field in store.fields">
          <template #header>
            <span
              class="w-full whitespace-nowrap p-2 border-surface-300 border rounded-md flex justify-center items-center"
            >
              <Checkbox class="mx-2" />
              <span>{{ field.name }}</span>
              <Button class="p-1 rounded-sm text-black" plain text>
                <IconFilter />
              </Button>
              <Button class="p-1 rounded-sm text-black" plain text>
                <IconMenu2 />
              </Button>
            </span>
          </template>
          <template #body="body">
            {{ body.data != null ? body.data[field.index - 1] ?? "-" : "-" }}
          </template>
        </Column>
        <Column frozen align-frozen="right">
          <template #body>
            <div class="flex flex-col justify-end gap-4">
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
      <Paginator
        v-model:first="rowsOffset"
        v-model:rows="rowsLimit"
        :rows-per-page-options="[10, 20, 50, 100]"
        :total-records="totalRows"
      ></Paginator>
    </ContentContainer>
  </MainContainer>
</template>

<script lang="ts" setup>
import {
  IconEdit,
  IconFileExport,
  IconFilter,
  IconMenu2,
  IconPlus,
  IconRotateClockwise,
  IconSortAscending,
  IconSparkles,
  IconX,
} from "@tabler/icons-vue";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Paginator from "primevue/paginator";
import { Ref, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import ContentContainer from "../components/core/ContentContainer.vue";
import HeaderContainer from "../components/core/HeaderComponent.vue";
import MainContainer from "../components/core/MainContainer.vue";
import Toolbar from "../components/core/ToolbarComponent.vue";
import ActiveButtons from "../components/TablePage/ActiveButtons.vue";
import Statistic from "../components/TablePage/Statistic.vue";
import Table from "../components/TablePage/TableComponent.vue";

const router = useRouter();
const store = useActiveDatasetStore();

const totalRows = ref(0);
const rowsOffset = ref(0);
const rowsLimit = ref(10);
const data: Ref<any[][] | null> = ref(null);

watchEffect(() => {
  document.title =
    store.datasetInfo == null ? "" : `${store.datasetInfo.name} - таблица`;
});

watchEffect(() => {
  if (store.dataset == null) {
    data.value = null;
    return;
  }
  totalRows.value = store.dataset.rows_count();
  data.value = store.dataset.slice(
    rowsOffset.value ?? 0,
    rowsOffset.value + rowsLimit.value ?? 0
  );
});
</script>
