import { defineStore } from "pinia";
import { ref } from "vue";

export enum DiagramType {
  PIE = "Круговая",
  RADAR = "Радар",
  LINE = "Гистограмма",
  BAR = "Столбчатая",
}

export interface DashboardInfo {
  type: DiagramType;
  xValues: any[];
  yValues: number[];
}

export const useDashboardStore = defineStore("dashboardStore", () => {
  const dashboards = ref<DashboardInfo[]>([]);

  return { dashboards };
});
