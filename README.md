# English Surge ⚡

Ứng dụng ôn tập **Từ vựng & Ngữ pháp Tiếng Anh** phân theo từng chuyên ngành/lĩnh vực, tích hợp các animation phong cách **React Bits** và cấu hình tối ưu deploy lên **Surge.sh**.

---

## 🚀 Tính Năng Chính

- 🃏 **Từ vựng theo Chuyên ngành**: CNTT (IT), Kinh doanh (Business), Du lịch (Travel), Giao tiếp (Daily Life), Học thuật (IELTS), Y tế (Health).
- ⏱️ **Ngữ pháp Trực quan**: 12 Thì, Câu điều kiện (If), Bị động, Rút gọn mệnh đề, và Bẫy ngữ pháp người Việt hay mắc phải.
- 🎯 **Đấu Trường Quiz**: Trắc nghiệm phản xạ, giải thích chi tiết đáp án và trò chơi ghép câu (Sentence Scramble).
- 🌟 **React Bits Animations**: Aurora Background, Spotlight Cards, Decrypted Text, True Focus, Shiny Text, Star Border.
- 🔊 **Phát âm Native**: Tích hợp Web Speech API đọc chuẩn ngữ điệu.
- 📊 **Hệ thống Gamification**: Tích điểm XP, đếm chuỗi Streak hằng ngày và thăng hạng danh hiệu.
- 🔖 **Sổ Tay Lưu Trữ**: Bookmark từ vựng & ngữ pháp ôn tập mọi lúc.

---

## 🛠️ Hướng Dẫn Sử Dụng

### 1. Chạy môi trường phát triển (Dev)
```bash
npm install
npm run dev
```
Truy cập: `http://localhost:5173/`

### 2. Build ứng dụng
```bash
npm run build
```

### 3. Deploy lên Surge.sh
```bash
npm run deploy:surge
# hoặc:
npx surge dist my-english-surge.surge.sh
```
*(Dự án đã tự động cấu hình file `200.html` trong `dist` để đảm bảo routing trên Surge hoạt động mượt mà không gặp lỗi 404).*
