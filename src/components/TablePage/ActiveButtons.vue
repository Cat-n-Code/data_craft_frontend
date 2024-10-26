<template>
  <div
    class="mx-auto pb-5 p-10 rounded-xl bg-surface-0 flex gap-4 justify-center"
  >
    <Button label="AI" severity="contrast" outlined />
    <Button label="Сбросить" severity="contrast" outlined />
    <Button label="Сортировать" severity="contrast" outlined />
    <Button label="Экспорт" severity="contrast" outlined />
    <Button
      label="Добавить запись"
      severity="contrast"
      outlined
      @click="addEntry"
    />

    <Dialog header="Добавить запись" v-model:visible="isDialogVisible" modal>
      <div v-if="showModal">
        <div v-for="(field, index) in tableFields" :key="index" class="mb-2">
          <label :for="'field' + index" class="block font-semibold">
            {{ field.label }}
          </label>
          <input
            :id="'field' + index"
            v-model="field.value"
            type="text"
            class="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
          />
        </div>

        <div class="flex justify-end mt-4">
          <button @click="saveChanges" class="px-4 py-2">Save</button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { ref } from "vue";

const currentData = ref({ name: "", age: "" });
const isDialogVisible = ref(false);
const showModal = ref(true);

const addEntry = () => {
  isDialogVisible.value = true;
};
const handleSave = (newData: any) => {
  console.log("Данные сохранены:", newData);
  isDialogVisible.value = false;
};
function closeModal() {
  showModal.value = false;
}
function saveChanges() {
  console.log("Saved fields:", tableFields.value);
  closeModal();
  emit("save", tableFields.value);
}
</script>
