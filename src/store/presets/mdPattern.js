import { defaultState } from './defaultPattern.js'

let mdState = JSON.parse(JSON.stringify(defaultState))
mdState.settings.backgroundColor = '#ffffff'
mdState.settings.backgroundSolid = true
mdState.settings.sections.configuration.visible = false
mdState.sections.docs.visible = true
mdState.sections.docs.sections.assets.visible = false

export {
  mdState
}
