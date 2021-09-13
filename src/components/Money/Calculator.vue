<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Calculator extends Vue {
  @Prop() readonly value!: number;
  output: string = this.value.toString();

  inputContent(event: MouseEvent) {
    // 强制指定类型
    const button = event.target as HTMLButtonElement;
    // 不为空
    const input = button.textContent!;

    // 第1个逻辑，判断输出长度
    if (this.output.length === 16) {
      return;
    }

    // 第2个逻辑，如果输出已经是0
    if (this.output === "0") {
      // 如果输入是0123456789中的任意一个
      // 就用输入代替之前的输出
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
        // 如果输入的是. 就追加在0的后面
      } else {
        this.output += input;
      }
      return;
    }

    // 第3个逻辑，如果再次出现.
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    }

    // 除了3个特殊逻辑的一般逻辑，不要忘记
    this.output += input;
  }

  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = "0";
  }

  ok() {
    this.$emit("update:value", this.output);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  > .output {
    height: 72px;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    @extend %innerShadow;
  }

  > .buttons {
    @extend %clearFix;

    > button {
      width: 25%;
      height: 64px;
      background: transparent;
      border: none;

      &.ok {
        height: 64 * 2px;
        float: right;
      }

      &.zero {
        width: 50%;
      }

      $colorButton: #f2f2f2;

      &:nth-child(1) {
        background: $colorButton;
      }

      &:nth-child(2),
      &:nth-child(5) {
        background: darken($colorButton, 4%);
      }

      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($colorButton, 4 * 2%);
      }

      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($colorButton, 4 * 3%);
      }

      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($colorButton, 4 * 4%);
      }

      &:nth-child(14) {
        background: darken($colorButton, 4 * 5%);
      }

      &:nth-child(12) {
        background: darken($colorButton, 4 * 6%);
      }
    }
  }
}
</style>