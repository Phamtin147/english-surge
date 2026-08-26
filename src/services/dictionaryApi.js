/**
 * Hybrid Dictionary Service
 * 1. 103,376+ English - Vietnamese Dictionary (anhviet109K)
 * 2. International Free Dictionary API (English definitions & audio)
 */

const dictCache = new Map();

/**
 * Fetch and cache the letter chunk for the 103K Vietnamese dictionary
 */
async function getLetterDict(letter) {
  const cleanLetter = (letter >= 'a' && letter <= 'z') ? letter : 'other';
  if (dictCache.has(cleanLetter)) {
    return dictCache.get(cleanLetter);
  }

  try {
    const res = await fetch(`/dict/${cleanLetter}.json`);
    if (!res.ok) return null;
    const data = await res.json();
    dictCache.set(cleanLetter, data);
    return data;
  } catch (err) {
    console.error(`Failed to load dictionary chunk: ${cleanLetter}`, err);
    return null;
  }
}

/**
 * Lookup a word in both 103K Anh-Viet database and Online Dictionary
 */
export async function lookupWordOnline(word) {
  const cleanWord = word.trim().toLowerCase();
  if (!cleanWord) return null;

  const firstChar = cleanWord[0];
  const dictChunk = await getLetterDict(firstChar);

  const localEntry = dictChunk ? dictChunk[cleanWord] : null;

  // Query Free Dictionary API for English audio / definitions in background
  let onlineEntry = null;
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`);
    if (res.ok) {
      const data = await res.json();
      onlineEntry = data[0];
    }
  } catch {
    // ignore offline / network error
  }

  // If found in 103K Anh-Viet dictionary
  if (localEntry) {
    const phoneticObj = onlineEntry?.phonetics?.find((p) => p.text && p.audio) || onlineEntry?.phonetics?.find((p) => p.text) || {};
    const ipa = localEntry.p || onlineEntry?.phonetic || phoneticObj.text || '';
    const audio = onlineEntry?.phonetics?.find((p) => p.audio && p.audio.length > 0)?.audio || '';

    return {
      word: localEntry.w || word,
      ipa,
      audio,
      vietnameseSections: localEntry.s || [],
      onlineMeanings: onlineEntry?.meanings || [],
      source: 'anhviet109K',
    };
  }

  // Fallback to online dictionary if not in 103K local
  if (onlineEntry) {
    const phoneticObj = onlineEntry.phonetics?.find((p) => p.text && p.audio) || onlineEntry.phonetics?.find((p) => p.text) || {};
    const ipa = onlineEntry.phonetic || phoneticObj.text || '';
    const audio = onlineEntry.phonetics?.find((p) => p.audio && p.audio.length > 0)?.audio || '';

    return {
      word: onlineEntry.word,
      ipa,
      audio,
      vietnameseSections: [],
      onlineMeanings: (onlineEntry.meanings || []).map((m) => ({
        partOfSpeech: m.partOfSpeech,
        definitions: (m.definitions || []).slice(0, 3).map((d) => ({
          definition: d.definition,
          example: d.example || '',
          synonyms: d.synonyms || [],
        })),
        synonyms: (m.synonyms || []).slice(0, 6),
      })),
      source: 'international_api',
    };
  }

  return {
    error: 'not_found',
    message: `Không tìm thấy từ "${word}" trong từ điển 103.000 từ Anh - Việt.`,
  };
}

/**
 * Search word suggestions from the 103K dictionary matching prefix
 */
export async function getWordSuggestions(prefix, limit = 8) {
  const clean = prefix.trim().toLowerCase();
  if (!clean || clean.length < 2) return [];

  const firstChar = clean[0];
  const dictChunk = await getLetterDict(firstChar);
  if (!dictChunk) return [];

  const matches = [];
  for (const [key, val] of Object.entries(dictChunk)) {
    if (key.startsWith(clean)) {
      matches.push(val.w || key);
      if (matches.length >= limit) break;
    }
  }
  return matches;
}
