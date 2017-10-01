var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/translate/:text', function (req, res) {
  translateWithAPI(req.params.text)
    .then(jsonString => {
      res.send(jsonString);
    });
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});

function translateWithAPI(text) {
  const fetch = require('node-fetch');
  const { url, options } = prepareTranslateRequest(text);

  return fetch(url, options)
    .then(res => res.text())
    .then(parseXml)
    .then(json => {
      const translation = json.string._;

      return JSON.stringify({translation});
    });
}

function prepareTranslateRequest(text) {
  const params = {
    appid: '',
    text,
    from: 'en',
    to: 'ru',
    contentType: 'text/plain',
    category: 'general',
  };

  const url = 'https://api.microsofttranslator.com/V2/Http.svc/Translate?' + toQueryString(params);
  const { API_KEY } = require('./api-key');

  const options = {
    method: 'GET',
    headers: {
      'Ocp-Apim-Subscription-Key': API_KEY.MICROSOFT_TRANSLATOR,
    },
  };

  return {url, options};
}

function toQueryString(obj) {
  return Object.keys(obj)
    .map(key => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&');
}

function parseXml(xml) {
  return new Promise((resolve, reject) => {
    require('xml2js').parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    });
  });
}
