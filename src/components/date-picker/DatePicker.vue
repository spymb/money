<template>
  <div class="datepicker">
    <div class="picker-header">
      <button class="cancel-btn" @click="onCancel">取消</button>
      <header class="title">{{ dateStr }}</header>
      <button class="ok-btn" @click="onOk">确定</button>
    </div>
    <div class="picker-container">
      <PickerList v-if="showYear" v-model="year" :list-data="yearList"/>
      <PickerList v-if="showMonth" v-model="month" :list-data="monthList"/>
      <PickerList v-if="showDate" v-model="date" :list-data="dateList"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Model, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';
import PickerList from '@/components/date-picker/PickerList.vue';

export type DatePickerType = 'year' | 'year-month' | 'full-date'
@Component({
  components: {PickerList}
})
export default class DatePicker extends Vue {
  @Prop({default: 'full-date', type: String}) readonly type?: DatePickerType;
  @Model('select', {type: Date}) readonly time!: Date;

  created() {
    const ret = [];
    for (let i = 0; i < 10; i++) {
      ret.unshift(this.year - i);
    }
    this.yearList = ret;
  }

  get dateStr() {
    if (this.type === 'full-date') {
      return `${this.year}-${this.month}-${this.date}`;
    }
    if (this.type === 'year-month') {
      return `${this.year}-${this.month}`;
    }
    if (this.type === 'year') {
      return `${this.year}`;
    }
    return '';
  }
  onOk() {
    this.$emit('select', this.fullDate);
    this.$emit('ok');
  }
  onCancel() {
    this.$emit('cancel');
  }
  get fullDate() {
    return new Date(dayjs().year(this.year).month(this.month - 1).date(this.date).valueOf());
  }

  get showYear() {
    return this.type === 'full-date' || this.type === 'year-month' || this.type === 'year';
  }
  get showMonth() {
    return this.type === 'full-date' || this.type === 'year-month'
  }
  get showDate() {
    return this.type === 'full-date'
  }

  year = dayjs(this.time).year();
  month = dayjs(this.time).month() + 1;
  date = dayjs(this.time).date();

  yearList: Array<number> = [];
  get monthList() {
    return Array(12).fill(0).map((item, index) => index + 1);
  }
  get dateList() {
    return Array(this.daysInMonth).fill(0).map((item, index) => index + 1);
  }
  get daysInMonth() {
    return dayjs().year(this.year).month(this.month - 1).daysInMonth();
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper";

$list-item-height: 30px;
.datepicker {
  .picker-header {
    padding: 6px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;

    > button {
      font-size: 16px;
      border: none;
      outline: none;
      background: transparent;
    }

    .cancel-btn {
      color: #9e9e9e;
    }

    .ok-btn {
      color: $mainColor;
    }
  }

  .picker-container {
    display: flex;
    justify-content: space-between;
    overflow: hidden;

    > * {
      flex: 1;
    }
  }
}
</style>