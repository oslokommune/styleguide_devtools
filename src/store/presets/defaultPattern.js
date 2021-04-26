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
    backgroundSolid: false
  },
  sections: {
    frame: {
      visible: true
    },
    docs: {
      backgroundColor: '#ffffff',
      padding: false,
      visible: true,
      active: true,
      sections: {
        documentation: {
          visible: true
        },
        assets: {
          visible: true
        }
      }
    }
  }
}
