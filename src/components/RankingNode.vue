<template>
  <div class="my-16 mx-64">
    <DescriptionNode :description="description" />

    <div class="flex flex-row gap-x-4">
      <div class="flex flex-col basis-1/2 my-2 gap-x-8 text-lg">
        <p class="my-4 text-center text-2xl">Available Choices</p>
        <div
          v-for="(option, index) in options"
          :key="index"
          class="my-4 text-center border-2 border-black"
          :class="{ 'bg-slate-400': selectedOptions.includes(option) }"
        >
          <p class="my-2 px-2">{{ option }}</p>
          <button
            @click="toggleOption(option)"
            class="mb-2 py-2 px-4 bg-black rounded-md text-white"
          >
            {{ selectedOptions.includes(option) ? 'Deselect' : 'Select' }}
          </button>
        </div>
      </div>
      <div class="flex flex-col basis-1/2 my-2 gap-x-8 text-lg">
        <p class="my-4 text-center text-2xl">Choice Rankings</p>
        <div
          v-for="(option, index) in selectedOptions"
          :key="option"
          class="my-4 text-center border-2 border-black"
        >
          <p>Rank: {{ index + 1 }}</p>
          <p class="my-2 px-2">{{ option }}</p>
          <button
            @click="toggleOption(option)"
            class="mb-2 py-2 px-4 bg-black rounded-md text-white"
          >
            Deselect
          </button>
        </div>
      </div>
    </div>

    <button
      v-if="selectedOptions.length === options.length"
      @click="submitRankings()"
      class="py-4 px-6 bg-rose-600 rounded-md text-lg text-white font-semibold"
    >
      Submit
    </button>
  </div>
</template>

<script setup>
import DescriptionNode from './DescriptionNode.vue'

import { ref } from 'vue'

const props = defineProps({
  description: String,
  options: Array
})
const selectedOptions = ref([])

const toggleOption = (option) => {
  const index = selectedOptions.value.indexOf(option)
  if (selectedOptions.value.includes(option)) {
    selectedOptions.value.splice(index, 1)
  } else {
    selectedOptions.value.push(option)
  }
}

const emit = defineEmits(['handleRankingSubmission'])
const submitRankings = () => emit('handleRankingSubmission', selectedOptions.value)
</script>
