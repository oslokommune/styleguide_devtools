<template>
  <aside class="menu nav">
    <div class="osg-searchbar osg-u-padding-bottom-3">
      <div class="osg-text-field osg-text-field--outline">
        <input
          class="osg-text-field__input osg-u-text-5"
          type="text"
          v-model="search"
          placeholder="Search for patterns"
          @keyup.enter="addTag"
          title="Search"
        />
      </div>
      <button
        @click="addTag"
        class="osg-button osg-button--yellow osg-button--circle "
        aria-label="Search"
        title="Add search tag"
      >
        <i class='osg-u-icon-magnifying-glass-small'></i>
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
      <atomic-nav-item
        :item="child"
        parentName="getting_started"
        v-for="(child, index) in atomicStructure.gettingStarted.children"
        v-bind:key="index">
      </atomic-nav-item>
    </ul>
    <p class="menu-label" v-if="!tags.length">
      Global
    </p>
    <ul class="menu-list" v-if="!tags.length">
      <atomic-nav-item
        :item="child"
        parentName="globals"
        v-for="(child, index) in atomicStructure.globals.children"
        v-bind:key="index">
      </atomic-nav-item>
    </ul>
    <p class="menu-label" v-if="!tags.length">
      Atoms
    </p>
    <ul class="menu-list" v-if="!tags.length">
      <atomic-nav-item
        :item="child"
        parentName="atoms"
        v-for="(child, index) in atomicStructure.atoms.children"
        v-bind:key="index">
      </atomic-nav-item>
    </ul>
    <p class="menu-label" v-if="!tags.length">
      Molecules
    </p>
    <ul class="menu-list" v-if="!tags.length">
      <atomic-nav-item
        :item="child"
        parentName="molecules"
        v-for="(child, index) in atomicStructure.molecules.children"
        v-bind:key="index">
      </atomic-nav-item>
    </ul>
    <p class="menu-label" v-if="!tags.length">
      Organisms
    </p>
    <ul class="menu-list" v-if="!tags.length">
      <atomic-nav-item
        :item="child"
        parentName="organisms"
        v-for="(child, index) in atomicStructure.organisms.children"
        v-bind:key="index">
      </atomic-nav-item>
    </ul>
    <p class="menu-label" v-if="!tags.length && pagesVisible">
      Pages
    </p>
    <ul class="menu-list" v-if="!tags.length && pagesVisible">
      <li>
        <router-link :to="{ path: '/pageBuilder' }">
          Build
        </router-link>
      </li>
    </ul>
    <p class="menu-label" v-if="tags.length">
      Tags
    </p>
    <ul class="menu-list" v-if="tags.length">
      <atomic-tag-item
        :item="item"
        :tags="tags"
        v-for="(item, index) in patterns"
        v-bind:key="index">
      </atomic-tag-item>
    </ul>
  </aside>
</template>

<script>
  import AtomicNavItem from './atomicNavItem'
  import AtomicTagItem from './atomicTagItem'
  import atomicStructure from '../../build/atomicStructure.json'

  export default {
    name: 'atomicNav',
    components: {
      AtomicNavItem,
      AtomicTagItem
    },
    data: () => ({
      pagesVisible: false,
      atomicStructure,
      search: '',
      tags: []
    }),

    computed: {
      patterns() {
        return this.atoms.concat(this.molecules, this.organisms)
      },
      atoms() {
        return this.flatten(this.atomicStructure.atoms.children)
      },
      molecules() {
        return this.flatten(this.atomicStructure.molecules.children)
      },
      organisms() {
        return this.flatten(this.atomicStructure.organisms.children)
      }
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
@import "~styleguide/src/molecules/search/search_bar/search_bar.sass";
@import "~styleguide/src/atoms/forms/text_field/text_field.sass";
@import "~styleguide/src/atoms/buttons/button/button.sass";
</style>
