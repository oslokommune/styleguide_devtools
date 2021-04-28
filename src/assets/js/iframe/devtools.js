/**
* Copyright (c) 2014, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* preCode.js - painkiller for <pre><code> & <textarea>
*/

function preCode(selector) {
  var els = Array.prototype.slice.call(document.querySelectorAll(selector), 0);

  els.forEach(function (el) {
    var txt = el.textContent
      .replace(/^[\r\n]+/, "")	// strip leading newline
      .replace(/\s+$/g, "");		// strip trailing whitespace

    if (/^\S/gm.test(txt)) {
      el.textContent = txt;
      return;
    }

    var mat, str, re = /^[\t ]+/gm, len, min = 1e3;

    while (mat = re.exec(txt)) {
      len = mat[0].length;

      if (len < min) {
        min = len;
        str = mat[0];
      }
    }

    if (min == 1e3)
      return;

    el.textContent = txt.replace(new RegExp("^" + str, 'gm'), "");

    el.innerHTML = Prism.highlight(el.textContent, Prism.languages.html, 'html')
  });
}

document.addEventListener('DOMContentLoaded', function () {
  let elements = document.querySelectorAll("a");
  elements.forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
    }, false);
  });


  elements = document.querySelectorAll(".osg-devtools-code");
  elements.forEach(function (element) {
    let innerHTML = element.innerHTML
    let pre = document.createElement('pre')
    let code = document.createElement('code')
    pre.appendChild(code)
    element.appendChild(pre)
    code.append(innerHTML)
  });

  preCode("code");
})