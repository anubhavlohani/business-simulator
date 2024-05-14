import { reactive } from 'vue'

export const store = reactive({
  revenue: 0,
  increaseRevenue(val) {
    this.revenue += val
  },
  decreaseRevenue(val) {
    this.revenue -= val
  },
  profit: 0,
  increaseProfit(val) {
    this.profit += val
  },
  decreaseProfit(val) {
    this.profit -= val
  },
  employees: 0,
  increaseEmployees(val) {
    this.employees += val
  },
  decreaseEmployees(val) {
    this.employees -= val
  },
  empEngagement: 50,
  increaseEmpEngagement(val) {
    this.empEngagement += val
    this.empEngagement = this.empEngagement > 100 ? 100 : this.empEngagement // cap at 100
  },
  decreaseEmpEngagement(val) {
    this.empEngagement -= val
    this.empEngagement = this.empEngagement < 0 ? 0 : this.empEngagement // min 0 allowed
  },
  lives: 0,
  incrementLives() {
    this.lives++
  },
  decrementLives() {
    this.lives--
  },
  ftrData: [85],
  ftrLabels: ['Jan'],
  increaseFtr(val) {
    this.ftrData.push(this.ftrData[this.ftrData.length - 1] + val)
  },
  decrementFtr(val) {
    this.ftrData.push(this.ftrData[this.ftrData.length - 1] - val)
  },
  pushToFtrLabels(val) {
    this.ftrLabels.push(val)
  }
})
