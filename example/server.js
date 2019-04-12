const path = require('path');

const express = require('express');
const app = express();
const isDev = app.get('env') === 'development';

const expressNunjucks = require('express-nunjucks');

const compression = require('compression');
const minify = require('express-minify');
const minifyHTML = require('express-minify-html');

const favicon = require('serve-favicon');

app.use(compression());
app.use(minify(
    {
      cache: false,
      uglifyJsModule: null,
      errorHandler: null,
      cssMatch: /css/,
    }
  )
);
app.use(minifyHTML({
  override: true,
  exception_url: false,
  htmlMinifier: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true,
  },
}));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(
  '/static',
  express.static(path.join(__dirname, 'static'))
);
app.use(
  '/static/js/js.randrix',
  express.static(path.join(__dirname, '../dist'))
);

app.set('port', process.env.PORT || 3333);

app.set('views', __dirname + '/views');

const njk = expressNunjucks(app, { // eslint-disable-line no-unused-vars
    watch: isDev,
    noCache: isDev,
});

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(app.get('port'), function() {
    console.log( // eslint-disable-line no-console
      'Server started on port', app.get('port')
    );
});
