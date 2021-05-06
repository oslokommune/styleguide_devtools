<template>
  <aside class="osg-padding-horizontal-4 osg-margin-bottom-3">
    <div class="osg-margin-bottom-3">
      <div class="columns is-multiline">
        <div class="column is-9">
          <input
            type="text"
            v-model="search"
            placeholder="Search for components"
            @keyup.enter="addTag"
            title="Search"
            class="osg-text-field"
            style="width: 170px;"
          />
        </div>
        <div class="column is-3">
          <button
            @click="addTag"
            class="osg-button osg-button--circle osg-button--small osg-button--yellow"
            aria-label="Search"
            title="Add search tag"
          >
            <i class="fas fa-search"></i>
          </button>
        </div>
        <div class="column is-12">
          <div v-if="tags.length">
            <button v-for="(tag, index) in tags" v-bind:key="index" class="osg-button osg-button--small osg-button--gray osg-margin-right-1 osg-margin-bottom-1" @click="removeTag(tag)">
              {{ tag }}<span class="osg-icon osg-icon--close osg-icon--icon-right"></span>
            </button>
          </div>
        </div>
      </div>      
    </div>    
    <div v-if="!tags.length" class="columns">
      <div class="column is-12">
        <h6 class="osg-heading-6 osg-margin-bottom-1">
          Menu
        </h6>
        <ul>
          <nav-item :item="makeComponent('getting_started', componentStructure.gettingStarted.children.filter(child => child.isFolder))"></nav-item>
          <nav-item :item="makeComponent('general', componentStructure.general.children.filter(child => child.isFolder))"></nav-item>
          <nav-item :item="makeComponent('components', componentStructure.components.children.filter(child => child.isFolder))"></nav-item>
        </ul>
      </div>
    </div>
    <div v-else class="columns">
      <div class="column is-12">
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
