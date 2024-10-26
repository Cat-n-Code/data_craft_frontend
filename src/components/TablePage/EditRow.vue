<template>
  <Button @click="open = true">Open Modal</Button>

  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <Button @click="open = false">Close</Button>
  </div>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import { ref } from "vue";

const open = ref(false);
</script>
