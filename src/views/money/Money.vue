<template>
  <Layout class-prefix="xxx">
    <Calculator :value.sync="record.amount" @submit="saveRecord"/>

    <div class="notes">
      <FormItem :value.sync="record.notes" field-name="备注" placeholder="在此输入" @update:value="onUpdateNotes"/>
    </div>

    <Tags @update:value="record.tags = $event"/>

    <div class="in-out">
      <Tabs :data-source="typeList" :value.sync="record.type"/>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Calculator from '@/components/Money/Calculator.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import typeList from '@/constants/typeList';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {Tabs, FormItem, Tags, Calculator}
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
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    this.$store.commit('createRecord', this.record);
    this.record.notes = '';
  }

}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper";
::v-deep .in-out {
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

.notes {
  padding: 12px 0;
}

::v-deep .xxx-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>