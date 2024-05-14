<template>
  <div class="my-16 mx-64">
    <DescriptionNode :description="description" />

    <div class="my-2 flex flex-row gap-x-8 text-lg">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="basis-1/3 my-4 flex flex-col justify-between text-center border-2 border-black"
      >
        <p class="my-2 px-2">{{ option }}</p>
        <button @click="selectOption(index)" class="my-2 py-2 mx-4 bg-black rounded-md text-white">
          Select
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import DescriptionNode from './DescriptionNode.vue'

const props = defineProps({
  description: String,
  options: Array
})

const emit = defineEmits(['handleOptionSelection'])
const selectOption = (optionIndex) => emit('handleOptionSelection', optionIndex)
</script>
