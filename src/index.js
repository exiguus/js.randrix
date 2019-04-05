/**
 * @fileOverview Randrix Callback / Generator Example
 * @author Simon Gattner <npm@0x38.de>
 * @license MIT
 * @version 1.0.0
 */
import 'babel-polyfill';
import Randrix from './js/Randrix.class';

// eslint-disable-next-line require-jsdoc
function* panels(configs) {
  for (let i = 0; i < configs.length; i++) {
    yield panel(configs[i], i);
  }
}

// eslint-disable-next-line require-jsdoc
function panel(config, i) {
  const wait = (i === 0) ? i : 3000;
  setTimeout( () => {
    document.querySelector('[data-randrix]').innerHTML = '';
    const matrix = new Randrix(config);
    matrix.start();
  }, wait);
}

const configs = [{
    message: 'Random',
    width: 4,
    height: 5,
    callback: () => matrix.next(),
  },
  {
    message: 'Matrix',
    width: 4,
    height: 5,
    callback: () => matrix.next(),
  },
  {
    message: 'Panel',
    width: 4,
    height: 5,
    callback: () => matrix.next(),
  },
  {
    message: 'randrix.js',
    width: 4,
    height: 5,
    possible: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.',
  },
];
const matrix = panels(configs);
matrix.next();
