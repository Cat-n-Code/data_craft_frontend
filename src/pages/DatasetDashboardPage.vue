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
    <ContentContainer>
      <div class="flex-grow block overflow-scroll relative">
        <div class="card flex flex-col absolute w-full justify-center gap-20">
          <div class="card w-full">
            <Chart type="bar" :data="chartData" :options="chartOptions" />
          </div>
          <div class="card w-full">
            <Chart
              type="bar"
              :data="chartDataCombo"
              :options="chartOptionsCombo"
              class="h-[30rem]"
            />
          </div>
          <div class="card w-full">
            <Chart
              type="radar"
              :data="chartDataRadar"
              :options="chartOptionsRadar"
              class="w-full md:w-[30rem]"
            />
          </div>
        </div>
      </div>
    </ContentContainer>
  </MainContainer>
</template>

<style scoped></style>

<script lang="ts" setup>
import Chart from "primevue/chart";
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import ContentContainer from "../components/core/ContentContainer.vue";
import HeaderContainer from "../components/core/HeaderComponent.vue";
import MainContainer from "../components/core/MainContainer.vue";
import Toolbar from "../components/core/ToolbarComponent.vue";

const router = useRouter();

const chartData = ref();
const chartOptions = ref();
const setChartData = () => {
  return {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Sales",
        data: [540, 325, 702, 620],
        backgroundColor: [
          "rgba(249, 115, 22, 0.2)",
          "rgba(6, 182, 212, 0.2)",
          "rgb(107, 114, 128, 0.2)",
          "rgba(139, 92, 246 0.2)",
        ],
        borderColor: [
          "rgb(249, 115, 22)",
          "rgb(6, 182, 212)",
          "rgb(107, 114, 128)",
          "rgb(139, 92, 246)",
        ],
        borderWidth: 1,
      },
    ],
  };
};
const chartDataCombo = ref();
const chartOptionsCombo = ref();

const setChartDataCombo = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        type: "line",
        label: "Dataset 1",
        borderColor: documentStyle.getPropertyValue("--p-orange-500"),
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        data: [50, 25, 12, 48, 56, 76, 42],
      },
      {
        type: "bar",
        label: "Dataset 2",
        backgroundColor: documentStyle.getPropertyValue("--p-gray-500"),
        data: [21, 84, 24, 75, 37, 65, 34],
        borderColor: "white",
        borderWidth: 2,
      },
      {
        type: "bar",
        label: "Dataset 3",
        backgroundColor: documentStyle.getPropertyValue("--p-cyan-500"),
        data: [41, 52, 24, 74, 23, 21, 32],
      },
    ],
  };
};
const setChartOptionsCombo = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

const chartDataRadar = ref();
const chartOptionsRadar = ref();

const setChartDataRadar = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");

  return {
    labels: [
      "Eating",
      "Drinking",
      "Sleeping",
      "Designing",
      "Coding",
      "Cycling",
      "Running",
    ],
    datasets: [
      {
        label: "My First dataset",
        borderColor: documentStyle.getPropertyValue("--p-gray-400"),
        pointBackgroundColor: documentStyle.getPropertyValue("--p-gray-400"),
        pointBorderColor: documentStyle.getPropertyValue("--p-gray-400"),
        pointHoverBackgroundColor: textColor,
        pointHoverBorderColor: documentStyle.getPropertyValue("--p-gray-400"),
        data: [65, 59, 90, 81, 56, 55, 40],
      },
      {
        label: "My Second dataset",
        borderColor: documentStyle.getPropertyValue("--p-pink-400"),
        pointBackgroundColor: documentStyle.getPropertyValue("--p-pink-400"),
        pointBorderColor: documentStyle.getPropertyValue("--p-pink-400"),
        pointHoverBackgroundColor: textColor,
        pointHoverBorderColor: documentStyle.getPropertyValue("--p-pink-400"),
        data: [28, 48, 40, 19, 96, 27, 100],
      },
    ],
  };
};
const setChartOptionsRadar = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      r: {
        grid: {
          color: textColorSecondary,
        },
      },
    },
  };
};
watchEffect(() => {
  document.title = "Название датасета - дашборды";
});
onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
  chartDataCombo.value = setChartDataCombo();
  chartOptionsCombo.value = setChartOptionsCombo();
  chartDataRadar.value = setChartDataRadar();
  chartOptionsRadar.value = setChartOptionsRadar();
});
</script>
