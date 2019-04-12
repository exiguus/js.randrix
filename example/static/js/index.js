/* globals
 * hljs
 */

 /* eslint-disable no-var, require-jsdoc */
!(function () {
  function main() {
    // randrix.js
    var matrix = new window.Randrix.default({
      message: 'randrix.js',
      possible: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.',
    });
    matrix.start();

    // highlight.js
    var hljsIntervalCount = 0;
    var hljsInterval = setInterval(function() {
      if (typeof hljs === 'object') {
        var link = document.createElement('link');
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-light.min.css';
        link.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(link);

        document.querySelectorAll('main pre code').forEach(function(block) {
          hljs.highlightBlock(block);
        });

        clearInterval(hljsInterval);
      } else {
        if (hljsIntervalCount > 42) {
          clearInterval(hljsInterval);
        }
        hljsIntervalCount++;
      }
    });
  }
  window.addEventListener('DOMContentLoaded', main());
})();
