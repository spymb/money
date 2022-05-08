<template>
  <label class="FormItem">
    <span class="name">{{this.fieldName}}</span>
    <input type="text"
           :value="value"
           @input="onValueChanged($event.target.value)"
           :placeholder="placeholder" :maxlength="maxlength"/>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) value!: string;
  @Prop({required: true}) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop() maxlength?: number;

  onValueChanged(value: string) {
    // FormItem内容变动时触发更新事件
    this.$emit('update:value', value);
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