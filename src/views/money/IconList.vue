<template>
  <ol>
    <li v-for="icon in IconNames" :key="icon"
        :class="{selected: icon === selectedIcon}"
        @click="onToggleIcon(icon)">
      <div>
        <Icon :name="icon"/>
      </div>
    </li>
  </ol>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class IconList extends Vue {
  IconNames = ['canyin', 'custom', 'dushu', 'fushi', 'gongzi', 'jianzhi', 'jiaotong', 'licai', 'lvxing', 'riyongpin', 'shejiao', 'yundong', 'hongbao', 'jiangjin', 'huazhuang', 'shuma', 'yule'];
  selectedIcon = '';

  onToggleIcon(icon: string) {
    this.selectedIcon = icon !== this.selectedIcon ? icon : '';
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper";

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