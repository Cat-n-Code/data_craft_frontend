import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DatasetColumnsPage from "./pages/DatasetColumnsPage.vue";
import DatasetDashboardPage from "./pages/DatasetDashboardPage.vue";
import DatasetListPage from "./pages/DatasetListPage.vue";
import DatasetTablePage from "./pages/DatasetTablePage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dataset/list",
  },
  {
    name: "dataset_list",
    path: "/dataset/list",
    component: DatasetListPage,
  },
  {
    name: "dataset_columns",
    path: "/dataset/columns",
    component: DatasetColumnsPage,
  },
  {
    name: "dataset_table",
    path: "/dataset/table",
    component: DatasetTablePage,
  },
  {
    name: "dataset_dashboard",
    path: "/dataset/dashboard",
    component: DatasetDashboardPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
