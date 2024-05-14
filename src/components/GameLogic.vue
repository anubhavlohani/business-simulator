<template>
  <div>
    <button @click="showData = true" class="text-lg">Show Data</button>
    <DataPanel v-if="showData" @toggleShowData="showData = false" />

    <SingleCorrectNode
      v-if="count == 0 && !endSim"
      :description="cases[0].description"
      :options="cases[0].options"
      @handleOptionSelection="handleOptionSelection"
    />
    <CompletedSingleCorrectNode
      v-if="count > 0"
      :description="closedCases[0].description"
      :selectedOption="closedCases[0].selectedOption"
    />

    <MultipleCorrectNode
      v-if="count == 1 && !endSim"
      :description="cases[1].description"
      :options="cases[1].options"
      @handleMultiOptionSelection="handleMultiOptionSelection"
    />
    <CompletedMultipleCorrectNode
      v-if="count > 1"
      :description="closedCases[1].description"
      :selectedOptions="closedCases[1].selectedOptions"
    />

    <RankingNode
      v-if="count == 2 && !endSim"
      :description="cases[2].description"
      :options="cases[2].options"
      @handleRankingSubmission="handleRankingSubmission"
    />
    <CompletedRankingNode
      v-if="count > 2"
      :description="closedCases[2].description"
      :selectedOptions="closedCases[2].selectedOptions"
    />

    <EndingNode v-if="endSim" :description="'THE END'" />
  </div>
</template>

<script setup>
import DataPanel from './DataPanel.vue'
import CompletedSingleCorrectNode from './CompletedSingleCorrectNode.vue'
import SingleCorrectNode from './SingleCorrectNode.vue'
import MultipleCorrectNode from './MultipleCorrectNode.vue'
import CompletedMultipleCorrectNode from './CompletedMultipleCorrectNode.vue'
import RankingNode from './RankingNode.vue'
import CompletedRankingNode from './CompletedRankingNode.vue'
import EndingNode from './EndingNode.vue'

import { ref } from 'vue'
import { store } from '@/assets/store'

const showData = ref(false)
const count = ref(0)
const closedCases = ref([])
const endSim = ref(false)

const handleOptionSelection = (optionIndex) => {
  // logic: best option gives ++ to profit and rev & +life; 2nd best gives: +, remaining two -life
  if (optionIndex == 0) {
    store.increaseProfit(2000)
    store.increaseRevenue(10000)
    store.increaseEmpEngagement(10)
    store.increaseEmployees(150)
    store.incrementLives()
    store.increaseFtr(5)
  } else if (optionIndex == 1) {
    store.increaseProfit(1000)
    store.increaseRevenue(5000)
    store.increaseEmpEngagement(5)
    store.increaseEmployees(150)
    store.increaseFtr(3)
  } else {
    store.decreaseProfit(1000)
    store.decreaseRevenue(5000)
    store.decreaseEmpEngagement(20)
    store.decrementLives()
    store.decreaseFtr(8)
  }

  store.pushToLabels('Feb')
  closedCases.value.push({
    description: cases[count.value].description,
    selectedOption: cases[count.value].options[optionIndex]
  })
  count.value++
  showData.value = true
  if (store.lives < 0) {
    endSim.value = true
  }
}

const handleMultiOptionSelection = (selectedOptions) => {
  // selectedOptions represents index of options, not the text

  const bestOptionIndices = [0, 4]
  const badOptionIndices = [2, 5]
  let optionScore = 0
  for (let i = 0; i < selectedOptions.length; i++) {
    const element = selectedOptions[i]
    if (bestOptionIndices.includes(element)) {
      optionScore++
    } else if (badOptionIndices.includes(element)) {
      optionScore--
    }
  }

  // logic: 2 best options -> ++ & +life; 1 best -> +, 0 best -> -life

  if (optionScore == 2) {
    store.increaseProfit(3000)
    store.increaseRevenue(15000)
    store.increaseEmpEngagement(15)
    store.increaseEmployees(150)
    store.incrementLives()
    store.increaseFtr(5)
  } else if (optionScore == 1) {
    store.increaseProfit(2000)
    store.increaseRevenue(10000)
    store.increaseEmpEngagement(10)
    store.increaseEmployees(150)
    store.increaseFtr(3)
  } else {
    store.decreaseProfit(1000)
    store.decreaseRevenue(5000)
    store.decreaseEmpEngagement(20)
    store.decrementLives()
    store.decreaseFtr(8)
  }

  store.pushToLabels('Mar')
  let options = []
  for (let i = 0; i < selectedOptions.length; i++) {
    const option = cases[count.value].options[selectedOptions[i]]
    options.push(option)
  }
  closedCases.value.push({
    description: cases[count.value].description,
    selectedOptions: options
  })
  count.value++
  showData.value = true
  if (store.lives < 0) {
    endSim.value = true
  }
}

