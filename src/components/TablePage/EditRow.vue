<template>
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
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";

const emit = defineEmits(["save"]);
const props = defineProps({
  initialData: Object,
});
const localData = ref({ ...props.initialData });
const showModal = ref(true);

function closeModal() {
  showModal.value = false;
}

function saveChanges() {
  console.log("Saved fields:", tableFields.value);
  closeModal();
  emit("save", tableFields.value);
}
