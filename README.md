[![tests][tests]][tests-url]
[![coverage][coverage]][coverage-url]
[![maintainability][maintainability]][maintainability-url]

# randtrix
A programable, random matrix panel.

## Usage

[![npm][npm]][npm-url]

```console
npm install --save randrix
```

### ES Module

```javascript
import Randrix from 'randrix';

const randrix = new Randrix({
  message: 'RandomMatrix',
});
randrix.start();

```

### UMD Module

```javascript
<script type="text/javascript" src="node_modules/randix/dist/randrix.min.js"></script>
<script type="text/javascript">
  var randrix = new window.Randrix.default({
    message: 'randrix.js',
    possible: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.'
  });
  randrix.start();
</script>
```

### CSS

```css
[data-randrix] {
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(6, 4vw);
  grid-template-rows: repeat(5, 8vw);
  align-content: space-around;
  justify-content: space-between;
}

[data-randrix-char] {
  font-size: 2.4vw;
  line-height: 6vw;
  opacity: .6;
  text-align: center;
}

[data-randrix-char-active="true"] {
  font-weight: bold;
  opacity: 1;
}

[data-randrix-style="monospace"] {
  font-family: monospace;
}

[data-randrix-style="sans-serif"] {
  font-family: sans-serif;
}

[data-randrix-style="serif"] {
  font-family: serif;
}

[data-randrix-style="cursive"] {
  font-family: cursive;
}
```

## Example

### Custom

```javascript
import Randrix from 'randrix';

const randrix = new Randrix( {
      message: 'RandomMatrix',
      selector: '[data-randrix]',
      width: 6,
      height: 8,
      interval: 100,
      possible: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      style: ['serif', 'sans-serif', 'monospace'],
      callback: () => { document.body.style.backgroundColor = '#abcdef'; },
    });
randrix.start();
```

### Multiple

#### Promise
Async, await example. Resolve the promise with the Randrix callback option.

```javascript
import Randrix from 'randrix';

async function f() {
  const promise = new Promise((resolve, reject) => {
    const randrix = new Randrix({
      message: 'RandomMatrix',
      selector: '[data-randrix]',
      callback: () => resolve(true),
    });
    randrix.start();
  });

  const result = await promise;
  if (result) second();
}

function second() {
  document.querySelector('[data-randrix]').innerHTML = '';
  const randrix = new Randrix({
    message: 'randrix.js',
    selector: '[data-randrix]',
    possible: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.',
  });
  randrix.start();
}

f();

```

#### Generator
Generator, yield example. Go to next() with the Randrix callback option.

```javascript
import Randrix from 'randrix';

function* panels(configs) {
  for (let i = 0; i < configs.length; i++) {
    yield panel(configs[i], i);
  }
}

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
```

## Documentation

* [jsDoc](https://exiguus.github.io/js.randrix/)
* [Coverage](https://exiguus.github.io/js.randrix/coverage/)


[tests]: https://img.shields.io/travis/exiguus/js.randrix/master.svg
[tests-url]: https://travis-ci.org/exiguus/js.randrix

[maintainability]:
https://api.codeclimate.com/v1/badges/192506e0ccb2e5f72435/maintainability
[maintainability-url]:
https://codeclimate.com/github/exiguus/js.randrix/maintainability

[coverage]:
https://api.codeclimate.com/v1/badges/192506e0ccb2e5f72435/test_coverage
[coverage-url]:
https://codeclimate.com/github/exiguus/js.randrix/test_coverage

[npm]: https://img.shields.io/npm/v/randrix.svg
[npm-url]: https://npmjs.com/package/randrix
