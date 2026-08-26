import fs from 'fs';
import path from 'path';

const dictDir = path.resolve('public/dict');
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

const stats = {
  totalWords: 0,
  byPos: { noun: 0, verb: 0, adjective: 0, adverb: 0, other: 0 },
  byBroadDomain: {
    'Công nghệ & Tin học': 0,
    'Kinh tế, Tài chính & Thương mại': 0,
    'Y tế, Dược phẩm & Giải phẫu': 0,
    'Khoa học, Học thuật, Toán, Lý, Hóa': 0,
    'Du lịch, Hàng không & Hàng hải': 0,
    'Luật pháp & Pháp lý': 0,
    'Nông nghiệp, Động thực vật & Sinh học': 0,
    'Kỹ thuật, Cơ khí & Xây dựng': 0,
    'Nghệ thuật, Âm nhạc & Hội họa': 0,
    'Quân sự, Chính trị & Ngoại giao': 0,
    'Thể thao & Giải trí': 0,
    'Từ vựng Đời sống, Cảm xúc & Thông tục': 0,
    'Từ vựng Phổ thông (General Vocabulary - Miêu tả, Hành động, Giao tiếp chung, Văn học)': 0
  }
};

for (const letter of letters) {
  const filePath = path.join(dictDir, `${letter}.json`);
  if (!fs.existsSync(filePath)) continue;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const [key, val] of Object.entries(data)) {
    stats.totalWords++;
    const fullText = JSON.stringify(val).toLowerCase();

    // Check POS
    let pos = 'other';
    if (val.s && val.s[0] && val.s[0].pos) {
      pos = val.s[0].pos.toLowerCase();
    }
    if (pos.includes('noun') || pos.includes('danh')) stats.byPos.noun++;
    else if (pos.includes('verb') || pos.includes('động')) stats.byPos.verb++;
    else if (pos.includes('adj') || pos.includes('tính')) stats.byPos.adjective++;
    else if (pos.includes('adv') || pos.includes('phó') || pos.includes('trạng')) stats.byPos.adverb++;
    else stats.byPos.other++;

    // Classify
    if (/(tin học|máy tính|lập trình|viễn thông|cơ sở dữ liệu)/i.test(fullText)) {
      stats.byBroadDomain['Công nghệ & Tin học']++;
    } else if (/(kinh tế|thương mại|tài chính|ngân hàng|chứng khoán|kế toán)/i.test(fullText)) {
      stats.byBroadDomain['Kinh tế, Tài chính & Thương mại']++;
    } else if (/(y học|y tế|dược|giải phẫu|bệnh viện|phẫu thuật|kháng sinh)/i.test(fullText)) {
      stats.byBroadDomain['Y tế, Dược phẩm & Giải phẫu']++;
    } else if (/(toán học|vật lý|hóa học|triết học|ngôn ngữ học|thiên văn|địa chất)/i.test(fullText)) {
      stats.byBroadDomain['Khoa học, Học thuật, Toán, Lý, Hóa']++;
    } else if (/(du lịch|hàng không|hàng hải|khách sạn|sân bay|lữ hành)/i.test(fullText)) {
      stats.byBroadDomain['Du lịch, Hàng không & Hàng hải']++;
    } else if (/(pháp lý|luật|tòa án|tố tụng|hình sự|dân sự)/i.test(fullText)) {
      stats.byBroadDomain['Luật pháp & Pháp lý']++;
    } else if (/(thực vật|động vật|sinh học|nông nghiệp|cây trồng|gia súc)/i.test(fullText)) {
      stats.byBroadDomain['Nông nghiệp, Động thực vật & Sinh học']++;
    } else if (/(cơ khí|kỹ thuật|xây dựng|kiến trúc|điện lực|máy móc)/i.test(fullText)) {
      stats.byBroadDomain['Kỹ thuật, Cơ khí & Xây dựng']++;
    } else if (/(âm nhạc|hội họa|nghệ thuật|sân khấu|điêu khắc)/i.test(fullText)) {
      stats.byBroadDomain['Nghệ thuật, Âm nhạc & Hội họa']++;
    } else if (/(quân sự|chính trị|ngoại giao|vũ khí|chiến tranh)/i.test(fullText)) {
      stats.byBroadDomain['Quân sự, Chính trị & Ngoại giao']++;
    } else if (/(thể thao|bóng đá|thể dục|thi đấu|điền kinh)/i.test(fullText)) {
      stats.byBroadDomain['Thể thao & Giải trí']++;
    } else if (/(thông tục|khẩu ngữ|từ lóng|cảm xúc|tính cách|gia đình|bạn bè)/i.test(fullText)) {
      stats.byBroadDomain['Từ vựng Đời sống, Cảm xúc & Thông tục']++;
    } else {
      stats.byBroadDomain['Từ vựng Phổ thông (General Vocabulary - Miêu tả, Hành động, Giao tiếp chung, Văn học)']++;
    }
  }
}

console.log(JSON.stringify(stats, null, 2));
