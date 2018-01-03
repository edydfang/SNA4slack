<template>
  <wordcloud :data="words" nameKey="name" valueKey="value">
  </wordcloud>         
</template>

<script>
import wordcloud from 'vue-wordcloud'
import { get_word_cloud } from '@/api/slack_data'
export default {
  name: 'mywordcloud',
  props: { teamId: String },
  components: {
    wordcloud
  },
  data() {
    return {
      words: []
    }
  },

  mounted: function() {
    get_word_cloud(this.teamId).then(response => {
      this.words = response.data
    }).catch(error => {
      console.log(error)
    })
  }
}

</script>

<style scoped>

</style>

