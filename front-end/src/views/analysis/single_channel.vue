<template>
    <analysis-util :is-overview="false" :channel-id="channelId">
    </analysis-util>
</template>
<script>
import AnalysisUtil from './utils.vue'
export default {
  props: ['channelId'],
  components: { AnalysisUtil }
}
</script>