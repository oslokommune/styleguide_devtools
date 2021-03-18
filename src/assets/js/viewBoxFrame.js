/* eslint-disable */
export const frameStart = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Pattern</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ` + (process.env.NODE_ENV === 'production'
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
        .osg-container {
          display: flex;
        }
        .osg-container > * {
          margin-right: 5px;
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

/* eslint-enable */
