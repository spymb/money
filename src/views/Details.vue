<template>
  <Layout class-prefix="yyy">
    <div class="dateTypeSelector">
      <Tabs :type.sync="selectedDateType" :data-source="dateTypes"/>
    </div>

    <div @click="datePickerVisible=true" class="dateSelector">
      {{dateStr}}&#9660;
    </div>

    <RecordList :date-type="selectedDateType" :date="selectedTime" />

    <pop-up v-model="datePickerVisible">
      <DatePicker :type="selectedDateType" v-model="selectedTime"
                  @ok="datePickerVisible = false"
                  @cancel="datePickerVisible = false"/>
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
import RecordList from '@/components/details/RecordList.vue';

@Component({
  components: {RecordList, PopUp, DatePicker, Tabs}
})
export default class Details extends Vue {
  dateTypes = [
    {text: '日', type: 'full-date'},
    {text: '月', type: 'year-month'},
  ];
  datePickerVisible = false;
  selectedDateType = 'full-date';
  selectedTime = new Date();

  get dateStr() {
    if (this.selectedDateType === 'full-date') {
      return dayjs(this.selectedTime).format('YYYY年M月D日')
    } else {
      return dayjs(this.selectedTime).format('YYYY年M月')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/helper";
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