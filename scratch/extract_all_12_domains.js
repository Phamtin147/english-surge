import fs from 'fs';
import path from 'path';

const dictDir = path.resolve('public/dict');
const domainDir = path.resolve('public/domain');
if (!fs.existsSync(domainDir)) fs.mkdirSync(domainDir, { recursive: true });

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

const DOMAIN_DEFS = {
  it: {
    name: 'Công nghệ & CNTT',
    icon: 'Code',
    color: 'cyan',
    patterns: [/(tin học|máy tính|lập trình|viễn thông|cơ sở dữ liệu|mạng máy tính|an ninh mạng|thuật toán|phần mềm|phần cứng|vi xử lý|mã hóa|hệ điều hành)/i]
  },
  business: {
    name: 'Kinh tế & Tài chính',
    icon: 'Briefcase',
    color: 'emerald',
    patterns: [/(kinh tế|thương mại|tài chính|ngân hàng|chứng khoán|kế toán|doanh nghiệp|cổ phiếu|tiền tệ|đầu tư|quản trị|thuế quan|bảo hiểm)/i]
  },
  health: {
    name: 'Y tế & Dược phẩm',
    icon: 'HeartPulse',
    color: 'teal',
    patterns: [/(y học|y tế|dược|giải phẫu|bệnh viện|phẫu thuật|kháng sinh|sinh lý|tim mạch|thần kinh|miễn dịch|chẩn đoán|triệu chứng|nha khoa)/i]
  },
  academic: {
    name: 'Khoa học & Học thuật',
    icon: 'GraduationCap',
    color: 'violet',
    patterns: [/(toán học|vật lý|hóa học|triết học|ngôn ngữ học|luận án|nghiên cứu|thực nghiệm|phương pháp luận|giả thuyết|học thuyết|logic học|thống kê)/i]
  },
  biology: {
    name: 'Sinh học & Nông nghiệp',
    icon: 'Leaf',
    color: 'green',
    patterns: [/(thực vật|động vật|sinh học|nông nghiệp|cây trồng|gia súc|côn trùng|vi sinh|gen|di truyền|sinh thái|nông học)/i]
  },
  law: {
    name: 'Luật pháp & Pháp lý',
    icon: 'Scale',
    color: 'amber',
    patterns: [/(pháp lý|luật|tòa án|tố tụng|hình sự|dân sự|thẩm phán|bản án|công tố|luật sư|vi hiến|tội phạm|pháp quy)/i]
  },
  engineering: {
    name: 'Kỹ thuật & Cơ khí',
    icon: 'Wrench',
    color: 'orange',
    patterns: [/(cơ khí|kỹ thuật|xây dựng|kiến trúc|điện lực|máy móc|kết cấu|luyện kim|thủy lực|chế tạo máy|vật liệu)/i]
  },
  military: {
    name: 'Quân sự & Chính trị',
    icon: 'Shield',
    color: 'red',
    patterns: [/(quân sự|chính trị|ngoại giao|vũ khí|chiến tranh|binh chủng|quân đội|sĩ quan|hiệp ước|bang giao|chính phủ)/i]
  },
  travel: {
    name: 'Du lịch & Hàng không',
    icon: 'Plane',
    color: 'sky',
    patterns: [/(du lịch|hàng không|hàng hải|khách sạn|sân bay|lữ hành|thị thực|hải quan|tàu thủy|chuyến bay|nghỉ dưỡng|thám hiểm)/i]
  },
  arts: {
    name: 'Nghệ thuật & Âm nhạc',
    icon: 'Palette',
    color: 'fuchsia',
    patterns: [/(âm nhạc|hội họa|nghệ thuật|sân khấu|điêu khắc|nhạc cụ|hát|múa|kịch|nhiếp ảnh|kiến trúc nghệ thuật)/i]
  },
  sports: {
    name: 'Thể thao & Giải trí',
    icon: 'Trophy',
    color: 'yellow',
    patterns: [/(thể thao|bóng đá|thể dục|thi đấu|điền kinh|quần vợt|bơi lội|cờ vua|thế vận hội|giải đấu)/i]
  },
  daily: {
    name: 'Đời sống & Khẩu ngữ',
    icon: 'Coffee',
    color: 'rose',
    patterns: [/(thông tục|khẩu ngữ|từ lóng|cảm xúc|tính cách|gia đình|bạn bè|thói quen|giao tiếp|tâm sự|sinh hoạt)/i]
  }
};

const domainLists = {};
Object.keys(DOMAIN_DEFS).forEach(k => { domainLists[k] = []; });
const seen = new Set();

