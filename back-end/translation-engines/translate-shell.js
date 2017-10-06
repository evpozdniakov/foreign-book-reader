var consecutiveFails = 0;

exports.useTranslateShell = (req, res) => {
  executeTranslateShellCommand(res, req.params.text);
}

function executeTranslateShellCommand(res, text) {
  const { exec } = require('child_process');

  exec(`trans -s en -t ru ${wrapInQuotes(text)}`, (error, stdout, stderr) => {
    if (error !== null) {
      console.error('exec error: ' + error);
      res.status(500).send('System error');

      return;
    }

    if (stderr) {
      if (isDidYouMeanCase(stderr) && ++consecutiveFails < 3) {
        handleDidYouMeanCase(res, stderr);

        return;
      }

      res.status(500).send({
        error: cleanupText(stderr),
      });

      return;
    }

    res.send(switchToHypertextMarkup(stdout));
    consecutiveFails = 0;
  });
}

function wrapInQuotes(text) {
  if (text.indexOf('\'') < 0) {
    return `'${text}'`;
  }

  if (text.indexOf('"') < 0) {
    return `"${text}"`;
  }

  return `"${text.split('"').join(' ').trim()}"`;
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
    let notype = lines[1].split('[22m,').map(cleanupText);

    return {notype};
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
    .split('[33m').join('')
    .split('[0m').join('')
    .trim()
}

function isDidYouMeanCase(stderr) {
  return stderr.indexOf('Did you mean:') >= 0;
}

function handleDidYouMeanCase(res, stderr) {
  const alternative = cleanupText(stderr).split('Did you mean:')[1].trim()

  executeTranslateShellCommand(res, alternative);
}
