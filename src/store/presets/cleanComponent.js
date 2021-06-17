import { defaultState } from './defaultComponent.js'

let cleanState = JSON.parse(JSON.stringify(defaultState))
cleanState.settings.backgroundColor = '#ffffff'
cleanState.settings.backgroundSolid = true
cleanState.settings.sections.configuration.visible = false

export {
  cleanState
}
