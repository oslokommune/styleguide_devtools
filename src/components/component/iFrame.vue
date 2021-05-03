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
        `<!DOCTYPE html><html><body class="${this.$store.state.component.sections.code.visible ? 'code' : 'no-code'}">
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
