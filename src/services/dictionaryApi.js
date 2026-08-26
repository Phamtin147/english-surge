/**
 * Free Dictionary API Service
 * Fetches definitions, phonetics, audio, and examples from https://api.dictionaryapi.dev
 */

export async function lookupWordOnline(word) {
  const cleanWord = word.trim().toLowerCase();
  if (!cleanWord) return null;

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return { error: 'not_found', message: `Không tìm thấy từ "${word}" trong từ điển quốc tế.` };
      }
      return { error: 'network_error', message: 'Lỗi kết nối máy chủ từ điển.' };
    }

    const data = await response.json();
    const entry = data[0];

    // Extract IPA and Audio
    const phoneticObj = entry.phonetics?.find((p) => p.text && p.audio) || entry.phonetics?.find((p) => p.text) || {};
    const ipa = entry.phonetic || phoneticObj.text || '';
    const audio = entry.phonetics?.find((p) => p.audio && p.audio.length > 0)?.audio || '';

    // Group meanings by part of speech
    const meanings = (entry.meanings || []).map((m) => ({
      partOfSpeech: m.partOfSpeech,
      definitions: (m.definitions || []).slice(0, 3).map((d) => ({
        definition: d.definition,
        example: d.example || '',
        synonyms: d.synonyms || [],
      })),
      synonyms: (m.synonyms || []).slice(0, 6),
      antonyms: (m.antonyms || []).slice(0, 4),
    }));

    return {
      word: entry.word,
      ipa,
      audio,
      meanings,
      sourceUrls: entry.sourceUrls || [],
    };
  } catch (err) {
    console.error('Dictionary API error:', err);
    return { error: 'fetch_failed', message: 'Không thể kết nối đến hệ thống từ điển.' };
  }
}
