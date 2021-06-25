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
        return active ? 'osg-devtools-nav-item osg-states-primary' : 'osg-devtools-nav-item'
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
@use "system/icons";
@use "system/states";

a.osg-devtools-nav-item {
  display: block;
  padding: 15px 30px;
  border: 2px solid colors.$white;
  background-color: colors.$white;  
  text-decoration: none;
  color: inherit;
  margin-bottom: 2px;
  margin-right: 30px;
  position: relative;  
  
  &:hover {
    background-color: states.$hover !important;
    border: 2px solid states.$hover !important;
    color: states.$hover-text !important;

    &::after {
      background-color: states.$hover !important;
      border: 2px solid states.$hover !important;
      color: states.$hover-text !important;
    }
  }

  &--closed {
    margin-right: 82px;
    &::after {
      border: 2px solid colors.$white;
      font-family: 'Oslo Icons' !important;
      font-size: 1.5em;
      content: map-get(icons.$icons, 'chevron-right') !important;
      width: 51px;
      height: 51px;
      border-radius: 50%;
      background-color: colors.$white;
      right: -53px;
      top: 2px;
      position: absolute;
      text-align: center;    
      padding-top: 13px;
    }
  }

  &--open {
    margin-right: 82px;
    &::after {
      border: 2px solid colors.$white;
      font-family: 'Oslo Icons' !important;
      font-size: 1.5em;
      content: map-get(icons.$icons, 'chevron-down') !important;
      width: 51px;
      height: 51px;
      border-radius: 50%;
      background-color: colors.$white;
      right: -53px;
      top: 2px;
      position: absolute;
      text-align: center;    
      padding-top: 13px;
    }
  }
}

ul.osg-devtools-nav-list {
  padding-left: 30px;
}
</style>
