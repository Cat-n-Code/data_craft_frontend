<template>
  <Dialog v-model:visible="visible" header="Создание диаграммы" closable modal>
    <div class="flex flex-col gap-4">
      <FloatLabel variant="on">
        <Select
          input-id="diagram_type"
          :options="['Круговая', 'Радар', 'Гистограмма', 'Столбчатая']"
          v-model="diagramType"
        ></Select>
        <label for="diagram_type">Тип диаграммы</label>
      </FloatLabel>

      <FloatLabel variant="on">
        <Select
          input-id="x_field"
          :options="store.fields?.map((f) => f.name)"
          :model-value="store.fields[xFieldIndex].name"
          @update:model-value="
        (val) => xFieldIndex = [...store.fields?.entries()!].find(([_, f]) => f.name == val)![0]
      "
        />
        <label for="x_field">Ось X</label>
      </FloatLabel>

      <FloatLabel variant="on">
        <Select
          input-id="y_field"
          :options="store.fields?.map((f) => f.name)"
          :model-value="store.fields[yFieldIndex].name"
          @update:model-value="
        (val) => yFieldIndex = [...store.fields?.entries()!].find(([_, f]) => f.name == val)![0]
      "
        />
        <label for="y_field">Ось Y</label>
      </FloatLabel>
    </div>

    <div class="mt-4 flex justify-end space-x-2">
      <Button label="Сохранить" @click="save" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { FieldAggregator } from "data_craft_core";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Select from "primevue/select";
import { defineEmits, ref } from "vue";
import { useActiveDatasetStore } from "../../stores/active-dataset-store";
import { DiagramType, useDashboardStore } from "../../stores/dashboard-store";

const store = useActiveDatasetStore();
const dashboardStore = useDashboardStore();
const emit = defineEmits(["update:visible", "save"]);

const visible = ref(false);
const diagramType = ref<DiagramType>(DiagramType.PIE);
const xFieldIndex = ref<number>(0);
const yFieldIndex = ref<number>(0);

function show() {
  visible.value = true;
}

function save() {
  visible.value = false;

  let a = store.dataset!.group_rows(
    xFieldIndex.value,
    yFieldIndex.value,
    FieldAggregator.Count
  );

  dashboardStore.dashboards.push({
    type: diagramType.value,
    xValues: a[0],
    yValues: a[1],
  });
}

defineExpose({ show });
</script>
