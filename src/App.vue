<template>
  <div>
    <div class="flex flex-row ml-8 mt-8">
      <GameValues class="basis-1/6" />
      <GameLogic class="basis-5/6" />
    </div>
  </div>
</template>

<script setup>
import GameValues from './components/GameValues.vue'
import GameLogic from './components/GameLogic.vue'
</script>
