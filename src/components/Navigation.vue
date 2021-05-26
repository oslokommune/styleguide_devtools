<template>
  <aside class="osg-padding-horizontal-4 osg-margin-bottom-3">
    <div class="osg-margin-bottom-3">
      <div class="osg-row">
        <div class="osg-row__column osg-row__column--12">
          <div class="osg-search osg-search--circle">
            <form action="" method="GET" class="osg-search__form">
              <input class="osg-search__input" type="search" autocomplete="off" placeholder="Search" @keyup.enter="addTag" v-model="search">
              <button type="submit" class="osg-search__button" @click="addTag"><span class="osg-sr-only">Search</span></button>
            </form>
          </div>
        </div>
        <div v-if="tags.length" class="osg-row__column osg-row__column--12">
          <button v-for="(tag, index) in tags" v-bind:key="index" class="osg-button osg-button--small osg-button--gray osg-margin-right-1 osg-margin-bottom-1" @click="removeTag(tag)">
            {{ tag }}<span class="osg-icon osg-icon--close osg-icon--icon-right"></span>
          </button>
        </div>
      </div>      
    </div>
    <div v-if="tags.length" class="osg-row">
      <div class="osg-row__column osg-row__column--12">
        <h6 class="osg-heading-6 osg-margin-bottom-1">
          Components
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
    </div>    
    <div v-else class="osg-row">
      <div class="osg-row__column osg-row__column--12">
        <h6 class="osg-heading-6 osg-margin-bottom-1">
          Menu
        </h6>
        <ul>
          <nav-item :item="makeComponent('getting_started', componentStructure.gettingStarted.children.filter(child => child.isFolder))"></nav-item>
          <nav-item :item="makeComponent('general', componentStructure.general.children.filter(child => child.isFolder))"></nav-item>
          <nav-item :item="makeComponent('components', componentStructure.components.children.filter(child => child.isFolder))"></nav-item>
          <nav-item :item="makeComponent('pages', componentStructure.pages.children.filter(child => child.isFolder))"></nav-item>
        </ul>
      </div>
    </div>
  </aside>
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
