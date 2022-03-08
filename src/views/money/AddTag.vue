<template>
  <Layout>
    <header class="topBar">
      <Icon name="left" @click.native="goBack"/>
      <span>添加{{ getType() }}标签</span>
      <Icon/>
    </header>

    <NameTag :icon="selectedIcon" holder="添加标签名" :name.sync="newTagName"/>
    <IconList :icon.sync="selectedIcon"/>

    <div class="center">
      <div class="space"/>
      <button class="btn" @click="addTag">添加标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import router from '@/router';
import IconList from '@/views/money/IconList.vue';
import NameTag from '@/views/money/NameTag.vue';

@Component({
  components: {NameTag, IconList}
})
export default class AddTag extends Vue {
  newTagName = '';
  selectedIcon = 'tag';

  addTag() {
    this.$store.commit('createTag', {name: this.newTagName, icon: this.selectedIcon, type: this.moneyType});
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