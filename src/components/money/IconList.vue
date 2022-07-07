<template>
  <ol>
    <li v-for="i in IconNames" :key="i"
        :class="{selected: icon !== 'tag' && i === selectedIcon}"
        @click="selectIcon(i)">
      <div>
        <Icon :name="i"/>
      </div>
    </li>
  </ol>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class IconList extends Vue {
  @Prop() readonly icon!: string;
  IconNames = ['canyin', 'custom', 'dushu', 'fushi', 'gongzi', 'jianzhi', 'jiaotong', 'licai', 'lvxing', 'riyongpin', 'shejiao', 'yundong', 'hongbao', 'jiangjin', 'huazhuang', 'shuma', 'yule'];
  selectedIcon = '';

  selectIcon(icon: string) {
    if(icon !== this.selectedIcon) {
      this.selectedIcon = icon
    }
    this.$emit('update:icon', icon)
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/helper";

ol {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;

  > li {
    width: 20%;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border-radius: 10px;
      margin: 10px 10px;

      > .icon {
        width: 32px;
        height: 32px;
      }
    }

    &.selected {
      > div {
        background: #E8F1FF;

        .icon {
          fill: $mainColor;
        }
      }
    }
  }
}
</style>