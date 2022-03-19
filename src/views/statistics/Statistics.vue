<template>
  <Layout>
    <div class="dateTypeSelector">
      <Tabs :data-source="dateTypes" :value.sync="selectedDateType"/>
    </div>

    <div class="time-money">
      <div @click="showDatePicker=true" class="time">
        {{ dateStr }}&#9660;
      </div>

      <div class="money">
        <span>支出￥{{ outcome }}</span>
        <span>收入￥{{ income }}</span>
      </div>
    </div>

    <div class="moneyTypeSelector">
      <Tabs :data-source="moneyTypes" :value.sync="selectedMoneyType"/>
    </div>

    <Chart :x-data="xData" :y-data="yData" class="charts" height="200px"
           :date-type="selectedDateType" :money-type="selectedMoneyType"/>

    <RankList :money-type="selectedMoneyType" :date-type="selectedDateType" :cur-date="selectedTime"/>

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
import {getRecordsByTime, getSum} from '@/store/utils';
import {RecordItem, RootState} from '@/store';
import Chart from '@/views/statistics/Chart.vue';
import RankList from '@/views/statistics/RankList.vue';

@Component({
  components: {RankList, Chart, DatePicker, PopUp, Tabs}
})
export default class Statistics extends Vue {
  dateTypes = [
    {text: '月', value: 'year-month'},
    {text: '年', value: 'year'},
  ];
  selectedDateType: 'full-date' | 'year-month' | 'year' = 'year-month';
  moneyTypes = [
    {text: '支出', value: '-'},
    {text: '收入', value: '+'},
  ];
  selectedMoneyType = '-';
  selectedTime = new Date();
  showDatePicker = false;

  get outcome() {
    return getSum(this.recordList, '-', this.selectedTime.toISOString(), this.selectedDateType) || 0;
  }

  get income() {
    return getSum(this.recordList, '+', this.selectedTime.toISOString(), this.selectedDateType) || 0;
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get dateStr() {
    if (this.selectedDateType === 'year') {
      return dayjs(this.selectedTime).format('YYYY年');
    } else {
      return dayjs(this.selectedTime).format('YYYY年M月');
    }
  }

  get dateArr() {
    return Array(dayjs(this.selectedTime).daysInMonth()).fill(0).map((_, index) => index + 1);
  }

  monthArr = Array(12).fill(0).map((_, index) => index + 1);

  getSumByDates(records: RecordItem[], date: Date) {
    records = getRecordsByTime(records, date, 'month');
    if (this.dateArr === undefined) {return; }
    const ret = {
      '+': this.dateArr.map(_ => 0),
      '-': this.dateArr.map(_ => 0)
    };
    return records.reduce((acc, record) => {
      acc[record.type][dayjs(record.createdAt).date() - 1] += record.amount;
      return acc;
    }, ret);
  }

  getSumForMonths(records: RecordItem[], date: Date) {
    records = getRecordsByTime(records, date, 'year');
    if (this.monthArr === undefined) {return; }
    const ret = {
      '+': this.monthArr.map(_ => 0),
      '-': this.monthArr.map(_ => 0)
    };
    return records.reduce((acc, record) => {
      acc[record.type][dayjs(record.createdAt).month()] += record.amount;
      return acc;
    }, ret);
  }

  get xData() {
    return this.selectedDateType === 'year-month' ? this.dateArr : this.monthArr;
  }

  get yData() {
    return this.selectedDateType === 'year-month' ?
        this.getSumByDates(this.recordList, this.selectedTime) :
        this.getSumForMonths(this.recordList, this.selectedTime);
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper";
.time-money {
  box-shadow: inset 0 -5px 5px -5px rgba(0, 0, 0, 0.25);
  background: white;
  padding: 10px 15px;
  text-align: center;
  color: $mainColor;
  display: flex;
  justify-content: space-between;
  font-size: 16px;

  > .money {
    > span {
      margin-left: 10px;
    }
  }
}
::v-deep .moneyTypeSelector {
  font-size: 14px;
  padding: 0 110px;
  margin: 10px 0;

  .tabs {
    justify-content: space-evenly;
    display: flex;

    &-item {
      border: 1px solid #cccccc;
      border-radius: 5px;
      width: 30%;
      text-align: center;
      padding: 4px 0;

      &.selected {
        background: $mainColor;
        color: white;
      }
    }
  }
}

::v-deep .dateTypeSelector {
  .charts {
    flex-shrink: 0;
  }

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