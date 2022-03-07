<template>
  <Layout>
    <header class="topBar">
      <Icon name="left" @click.native="goBack"/>
      <span>管理{{ getType() }}标签</span>
      <Icon/>
    </header>

    <NameTag :tag-i-d="selectedTagID" :tag-name="selectedTagName" :icon="selectedIcon"/>

    <Tags :type="moneyType" :last-one="lastOne"
          :value1.sync="selectedTagID"
          :value2.sync="selectedIcon"
          :value3.sync="selectedTagName"/>

    <div class="center">
      <div class="space"/>
      <button class="btn" @click="deleteTag">删除标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import router from '@/router';
import NameTag from '@/views/money/NameTag.vue';

@Component({
  components: {NameTag, Tags},
  Tags
})
export default class setTag extends Vue {
  lastOne = ['tianjia', '添加'];
  selectedTagID = '';
  selectedIcon = 'tag';
  selectedTagName = '更改标签名';

  deleteTag() {
    this.$store.commit('removeTag', this.selectedTagID);
  }

  goBack() {
    router.back();
  }

  moneyType = this.$route.params.id;

  getType() {
    return this.moneyType === '-' ? '支出' : '收入';
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
    background: $mainColor;
    border-radius: 4px;
    color: white;
  }
}
</style>