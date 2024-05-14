<template>
  <Bar id="revenue-chart" :options="chartOptions" :data="chartData" />
</template>

<script setup>
import { store } from '@/assets/store'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
  labels: store.labels,
  datasets: [
    {
      label: 'Profit',
      data: store.profitData,
      backgroundColor: 'rgba(39, 245, 127)',
      borderColor: 'rgba(39, 245, 127)',
      borderWidth: 1
    }
  ]
}
const chartOptions = {
  responsive: true
}
</script>
