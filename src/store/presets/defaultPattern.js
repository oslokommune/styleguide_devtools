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
    viewMode: {
      single: true,
      grid: false,
      random: false
    },
    viewSize: {
      mobile: false,
      tablet: false,
      desktop: false,
      full: true
    },
    fullscreen: false,
    ruler: true,
    backgroundColor: '',
    backgroundSolid: false,
    selectedModifiers: []
  },
  sections: {
    docs: {
      visible: true,
      active: true,
      sections: {
        documentation: {
          visible: true
        },
        assets: {
          visible: true
        },
        includes: {
          visible: true
        }
      }
    },
    accessibility: {
      visible: true,
      active: false
    },
    html: {
      visible: true,
      active: false
    },
    twig: {
      visible: true,
      active: false
    },
    json: {
      visible: true,
      active: false
    }
  }
}
