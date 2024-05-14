<template>
  <Line id="line-chart" :options="chartOptions" :data="chartData" />
</template>

<script setup>
import { store } from '@/assets/store'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const chartData = {
  labels: store.ftrLabels,
  datasets: [
    {
      label: 'First Time Right',
      backgroundColor: '#f87979',
      data: store.ftrData
    }
  ]
}

const chartOptions = {
  responsive: true
}
</script>
