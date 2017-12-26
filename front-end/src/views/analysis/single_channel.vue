<template>
    <analysis-util :is-overview="false" :channel="channelname">
    </analysis-util>
</template>
<script>
import AnalysisUtil from './utils.vue'
export default {
  props: ['channelname'],
  components: { AnalysisUtil }
}
</script>