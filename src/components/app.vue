<template>
  <div class="columns is-gapless">
    <div class="column is-one-fifth">      
      <section class="osg-padding-4">
        <div class="osg-margin-bottom-2">
          <a href="/#/getting_started-introduction">
            <img :src="logo" alt="Oslo logo" />
          </a>
        </div>        
      </section>
      <Navigation></Navigation>
    </div>
    <div class="column">
      <router-view></router-view>
      <div class="osg-text-center osg-margin-vertical-4">
        Made with &hearts; by<br><strong>Utviklings- og kompetanseetaten</strong><br>Oslo kommune<br><a class="osg-link" href="mailto:devnull@uke.oslo.kommune.no">Contact us</a>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '../assets/images/oslo_logo.svg'
import Navigation from './Navigation.vue'

export default {
  name: 'App',

  components: {
    Navigation
  },

  data: () => ({
    logo
  }),

  beforeCreate() {
      this.$store.dispatch('pattern/setDefaults')
      this.$eventHub.$on('viewBox.setFullscreen', (val) => {
      this.$nextTick(() => {
        if (val) {
          document.getElementsByTagName('html')[0].style.overflow = 'hidden'
        } else {
          document.getElementsByTagName('html')[0].style.overflow = 'scroll'
        }
      })
    })
  },
}
</script>

<style lang="scss">
@use '../assets/sass/main';
</style>
