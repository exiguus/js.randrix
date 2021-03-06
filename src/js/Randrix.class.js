import Validate from './helper/Validation.class';

/**
 * @fileOverview Randrix Class.
 * @author Simon Gattner <npm@0x38.de>
 * @license MIT
 * @version 1.0.2
 * @module {es6} Randrix
 */
export default class Randrix {
  /**
   * Display a random matrix panel.
   * @class Randrix
   * @classdesc Class to display a Randrix.
   * @param {object} options The Randrix options.
   * @param {string} options.message The Randrix message to display.
   * @param {string} options.selector The Randrix element selector.
   *  Default is '[data-randrix]'.
   * @param {number} options.width The Randrix width to display.
   *  Default is 5.
   * @param {number} options.height The Randrix height to display.
   *  Default is 6.
   * @param {number} options.interval The Randrix interval to display.
   *  Default is 100.
   * @param {string} options.possible The Randrix possible Chars to display.
   *  Default is 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.'.
   * @param {array} options.style The Randrix random Char styles to display.
   *  Default is undefined.
   * @param {function} options.callback The Randrix callback to
   *  run after stop. Default is null.
   */
  constructor(options) {
    this._defaults = {
      message: undefined,
      selector: '[data-randrix]',
      width: 5,
      height: 6,
      interval: 100,
      possible: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      style: undefined,
      callback: null,
    };
    this._options = Validate.options(options);
    if (this._options.error) return this.throwError();
    // ES2018 this._settings = {...this._defaults, ...this._options};
    this._settings = Object.assign({}, this._defaults, this._options);
    this._message = this._settings.message.split('');
    this._element = document.querySelector(this._settings.selector);
    this._width = this._settings.width;
    this._height = this._settings.height;
    this._interval = this._settings.interval;
    this._possible = this._settings.possible;
    this._possibleLength = this._possible.length;
    this._style = this._settings.style;
    this._styleLength = (this._style) ? this._style.length : 0;
    this._styleEnable = this._styleLength > 0;
    this._index = 0;
    this._matrix = [];
    this._x = 0;
    this._y = 0;
    this._callback = this._settings.callback;
    this._calledback = false;
  }

  /**
   * Throw Errors if Randrix has invalid options.
   * @function Randrix.throwErrors
   */
  throwError() {
    throw new Error(this._options.error);
  }

  /**
   * Is there a callback and not executed yet?
   * @function Randrix.isCallback
   * @return {boolean} is there a callback or not and is it executed or not.
   */
  isCallback() {
    return typeof this._callback === 'function' && this._calledback === false;
  }

  /**
   * Random Char from Possible Chars
   * @function Randrix.char
   * @return {string} the Char.
   */
  char() {
    return this._possible.charAt(
      Math.floor(
        Math.random() * this._possibleLength
      )
    );
  }

  /**
   * Style the Char from Possible Styles
   * @function Randrix.charStyle
   * @return {string} the Char Style.
   */
  charStyle() {
    return (this._style) ? this._style[
      Math.floor(Math.random() * this._styleLength)
    ] : '';
  }

  /**
   * Create a Char on the Randrix
   * @function Randrix.charCreate
   * @param {number} x position of the Char.
   * @param {number} y position of the Char.
   * @return {boolean} is the Char created.
   */
  charCreate(x, y) {
    const id = `x${x}-y${y}`;
    this._matrix[id] = {
      element: this.charCreateElement(id) || {},
      x: x,
      y: y,
      interval: this.charStart(id) || (() => false),
    };
    return true;
  }

  /**
   * Create the Char Element on the Randrix
   * @function Randrix.charCreateElement
   * @param {object} id of the Char.
   * @return {object} element of the Char.
   */
  charCreateElement(id) {
    const char = this.char();
    const element = document.createElement('span');
    const text = document.createTextNode(char);

    element.appendChild(text);
    element.setAttribute('data-randrix-char', id);

    if (this._styleEnable && this.charStyle()) {
      element.setAttribute('data-randrix-style', this.charStyle());
    }
    this._element.appendChild(element);

    return element;
  }

  /**
   * Char is the Last Child on the Randrix
   * @function Randrix.charIsLastChild
   * @param {string} id of the Char.
   * @return {boolean} Char is the last child or not.
   */
  charIsLastChild(id) {
    return this._x === this._width - 1 && this._y === this._height - 1;
  }

  /**
   * Update the Char on the Randrix
   * @function Randrix.charUpdate
   * @param {string} id of the Char.
   */
  charUpdate(id) {
    const char = this.char();

    this.charUpdateElement(id, char);
    this.charUpdateStatus(id, char);
  }

