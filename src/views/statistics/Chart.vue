<template>
  <div ref="charts" :style="{width: width, height: height}"/>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import echarts, {ECharts} from 'echarts';
import {mainColor} from '@/color';

@Component
export default class Chart extends Vue {
  @Prop() readonly dateType!: 'year-month' | 'year';
  @Prop() readonly moneyType!: '-' | '+';
  @Prop() readonly xData!: number[];
  @Prop() readonly yData!: { '+': number[]; '-': number[]; };
  @Prop({default: '100%', type: String}) readonly width!: string;
  @Prop({default: '300px', type: String}) readonly height!: string;

  get option() {
    return {
      tooltip: {
        show: true,
        trigger: 'axis',
        transitionDuration: 0,
        formatter: `{b}${this.dateType === 'year' ? '月' : '日'}<br/>{a} : {c}元`,
        textStyle: {
          fontSize: 12,
        },
        confine: true,
        position: function (point: any[]) {
          return [point[0], '30%'];
        }
      },
      grid: {
        top: 40,
        bottom: 20,
        left: 10,
        right: 10
      },
      color: [mainColor],
      title: {
        text: `${this.dateType === 'year' ? '年' : '月'}度趋势图`,
        top: 5,
        left: 'center',
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        }
      },
      xAxis: {
        type: 'category',
        data: this.xData,
        axisTick: {
          show: false
        },
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [this.moneyType === '-' ? {
        name: '支出',
        seriesLayoutBy: 'row',
        type: 'line',
        symbol: 'emptycircle',
        symbolSize: 6,
        lineStyle: {
          color: '#bbb',
          width: 1,
        },
        data: this.yData['-']
      } : {
        name: '收入',
        seriesLayoutBy: 'row',
        type: 'line',
        symbol: 'emptycircle',
        symbolSize: 6,
        lineStyle: {
          color: '#bbb',
          width: 1,
        },
        data: this.yData['+']
      }]
    };
  }

  charts: ECharts | null = null;

  /*mounted() {
    const container = this.$refs.charts as HTMLDivElement;
    if (echarts === undefined) {return;}
    this.charts = echarts.init(container);
    this.charts.setOption(this.option);
  }

  @Watch('option')
  onOptionUpdate() {
    this.charts?.setOption(this.option);
  }*/
}
</script>