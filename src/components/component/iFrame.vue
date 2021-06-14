<template>
  <iframe
    :srcdoc="frameContents"
    width="100%"
    style="min-height: calc(100vh - 218px); max-height: calc(100vh - 218px);"
    onload='javascript:(function(o){o.style.height=o.contentWindow.document.body.offsetHeight + 30 + "px";}(this));'
    />
</template>
<script>
export default {
  name: 'iFrame',

  props: {
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
        body { background-color: inherit; transform-origin: 0 0; transform: scale(${this.$store.state.component.settings.zoom / 100}); }
        .osg-devtools-code pre { display: none; }
        body.osg-devtools-hide-debug .osg-devtools-debug { display: none !important; }
        </style>
        <script src="/devtools.js?${this.hash}"><\/script>
        </head>
        <body class="${this.$store.state.component.sections.code.visible ? 'osg-devtools-code-examples' : ''} ${this.$store.state.component.sections.debug.visible ? '' : 'osg-devtools-hide-debug'}">
        ${this.content}
        <script src="/osg.js?${this.hash}" type="module"><\/script></body></html>`

      
      return template
    }
  }
}
</script>
<style lang="scss">
@use "system/colors";
@use "system/spacing";
@use "components/grid/container/container";

.osg-devtools-code-examples .osg-devtools-code {   
  pre {
    @extend %osg-padding-2, %osg-margin-top-3;
    
    display: block;
    background-color: colors.$gray-light;
    border: 2px solid colors.$grayscale-20;
    font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
    overflow-x: auto;

    code {
      border: none;
      background-color: inherit;
      padding: 0;
      line-height: 1.5em;
    }
  }
}

.osg-devtools-code-examples .osg-devtools-code.osg-devtools-code--container pre {
  @extend .osg-container;
}
.osg-devtools-code-examples .osg-devtools-code.osg-devtools-code--no-space pre {
  margin-top: 0 !important;
}
</style>
