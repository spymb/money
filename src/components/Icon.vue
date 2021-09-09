<template>
  <svg class="icon">
    <use :xlink:href=" '#' + name "/>
  </svg>
</template>

<script lang="ts">
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {
  //此处路径老老实实写.. 勿用~@
  importAll(require.context('../assets/icons', true, /\.svg$/));
} catch (error) {
  console.log(error);
}
export default {
  props: ['name'],
  name: 'Icon'
};
</script>

<style lang="scss" scoped>
  .icon {
    width: 1em;
    height: 1em;
  }

</style>