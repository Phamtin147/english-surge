export const QUIZ_QUESTIONS = [
  // --- IT & TECH ---
  {
    id: 'q-1',
    type: 'multiple-choice',
    category: 'it',
    tag: 'Từ vựng CNTT',
    question: 'Thuật ngữ nào chỉ "khả năng mở rộng của hệ thống mà không làm giảm hiệu năng"?',
    options: ['Scalability', 'Refactoring', 'Deprecation', 'Latency'],
    correctAnswer: 0,
    explanation: 'Scalability (noun) = Khả năng co giãn mở rộng quy mô hệ thống khi lưu lượng tăng cao.'
  },
  {
    id: 'q-2',
    type: 'multiple-choice',
    category: 'it',
    tag: 'Từ vựng CNTT',
    question: 'Khái niệm "Idempotent" trong thiết kế API RESTful có nghĩa là gì?',
    options: [
      'API chạy bất đồng bộ trong nền',
      'Thực hiện gọi API nhiều lần vẫn cho kết quả trạng thái như một lần',
      'API yêu cầu mã hóa đa lớp',
      'Hệ thống tự động khởi động lại khi lỗi'
    ],
    correctAnswer: 1,
    explanation: 'Idempotent (tính bất biến lặp lại) = Dù gửi 1 hay 100 request (ví dụ GET, DELETE), dữ liệu trên server vẫn không bị thay đổi sai lệch.'
  },
  {
    id: 'q-3',
    type: 'multiple-choice',
    category: 'it',
    tag: 'Bảo mật thông tin',
    question: 'Từ nào chỉ "lỗ hổng bảo mật trong hệ thống có thể bị tin tặc khai thác"?',
    options: ['Telemetry', 'Vulnerability', 'Synergy', 'Layover'],
    correctAnswer: 1,
    explanation: 'Vulnerability (noun) = Lỗ hổng bảo mật, điểm yếu có thể bị tấn công.'
  },

  // --- BUSINESS ---
  {
    id: 'q-4',
    type: 'multiple-choice',
    category: 'business',
    tag: 'Kinh doanh & Công sở',
    question: 'Từ nào mang nghĩa "Tận dụng đòn bẩy tối đa các nguồn lực sẵn có"?',
    options: ['Leverage', 'Bottleneck', 'Stakeholder', 'Layover'],
    correctAnswer: 0,
    explanation: 'To leverage = Tận dụng đòn bẩy, khai thác tối đa nguồn lực hay công nghệ để đạt lợi thế.'
  },
  {
    id: 'q-5',
    type: 'multiple-choice',
    category: 'business',
    tag: 'Giao tiếp Công sở',
    question: 'Trong môi trường công sở, khi ai đó nói "I don\'t have the bandwidth for this project", họ có ý gì?',
    options: [
      'Mạng internet của tôi đang bị chậm',
      'Tôi không có đủ quỹ thời gian/sức chứa để nhận thêm việc này',
      'Tôi chưa được cấp quyền truy cập tài liệu',
      'Dự án này vượt quá ngân sách'
    ],
    correctAnswer: 1,
    explanation: 'Bandwidth trong công sở dùng để chỉ "quỹ thời gian / năng lượng sẵn có" để đảm nhận công việc.'
  },
  {
    id: 'q-6',
    type: 'multiple-choice',
    category: 'business',
    tag: 'Đầu tư & Mua bán',
    question: 'Thuật ngữ "Due Diligence" trong kinh doanh có nghĩa là gì?',
    options: [
      'Giao việc khẩn cấp cho nhân viên',
      'Quá trình thẩm định chuyên sâu rủi ro và tài chính trước khi đầu tư',
      'Thanh toán hóa đơn đúng hạn',
      'Lên kế hoạch nghỉ hưu sớm'
    ],
    correctAnswer: 1,
    explanation: 'Due Diligence = Thẩm định chuyên sâu (rà soát pháp lý, tài chính, rủi ro) trước khi ký hợp đồng M&A hoặc đầu tư.'
  },

  // --- ACADEMIC & IELTS ---
  {
    id: 'q-7',
    type: 'multiple-choice',
    category: 'academic',
    tag: 'IELTS Writing Task 2',
    question: 'Từ nào mang nghĩa "hiện diện ở khắp mọi nơi, cực kỳ phổ biến"?',
    options: ['Ubiquitous', 'Sedentary', 'Spontaneous', 'Idempotent'],
    correctAnswer: 0,
    explanation: 'Ubiquitous (adjective) = Có mặt ở khắp mọi nơi (ví dụ: Smartphones are ubiquitous).'
  },
  {
    id: 'q-8',
    type: 'multiple-choice',
    category: 'academic',
    tag: 'Học thuật & Luận điểm',
    question: 'Từ "Exacerbate" đồng nghĩa với từ nào sau đây?',
    options: ['Worsen (làm tồi tệ thêm)', 'Alleviate (làm dịu bớt)', 'Substantiate (chứng minh)', 'Deprecate (khai tử)'],
    correctAnswer: 0,
    explanation: 'Exacerbate = Làm trầm trọng thêm một vấn đề hoặc căn bệnh (đồng nghĩa với worsen/aggravate).'
  },

  // --- GRAMMAR ---
  {
    id: 'q-9',
    type: 'multiple-choice',
    category: 'grammar',
    tag: 'Ngữ pháp Thì',
    question: 'He _____ as a senior cloud architect for five years before he founded his own startup.',
    options: ['has worked', 'had worked', 'is working', 'works'],
    correctAnswer: 1,
    explanation: 'Hành động làm kiến trúc sư đám mây xảy ra và kết thúc TRƯỚC một hành động khác trong quá khứ (founded startup) -> Dùng Quá khứ hoàn thành (had worked).'
  },
  {
    id: 'q-10',
    type: 'multiple-choice',
    category: 'grammar',
    tag: 'Câu điều kiện Loại 2',
    question: 'If I _____ more free time, I would contribute to open-source repositories.',
    options: ['have', 'had', 'have had', 'will have'],
    correctAnswer: 1,
    explanation: 'Mệnh đề chính dùng "would contribute" (Điều kiện loại 2 - trái ngược hiện tại) -> Mệnh đề If dùng Quá khứ đơn: had.'
  },
  {
    id: 'q-11',
    type: 'multiple-choice',
    category: 'grammar',
    tag: 'Câu điều kiện Loại 3',
    question: 'If the team _____ the critical bug earlier, the server would not have crashed during launch.',
    options: ['patched', 'had patched', 'has patched', 'would patch'],
    correctAnswer: 1,
    explanation: 'Điều kiện loại 3 (trái ngược quá khứ): If + S + had V3/ed, S + would have V3/ed.'
  },
  {
    id: 'q-12',
    type: 'multiple-choice',
    category: 'grammar',
    tag: 'Rút gọn mệnh đề quan hệ',
    question: 'The developer _____ the distributed database architecture received the Employee of the Year award.',
    options: ['who design', 'designed', 'designing', 'whom designed'],
    correctAnswer: 2,
    explanation: 'Mệnh đề quan hệ chủ động (who designed...) rút gọn bằng cách lược bỏ đại từ quan hệ và chuyển động từ sang V-ing (designing).'
  },
  {
    id: 'q-13',
    type: 'multiple-choice',
    category: 'grammar',
    tag: 'Lỗi người Việt hay sai',
    question: 'Câu nào sau đây CHÍNH XÁC về mặt ngữ pháp tiếng Anh?',
    options: [
      'Although he was exhausted, but he kept coding.',
      'Although he was exhausted, he kept coding.',
      'Because he was sick, so he did not attend.',
      'Despite he was tired, he finished the report.'
    ],
    correctAnswer: 1,
    explanation: 'Trong tiếng Anh, KHÔNG BAO GIỜ dùng cặp "Although ... but" hoặc "Because ... so". Chỉ dùng một liên từ duy nhất!'
  },

  // --- HEALTH & TRAVEL ---
  {
    id: 'q-14',
    type: 'multiple-choice',
    category: 'health',
    tag: 'Y tế & Sức khỏe',
    question: 'Lối sống "Sedentary lifestyle" là lối sống như thế nào?',
    options: [
      'Lối sống ăn chay trường',
      'Lối sống ít vận động, ngồi nhiều một chỗ',
      'Lối sống thường xuyên đi du lịch dã ngoại',
      'Lối sống thức khuya dậy sớm'
    ],
    correctAnswer: 1,
    explanation: 'Sedentary lifestyle = Lối sống thụ động, ngồi lì một chỗ suốt nhiều giờ mà không tập thể dục.'
  },
  {
    id: 'q-15',
    type: 'multiple-choice',
    category: 'travel',
    tag: 'Du lịch & Khách sạn',
    question: 'Trong khách sạn 5 sao, đồ dùng hoặc dịch vụ có ghi "Complimentary" có nghĩa là gì?',
    options: [
      'Phải trả thêm phụ phí dịch vụ',
      'Được phục vụ miễn phí tặng kèm',
      'Dành riêng cho khách VIP có thẻ vàng',
      'Chỉ phục vụ sau 10 giờ đêm'
    ],
    correctAnswer: 1,
    explanation: 'Complimentary = Miễn phí đính kèm từ khách sạn (ví dụ nước suối, trà, ăn sáng).'
  },

  // --- SENTENCE SCRAMBLE (GHÉP CÂU) ---
  {
    id: 'q-16',
    type: 'scramble',
    category: 'grammar',
    tag: 'Ghép câu: Câu Bị Động',
    words: ['The', 'vulnerability', 'was', 'discovered', 'by', 'the', 'security', 'researcher'],
    correctOrder: ['The', 'vulnerability', 'was', 'discovered', 'by', 'the', 'security', 'researcher'],
    meaning: 'Lỗ hổng bảo mật đã được phát hiện bởi nhà nghiên cứu an ninh mạng.'
  },
  {
    id: 'q-17',
    type: 'scramble',
    category: 'grammar',
    tag: 'Ghép câu: Hiện tại hoàn thành tiếp diễn',
    words: ['She', 'has', 'been', 'studying', 'IELTS', 'for', 'six', 'months'],
    correctOrder: ['She', 'has', 'been', 'studying', 'IELTS', 'for', 'six', 'months'],
    meaning: 'Cô ấy đã và đang liên tục học ôn IELTS suốt sáu tháng qua.'
  },
  {
    id: 'q-18',
    type: 'scramble',
    category: 'it',
    tag: 'Ghép câu: Công nghệ CNTT',
    words: ['Cloud', 'computing', 'enables', 'high', 'scalability', 'for', 'modern', 'applications'],
    correctOrder: ['Cloud', 'computing', 'enables', 'high', 'scalability', 'for', 'modern', 'applications'],
    meaning: 'Điện toán đám mây đem lại khả năng mở rộng quy mô cao cho các ứng dụng hiện đại.'
  },
  {
    id: 'q-19',
    type: 'scramble',
    category: 'business',
    tag: 'Ghép câu: Kinh doanh',
    words: ['We', 'must', 'conduct', 'due', 'diligence', 'before', 'making', 'the', 'investment'],
    correctOrder: ['We', 'must', 'conduct', 'due', 'diligence', 'before', 'making', 'the', 'investment'],
    meaning: 'Chúng ta phải tiến hành thẩm định chuyên sâu trước khi thực hiện khoản đầu tư.'
  }
];
