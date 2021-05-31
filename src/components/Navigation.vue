<template>
  <nav>
    <div class="osg-padding-horizontal-4 osg-margin-top-3 osg-margin-bottom-4">
      <div class="osg-search osg-search--circle">
        <div class="osg-search__form">
          <input class="osg-search__input" type="search" autocomplete="off" placeholder="Search" @keyup.enter="addTag" v-model="search">
          <button type="submit" class="osg-search__button" @click="addTag"><span class="osg-sr-only">Search</span></button>
        </div>
      </div>
      <div class="osg-margin-top-1" v-if="tags.length">
        <button v-for="(tag, index) in tags" v-bind:key="index" class="osg-button osg-button--small osg-button--gray osg-margin-right-1 osg-margin-bottom-1" @click="removeTag(tag)">
          {{ tag }}<span class="osg-icon osg-icon--close osg-icon--icon-right"></span>
        </button>
      </div>
    </div>
    <div class="osg-padding-horizontal-4" v-if="tags.length">
      <h6 class="osg-heading-6 osg-margin-bottom-1">
        Search result
      </h6>
      <ul>
        <tag-item
          :item="item"
          :tags="tags"
          v-for="(item, index) in components"
          v-bind:key="index">
        </tag-item>
      </ul>
    </div>    
    <ul v-else>
      <nav-item :item="makeComponent('getting_started', componentStructure.gettingStarted.children.filter(child => child.isFolder))"></nav-item>
      <nav-item :item="makeComponent('general', componentStructure.general.children.filter(child => child.isFolder))"></nav-item>
      <nav-item :item="makeComponent('components', componentStructure.components.children.filter(child => child.isFolder))"></nav-item>
      <nav-item :item="makeComponent('pages', componentStructure.pages.children.filter(child => child.isFolder))"></nav-item>
    </ul>
  </nav>
</template>

<script>
  import NavItem from './navigation/NavItem'
  import TagItem from './navigation/TagItem'
  import componentStructure from '../../build/componentStructure.json'

  export default {
    name: 'Navigation',
    components: {
      NavItem,
      TagItem
    },
    data: () => ({
      componentStructure,
      search: '',
      tags: []
    }),

    computed: {
      components() {
        return this.flatten(this.componentStructure.components.children)
      },
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
          isComponent: false,
          isGlobal: false,
          isGettingStarted: false,
          isFolder: true,
          isFile: false,
          isDataFile: false,
          isAsset: false,
          isRoot: true,
          isPage: false,
          contents: null,
          template: null,
          children: children
        }
      },

      flatten(items) {
        let list = []
        for (let item of items) {
          if (item.isDataFile) {
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
