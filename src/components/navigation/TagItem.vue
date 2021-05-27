<template>
  <li v-if="renderElement">
    <router-link :class="active" :to="'/' + url">
      {{ item.baseName|snakeToRegular|capitalize }}
    </router-link>
  </li>
</template>

<script>
  export default {
    name: 'TagItem',
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
              if (contents.devtools && contents.devtools.tags) {
                for (let tag of this.tags) {
                  let tagMatch = contents.devtools.tags.filter(
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
        let active = this.url === this.$route.params.id
        return active ? 'osg-devtools-tag-item osg-state-primary' : 'osg-devtools-tag-item'
      },

      url() {
        return this.item.urlPath.substring(0, this.item.urlPath.lastIndexOf('-'))
      }
    }
  }
</script>
<style lang="scss" scoped>
@use "system/colors";
@use "system/state";

a.osg-devtools-tag-item {
  display: block;
  padding: 15px 30px;
  border: 2px solid colors.$white;
  background-color: colors.$white;  
  text-decoration: none;
  color: inherit;
  margin-bottom: 2px;
  position: relative;  
  
  &:hover {
    @extend %osg-state-hover;
  }
}
</style>
