<template>
  <Popover ref="popover" @hide="emit('hide')">
    <FloatLabel variant="on">
      <InputText v-model="pattern" id="search_pattern" />
      <label for="search_pattern">Поиск по значению</label>
    </FloatLabel>
    <FloatLabel variant="on" class="mt-2">
      <MultiSelect
        id="values"
        class="min-w-[200px]"
        v-model="selectedValues"
        :showToggleAll="false"
        :options="props.values"
      />
      <label for="values">Выбор значений</label>
    </FloatLabel>
  </Popover>
</template>

<script setup lang="ts">
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Popover from "primevue/popover";
import { useTemplateRef } from "vue";

const props = defineProps<{
  values: string[];
}>();
const emit = defineEmits<{
  hide: [];
}>();
const pattern = defineModel<string | null>("pattern");
const selectedValues = defineModel<string[] | null>("selectedValues");
const popover = useTemplateRef<InstanceType<typeof Popover>>("popover");

defineExpose({
  popover,
});
</script>
