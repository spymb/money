<template>
  <Layout>
    <div class="dateTypeSelector">
      <Tabs :data-source="dateTypes" :value.sync="selectedDateType"/>
    </div>

    <div @click="showDatePicker=true" class="dateSelector">
      {{ dateStr }}&#9660;
    </div>

    <div class="moneyTypeSelector">
      <Tabs :data-source="moneyTypes" :value.sync="selectedMoneyType"/>
    </div>

    <pop-up v-model="showDatePicker" position="bottom">
      <DatePicker :type="selectedDateType" v-model="selectedTime" @ok="showDatePicker = !showDatePicker"/>
    </pop-up>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import PopUp from '@/components/date-picker/PopUp.vue';
import DatePicker from '@/components/date-picker/DatePicker.vue';
import dayjs from 'dayjs';

@Component({
  components: {DatePicker, PopUp, Tabs}
})
export default class Statistics extends Vue {
  dateTypes = [
    {text: '月', value: 'year-month'},
    {text: '年', value: 'year'},
  ];
  selectedDateType = 'year-month';
  moneyTypes = [
    {text: '支出', value: '-'},
    {text: '收入', value: '+'},
  ];
  selectedMoneyType = '-';
  selectedTime = new Date();
  showDatePicker = false;

  get dateStr() {
    if (this.selectedDateType === 'year') {
      return dayjs(this.selectedTime).format('YYYY年');
    } else {
      return dayjs(this.selectedTime).format('YYYY年M月');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper";
::v-deep .moneyTypeSelector {
  margin-top: 10px;
  .tabs {
    display: flex;
    justify-content: space-evenly;
    padding: 0 120px;
    &-item {
      font-size: 12px;
      border-radius: 5px;
      border: 1px solid #cccccc;
      width: 25%;
      text-align: center;
      padding: 3px 3px;

      &.selected {
        background: $mainColor;
        color: white;
      }
    }
  }
}
.dateSelector {
  box-shadow: inset 0 -5px 5px -5px rgba(0, 0, 0, 0.25);
  background: white;
  padding: 10px 0;
  text-align: center;
  color: $mainColor;
}
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