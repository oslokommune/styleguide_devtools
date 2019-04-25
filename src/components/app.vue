<template>
  <div class="columns is-gapless main-grid">
    <div class="column is-one-quarter has-background-grey-custom">
      <div class="brand">
        <a class="logo" href="/#/">
          <img :src="logo" alt="Oslo logo" class="is-pulled-left" />
        </a>
      </div>
      <atomicNav></atomicNav>
    </div>
    <div class="column is-three-quarters">
      <router-view></router-view>
      <div class="footer has-text-centered">
        Made with &hearts; by<br><strong>Utviklings- og kompetanseetaten</strong><br>Oslo kommune<br><a href="mailto:devnull@uke.oslo.kommune.no">Contact us</a>
      </div>
    </div>
  </div>
</template>

<script>
  import logo from '../assets/images/oslo_logo.svg'
  import logoPNG from '../assets/images/oslo_logo.png'
  import atomicNav from './atomicNav'

  export default {
    name: 'app',

    components: {
      atomicNav
    },

    data: () => ({
      logo,
      atomicStructure: {}
    }),

    beforeCreate() {
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

<style lang="sass">
  @import '../assets/sass/main'
</style>
