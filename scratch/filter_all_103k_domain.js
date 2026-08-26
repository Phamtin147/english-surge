import fs from 'fs';
import path from 'path';

const dictDir = path.resolve('public/dict');
const domainDir = path.resolve('public/domain');
if (!fs.existsSync(domainDir)) fs.mkdirSync(domainDir, { recursive: true });

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Comprehensive Regex Patterns for Domain Extraction from 103K Dict
const IT_PATTERNS = [
  /tin học/i, /máy tính/i, /viễn thông/i, /phần mềm/i, /phần cứng/i, /lập trình/i, 
  /mạng máy tính/i, /thuật toán/i, /dữ liệu/i, /điện tử/i, /kỹ thuật số/i, /an ninh mạng/i,
  /cơ sở dữ liệu/i, /hệ điều hành/i, /mã hóa/i, /vi xử lý/i, /máy chủ/i, /trí tuệ nhân tạo/i,
  /vật lý bán dẫn/i, /công nghệ thông tin/i, /internet/i, /mạng internet/i, /kỹ thuật điện tử/i
];

const BIZ_PATTERNS = [
  /kinh tế/i, /thương mại/i, /tài chính/i, /ngân hàng/i, /chứng khoán/i, /kế toán/i, 
  /doanh nghiệp/i, /hợp đồng/i, /thương nghiệp/i, /tiền tệ/i, /đầu tư/i, /quản trị/i,
  /thương lượng/i, /kinh doanh/i, /thị trường/i, /thuế quan/i, /bảo hiểm/i, /cổ phiếu/i,
  /hải quan/i, /thương hội/i, /thầu/i, /ngoại hối/i, /thương gia/i, /lợi nhuận/i
];

const TRAVEL_PATTERNS = [
  /du lịch/i, /hàng không/i, /khách sạn/i, /hàng hải/i, /tàu thủy/i, /sân bay/i,
  /phi hành/i, /thị thực/i, /lữ hành/i, /thám hiểm/i, /nghỉ mát/i, /nghỉ dưỡng/i,
  /vận chuyển/i, /hành lý/i, /chuyến bay/i, /tham quan/i, /thắng cảnh/i, /đường bay/i,
  /tàu hỏa/i, /phương tiện giao thông/i, /bến cảng/i, /phi công/i
];

const ACADEMIC_PATTERNS = [
  /triết học/i, /ngôn ngữ học/i, /toán học/i, /vật lý/i, /hóa học/i, /xã hội học/i,
  /tâm lý học/i, /nghiên cứu/i, /giáo dục/i, /luận án/i, /thực nghiệm/i, /khoa học/i,
  /giả thuyết/i, /phương pháp luận/i, /học thuyết/i, /hàn lâm/i, /thống kê/i, /logic học/i,
  /văn học/i, /địa chất/i, /sinh học/i, /khảo cổ/i, /thiên văn/i
];

const HEALTH_PATTERNS = [
  /y học/i, /y tế/i, /giải phẫu/i, /dược/i, /bệnh/i, /thuốc/i, /điều trị/i,
  /phẫu thuật/i, /sinh lý/i, /thần kinh/i, /tim mạch/i, /miễn dịch/i, /chẩn đoán/i,
  /vi trùng/i, /viêm/i, /nhiễm trùng/i, /dinh dưỡng/i, /bệnh viện/i, /triệu chứng/i,
  /nha khoa/i, /mắt/i, /tai mũi họng/i, /xương khớp/i, /kháng sinh/i, /dịch bệnh/i
];

const DAILY_PATTERNS = [
  /thông tục/i, /khẩu ngữ/i, /tình cảm/i, /thói quen/i, /cảm xúc/i, /tính nết/i,
  /tính cách/i, /hành vi/i, /đời sống/i, /giao tiếp/i, /gia đình/i, /bạn bè/i,
  /sinh hoạt/i, /nhà cửa/i, /ăn uống/i, /trang phục/i, /sở thích/i
];

