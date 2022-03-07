<template>
  <Layout>
    <header class="topBar">
      <Icon name="left" @click.native="goBack"/>
      <span>管理{{ getType() }}标签</span>
      <Icon/>
    </header>

    <Tags :type="money" :last-one="lastOne" :multiple="true"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import router from '@/router';

@Component({
  components: {Tags},
  Tags
})
export default class setTag extends Vue {
  lastOne = ['tianjia', '添加']
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