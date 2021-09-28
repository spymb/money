<template>
  <label class="notes">
    <span class="name">{{this.fieldName}}</span>
    <input type="text" v-model="value" :placeholder="this.placeholder"/>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';

  @Prop({required: true}) fieldName!: string;
  @Prop() placeholder?: string;

  @Watch('value')
  onValueChanged(value: string) {
    // notes内容变动时触发更新事件
    this.$emit('update:value', this.value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  display: block;
  background: #f5f5f5;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    height: 64px;
    flex-grow: 1;
    background-color: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>