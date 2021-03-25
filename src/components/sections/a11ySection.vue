<template>
  <div>
    <div v-if="a11yResults.violations && a11yResults.violations.length">
      <h5 class="osg-u-heading-4">Violations</h5>
      <ul class="osg-u-margin-top-3">
        <li v-for="violation in a11yResults.violations">
          <span class="icon">
            <i class="fas fa-exclamation-triangle has-text-warning"></i>
          </span>
          <a :href="violation.helpUrl" target="_blank">{{ violation.help }}</a>
        </li>
      </ul>
    </div>
    <div v-if="a11yResults.incomplete && a11yResults.incomplete.length">
      <h5 class="osg-u-heading-4">Requires manual verification</h5>
      <ul class="osg-u-margin-top-3">
        <li v-for="incomplete in a11yResults.incomplete">
          <span class="icon">
            <i class="fas fa-question-circle has-text-info"></i>
          </span>
          <a :href="incomplete.helpUrl" target="_blank">{{ incomplete.help }}</a>
        </li>
      </ul>
    </div>
    <div v-if="a11yResults.passes && a11yResults.passes.length">
      <h5 class="osg-u-heading-4">Passed rules</h5>
      <ul class="osg-u-margin-top-3">
        <li v-for="pass in a11yResults.passes">
          <span class="icon">
            <i class="fas fa-check has-text-success"></i>
          </span>
          <a :href="pass.helpUrl" target="_blank">{{ pass.help }}</a>
        </li>
      </ul>
    </div>
    <div v-if="a11yResults.inapplicable && a11yResults.inapplicable.length">
      <h5 class="osg-u-heading-4">Inapplicable rules</h5>
      <ul class="osg-u-margin-top-3">
        <li v-for="inapplicable in a11yResults.inapplicable">
          <span class="icon">
            <i class="fas fa-genderless"></i>
          </span>
          <a :href="inapplicable.helpUrl" target="_blank">{{ inapplicable.help }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import shared from './shared.js'

  export default {
    name: 'a11y-section',

    mixins: [ shared ],

    props: {
      a11yResults: {
        type: Object,
        required: true
      }
    }
  }
</script>
