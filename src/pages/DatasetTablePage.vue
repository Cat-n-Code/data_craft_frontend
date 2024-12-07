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
    <ContentContainer class="gap-2">
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
              <Checkbox
                class="mx-2"
                v-model="selectedCols[field.index]"
                binary
                @change="(ev) => {
                  if ((ev.target as HTMLInputElement).checked) {
                    selectedCols[field.index] = true;
                  } else {
                    selectedCols[field.index] = false;
                  }
                }"
              />
              <span>{{ field.name }}</span>
              <Button
                class="p-1 rounded-sm text-black"
                plain
                text
                @click="
                  (ev) => {
                    popoverFieldIndex = field.index - 1;
                    switch (field.dataType) {
                      case FieldType.Integer:
                      case FieldType.Float:
                        numberFieldPopover?.popover?.toggle(ev);
                        break;
                      case FieldType.Text:
                        textFieldPopover?.popover?.toggle(ev);
                        break;
                    }
                  }
                "
              >
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
      <div class="text-gray-500 flex mt-2">
        Сумма: {{ sumValue?.toFixed(2) ?? "-" }}
        <Divider layout="vertical" /> Среднее:
        {{ meanValue?.toFixed(2) ?? "-" }}
        <Divider layout="vertical" /> Минимум:
        {{ minValue?.toFixed(2) ?? "-" }}
        <Divider layout="vertical" />
        Максимум: {{ maxValue?.toFixed(2) ?? "-" }}
        <Divider layout="vertical" /> Количество: {{ countValue ?? "-" }}
      </div>
      <Paginator
        v-model:first="rowsOffset"
        v-model:rows="rowsLimit"
        :rows-per-page-options="[10, 20, 50, 100]"
        :total-records="totalRows"
      ></Paginator>
    </ContentContainer>
  </MainContainer>

  <NumberFieldPopover
    ref="numberFieldPopover"
    :values="
      popoverFieldIndex != null && [FieldType.Integer, FieldType.Float].includes(store.fields![popoverFieldIndex].dataType) 
        ? store.dataset?.distinct_values(popoverFieldIndex, 10) as number[]
        : []
    "
    :min-value="
      popoverFieldIndex != null
        ? store.fieldsFilters.get(popoverFieldIndex)?.minValue
        : null
    "
    @update:min-value="(values) => {
      if (!store.fieldsFilters.has(popoverFieldIndex!)) {
        store.fieldsFilters.set(popoverFieldIndex!, {});
      }

      store.fieldsFilters.get(popoverFieldIndex!)!.minValue = values ?? undefined
    }"
    :max-value="
      popoverFieldIndex != null
        ? store.fieldsFilters.get(popoverFieldIndex)?.maxValue
        : null
    "
    @update:max-value="(values) => {
      if (!store.fieldsFilters.has(popoverFieldIndex!)) {
        store.fieldsFilters.set(popoverFieldIndex!, {});
      }

      store.fieldsFilters.get(popoverFieldIndex!)!.maxValue = values ?? undefined
    }"
    @hide="() => (popoverFieldIndex = null)"
  />
  <TextFieldPopover
    ref="textFieldPopover"
    :values="
      popoverFieldIndex != null && store.fields![popoverFieldIndex].dataType == FieldType.Text
        ? store.dataset?.distinct_values(popoverFieldIndex, 10) as string[]
        : []
    "
    :pattern="
      popoverFieldIndex != null
        ? store.fieldsFilters.get(popoverFieldIndex)?.pattern
        : null
    "
    @update:pattern="(pattern) => {
      if (!store.fieldsFilters.has(popoverFieldIndex!)) {
        store.fieldsFilters.set(popoverFieldIndex!, {});
      }

      store.fieldsFilters.get(popoverFieldIndex!)!.pattern = pattern ?? undefined
    }"
    :selected-values="
      popoverFieldIndex != null
        ? store.fieldsFilters.get(popoverFieldIndex)?.values
        : null
    "
    @update:selected-values="(values) => {
      if (!store.fieldsFilters.has(popoverFieldIndex!)) {
        store.fieldsFilters.set(popoverFieldIndex!, {});
      }

      store.fieldsFilters.get(popoverFieldIndex!)!.values = values as any[] ?? null
    }"
    @hide="() => (popoverFieldIndex = null)"
  />
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
import { FieldAggregator, FieldType } from "data_craft_core";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Divider from "primevue/divider";
import Paginator from "primevue/paginator";
import { Reactive, reactive, Ref, ref, useTemplateRef, watchEffect } from "vue";
import { useRouter } from "vue-router";
import ContentContainer from "../components/core/ContentContainer.vue";
import HeaderContainer from "../components/core/HeaderComponent.vue";
import MainContainer from "../components/core/MainContainer.vue";
import Navbar from "../components/core/Navbar.vue";
import NumberFieldPopover from "../components/popovers/NumberFieldPopover.vue";
import TextFieldPopover from "../components/popovers/TextFieldPopover.vue";
import { useActiveDatasetStore } from "../stores/active-dataset-store";

const router = useRouter();
const store = useActiveDatasetStore();
const numberFieldPopover =
  useTemplateRef<InstanceType<typeof NumberFieldPopover>>("numberFieldPopover");
const textFieldPopover =
  useTemplateRef<InstanceType<typeof NumberFieldPopover>>("textFieldPopover");
const popoverFieldIndex = ref<number | null>(null);

const totalRows = ref(0);
const rowsOffset = ref(0);
const rowsLimit = ref(10);
const data: Ref<any[][] | null> = ref(null);
const selectedCols: Reactive<{ [key: number]: boolean }> = reactive({});

const sumValue: Ref<number | null> = ref(null);
const maxValue: Ref<number | null> = ref(null);
const minValue: Ref<number | null> = ref(null);
const meanValue: Ref<number | null> = ref(null);
const countValue: Ref<number | null> = ref(null);

watchEffect(() => {
  document.title =
    store.datasetInfo == null ? "" : `${store.datasetInfo.name} - таблица`;
});

watchEffect(() => {
  if (store.filteredDataset == null) {
    data.value = null;
    return;
  }
  totalRows.value = store.filteredDataset.rows_count();
  data.value = store.filteredDataset.slice(
    rowsOffset.value ?? 0,
    rowsOffset.value + rowsLimit.value
  );
});

watchEffect(() => {
  let indexes = Object.entries(selectedCols)
    .filter(([_, v]) => v)
    .map(([k, _]) => Number.parseInt(k) - 1);

  sumValue.value = store.dataset?.aggregate_rows(indexes, FieldAggregator.Sum);
  maxValue.value = store.dataset?.aggregate_rows(indexes, FieldAggregator.Max);
  minValue.value = store.dataset?.aggregate_rows(indexes, FieldAggregator.Min);
  meanValue.value = store.dataset?.aggregate_rows(
    indexes,
    FieldAggregator.Mean
  );
  countValue.value = store.dataset?.aggregate_rows(
    indexes,
    FieldAggregator.Count
  );
});
</script>
