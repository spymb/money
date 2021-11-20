<template>
  <Layout class-prefix="xxx">
    <!-- 监听各组件的更新事件，如事件被触发就执行对应的回调函数 -->
    <Calculator :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="typeList" :value.sync="record.type" />
    <div class="notes">
      <FormItem field-name="备注" placeholder="在此输入" @update:value="onUpdateNotes"/>
    </div>
    <Tags/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Calculator from '@/components/Money/Calculator.vue';
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import typeList from '@/constants/typeList';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {Tabs, FormItem, Tags, Types, Calculator},
  computed: {
    //recordList() {}
  }
})
export default class Money extends Vue {
  typeList = typeList;
  // eslint-disable-next-line no-undef
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0,
  };

  created() {
    this.$store.commit('fetchRecords');
  }

  // 下面的回调函数表示组件数据更新时，把更新的数据存入record
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
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