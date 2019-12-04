<template>
    <div id="app">
        <div class="container-vertical" style="height: 100%">
            <div class="header">
                <ReMenu :options="menuList" :default="2">
                    <template slot-scope="props">
                        <span :value="props.value">{{ props.label }}</span>
                    </template>
                    <template slot="rightTools">
                        <span>插槽</span>
                    </template>
                </ReMenu>
            </div>
            <div class="container-horizontal">
                <div class="sidebar"></div>
                <div class="container-vertical">
                    <div class="main"></div>
                    <div class="footer"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ReMenu from './components/menuTag.vue';

    @Component({
        components: {ReMenu}
    })
    export default class App extends Vue {
        menuList: any[] = [{label: '菜单A', value: 1, disabled: true}, {label: '菜单B', value: 2}, {
            label: '菜单C',
            value: 3
        }];
    }
</script>
<style lang="scss">
    body{
        --main-color: #409eff;
        --main-color_light: #66b1ff;
        --text-color: #ffffff;
        --btn-size: 8px 15px;
    }
</style>
