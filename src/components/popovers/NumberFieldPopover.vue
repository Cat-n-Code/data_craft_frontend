<template>
  <Popover ref="popover" @hide="emit('hide')">
    <div class="flex gap-2">
      <FloatLabel variant="on">
        <InputNumber v-model="minValue" id="min_range" :maxFractionDigits="5" />
        <label for="min_range">Мин. значение</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputNumber v-model="maxValue" id="max_range" :maxFractionDigits="5" />
        <label for="max_range">Макс. значение</label>
      </FloatLabel>
    </div>
    <!-- 
    <FloatLabel variant="on" class="mt-2">
      <MultiSelect
        id="values"
        class="min-w-[200px]"
        v-model="selectedValues"
        :showToggleAll="false"
        :options="props.values"
      />
      <label for="values">Выбор значений</label>
    </FloatLabel> -->
  </Popover>
</template>

<script setup lang="ts">
import FloatLabel from "primevue/floatlabel";
import InputNumber from "primevue/inputnumber";
import Popover from "primevue/popover";
import { useTemplateRef } from "vue";

const emit = defineEmits<{
  hide: [];
}>();
const minValue = defineModel<number | null>("minValue");
const maxValue = defineModel<number | null>("maxValue");
const popover = useTemplateRef<InstanceType<typeof Popover>>("popover");

defineExpose({
  popover,
});
</script>
