<template>
  <Layout class-prefix="xxx">
    <Calculator :value.sync="record.amount" @submit="saveRecord"/>

    <div class="notes">
      <FormItem :value.sync="record.notes" field-name="备注" placeholder="请在此输入" maxlength="32"/>
    </div>
    <Tags :id.sync="record.tagID" :icon.sync="record.icon" :name.sync="record.name"
          :type="record.type" :last-one="lastOne"/>

    <div class="in-out">
      <Tabs :type.sync="record.type" :data-source="typeList"/>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Calculator from '@/components/money/Calculator.vue';
import Tags from '@/components/money/Tags.vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/money/FormItem.vue';
import typeList from '@/constants/typeList';
import Tabs from '@/components/Tabs.vue';
import {RecordItem, Tag} from '@/store';

@Component({
  components: {Tabs, FormItem, Tags, Calculator}
})
export default class Money extends Vue {
  record: RecordItem = {type: '-', tagID: '', icon: '', name: '', notes: '', amount: 0};
  typeList = typeList;
  lastOne = ['settings', '设置'];

  saveRecord() {
    if (this.record.tagID === '') {
      return window.alert('请选择标签');
    }
    if (this.record.amount === -0 || this.record.amount === +0) {
      return window.alert('金额不得为0');
    }
    this.$store.commit('createRecord', this.record);
    this.record.tagID = '';
    this.record.icon = '';
    this.record.name = '';
    this.record.notes = '';
    this.record.amount = 0;
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
  border-top: 1px solid #c4c4c4;
  padding: 10px 0;
}

::v-deep .xxx-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>