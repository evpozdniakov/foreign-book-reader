const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config');
const { applyRoutes } = require('./back-end/router');

const app = express();
const compiler = webpack(config);

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

applyRoutes(app);

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
