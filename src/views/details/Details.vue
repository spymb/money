<template>
  <Layout class-prefix="yyy">
    <div class="dateSelector">
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
export default class Details extends Vue {
  dateTypes = [
    {text: '日', value: 'day'},
    {text: '月', value: 'month'},
  ];
  selectedDateType = 'day'
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper";
::v-deep .dateSelector {
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