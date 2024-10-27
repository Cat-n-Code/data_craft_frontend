<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-black bg-opacity-50 absolute inset-0"></div>
    <div class="bg-white p-6 rounded-lg w-80 relative z-10">
      <h2 class="text-lg font-semibold">Выберете фильтр</h2>
      <div class="mt-4">
        <div v-for="(item, index) in items" :key="index" class="flex items-center py-2">
          <input 
            type="checkbox" 
            v-model="checkedItems" 
            :value="item" 
            class="mr-2"
          />
          <label>{{ item }}</label>
        </div>
      </div>
      <div class="mt-4 flex justify-end space-x-2">
        <Button label="Save" @click="save" />
        <Button label="Close" @click="hideDialog" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Dialog from "primevue/dialog";

import Button from 'primevue/button';
import { ref, defineProps, defineEmits } from 'vue';
defineProps({
  items: {
    type: Array,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:visible', 'save']);

const checkedItems = ref([]);

function hideDialog() {
  emit('update:visible', false);
}

function save() {
  emit('save', checkedItems.value);
  hideDialog();
}
</script>
