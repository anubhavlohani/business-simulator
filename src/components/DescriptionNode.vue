<template>
  <div class="my-2 p-4 text-lg border-2 border-black">
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  description: String
})
</script>
