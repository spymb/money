<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value"
        class="tabs-item"
        @click="select(item)" :class="liClass(item)">
      {{item.text}}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
type DataSourceItem = {text: string, type: string}

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource!: DataSourceItem[];
  @Prop(String)
  readonly type!: string;
  @Prop(String)
  classPrefix?: string;

  select(item: DataSourceItem) {
    this.$emit('update:type', item.type)
  }
  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + '-tabs-item']: this.classPrefix,
      selected: item.type === this.type
    }
  }
}
</script>
