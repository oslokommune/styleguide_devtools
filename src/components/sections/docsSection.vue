<template>
  <div>
    <article 
      v-if="$store.state.pattern.sections.docs.sections.documentation.visible && pattern.mdFile"
      id="markdown-body"
      class="markdown-body"
      :style="[
        { backgroundColor: $store.state.pattern.sections.docs.backgroundColor },
        { padding: $store.state.pattern.sections.docs.padding ? '2em' : '0' }
      ]"
      v-html="marked(pattern.mdFile.contents)"
    >
    </article>
    <div v-if="$store.state.pattern.sections.docs.sections.documentation.visible && !pattern.mdFile" class="notification osg-u-color-bg-yellow">
      There is no documentation available.
    </div>
    <aside v-if="$store.state.pattern.sections.docs.sections.includes.visible || $store.state.pattern.sections.docs.sections.assets.visible">
      <h3 class="osg-u-heading-3 osg-u-padding-bottom-1">
        Dependencies
      </h3>
      <div 
        v-if="$store.state.pattern.sections.docs.sections.includes.visible"
        class="menu osg-u-padding-bottom-3"
      >
        <p class="osg-u-heading-5 osg-u-padding-bottom-1">Includes</p>
        <ul class="menu-list">
          <li v-for="(item, index) of twigIncludes" v-bind:key="index">
            <router-link :to="{ path: item.url }">
              <i class="fas fa-caret-right"></i>
              {{ item.name }}
            </router-link>
          </li>
          <li v-if="twigIncludes.length <= 0" class="has-text-grey">
            This pattern does not include other patterns.
          </li>
        </ul>
      </div>
      <div v-if="$store.state.pattern.sections.docs.sections.assets.visible">
        <p class="osg-u-heading-5 osg-u-padding-bottom-1">Assets</p>
        <div
          v-if="twigFile"
          @click="copy(twigFile.rawPath.replace(patternPath, ''))"
        >
          <button 
            class="button is-tag is-small osg-u-color-bg-yellow"
            title="Click to copy path to clipboard"
          >
            TWIG
          </button>
          {{ twigFile.rawPath.replace(patternPath, '') }}
        </div>
        <div 
          v-for="file in pattern.cssFiles" 
          v-bind:key="file.name" 
          @click="copy(file.rawPath.replace(patternPath, ''))"
        >
          <button
            class="button is-tag is-small osg-u-color-bg-blue"
            title="Click to copy path to clipboard"
          >
            CSS
          </button>
          {{ file.rawPath.replace(patternPath, '') }}
        </div>
        <div
          v-for="file in pattern.jsFiles"
          v-bind:key="file.name"
          @click="copy(file.rawPath.replace(patternPath, ''))"
        >
          <button
            class="button is-tag is-small osg-u-color-bg-green-light"
            title="Click to copy path to clipboard"
          >
            JS
          </button>
          {{ file.rawPath.replace(patternPath, '') }}
        </div>

        <div 
          v-if="$store.state.pattern.sections.docs.sections.assets.visible && (pattern.jsFiles.length <= 0 && pattern.cssFiles.length <= 0)"
          class="notification osg-u-color-bg-yellow"
        >
          There are no CSS or JS assets for this pattern.
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
  import copyToClipboardMixin from '../../mixins/copyToClipboard'
  import marked from 'marked'
  import shared from './shared'
  import _ from 'lodash'

  export default {
    name: 'docs-section',

    mixins: [copyToClipboardMixin, shared],

    data: () => ({
      includeStatements: []
    }),

    computed: {
      twigIncludes() {
        // if there are no include statements then return an empty array
        if (!this.includeStatements || this.includeStatements.length === 0) {
          return []
        }

        let statements = this.includeStatements.map((statement) => {
          // statement example: "include 'atoms/decorators/shape/shape.twig"

          let name = statement.substring(
            statement.lastIndexOf('/') + 1,
            statement.lastIndexOf('.twig')
          ) // get everything between last instance of '/' and '.twig' from statement

          // make "{include/embed} '{type}/{group}/{pattern}/{pattern}.twig" into "{type}-{group}-{pattern}"
          let url = statement
            .replace('include "', '')
            .replace('include \'', '')
            .replace('embed "', '')
            .replace('embed \'', '')
            .replace('/' + name + '.twig', '')
            .split('/').join('-')

          return {
            name: name,
            url: url
          }
        })

        return _.uniqBy(statements, 'name')
      }
    },

    watch: {
      // we need to deep watch the files to regenerate includeStatements when styleguide file changes
      'pattern.files': {
        handler() {
          this.updateIncludeStatements()
        },
        deep: true
      },

      includeStatements(val) {
        this.reportTwigStatementErrors(val)
      }
    },

    methods: {
      marked(md) {
        return marked(md, {gfm: true})
      },

      updateIncludeStatements() {
        // returns array with one twig object
        let twigObjects = this.pattern.files.filter((item) => {
          return item.extension === 'twig'
        })

        // check if filter returned the twig object and that it has contents before assigning the content to the variable
        let twigContent = (twigObjects[0] && twigObjects[0].contents) ? twigObjects[0].contents : undefined
        let statements = []
        // check if the twig content is set and contains at least one include statement
        if (twigContent && (twigContent.includes('include') || twigContent.includes('embed'))) {
          // array with all strings that start with 'include' and end with 'twig' from twig content
          let includeStatements = twigContent.match(/include(.*?)twig/g) || []
          // array with all strings that start with 'embed' and end with 'twig' from twig content
          let embedStatements = twigContent.match(/embed(.*?)twig/g) || []

          statements = includeStatements.concat(embedStatements)
        }

        this.includeStatements = statements
      },

      reportTwigStatementErrors(includeStatements) {
        let errorMsg = []
        let warnMsg = []

        // if there are no include statements on the pattern, then trigger the removal of old include errors and warnings
        if (!includeStatements) {
          this.$eventHub.$emit('includeErrors', errorMsg)
          this.$eventHub.$emit('includeWarnings', errorMsg)

          return
        }

        includeStatements.forEach(statement => {
          // statement example: "include 'atoms/decorators/shape/shape.twig"

          if (statement.startsWith('include \'/')) {
            errorMsg.push({
              type: 'include',
              message: 'Twig includes should NOT start with slash (/): ' + statement + '. '
            })
          }
          if (statement.includes('"')) {
            warnMsg.push({
              type: 'include',
              message: 'For consistency purposes twig includes should use \' instead of \": ' + statement + '. '
            })
          }
        })

        this.$eventHub.$emit('includeErrors', errorMsg)
        this.$eventHub.$emit('includeWarnings', warnMsg)
      }
    }
  }
</script>
