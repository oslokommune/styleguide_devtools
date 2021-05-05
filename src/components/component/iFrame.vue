<template>
  <iframe
    :srcdoc="frameContents"
    width="100%"
    onload='javascript:(function(o){o.style.height=o.contentWindow.document.body.scrollHeight + 30 +"px";}(this));'
    />
</template>
<script>
export default {
  name: 'iFrame',

  props: {
    content: {
      type: String
    }
  },

  computed: {
    frameContents() {
      let template =
        `<!DOCTYPE html><html><body class="${this.$store.state.component.sections.code.visible ? 'osg-devtools-code-examples' : ''}">
        <link href="/main.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css" integrity="sha512-tN7Ec6zAFaVSG3TpNAKtk4DOHNpSwKHxxrsiw4GHKESGPs5njn/0sMCUMl2svV4wo4BK/rCP7juYz+zx+l6oeQ==" crossorigin="anonymous" />
        <style>body { background-color: inherit; }</style>
        ${this.content}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js" integrity="sha512-YBk7HhgDZvBxmtOfUdvX0z8IH2d10Hp3aEygaMNhtF8fSOvBZ16D/1bXZTJV6ndk/L/DlXxYStP8jrF77v2MIg==" crossorigin="anonymous"><\/script>
        <script src="/devtools.js"><\/script></body></html>`

      
      return template
    }
  }
}
</script>
<style lang="scss">
@use "system/colors";
@use "system/spacing";

.osg-devtools-code pre {
  display: none;
}

.osg-devtools-code-examples .osg-devtools-code {
  pre {
    @extend %osg-padding-2, %osg-margin-top-3;
    
    display: block;
    background-color: colors.$gray-light;
    border: 2px solid colors.$grayscale-20;
    font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
    overflow-x: auto;
  }
}
</style>
