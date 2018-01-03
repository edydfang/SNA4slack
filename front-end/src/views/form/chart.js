import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['labels', 'data'],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: 'Relative Message Frequency',
          backgroundColor: '#f87979',
          data: this.data
        }
      ]
    })
  }
}
