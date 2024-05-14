<template>
  <div class="my-16 mx-64">
    <DescriptionNode :description="description" />

    <div class="my-2 text-lg border-2 border-black">
      <p class="text-center">{{ selectedOption }}</p>
    </div>

    <p class="my-2 text-lg text-center">Time Elapsed: 1 month</p>
  </div>
</template>

<script setup>
import DescriptionNode from './DescriptionNode.vue'

const props = defineProps({
  description: String,
  selectedOption: String
})
</script>
