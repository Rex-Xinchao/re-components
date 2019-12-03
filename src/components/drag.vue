<template>
    <div class="re-drag">
        <ul class="re-drag-box" v-for="(value , key) in listMap">
            <li class="re-drag-header" @drop="dropPush($event, key)" @dragover="dragOver">{{key}}</li>
            <li v-for="item in value" draggable="true"
                @dragstart="dragStart($event, item, key)" @dragend="dragEnd"
                @drop="drop($event, item, key)" @dragover="dragOver" :key="item">{{item}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

    interface Options {
        listName: string
        key: any
    }

    interface ListMap {
        [key: string]: any[]
    }

    @Component
    export default class ReDrag extends Vue {
        dragging: Options = {
            listName: null,
            key: null
        };
        @Prop() listMap!: ListMap;

        dragStart(e: any, item: any, listName: string) {
            this.dragging.key = item;
            this.dragging.listName = listName;
        };

        dragEnd(e: any) {
            this.dragging.key = null;
            this.dragging.listName = null;
        };

        dragOver(e: any) {
            e.preventDefault();
        };

        drop(e: any, item: any, listName: string) {
            if (item === this.dragging) {
                return
            }
            if (listName === this.dragging.listName) {
                const newItems = [...this.listMap[listName]];
                const src = newItems.indexOf(this.dragging.key);
                const dst = newItems.indexOf(item);
                newItems.splice(dst, 0, ...newItems.splice(src, 1));
                this.listMap[listName] = newItems
            } else {
                const oldItems = [...this.listMap[this.dragging.listName]];
                const src = oldItems.indexOf(this.dragging.key);
                const value = this.listMap[this.dragging.listName].splice(src, 1);
                const newItems = [...this.listMap[listName]];
                const dst = newItems.indexOf(item);
                newItems.splice(dst, 0, ...value);
                this.listMap[listName] = newItems;
            }
            this.change(this.listMap);
        };

        dropPush(e: any, listName: string) {
            const oldItems = [...this.listMap[this.dragging.listName]];
            const src = oldItems.indexOf(this.dragging.key);
            const value = this.listMap[this.dragging.listName].splice(src, 1);
            this.listMap[listName].push(...value);
            this.change(this.listMap);
        };

        @Emit()
        change(listMap: any) {
            return listMap
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/coms/drag";
</style>
