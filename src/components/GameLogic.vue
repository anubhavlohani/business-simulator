<template>
  <div>
    <button @click="showData = true" class="text-lg">Show Data</button>
    <DataPanel v-if="showData" @toggleShowData="showData = false" />

    <SingleCorrectNode
      v-if="count == 0"
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
      v-if="count == 1"
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
      v-if="count == 2"
      :description="cases[2].description"
      :options="cases[2].options"
      @handleRankingSubmission="handleRankingSubmission"
    />
    <CompletedRankingNode
      v-if="count > 2"
      :description="closedCases[2].description"
      :selectedOptions="closedCases[2].selectedOptions"
    />

    <EndingNode v-if="count == 3" :description="'THE END'" />
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

const handleOptionSelection = (optionIndex) => {
  // logic: best option gives ++ to profit and rev; 2nd best gives: +, remaining two -life
  if (optionIndex == 0) {
    store.increaseProfit(2000)
    store.increaseRevenue(10000)
    store.increaseInvestorOpinion(10)
    store.increaseEmployees(150)
  } else if (optionIndex == 1) {
    store.increaseProfit(1000)
    store.increaseRevenue(5000)
    store.increaseInvestorOpinion(5)
    store.increaseEmployees(150)
  } else {
    store.decreaseInvestorOpinion(20)
    store.decrementLives()
  }

  closedCases.value.push({
    description: cases[count.value].description,
    selectedOption: cases[count.value].options[optionIndex]
  })
  count.value++
}

const handleMultiOptionSelection = (selectedOptions) => {
  // selectedOptions represents index of options, not the text

  const bestOptionIndices = [2, 6, 9]
  let bestOptionsSelected = 0
  for (let index = 0; index < bestOptionIndices.length; index++) {
    const element = bestOptionIndices[index]
    if (selectedOptions.includes(element)) {
      bestOptionsSelected++
    }
  }

  // logic: 3 best options -> +++; 2 best -> ++, 1 best -> +, 0 best -> -life

  if (bestOptionsSelected == 3) {
    store.increaseProfit(3000)
    store.increaseRevenue(15000)
    store.increaseInvestorOpinion(15)
    store.increaseEmployees(150)
  } else if (bestOptionsSelected == 2) {
    store.increaseProfit(2000)
    store.increaseRevenue(10000)
    store.increaseInvestorOpinion(10)
    store.increaseEmployees(150)
  } else if (bestOptionsSelected == 1) {
    store.increaseProfit(1000)
    store.increaseRevenue(5000)
    store.increaseInvestorOpinion(5)
    store.increaseEmployees(150)
  } else {
    store.decreaseInvestorOpinion(20)
    store.decrementLives()
  }

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
}

const handleRankingSubmission = (optionRankings) => {
  //optionRankings is an array that contains options texts in the ranked order

  const correctRanking = [0, 1, 2] // option indices
  let correct = 0
  for (let i = 0; i < optionRankings.length; i++) {
    const element = optionRankings[i]
    const optionIndex = cases[count.value].options.indexOf(element)
    if (optionIndex === correctRanking[i]) {
      correct++
    }
  }

  // logic 3 correct -> ++, 2 correct -> +, 1 correct -> no change, 0 correct -life

  if (correct == 3) {
    store.increaseProfit(2000)
    store.increaseRevenue(10000)
    store.increaseInvestorOpinion(10)
    store.increaseEmployees(150)
  } else if (correct == 2) {
    store.increaseProfit(1000)
    store.increaseRevenue(5000)
    store.increaseInvestorOpinion(5)
    store.increaseEmployees(150)
  } else if (correct == 0) {
    store.decreaseInvestorOpinion(20)
    store.decrementLives()
  }

  closedCases.value.push({
    description: cases[count.value].description,
    selectedOptions: optionRankings
  })
  count.value++
}

