<template>
  <div class="osg-devtools-component__statusbar">
    <div>Zoom: {{ zoom }}</div>
  </div>
</template>
<script>
export default {
  name: 'StatusBar',

  computed: {
    zoom() {
      return this.$store.state.component.settings.zoom + '%'
    }
  }
}
</script>
<style lang="scss" scoped>
@use "system/colors";
@use "system/fonts";
@use "system/spacing";

.osg-devtools-component__statusbar {
  @extend %osg-padding-horizontal-4;
  @extend %osg-text-7;
  background-color: colors.$gray-light;
  border-top: 1px solid colors.$gray;
  bottom: -29px;
  display: flex;
  height: 30px;
  left: 0;
  right: 0;
  position: absolute;
  line-height: 30px !important;

  > * {
    flex: 1 0;
  }
}
</style>
