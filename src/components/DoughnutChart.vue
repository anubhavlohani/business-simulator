<template>
  <Doughnut id="doughnut-chart" :options="chartOptions" :data="chartData" />
</template>

<script setup>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = {
  labels: ['A', 'B', 'C', 'D'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10]
    }
  ]
}
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
</script>
