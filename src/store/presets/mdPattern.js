import {defaultState} from './defaultPattern'

let mdState = JSON.parse(JSON.stringify(defaultState))
mdState.settings.backgroundColor = '#ffffff'
mdState.settings.backgroundSolid = true
mdState.settings.ruler = false
mdState.settings.sections.configuration.visible = false
mdState.sections.tabs.visible = false
mdState.sections.docs.visible = true
mdState.sections.docs.sections.assets.visible = false
mdState.sections.docs.sections.includes.visible = false
mdState.sections.accessibility.visible = false
mdState.sections.html.visible = false
mdState.sections.twig.visible = false
mdState.sections.json.visible = false

export {
  mdState
}
