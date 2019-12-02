<template>
    <div class="re-progress" ref="progress">
        <div class="re-progress-bar" ref="bar">
            <div class="re-progress-bar_inner">
                <div class="re-progress-text_inner" v-show="isInner">{{`${progress}%`}}</div>
            </div>
        </div>
        <div class="re-progress-text" v-show="!isInner">{{`${progress}%`}}</div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'vue-property-decorator'

    @Component
    export default class ReProgressLine extends Vue {
        $refs: {
            [key: string]: (any);
        };
        name = 're-progress_line';
        strokeWidth: number = 250;
        @Prop({default: 250}) width: number;
        @Prop({default: 6}) height: number;
        @Prop({default: () => true}) isInner: boolean;
        @Prop({default: '#409eff'}) color: string;
        @Prop({default: 50, validator: val => val >= 0 && val <= 100}) progress: number;

        @Watch('progress')
        onProgressChange() {
            this.$refs.progress.firstChild.firstChild.style.width = this.progress + '%'
        }

        mounted() {
            let $progress = this.$refs.progress;
            let $bar = this.$refs.bar;
            let $progressBar = $progress.firstChild;
            let $progressBarInner = $progressBar.firstChild;
            let $innerText = $progressBarInner.firstChild;
            this.strokeWidth = this.isInner && this.height < 16 ? 16 : this.height;
            $bar.style.width = this.isInner ? '100%' : 'calc(100% - 50px)';
            $progress.style.width = this.width + 'px';
            $progressBar.style.height = this.strokeWidth + 'px';
            $progressBarInner.style.width = this.progress + '%';
            $progressBarInner.style.backgroundColor = this.color;
            $innerText.style.lineHeight = this.strokeWidth + 'px';
        }
    }
</script>

<style scoped>
    @import "../styles/coms/progress.scss";
</style>
