<template>
  <nav aria-label="Components">
    <div class="osg-padding-horizontal-30 osg-margin-top-15 osg-margin-bottom-30">
      <div class="osg-search osg-search--circle">
        <div class="osg-search__form">
          <input class="osg-search__input" type="search" autocomplete="off" placeholder="Search" @keyup.enter="addTag" v-model="search">
          <button type="submit" class="osg-search__button" @click="addTag"><span class="osg-sr-only">Search</span></button>
        </div>
      </div>
      <div class="osg-margin-top-50" v-if="tags.length">
        <button v-for="(tag, index) in tags" v-bind:key="index" class="osg-button osg-button--small osg-button--gray osg-margin-right-50 osg-margin-bottom-50" @click="removeTag(tag)">
          {{ tag }}<span class="osg-icon osg-icon--close osg-icon--icon-right"></span>
        </button>
      </div>
    </div>
    <div class="osg-padding-horizontal-30" v-if="tags.length">
      <h6 class="osg-heading-6 osg-margin-bottom-50">
        Search result
      </h6>
      <ul>
        <tag-item
          :item="item"
          :tags="tags"
          v-for="(item, index) in all"
          v-bind:key="index">
        </tag-item>
      </ul>
    </div>    
    <ul v-else v-for="(item, index) in $styleguide.nav" v-bind:key="index">
      <nav-item :item="makeComponent(item, $projectStructure[item].children.filter(child => child.isFolder))"></nav-item>
    </ul>
  </nav>
</template>

<script>
  import NavItem from './navigation/NavItem'
  import TagItem from './navigation/TagItem'
  import styleguide from '../styleguide.json'

  export default {
    name: 'Navigation',
    components: {
      NavItem,
      TagItem
    },
    data: () => ({
      search: '',
      tags: []
    }),

    computed: {
      all() {
        let list = []
        for (let item of this.$styleguide.nav) {
          list = list.concat(
            this.flatten(
              this.$projectStructure[item].children
            )
          )
        }
        return list
      }
    },

    methods: {
      makeComponent(name, children) {
        return {
          name: name,
          baseName: name,
          path: name,
          extension: null,
          urlPath: null,
          rawPath: null,
          isFolder: true,
          isFile: false,
          contents: null,
          children: children
        }
      },

      flatten(items) {
        let list = []
        for (let item of items) {
          if (item.extension === styleguide.internal.configFormat) {
            list.push(item)
          }
          if (item.children && item.children.length > 0) {
            list = list.concat(this.flatten(item.children))
          }
        }
        return list
      },

      addTag() {
        if (this.search.length) {
          this.tags.push(this.search)
          this.search = ''
        }
      },

      removeTag(tag) {
        let index = this.tags.indexOf(tag)
        if (index >= 0) {
          this.tags.splice(index, 1)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
.osg-devtools-tag {
  display: inline-block;
}
</style>
