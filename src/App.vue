<template>
    <div id="app">
        <div class="item">
            <Re-Switch></Re-Switch>
        </div>
        <div class="item">
            <Re-Circle></Re-Circle>
        </div>
        <div class="item">
            <Re-Line :height="25"></Re-Line>
        </div>
        <div class="item">
            <Re-Upload></Re-Upload>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ReSwitch from './components/switch.vue';
    import ReCircle from './components/circle_progress.vue';
    import ReLine from './components/line_progress.vue';
    import ReUpload from './components/upload.vue';

    @Component({
        components: {
            ReSwitch, ReCircle, ReLine, ReUpload
        }
    })
    export default class App extends Vue {
    }
</script>
<style lang="scss" scoped>
    #app {
        width: 100%;
        height: auto;
        display: inline-grid;
        grid-template-columns: repeat(auto-fill, 250px);
        grid-template-rows: repeat(auto-fill, 250px);
        justify-content: center;
        justify-items: center;
        align-content: center;
        align-items: center;
    }
</style>
