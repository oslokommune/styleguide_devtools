<template>
  <div class="osg-devtools-start">
    <div class="osg-text-center">
      <h1 class="osg-heading-1">Oslo</h1>
      <h1 class="osg-heading-1 osg-margin-bottom-30">Designsystem</h1>
      <div class="osg-text-3">Guidelines for www.oslo.kommune.no</div>
      <div class="osg-text-3">Documentation, code and examples of styles, components and pages.</div>
      <figure class="osg-margin-top-75">
        <img src="/assets/images/illustration.svg" />
      </figure>
    </div>
</div>
</template>

<script>
import '../assets/images/illustration.svg';

export default {
  name: 'Start'
}
</script>
<style lang="scss" scoped>
@use "system/colors";

.osg-devtools-start {
  background-color: colors.$blue-dark;
  color: colors.$white;
  height: 100vh;
  display: flex;

  align-items: center;
  justify-content: center;

  h1 {
    line-height: 1em !important;
  }
}
</style>
