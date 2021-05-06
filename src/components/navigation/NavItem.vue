<template>
  <li v-if="item.isFolder">
    <a class="osg-devtools-nav-item" :class="folderStatus" href="#" @click.prevent="toggle()" v-if="hasChildFolder()">{{ item.name|snakeToRegular|capitalize }}</a>
    <router-link :class="active" v-if="!hasChildFolder()" :to="'/' + parentNameAndSeparator + item.name">
      {{ item.name|snakeToRegular|capitalize }}
    </router-link>
    <ul class="osg-devtools-nav-list" v-show="open" v-if="item.children">
      <nav-item
        :item="child"
        :parentName="parentNameAndSeparator + item.name"
        v-for="child in item.children.filter(child => child.isFolder)"
        v-bind:key="child.name">
      </nav-item>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'NavItem',
    props: {
      'item': {
        type: Object,
        required: true
      },
      'parentName': {
        type: String,
        required: false
      }
    },

    data: () => ({
      open: false
    }),

    computed: {
      folderStatus() {
        return this.open ? 'osg-devtools-nav-item--open' : 'osg-devtools-nav-item--closed'
      },

      active() {        
        let active = this.item.urlPath === this.$route.params.id
        if (active) {
          this.$eventHub.$emit('menuOpen', this.parentNameAndSeparator + this.item.name)
        }
        return active ? 'osg-devtools-nav-item osg-state-primary' : 'osg-devtools-nav-item'
      },

      parentNameAndSeparator() {
        return this.parentName ? this.parentName + '-' : ''
      }
    },

    created() {
      this.$eventHub.$on('menuOpen', this.menuToggle)
    },

    beforeDestroy() {
      this.$eventHub.$off('menuOpen')
    },

    methods: {
      hasChildFolder() {
        let hasChildFolder = false
        for (let child of this.item.children) {
          if (child.isFolder) {
            hasChildFolder = true
            break
          }
        }

        return hasChildFolder
      },

      menuToggle(path) {
        this.open = path.indexOf(this.parentNameAndSeparator + this.item.name) >= 0
      },

      toggle() {
        this.open = !this.open

        if (this.open) {
          this.$eventHub.$emit('menuOpen', this.parentNameAndSeparator + this.item.name)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
@use "system/colors";
@use "system/state";
@use "components/links/link/mixins";

a.osg-devtools-nav-item {
  display: block;
  padding: 5px 15px;
  border: 2px solid colors.$gray;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    @extend %osg-state-hover;
  }

  &--closed {
    @include mixins.icon-right('chevron-right', 1em);
    position: relative;

    &::after {
      position: absolute;
      top: 5px;
    }
  }

  &--open {
    @include mixins.icon-right('chevron-down', 1em);
    position: relative;

    &::after {
      position: absolute;
      top: 5px;
    }
  }
}

ul.osg-devtools-nav-list {
  padding-left: 20px;
}
</style>
