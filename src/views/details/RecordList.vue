<template>
  <div>
    <ol v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }}
          <span class="in-out">
          <span>支出￥{{ group.total['-'] ||0}}</span>
          <span>收入￥{{ group.total['+'] ||0}}</span>
        </span>
        </h3>

        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <div class="tags">
                <span class="iconWrapper">
                  <Icon :name="getTag(item.tagID).icon"/>
                </span>
              <span>{{ getTag(item.tagID).name }}</span>
            </div>

            <span class="notes">{{ item.notes }}</span>
            <span class="amount">{{ getTag(item.tagID).type }}{{ item.amount }}</span>
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
  @Prop() readonly date!: Date;
  @Prop() readonly dateType!: string;
  @Prop() readonly records!: RecordItem[];

  get dayType() {
    return this.dateType === 'full-date' ? 'date' : 'month';
  }

  get tagList() {
    return (this.$store.state as RootState).tagList;
  }

  getTag(id: string) {
    return this.tagList.filter(tag => tag.id === id)[0];
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

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const newList = (clone(this.recordList) as RecordItem[])
        .filter(r => dayjs(r.createdAt).isSame(this.date, this.dayType))
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {
      return [];
    }
    type Result = { title: string, total?: { type: '-' | '+', amount: number }, items: RecordItem[] }[]
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {
      // @ts-ignore
      const initial: { [type: '-' | '+']: number } = {};
      // @ts-ignore
      group.total = group.items.reduce((pre, item) => {
        // @ts-ignore
        if (pre[item.type] !== undefined) {
          // @ts-ignore
          pre[item.type] += item.amount;
        } else {
          // @ts-ignore
          pre[item.type] = item.amount;
        }
        return pre;
      }, initial);
    });
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
    this.$store.commit('fetchTags');
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper";

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