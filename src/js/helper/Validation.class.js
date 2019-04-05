/**
 * @fileOverview Validation Class.
 * @author Simon Gattner <npm@0x38.de>
 * @license MIT
 * @version 1.0.1
 */
export default class Validation {
  /**
   * Do we have valid options?
   * @function Validation.options
   * @param {options} options to validate.
   * @return {object} options validated.
   */
  static options(options) {
    let error = '';
    switch (true) {
      case (typeof options !== 'object' || Array.isArray(options)):
        error = 'options must be an object';
        break;
      case (
        typeof options.message !== 'string' ||
        options.message.length === 0
      ):
        error = 'options.message must be a string > 0';
        break;
      case (
        typeof options.selector !== 'string' &&
        typeof options.selector !== 'undefined'
      ):
        error = 'options.selector must be a string or undefined';
        break;
      case (
        typeof options.selector === 'string' &&
        document.querySelector(options.selector) === null
      ):
        error = 'options.selector must be a DOM selector';
        break;
      case (
        typeof options.width !== 'number' &&
        typeof options.width !== 'undefined'
      ):
        error = 'options.width must be a number or undefined';
        break;
      case (typeof options.width === 'number' && options.width === 0):
        error = 'options.width must be a number > 0 or undefined';
        break;
      case (
        typeof options.height !== 'number' &&
        typeof options.height !== 'undefined'
      ):
        error = 'options.height must be a number or undefined';
        break;
      case (typeof options.height === 'number' && options.height === 0):
        error = 'options.height must be a number > 0 or undefined';
        break;
      case (
        typeof options.interval !== 'number' &&
        typeof options.interval !== 'undefined'
      ):
        error = 'options.interval must be a number or undefined';
        break;
      case (typeof options.interval === 'number' && options.interval === 0):
        error = 'options.interval must be a number > 0 or undefined';
        break;
      case (
        typeof options.possible !== 'string' &&
        typeof options.possible !== 'undefined'
      ):
        error = 'options.possible must be a string or undefined';
        break;
      case (
        typeof options.possible === 'string' &&
        options.possible.length === 0
      ):
        error = 'options.possible must be a string > 0 or undefined';
        break;
      case (
        !Array.isArray(options.style) &&
        typeof options.style !== 'undefined'
      ):
        error = 'options.style must be an array or undefined';
        break;
      case (Array.isArray(options.style) && options.style.length === 0):
        error = 'options.style must be an array > 0';
        break;
      case (
        typeof options.callback !== 'function' &&
        options.callback !== null &&
        typeof options.callback !== 'undefined'
      ):
        error = 'options.callback must be a function, null or undefined';
        break;
    }
    return (error.length === 0) ? options : {error: error};
  }
}
