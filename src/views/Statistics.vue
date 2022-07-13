<template>
  <Layout>
    <div class="dateTypeSelector" ref="dts">
      <Tabs :data-source="dateTypes" :type.sync="selectedDateType"/>
    </div>

    <div class="time-money">
      <div class="time" @click="select">
        {{ dateStr }}&#9660;
      </div>
      <div class="money">
        <span>支出￥{{ outcome }}</span>
        <span>收入￥{{ income }}</span>
      </div>
    </div>

    <div class="moneyTypeSelector">
      <Tabs :data-source="moneyTypes" :type.sync="selectedMoneyType"/>
    </div>

    <Chart :x-data="xData" :y-data="yData"
           :date-type="selectedDateType" :money-type="selectedMoneyType"/>

    <RankList :money-type="selectedMoneyType" :date-type="selectedDateType" :cur-date="selectedTime"/>

    <pop-up v-model="datePickerVisible">
      <DatePicker :type="selectedDateType" v-model="selectedTime"
                  @ok="datePickerVisible = false" @cancel="datePickerVisible = false"/>
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
import Chart from '@/components/statistics/Chart.vue';
import RankList from '@/components/statistics/RankList.vue';
import clone from '@/lib/clone';

@Component({
  components: {RankList, Chart, DatePicker, PopUp, Tabs}
})
export default class Statistics extends Vue {
  dateTypes = [
    {text: '月', type: 'year-month'},
    {text: '年', type: 'year'},
  ];
  selectedDateType: 'full-date' | 'year-month' | 'year' = 'year-month';
  moneyTypes = [
    {text: '支出', type: '-'},
    {text: '收入', type: '+'},
  ];
  selectedMoneyType = '-';
  selectedTime = new Date();
  datePickerVisible = false;
  records = (this.$store.state as RootState).recordList;
  recordList = clone(this.records);
  recordList1 = clone(this.records);

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  select() {
    this.datePickerVisible = true;
    const dts = document.querySelector('.dateTypeSelector');
    if (dts && dts.clientWidth > 450) {
      window.alert('日期选择仅支持触屏，请使用手机体验');
    }
  }

  get dateStr() {
    if (this.selectedDateType === 'year') {
      return dayjs(this.selectedTime).format('YYYY年');
    } else {
      return dayjs(this.selectedTime).format('YYYY年M月');
    }
  }

  get outcome() {
    return getSum(this.recordList, '-', this.selectedTime.toISOString(), this.selectedDateType) || 0;
  }

  get income() {
    return getSum(this.recordList, '+', this.selectedTime.toISOString(), this.selectedDateType) || 0;
  }

  get xData() {
    return this.selectedDateType === 'year-month' ? this.dateArr : this.monthArr;
  }

  get yData() {
    return this.selectedDateType === 'year-month' ?
        this.getSumByDates(this.records, this.selectedTime) :
        this.getSumForMonths(this.records, this.selectedTime);
  }

  get dateArr() {
    return Array(dayjs(this.selectedTime).daysInMonth()).fill(0).map((_, index) => index + 1);
  }

  monthArr = Array(12).fill(0).map((_, index) => index + 1);

  getSumByDates(records: RecordItem[], date: Date) {
    const recordsByMonth = getRecordsByTime(records, date, 'month');
    const initial = {
      '+': this.dateArr.map(_ => 0),
      '-': this.dateArr.map(_ => 0)
    };
    return recordsByMonth.reduce((result, record) => {
      result[record.type][dayjs(record.createdAt).date() - 1] += record.amount;
      return result;
    }, initial);
  }

  getSumForMonths(records: RecordItem[], date: Date) {
    const recordsByYear = getRecordsByTime(records, date, 'year');
    const initial = {
      '+': this.monthArr.map(_ => 0),
      '-': this.monthArr.map(_ => 0)
    };
    return recordsByYear.reduce((result, record) => {
      result[record.type][dayjs(record.createdAt).month()] += record.amount;
      return result;
    }, initial);
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/helper";

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