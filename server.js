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
  // const { url, options } = prepareTranslateRequest(text);
  const { url, options } = prepareGetTranslationsRequest(text);

  return fetch(url, options)
    .then(res => res.text())
    .then(parseXml)
    .then(json => {
      const { Translations } = json.GetTranslationsResponse
      const { TranslationMatch } = Translations[0]
      const translations = TranslationMatch.map(item => item.TranslatedText[0])

      return JSON.stringify({translations});
    });
}

function prepareTranslateRequest(text) {
  const params = getMSTranslatorRequestParams(text);
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

function prepareGetTranslationsRequest(text) {
  const params = getMSTranslatorRequestParams(text);
  const url = 'https://api.microsofttranslator.com/V2/Http.svc/GetTranslations?' + toQueryString(params); 
  const { API_KEY } = require('./api-key');

  const body = `
    <TranslateOptions xmlns="http://schemas.datacontract.org/2004/07/Microsoft.MT.Web.Service.V2">
      <Category>general</Category>
      <ContentType>text/plain</ContentType>
      <IncludeMultipleMTAlternatives>true</IncludeMultipleMTAlternatives>
      <State></State>
      <Uri></Uri>
      <User></User>
    </TranslateOptions>
  `;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
      'Ocp-Apim-Subscription-Key': API_KEY.MICROSOFT_TRANSLATOR,
    },
    body,
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

function getMSTranslatorRequestParams(text) {
  return {
    appid: '',
    text,
    from: 'en',
    to: 'ru',
    contentType: 'text/plain',
    category: 'general',
    maxTranslations: 15,
  };
}
