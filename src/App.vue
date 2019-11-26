<template>
  <div id="app">
    {{$t("compress.selectText")}}
    <Re-Switch></Re-Switch>
    <Re-Circle></Re-Circle>
    <Re-Line></Re-Line>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ReSwitch from './components/switch.vue';
import ReCircle from './components/circle_progress.vue';
import ReLine from './components/line_progress.vue';

@Component({
  components: {
      ReSwitch, ReCircle, ReLine
  }
})
export default class App extends Vue {}
</script>
