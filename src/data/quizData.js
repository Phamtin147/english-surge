export const QUIZ_QUESTIONS = [
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
    category: 'grammar',
    tag: 'Ngữ pháp Thì',
    question: 'He _____ as a senior cloud architect for five years before he founded his own startup.',
    options: ['has worked', 'had worked', 'is working', 'works'],
    correctAnswer: 1,
    explanation: 'Hành động làm kiến trúc sư đám mây xảy ra và kết thúc TRƯỚC một hành động khác trong quá khứ (founded startup) -> Dùng Quá khứ hoàn thành (had worked).'
  },
  {
    id: 'q-3',
    type: 'multiple-choice',
    category: 'business',
    tag: 'Kinh doanh & Công sở',
    question: 'Từ nào mang nghĩa "Tận dụng đòn bẩy tối đa các nguồn lực sẵn có"?',
    options: ['Leverage', 'Bottleneck', 'Stakeholder', 'Layover'],
    correctAnswer: 0,
    explanation: 'To leverage = Tận dụng đòn bẩy, khai thác tối đa nguồn lực hay công nghệ để đạt lợi thế.'
  },
  {
    id: 'q-4',
    type: 'multiple-choice',
    category: 'grammar',
    tag: 'Câu điều kiện Loại 2',
    question: 'If I _____ more free time, I would contribute to open-source repositories.',
    options: ['have', 'had', 'have had', 'will have'],
    correctAnswer: 1,
    explanation: 'Mệnh đề chính dùng "would contribute" (Điều kiện loại 2 - trái ngược hiện tại) -> Mệnh đề If dùng Quá khứ đơn: had.'
  },
  {
    id: 'q-5',
    type: 'multiple-choice',
    category: 'daily',
    tag: 'Thành ngữ Giao tiếp',
    question: 'Thành ngữ "Hit the nail on the head" có nghĩa là gì?',
    options: [
      'Gõ búa làm hỏng việc',
      'Nói trúng phóc, chỉ ra đúng bản chất vấn đề',
      'Thức khuya làm việc cật lực',
      'Cảm thấy mệt mỏi trong người'
    ],
    correctAnswer: 1,
    explanation: '"Hit the nail on the head" = Nói chuẩn xác 100%, trúng ngay trọng tâm của vấn đề.'
  },
  {
    id: 'q-6',
    type: 'multiple-choice',
    category: 'grammar',
    tag: 'Lỗi thường gặp',
    question: 'Tìm câu CHÍNH XÁC nhất trong các câu sau:',
    options: [
      'Because the server crashed, so we lost the unsaved changes.',
      'Although the code was complex, but it passed all unit tests.',
      'She suggested that we should optimize the cache layer first.',
      'He gave me many useful advices on my resume.'
    ],
    correctAnswer: 2,
    explanation: 'Câu C đúng cấu trúc: "suggest that + S + (should) + V_inf". Các câu A, B bị lỗi liên từ kép (Because...so, Although...but), câu D sai vì advice là danh từ không đếm được.'
  },
  {
    id: 'q-7',
    type: 'sentence-scramble',
    category: 'it',
    tag: 'Ghép câu ngữ pháp',
    instruction: 'Sắp xếp các từ sau thành câu hoàn chỉnh mang nghĩa: "Kiến trúc đám mây đảm bảo khả năng mở rộng cao."',
    words: ['Cloud', 'architecture', 'ensures', 'high', 'scalability', 'during', 'surges.'],
    correctSentence: 'Cloud architecture ensures high scalability during surges.'
  },
  {
    id: 'q-8',
    type: 'sentence-scramble',
    category: 'grammar',
    tag: 'Ghép câu điều kiện',
    instruction: 'Sắp xếp câu điều kiện loại 3: "Nếu chúng ta đã kiểm tra server, chúng ta đã không mất dữ liệu."',
    words: ['If', 'we', 'had', 'tested', 'the', 'server,', 'we', 'would', 'not', 'have', 'lost', 'data.'],
    correctSentence: 'If we had tested the server, we would not have lost data.'
  }
];
