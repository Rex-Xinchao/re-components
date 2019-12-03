<template>
    <div class="re-menu-container">
        <ul class="re-menu" :style="{backgroundColor: backgroundColor}">
            <li v-for="(item, index) in options" class="re-menu-item"
                :class="{'re-menu-item--active': selectedTag === item.value, 're-menu-item--disabled': item.disabled}"
                :style="{  color: selectedTag === item.value ? activeTextColor : textColor,  borderBottomColor: selectedTag === item.value ? activeTextColor : textColor}"
                :disabled="item.disabled" :value="item.value" :key="index"
                @click="onSelect(item)">
                <slot :label="item.label" :value="item.value"></slot>
            </li>
        </ul>
        <div class=" re-right-tools">
            <slot name="rightTools"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

    @Component
    export default class ReMenu extends Vue {
        @Prop() options!: any;
        @Prop() default: [String, Number];
        @Prop({default: '#fff'}) backgroundColor: string;
        @Prop({default: '#a0a0a0'}) textColor: string;
        @Prop({default: '#409eff'}) activeTextColor: string;
        selectedTag: [String, Number] = this.default;

        onSelect(item: any) {
            item.disabled || (this.selectedTag = item.value);
            item.disabled || this.$emit('select', item.value);
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/coms/menu";
</style>
