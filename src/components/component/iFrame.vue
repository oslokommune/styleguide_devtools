<template>
  <iframe :srcdoc="frameContents" />
</template>
<script>
export default {
  name: 'iFrame',

  props: {
    devMode: {
      type: Boolean
    },
    content: {
      type: String
    },
    hash: {
      type: String
    }
  },

  computed: {
    frameContents() {
      let template =
        `<!DOCTYPE html>
        <html lang="en">
        <head>
        <link href="/main.css?${this.hash}" rel="stylesheet" type="text/css">
        <style>
        body { margin-top: 20px; background-color: inherit; transform-origin: 0 0; transform: scale(${this.zoom / 100}); }
        body.osg-devtools-devmode .osg-devtools-nondevmode { display: none !important; }
        body.osg-devtools-nondevmode .osg-devtools-devmode { display: none !important; } 
        </style>
        <script src="/devtools.js?${this.hash}"><\/script>
        </head>
        <body class="${this.devMode ? 'osg-devtools-devmode' : 'osg-devtools-nondevmode'}">
        ${this.content}
        <script src="/osg.js?${this.hash}" defer><\/script></body></html>`

      
      return template
    },

    zoom() {
      return this.devMode ? this.$store.state.component.settings.zoom : 100
    }
  }
}
</script>
<style lang="scss">
@use "system/colors";
@use "system/fonts";
@use "system/icons";
@use "system/spacing";
@use "components/grid/container/container";

.osg-devtools-nondevmode .osg-devtools-code {
  @extend %osg-margin-top-30;
} 

.osg-devtools-code {
  &__box {
    @extend %osg-padding-30;
    border: 4px solid colors.$gray;
    
    @each $name, $color in colors.$colors {
      &--#{$name} { 
        background-color: $color;
        border: 4px solid $color;
      }
    }
  }
 
  &__trigger {
    @extend %osg-margin-vertical-10;
    @extend %osg-text-medium;
    display: block;
    font-size: fonts.$size-16;
    text-align: right;
    text-decoration: none;

    & .osg-icon {
      @extend %osg-margin-left-5;
      font-size: fonts.$size-24;
      vertical-align: top;
    }
    &.osg-collapsible__trigger--expanded .osg-icon::before {      
      content: map-get(icons.$icons, 'chevron-thin-up') !important;
    }
  }

  pre {
    display: block;
    background-color: colors.$gray-light;
    border: 2px solid colors.$grayscale-20;
    font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
    overflow-x: auto;

    code {
      @extend %osg-padding-10;
      border: none;
      background-color: inherit;
      padding: 0;
      line-height: 1.5em;
    }
  }
}
</style>
