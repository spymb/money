<template>
  <Layout>
    <!-- 监听各组件的更新事件，如事件被触发就执行对应的回调函数 -->
    <Calculator @update:value="onUpdateAmount" />
    <Types :value="record.type" @update:value="onUpdateType" />
    <Notes @update:value="onUpdateNotes" />
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    {{ record }}
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Calculator from "@/components/Money/Calculator.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";

// TS声明一个类型
type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
};

@Component({
  components: { Tags, Notes, Types, Calculator },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  // 用声明的Record类型收集各组件数据，首先设置默认值
  // 一开始什么都没收集当然应该为空啦
  record: Record = {
    tags: [],
    notes: "",
    type: "",
    amount: 0,
  };
  // 下面的回调函数表示组件数据更新时，把更新的数据存入record
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  onUpdateType(value: string) {
    this.record.type = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
}
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column-reverse;
}
</style>