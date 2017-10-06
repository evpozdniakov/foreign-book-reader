exports.useTranslateShell = (req, res) => {
  const { exec } = require('child_process');

  exec(`trans -s en -t ru '${req.params.text}'`, (error, stdout, stderr) => {
    if (error !== null) {
      console.error('exec error: ' + error);
      res.status(500).send('System error');

      return;
    }

    if (stderr) {
      res.status(500).send(stderr);

      return;
    }

    res.send(switchToHypertextMarkup(stdout));
  });
}

function switchToHypertextMarkup(text) {
  const lines = text.split('\n');
  const word = lines[0];
  const transcription = lines[1].substr(0, 1) === '/' ? lines[1] : '';

  const introductionLastLine = lines.find(line => line.substr(-1) === ']');
  const definitionFirstLineIndex = lines.indexOf(introductionLastLine) + 2;
  const definitionText = lines.slice(definitionFirstLineIndex).join('\n');
  const definitionGroups = definitionText.split('\n\n');

  const definitions = definitionGroups.reduce((res, groupText) => {
    if (groupText.substr(0, 1) === '[') {
      return res;
    }

    return res.concat(parseGroupText(groupText));
  }, []);

  return {
    word,
    transcription,
    definitions,
    raw: text,
  }
}

function parseGroupText(text) {
  const lines = text.split('\n');
  const type = lines[0];

  if (type.indexOf('[4m') >= 0) {
    return {
      notype: lines.slice(1).map(text => cleanupText(text)).filter(text => !!text)
    };
  }

  const variants = lines.slice(1).reduce((res, line, index, arr) => {
    if (index % 2 === 0) {
      return res;
    }

    const translation = cleanupText(arr[index - 1]);
    const backTranslations = arr[index].trim();

    return res.concat({
      translation,
      backTranslations,
    });
  }, []);

  return {
    type,
    variants,
  }
}

function cleanupText(text) {
  return text
    .split('').join('')
    .split('[1m').join('')
    .split('[22m').join('')
    .split('[4m').join('')
    .split('[24m').join('')
    .trim()
}
