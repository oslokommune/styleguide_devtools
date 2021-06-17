<template>
  <div class="osg-devtools-start">
    <div class="osg-text-center">
      <h1 class="osg-heading-1">Oslo</h1>
      <h1 class="osg-heading-1 osg-margin-bottom-30">Styleguide</h1>
      <div class="osg-text-3">Retningslinjer for digitalt grensesnitt.</div>
      <div class="osg-text-3">Dokumentasjon og visning av stiler, komponenter og sider.</div>
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
