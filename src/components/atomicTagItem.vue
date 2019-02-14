<template>
  <li v-if="renderElement">
    <router-link :class="active" :to="'/pattern/' + url">
      {{ item.baseName|snakeToRegular|capitalize }}
    </router-link>
  </li>
</template>

<script>
  export default {
    name: 'atomicTagItem',
    props: ['item', 'tags'],

    computed: {
      renderElement() {
        if (this.tags.length) {
          let match = this.tags.filter(
            x => this.item.baseName.toLowerCase().includes(x.toLowerCase())
          )
          if (match.length <= 0) {
            if (this.item.contents) {
              let contents = JSON.parse(this.item.contents)
              if (contents.meta && contents.meta.tags) {
                for (let tag of this.tags) {
                  let tagMatch = contents.meta.tags.filter(
                    x => x.toLowerCase().includes(tag.toLowerCase())
                  )
                  if (tagMatch.length > 0) {
                    return true
                  }
                }
              }
            }
            return false
          }
        }
        return true
      },

      active() {
        return this.url === this.$route.params.id ? 'is-active' : ''
      },

      url() {
        return this.item.urlPath.substring(0, this.item.urlPath.lastIndexOf('-'))
      }
    }
  }
</script>
