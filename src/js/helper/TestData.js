export default {
  debug: true,
  class: {
    configs: [{
        name: 'standard',
        settings: {
          message: 'test',
        },
      },
      {
        name: 'custom possible',
        settings: {
          message: 'randrix.js',
          possible: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.',
        },
      },
      {
        name: 'custom selector',
        selector: 'data-custom-selector',
        settings: {
          message: 'randrix',
          selector: '[data-custom-selector]',
        },
      },
      {
        name: 'custom style',
        settings: {
          message: 'randrix',
          style: ['serif', 'sans-serif', 'monospace'],
        },
      },
      {
        name: 'custom interval',
        settings: {
          message: 'randrix',
          interval: 200,
        },
      },
      {
        name: 'custom width',
        settings: {
          message: 'randrix',
          width: 8,
        },
      },
      {
        name: 'custom height',
        settings: {
          message: 'randrix',
          height: 8,
        },
      },
      {
        name: 'custom callback',
        settings: {
          message: 'randrix',
          callback: () => true,
        },
      },
      {
        name: 'custom',
        selector: 'data-randrix-js',
        settings: {
          message: 'randrix.js',
          possible: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.',
          selector: '[data-randrix-js]',
          width: 5,
          height: 6,
          interval: 80,
          style: ['serif', 'sans-serif', 'monospace'],
          callback: () => true,
        },
      },
      {
        type: 'fail',
        name: 'fail settings is number',
        expect: 'options must be an object',
        settings: 7411,
      },
      {
        type: 'fail',
        name: 'fail settings is undefined',
        expect: 'options must be an object',
        settings: undefined,
      },
      {
        type: 'fail',
        name: 'fail settings is empty object',
        expect: 'options.message must be a string > 0',
        settings: {},
      },
      {
        type: 'fail',
        name: 'fail selector is object',
        expect: 'options.selector must be a string or undefined',
        settings: {
          message: 'randrix',
          selector: ['my-selector', 'second-selector'],
        },
      },
      {
        type: 'fail',
        name: 'fail selector',
        selector: 'data-a-selector',
        expect: 'options.selector must be a DOM selector',
        settings: {
          message: 'randrix',
          selector: '[data-not-a-selector]',
        },
      },
      {
        type: 'fail',
        name: 'fail width is string',
        expect: 'options.width must be a number or undefined',
        settings: {
          message: 'randrix',
          width: 'string',
        },
      },
      {
        type: 'fail',
        name: 'fail width is object',
        expect: 'options.width must be a number or undefined',
        settings: {
          message: 'randrix',
          width: [0, 1],
        },
      },
      {
        type: 'fail',
        name: 'fail width is 0',
        expect: 'options.width must be a number > 0 or undefined',
        settings: {
          message: 'randrix',
          width: 0,
        },
      },
      {
        type: 'fail',
        name: 'fail height is object',
        expect: 'options.height must be a number or undefined',
        settings: {
          message: 'randrix',
          height: [0, 1],
        },
      }, {
        type: 'fail',
        name: 'fail height is 0',
        expect: 'options.height must be a number > 0 or undefined',
        settings: {
          message: 'randrix',
          height: 0,
        },
      },
      {
        type: 'fail',
        name: 'fail interval is object',
        expect: 'options.interval must be a number or undefined',
        settings: {
          message: 'randrix',
          interval: [0, 1],
        },
      }, {
        type: 'fail',
        name: 'fail interval is 0',
        expect: 'options.interval must be a number > 0 or undefined',
        settings: {
          message: 'randrix',
          interval: 0,
        },
      },
      {
        type: 'fail',
        name: 'fail possible is number',
        expect: 'options.possible must be a string or undefined',
        settings: {
          message: 'randrix',
          possible: 1337,
        },
      }, {
        type: 'fail',
        name: 'fail possible is 0',
        expect: 'options.possible must be a string > 0 or undefined',
        settings: {
          message: 'randrix',
          possible: '',
        },
      },
      {
        type: 'fail',
        name: 'fail style is object and not array',
        expect: 'options.style must be an array or undefined',
        settings: {
          message: 'randrix',
          style: {
            first: 'sans-serif',
            second: 'serif',
          },
        },
      },
      {
        type: 'fail',
        name: 'fail style number',
        expect: 'options.style must be an array or undefined',
        settings: {
          message: 'randrix',
          style: 42,
        },
      },
      {
        type: 'fail',
        name: 'fail style is empty array',
        expect: 'options.style must be an array > 0',
        settings: {
          message: 'randrix',
          style: [],
        },
      },
      {
        type: 'fail',
        name: 'fail callback is string',
        expect: 'options.callback must be a function, null or undefined',
        settings: {
          message: 'randrix',
          callback: 'string',
        },
      },
      {
        type: 'fail',
        name: 'fail callback is object',
        expect: 'options.callback must be a function, null or undefined',
        settings: {
          message: 'randrix',
          callback: ['string', 101],
        },
      },
    ],
  },
  methods: [{
      name: 'start',
      value: '',
      expect: 'boolean',
      type: 'function',
      callAfter: 'stop',
    },
    {
      name: 'stop',
      value: '',
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
    },
    {
      name: 'stop',
      value: () => true,
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
    },
    {
      name: 'reset',
      value: '',
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
    },
    {
      name: 'create',
      value: '',
      expect: 'boolean',
      type: 'function',
    },
    {
      name: 'charStart',
      value: 'x0-y0',
      expect: 'number',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charStop',
      value: 'x0-y0',
      expect: 'function',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charActivate',
      value: 'x0-y0',
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charMatchPosition',
      value: 'x0-y0',
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charMatchIndex',
      value: 'x0-y0',
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charMatch',
      value: 'x0-y0',
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charUpdateStatus',
      value: ['x0-y0', 'A'],
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charUpdateElement',
      value: ['x0-y0', 'A'],
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charUpdate',
      value: 'x0-y0',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charIsLastChild',
      value: 'x0-y0',
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charCreateElement',
      value: 'x0-y0',
      expect: 'object',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charCreate',
      value: [0, 0],
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charStyle',
      expect: 'string',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'char',
      expect: 'string',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'isCallback',
      value: [0, 0],
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
  ],
};
