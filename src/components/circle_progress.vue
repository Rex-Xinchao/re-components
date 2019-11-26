<template>
    <div class="re-progress-circle" ref="progress">
        <canvas class="re-progress-chart" id="progressCircle"></canvas>
        <span class="re-progress-text" ref="text">{{`${progress}%`}}</span>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
    import {textColorObj, bgColorObj} from '@lib/alert/config'
    import {Circle} from '@interface/canvas'

    @Component
    export default class ReCircleProgress extends Vue {
        $refs: {
            [key: string]: (any);
        };
        name = 're-progress-circle';

        @Prop({default: 50}) radius?: number;
        @Prop({default: 8}) strokeWidth?: number;
        @Prop({default: '#409eff'}) color?: string;
        @Prop({default: 75, validator: val => val >= 0 && val <= 100}) progress?: number;

        @Watch('progress')
        onProgressChanged() {
            this.createCircle();
            this.setText()
        }

        // methods
        createCircle() {
            let $progress = this.$refs.progress;
            $progress.style.width = this.radius * 2 + 'px';
            $progress.style.height = this.radius * 2 + 'px';
            let canvas = <HTMLCanvasElement> document.getElementById('progressCircle');
            let ctx = canvas.getContext('2d');
            canvas.width = this.radius * 2;
            canvas.height = this.radius * 2;
            const circle_hl: Circle = {
                x: this.radius,
                y: this.radius,
                size: this.radius - this.strokeWidth,
                start: Math.PI,
                end: Math.PI + 2 * this.progress / 100 * Math.PI,
            };
            ctx.beginPath();
            ctx.arc(circle_hl.x, circle_hl.y, circle_hl.size, circle_hl.start, circle_hl.end);
            ctx.strokeStyle = '#00ff99';
            ctx.lineWidth = this.strokeWidth;
            ctx.stroke();

            const circle_bg: Circle = {
                x: this.radius,
                y: this.radius,
                size: this.radius - this.strokeWidth,
                start: Math.PI + 2 * this.progress / 100 * Math.PI,
                end: Math.PI,
            };
            ctx.beginPath();
            ctx.arc(circle_bg.x, circle_bg.y, circle_bg.size, circle_bg.start, circle_bg.end);
            ctx.strokeStyle = '#CCC';
            ctx.lineWidth = this.strokeWidth;
            ctx.stroke();
        }

        setText() {
            let carWidth: number = 11; // 符号%的宽度
            let width: number = String(this.progress).length * 7;
            let skewLength: number = (carWidth + width) / 2;
            let top: string = (this.radius - 8) + 'px';
            let left: string = (this.radius - skewLength) + 'px';
            this.$refs.text.style.top = top;
            this.$refs.text.style.left = left;
        }

        // 钩子函数
        mounted() {
            this.createCircle();
            this.setText();
        }
    }
</script>

<style lang="scss">
    @import "../styles/coms/progress";
</style>
