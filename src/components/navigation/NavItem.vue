<template>
  <li v-if="item.isFolder">
    <a class="osg-devtools-nav-item" href="#" @click.prevent="toggle()" v-if="hasChildFolder()">{{ item.name|snakeToRegular|capitalize }}<span v-html="folderStatus"></span></a>
    <router-link :class="active" v-if="!hasChildFolder()" :to="'/' + parentName + '-' + item.name">
      {{ item.name|snakeToRegular|capitalize }}
    </router-link>
    <ul class="osg-devtools-nav-list" v-show="open" v-if="item.children">
      <nav-item
        :item="child"
        :parentName="parentName + '-' + item.name"
        v-for="child in item.children.filter(child => child.isFolder)"
        v-bind:key="child.name">
      </nav-item>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'NavItem',
    props: ['item', 'parentName'],

    data: () => ({
      open: false
    }),

    computed: {
      folderStatus() {
        return this.open ? ' <i class="fas fa-angle-down"></i>' : ' <i class="fas fa-angle-right"></i>'
      },
      active() {        
        let active = this.item.urlPath === this.$route.params.id
        if (active) {
          this.$eventHub.$emit('menuOpen', this.parentName + '-' + this.item.name)
        }
        return active ? 'osg-devtools-nav-item osg-state-primary' : 'osg-devtools-nav-item'
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
        this.open = path.indexOf(this.parentName + '-' + this.item.name) >= 0
      },

      toggle() {
        this.open = !this.open

        if (this.open) {
          this.$eventHub.$emit('menuOpen', this.parentName + '-' + this.item.name)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
@use "system/colors";
@use "system/state";

a.osg-devtools-nav-item {
  display: block;
  padding: 5px 15px;
  border: 2px solid colors.$gray;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    @extend %osg-state-hover;
  }
}

ul.osg-devtools-nav-list {
  padding-left: 20px;
}
</style>
