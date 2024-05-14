<template>
  <div
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 backdrop-brightness-50"
  >
    <div class="w-11/12 bg-white">
      <button @click="closeDataPanel()" class="absolute top-0 right-0 p-4 z-50 bg-white">
        <svg class="h-6 w-6 text-black" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
            stroke="black"
            fill="white"
          />
        </svg>
      </button>

      <!-- All charts -->
      <div class="flex flex-row flex-wrap items-center gap-y-8 p-8">
        <div class="size-1/2">
          <LineChart />
        </div>
        <div class="size-1/2">
          <BarChart />
        </div>
        <div class="size-1/2">
          <DoughnutChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BarChart from './BarChart.vue'
import DoughnutChart from './DoughnutChart.vue'
import LineChart from './LineChart.vue'

const emit = defineEmits(['toggleShowData'])
const closeDataPanel = () => emit('toggleShowData')
</script>
