<template>
  <a aria-role="button" class="osg-button osg-button--icon osg-button--small osg-devtools-colorpicker" title="Background">
    <span class="osg-button__icon osg-icons--paint-bucket"></span>
    <ul class="osg-devtools-colorpicker__list">
      <li class="osg-devtools-colorpicker__transparent" @click="pick('', false)"></li>
      <li class="osg-devtools-colorpicker__white" @click="pick('#ffffff')"></li>
      <li class="osg-devtools-colorpicker__black" @click="pick('#000000')"></li>
      <li class="osg-devtools-colorpicker__yellow" @click="pick('#f9c66b')"></li>
      <li class="osg-devtools-colorpicker__red" @click="pick('#ff8274')"></li>
      <li class="osg-devtools-colorpicker__blue-dark" @click="pick('#2a2859')"></li>
      <li class="osg-devtools-colorpicker__blue" @click="pick('#6fe9ff')"></li>
      <li class="osg-devtools-colorpicker__blue-light" @click="pick('#b3f5ff')"></li>
      <li class="osg-devtools-colorpicker__blue-contrast" @click="pick('#1f42aa')"></li>
      <li class="osg-devtools-colorpicker__beige-dark" @click="pick('#d0bfae')"></li>
      <li class="osg-devtools-colorpicker__beige" @click="pick('#f8f0dd')"></li>
      <li class="osg-devtools-colorpicker__green-dark" @click="pick('#034b45')"></li>
      <li class="osg-devtools-colorpicker__green" @click="pick('#43f8b6')"></li>
      <li class="osg-devtools-colorpicker__green-light" @click="pick('#c7f6c9')"></li>
      <li class="osg-devtools-colorpicker__gray-dark" @click="pick('#2c2c2c')"></li>
      <li class="osg-devtools-colorpicker__gray" @click="pick('#f2f2f2')"></li>
      <li class="osg-devtools-colorpicker__gray-light" @click="pick('#f9f9f9')"></li>
      <li class="osg-devtools-colorpicker__purple" @click="pick('#8d50b1')"></li>
      <li class="osg-devtools-colorpicker__purple-light" @click="pick('#e0adff')"></li>
      <li class="osg-devtools-colorpicker__grayscale-10" @click="pick('#e6e6e6')"></li>
      <li class="osg-devtools-colorpicker__grayscale-20" @click="pick('#cccccc')"></li>
      <li class="osg-devtools-colorpicker__grayscale-30" @click="pick('#b3b3b3')"></li>
      <li class="osg-devtools-colorpicker__grayscale-40" @click="pick('#999999')"></li>
      <li class="osg-devtools-colorpicker__grayscale-50" @click="pick('gray')"></li>
      <li class="osg-devtools-colorpicker__grayscale-60" @click="pick('#666666')"></li>
      <li class="osg-devtools-colorpicker__grayscale-70" @click="pick('#4d4d4d')"></li>
      <li class="osg-devtools-colorpicker__grayscale-80" @click="pick('#333333')"></li>
      <li class="osg-devtools-colorpicker__grayscale-90" @click="pick('#1a1a1a')"></li>
    </ul>
  </a>
</template>
<script>
export default {
  name: 'ColorPicker',

  methods: {
    pick(color, solid = true) {
      this.$emit('pick', color, solid)
    }
  }
}
</script>
<style lang="scss" scoped>
@use "system/colors";

