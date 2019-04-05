import 'babel-polyfill';
import TestHelper from './helper/TestHelper.class';
import Randrix from './Randrix.class';

const data = TestHelper.data();
data.class.configs.forEach((config) => {
  describe(`Randrix Class ${config.name}: `, () => {
    let element = {};
    beforeEach(function() {
      element = document.createElement('div');
      element.setAttribute(
        (config.selector) ? config.selector : 'data-randrix',
        'true'
      );

      document.body.appendChild(element);
    });

    afterEach(function() {
      document.body.removeChild(element);
    });

    if (config.type === 'fail') {
      it('Randrix Throw Errors', () => {
        expect(function() {
          new Randrix(config.settings);
        }).toThrow(new Error(config.expect));
      });
    } else {
      it('Randrix is Object', () => {
        const randrix = new Randrix(config.settings);
        expect(typeof randrix).toBe('object');
      });

      data.methods.forEach((method) => {
        it(`randrix.${method.name} is function`, () => {
          // eslint-disable-next-line no-unused-vars
          const randrix = new Randrix(config.settings);
          expect(eval(`typeof randrix.${method.name}`)).toBe(method.type);
        });

        if (method.expect) {
          let value = TestHelper.escape(method.value);
          it(
            `randrix.${method.name}(${value}) return ${method.expect}`,
            () => {
            // eslint-disable-next-line no-unused-vars
            const randrix = new Randrix(config.settings);
            if (method.callBefore) eval(`randrix.${method.callBefore}()`);
            if (data.debug) TestHelper.debug(config, method, value);
            expect(
              eval(`typeof randrix.${method.name}(value)`)
            ).toBe(method.expect);
            if (method.callAfter) eval(`randrix.${method.callAfter}()`);
          });
        }
      });
    }
  });
});
