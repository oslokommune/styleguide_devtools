import copyToClipboard from '../lib/copyToClipboard'

export default {
  methods: {
    copy(content) {
      copyToClipboard(content)
    }
  }
}
