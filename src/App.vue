<template>
  <div id="app">
    <HelloWorld></HelloWorld>
    {{$t("compress.selectText")}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/switch.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
  @import "./styles/index";
</style>
