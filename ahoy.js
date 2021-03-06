// Shaven 0.6.2 by Adrian Sieber (adriansieber.com)
shaven=function e(t,r,i){"use strict";function n(e){var t=e.match(/^\w+/),n=t?t[0]:"div",o=f.createElementNS(r,n),l=e.match(/#([\w-]+)/),s=e.match(/\$([\w-]+)/),c=e.match(/\.[\w-]+/g);return l&&(o.id=l[1],i[l[1]]=o),s&&(i[s[1]]=o),c&&o.setAttribute("class",c.join(" ").replace(/\./g,"")),e.match(/&$/g)&&(a=!0),o}function o(e,t){return null!==t&&t!==!1&&void 0!==t?"string"!=typeof t&&"object"!=typeof t?String(t):t:void 0}var a,l,s,c,f=document;for(i=i||{},r=r||"http://www.w3.org/1999/xhtml","string"==typeof t[0]&&(t[0]=n(t[0])),c=1;c<t.length;c++){if(t[c]===!1||null===t[c]){t[0]=!1;break}if(void 0!==t[c]&&t[c]!==!0)if("string"==typeof t[c]||"number"==typeof t[c])a?t[0].innerHTML=t[c]:t[0].appendChild(f.createTextNode(t[c]));else if(Array.isArray(t[c]))e(t[c],r,i),t[c][0]&&t[0].appendChild(t[c][0]);else if("function"==typeof t[c])l=t[c];else if(t[c]instanceof Element)t[0].appendChild(t[c]);else{if("object"!=typeof t[c])throw new TypeError('"'+t[c]+'" is not allowed as a value.');for(s in t[c])t[c].hasOwnProperty(s)&&null!==t[c][s]&&t[c][s]!==!1&&(void 0===t[c][s]?t[0].setAttribute(s,""):"style"===s&&"object"==typeof t[c][s]?t[0].setAttribute(s,JSON.stringify(t[c][s],o).slice(2,-2).replace(/","/g,";").replace(/":"/g,":").replace(/\\"/g,"'")):t[0].setAttribute(s,t[c][s]))}}return i[0]=t[0],l&&l(t[0]),i};

(function() {

  var totalOffset = function(el) {
    var rect = el.getBoundingClientRect()

    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    }
  };

  var scriptUrl = (function() {
    var scripts = document.getElementsByTagName('script');
    var index = scripts.length - 1;
    var myScript = scripts[index];
    return myScript.src;
  })();

  var anchors = Array.prototype.slice.call(document.querySelectorAll("[id]"));
  shaven([document.body,
    ["link", {rel: "stylesheet", href: scriptUrl.replace(".js", ".css")}]
  ]);

  var grouped = {};

  for (var i=0; i<anchors.length; i++) {

    var a = anchors[i];
    var top = totalOffset(a).top;
    if (grouped[Math.floor(top/50)]) {
      shaven([grouped[Math.floor(top/50)],
        [".ahoy-subanchor", "#"+a.getAttribute("id")]
      ])
    } else {
      grouped[Math.floor(top/50)] = shaven([document.body,
        [".ahoy-anchor", {style: "top: "+(top+1)+"px"}, [".ahoy-anchor-inner$anchor", "#"+a.getAttribute("id")]]
      ]).anchor;

    }

  }



})();