const handleRankingSubmission = (optionRankings) => {
  //optionRankings is an array that contains options texts in the ranked order

  const correctRanking = [1, 2, 0] // option indices
  let correct = 0
  for (let i = 0; i < optionRankings.length; i++) {
    const element = optionRankings[i]
    const optionIndex = cases[count.value].options.indexOf(element)
    if (optionIndex === correctRanking[i]) {
      correct++
    }
  }

  // logic 3 correct -> ++ & +life, 2 correct -> +, 1 correct -> no change, 0 correct -life

  if (correct == 3) {
    store.increaseProfit(2000)
    store.increaseRevenue(10000)
    store.increaseEmpEngagement(10)
    store.increaseEmployees(150)
    store.incrementLives()
    store.increaseFtr(5)
  } else if (correct == 2) {
    store.increaseProfit(1000)
    store.increaseRevenue(5000)
    store.increaseEmpEngagement(5)
    store.increaseEmployees(150)
    store.increaseFtr(3)
  } else if (correct == 0) {
    store.decreaseProfit(1000)
    store.decreaseRevenue(5000)
    store.decreaseEmpEngagement(20)
    store.decrementLives()
    store.decreaseFtr(8)
  }

  store.pushToLabels('Apr')
  closedCases.value.push({
    description: cases[count.value].description,
    selectedOptions: optionRankings
  })
  count.value++
  showData.value = true
  endSim.value = true
}

const cases = [
  {
    description:
      'A major misconduct has occurred in your area. You identify that the person involved in the activity is one of the veterans of the factory, with a clean track record of over 28 yrs. Ramlal holds real sway with the workers. What is the first step you will take?',
    options: [
      'Write incident report',
      'Counsel the offendor in presence of HOD',
      'Talk to the offendor and aggrieved party to reach a settlement',
      'Ignore the issue as this is the first time the person has done something wrong'
    ]
  },
  {
    description:
      "After identifying Ramlal's misconduct and taking the initial step, you realize that the situation is more complex than initially thought. Ramlal's influence on the workers is significant, and his actions have caused a ripple effect throughout the factory. As you ponder your next move, several options present themselves.",
    options: [
      'Implement disciplinary action against Ramlal, including suspension or demotion, following a thorough investigation into the misconduct.',
      'Engage in one-on-one conversations with key influencers among the workers, including Ramlal, to understand their concerns and grievances, aiming to address underlying issues contributing to the misconduct.',
      'Ignore the situation and hope it resolves itself, believing that taking drastic action may worsen employee morale and disrupt productivity.',
      'Form a committee comprising representatives from management, HR, and employees to review and update existing company policies and procedures to prevent similar incidents in the future.',
      'Conduct a series of workshops and training sessions for all employees, emphasizing the importance of adhering to company policies and ethical behavior.',
      'Offer Ramlal a promotion or other incentives as a way to smooth over the situation and maintain his loyalty, without addressing the root cause of the misconduct.'
    ]
  },
  {
    description:
      'As the company moves forward with its expansion plans to acquire another factory in a nearby district, it faces significant challenges due to the fallout from the recent misconduct incident. The trust of the local population in the company is at an all-time low, and recruiting suitable employees for the new factory becomes increasingly difficult. What steps can you take to rectify this situation?',
    options: [
      'Hire a third-party recruitment agency to quickly fill the positions at the new factory, prioritizing efficiency over community engagement and trust-building efforts.',
      'Launch a community outreach program aimed at rebuilding trust with the local population, including initiatives such as job fairs, skill development workshops, and partnerships with local educational institutions.',
      'Implement a comprehensive recruitment and onboarding process for the new factory, prioritizing transparency, fairness, and diversity to rebuild trust and attract top talent from the local community.'
    ]
  }
]
</script>
