import fs from 'fs';
import path from 'path';

const dictDir = path.resolve('public/dict');
const domainDir = path.resolve('public/domain');
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Strict Tag Matchers in Vietnamese Dictionary 103K
const TAG_RULES = {
  it: [
    /\(tin học\)/i, /\(máy tính\)/i, /\(lập trình\)/i, /\(viễn thông\)/i, 
    /\(kỹ thuật máy tính\)/i, /\(cơ sở dữ liệu\)/i, /\(mạng máy tính\)/i,
    /thuật toán/i, /phần mềm/i, /phần cứng/i, /bộ nhớ đệm/i, /mã hóa/i,
    /vi xử lý/i, /hệ điều hành/i, /mạng internet/i, /an ninh mạng/i
  ],
  business: [
    /\(kinh tế\)/i, /\(thương nghiệp\)/i, /\(thương mại\)/i, /\(tài chính\)/i, 
    /\(ngân hàng\)/i, /\(chứng khoán\)/i, /\(kế toán\)/i, /\(bảo hiểm\)/i,
    /doanh nghiệp/i, /cổ phiếu/i, /thị trường chứng khoán/i, /thương lượng hợp đồng/i,
    /ngoại tệ/i, /lợi tức/i, /thuế quan/i, /tổng tài sản/i
  ],
  travel: [
    /\(du lịch\)/i, /\(hàng không\)/i, /\(hàng hải\)/i, /\(khách sạn\)/i,
    /sân bay/i, /chuyến bay/i, /phi hành đoàn/i, /lữ hành/i, /hành lý/i,
    /thị thực nhập cảnh/i, /hải quan sân bay/i, /hướng dẫn viên du lịch/i,
    /khu nghỉ dưỡng/i, /nghỉ mát/i, /vé máy bay/i, /quá cảnh/i
  ],
  academic: [
    /\(triết học\)/i, /\(ngôn ngữ học\)/i, /\(toán học\)/i, /\(vật lý\)/i,
    /\(hóa học\)/i, /\(sinh học\)/i, /\(xã hội học\)/i, /\(tâm lý học\)/i,
    /\(logic học\)/i, /\(thống kê\)/i, /\(giáo dục\)/i, /\(luận án\)/i,
    /phương pháp luận/i, /nghiên cứu thực nghiệm/i, /học thuyết khoa học/i
  ],
  health: [
    /\(y học\)/i, /\(y tế\)/i, /\(dược học\)/i, /\(giải phẫu\)/i, 
    /\(sinh lý học\)/i, /\(nha khoa\)/i, /\(mắt\)/i, /\(tim mạch\)/i,
    /\(thần kinh\)/i, /bác sĩ/i, /bệnh viện/i, /điều trị bệnh/i, /thuốc kháng sinh/i,
    /chẩn đoán bệnh/i, /phẫu thuật/i, /hệ miễn dịch/i, /triệu chứng bệnh/i
  ],
  daily: [
    /\(thông tục\)/i, /\(khẩu ngữ\)/i, /\(từ lóng\)/i, /\(tình cảm\)/i,
    /cảm xúc/i, /thói quen/i, /tính cách/i, /quan hệ gia đình/i, /bạn bè/i,
    /giao tiếp đời sống/i, /sinh hoạt thường ngày/i, /tâm sự/i
  ]
};

const domainLists = {
  it: [],
  business: [],
  travel: [],
  daily: [],
  academic: [],
  health: []
};

const domainNames = {
  it: 'Công nghệ & CNTT',
  business: 'Kinh doanh & Công sở',
  travel: 'Du lịch & Khách sạn',
  daily: 'Đời sống & Giao tiếp',
  academic: 'Học thuật & IELTS',
  health: 'Y tế & Sức khỏe'
};

const seenWords = new Set();

for (const letter of letters) {
  const filePath = path.join(dictDir, `${letter}.json`);
  if (!fs.existsSync(filePath)) continue;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const [key, val] of Object.entries(data)) {
    const word = val.w || key;
    if (word.length < 3 || word.length > 30 || /[^a-zA-Z\s-]/.test(word)) continue;
    if (word.toUpperCase() === word && word.length <= 4) continue;
    if (seenWords.has(word.toLowerCase())) continue;

    // Analyze meanings and tags
    let allMeaningsText = '';
    let mainVnMeaning = '';
    let mainPos = 'noun';
    let exampleEn = '';
    let exampleVi = '';

    if (val.s && Array.isArray(val.s)) {
      for (const section of val.s) {
        if (section.pos && !mainPos) mainPos = section.pos;
        allMeaningsText += ' ' + (section.pos || '');

        if (section.meanings && Array.isArray(section.meanings)) {
          for (const m of section.meanings) {
            allMeaningsText += ' ' + (m.m || '');
            if (!mainVnMeaning && m.m) mainVnMeaning = m.m;
            if (m.ex && Array.isArray(m.ex) && m.ex.length > 0) {
              for (const ex of m.ex) {
                allMeaningsText += ' ' + (ex.e || '') + ' ' + (ex.v || '');
                if (!exampleEn && ex.e) {
                  exampleEn = ex.e;
                  exampleVi = ex.v || '';
                }
              }
            }
          }
        }
      }
    }

    if (!mainVnMeaning || mainVnMeaning.length < 2) continue;

    // Check which domain strictly matches
    for (const [dKey, rules] of Object.entries(TAG_RULES)) {
      let isMatch = false;
      for (const rule of rules) {
        if (rule.test(allMeaningsText)) {
          isMatch = true;
          break;
        }
      }

      if (isMatch) {
        seenWords.add(word.toLowerCase());

        let cleanVn = mainVnMeaning.replace(/^\([a-zA-Z\s,]+\)\s*/, '').trim();
        cleanVn = cleanVn.charAt(0).toUpperCase() + cleanVn.slice(1);

        const card = {
          id: `${dKey}-${domainLists[dKey].length + 1}`,
          word: word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          ipa: val.p || `/${word.toLowerCase()}/`,
          partOfSpeech: mainPos || 'noun',
          vietnamese: cleanVn,
          category: dKey,
          level: word.length > 9 ? 'C1' : word.length > 6 ? 'B2' : 'B1',
          definition: `Thuật ngữ ${domainNames[dKey]}: ${cleanVn}.`,
          example: exampleEn || `The expert analyzed the ${word.toLowerCase()} during standard practice.`,
          exampleVi: exampleVi || `Chuyên gia đã phân tích khái niệm ${cleanVn.toLowerCase()} trong thực tế.`,
          collocations: [`core ${word.toLowerCase()}`, `${word.toLowerCase()} system`, `apply ${word.toLowerCase()}`],
          mnemonic: `Thuật ngữ chuyên ngành ${domainNames[dKey]} trong từ điển 103K Anh - Việt.`
        };

        domainLists[dKey].push(card);
        break; // Assigned to the most specific domain
      }
    }
  }
}

console.log('=== KẾT QUẢ PHÂN LOẠI CHẶT CHẼ TOÀN BỘ 103K TỪ ĐIỂN ===');
for (const [dKey, list] of Object.entries(domainLists)) {
  const targetPath = path.join(domainDir, `${dKey}.json`);
  fs.writeFileSync(targetPath, JSON.stringify(list, null, 2), 'utf-8');
  console.log(`- ${domainNames[dKey]} (${dKey}): ${list.length} từ vựng chuẩn ngành!`);
}
