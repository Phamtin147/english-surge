import fs from 'fs';
import https from 'https';
import path from 'path';

const url = 'https://raw.githubusercontent.com/yenthanh132/avdict-database-sqlite-converter/master/anhviet109K.txt';
const publicDictDir = path.resolve('public/dict');

if (!fs.existsSync(publicDictDir)) {
  fs.mkdirSync(publicDictDir, { recursive: true });
}

console.log('Downloading anhviet109K.txt (~14.8MB)...');

https.get(url, (res) => {
  let rawData = '';
  res.setEncoding('utf8');

  res.on('data', (chunk) => {
    rawData += chunk;
  });

  res.on('end', () => {
    console.log(`Downloaded ${rawData.length} chars. Parsing dictionary entries...`);
    parseAndSave(rawData);
  });
}).on('error', (err) => {
  console.error('Download error:', err);
});

function parseAndSave(text) {
  const lines = text.split('\n');
  const dictByLetter = {};

  let currentWord = null;
  let currentIpa = '';
  let currentSections = [];
  let currentSection = null;

  function flushWord() {
    if (!currentWord) return;
    if (currentSection) {
      currentSections.push(currentSection);
      currentSection = null;
    }

    const firstChar = currentWord[0].toLowerCase();
    const key = (firstChar >= 'a' && firstChar <= 'z') ? firstChar : 'other';

    if (!dictByLetter[key]) dictByLetter[key] = {};

    dictByLetter[key][currentWord.toLowerCase()] = {
      w: currentWord,
      p: currentIpa,
      s: currentSections
    };

    currentWord = null;
    currentIpa = '';
    currentSections = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('@')) {
      flushWord();
      // Line: @word /ipa/ or @word
      const rest = line.slice(1).trim();
      const slashIdx = rest.indexOf('/');
      if (slashIdx !== -1) {
        currentWord = rest.slice(0, slashIdx).trim();
        const endSlash = rest.lastIndexOf('/');
        currentIpa = (endSlash > slashIdx) ? rest.slice(slashIdx, endSlash + 1).trim() : rest.slice(slashIdx).trim();
      } else {
        currentWord = rest.trim();
        currentIpa = '';
      }
    } else if (line.startsWith('*')) {
      // Part of speech: * danh từ
      if (currentSection) {
        currentSections.push(currentSection);
      }
      currentSection = {
        pos: line.slice(1).trim(),
        meanings: []
      };
    } else if (line.startsWith('-')) {
      // Meaning
      if (!currentSection) {
        currentSection = { pos: 'nghĩa', meanings: [] };
      }
      currentSection.meanings.push({
        m: line.slice(1).trim(),
        ex: []
      });
    } else if (line.startsWith('=')) {
      // Example: =example+ translation
      if (currentSection && currentSection.meanings.length > 0) {
        const lastMeaning = currentSection.meanings[currentSection.meanings.length - 1];
        const exText = line.slice(1).trim();
        const plusIdx = exText.indexOf('+');
        if (plusIdx !== -1) {
          lastMeaning.ex.push({
            e: exText.slice(0, plusIdx).trim(),
            v: exText.slice(plusIdx + 1).trim()
          });
        } else {
          lastMeaning.ex.push({ e: exText, v: '' });
        }
      }
    }
  }

  flushWord();

  let totalWords = 0;
  for (const [letter, entries] of Object.entries(dictByLetter)) {
    const count = Object.keys(entries).length;
    totalWords += count;
    const filePath = path.join(publicDictDir, `${letter}.json`);
    fs.writeFileSync(filePath, JSON.stringify(entries));
    console.log(`Saved ${count} words to public/dict/${letter}.json (${(fs.statSync(filePath).size / 1024).toFixed(1)} KB)`);
  }

  console.log(`\n🎉 SUCCESSFULLY CONVERTED ALL ${totalWords} VIETNAMESE DICTIONARY WORDS!`);
}
