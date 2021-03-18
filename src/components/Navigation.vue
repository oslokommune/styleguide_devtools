<template>
  <aside class="menu nav">
    <div class="osg-searchbar osg-u-padding-bottom-3">
      <div class="osg-text-field osg-text-field--outline">
        <input
          class="osg-text-field__input osg-u-text-5"
          type="text"
          v-model="search"
          placeholder="Search for components"
          @keyup.enter="addTag"
          title="Search"
        />
      </div>
      <button
        @click="addTag"
        class="osg-button osg-button--yellow osg-button--circle"
        aria-label="Search"
        title="Add search tag"
      >
        <span class="osg-icon osg-icon--magnifying-glass-small"></span>
      </button>
    </div>
    <div class="field is-grouped is-grouped-multiline">
      <div class="control" v-for="tag in tags">
        <div class="tags has-addons">
          <a class="tag osg-u-text-6 osg-u-color-bg-blue-dark osg-u-color-text-white">{{ tag }}</a>
          <a class="tag is-delete osg-u-text-6" @click="removeTag(tag)" title="Remove tag"></a>
        </div>
      </div>
    </div>
    <p class="menu-label" v-if="!tags.length">
      Getting started
    </p>
    <ul class="menu-list" v-if="!tags.length">
      <nav-item
        :item="child"
        parentName="getting_started"
        v-for="(child, index) in componentStructure.gettingStarted.children"
        v-bind:key="index">
      </nav-item>
    </ul>
    <p class="menu-label" v-if="!tags.length">
      Global
    </p>
    <ul class="menu-list" v-if="!tags.length">
      <nav-item
        :item="child"
        parentName="globals"
        v-for="(child, index) in componentStructure.globals.children"
        v-bind:key="index">
      </nav-item>
    </ul>
    <p class="menu-label" v-if="!tags.length">
      Components
    </p>
    <ul class="menu-list" v-if="!tags.length">
      <nav-item
        :item="child"
        parentName="components"
        v-for="(child, index) in componentStructure.components.children"
        v-bind:key="index">
      </nav-item>
    </ul>
    <p class="menu-label" v-if="tags.length">
      Tags
    </p>
    <ul class="menu-list" v-if="tags.length">
      <tag-item
        :item="item"
        :tags="tags"
        v-for="(item, index) in components"
        v-bind:key="index">
      </tag-item>
    </ul>
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
      pagesVisible: false,
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

<style lang="sass">
@import "~styleguide/src/assets/sass/resources.sass";
@import "~styleguide/src/assets/sass/common/_utils.sass";
@import "~styleguide/src/components/search/search_bar/search_bar.sass";
@import "~styleguide/src/components/forms/input/text_field.sass";
@import "~styleguide/src/components/button/button.scss";
@import "~styleguide/src/components/decorators/icon/icon.sass"
</style>
