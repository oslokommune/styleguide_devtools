<template>
  <div class="component osg-color-bg-white">
    <section class="osg-color-bg-blue-dark osg-color-text-white osg-padding-4">
      <h6 class="osg-heading-6 osg-margin-top-3 osg-margin-bottom-none">Oslo style guide</h6>
      <h1 class="osg-heading-2 osg-margin-bottom-none">Styles &amp; Component library</h1>
    </section>
    <div class="view osg-padding-4">      
      <view-box :pattern="pattern" />    
    </div>
  </div>
</template>

<script>
  import {patternInfo} from '../assets/js/patternInfo'
  import ViewBox from './viewBox/viewBox'

  export default {
    name: 'ComponentFrame',

    components: {    
      ViewBox
    },

    data: () => ({   
      pattern: {
        name: 'Loading...',
        files: [],
        cssFiles: [],
        jsFiles: [],
        mdFile: null,
        variants: []
      }
    }),

    mounted() {
      this.updatePattern()
    },

    watch: {
      '$route'() {
        this.updatePattern()
      }
    },

    methods: {
      updatePattern() {
        this.pattern = patternInfo(this.$route.params.id)
      }
    }
  }
</script>