for (const letter of letters) {
  const filePath = path.join(dictDir, `${letter}.json`);
  if (!fs.existsSync(filePath)) continue;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const [key, val] of Object.entries(data)) {
    const word = val.w || key;
    if (word.length < 3 || word.length > 30 || /[^a-zA-Z\s-]/.test(word)) continue;
    if (word.toUpperCase() === word && word.length <= 4) continue;
    if (seen.has(word.toLowerCase())) continue;

    let fullText = '';
    let mainPos = 'noun';
    let mainVn = '';
    let exEn = '';
    let exVi = '';

    if (val.s && Array.isArray(val.s)) {
      for (const section of val.s) {
        if (section.pos && !mainPos) mainPos = section.pos;
        fullText += ' ' + (section.pos || '');

        if (section.meanings && Array.isArray(section.meanings)) {
          for (const m of section.meanings) {
            fullText += ' ' + (m.m || '');
            if (!mainVn && m.m) mainVn = m.m;
            if (m.ex && Array.isArray(m.ex) && m.ex.length > 0) {
              for (const ex of m.ex) {
                fullText += ' ' + (ex.e || '') + ' ' + (ex.v || '');
                if (!exEn && ex.e) {
                  exEn = ex.e;
                  exVi = ex.v || '';
                }
              }
            }
          }
        }
      }
    }

    if (!mainVn || mainVn.length < 2) continue;

    for (const [dKey, def] of Object.entries(DOMAIN_DEFS)) {
      let isMatch = false;
      for (const pat of def.patterns) {
        if (pat.test(fullText)) {
          isMatch = true;
          break;
        }
      }

      if (isMatch) {
        seen.add(word.toLowerCase());

        let cleanVn = mainVn.replace(/^\([a-zA-Z\s,]+\)\s*/, '').trim();
        cleanVn = cleanVn.charAt(0).toUpperCase() + cleanVn.slice(1);

        const card = {
          id: `${dKey}-${domainLists[dKey].length + 1}`,
          word: word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          ipa: val.p || `/${word.toLowerCase()}/`,
          partOfSpeech: mainPos || 'noun',
          vietnamese: cleanVn,
          category: dKey,
          level: word.length > 9 ? 'C1' : word.length > 6 ? 'B2' : 'B1',
          definition: `Thuật ngữ ${def.name}: ${cleanVn}.`,
          example: exEn || `The concept ${word.toLowerCase()} is recognized in ${def.name}.`,
          exampleVi: exVi || `Khái niệm ${cleanVn.toLowerCase()} được sử dụng trong ${def.name.toLowerCase()}.`,
          collocations: [`core ${word.toLowerCase()}`, `${word.toLowerCase()} application`, `study ${word.toLowerCase()}`],
          mnemonic: `Thuật ngữ ${def.name} trích xuất từ 103K từ điển Anh - Việt.`
        };

        domainLists[dKey].push(card);
        break;
      }
    }
  }
}

console.log('=== KẾT QUẢ TRÍCH XUẤT TOÀN BỘ 12 CHUYÊN NGÀNH TỪ 103K TỪ ĐIỂN ===');
for (const [dKey, list] of Object.entries(domainLists)) {
  const targetPath = path.join(domainDir, `${dKey}.json`);
  fs.writeFileSync(targetPath, JSON.stringify(list, null, 2), 'utf-8');
  console.log(`- ${DOMAIN_DEFS[dKey].name} (${dKey}): ${list.length} từ`);
}

// Generate VOCAB_CATEGORIES definition
const categoriesCode = `export const VOCAB_CATEGORIES = [
  { id: 'all', name: 'Tuyển chọn cốt lõi', icon: 'Sparkles', color: 'indigo', badge: '100+ từ' },
  { id: 'dict', name: '📖 Toàn bộ 103K Từ Điển A-Z', icon: 'BookOpen', color: 'emerald', badge: '103.376 Từ' },
  { id: 'it', name: 'Công nghệ & CNTT', icon: 'Code', color: 'cyan', badge: '${domainLists.it.length.toLocaleString()} Từ' },
  { id: 'business', name: 'Kinh tế & Tài chính', icon: 'Briefcase', color: 'emerald', badge: '${domainLists.business.length.toLocaleString()} Từ' },
  { id: 'health', name: 'Y tế & Dược phẩm', icon: 'HeartPulse', color: 'teal', badge: '${domainLists.health.length.toLocaleString()} Từ' },
  { id: 'academic', name: 'Khoa học & Học thuật', icon: 'GraduationCap', color: 'violet', badge: '${domainLists.academic.length.toLocaleString()} Từ' },
  { id: 'biology', name: 'Sinh học & Nông nghiệp', icon: 'Leaf', color: 'green', badge: '${domainLists.biology.length.toLocaleString()} Từ' },
  { id: 'law', name: 'Luật pháp & Pháp lý', icon: 'Scale', color: 'amber', badge: '${domainLists.law.length.toLocaleString()} Từ' },
  { id: 'engineering', name: 'Kỹ thuật & Cơ khí', icon: 'Wrench', color: 'orange', badge: '${domainLists.engineering.length.toLocaleString()} Từ' },
  { id: 'military', name: 'Quân sự & Chính trị', icon: 'Shield', color: 'red', badge: '${domainLists.military.length.toLocaleString()} Từ' },
  { id: 'travel', name: 'Du lịch & Hàng không', icon: 'Plane', color: 'sky', badge: '${domainLists.travel.length.toLocaleString()} Từ' },
  { id: 'arts', name: 'Nghệ thuật & Âm nhạc', icon: 'Palette', color: 'fuchsia', badge: '${domainLists.arts.length.toLocaleString()} Từ' },
  { id: 'sports', name: 'Thể thao & Giải trí', icon: 'Trophy', color: 'yellow', badge: '${domainLists.sports.length.toLocaleString()} Từ' },
  { id: 'daily', name: 'Đời sống & Khẩu ngữ', icon: 'Coffee', color: 'rose', badge: '${domainLists.daily.length.toLocaleString()} Từ' },
];
`;

fs.writeFileSync('scratch/vocab_categories.js', categoriesCode, 'utf-8');
console.log('Done!');
