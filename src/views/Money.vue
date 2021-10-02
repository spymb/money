<template>
  <Layout class-prefix="xxx">
    <!-- 监听各组件的更新事件，如事件被触发就执行对应的回调函数 -->
    <Calculator :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="在此输入" @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    {{ recordList }}
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Calculator from '@/components/Money/Calculator.vue';
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';
import FormItem from '@/components/Money/FormItem.vue';

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: {FormItem, Tags, Types, Calculator},
})
export default class Money extends Vue {
  tags = tagList;
  recordList = recordList;
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
    recordListModel.create(this.record)
  }

  @Watch('recordList')
  onRecordListChanged() {
    recordListModel.save();
  }
}
</script>

<style lang="scss">
.notes {
  padding: 12px 0;
}
.xxx-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>