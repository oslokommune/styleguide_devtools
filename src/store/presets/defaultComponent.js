export const defaultState = {
  settings: {
    visible: true,
    sections: {
      title: {
        visible: true
      },
      configuration: {
        visible: true
      }
    },
    viewSize: {
      mobile: false,
      tablet: false,
      desktop: false,
      full: true
    },
    fullscreen: false,
    backgroundColor: '',
    backgroundSolid: false,
    zoom: 100,
    activeTab: 0
  },
  sections: {
    frame: {
      visible: true
    },
    docs: {
      visible: true
    },
    code: {
      visible: false
    },
    debug: {
      visible: false
    }
  }
}
