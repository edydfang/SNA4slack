import { Bar } from 'vue-chartjs'

const render = function(context) {
  context.renderChart({
    labels: context.data.labels,
    datasets: [
      {
        label: 'Relative Message Frequency',
        backgroundColor: '#f87979',
        data: context.data.numbers
      }]
  })
}

export default {
  extends: Bar,
  props: ['data'],
  mounted() {
    // Overwriting base render method with actual data.
    if (this.data !== null) {
      render(this)
    }
  },
  watch: {
    data: function() {
      if (this.data !== null) {
        render(this)
      }
    }
  }
}
