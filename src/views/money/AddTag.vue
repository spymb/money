<template>
  <Layout>
    <header class="topBar">
      <Icon name="left" @click.native="$router.back()"/>
      <span>添加{{ moneyType === '-' ? '支出' : '收入' }}标签</span>
      <Icon/>
    </header>

    <NameTag
        :value ="value"
        :icon="selectedIcon" :name.sync="newTagName"
        holder="添加标签名" maxlength="5"/>
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
import IconList from '@/components/money/IconList.vue';
import NameTag from '@/components/money/NameTag.vue';

@Component({
  components: {NameTag, IconList}
})
export default class AddTag extends Vue {
  value = '';
  moneyType = this.$route.params.id;
  selectedIcon = 'tag';
  newTagName = '';

  addTag() {
    this.$store.commit('createTag', {name: this.newTagName, icon: this.selectedIcon, type: this.moneyType});
    this.selectedIcon = 'tag';
    this.value = '';
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