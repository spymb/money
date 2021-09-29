<template>
  <label class="FormItem">
    <span class="name">{{this.fieldName}}</span>
    <input type="text" v-model="value" :placeholder="this.placeholder"/>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  value = '';

  @Prop({required: true}) fieldName!: string;
  @Prop() placeholder?: string;

  @Watch('value')
  onValueChanged(value: string) {
    // FormItem内容变动时触发更新事件
    this.$emit('update:value', this.value);
  }
}
</script>

<style lang="scss" scoped>
.FormItem {
  display: block;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    height: 40px;
    flex-grow: 1;
    background-color: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>