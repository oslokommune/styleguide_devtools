import { defaultState } from './defaultPattern.js'

let cleanState = JSON.parse(JSON.stringify(defaultState))
cleanState.settings.backgroundColor = '#ffffff'
cleanState.settings.backgroundSolid = true
cleanState.settings.sections.configuration.visible = false
cleanState.sections.docs.visible = false

export {
  cleanState
}
