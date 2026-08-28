export const QUIZ_CATEGORIES = [
  { id: 'all', name: 'Đấu Trường Hỗn Hợp', icon: 'Sparkles', color: 'indigo', desc: 'Ngẫu nhiên tất cả chủ đề & ngữ pháp' },
  { id: 'it', name: 'Công nghệ & CNTT', icon: 'Code', color: 'cyan', desc: 'Lập trình, Cloud, Security, AI & DevOps' },
  { id: 'business', name: 'Kinh tế & Doanh nghiệp', icon: 'Briefcase', color: 'emerald', desc: 'Tài chính, M&A, Đàm phán & Quản trị' },
  { id: 'grammar', name: 'Ngữ pháp & Ghép câu', icon: 'GraduationCap', color: 'violet', desc: '12 thì, Điều kiện, Bị động & Sắp xếp từ' },
  { id: 'academic', name: 'Khoa học & IELTS', icon: 'BookOpen', color: 'amber', desc: 'Từ vựng C1/C2, Luận điểm & Viết học thuật' },
  { id: 'health', name: 'Y tế & Sức khỏe', icon: 'HeartPulse', color: 'rose', desc: 'Thuật ngữ y khoa, Thể chất & Đời sống' },
  { id: 'travel', name: 'Du lịch & Giao tiếp', icon: 'Plane', color: 'sky', desc: 'Hàng không, Khách sạn & Giao tiếp đời sống' },
  { id: 'dict', name: 'Kho Từ Điển 103K A-Z', icon: 'Database', color: 'teal', desc: 'Thử thách kho từ vựng khổng lồ không giới hạn' }
];

