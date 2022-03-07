<template>
  <Layout>
    <header class="topBar">
      <Icon name="left" @click.native="goBack"/>
      <span>添加{{ getType() }}标签</span>
      <Icon/>
    </header>


    <IconList/>

    <div class="center">
      <div class="space"/>
      <button class="btn">添加标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import router from '@/router';
import IconList from '@/views/money/IconList.vue';
@Component({
  components: {IconList}
})
export default class AddTag extends Vue {
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
</style>