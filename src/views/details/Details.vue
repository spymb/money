<template>
  <Layout class-prefix="yyy">
    <div class="dateTypeSelector">
      <Tabs :data-source="dateTypes" :value.sync="selectedDateType"/>
    </div>

    <div @click="showDatePicker=true" class="dateSelector">
      {{dateStr}}
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
import DatePicker from '@/components/date-picker/DatePicker.vue';
import PopUp from '@/components/date-picker/PopUp.vue';
import dayjs from 'dayjs';
import {RecordItem} from '@/store';

@Component({
  components: {PopUp, DatePicker, Tabs}
})
export default class Details extends Vue {
  dateTypes = [
    {text: '日', value: 'full-date'},
    {text: '月', value: 'year-month'},
  ];
  selectedDateType = 'full-date';
  selectedTime = new Date();
  showDatePicker = false;

  get dateStr() {
    if (this.selectedDateType === 'full-date') {
      return dayjs(this.selectedTime).format('YYYY年M月D日')
    } else {
      return dayjs(this.selectedTime).format('YYYY年M月')
    }
  }
  get selectedMonth() {
    return dayjs(this.selectedTime).month();
  }

  get selectedYear() {
    return dayjs(this.selectedTime).year();
  }

  get selectedRecords() {
    return this.getRecordsByTime(this.selectedTime, 'month') as RecordItem[];
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper";
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