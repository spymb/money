<template>
  <Layout>
    <div class="nav-bar">
      <Icon class="icon-left" name="left"/>
      <span class="title">编辑标签</span>
      <span class="icon-right"></span>
    </div>

    <div class="form-wrapper">
      <FormItem :value="tag.name"
                @update:value="updateTag"
                field-name="标签名"
                placeholder="请输入标签名"/>
    </div>

    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  tag?: { name: string, id: string } = undefined;

  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace('/404');
    }
  }

  updateTag(name: string) {
    if (this.tag) {
      tagListModel.update(this.tag.id, name);
    }
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