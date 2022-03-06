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
type DataSourceItem = {text: string, value: string}

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource!: DataSourceItem[];
  @Prop(String)
  readonly value!: string;
  @Prop(String)
  classPrefix?: string;

  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + '-tabs-item']: this.classPrefix,
      selected: item.value === this.value
    }
  }

  select(item: DataSourceItem) {
    this.$emit('update:value', item.value)
  }
}
</script>

<style lang="scss" scoped>

</style>
