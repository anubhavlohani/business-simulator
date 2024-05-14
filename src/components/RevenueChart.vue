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
      label: 'Revenue',
      data: store.revenueData,
      backgroundColor: 'rgba(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132)',
      borderWidth: 1
    }
  ]
}
const chartOptions = {
  responsive: true
}
</script>
