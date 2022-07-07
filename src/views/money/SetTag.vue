<template>
  <Layout>
    {{ value }}
    <header class="topBar">
      <Icon name="left" @click.native="$router.back()"/>
      <span>管理{{ moneyType === '-' ? '支出' : '收入' }}标签</span>
      <Icon/>
    </header>

    <NameTag :id.sync="selectedTagID"
             :holder.sync="selectedTagName"
             :icon.sync="selectedIcon"
             :value.sync='value'
             maxlength="5"/>

    <Tags :type="moneyType" :last-one="lastOne"
          :id.sync="selectedTagID"
          :icon.sync="selectedIcon"
          :name.sync="selectedTagName"/>

    <div class="center">
      <div class="space"/>
      <button class="btn" @click="deleteTag">删除标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/money/Tags.vue';
import {Component} from 'vue-property-decorator';
import NameTag from '@/components/money/NameTag.vue';

@Component({
  components: {NameTag, Tags},
})
export default class setTag extends Vue {
  value = '';
  selectedTagID = '0';
  selectedIcon = 'tag';
  selectedTagName = '更改标签名';
  moneyType = this.$route.params.id;
  lastOne = ['tianjia', '添加'];

  deleteTag() {
    this.$store.commit('removeTag', this.selectedTagID);
    this.selectedIcon = 'tag';
    this.selectedTagName = '更改标签名';
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper";

.topBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 20px;
  padding: 20px;
  background: $mainColor;
  font-size: 20px;
  color: white;

  > .icon {
    fill: white;
  }
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > .space {
    height: 16px;
  }

  > .btn {
    font-size: 18px;
    border: none;
    padding: 8px 12px;
    background: #FF6161;
    border-radius: 4px;
    color: white;
  }
}
</style>