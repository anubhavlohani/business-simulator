<template>
  <div>
    <nav>
      <ul class="flex flex-col space-y-4 text-2xl">
        <li>Revenue: ₹{{ store.revenue }}</li>
        <li>Profit: ₹{{ store.profit }}</li>
        <li>Investor Opinion: {{ store.investorOpinion }}%</li>
        <li>Employees: {{ store.employees }}</li>
        <li class="flex flex-row">
          Lives:
          <div v-for="life in store.lives" :key="life">❤</div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { store } from '@/assets/store'
</script>
