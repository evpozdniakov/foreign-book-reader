const path = require('path');

const { useTranslateShell } = require('./translation-engines/translate-shell');
const { useMSTranslator } = require('./translation-engines/ms-translator');

exports.applyRoutes = app => {
  app.get('/translate/:text', useTranslateShell);
  // app.get('/translate/:text', useMSTranslator);

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}
