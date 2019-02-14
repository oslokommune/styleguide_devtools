export function getBoilerplates (patternName) {
  return [
    {
      fileExtension: 'twig',
      content: `
<div class="oka-${patternName} {{ ${patternName}.variant }} {{ ${patternName}.modifiers | default(null) }}">
  <h2 class="is-size-2">{{ ${patternName}.heading }}</h2>
  <p>{{ ${patternName}.text }}</p><br>
  {% include 'atoms/buttons/button/button.twig' %}
</div>
`
    },
    {
      fileExtension: 'sass',
      content:
`.oka-${patternName}`
    },
    {
      fileExtension: 'json',
      content: `
{
  "meta": {
    "tags": ["lorem", "ipsum"]
  },
  "${patternName}": {
    "variant": "oka-v-default",
    "modifiers": "oka-m-left oka-m-right",
    "heading": "${patternName}",
    "text": "Lorem ${patternName} dolor sit amet."
  },
  "button": {
    "variant": "oka-v-default",
    "color": "green",
    "content": "${patternName}!",
    "link": "#"
  }
}
`
    },
    {
      fileExtension: 'md',
      content: `
### General\nThis pattern is primarily to be used for...

### Data Fields
| Attribute | Type | Values | Default | Description |
|---|---|---|---|---|
| *variant | String  | oka-v-default | "oka-v-default" | Name of the variant |
| modifiers | String | oka-m-left \\n oka-m-right | null | Position to the left \\n Position to the right |
| *heading | String | (text value) | null | Pattern  title |
| *text | String | (text value) | null | Text describing what the pattern does |

(*) mandatory

### Javascript Functionality
Example code for ${patternName}:
\`\`\`javascript\n
const ${patternName} = () = > {
  // do stuff
}
\`\`\`
`
    }
  ]
}
