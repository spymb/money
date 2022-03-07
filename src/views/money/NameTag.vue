<template>
  <label class="wrapper">
    <span class="iconWrapper">
      <Icon :name="icon"/>
    </span>

    <input type="text"
           @blur="changeTagName(tagID, $event.target.value)"
           :placeholder="tagName" class="nameInput"/>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NameTag extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly tagName!: string;
  @Prop() readonly tagID!: string;

  changeTagName(id: string, name: string) {
    this.$store.commit('updateTag', {id, name});
    window.location.reload();
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 24px 20px;
}

.iconWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;

  > .icon {
    font-size: 48px;
  }
}

.nameInput {
  width: 0;
  flex: 1;
  border: none;
  outline: none;
  text-align: right;
  line-height: 24px;
  font-size: 20px;
  background: #f5f5f5;
}
</style>