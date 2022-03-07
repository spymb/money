<template>
  <Layout>
    <header class="topBar">
      <Icon name="left" @click.native="goBack"/>
      <span>管理{{ getType() }}标签</span>
      <Icon/>
    </header>

    <NameTag :icon="selectedIcon" :tag-name="selectedTagName"/>

    <Tags :type="money" :last-one="lastOne" :value2.sync="selectedIcon" :value3.sync="selectedTagName"/>
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
  selectedIcon = 'tag';
  selectedTagName = '更改标签名';

  goBack() {
    router.back();
  }

  money = this.$route.params.id;

  getType() {
    return this.money === '-' ? '支出' : '收入';
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
</style>