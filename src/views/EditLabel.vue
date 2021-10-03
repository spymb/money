<template>
  <Layout>
    <div class="nav-bar">
      <Icon class="icon-left" name="left" @click.native="goBack"/>
      <span class="title">编辑标签</span>
      <span class="icon-right"></span>
    </div>

    <div class="form-wrapper">
      <FormItem :value="tag.name"
                @update:value="update"
                field-name="标签名"
                placeholder="请输入标签名"/>
    </div>

    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  tag?: Tag = undefined;

  created() {
    this.tag = window.findTag(this.$route.params.id);
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  update(name: string) {
    if (this.tag) {
      window.updateTag(this.tag.id, name);
    }
  }

  remove(id: string) {
    if (this.tag) {
      if (window.removeTag(this.tag.id)) {
        this.$router.replace('/labels');
      } else {
        alert('删除失败');
      }
    }
  }

  goBack() {
    this.$router.back();
  }

}

</script>

<style lang="scss" scoped>
.nav-bar {
  text-align: center;
  font-size: 16px;
  background: white;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .icon-left {
    width: 24px;
    height: 24px;
  }

  > .title {

  }

  > .icon-right {
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;
}
</style>