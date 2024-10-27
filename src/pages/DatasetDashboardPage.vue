<template>
  <MainContainer>
    <HeaderContainer
      :breadcrumb="[
        {
          label: 'Таблицы',
          command: () => {
            router.push({ name: 'datasets_list' });
          },
        },
        { label: 'Название датасета' },
        { label: 'Дашборды' },
      ]"
    />
    <Toolbar />
    <ContentContainer>
      <div class="flex-grow block overflow-scroll relative">
        <div
          class="card flex flex-col grow absolute w-full justify-center gap-20"
        >
          <div class="card w-full">
            <Chart type="bar" :data="ChartData1" :options="barChartOptions" />
          </div>
          <div class="card w-full">
            <Chart type="bar" :data="ChartData2" :options="barChartOptions" />
          </div>
          <div class="card w-full">
            <Chart type="bar" :data="ChartData3" :options="barChartOptions" />
          </div>
          <div class="card w-full">
            <Chart type="bar" :data="ChartData4" :options="barChartOptions" />
          </div>
          <div class="card w-full">
            <Chart type="bar" :data="ChartData5" :options="barChartOptions" />
          </div>

          <div class="card w-full">
            <Chart type="pie" :data="ChartData1" :options="pieChartOptions" />
          </div>
          <div class="card w-full">
            <Chart type="pie" :data="ChartData2" :options="pieChartOptions" />
          </div>
          <div class="card w-full">
            <Chart type="pie" :data="ChartData4" :options="pieChartOptions" />
          </div>
          <div class="card w-full">
            <Chart type="pie" :data="ChartData5" :options="pieChartOptions" />
          </div>

          <div class="card w-full">
            <Chart
              type="radar"
              :data="ChartData1"
              :options="radarChartOptions"
            />
          </div>
          <div class="card w-full">
            <Chart
              type="radar"
              :data="ChartData2"
              :options="radarChartOptions"
            />
          </div>
          <div class="card w-full">
            <Chart
              type="radar"
              :data="ChartData4"
              :options="radarChartOptions"
            />
          </div>
          <div class="card w-full">
            <Chart
              type="radar"
              :data="ChartData5"
              :options="radarChartOptions"
            />
          </div>

          <div class="card w-full">
            <Chart type="bar" :data="ChartData3" :options="barChartOptions" />
          </div>
          <div class="card w-full">
            <Chart
              type="radar"
              :data="chartDataRadar"
              :options="radarChartOptions"
            />
          </div>
          <div class="card w-full">
            <Chart
              type="bar"
              :data="chartDataCombo"
              :options="chartOptionsCombo"
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
import Toolbar from "../components/core/Navbar.vue";

const barChartOptions = ref();
const data_example_for_chart1 = ref({
  name: "Количество задач по типу",
  labels: ["Задача", "Подзадача", "Дефект", "История", "Эпик"],
  data: [238, 4510, 4485, 1006, 3],
});
const data_example_for_chart2 = ref({
  name: "Количество задач по городу",
  labels: ["Самара", "Москва", "Санкт-Петербург"],
  data: [1741, 2545, 8104],
});
const data_example_for_chart3 = ref({
  name: "Количество задач по городу",
  labels: ["Задача", "Подзадача", "Дефект", "История", "Эпик"],
  datasets: [
    {
      type: "bar",
      label: "Самара",
      data: [858, 426, 264, 190, 3],
      color: "--p-green-400",
    },
    {
      type: "bar",
      label: "Москва",
      data: [848, 837, 314, 270, 0],
      color: "--p-red-400",
    },
    {
      type: "bar",
      label: "Санкт_петербург",
      data: [680, 3247, 3907, 270],
      color: "--p-blue-400",
    },
  ],
});
const data_example_for_chart4 = ref({
  name: "Количество задач по статусу",
  labels: ["Создано", "Проектирование", "В ожидании", "В работе", "Выполнено"],
  data: [2011, 4, 14, 147, 1890],
});
const data_example_for_chart5 = ref({
  name: "Количество задач по приоритету",
  labels: ["Низкий", "Средний", "Высокий", "Критический"],
  data: [1207, 8200, 2215, 768],
});

const setChartData = (data: {
  name: string;
  labels: string[];
  data: number[];
}) => {
  return {
    labels: data.labels,
    datasets: [
      {
        label: data.name,
        data: data.data,
        // backgroundColor: [
        //   "rgba(249, 115, 22, 0.2)",
        //   "rgba(6, 182, 212, 0.2)",
        //   "rgb(107, 114, 128, 0.2)",
        //   "rgba(139, 92, 246 0.2)",
        //   "rgba(139, 92, 246 0.4)",
        // ],
        // borderColor: [
        //   "rgb(249, 115, 22)",
        //   "rgb(6, 182, 212)",
        //   "rgb(107, 114, 128)",
        //   "rgb(139, 92, 246)",
        //   "rgb(139, 92, 246)",
        // ],
        borderWidth: 1,
      },
    ],
  };
};
const setChartComboData = (data: {
  name: string;
  labels: string[];
  datasets: { label: string; data: number[]; type: string; color: string }[];
}) => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  let datasets = [];
  for (let i = 0; i < data.datasets.length; i++) {
    datasets.push({
      label: data.datasets[i].label,
      data: data.datasets[i].data,
      type: data.datasets[i].type,
      // borderColor: documentStyle.getPropertyValue(data.datasets[i].color),
      // pointBackgroundColor: documentStyle.getPropertyValue(
      //   data.datasets[i].color
      // ),
      // pointBorderColor: documentStyle.getPropertyValue(data.datasets[i].color),
      // pointHoverBackgroundColor: textColor,
      // pointHoverBorderColor: documentStyle.getPropertyValue(
      //   data.datasets[i].color
      // ),
      // backgroundColor: [
      //   "rgba(249, 115, 22, 0.2)",
      //   "rgba(6, 182, 212, 0.2)",
      //   "rgb(107, 114, 128, 0.2)",
      //   "rgba(139, 92, 246 0.2)",
      //   "rgba(139, 92, 246 0.4)",
      // ],
      // borderColor: [
      //   "rgb(249, 115, 22)",
      //   "rgb(6, 182, 212)",
      //   "rgb(107, 114, 128)",
      //   "rgb(139, 92, 246)",
      //   "rgb(139, 92, 246)",
      // ],
      borderWidth: 2,
    });
  }
  return {
    labels: data.labels,
    datasets: datasets,
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

const chartDataRadar = ref();
const pieChartOptions = ref();
const radarChartOptions = ref();

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
const setPieChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor,
        },
      },
    },
  };
};
const setRadarChartOptions = () => {
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
const router = useRouter();

const ChartData1 = ref();
const ChartData2 = ref();
const ChartData3 = ref();
const ChartData4 = ref();
const ChartData5 = ref();
onMounted(() => {
  ChartData1.value = setChartData(data_example_for_chart1.value);
  ChartData2.value = setChartData(data_example_for_chart2.value);
  ChartData3.value = setChartComboData(data_example_for_chart3.value);
  ChartData4.value = setChartData(data_example_for_chart4.value);
  ChartData5.value = setChartData(data_example_for_chart5.value);
  barChartOptions.value = setChartOptions();
  chartDataCombo.value = setChartDataCombo();
  chartOptionsCombo.value = setChartOptionsCombo();
  chartDataRadar.value = setChartDataRadar();
  pieChartOptions.value = setPieChartOptions();
  radarChartOptions.value = setRadarChartOptions();
});
</script>