  /**
   * Update the Char on the Randrix
   * @function Randrix.charUpdateElement
   * @param {string} id of the Char.
   * @param {string} char to update.
   */
  charUpdateElement(id, char) {
    if (this._matrix[id] && this._matrix[id].element) {
      if (this._styleEnable) {
        this._matrix[id].element
          .setAttribute('data-randrix-style', this.charStyle());
      }
      this._matrix[id].element.innerHTML = char;
    }
  }

  /**
   * Update the Char on the Randrix
   * @function Randrix.charUpdateStatus
   * @param {string} id of the Char.
   * @param {string} char to update.
   */
  charUpdateStatus(id, char) {
    if (this._message.length !== this._index) {
      (this.charIsLastChild()) ? this.reset() :
        (!this.charMatch(id, char)) || this.charActivate(id);
    } else {
      this.charStop(id);
      if (this.isCallback()) this._calledback = true && this._callback();
    }
  }

  /**
   * Match the Char on the Randrix
   * @function Randrix.charMatch
   * @param {object} id of the Char.
   * @param {string} char to match.
   * @return {boolean} char has matched or not.
   */
  charMatch(id, char) {
    if (this.charMatchIndex(char) && this.charMatchPosition(id)) {
      if (this._debug) {
        // eslint-disable-next-line no-console
        console.log(
          'next', 'x' + this._x, 'y' + this._y, 'c' + char
        );
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * Match the Char Position on the Randrix
   * @function Randrix.charMatchIndex
   * @param {string} char to match.
   * @return {boolean} char has index matched or not.
   */
  charMatchIndex(char) {
    return this._message[this._index] === char;
  }

  /**
   * Match the Char Position on the Randrix
   * @function Randrix.charMatchPosition
   * @param {object} id of the Char.
   * @return {boolean} char has position matched or not.
   */
  charMatchPosition(id) {
    return (this._matrix[id]) ?
      // start in the first lines
      (this._index === 0 && this._matrix[id].x === 0) ||
       // forward in the current line
      (this._x === this._matrix[id].x && this._y + 1 === this._matrix[id].y) ||
      // forward to the next line
      (this._x + 1 === this._matrix[id].x && this._matrix[id].y === 0) :
    false;
  }

  /**
   * Activate the Char on the Randrix
   * @function Randrix.charActivate
   * @param {string} id of the Char.
   * @return {boolean} is the Char successful activated.
   */
  charActivate(id) {
    if (this._matrix[id]) {
      this._index = this._index + 1;
      this._x = this._matrix[id].x;
      this._y = this._matrix[id].y;
      this.charStop(id);
      this._matrix[id].element
        .setAttribute('data-randrix-char-active', 'true');
      return true;
    } else {
      return false;
    }
  }

  /**
   * Stop the Char on the Randrix
   * @function Randrix.charStop
   * @param {string} id of the Char.
   * @return {function} clearInterval function of the Char.
   */
  charStop(id) {
    return (this._matrix[id]) ? clearInterval(this._matrix[id].interval) :
      () => false;
  }

  /**
   * Start the Char on the Randrix
   * @function Randrix.charStart
   * @param {string} id of the Char.
   * @return {function} setInterval function of the Char.
   */
  charStart(id) {
    return setInterval(() => {
      this.charUpdate(id);
    }, this._interval);
  }

  /**
   * Create the Randrix
   * @function Randrix.create
   * @return {boolean} done.
   */
  create() {
    for (let x = 0; x < this._width; x++) {
      for (let y = 0; y < this._height; y++) {
        this.charCreate(x, y);
      }
    }
    return true;
  }

  /**
   * Reset the Randrix
   * @function Randrix.reset
   * @return {boolean} done.
   */
  reset() {
    this._element.innerHTML = '';
    this.stop(
      () => {
        this.constructor(this._settings);
        this.start();
      }
    );
    return true;
  }

  /**
   * Stop the Randrix
   * @function Randrix.stop
   * @param {function} callback to execute.
   * @return {boolean} done.
   */
  stop(callback) {
    for (const item in this._matrix) {
      if (this._matrix.hasOwnProperty(item)) {
        clearInterval(this._matrix[item].interval);
      }
    }
    if (typeof callback === 'function') callback();
    return true;
  }

  /**
   * Start the Randrix
   * @function Randrix.start
   * @return {boolean} done.
   */
  start() {
    (this._index === 0) ? this.create() : this.reset();
    return true;
  }
}
