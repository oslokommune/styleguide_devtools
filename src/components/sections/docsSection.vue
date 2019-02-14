<template>
  <div>
    <article v-if="pattern.mdFile" id="markdown-body" class="markdown-body"
             v-html="marked(pattern.mdFile.contents)">
    </article>
    <div v-else class="notification is-warning">
      There is no documentation available.
    </div>
    <aside class="menu">
      <p class="menu-label">Includes</p>
      <ul class="menu-list">
        <li v-for="(item, index) of twigIncludes" v-bind:key="index">
          <router-link :to="{ path: item.url }"><i class="fas fa-caret-right"></i> {{ item.name }}</router-link>
        </li>
        <li v-if="twigIncludes.length <= 0" class="has-text-grey">This pattern does not include other patterns.</li>
      </ul>
    </aside>
    <div class="content margin-top">
      <p class="is-uppercase has-text-grey is-size-7">Assets</p>
      <div v-if="twigFile">
        <button class="button is-tag is-small is-warning" @click="copy(twigFile.rawPath.replace(patternPath, ''))">
          TWIG
        </button>
        {{ twigFile.rawPath.replace(patternPath, '') }}
      </div>
      <div v-for="file in pattern.cssFiles" v-bind:key="file.name">
        <button class="button is-tag is-small is-info" @click="copy(file.rawPath.replace(patternPath, ''))">
          CSS
        </button>
        {{ file.rawPath.replace(patternPath, '') }}
      </div>
      <div v-for="file in pattern.jsFiles" v-bind:key="file.name">
        <button class="button is-tag is-small is-success" @click="copy(file.rawPath.replace(patternPath, ''))">
          JS
        </button>
        {{ file.rawPath.replace(patternPath, '') }}
      </div>

      <div v-if="pattern.jsFiles.length <= 0 && pattern.cssFiles.length <= 0" class="notification is-warning">
        There are no assets for this pattern.
      </div>
    </div>
  </div>
</template>

<script>
  import copyToClipboardMixin from '../../mixins/copyToClipboard'
  import marked from 'marked'
  import shared from './shared'

  export default {
    name: 'docs-section',

    mixins: [copyToClipboardMixin, shared],

    computed: {
      twigIncludes() {
        // returns array with one twig object
        let twigObjects = this.pattern.files.filter((item) => {
          return item.extension === 'twig'
        })

        // check if filter returned the twig object and that it has contents before assigning the content to the variable
        let twigContent = (twigObjects[0] && twigObjects[0].contents) ? twigObjects[0].contents : undefined
        let includeStatements
        // check if the twig content is set and contains at least one include statement
        if (twigContent && twigContent.includes('include')) {
          // array with all strings that start with 'include' and end with 'twig' from twig content
          includeStatements = twigContent.match(/include(.*?)twig/g)
        }

        // if there are no include statements then return an empty array
        if (!includeStatements || includeStatements.length === 0) {
          return []
        }

        return includeStatements.map((statement) => {
          // statement example: "include 'atoms/decorators/shape/shape.twig"

          if (statement.indexOf('\'/') >= 0) {
            this.errorMsg = 'Twig includes should NOT start with slash (/): ' + statement
          }
          if (statement.indexOf('\"/') >= 0) {
            this.errorMsg = 'For consistency purposes twig includes should use \' instead of \": ' + statement
          }

          let name = statement.substring(
            statement.lastIndexOf('/') + 1,
            statement.lastIndexOf('.twig')
          ) // get everything between last instance of '/' and '.twig' from statement

          let url = statement.replace('include "', '').replace('include \'', '') // remove "include '"
            .replace('/' + name + '.twig', '') // remove twig file name parameter
            .split('/').join('-') // replace all instances of slash with dash

          return {
            name: name,
            url: url
          }
        })
      }
    },

    methods: {
      marked(md) {
        return marked(md, {gfm: true})
      }
    }
  }
</script>
