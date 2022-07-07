<template>
  <div class="wrapper">
    <div class="rankTitle">{{moneyType === '-' ? '支出排行' : '收入排行'}}</div>

    <div v-if="tagRankData.length === 0" class="message">暂无数据</div>

    <ol v-else class="tag-rank-list">
      <li class="rank-list-item" v-for="item in tagRankData" :key="item.tag.name">
        <div class="icon-wrapper">
          <Icon class="icon" :name="item.tag.icon"/>
        </div>

        <div class="info">
          <span class="text-info">
            <span class="icon-name">{{ item.tag.name }}</span>
            <span class="percent">{{ item.percent.toFixed(2) }}%</span>
          </span>

          <div class="percent-bar" :style="{width: item.percent + '%'}"></div>
        </div>

        <span class="amount">￥{{ item.sum }}</span>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {RootState} from '@/store';
import {getRecordsByTime, getRecordsByType, getSumForTags} from '@/store/utils';
import clone from '@/lib/clone';

@Component
export default class RankList extends Vue {
  @Prop() readonly dateType!: 'year-month' | 'year';
  @Prop() readonly curDate!: Date;
  @Prop() readonly moneyType!: '-' | '+';

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }
  recordList = (this.$store.state as RootState).recordList;

  get tagRankData() {
    let records = clone(this.recordList)
    // 按时间类型和‘支出收入’分好组, 比如同月所有的支出记录
    const recordsByDateType = this.dateType === 'year-month' ?
        getRecordsByTime(records, this.curDate, 'month') : getRecordsByTime(records, this.curDate, 'year');

    const recordsByMoneyType = getRecordsByType(recordsByDateType, this.moneyType);

    // 再按标签计算金钱, 比如所有(这月支出)在吃饭上、衣服上...
    // {衣: 1, 食: 2, 住: 3, 行: 4}
    const sumsForTags = getSumForTags(recordsByMoneyType);

    // [[衣, 1], [], [], []]
    const result = Object.entries(sumsForTags);
    // 所有标签金钱总和
    const total = result.reduce((sum, item) => sum + item[1], 0);
    // 排序
    result.sort((a, b) => b[1] - a[1]);

    const getTagFromRecords = (id: string) => {
      const array = records.map(record => {
        if(record.tagID === id)
          return {icon: record.icon, name: record.name}
      })
      return array.filter(Boolean)[0]
    }

    return result.map(item => {
      return {
        tag: getTagFromRecords(item[0]),
        sum: item[1],
        percent: item[1] / total * 100
      };
    });
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/helper";
.wrapper {
  box-shadow: inset 0 5px 5px -5px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}
.rankTitle {
  justify-content: center;
  display: flex;
  padding: 10px 20px;
}
.tag-rank-list {
  .rank-list-item {
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
    border-bottom: 1px solid #c4c4c4;

    .icon-wrapper {
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

    .info {
      flex: 1;

      .text-info {
        display: flex;
        align-items: center;

        .percent {
          font-size: 12px;
          margin-left: 6px;
        }
      }

      .percent-bar {
        margin: 4px 0;
        height: 6px;
        width: 100%;
        border-radius: 5px;
        background-color: $mainColor;
      }
    }

    .amount {
      margin-left: auto;
    }
  }
}

.message {
  color: #c4c4c4;
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
}
</style>