export const STATIC_QUIZ_QUESTIONS = [
  {
    id: 'q-it-1',
    type: 'multiple-choice',
    category: 'it',
    tag: 'Kiến trúc phần mềm',
    question: 'Thuật ngữ nào chỉ "khả năng mở rộng của hệ thống khi lưu lượng người dùng tăng mà không làm suy giảm hiệu năng"?',
    options: ['Scalability', 'Refactoring', 'Deprecation', 'Latency'],
    correctAnswer: 0,
    explanation: 'Scalability (noun) = Khả năng co giãn mở rộng quy mô hệ thống khi lưu lượng truy cập hoặc dữ liệu tăng vọt.'
  },
  {
    id: 'q-it-2',
    type: 'multiple-choice',
    category: 'it',
    tag: 'Thiết kế RESTful API',
    question: 'Khái niệm "Idempotent" trong thiết kế API RESTful có nghĩa là gì?',
    options: [
      'API chạy bất đồng bộ đa luồng ngầm',
      'Thực hiện gọi API nhiều lần vẫn cho kết quả trạng thái máy chủ như một lần',
      'API yêu cầu mã hóa RSA 4096-bit',
      'Hệ thống tự động khởi động lại khi gặp sự cố'
    ],
    correctAnswer: 1,
    explanation: 'Idempotent (tính bất biến lặp lại) = Dù gửi 1 hay 100 request (ví dụ GET, PUT, DELETE), trạng thái dữ liệu phía máy chủ không bị tác động sai lệch.'
  },
  {
    id: 'q-it-3',
    type: 'multiple-choice',
    category: 'it',
    tag: 'Bảo mật thông tin',
    question: 'Từ nào mang nghĩa "Lỗ hổng bảo mật trong hệ thống có thể bị tin tặc tấn công khai thác"?',
    options: ['Telemetry', 'Vulnerability', 'Synergy', 'Layover'],
    correctAnswer: 1,
    explanation: 'Vulnerability (noun) = Lỗ hổng an ninh mạng, điểm yếu tiềm tàng trong mã nguồn hoặc cấu hình mạng.'
  },
  {
    id: 'q-it-4',
    type: 'multiple-choice',
    category: 'it',
    tag: 'Điện toán đám mây',
    question: 'Thuật ngữ "High Availability" (HA) trong thiết kế hệ thống phân tán đề cập đến điều gì?',
    options: [
      'Hệ thống hoạt động liên tục với thời gian chết (downtime) gần như bằng 0',
      'Khả năng lưu trữ dữ liệu không giới hạn dung lượng',
      'Tốc độ biên dịch mã nguồn nhanh nhất',
      'Giao diện tương thích với mọi kích thước màn hình'
    ],
    correctAnswer: 0,
    explanation: 'High Availability (Tính sẵn sàng cao) = Đảm bảo hệ thống luôn sẵn sàng phục vụ 99.999% thời gian nhờ cơ chế dự phòng failover.'
  },
  {
    id: 'q-it-5',
    type: 'multiple-choice',
    category: 'it',
    tag: 'Quản lý cơ sở dữ liệu',
    question: 'Khái niệm ACID trong cơ sở dữ liệu quan hệ (RDBMS) gồm 4 yếu tố: Atomicity, Consistency, Isolation và _____?',
    options: ['Durability', 'Dependability', 'Diversity', 'Decentralization'],
    correctAnswer: 0,
    explanation: 'ACID = Atomicity (Nguyên tử), Consistency (Nhất quán), Isolation (Cô lập), Durability (Bền vững lưu trữ).'
  },
  {
    id: 'q-it-6',
    type: 'multiple-choice',
    category: 'it',
    tag: 'Lập trình hướng đối tượng',
    question: 'Thuật ngữ "Polymorphism" trong lập trình hướng đối tượng (OOP) có nghĩa tiếng Việt là gì?',
    options: ['Tính kế thừa', 'Tính đa hình', 'Tính đóng gói', 'Tính trừu tượng'],
    correctAnswer: 1,
    explanation: 'Polymorphism = Tính đa hình (cho phép các đối tượng khác nhau thực thi cùng một phương thức theo cách riêng).'
  },
  {
    id: 'q-it-7',
    type: 'multiple-choice',
    category: 'it',
    tag: 'DevOps & CI/CD',
    question: 'Từ "Deploy" trong quy trình phát triển phần mềm mang nghĩa là gì?',
    options: ['Viết tài liệu kỹ thuật', 'Triển khai mã nguồn lên môi trường chạy thực tế', 'Xóa bỏ tính năng cũ', 'Đo đạc dung lượng bộ nhớ'],
    correctAnswer: 1,
    explanation: 'Deploy = Triển khai ứng dụng (đưa mã nguồn đã build lên server Staging hoặc Production).'
  },
  {
    id: 'q-it-8',
    type: 'multiple-choice',
    category: 'it',
    tag: 'AI & Học máy',
    question: 'Hiện tượng mô hình AI đưa ra câu trả lời nghe rất thuyết phục nhưng hoàn toàn bịa đặt gọi là gì?',
    options: ['Hallucination (Ảo giác AI)', 'Overfitting (Quá khớp)', 'Regularization', 'Gradient Descent'],
    correctAnswer: 0,
    explanation: 'Hallucination (Ảo giác AI) = Mô hình ngôn ngữ lớn (LLM) tự tin tạo ra thông tin sai sự thật hoặc không có trong dữ liệu gốc.'
  },

  {
    id: 'q-biz-1',
    type: 'multiple-choice',
    category: 'business',
    tag: 'Kinh doanh & Chiến lược',
    question: 'Động từ "Leverage" trong kinh doanh mang nghĩa phổ biến nhất là gì?',
    options: ['Tận dụng đòn bẩy các nguồn lực để tạo lợi thế tối đa', 'Cắt giảm toàn bộ chi phí nhân sự', 'Đầu tư mạo hiểm không có kế hoạch', 'Hủy bỏ hợp đồng kinh tế'],
    correctAnswer: 0,
    explanation: 'To leverage = Tận dụng tối đa các đòn bẩy (công nghệ, tài chính, mối quan hệ) để sinh ra giá trị cao nhất.'
  },
  {
    id: 'q-biz-2',
    type: 'multiple-choice',
    category: 'business',
    tag: 'Giao tiếp Công sở',
    question: 'Khi đồng nghiệp nói: "I don\'t have the bandwidth for this new initiative", họ muốn diễn đạt điều gì?',
    options: [
      'Đường truyền internet của tôi quá yếu',
      'Tôi đang quá tải và không đủ quỹ thời gian/sức chứa để nhận thêm việc',
      'Dự án này không có đủ ngân sách triển khai',
      'Tôi chưa được cấp quyền truy cập vào hệ thống'
    ],
    correctAnswer: 1,
    explanation: 'Bandwidth (nghĩa lóng văn phòng) = Quỹ năng lượng, thời gian và sự tập trung sẵn có của một cá nhân/đội nhóm.'
  },
  {
    id: 'q-biz-3',
    type: 'multiple-choice',
    category: 'business',
    tag: 'Đầu tư & Mua bán',
    question: 'Thuật ngữ "Due Diligence" (DD) trong thương vụ mua bán sáp nhập (M&A) có nghĩa là gì?',
    options: [
      'Quá trình thẩm định chuyên sâu, điều tra toàn diện về pháp lý và tài chính',
      'Thủ tục thanh toán tiền lương đúng hạn',
      'Ký kết biên bản bàn giao thiết bị',
      'Kế hoạch sa thải nhân sự hàng loạt'
    ],
    correctAnswer: 0,
    explanation: 'Due Diligence = Thẩm định chi tiết tình trạng pháp lý, tài chính, hoạt động của doanh nghiệp mục tiêu trước khi rót vốn.'
  },
  {
    id: 'q-biz-4',
    type: 'multiple-choice',
    category: 'business',
    tag: 'Tài chính doanh nghiệp',
    question: 'Chỉ số ROI (Return on Investment) dùng để đo lường điều gì?',
    options: [
      'Tỷ suất hoàn vốn đầu tư / Hiệu quả sinh lời của đồng vốn',
      'Tổng số lượng nhân viên nghỉ việc trong năm',
      'Thời gian trung bình hoàn thành một sản phẩm',
      'Tỷ lệ nợ xấu ngân hàng'
    ],
    correctAnswer: 0,
    explanation: 'ROI (Return on Investment) = Chỉ số đánh giá tỷ lệ lợi nhuận thu về so với chi phí vốn đã bỏ ra.'
  },
  {
    id: 'q-biz-5',
    type: 'multiple-choice',
    category: 'business',
    tag: 'Thương thuyết & Đàm phán',
    question: 'Cụm từ "Touch base" thường dùng trong email hoặc cuộc họp công việc có nghĩa là gì?',
    options: ['Liên lạc ngắn gọn để cập nhật tình hình', 'Yêu cầu thanh toán hóa đơn ngay', 'Phạt cảnh cáo nhân viên', 'Gặp mặt trực tiếp tại cơ sở chính'],
    correctAnswer: 0,
    explanation: 'Touch base with someone = Kết nối nhanh/trao đổi ngắn để cập nhật tiến độ công việc hoặc tình hình mới nhất.'
  },
  {
    id: 'q-biz-6',
    type: 'multiple-choice',
    category: 'business',
    tag: 'Quản trị chuỗi cung ứng',
    question: 'Thuật ngữ "Bottleneck" trong quy trình sản xuất và vận hành có nghĩa là gì?',
    options: ['Điểm nghẽn gây chậm trễ cả quy trình', 'Bao bì chai lọ thủy tinh', 'Doanh thu tăng đột biến', 'Đổi mới sáng tạo thành công'],
    correctAnswer: 0,
    explanation: 'Bottleneck (Điểm nghẽn cổ chai) = Giai đoạn bị quá tải hoặc chậm nhất kìm hãm toàn bộ tốc độ của cả dây chuyền.'
  },

  {
    id: 'q-acad-1',
    type: 'multiple-choice',
    category: 'academic',
    tag: 'Từ vựng C1/C2',
    question: 'Từ "Ubiquitous" có nghĩa chính xác nhất là gì?',
    options: ['Hiếm khi xuất hiện', 'Phổ biến khắp nơi, đâu đâu cũng thấy', 'Nguy hiểm tiềm ẩn', 'Cổ xưa lỗi thời'],
    correctAnswer: 1,
    explanation: 'Ubiquitous (adj) = Có mặt ở khắp mọi nơi (Ví dụ: AI is becoming ubiquitous in everyday life).'
  },
  {
    id: 'q-acad-2',
    type: 'multiple-choice',
    category: 'academic',
    tag: 'Học thuật & Luận điểm',
    question: 'Từ "Exacerbate" đồng nghĩa với từ nào sau đây?',
    options: ['Worsen (làm trầm trọng thêm)', 'Alleviate (làm xoa dịu)', 'Substantiate (chứng minh)', 'Deprecate (khai tử)'],
    correctAnswer: 0,
    explanation: 'Exacerbate = Làm trầm trọng thêm một vấn đề tiêu cực hoặc căn bệnh (đồng nghĩa: aggravate, worsen).'
  },
  {
    id: 'q-acad-3',
    type: 'multiple-choice',
    category: 'academic',
    tag: 'IELTS Writing Task 2',
    question: 'Từ nào mang nghĩa "Làm giảm nhẹ, xoa dịu mức độ nghiêm trọng của hậu quả"?',
    options: ['Mitigate', 'Escalate', 'Perpetuate', 'Instigate'],
    correctAnswer: 0,
    explanation: 'Mitigate (verb) = Giảm thiểu tác động tiêu cực (Ví dụ: mitigate the effects of climate change).'
  },
  {
    id: 'q-acad-4',
    type: 'multiple-choice',
    category: 'academic',
    tag: 'Tư duy phản biện',
    question: 'Một luận điểm bị xem là "Plausible" nghĩa là gì?',
    options: ['Hợp lý, có vẻ đáng tin cậy', 'Hoàn toàn phi lý', 'Không thể chứng minh', 'Gây tranh cãi dữ dội'],
    correctAnswer: 0,
    explanation: 'Plausible (adj) = Hợp lý, có cơ sở đáng tin cậy và có thể chấp nhận được.'
  },
  {
    id: 'q-acad-5',
    type: 'multiple-choice',
    category: 'academic',
    tag: 'Từ vựng Học thuật nâng cao',
    question: 'Từ "Ephemeral" diễn tả đặc tính gì của một sự vật hiện tượng?',
    options: ['Vĩnh cửu trường tồn', 'Phù du, sớm nở tối tàn, ngắn ngủi', 'Vô cùng nặng nề', 'Phức tạp khó hiểu'],
    correctAnswer: 1,
    explanation: 'Ephemeral (adj) = Phù du, chỉ tồn tại trong một khoảng thời gian rất ngắn.'
  },

  {
    id: 'q-gr-1',
    type: 'multiple-choice',
    category: 'grammar',
    tag: 'Thì Quá khứ hoàn thành',
    question: 'He _____ as a senior cloud architect for five years before he founded his own tech startup.',
    options: ['has worked', 'had worked', 'is working', 'works'],
    correctAnswer: 1,
    explanation: 'Hành động làm việc diễn ra và kết thúc TRƯỚC một hành động khác trong quá khứ (founded) -> Dùng Quá khứ hoàn thành (had worked).'
  },
  {
    id: 'q-gr-2',
    type: 'multiple-choice',
    category: 'grammar',
    tag: 'Câu điều kiện Loại 2',
    question: 'If I _____ more free time, I would contribute to open-source software projects.',
    options: ['have', 'had', 'have had', 'will have'],
    correctAnswer: 1,
    explanation: 'Mệnh đề chính dùng "would contribute" (Điều kiện loại 2 - trái ngược hiện tại) -> Mệnh đề If dùng Quá khứ đơn (had).'
  },
  {
    id: 'q-gr-3',
    type: 'multiple-choice',
    category: 'grammar',
    tag: 'Câu điều kiện Loại 3',
    question: 'If the engineering team _____ the critical vulnerability earlier, the production server would not have crashed.',
    options: ['patched', 'had patched', 'has patched', 'would patch'],
    correctAnswer: 1,
    explanation: 'Điều kiện loại 3 (giả định trái ngược quá khứ): If + S + had V3/ed, S + would have V3/ed.'
  },
  {
    id: 'q-gr-4',
    type: 'multiple-choice',
    category: 'grammar',
    tag: 'Rút gọn Mệnh đề quan hệ',
    question: 'The engineer _____ the distributed database architecture received the Employee of the Year award.',
    options: ['who design', 'designed', 'designing', 'whom designed'],
    correctAnswer: 2,
    explanation: 'Mệnh đề quan hệ chủ động (who designed...) được rút gọn thành V-ing (designing).'
  },
  {
    id: 'q-gr-5',
    type: 'multiple-choice',
    category: 'grammar',
    tag: 'Lỗi người Việt hay gặp',
    question: 'Câu nào sau đây CHÍNH XÁC hoàn toàn về mặt ngữ pháp tiếng Anh chuẩn?',
    options: [
      'Although he was exhausted, but he kept working.',
      'Although he was exhausted, he kept working.',
      'Because he was sick, so he did not attend.',
      'Despite he was tired, he finished the report.'
    ],
    correctAnswer: 1,
    explanation: 'Trong tiếng Anh KHÔNG ĐƯỢC dùng cặp liên từ kép "Although ... but" hoặc "Because ... so". Chỉ dùng một từ nối duy nhất.'
  },
  {
    id: 'q-gr-6',
    type: 'multiple-choice',
    category: 'grammar',
    tag: 'Đảo ngữ (Inversion)',
    question: 'Seldom _____ such an impressive demonstration of machine learning capabilities.',
    options: ['we have seen', 'have we seen', 'we saw', 'did we seen'],
    correctAnswer: 1,
    explanation: 'Khi trạng từ phủ định/bán phủ định đứng đầu câu (Seldom, Rarely, Never), ta phải đảo trợ động từ lên trước chủ ngữ (have we seen).'
  },
  {
    id: 'q-gr-7',
    type: 'multiple-choice',
    category: 'grammar',
    tag: 'Thể Giả định (Subjunctive)',
    question: 'The manager insisted that every team member _____ present at the emergency briefing.',
    options: ['is', 'was', 'be', 'are'],
    correctAnswer: 2,
    explanation: 'Cấu trúc giả định thức sau động từ insist/require/recommend: S + insist that + S + (should) + V-nguyên thể (be).'
  },

  {
    id: 'q-hl-1',
    type: 'multiple-choice',
    category: 'health',
    tag: 'Sức khỏe & Lối sống',
    question: 'Khái niệm "Sedentary lifestyle" dùng để chỉ lối sống như thế nào?',
    options: ['Lối sống ăn kiêng nghiêm ngặt', 'Lối sống ít vận động, ngồi nhiều một chỗ', 'Lối sống thường xuyên đi bộ ngoài trời', 'Lối sống thức khuya dậy sớm'],
    correctAnswer: 1,
    explanation: 'Sedentary lifestyle = Lối sống thụ động ít vận động thể chất, dành nhiều giờ ngồi trước màn hình.'
  },
  {
    id: 'q-hl-2',
    type: 'multiple-choice',
    category: 'health',
    tag: 'Dược lý & Điều trị',
    question: 'Thuật ngữ "Placebo Effect" (Hiệu ứng giả dược) nghĩa là gì?',
    options: [
      'Bệnh nhân có chuyển biến tích cực nhờ niềm tin tâm lý dù dùng thuốc vô hại không có dược tính',
      'Tác dụng phụ nguy hiểm của thuốc kháng sinh',
      'Hiện tượng cơ thể kháng lại vắc-xin',
      'Tình trạng dị ứng thực phẩm nặng'
    ],
    correctAnswer: 0,
    explanation: 'Placebo Effect (Hiệu ứng giả dược) = Hiện tượng người bệnh hồi phục hoặc cảm thấy đỡ đau nhờ yếu tố tâm lý khi tin rằng mình đang được uống thuốc thật.'
  },
  {
    id: 'q-hl-3',
    type: 'multiple-choice',
    category: 'health',
    tag: 'Miễn dịch học',
    question: 'Kháng thể được sinh ra để bảo vệ cơ thể chống lại tác nhân gây bệnh gọi là gì trong tiếng Anh?',
    options: ['Antibody', 'Pathogen', 'Parasite', 'Prescription'],
    correctAnswer: 0,
    explanation: 'Antibody = Kháng thể do hệ miễn dịch tạo ra để nhận diện và trung hòa vi khuẩn, virus (Pathogen).'
  },

  {
    id: 'q-tr-1',
    type: 'multiple-choice',
    category: 'travel',
    tag: 'Khách sạn & Dịch vụ',
    question: 'Trong khách sạn và nhà hàng cao cấp, dịch vụ hoặc đồ dùng có ghi "Complimentary" có nghĩa là gì?',
    options: ['Phải chịu thêm phụ phí cao', 'Được phục vụ miễn phí tặng kèm', 'Chỉ dành cho khách có thẻ VIP', 'Chỉ cung cấp sau 22h'],
    correctAnswer: 1,
    explanation: 'Complimentary = Miễn phí đính kèm (Ví dụ: complimentary breakfast, complimentary mineral water).'
  },
  {
    id: 'q-tr-2',
    type: 'multiple-choice',
    category: 'travel',
    tag: 'Hàng không & Sân bay',
    question: 'Thuật ngữ "Layover" trong chuyến bay quốc tế có nghĩa là gì?',
    options: ['Thời gian quá cảnh / chờ nối chuyến bay', 'Mất hành lý thất lạc', 'Hủy vé máy bay do thời tiết', 'Nâng hạng ghế miễn phí'],
    correctAnswer: 0,
    explanation: 'Layover = Điểm dừng quá cảnh giữa hai chặng bay (transit/layover).'
  },

  {
    id: 'q-sc-1',
    type: 'sentence-scramble',
    category: 'grammar',
    tag: 'Ghép câu: Bị động HTHT',
    instruction: 'Sắp xếp các khối từ để tạo câu hoàn chỉnh diễn đạt: "Lỗ hổng bảo mật đã được phát hiện bởi chuyên gia an ninh mạng."',
    words: ['The', 'vulnerability', 'has', 'been', 'detected', 'by', 'the', 'security', 'expert'],
    correctSentence: 'The vulnerability has been detected by the security expert',
    explanation: 'Cấu trúc Bị động Hiện tại hoàn thành: S + has/have + been + V3/ed + by O.'
  },
  {
    id: 'q-sc-2',
    type: 'sentence-scramble',
    category: 'grammar',
    tag: 'Ghép câu: Câu điều kiện loại 3',
    instruction: 'Sắp xếp câu diễn đạt: "Nếu chúng ta nâng cấp máy chủ sớm hơn, vụ sập mạng đã không xảy ra."',
    words: ['If', 'we', 'had', 'upgraded', 'the', 'server', 'the', 'outage', 'would', 'not', 'have', 'happened'],
    correctSentence: 'If we had upgraded the server the outage would not have happened',
    explanation: 'Cấu trúc Điều kiện loại 3: If + S + had V3/ed, S + would not have V3/ed.'
  },
  {
    id: 'q-sc-3',
    type: 'sentence-scramble',
    category: 'it',
    tag: 'Ghép câu: Công nghệ',
    instruction: 'Sắp xếp câu: "Microservices architecture improves deployment scalability and resilience."',
    words: ['Microservices', 'architecture', 'improves', 'deployment', 'scalability', 'and', 'resilience'],
    correctSentence: 'Microservices architecture improves deployment scalability and resilience',
    explanation: 'Chủ ngữ: Microservices architecture, Động từ: improves, Tân ngữ: deployment scalability and resilience.'
  },
  {
    id: 'q-sc-4',
    type: 'sentence-scramble',
    category: 'business',
    tag: 'Ghép câu: Kinh doanh',
    instruction: 'Sắp xếp câu diễn đạt: "Chúng ta cần tiến hành thẩm định chuyên sâu trước khi ký hợp đồng."',
    words: ['We', 'must', 'conduct', 'due', 'diligence', 'before', 'signing', 'the', 'contract'],
    correctSentence: 'We must conduct due diligence before signing the contract',
    explanation: 'Collocation: Conduct due diligence (Thực hiện thẩm định chuyên sâu).'
  },
  {
    id: 'q-sc-5',
    type: 'sentence-scramble',
    category: 'academic',
    tag: 'Ghép câu: Học thuật',
    instruction: 'Sắp xếp câu: "Technological advancements have significantly transformed modern communication paradigms."',
    words: ['Technological', 'advancements', 'have', 'significantly', 'transformed', 'modern', 'communication', 'paradigms'],
    correctSentence: 'Technological advancements have significantly transformed modern communication paradigms',
    explanation: 'Cấu trúc thì Hiện tại hoàn thành với trạng từ đứng giữa trợ động từ và V3: have significantly transformed.'
  }
];

