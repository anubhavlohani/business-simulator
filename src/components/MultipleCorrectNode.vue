<template>
  <div class="my-16 mx-64">
    <DescriptionNode :description="description" />

    <div class="text-2xl text-center font-semibold">You can select upto 3 options</div>

    <div class="grid grid-cols-3 my-2 gap-x-8 text-lg">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="my-4 flex flex-col justify-between text-center border-2 border-black"
        :class="{ 'bg-slate-400': selectedOptions.includes(index) }"
      >
        <p class="my-2 px-2">{{ option }}</p>
        <button @click="toggleOption(index)" class="my-2 py-2 mx-4 bg-black rounded-md text-white">
          {{ selectedOptions.includes(index) ? 'Deselect' : 'Select' }}
        </button>
      </div>
    </div>

    <button
      v-if="selectedOptions.length > 0"
      @click="submitOptions()"
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
  // option represents the option selected; index represents the index of that option in the selectedOptions array
  // max three options are allowed to be selected

  const index = selectedOptions.value.indexOf(option)
  if (selectedOptions.value.includes(option)) {
    selectedOptions.value.splice(index, 1)
  } else if (selectedOptions.value.length < 3) {
    selectedOptions.value.push(option)
  }
  selectedOptions.value.sort()
}

const emit = defineEmits(['handleMultiOptionSelection'])
const submitOptions = () => emit('handleMultiOptionSelection', selectedOptions.value)
</script>
