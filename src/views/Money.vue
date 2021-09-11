<template>
  <Layout>
    <Calculator/>
    <Types/>
    <Notes/>
    <Tags :data-source.sync="tags" />
  </Layout>
</template>

<script>
import Calculator from '@/components/Money/Calculator.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';

export default {
  name: 'Money',
  components: {Tags, Notes, Types, Calculator},
  data() {
    return {
      tags: ['衣', '食', '住', '行', '彩票']
    }
  }
};
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column-reverse;
}
</style>