<template>
  <nav>
    <router-link to="/details" class="item" active-class="selected">
      <Icon name="details"/>
      明细
    </router-link>

    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>

    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="chart"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

nav {
  display: flex;
  @extend %outerShadow;

  > .item {
    font-size: 10px;
    width: 33.33333%;
    padding: 4px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 24px;
      height: 24px;
    }
  }
  .item.selected {
    color: $mainColor;
    .icon {
      fill: $mainColor;
    }
  }
}
</style>