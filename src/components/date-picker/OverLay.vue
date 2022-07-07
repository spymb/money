<template>
  <transition :name="animation" :duration="duration" appear>
    <div v-show="visible" class="overlay">
      <slot/>
    </div>
  </transition>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
@Component
export default class OverLay extends Vue {
  @Prop({default: false, type: Boolean}) readonly visible!: boolean
  @Prop(String) readonly animation!: string
  @Prop({default: 0, type: Number}) readonly duration!: number
  @Prop({default: 'body', type: String}) readonly container!: string

  mounted() {
    document.body.appendChild(this.$el)
  }
  beforeDestroy() {
    this.$el.remove()
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
  transform: translateZ(0);
}
</style>