const categories = {
  it: { name: 'Công nghệ & CNTT', list: [], seen: new Set(), patterns: IT_PATTERNS },
  business: { name: 'Kinh doanh & Công sở', list: [], seen: new Set(), patterns: BIZ_PATTERNS },
  travel: { name: 'Du lịch & Khách sạn', list: [], seen: new Set(), patterns: TRAVEL_PATTERNS },
  daily: { name: 'Đời sống & Giao tiếp', list: [], seen: new Set(), patterns: DAILY_PATTERNS },
  academic: { name: 'Học thuật & IELTS', list: [], seen: new Set(), patterns: ACADEMIC_PATTERNS },
  health: { name: 'Y tế & Sức khỏe', list: [], seen: new Set(), patterns: HEALTH_PATTERNS },
};

console.log('Extracting ALL specialized domain words from 103,376 dictionary entries...');

for (const letter of letters) {
  const filePath = path.join(dictDir, `${letter}.json`);
  if (!fs.existsSync(filePath)) continue;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const [key, val] of Object.entries(data)) {
    const word = val.w || key;
    if (word.length < 3 || word.length > 30 || /[^a-zA-Z\s-]/.test(word)) continue;
    if (word.toUpperCase() === word && word.length <= 4) continue;

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

    if (!mainVn || mainVn.length < 2) continue;

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
        let cleanVn = mainVn.replace(/^\([a-zA-Z\s,]+\)\s*/, '').trim();
        cleanVn = cleanVn.charAt(0).toUpperCase() + cleanVn.slice(1);

        const card = {
          id: `${catKey}-${catObj.list.length + 1}`,
          word: word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          ipa: val.p || `/${word.toLowerCase()}/`,
          partOfSpeech: mainPos || 'noun',
          vietnamese: cleanVn,
          category: catKey,
          level: word.length > 9 ? 'C1' : word.length > 6 ? 'B2' : 'B1',
          definition: `Thuật ngữ ${catObj.name}: ${cleanVn}.`,
          example: exEn || `The term ${word.toLowerCase()} is widely applied in ${catObj.name}.`,
          exampleVi: exVi || `Thuật ngữ ${cleanVn.toLowerCase()} được ứng dụng rộng rãi trong ${catObj.name.toLowerCase()}.`,
          collocations: [`core ${word.toLowerCase()}`, `${word.toLowerCase()} analysis`, `apply ${word.toLowerCase()}`],
          mnemonic: `Trích xuất từ dữ liệu từ điển 103K Anh - Việt.`
        };

        catObj.list.push(card);
      }
    }
  }
}

// Write ALL filtered words into category files in public/domain/<cat>.json
const counts = {};
for (const [catKey, catObj] of Object.entries(categories)) {
  const targetPath = path.join(domainDir, `${catKey}.json`);
  fs.writeFileSync(targetPath, JSON.stringify(catObj.list, null, 2), 'utf-8');
  counts[catKey] = catObj.list.length;
  console.log(`Saved ${catObj.list.length} words to public/domain/${catKey}.json`);
}

// Summary counts in vocabCategories
const outputCategories = `export const VOCAB_CATEGORIES = [
  { id: 'all', name: 'Tuyển chọn cốt lõi', icon: 'Sparkles', color: 'indigo', badge: '100+ từ' },
  { id: 'dict', name: '📖 Toàn bộ 103K Từ Điển A-Z', icon: 'BookOpen', color: 'emerald', badge: '103.376 Từ' },
  { id: 'it', name: 'Công nghệ & CNTT', icon: 'Code', color: 'cyan', badge: '${counts.it} Từ' },
  { id: 'business', name: 'Kinh doanh & Công sở', icon: 'Briefcase', color: 'emerald', badge: '${counts.business} Từ' },
  { id: 'travel', name: 'Du lịch & Khách sạn', icon: 'Plane', color: 'amber', badge: '${counts.travel} Từ' },
  { id: 'daily', name: 'Đời sống & Giao tiếp', icon: 'Coffee', color: 'rose', badge: '${counts.daily} Từ' },
  { id: 'academic', name: 'Học thuật & IELTS', icon: 'GraduationCap', color: 'violet', badge: '${counts.academic} Từ' },
  { id: 'health', name: 'Y tế & Sức khỏe', icon: 'HeartPulse', color: 'teal', badge: '${counts.health} Từ' },
];
`;

console.log('Finished filtering ALL 103K dictionary words into domain categories!');