.osg-devtools-colorpicker {
  position: relative;

  &:hover {
    .osg-devtools-colorpicker__list {
      display: flex;
    }
  }

  .osg-devtools-colorpicker__list {
    display: none;
    position: absolute;
    left: -2px;
    top: 36px;
    background-color: colors.$gray-light;
    padding: 10px;
    text-align: left;
    flex-wrap: wrap;
    width: 180px;
    z-index: 9999;

    li {
      width: 32px;
      height: 32px;

      &:hover {
        border: 2px solid colors.$blue-contrast !important;
      }

      &.osg-devtools-colorpicker__transparent {
        background-image: linear-gradient(45deg, #eaeaea 25%, transparent 25%), linear-gradient(-45deg, #eaeaea 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eaeaea 75%), linear-gradient(-45deg, transparent 75%, #eaeaea 75%);
        background-size: 10px 10px;
        background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
        border: 2px solid transparent;
      }
      &.osg-devtools-colorpicker__white {
        @extend %osg-color-bg-white;
        border: 2px solid colors.$white;
      }
      &.osg-devtools-colorpicker__black {
        @extend %osg-color-bg-black;
        border: 2px solid colors.$black;
      }
      &.osg-devtools-colorpicker__yellow {
        @extend %osg-color-bg-yellow;
        border: 2px solid colors.$yellow;
      }
      &.osg-devtools-colorpicker__red {
        @extend %osg-color-bg-red;
        border: 2px solid colors.$red;
      }
      &.osg-devtools-colorpicker__blue-dark {
        @extend %osg-color-bg-blue-dark;
        border: 2px solid colors.$blue-dark;
      }
      &.osg-devtools-colorpicker__blue {
        @extend %osg-color-bg-blue;
        border: 2px solid colors.$blue;
      }
      &.osg-devtools-colorpicker__blue-light {
        @extend %osg-color-bg-blue-light;
        border: 2px solid colors.$blue-light;
      }
      &.osg-devtools-colorpicker__blue-contrast {
        @extend %osg-color-bg-blue-contrast;
        border: 2px solid colors.$blue-contrast;
      }
      &.osg-devtools-colorpicker__beige-dark {
        @extend %osg-color-bg-beige-dark;
        border: 2px solid colors.$beige-dark;
      }
      &.osg-devtools-colorpicker__beige {
        @extend %osg-color-bg-beige;
        border: 2px solid colors.$beige;
      }
      &.osg-devtools-colorpicker__green-dark {
        @extend %osg-color-bg-green-dark;
        border: 2px solid colors.$green-dark;
      }
      &.osg-devtools-colorpicker__green {
        @extend %osg-color-bg-green;
        border: 2px solid colors.$green;
      }
      &.osg-devtools-colorpicker__green-light {
        @extend %osg-color-bg-green-light;
        border: 2px solid colors.$green-light;
      }
      &.osg-devtools-colorpicker__gray-dark {
        @extend %osg-color-bg-gray-dark;
        border: 2px solid colors.$gray-dark;
      }
      &.osg-devtools-colorpicker__gray {
        @extend %osg-color-bg-gray;
        border: 2px solid colors.$gray;
      }
      &.osg-devtools-colorpicker__gray-light {
        @extend %osg-color-bg-gray-light;
        border: 2px solid colors.$gray-light;
      }
      &.osg-devtools-colorpicker__purple {
        @extend %osg-color-bg-purple;
        border: 2px solid colors.$purple;
      }
      &.osg-devtools-colorpicker__purple-light {
        @extend %osg-color-bg-purple-light;
        border: 2px solid colors.$purple-light;
      }
      &.osg-devtools-colorpicker__grayscale-10 {
        @extend %osg-color-bg-grayscale-10;
        border: 2px solid colors.$grayscale-10;
      }
      &.osg-devtools-colorpicker__grayscale-20 {
        @extend %osg-color-bg-grayscale-20;
        border: 2px solid colors.$grayscale-20;
      }
      &.osg-devtools-colorpicker__grayscale-30 {
        @extend %osg-color-bg-grayscale-30;
        border: 2px solid colors.$grayscale-30;
      }
      &.osg-devtools-colorpicker__grayscale-40 {
        @extend %osg-color-bg-grayscale-40;
        border: 2px solid colors.$grayscale-40;
      }
      &.osg-devtools-colorpicker__grayscale-50 {
        @extend %osg-color-bg-grayscale-50;
        border: 2px solid colors.$grayscale-50;
      }
      &.osg-devtools-colorpicker__grayscale-60 {
        @extend %osg-color-bg-grayscale-60;
        border: 2px solid colors.$grayscale-60;
      }
      &.osg-devtools-colorpicker__grayscale-70 {
        @extend %osg-color-bg-grayscale-70;
        border: 2px solid colors.$grayscale-70;
      }
      &.osg-devtools-colorpicker__grayscale-80 {
        @extend %osg-color-bg-grayscale-80;
        border: 2px solid colors.$grayscale-80;
      }
      &.osg-devtools-colorpicker__grayscale-90 {
        @extend %osg-color-bg-grayscale-90;
        border: 2px solid colors.$grayscale-90;
      }
    }
  }
}
</style>
