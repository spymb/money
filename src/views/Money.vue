<template>
  <Layout class-prefix="xxx">
    {{ recordItemList }}
    <!-- 监听各组件的更新事件，如事件被触发就执行对应的回调函数 -->
    <Calculator :value.sync="recordItem.amount" @submit="saveRecordItem" />
    <Types :value.sync="recordItem.type" />
    <Notes @update:value="onUpdateNotes" />
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Calculator from "@/components/Money/Calculator.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Watch } from "vue-property-decorator";
import model from "@/model";

@Component({
  components: { Tags, Notes, Types, Calculator },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];

  // 用声明的RecordItem类型收集各组件数据，首先设置默认值
  // 一开始什么都没收集当然应该为空啦
  recordItem: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };

  recordItemList = model.fetch();

  // 下面的回调函数表示组件数据更新时，把更新的数据存入RecordItem
  onUpdateNotes(value: string) {
    this.recordItem.notes = value;
  }

  onUpdateTags(value: string[]) {
    this.recordItem.tags = value;
  }

  saveRecordItem() {
    const recordItem2: RecordItem = model.clone(this.recordItem);
    recordItem2.createdAt = new Date();
    this.recordItemList.push(recordItem2);
    console.log(this.recordItemList);
  }

  @Watch("recordItemList")
  onRecordItemListChanged() {
    model.save(this.recordItemList);
  }
}
</script>

<style lang="scss">
.xxx-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>