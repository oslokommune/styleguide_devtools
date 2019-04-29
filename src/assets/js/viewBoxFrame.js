import {randomNode} from './patternInfo'

export const frameStart = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Pattern</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ` + (process.env.NODE_ENV === 'production' // eslint-disable-line
  ? '<link rel="stylesheet" href="/styleguide.css" type="text/css" />'
  : '') + `
      <script src="/modules.js"></script>
    </head>
    <body>
      <style>
        html, body { 
          overflow: hidden; 
          background-color: transparent; 
        }
        @media (max-width: 769px) {
          html {
            overflow-y: auto;
          }
        }
      </style>
`

export const frameEnd = `
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          let elements = document.querySelectorAll("a");
          elements.forEach(function(element) {
            element.addEventListener("click", function(event) {
              event.preventDefault();
              event.stopPropagation();
            }, false);
          });
        })
      </script>
    </body>
  </html>
`

export function frameSingle(pattern) {
  return pattern
}

export function frameGrid(pattern) {
  return `
    <link href="/assets/css/grid.css" type="text/css" rel="stylesheet">
    <div class="columns">
      <div class="column">${pattern}</div>
    </div>
    <div class="columns">
      <div class="column">${pattern}</div>
      <div class="column">${pattern}</div>
    </div>
    <div class="columns">
      <div class="column">${pattern}</div>
      <div class="column">${pattern}</div>
      <div class="column">${pattern}</div>
    </div>
  `
}

export function frameRandom(pattern) {
  return `
    <link href="/assets/css/grid.css" type="text/css" rel="stylesheet">
    <div class="columns">
      <div class="column">${randomNode().template}</div>
      <div class="column">${randomNode().template}</div>
    </div>
    <div class="columns">
      <div class="column">${pattern}</div>
    </div>
    <div class="columns">
      <div class="column">${randomNode().template}</div>
      <div class="column">${randomNode().template}</div>
      <div class="column">${randomNode().template}</div>
    </div>
  `
}
