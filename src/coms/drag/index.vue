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

<script>
export default {
  name: 're-drag',
  data () {
    return {
      dragging: { // 当前选中并拖动的列
        listName: '',
        key: ''
      }
    }
  },
  props: {
    listMap: {
      type: Object, default: () => {
        return {
          listOne: [1, 3, 5, 7, 9],
          listTwo: [2, 4, 6, 8, 10]
        }
      }
    }
  },
  methods: {
    dragStart (e, item, listName) {
      this.dragging.key = item
      this.dragging.listName = listName
    },
    dragEnd (e) {
      this.dragging.key = null
      this.dragging.listName = null
    },
    dragOver (e) {
      e.preventDefault()
    },
    drop (e, item, listName) {
      if (item === this.dragging) {
        return
      }
      if (listName === this.dragging.listName) {
        const newItems = [...this.listMap[listName]]
        const src = newItems.indexOf(this.dragging.key)
        const dst = newItems.indexOf(item)
        newItems.splice(dst, 0, ...newItems.splice(src, 1))
        this.listMap[listName] = newItems
      } else {
        const oldItems = [...this.listMap[this.dragging.listName]]
        const src = oldItems.indexOf(this.dragging.key)
        const value = this.listMap[this.dragging.listName].splice(src, 1)
        const newItems = [...this.listMap[listName]]
        const dst = newItems.indexOf(item)
        newItems.splice(dst, 0, ...value)
        this.listMap[listName] = newItems
      }
      this.$emit('change', this.listMap)
    },
    dropPush (e, listName) {
      const oldItems = [...this.listMap[this.dragging.listName]]
      const src = oldItems.indexOf(this.dragging.key)
      const value = this.listMap[this.dragging.listName].splice(src, 1)
      this.listMap[listName].push(...value)
      this.$emit('change', this.listMap)
    }
  }
}
</script>
<style lang="scss" scoped>
    @import "../../styles/index";
    @import "../../styles/coms/drag";
</style>
