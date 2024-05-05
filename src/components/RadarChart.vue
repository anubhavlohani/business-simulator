<template>
  <Radar id="radar-chart" :options="chartOptions" :data="chartData" />
</template>

<script setup>
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const chartData = {
  labels: [
    'Defending',
    'Physical',
    'Speed',
    'Vision',
    'Attacking',
    'Technical',
    'Aerial',
    'Mental'
  ],
  datasets: [
    {
      label: 'Jude Bellingham Stats',
      backgroundColor: 'rgba(0, 254, 0, 0.2)',
      borderColor: 'rgba(0, 254, 0, 1)',
      pointBackgroundColor: 'rgba(0, 254, 0, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 254, 0, 1)',
      data: [75, 85, 80, 90, 85, 90, 70, 95]
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
</script>
