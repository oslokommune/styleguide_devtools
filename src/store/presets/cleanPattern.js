import {defaultState} from './defaultPattern'

let cleanState = Object.assign({}, defaultState)
cleanState.settings.sections.configuration.visible = false
cleanState.sections.docs.visible = false
cleanState.sections.accessibility.visible = false
cleanState.sections.html.visible = false
cleanState.sections.twig.visible = false
cleanState.sections.json.visible = false

export {
  cleanState
}
