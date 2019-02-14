<template>
  <li v-if="item.isFolder">
    <a @click="toggle()" v-if="hasChildFolder()">{{ item.name|snakeToRegular|capitalize }}<span v-html="folderStatus"></span></a>
    <router-link :class="active" v-if="!hasChildFolder()" :to="'/pattern/' + parentName + '-' + item.name">
      {{ item.name|snakeToRegular|capitalize }}
    </router-link>
    <ul v-show="open" v-if="item.children">
      <atomic-nav-item
        :item="child"
        :parentName="parentName + '-' + item.name"
        v-for="child in item.children"
        v-bind:key="child.name">
      </atomic-nav-item>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'atomicNavItem',
    props: ['item', 'parentName'],

    data: () => ({
      open: false
    }),

    computed: {
      folderStatus() {
        return this.open ? ' <i class="fa fa-angle-down"></i>' : ' <i class="fa fa-angle-right"></i>'
      },
      active() {
        return this.item.urlPath === this.$route.params.id ? 'is-active' : ''
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
