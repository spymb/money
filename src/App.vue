<template>
  <div id="app">
    <router-view/>

    <pop-up v-model="visible" position="center">
      <div style="text-align: center">
        <div>为保证最佳用户体验<br/>请使用手机扫码预览</div>
        <img src="@/assets/vcode.png" style="width: 250px"/>
      </div>
    </pop-up>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import PopUp from '@/components/PopUp.vue';

@Component({
  components: {PopUp}
})
export default class App extends Vue {
  visible = false;

  created() {
    if (document.documentElement.clientWidth > 450) {
      this.visible = true;
    }
    //@ts-ignore
    this.$store.commit('fetchTags');
  }
};
</script>

<style lang="scss">
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  line-height: 1.5;
  font-family: $font-hei;
  font-size: 16px;
  background: #333333;
}

#app {
  background: #f5f5f5;
  max-width: 451px;
  margin: 0 auto;
}
</style>
