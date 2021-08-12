<template>
  <div id="app" class="main">
    <re-compress></re-compress>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  },
  watch: {},
  methods: {},
  mounted() {
    this.$ils8.use('en')
  }
}
</script>
<style lang="scss" scoped>
</style>
