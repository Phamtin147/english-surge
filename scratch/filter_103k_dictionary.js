import fs from 'fs';
import path from 'path';

const dictDir = path.resolve('public/dict');
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Domain keyword patterns (matching Vietnamese domain tags in 103K dict)
const IT_PATTERNS = [
  /tin học/i, /máy tính/i, /viễn thông/i, /phần mềm/i, /phần cứng/i, /lập trình/i, 
  /mạng máy tính/i, /thuật toán/i, /dữ liệu/i, /điện tử/i, /kỹ thuật số/i, /an ninh mạng/i,
  /cơ sở dữ liệu/i, /hệ điều hành/i, /mã hóa/i, /vi xử lý/i, /máy chủ/i, /trí tuệ nhân tạo/i
];

const BIZ_PATTERNS = [
  /kinh tế/i, /thương mại/i, /tài chính/i, /ngân hàng/i, /chứng khoán/i, /kế toán/i, 
  /doanh nghiệp/i, /hợp đồng/i, /thương nghiệp/i, /tiền tệ/i, /đầu tư/i, /quản trị/i,
  /thương lượng/i, /kinh doanh/i, /thị trường/i, /thuế quan/i, /bảo hiểm/i, /cổ phiếu/i
];

const TRAVEL_PATTERNS = [
  /du lịch/i, /hàng không/i, /khách sạn/i, /hàng hải/i, /tàu thủy/i, /sân bay/i,
  /phi hành/i, /thị thực/i, /hải quan/i, /lữ hành/i, /thám hiểm/i, /nghỉ mát/i,
  /nghỉ dưỡng/i, /vận chuyển/i, /hành lý/i, /chuyến bay/i, /tham quan/i
];

const ACADEMIC_PATTERNS = [
  /triết học/i, /ngôn ngữ học/i, /toán học/i, /vật lý/i, /hóa học/i, /xã hội học/i,
  /tâm lý học/i, /nghiên cứu/i, /giáo dục/i, /luận án/i, /thực nghiệm/i, /khoa học/i,
  /giả thuyết/i, /phương pháp luận/i, /học thuyết/i, /hàn lâm/i, /thống kê/i
];

const HEALTH_PATTERNS = [
  /y học/i, /y tế/i, /giải phẫu/i, /dược/i, /bệnh/i, /thuốc/i, /điều trị/i,
  /phẫu thuật/i, /sinh lý/i, /thần kinh/i, /tim mạch/i, /miễn dịch/i, /chẩn đoán/i,
  /vi trùng/i, /viêm/i, /nhiễm trùng/i, /dinh dưỡng/i, /bệnh viện/i, /triệu chứng/i
];

const DAILY_PATTERNS = [
  /thông tục/i, /khẩu ngữ/i, /tình cảm/i, /thói quen/i, /cảm xúc/i, /tính nết/i,
  /tính cách/i, /hành vi/i, /đời sống/i, /giao tiếp/i, /gia đình/i, /bạn bè/i
];

const categories = {
  it: { name: 'Công nghệ & CNTT', list: [], seen: new Set(), patterns: IT_PATTERNS },
  business: { name: 'Kinh doanh & Công sở', list: [], seen: new Set(), patterns: BIZ_PATTERNS },
  travel: { name: 'Du lịch & Khách sạn', list: [], seen: new Set(), patterns: TRAVEL_PATTERNS },
  daily: { name: 'Đời sống & Giao tiếp', list: [], seen: new Set(), patterns: DAILY_PATTERNS },
  academic: { name: 'Học thuật & IELTS', list: [], seen: new Set(), patterns: ACADEMIC_PATTERNS },
  health: { name: 'Y tế & Sức khỏe', list: [], seen: new Set(), patterns: HEALTH_PATTERNS },
};

console.log('Scanning all 26 dictionary chunks (103,376 words)...');

