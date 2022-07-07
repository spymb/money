<template>
  <div class="picker-list-wrapper">
    <div class="picker-list-wheel">

      <ul @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
          class="picker-list" :style="style">
        <li class="picker-list-item" v-for="item in listData" :key="item">{{ item }}</li>
      </ul>

    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Model, Watch} from "vue-property-decorator";

@Component
export default class PickerList extends Vue {
  @Prop({default: [], type: Array}) readonly listData!: Array<number>
  @Model('select', [String, Number]) readonly time!: number

  startY = 0
  startTop = 0
  style = {
    top: '0px',
    transition: 'none'
  }

  mounted() {
    const index = this.listData.indexOf(this.time)
    this.style.top = - index * 30 + 'px'
  }
  @Watch('listData')
  onListDataChange(val: Array<number>) {
    const curIndex = -Math.round(parseInt(this.style.top) / 30)
    if (curIndex >= this.listData.length) {
      this.style.top = -(this.listData.length - 1) * 30 + 'px'
    }
  }
  onTouchStart(e: TouchEvent) {
    this.startY = e.touches[0].clientY
    this.startTop = parseInt(this.style.top)
    this.style.transition = 'none'
    e.preventDefault()
  }
  onTouchMove(e: TouchEvent) {
    const limitRange = 50
    const maxTop = limitRange
    const minTop = - (this.listData.length - 1) * 30 - limitRange
    let top = this.startTop + e.touches[0].clientY - this.startY
    top = top > maxTop ? maxTop : top
    top = top < minTop ? minTop : top
    this.style.top = top + 'px'
    e.preventDefault()
  }
  onTouchEnd(e: TouchEvent) {
    let top = parseInt(this.style.top)
    top > 0 && (top = 0)
    let index = -Math.round(top/30)
    index >= this.listData.length && (index = this.listData.length - 1)
    this.style.top = -index * 30 + 'px'
    this.style.transition = 'top 200ms ease-in'
    this.$emit('select', this.listData[index])
    e.preventDefault()
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper";
$list-item-height: 30px;
.picker-list-wrapper {
  position: relative;
  margin: 0 6px;
  display: flex;
  align-items: center;
  height: $list-item-height * 5;
  .picker-list-wheel {
    position: relative;
    width: 100%;
    height: $list-item-height;
    border-top: 1px solid $mainColor;
    border-bottom: 1px solid $mainColor;
    .picker-list {
      position: absolute;
      top: -30px;
      left: 0;
      width: 100%;
      .picker-list-item {
        font-size: 20px;
        text-align: center;
        line-height: $list-item-height;
        height: $list-item-height;
      }
    }
  }
}
</style>