<template>
  <Layout>
    <Calculator/>
    <Types/>
    <Notes/>
    <Tags/>
  </Layout>
</template>

<script lang="ts">
import Calculator from '@/components/Money/Calculator.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';

export default {
  name: 'Money',
  components: {Tags, Notes, Types, Calculator},
};
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column-reverse;
}
</style>