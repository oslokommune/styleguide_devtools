<template>
  <aside class="menu osg-padding-horizontal-4 osg-margin-bottom-4">
    <h1 class="osg-heading-4 osg-margin-bottom-3">Styles &amp;<br>Component library</h1>
    <div class="osg-margin-bottom-5">
      <input
        type="text"
        v-model="search"
        placeholder="Search for components"
        @keyup.enter="addTag"
        title="Search"
      />
      <button
        @click="addTag"
        class="osg-button osg-button--small osg-button--yellow"
        aria-label="Search"
        title="Add search tag"
      >
        <i class="fas fa-search"></i>
      </button>
    </div>
    <div class="field is-grouped is-grouped-multiline">
      <div class="control" v-for="tag in tags">
        <div class="tags has-addons">
          <a class="tag osg-text-6 osg-color-bg-blue-dark osg-color-text-white">{{ tag }}</a>
          <a class="tag is-delete osg-text-6" @click="removeTag(tag)" title="Remove tag"></a>
        </div>
      </div>
    </div>
    <div v-if="!tags.length">
      <h6 class="osg-heading-6 osg-margin-bottom-1">
        Getting started
      </h6>
      <ul class="osg-margin-bottom-4">
        <nav-item
          :item="child"
          parentName="getting_started"
          v-for="(child, index) in componentStructure.gettingStarted.children.filter(child => child.isFolder)"
          v-bind:key="index">
        </nav-item>
      </ul>
      <h6 class="osg-heading-6 osg-margin-bottom-1">
        General
      </h6>
      <ul class="osg-margin-bottom-4">
        <nav-item
          :item="child"
          parentName="general"
          v-for="(child, index) in componentStructure.general.children.filter(child => child.isFolder)"
          v-bind:key="index">
        </nav-item>
      </ul>
      <h6 class="osg-heading-6 osg-margin-bottom-1">
        Components
      </h6>
      <ul>
        <nav-item
          :item="child"
          parentName="components"
          v-for="(child, index) in componentStructure.components.children.filter(child => child.isFolder)"
          v-bind:key="index">
        </nav-item>
      </ul>
    </div>
    <div v-else>
      <p class="menu-label">
        Tags
      </p>
      <ul class="menu-list">
        <tag-item
          :item="item"
          :tags="tags"
          v-for="(item, index) in components"
          v-bind:key="index">
        </tag-item>
      </ul>
    </div>
  </aside>
</template>

<script>
  import NavItem from './NavItem'
  import TagItem from './TagItem'
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
input {
  width: 200px;
  padding: 13px;
  display: inline-block;
  outline: 0;
  border: 1px solid #ccc;
}
</style>
