<template>
  <Dialog
    :visible="props.visible"
    :header="props.fieldInfo == null ? 'Создать поле' : 'Изменить поле'"
    closable
    modal
  >
    <InputText />

    <div class="flex justify-end">
      <Button label="Сохранить" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { FieldInfo } from "../../stores/active-dataset-store";

const props = defineProps<{
  visible: boolean;
  fieldInfo?: FieldInfo;
}>();
</script>
