import {defaultState} from './defaultPattern'

let cleanState = JSON.parse(JSON.stringify(defaultState))
cleanState.settings.backgroundColor = '#ffffff'
cleanState.settings.backgroundSolid = true
cleanState.settings.ruler = false
cleanState.settings.sections.configuration.visible = false
cleanState.sections.docs.visible = false
cleanState.sections.accessibility.visible = false
cleanState.sections.html.visible = false
cleanState.sections.twig.visible = false
cleanState.sections.json.visible = false

export {
  cleanState
}
