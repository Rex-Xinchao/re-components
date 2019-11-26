<template>
    <div ref="switch" class="re-switch" :class="_isActive" @click="switchToggle">
        <i class="re-switch-circle"></i>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

    @Component
    export default class ReSwitch extends Vue {
        $refs: {
            [key: string]: (any);
        };
        name = 're-switch';
        // data
        isSwitch: boolean = false;

        // computed
        get _isActive(): string {
            if (this.isDisabled) {
                return 're-switch-disabled'
            }
            return this.isSwitch ? 're-switch-active' : ''
        }

        // props
        @Prop({default: () => false}) isDisabled?: boolean;
        @Prop({default: '$color-success'}) activeColor?: string;
        @Prop({default: '$color-danger'}) inactiveColor?: string;
        @Prop({default: 40}) width?: number;

        // methods
        switchToggle() {
            !this.isDisabled && (this.isSwitch = !this.isSwitch);
            !this.isDisabled && this.change(this.isSwitch);
            this.setBackgroundColor();
        };

        setBackgroundColor() {
            let newColor: string = this.isSwitch ? this.activeColor : this.inactiveColor;
            this.$refs.switch.style.borderColor = newColor;
            this.$refs.switch.style.backgroundColor = newColor;
        };

        setWidth() {
            this.$refs.switch.style.width = this.width + 'px';
        };

        // emit
        @Emit()
        change(status: boolean) {
            return status
        }

        // 钩子函数
        mounted() {
            this.setBackgroundColor();
            this.setWidth();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
    @import "../styles/coms/switch";
</style>
