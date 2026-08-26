export const GRAMMAR_CATEGORIES = [
  { id: 'all', name: 'Tất cả chuyên đề', icon: 'BookOpen', color: 'indigo' },
  { id: 'tenses', name: '12 Thì Tiếng Anh', icon: 'Clock', color: 'cyan', badge: 'Cốt lõi' },
  { id: 'conditionals', name: 'Câu Điều Kiện (If)', icon: 'GitFork', color: 'emerald', badge: 'Logic' },
  { id: 'passive', name: 'Câu Bị Động (Passive)', icon: 'RefreshCw', color: 'amber', badge: 'Học thuật' },
  { id: 'relative', name: 'Mệnh Đề Quan Hệ', icon: 'Link2', color: 'violet', badge: 'Ghép câu' },
  { id: 'modals', name: 'Động Từ Khiếm Khuyết', icon: 'ShieldAlert', color: 'rose', badge: 'Sắc thái' },
  { id: 'mistakes', name: 'Lỗi Hay Gặp (VN vs EN)', icon: 'AlertTriangle', color: 'red', badge: 'Cực quan trọng' },
];

export const GRAMMAR_LESSONS = [
  // --- 12 THÌ TIẾNG ANH ---
  {
    id: 'tense-1',
    category: 'tenses',
    title: 'Present Perfect vs Past Simple',
    vietnameseTitle: 'Hiện Tại Hoàn Thành vs Quá Khứ Đơn',
    level: 'B1',
    summary: 'Phân biệt hành động có thời gian xác định kết thúc trong quá khứ vs hành động liên quan hoặc kéo dài tới hiện tại.',
    formula: {
      positive: 'S + have/has + V3/ed (HTHT)  vs  S + V2/ed (QKĐ)',
      negative: 'S + haven\'t/hasn\'t + V3/ed  vs  S + didn\'t + V_inf',
      question: 'Have/Has + S + V3/ed?  vs  Did + S + V_inf?'
    },
    signals: ['just, already, yet, since, for, ever, never, so far (HTHT)', 'yesterday, ago, last week, in 2020 (QKĐ)'],
    timeline: {
      type: 'comparison',
      pastText: 'Xảy ra và CHẤM DỨT hoàn toàn tại thời điểm xác định trong quá khứ (QKĐ)',
      presentText: 'Bắt đầu từ quá khứ KÉO DÀI tới nay hoặc KẾT QUẢ quan trọng ở hiện tại (HTHT)'
    },
    usages: [
      {
        rule: 'Trải nghiệm cuộc đời (không nêu rõ ngày giờ cụ thể)',
        example: 'I have visited Japan three times.',
        exampleVi: 'Tôi đã từng đến Nhật 3 lần (trong cả cuộc đời tính đến nay).'
      },
      {
        rule: 'Thời điểm cụ thể đã qua',
        example: 'I visited Japan in 2022.',
        exampleVi: 'Tôi đã đến Nhật vào năm 2022 (năm 2022 đã kết thúc).'
      },
      {
        rule: 'Hành động vừa mới xảy ra để lại hệ quả',
        example: 'I have lost my key! (Now I cannot open the door).',
        exampleVi: 'Tôi đã làm mất chìa khóa rồi! (Bây giờ không vào nhà được).'
      }
    ],
    commonMistakes: [
      {
        wrong: 'I have seen him yesterday. ❌',
        right: 'I saw him yesterday. ✅',
        reason: 'Có trạng từ thời gian quá khứ cụ thể "yesterday" thì BẮT BUỘC dùng Quá khứ đơn, không dùng HTHT.'
      },
      {
        wrong: 'I live here since 2019. ❌',
        right: 'I have lived here since 2019. ✅',
        reason: 'Hành động có "since + mốc thời gian" kéo dài đến nay phải dùng Hiện tại hoàn thành.'
      }
    ],
    miniQuiz: {
      question: 'Chọn câu đúng: "She _____ for this tech company since March."',
      options: ['worked', 'has worked', 'is working', 'was worked'],
      answerIndex: 1,
      explanation: 'Dấu hiệu "since March" (từ tháng Ba tới nay) yêu cầu thì Hiện tại hoàn thành: has worked.'
    }
  },

  {
    id: 'tense-2',
    category: 'tenses',
    title: 'Past Continuous vs Past Simple',
    vietnameseTitle: 'Quá Khứ Tiếp Diễn & Hành Động Xen Vào',
    level: 'B1',
    summary: 'Diễn tả một hành động đang diễn ra trong quá khứ thì một hành động khác bất chợt xen vào (When / While).',
    formula: {
      positive: 'S + was/were + V-ing (Đang diễn ra) + WHEN + S + V2/ed (Xen vào)',
      negative: 'S + wasn\'t/weren\'t + V-ing',
      question: 'Was/Were + S + V-ing?'
    },
    signals: ['while, when, as, at 8 PM yesterday, at this time last year'],
    timeline: {
      type: 'interruption',
      pastText: 'Hành động dài đang chạy [== was/were V-ing ==] thì hành động ngắn cắt ngang [⚡ V2/ed]'
    },
    usages: [
      {
        rule: 'Hành động đang diễn ra thì hành động khác xen vào',
        example: 'While I was coding, the power went out.',
        exampleVi: 'Trong lúc tôi đang viết code thì bị mất điện.'
      },
      {
        rule: 'Hai hành động diễn ra song song cùng lúc trong quá khứ',
        example: 'While Sarah was reading, David was cooking dinner.',
        exampleVi: 'Trong khi Sarah đang đọc sách thì David đang nấu bữa tối.'
      }
    ],
    commonMistakes: [
      {
        wrong: 'When I drove, my phone rang. ❌',
        right: 'When/While I was driving, my phone rang. ✅',
        reason: 'Việc lái xe đang diễn ra liên tục (was driving), chuông điện thoại reo là hành động ngắn xen vào (rang).'
      }
    ],
    miniQuiz: {
      question: 'Điền từ: "I _____ TV when the earthquake happened."',
      options: ['watched', 'was watching', 'have watched', 'had watched'],
      answerIndex: 1,
      explanation: 'Hành động đang diễn ra trong quá khứ tại thời điểm động đất xảy ra dùng Quá khứ tiếp diễn (was watching).'
    }
  },

  // --- CÂU ĐIỀU KIỆN (IF) ---
  {
    id: 'cond-1',
    category: 'conditionals',
    title: 'Conditionals Type 1, 2, 3 & Mixed',
    vietnameseTitle: 'Bản Đồ Câu Điều Kiện Loại 1, 2, 3 & Hỗn Hợp',
    level: 'B2',
    summary: 'Quy tắc chia thì chuẩn xác theo độ thật của giả định: Có thể xảy ra ở tương lai (Loại 1), Trái thực tế hiện tại (Loại 2), Trái thực tế quá khứ (Loại 3).',
    formula: {
      type1: 'If + S + V(hiện tại đơn), S + will / can + V_inf',
      type2: 'If + S + V2/ed (were), S + would / could + V_inf',
      type3: 'If + S + had + V3/ed, S + would have + V3/ed',
      mixed: 'If + S + had + V3/ed (quá khứ), S + would + V_inf (hiện tại)'
    },
    signals: ['If, Unless (= If not), Provided that, As long as, In case'],
    usages: [
      {
        rule: 'Loại 1: Giả định thực tế có thể xảy ra ở hiện tại/tương lai',
        example: 'If you optimize the database queries, the response time will drop.',
        exampleVi: 'Nếu bạn tối ưu hóa câu truy vấn cơ sở dữ liệu, thời gian phản hồi sẽ giảm xuống.'
      },
      {
        rule: 'Loại 2: Giả định trái ngược với hiện tại (dùng were cho mọi ngôi)',
        example: 'If I were the CEO, I would invest heavily in AI tools.',
        exampleVi: 'Nếu tôi là CEO (thực tế tôi không phải), tôi sẽ đầu tư mạnh vào các công cụ AI.'
      },
      {
        rule: 'Loại 3: Tiếc nuối về một việc không xảy ra trong quá khứ',
        example: 'If we had tested the backup server, we wouldn\'t have lost data.',
        exampleVi: 'Nếu lúc đó chúng ta đã kiểm tra server dự phòng, chúng ta đã không bị mất dữ liệu.'
      },
      {
        rule: 'Loại Hỗn Hợp: Điều kiện trong quá khứ dẫn tới kết quả ở hiện tại',
        example: 'If I had learned English earlier, I would have a high-paying job now.',
        exampleVi: 'Nếu ngày xưa tôi học tiếng Anh sớm hơn, bây giờ tôi đã có một công việc lương cao.'
      }
    ],
    commonMistakes: [
      {
        wrong: 'If I will have time, I will call you. ❌',
        right: 'If I have time, I will call you. ✅',
        reason: 'Trong mệnh đề If loại 1, TUYỆT ĐỐI KHÔNG dùng "will", chỉ dùng Hiện tại đơn.'
      },
      {
        wrong: 'Unless you don\'t study, you will fail. ❌',
        right: 'Unless you study, you will fail. ✅ (hoặc: If you don\'t study...)',
        reason: 'Unless đã mang nghĩa phủ định (= If not), không lồng thêm trợ từ phủ định "don\'t".'
      }
    ],
    miniQuiz: {
      question: 'Chọn phương án đúng: "If she had left earlier, she _____ the flight."',
      options: ['won\'t miss', 'wouldn\'t miss', 'wouldn\'t have missed', 'hadn\'t missed'],
      answerIndex: 2,
      explanation: 'Mệnh đề If ở Quá khứ hoàn thành (had left) -> Điều kiện loại 3: Mệnh đề chính là would have + V3 (wouldn\'t have missed).'
    }
  },

  // --- CÂU BỊ ĐỘNG ---
  {
    id: 'passive-1',
    category: 'passive',
    title: 'Passive Voice & Causative Forms',
    vietnameseTitle: 'Câu Bị Động & Thể Sai Khiến (Have/Get something done)',
    level: 'B1',
    summary: 'Chuyển trọng tâm từ người thực hiện hành động sang đối tượng chịu tác động; cấu trúc nhờ ai làm việc gì.',
    formula: {
      basic: 'S + Be (chia theo thì) + V3/ed (+ by Agent)',
      modal: 'S + Modal Verb + be + V3/ed',
      causative1: 'Have + someone + V_inf  /  Get + someone + TO V_inf (Nhờ ai làm gì)',
      causative2: 'Have / Get + something + V3/ed (Thuê/nhờ đồ vật được xử lý bởi ai đó)'
    },
    signals: ['by, passive reporting (It is said that...), causative (have/get done)'],
    usages: [
      {
        rule: 'Khi người thực hiện không quan trọng hoặc chưa rõ',
        example: 'The security patch was deployed at midnight.',
        exampleVi: 'Bản vá bảo mật đã được triển khai lúc nửa đêm.'
      },
      {
        rule: 'Thể sai khiến bị động (Causative Passive - cực hay gặp trong công sở/đời sống)',
        example: 'I had my laptop repaired yesterday.',
        exampleVi: 'Hôm qua tôi đã đem máy tính đi thợ sửa (không phải tự tay mình sửa).'
      }
    ],
    commonMistakes: [
      {
        wrong: 'The house was built since 1990. ❌',
        right: 'The house was built IN 1990. ✅ / The house has been built for 10 years. ✅',
        reason: 'Was built là quá khứ đơn, phải đi với mốc thời gian "in 1990", không dùng "since" với quá khứ đơn.'
      }
    ],
    miniQuiz: {
      question: 'Điền vào chỗ trống: "She had her car _____ by a certified mechanic."',
      options: ['inspect', 'inspects', 'inspected', 'to inspect'],
      answerIndex: 2,
      explanation: 'Cấu trúc Causative: Have + something + V3/ed -> had her car inspected.'
    }
  },

  // --- MỆNH ĐỀ QUAN HỆ & RÚT GỌN ---
  {
    id: 'rel-1',
    category: 'relative',
    title: 'Relative Clauses & Participle Reductions',
    vietnameseTitle: 'Mệnh Đề Quan Hệ & Kỹ Thuật Rút Gọn (V-ing / V3)',
    level: 'B2',
    summary: 'Cách dùng Who, Whom, Which, That, Whose, Where và kỹ thuật rút gọn câu văn giúp bài viết học thuật/IELTS trở nên tự nhiên, gãy gọn.',
    formula: {
      whoWhich: 'N(người) + WHO + V  |  N(vật) + WHICH + V',
      whose: 'N(người/vật) + WHOSE + Noun (sở hữu)',
      reductionActive: 'Rút gọn chủ động: Bỏ đại từ + To be -> V-ing',
      reductionPassive: 'Rút gọn bị động: Bỏ đại từ + To be -> V3/ed'
    },
    signals: ['who, whom, which, that, whose, where, when, why'],
    usages: [
      {
        rule: 'Rút gọn Mệnh đề chủ động -> Dùng V-ing',
        example: 'The engineer who designs the chip -> The engineer designing the chip.',
        exampleVi: 'Kỹ sư người thiết kế con chip -> Kỹ sư thiết kế con chip.'
      },
      {
        rule: 'Rút gọn Mệnh đề bị động -> Dùng V3/ed',
        example: 'The documents which were leaked online -> The documents leaked online.',
        exampleVi: 'Các tài liệu bị rò rỉ trên mạng.'
      }
    ],
    commonMistakes: [
      {
        wrong: 'The girl who I met her yesterday is nice. ❌',
        right: 'The girl whom / who I met yesterday is nice. ✅',
        reason: 'Đại từ quan hệ đã thay thế cho "her", không được để lặp lại tân ngữ thừa.'
      }
    ],
    miniQuiz: {
      question: 'Rút gọn câu: "The software which was developed by our team won the award."',
      options: [
        'The software developing by our team won the award.',
        'The software developed by our team won the award.',
        'The software was developed won the award.',
        'The software to develop won the award.'
      ],
      answerIndex: 1,
      explanation: 'Mệnh đề bị động "which was developed" rút gọn thành phân từ quá khứ: "developed".'
    }
  },

  // --- LỖI HAY GẶP CỦA NGƯỜI VIỆT ---
  {
    id: 'mis-1',
    category: 'mistakes',
    title: 'Top Vietnamese ESL Common Mistakes',
    vietnameseTitle: 'Những Lỗi Ngữ Pháp Người Việt Cực Kỳ Hay Mắc Phải',
    level: 'A2-B2',
    summary: 'Tổng hợp các lỗi tư duy dịch Word-by-Word từ tiếng Việt sang tiếng Anh khiến câu bị sai ngữ pháp hoặc gượng gạo.',
    formula: {
      tip1: 'Không dịch "Although... But..." hay "Because... So..." trong cùng một câu',
      tip2: 'Phân biệt "Advise" (động từ) vs "Advice" (danh từ không đếm được)',
      tip3: 'Sau "Suggest / Recommend" dùng V-ing hoặc (that) + S + (should) + V_inf'
    },
    signals: ['Although, Because, Advice, Information, Suggest, Explain to someone'],
    usages: [
      {
        rule: '1. Không bao giờ dùng cặp liên từ kép (Although... But / Because... So)',
        example: 'Although it was raining, we went hiking. (KHÔNG ĐƯỢC thêm "but")',
        exampleVi: 'Mặc dù trời mưa, chúng tôi vẫn đi leo núi.'
      },
      {
        rule: '2. Danh từ không đếm được (Advice, Information, Equipment, Furniture)',
        example: 'He gave me some useful advice. (KHÔNG DÙNG "an advice" hay "advices")',
        exampleVi: 'Anh ấy đã cho tôi vài lời khuyên hữu ích.'
      },
      {
        rule: '3. Cấu trúc Explain to somebody',
        example: 'Can you explain the problem to me? (KHÔNG DÙNG "explain me the problem")',
        exampleVi: 'Bạn có thể giải thích vấn đề đó cho tôi nghe được không?'
      }
    ],
    commonMistakes: [
      {
        wrong: 'Because I was tired, so I went to bed early. ❌',
        right: 'Because I was tired, I went to bed early. ✅ (hoặc: I was tired, so I went to bed early)',
        reason: 'Trong tiếng Anh chỉ được dùng 1 liên từ duy nhất nối 2 mệnh đề: hoặc Because, hoặc So.'
      },
      {
        wrong: 'I suggest you to take a break. ❌',
        right: 'I suggest that you (should) take a break. ✅ (hoặc: I suggest taking a break)',
        reason: 'Suggest KHÔNG đi với "to V". Cấu trúc chuẩn là: suggest doing something hoặc suggest (that) S + V_inf.'
      }
    ],
    miniQuiz: {
      question: 'Chọn câu viết đúng ngữ pháp nhất:',
      options: [
        'Although he studied hard, but he failed the exam.',
        'Although he studied hard, he failed the exam.',
        'Because he studied hard, so he passed the exam.',
        'He gave me many advices yesterday.'
      ],
      answerIndex: 1,
      explanation: 'Câu đúng là "Although he studied hard, he failed the exam." vì không dùng "but" sau "Although".'
    }
  }
];
