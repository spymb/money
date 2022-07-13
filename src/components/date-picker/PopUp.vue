<template>
  <div class="wrapper">
    <OverLay animation="fade" :duration="300"
        :visible="visible"
        @click.native="$emit('show', false)">

      <transition name="fade" :duration="300" appear>
        <div v-show="visible" @click.stop class="popup">
          <slot/>
        </div>
      </transition>

    </OverLay>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Model} from 'vue-property-decorator';
import OverLay from './OverLay.vue';

@Component({components: {OverLay}})
export default class PopUp extends Vue {
  @Model('show', {type: Boolean, required: true}) readonly visible!: boolean;
}
</script>

<style lang="scss" scoped>
.popup {
  position: absolute;
  max-width: 450px;
  width: 100%;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -0%);
  background: #fff;
}
</style>