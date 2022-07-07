<template>
  <div>
    <ol v-if="groupedRecordList.length > 0">
      <li v-for="(group, index) in groupedRecordList" :key="index">
        <h3 class="title">
          {{ beautify(group.time) }}
          <span class="in-out">
          <span>支出￥{{ group.total['-'] || 0 }}</span>
          <span>收入￥{{ group.total['+'] || 0 }}</span>
        </span>
        </h3>

        <ol>
          <li v-for="record in group.records" :key="record.id" class="record">
            <div class="tags">
                <span class="iconWrapper">
                  <Icon :name="record.icon"/>
                </span>
              <span>{{ record.name }}</span>
            </div>

            <span class="notes">{{ record.notes }}</span>

            <span class="amount">{{ record.type }}{{ record.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>

    <div v-else class="noResult">
      暂无数据
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';
import {RecordItem, RootState} from '@/store';
import clone from '@/lib/clone';
import Component from 'vue-class-component';

@Component
export default class RecordList extends Vue {
  @Prop() readonly dateType!: string;
  @Prop() readonly date!: Date;

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  dayType = this.dateType === 'full-date' ? 'date' : 'month';
  recordList = (this.$store.state as RootState).recordList;
  get groupedRecordList() {
    const newRecordList = clone(this.recordList)
        // @ts-ignore
        .filter(r => dayjs(r.createdAt).isSame(this.date, this.dayType))
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());

    if (newRecordList.length === 0) {return [];}

    type Result = { time: string, total?: { '-': number, '+': number }, records: RecordItem[] }[]
    const result: Result = [{time: dayjs(newRecordList[0].createdAt).format('YYYY-MM-DD'), records: [newRecordList[0]]}];

    // 将 records 的结构从 [...record] => [{ 相同日期, record[] }]
    for (let i = 1; i < newRecordList.length; i++) {
      const current = newRecordList[i];
      const last = result[result.length - 1];

      if (dayjs(last.time).isSame(dayjs(current.createdAt), 'day')) {
        last.records.push(current);
      } else {
        result.push({time: dayjs(current.createdAt).format('YYYY-MM-DD'), records: [current]});
      }
    }

    result.map(group => {
      const initial: { '-': number, '+': number } = {'-': 0, '+': 0};
      group.total = group.records.reduce((sum, item) => {
        sum[item.type] += item.amount;
        return sum;
      }, initial);
    });
    return result;
  }

  beautify(date: string) {
    const thisDay = dayjs(date);
    const now = dayjs();
    if (thisDay.isSame(now, 'day')) {
      return '今天';
    } else if (thisDay.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (thisDay.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (thisDay.isSame(now, 'year')) {
      return thisDay.format('M月D日');
    } else {
      return thisDay.format('YYYY年M月D日');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/helper";

.noResult {
  color: #c4c4c4;
  margin-top: 30px;
  font-size: 20px;
  text-align: center;
}

::v-deep {
  .type-tabs-item {
    background: white;

    &.selected {
      background: #c4c4c4;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  font-size: 16px;
  @extend %item;

  > .in-out {
    > span {
      margin-left: 10px;
    }
  }
}

.record {
  font-size: 16px;
  border-bottom: 1px solid #c4c4c4;
  background: white;
  display: flex;
  align-items: center;
  @extend %item;

  > .tags {
    display: flex;
    align-items: center;

    > .iconWrapper {
      width: 40px;
      height: 40px;
      background-color: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      margin-right: 10px;

      .icon {
        fill: $mainColor;
      }
    }
  }

  > .notes {
    margin-right: auto;
    margin-left: 20px;
    color: #999;
  }
}
</style>