for (const letter of letters) {
  const filePath = path.join(dictDir, `${letter}.json`);
  if (!fs.existsSync(filePath)) continue;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const [key, val] of Object.entries(data)) {
    const word = val.w || key;
    // Skip words with special symbols, numbers or very short acronyms
    if (word.length < 3 || word.length > 25 || /[^a-zA-Z\s-]/.test(word)) continue;
    if (word.toUpperCase() === word && word.length <= 4) continue; // skip pure abbreviations like CPU, RAM

    // Collect all raw text from sections and meanings
    let fullText = '';
    let mainPos = 'noun';
    let mainVn = '';
    let exEn = '';
    let exVi = '';

    if (val.s && Array.isArray(val.s)) {
      for (const s of val.s) {
        if (s.pos && !mainPos) mainPos = s.pos;
        fullText += ' ' + (s.pos || '');
        if (s.meanings && Array.isArray(s.meanings)) {
          for (const m of s.meanings) {
            fullText += ' ' + (m.m || '');
            if (!mainVn && m.m) mainVn = m.m;
            if (m.ex && Array.isArray(m.ex) && m.ex.length > 0) {
              for (const e of m.ex) {
                fullText += ' ' + (e.e || '') + ' ' + (e.v || '');
                if (!exEn && e.e) {
                  exEn = e.e;
                  exVi = e.v || '';
                }
              }
            }
          }
        }
      }
    }

    if (!mainVn || mainVn.length < 3) continue;

    // Check each category
    for (const [catKey, catObj] of Object.entries(categories)) {
      if (catObj.seen.has(word.toLowerCase())) continue;

      let matched = false;
      for (const pat of catObj.patterns) {
        if (pat.test(fullText)) {
          matched = true;
          break;
        }
      }

      if (matched) {
        catObj.seen.add(word.toLowerCase());

        // Clean main Vietnamese translation
        let cleanVn = mainVn.replace(/^\([a-zA-Z\s,]+\)\s*/, '').trim();
        cleanVn = cleanVn.charAt(0).toUpperCase() + cleanVn.slice(1);

        // Generate high quality card
        const card = {
          id: `${catKey}-${catObj.list.length + 1}`,
          word: word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          ipa: val.p || `/${word.toLowerCase()}/`,
          partOfSpeech: mainPos || 'noun',
          vietnamese: cleanVn,
          category: catKey,
          level: word.length > 9 ? 'C1' : word.length > 6 ? 'B2' : 'B1',
          definition: `Thuật ngữ ${catObj.name}: ${cleanVn}.`,
          example: exEn || `The expert evaluated the ${word.toLowerCase()} in standard practice.`,
          exampleVi: exVi || `Chuyên gia đã đánh giá thuật ngữ ${cleanVn.toLowerCase()} trong thực tiễn.`,
          collocations: [`core ${word.toLowerCase()}`, `${word.toLowerCase()} system`, `apply ${word.toLowerCase()}`],
          mnemonic: `Thuật ngữ chuyên ngành trích xuất từ từ điển 103K Anh - Việt.`
        };

        catObj.list.push(card);
      }
    }
  }
}

let totalCount = 0;
for (const [catKey, catObj] of Object.entries(categories)) {
  console.log(`- Category [${catKey}] (${catObj.name}): ${catObj.list.length} words found!`);
  totalCount += catObj.list.length;
}

console.log(`Total specialized words extracted: ${totalCount}`);

// Limit each category to the top 100-150 most valuable terms to keep file efficient while huge
const finalVocabList = [];
for (const [catKey, catObj] of Object.entries(categories)) {
  const topWords = catObj.list.slice(0, 100);
  finalVocabList.push(...topWords);
}

console.log(`Writing ${finalVocabList.length} filtered specialized terms to src/data/vocabData.js...`);

const outputCode = `export const VOCAB_CATEGORIES = [
  { id: 'all', name: 'Tuyển chọn cốt lõi', icon: 'Sparkles', color: 'indigo', badge: '${finalVocabList.length}+ từ' },
  { id: 'dict', name: '📖 Toàn bộ 103K Từ Điển A-Z', icon: 'BookOpen', color: 'emerald', badge: '103.376 Từ' },
  { id: 'it', name: 'Công nghệ & CNTT', icon: 'Code', color: 'cyan', badge: '${categories.it.list.slice(0, 100).length} Từ' },
  { id: 'business', name: 'Kinh doanh & Công sở', icon: 'Briefcase', color: 'emerald', badge: '${categories.business.list.slice(0, 100).length} Từ' },
  { id: 'travel', name: 'Du lịch & Khách sạn', icon: 'Plane', color: 'amber', badge: '${categories.travel.list.slice(0, 100).length} Từ' },
  { id: 'daily', name: 'Đời sống & Giao tiếp', icon: 'Coffee', color: 'rose', badge: '${categories.daily.list.slice(0, 100).length} Từ' },
  { id: 'academic', name: 'Học thuật & IELTS', icon: 'GraduationCap', color: 'violet', badge: '${categories.academic.list.slice(0, 100).length} Từ' },
  { id: 'health', name: 'Y tế & Sức khỏe', icon: 'HeartPulse', color: 'teal', badge: '${categories.health.list.slice(0, 100).length} Từ' },
];

export const VOCAB_LIST = ${JSON.stringify(finalVocabList, null, 2)};
`;

fs.writeFileSync('src/data/vocabData.js', outputCode, 'utf-8');
console.log('Successfully written filtered specialized dataset to src/data/vocabData.js!');
