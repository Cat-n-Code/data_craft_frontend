<template>
  <MainContainer>
    <HeaderContainer :breadcrumb="[{ label: 'Таблицы' }]" />
    <ContentContainer>
      <Toolbar />
      <Table />
    </ContentContainer>
  </MainContainer>
</template>

<style scoped></style>

<script lang="ts" setup>
import { watchEffect } from "vue";
import ContentContainer from "../components/core/ContentContainer.vue";
import HeaderContainer from "../components/core/HeaderComponent.vue";
import MainContainer from "../components/core/MainContainer.vue";
import Table from "../components/ListPage/TableComponent.vue";
import Toolbar from "../components/ListPage/ToolbarComponent.vue";

watchEffect(() => {
  document.title = "Таблицы";
});
</script>
