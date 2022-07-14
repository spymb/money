<template>
  <div class="wrapper">
    <OverLay animation="fade" :duration="300"
        :visible="visible"
        @click.native="$emit('show', false)">

      <transition name="fade" :duration="300" appear>
        <div v-show="visible" @click.stop :class="popupClass">
          <slot/>
        </div>
      </transition>

    </OverLay>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Model, Prop} from 'vue-property-decorator';
import OverLay from './OverLay.vue';

@Component({components: {OverLay}})
export default class PopUp extends Vue {
  @Prop({default: 'center'}) readonly position!: 'bottom' | 'center'
  @Model('show', {type: Boolean, required: true}) readonly visible!: boolean;

  get popupClass() {
    return {
      'popup': true,
      [this.position]: this.position
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  position: absolute;
  max-width: 450px;
  width: 100%;
  background: #fff;
}
.bottom {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -0%);
}
.center {
  max-width: 250px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>