<template>
  <Layout class-prefix="xxx">
    <!-- 监听各组件的更新事件，如事件被触发就执行对应的回调函数 -->
    <Calculator :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    {{ recordList }}
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Calculator from '@/components/Money/Calculator.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import model from '@/model';

const recordList = model.fetch();

@Component({
  components: {Tags, Notes, Types, Calculator},
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];
  recordList: RecordItem[] = recordList;
  // 用声明的Record类型收集各组件数据，首先设置默认值
  // 一开始什么都没收集当然应该为空啦
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0,
  };

  // 下面的回调函数表示组件数据更新时，把更新的数据存入record
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  saveRecord() {
    const record2: RecordItem = model.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
    console.log(this.recordList);
  }

  @Watch('recordList')
  onRecordListChanged() {
    model.save(this.recordList);
  }
}
</script>

<style lang="scss">
.xxx-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>