export function shuffleArray(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function generateQuizQuestionsFromVocab(vocabList, count = 20, domainTag = 'Từ vựng') {
  if (!vocabList || vocabList.length < 4) return [];

  const questions = [];
  const sampleWords = shuffleArray(vocabList);
  const total = Math.min(count, sampleWords.length);

  for (let i = 0; i < total; i++) {
    const target = sampleWords[i];
    const wordName = target.word || target.w || '';
    const meaning = target.vietnamese || target.meaning || (target.definition ? target.definition.replace(/^[^:]+:\s*/, '') : '');
    
    if (!wordName || !meaning || meaning.length < 3) continue;

    const isSentenceFill = target.example && target.example.toLowerCase().includes(wordName.toLowerCase()) && Math.random() > 0.45;

    const distractors = [];
    const pool = shuffleArray(vocabList.filter(item => (item.word || item.w) !== wordName));
    
    for (const dist of pool) {
      const distMeaning = dist.vietnamese || dist.meaning || (dist.definition ? dist.definition.replace(/^[^:]+:\s*/, '') : '');
      const distWord = dist.word || dist.w;
      if (isSentenceFill) {
        if (distWord && distWord !== wordName && !distractors.includes(distWord)) {
          distractors.push(distWord);
        }
      } else {
        if (distMeaning && distMeaning !== meaning && !distractors.includes(distMeaning)) {
          distractors.push(distMeaning);
        }
      }
      if (distractors.length >= 3) break;
    }

    if (distractors.length < 3) continue;

    if (isSentenceFill) {
      const regex = new RegExp(`\\b${wordName}\\b`, 'gi');
      const blankSentence = target.example.replace(regex, '_____');

      const options = shuffleArray([wordName, ...distractors]);
      const correctAnswer = options.indexOf(wordName);

      questions.push({
        id: `dyn-fill-${target.id || i}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type: 'multiple-choice',
        category: target.category || 'all',
        tag: `${domainTag} • Điền câu`,
        question: `Chọn từ thích hợp nhất để hoàn thành câu sau:\n"${blankSentence}"`,
        options: options,
        correctAnswer: correctAnswer,
        explanation: `Từ chính xác là "${wordName}" (${target.ipa || ''}): ${meaning}. Dịch câu: ${target.exampleVi || target.example}`
      });
    } else {
      const options = shuffleArray([meaning, ...distractors]);
      const correctAnswer = options.indexOf(meaning);

      questions.push({
        id: `dyn-def-${target.id || i}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type: 'multiple-choice',
        category: target.category || 'all',
        tag: `${domainTag} • ${target.level || 'B1-C1'}`,
        question: `Nghĩa tiếng Việt chính xác nhất của từ "${wordName}" ${target.ipa ? `(${target.ipa})` : ''} là gì?`,
        options: options,
        correctAnswer: correctAnswer,
        explanation: `"${wordName}" = ${meaning}. ${target.example ? `Ví dụ: "${target.example}"` : ''}`
      });
    }
  }

  return questions;
}

export const QUIZ_QUESTIONS = STATIC_QUIZ_QUESTIONS;
