import copyToClipboard from '../lib/copyToClipboard.js'

export default {
  methods: {
    copy(content) {
      copyToClipboard(content)
    }
  }
}
