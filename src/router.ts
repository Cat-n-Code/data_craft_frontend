import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DatasetFieldsPage from "./pages/DatasetFieldsPage.vue";
import DatasetDashboardPage from "./pages/DatasetDashboardPage.vue";
import DatasetListPage from "./pages/DatasetListPage.vue";
import DatasetTablePage from "./pages/DatasetTablePage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/datasets",
  },
  {
    name: "datasets_list",
    path: "/datasets",
    component: DatasetListPage,
  },
  {
    name: "dataset_fields",
    path: "/datasets/:id/fields",
    component: DatasetFieldsPage,
  },
  {
    name: "dataset_table",
    path: "/datasets/:id/table",
    component: DatasetTablePage,
  },
  {
    name: "dataset_dashboard",
    path: "/datasets/:id/dashboard",
    component: DatasetDashboardPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
