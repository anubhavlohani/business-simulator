import { reactive } from 'vue'

export const store = reactive({
  revenue: 0,
  revenueData: [],
  increaseRevenue(val) {
    this.revenue += val
    this.revenueData.push(this.revenue)
  },
  decreaseRevenue(val) {
    this.revenue -= val
    this.revenueData.push(this.revenue)
  },
  profit: 0,
  profitData: [],
  increaseProfit(val) {
    this.profit += val
    this.profitData.push(this.profit)
  },
  decreaseProfit(val) {
    this.profit -= val
    this.profitData.push(this.profit)
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
  labels: ['Jan'],
  increaseFtr(val) {
    this.ftrData.push(this.ftrData[this.ftrData.length - 1] + val)
  },
  decreaseFtr(val) {
    this.ftrData.push(this.ftrData[this.ftrData.length - 1] - val)
  },
  pushToLabels(val) {
    this.labels.push(val)
  }
})