const cases = [
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elit neque, cursus at pulvinar id, porta ac augue. Donec vitae egestas sem. Duis nec fringilla risus. Sed condimentum risus sed nisl vulputate, vitae facilisis metus efficitur. Integer eleifend malesuada magna, vel ultricies mauris lobortis ut. Integer sed justo id magna gravida commodo. Maecenas finibus elementum ex, sed pellentesque diam ullamcorper ut. Ut sed accumsan sapien, eget laoreet orci. Integer ipsum urna, pulvinar et nibh non, imperdiet suscipit arcu. Maecenas eget vulputate est. Maecenas congue sagittis ex et euismod. Donec quis eros imperdiet ligula mattis ullamcorper. Proin tristique odio quis nisi scelerisque volutpat. Curabitur porttitor egestas pharetra. Phasellus a pharetra lorem. Aenean malesuada tempus metus, sit amet feugiat arcu lacinia quis. Donec convallis lorem vitae ex vestibulum gravida. Quisque sollicitudin massa purus. Nullam congue, felis sit amet bibendum gravida, lorem nunc fringilla urna, sit amet ultricies odio nunc at tortor. Etiam commodo fringilla elit, nec ultricies nibh condimentum vel. Duis pharetra ipsum ac massa varius, et semper ex gravida. Suspendisse potenti. Vivamus cursus eleifend erat, in commodo sapien mollis eget. Nam id mattis arcu. Curabitur volutpat quam ut tempor ullamcorper. Nullam felis lorem, molestie ac mauris maximus, porttitor finibus diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur pulvinar eleifend dolor ut sodales. Nulla tincidunt purus diam, nec vestibulum dui dignissim vel. Etiam rhoncus lacus ac sem feugiat semper. Donec eu urna in velit facilisis lacinia. Suspendisse pharetra faucibus suscipit. Ut fringilla dui in sapien ultrices dapibus sed eget quam. Aenean neque turpis, hendrerit vitae aliquet sed, cursus vitae odio. Duis sed sollicitudin dolor. Etiam ullamcorper odio vitae posuere tempus. Nulla auctor blandit ultricies.',
    options: ['Best Option', 'Decent Option', 'Bad Option 1', 'Bad Option 2']
  },
  {
    description:
      'Suspendisse potenti. Phasellus vitae sapien tincidunt, bibendum nibh commodo, posuere tellus. Vivamus commodo fringilla ex, quis faucibus tortor cursus in. Aliquam vel velit pellentesque, tristique neque non, tristique ligula. Aenean a hendrerit ligula, non posuere purus. Duis quis mauris et ligula dapibus imperdiet vel sit amet massa. Cras tristique vel lacus non dictum. Mauris turpis est, vehicula ac luctus at, dapibus eget purus. Integer vitae viverra sem. Nunc quis sagittis felis. Ut lectus purus, hendrerit a vestibulum ut, congue non metus. Suspendisse quam tortor, congue at elit non, dignissim tempor purus. Nam gravida arcu suscipit est condimentum laoreet. Aenean accumsan sollicitudin nibh at tincidunt. Aliquam felis lacus, iaculis eu tempus non, molestie vitae lectus. Nunc sodales, massa a dapibus dignissim, diam libero aliquet mi, a posuere nisl erat eget turpis. Cras vel laoreet purus, id imperdiet quam. Duis et eros vitae lectus interdum viverra. Donec mollis arcu quis lacinia iaculis. Vestibulum aliquet posuere velit a molestie. In eu neque suscipit, dapibus elit a, dictum est. Vivamus at urna ex. Maecenas tempor porttitor placerat. Proin risus elit, porttitor id lacus sit amet, ullamcorper iaculis tellus. Proin vitae congue sapien. Maecenas vel maximus nisi, in pellentesque sapien. Maecenas elementum, velit eu volutpat vehicula, sem quam venenatis risus, eu venenatis purus ante a erat. Mauris eu risus pretium, maximus risus a, viverra enim.',
    options: [
      'Option 1',
      'Option 2',
      'Best',
      'Option 4',
      'Option 5',
      'Option 6',
      'Best',
      'Option 8',
      'Option 9',
      'Best'
    ]
  },
  {
    description:
      'In nec dapibus ante. Ut cursus turpis eget massa tincidunt, nec mollis nibh egestas. Ut at mauris ex. Ut nunc tellus, iaculis eu fermentum nec, fermentum id leo. In hac habitasse platea dictumst. Phasellus sapien nulla, mattis sit amet malesuada quis, lacinia vestibulum ante. Morbi malesuada neque at risus pulvinar, sit amet porta eros luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In aliquam lorem sit amet laoreet interdum. In vehicula velit vel ullamcorper fringilla. Donec id leo sed urna congue lacinia. Curabitur feugiat arcu suscipit, facilisis leo ut, dictum arcu. Donec in imperdiet elit. Praesent varius, nunc at sodales vulputate, odio lacus viverra nulla, in imperdiet magna turpis sed sapien. Donec faucibus nisi id nulla tempus varius. Donec leo lacus, tincidunt ac lectus eu, mollis efficitur lacus. Fusce id vehicula mi, sit amet imperdiet est. Nulla egestas rhoncus mi non accumsan. Etiam feugiat, felis quis mattis mattis, nisi risus molestie justo, sed maximus magna risus ornare diam. In consectetur velit eu metus vestibulum, vitae luctus diam pretium.',
    options: ['Option 1', 'Option 2', 'Option 3']
  }
]
</script>
