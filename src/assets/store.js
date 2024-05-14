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
  },
  decreaseEmpEngagement(val) {
    this.empEngagement -= val
  },
  lives: 0,
  incrementLives() {
    this.lives++
  },
  decrementLives() {
    this.lives--
  }
})
