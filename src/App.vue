<template>
  <div>
    <div class="flex flex-row ml-8 mt-8">
      <GameValues class="basis-1/5" />
      <GameLogic class="basis-4/5" />
    </div>
  </div>
</template>

<script setup>
import GameValues from './components/GameValues.vue'
import GameLogic from './components/GameLogic.vue'
</script>
