<template>
  <Layout>
    <div class="dateTypeSelector">
      <Tabs :data-source="dateTypes" :value.sync="selectedDateType"/>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  dateTypes = [
    {text: '月', value: 'year-month'},
    {text: '年', value: 'year'},
  ];
  selectedDateType = 'year-month';
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper";

::v-deep .dateTypeSelector {
  .tabs {
    box-shadow: inset 0 -5px 5px -5px rgba(0, 0, 0, 0.25),
    inset 0 5px 5px -5px rgba(0, 0, 0, 0.25);
    display: flex;
    background: white;

    &-item {
      width: 50%;
      text-align: center;
      padding: 16px 0;

      &.selected {
        background: $mainColor;
        color: white;
      }
    }
  }
}
</style>