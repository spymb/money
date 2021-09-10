<template>
  <Layout>
    <div class="numberPad">
      <div class="output">100</div>
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button class="ok">OK</button>
        <button class="zero">0</button>
        <button>.</button>
      </div>
    </div>
    <div>
      <ul class="inAndout">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" placeholder="在此输入">
    </label>
    <div class="tags">
      <div class="new">
        <button>新增标签</button>
      </div>
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
    </div>
  </Layout>
</template>

<script lang="ts">
export default {
  name: 'Money',
};
</script>

<style lang="scss">
  .content{
    border: 1px solid red;
    display: flex;
    flex-direction: column-reverse;
  }
</style>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .tags {
    border: 1px solid blue;
    display: flex;
    flex-direction: column-reverse;
    flex-grow: 1;
    font-size: 14px;
    padding: 16px;
    > .current {
      display: flex;
      > li {
        height: 24px;
        line-height: 24px;
        border-radius: 12px;
        background: #d9d9d9;
        padding: 0 16px;
        margin-right: 12px;
      }
    }
    > .new {
      padding-top: 16px;
      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }

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

  .inAndout {
    display: flex;
    background: #c4c4c4;
    /*text-align: center;*/
    font-size: 24px;
    > li {
      width: 50%;
      height: 64px;
      /*line-height: 64px;*/
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333;
      }
    }
  }

  .numberPad {
    > .output {
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
          height: 64*2px;
          float: right;
        }
        &.zero {
          width: 50%;
        }
        $colorButton: #f2f2f2;
        &:nth-child(1) {
          background: $colorButton;
        }
        &:nth-child(2), &:nth-child(5) {
          background: darken($colorButton, 4%);
        }
        &:nth-child(3), &:nth-child(6), &:nth-child(9) {
          background: darken($colorButton, 4*2%);
        }
        &:nth-child(4), &:nth-child(7), &:nth-child(10) {
          background: darken($colorButton, 4*3%);
        }
        &:nth-child(8), &:nth-child(11), &:nth-child(13) {
          background: darken($colorButton, 4*4%);
        }
        &:nth-child(14) {
          background: darken($colorButton, 4*5%);
        }
        &:nth-child(12) {
          background: darken($colorButton, 4*6%);
        }
      }
    }
  }
</style>
