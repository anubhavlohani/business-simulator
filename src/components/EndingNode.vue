<template>
  <div class="my-16 mx-64">
    <DescriptionNode :description="description" />
  </div>
</template>

<script setup>
import DescriptionNode from './DescriptionNode.vue'

const props = defineProps({
  description: String
})
</script>
