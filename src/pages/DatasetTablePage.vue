<template>
  <MainContainer>
    <HeaderContainer
      :breadcrumb="[
        {
          label: 'Таблицы',
          command: () => {
            router.push({ name: 'dataset_list' });
          },
        },
        { label: 'Название датасета' },
        { label: 'Дашборды' },
      ]"
    />
    <Toolbar />
    <EditRow />
    <ContentContainer>
      <ActiveButtons></ActiveButtons>
      <Table></Table>
      <Statistic></Statistic>
    </ContentContainer>
  </MainContainer>
</template>

<style scoped></style>

<script lang="ts" setup>
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import ContentContainer from "../components/core/ContentContainer.vue";
import HeaderContainer from "../components/core/HeaderComponent.vue";
import MainContainer from "../components/core/MainContainer.vue";
import Toolbar from "../components/core/ToolbarComponent.vue";
import EditRow from "../components/TablePage/EditRow.vue";
import {
  default as Statistic,
  default as Table,
} from "../components/TablePage/TableComponent.vue";

const router = useRouter();

watchEffect(() => {
  document.title = "Название датасета - таблица";
});
</script>
