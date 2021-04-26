<template>
  <div class="component osg-color-bg-white">    
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
