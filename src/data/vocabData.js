export const VOCAB_CATEGORIES = [
  { id: 'all', name: 'Tất cả lĩnh vực', icon: 'Sparkles', color: 'indigo' },
  { id: 'it', name: 'Công nghệ & CNTT', icon: 'Code', color: 'cyan', badge: '40 Từ' },
  { id: 'business', name: 'Kinh doanh & Công sở', icon: 'Briefcase', color: 'emerald', badge: '25 Từ' },
  { id: 'travel', name: 'Du lịch & Khách sạn', icon: 'Plane', color: 'amber', badge: '20 Từ' },
  { id: 'daily', name: 'Đời sống & Giao tiếp', icon: 'Coffee', color: 'rose', badge: '20 Từ' },
  { id: 'academic', name: 'Học thuật & IELTS', icon: 'GraduationCap', color: 'violet', badge: '20 Từ' },
  { id: 'health', name: 'Y tế & Sức khỏe', icon: 'HeartPulse', color: 'teal', badge: '20 Từ' },
];

export const VOCAB_LIST = [
  {
    "id": "it-1",
    "word": "Scalability",
    "ipa": "/scalability/",
    "partOfSpeech": "noun",
    "vietnamese": "Khả năng mở rộng hệ thống",
    "category": "it",
    "level": "B2",
    "definition": "Scalability is a key concept in it. Khả năng hệ thống tăng quy mô mà không sập.",
    "example": "The team analyzed the scalability during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố khả năng mở rộng hệ thống trong buổi đánh giá dự án.",
    "collocations": [
      "scalability analysis",
      "core scalability",
      "apply scalability"
    ],
    "mnemonic": "Khả năng hệ thống tăng quy mô mà không sập."
  },
  {
    "id": "it-2",
    "word": "Deployment",
    "ipa": "/di'plɔimənt/",
    "partOfSpeech": "noun",
    "vietnamese": "Triển khai phần mềm lên server",
    "category": "it",
    "level": "B1",
    "definition": "Deployment is a key concept in it. Đưa code từ máy cá nhân lên server production.",
    "example": "The team analyzed the deployment during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố triển khai phần mềm lên server trong buổi đánh giá dự án.",
    "collocations": [
      "deployment analysis",
      "core deployment",
      "apply deployment"
    ],
    "mnemonic": "Đưa code từ máy cá nhân lên server production."
  },
  {
    "id": "it-3",
    "word": "Vulnerability",
    "ipa": "/,vʌlnərə'biliti/",
    "partOfSpeech": "noun",
    "vietnamese": "Lỗ hổng bảo mật, điểm yếu",
    "category": "it",
    "level": "B2",
    "definition": "Vulnerability is a key concept in it. Kẽ hở để hacker tấn công.",
    "example": "The team analyzed the vulnerability during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố lỗ hổng bảo mật, điểm yếu trong buổi đánh giá dự án.",
    "collocations": [
      "vulnerability analysis",
      "core vulnerability",
      "apply vulnerability"
    ],
    "mnemonic": "Kẽ hở để hacker tấn công."
  },
  {
    "id": "it-4",
    "word": "Refactoring",
    "ipa": "/refactoring/",
    "partOfSpeech": "noun",
    "vietnamese": "Tái cấu trúc mã nguồn",
    "category": "it",
    "level": "B2",
    "definition": "Refactoring is a key concept in it. Dọn dẹp code cho gọn mà app vẫn chạy như cũ.",
    "example": "The team analyzed the refactoring during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tái cấu trúc mã nguồn trong buổi đánh giá dự án.",
    "collocations": [
      "refactoring analysis",
      "core refactoring",
      "apply refactoring"
    ],
    "mnemonic": "Dọn dẹp code cho gọn mà app vẫn chạy như cũ."
  },
  {
    "id": "it-5",
    "word": "Latency",
    "ipa": "/'leitənsi/",
    "partOfSpeech": "noun",
    "vietnamese": "Độ trễ truyền dữ liệu mạng",
    "category": "it",
    "level": "B2",
    "definition": "Latency is a key concept in it. Thời gian chờ đợi dữ liệu phản hồi từ máy chủ.",
    "example": "The team analyzed the latency during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố độ trễ truyền dữ liệu mạng trong buổi đánh giá dự án.",
    "collocations": [
      "latency analysis",
      "core latency",
      "apply latency"
    ],
    "mnemonic": "Thời gian chờ đợi dữ liệu phản hồi từ máy chủ."
  },
  {
    "id": "it-6",
    "word": "Deprecate",
    "ipa": "/'deprikeit/",
    "partOfSpeech": "verb",
    "vietnamese": "Khai tử, ngưng hỗ trợ tính năng cũ",
    "category": "it",
    "level": "C1",
    "definition": "Deprecate is a key concept in it. Không khuyến khích dùng nữa, chuẩn bị xóa bỏ.",
    "example": "to deprecate war",
    "exampleVi": "phản đối chiến tranh",
    "collocations": [
      "deprecate analysis",
      "core deprecate",
      "apply deprecate"
    ],
    "mnemonic": "Không khuyến khích dùng nữa, chuẩn bị xóa bỏ."
  },
  {
    "id": "it-7",
    "word": "Microservices",
    "ipa": "/microservices/",
    "partOfSpeech": "noun",
    "vietnamese": "Kiến trúc dịch vụ siêu nhỏ",
    "category": "it",
    "level": "B2",
    "definition": "Microservices is a key concept in it. Chia nhỏ app thành các dịch vụ độc lập.",
    "example": "The team analyzed the microservices during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố kiến trúc dịch vụ siêu nhỏ trong buổi đánh giá dự án.",
    "collocations": [
      "microservices analysis",
      "core microservices",
      "apply microservices"
    ],
    "mnemonic": "Chia nhỏ app thành các dịch vụ độc lập."
  },
  {
    "id": "it-8",
    "word": "Asynchronous",
    "ipa": "/asynchronous/",
    "partOfSpeech": "adjective",
    "vietnamese": "Bất đồng bộ (không chặn tiến trình)",
    "category": "it",
    "level": "B2",
    "definition": "Asynchronous is a key concept in it. Xử lý ngầm, không bắt người dùng đứng đợi.",
    "example": "The team analyzed the asynchronous during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố bất đồng bộ (không chặn tiến trình) trong buổi đánh giá dự án.",
    "collocations": [
      "asynchronous analysis",
      "core asynchronous",
      "apply asynchronous"
    ],
    "mnemonic": "Xử lý ngầm, không bắt người dùng đứng đợi."
  },
  {
    "id": "it-9",
    "word": "Idempotent",
    "ipa": "/idempotent/",
    "partOfSpeech": "adjective",
    "vietnamese": "Bất biến khi lặp lại",
    "category": "it",
    "level": "C1",
    "definition": "Idempotent is a key concept in it. Gọi nhiều lần kết quả trạng thái vẫn như một.",
    "example": "The team analyzed the idempotent during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố bất biến khi lặp lại trong buổi đánh giá dự án.",
    "collocations": [
      "idempotent analysis",
      "core idempotent",
      "apply idempotent"
    ],
    "mnemonic": "Gọi nhiều lần kết quả trạng thái vẫn như một."
  },
  {
    "id": "it-10",
    "word": "Containerization",
    "ipa": "/containerization/",
    "partOfSpeech": "noun",
    "vietnamese": "Đóng gói ứng dụng vào container (Docker)",
    "category": "it",
    "level": "B2",
    "definition": "Containerization is a key concept in it. Gói code + thư viện vào thùng Docker chạy mọi nơi.",
    "example": "The team analyzed the containerization during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố đóng gói ứng dụng vào container (docker) trong buổi đánh giá dự án.",
    "collocations": [
      "containerization analysis",
      "core containerization",
      "apply containerization"
    ],
    "mnemonic": "Gói code + thư viện vào thùng Docker chạy mọi nơi."
  },
  {
    "id": "it-11",
    "word": "Concurrency",
    "ipa": "/concurrency/",
    "partOfSpeech": "noun",
    "vietnamese": "Xử lý đồng thời nhiều tác vụ",
    "category": "it",
    "level": "C1",
    "definition": "Concurrency is a key concept in it. Nhiều luồng chạy đan xen thông minh.",
    "example": "The team analyzed the concurrency during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố xử lý đồng thời nhiều tác vụ trong buổi đánh giá dự án.",
    "collocations": [
      "concurrency analysis",
      "core concurrency",
      "apply concurrency"
    ],
    "mnemonic": "Nhiều luồng chạy đan xen thông minh."
  },
  {
    "id": "it-12",
    "word": "Telemetry",
    "ipa": "/telemetry/",
    "partOfSpeech": "noun",
    "vietnamese": "Đo lường giám sát dữ liệu từ xa",
    "category": "it",
    "level": "C1",
    "definition": "Telemetry is a key concept in it. Theo dõi chỉ số CPU/RAM/traffic từ xa.",
    "example": "The team analyzed the telemetry during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố đo lường giám sát dữ liệu từ xa trong buổi đánh giá dự án.",
    "collocations": [
      "telemetry analysis",
      "core telemetry",
      "apply telemetry"
    ],
    "mnemonic": "Theo dõi chỉ số CPU/RAM/traffic từ xa."
  },
  {
    "id": "it-13",
    "word": "Polymorphism",
    "ipa": "/,pɔli'mɔ:fizm/",
    "partOfSpeech": "noun",
    "vietnamese": "Tính đa hình (OOP)",
    "category": "it",
    "level": "C1",
    "definition": "Polymorphism is a key concept in it. Cùng 1 hàm nhưng mỗi đối tượng xử lý riêng.",
    "example": "The team analyzed the polymorphism during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tính đa hình (oop) trong buổi đánh giá dự án.",
    "collocations": [
      "polymorphism analysis",
      "core polymorphism",
      "apply polymorphism"
    ],
    "mnemonic": "Cùng 1 hàm nhưng mỗi đối tượng xử lý riêng."
  },
  {
    "id": "it-14",
    "word": "Middleware",
    "ipa": "/middleware/",
    "partOfSpeech": "noun",
    "vietnamese": "Phần mềm trung gian xử lý request",
    "category": "it",
    "level": "B2",
    "definition": "Middleware is a key concept in it. Người gác cổng kiểm tra bảo mật ở giữa.",
    "example": "The team analyzed the middleware during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố phần mềm trung gian xử lý request trong buổi đánh giá dự án.",
    "collocations": [
      "middleware analysis",
      "core middleware",
      "apply middleware"
    ],
    "mnemonic": "Người gác cổng kiểm tra bảo mật ở giữa."
  },
  {
    "id": "it-15",
    "word": "Orchestration",
    "ipa": "/,ɔ:kes'treiʃn/",
    "partOfSpeech": "noun",
    "vietnamese": "Điều phối tự động (Kubernetes)",
    "category": "it",
    "level": "C1",
    "definition": "Orchestration is a key concept in it. Chỉ huy dàn container phối hợp nhịp nhàng.",
    "example": "The team analyzed the orchestration during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố điều phối tự động (kubernetes) trong buổi đánh giá dự án.",
    "collocations": [
      "orchestration analysis",
      "core orchestration",
      "apply orchestration"
    ],
    "mnemonic": "Chỉ huy dàn container phối hợp nhịp nhàng."
  },
  {
    "id": "it-16",
    "word": "Immutability",
    "ipa": "/i,mju:tə'biliti/ (immutableness) /i'mju:təblnis/",
    "partOfSpeech": "noun",
    "vietnamese": "Tính bất biến (không thể sửa đổi)",
    "category": "it",
    "level": "C1",
    "definition": "Immutability is a key concept in it. Tạo ra rồi là giữ nguyên vĩnh viễn.",
    "example": "The team analyzed the immutability during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tính bất biến (không thể sửa đổi) trong buổi đánh giá dự án.",
    "collocations": [
      "immutability analysis",
      "core immutability",
      "apply immutability"
    ],
    "mnemonic": "Tạo ra rồi là giữ nguyên vĩnh viễn."
  },
  {
    "id": "it-17",
    "word": "Deadlock",
    "ipa": "/deadlock/",
    "partOfSpeech": "noun",
    "vietnamese": "Tắc nghẽn bế tắc tài nguyên",
    "category": "it",
    "level": "B2",
    "definition": "Deadlock is a key concept in it. Hai tiến trình đợi nhau nhả khóa làm đơ hệ thống.",
    "example": "The team analyzed the deadlock during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tắc nghẽn bế tắc tài nguyên trong buổi đánh giá dự án.",
    "collocations": [
      "deadlock analysis",
      "core deadlock",
      "apply deadlock"
    ],
    "mnemonic": "Hai tiến trình đợi nhau nhả khóa làm đơ hệ thống."
  },
  {
    "id": "it-18",
    "word": "Throughput",
    "ipa": "/throughput/",
    "partOfSpeech": "noun",
    "vietnamese": "Lưu lượng xử lý (request/giây)",
    "category": "it",
    "level": "B2",
    "definition": "Throughput is a key concept in it. Lượng dữ liệu truyền qua hệ thống trong 1 giây.",
    "example": "The team analyzed the throughput during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố lưu lượng xử lý (request/giây) trong buổi đánh giá dự án.",
    "collocations": [
      "throughput analysis",
      "core throughput",
      "apply throughput"
    ],
    "mnemonic": "Lượng dữ liệu truyền qua hệ thống trong 1 giây."
  },
  {
    "id": "it-19",
    "word": "Encapsulation",
    "ipa": "/encapsulation/",
    "partOfSpeech": "noun",
    "vietnamese": "Tính đóng gói dữ liệu (OOP)",
    "category": "it",
    "level": "B2",
    "definition": "Encapsulation is a key concept in it. Bọc kín dữ liệu bên trong lớp đối tượng.",
    "example": "The team analyzed the encapsulation during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tính đóng gói dữ liệu (oop) trong buổi đánh giá dự án.",
    "collocations": [
      "encapsulation analysis",
      "core encapsulation",
      "apply encapsulation"
    ],
    "mnemonic": "Bọc kín dữ liệu bên trong lớp đối tượng."
  },
  {
    "id": "it-20",
    "word": "Pagination",
    "ipa": "/,pædʤi'neiʃn/",
    "partOfSpeech": "noun",
    "vietnamese": "Phân trang dữ liệu",
    "category": "it",
    "level": "B1",
    "definition": "Pagination is a key concept in it. Chia dữ liệu lớn thành từng trang nhỏ tải nhanh.",
    "example": "The team analyzed the pagination during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố phân trang dữ liệu trong buổi đánh giá dự án.",
    "collocations": [
      "pagination analysis",
      "core pagination",
      "apply pagination"
    ],
    "mnemonic": "Chia dữ liệu lớn thành từng trang nhỏ tải nhanh."
  },
  {
    "id": "it-21",
    "word": "Deterministic",
    "ipa": "/deterministic/",
    "partOfSpeech": "adjective",
    "vietnamese": "Định thức (cùng input luôn ra cùng output)",
    "category": "it",
    "level": "C1",
    "definition": "Deterministic is a key concept in it. Luôn cho kết quả nhất quán không ngẫu nhiên.",
    "example": "The team analyzed the deterministic during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố định thức (cùng input luôn ra cùng output) trong buổi đánh giá dự án.",
    "collocations": [
      "deterministic analysis",
      "core deterministic",
      "apply deterministic"
    ],
    "mnemonic": "Luôn cho kết quả nhất quán không ngẫu nhiên."
  },
  {
    "id": "it-22",
    "word": "Virtualization",
    "ipa": "/virtualization/",
    "partOfSpeech": "noun",
    "vietnamese": "Ảo hóa phần cứng",
    "category": "it",
    "level": "B2",
    "definition": "Virtualization is a key concept in it. Biến 1 máy chủ vật lý thành nhiều máy ảo độc lập.",
    "example": "The team analyzed the virtualization during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố ảo hóa phần cứng trong buổi đánh giá dự án.",
    "collocations": [
      "virtualization analysis",
      "core virtualization",
      "apply virtualization"
    ],
    "mnemonic": "Biến 1 máy chủ vật lý thành nhiều máy ảo độc lập."
  },
  {
    "id": "it-23",
    "word": "Authentication",
    "ipa": "/ɔ:,θenti'keiʃn/",
    "partOfSpeech": "noun",
    "vietnamese": "Xác thực danh tính người dùng",
    "category": "it",
    "level": "B1",
    "definition": "Authentication is a key concept in it. Kiểm tra bạn là ai (Login / Mật khẩu).",
    "example": "The team analyzed the authentication during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố xác thực danh tính người dùng trong buổi đánh giá dự án.",
    "collocations": [
      "authentication analysis",
      "core authentication",
      "apply authentication"
    ],
    "mnemonic": "Kiểm tra bạn là ai (Login / Mật khẩu)."
  },
  {
    "id": "it-24",
    "word": "Authorization",
    "ipa": "/,ɔ:θərai'zeiʃn/",
    "partOfSpeech": "noun",
    "vietnamese": "Phân quyền truy cập",
    "category": "it",
    "level": "B2",
    "definition": "Authorization is a key concept in it. Kiểm tra bạn được phép làm những gì (Admin / User).",
    "example": "The team analyzed the authorization during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố phân quyền truy cập trong buổi đánh giá dự án.",
    "collocations": [
      "authorization analysis",
      "core authorization",
      "apply authorization"
    ],
    "mnemonic": "Kiểm tra bạn được phép làm những gì (Admin / User)."
  },
  {
    "id": "it-25",
    "word": "Bandwidth",
    "ipa": "/bandwidth/",
    "partOfSpeech": "noun",
    "vietnamese": "Băng thông đường truyền mạng",
    "category": "it",
    "level": "B1",
    "definition": "Bandwidth is a key concept in it. Độ rộng của đường ống truyền tải dữ liệu.",
    "example": "The team analyzed the bandwidth during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố băng thông đường truyền mạng trong buổi đánh giá dự án.",
    "collocations": [
      "bandwidth analysis",
      "core bandwidth",
      "apply bandwidth"
    ],
    "mnemonic": "Độ rộng của đường ống truyền tải dữ liệu."
  },
  {
    "id": "it-26",
    "word": "Encryption",
    "ipa": "/encryption/",
    "partOfSpeech": "noun",
    "vietnamese": "Mã hóa bảo vệ dữ liệu",
    "category": "it",
    "level": "B2",
    "definition": "Encryption is a key concept in it. Biến đổi dữ liệu thành mật mã để chống đọc trộm.",
    "example": "The team analyzed the encryption during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố mã hóa bảo vệ dữ liệu trong buổi đánh giá dự án.",
    "collocations": [
      "encryption analysis",
      "core encryption",
      "apply encryption"
    ],
    "mnemonic": "Biến đổi dữ liệu thành mật mã để chống đọc trộm."
  },
  {
    "id": "it-27",
    "word": "Decryption",
    "ipa": "/decryption/",
    "partOfSpeech": "noun",
    "vietnamese": "Giải mã dữ liệu",
    "category": "it",
    "level": "B2",
    "definition": "Decryption is a key concept in it. Biến mật mã trở lại dữ liệu gốc.",
    "example": "The team analyzed the decryption during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố giải mã dữ liệu trong buổi đánh giá dự án.",
    "collocations": [
      "decryption analysis",
      "core decryption",
      "apply decryption"
    ],
    "mnemonic": "Biến mật mã trở lại dữ liệu gốc."
  },
  {
    "id": "it-28",
    "word": "Payload",
    "ipa": "/payload/",
    "partOfSpeech": "noun",
    "vietnamese": "Khối dữ liệu truyền tải",
    "category": "it",
    "level": "B2",
    "definition": "Payload is a key concept in it. Nội dung cốt lõi của gói tin hoặc request.",
    "example": "The team analyzed the payload during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố khối dữ liệu truyền tải trong buổi đánh giá dự án.",
    "collocations": [
      "payload analysis",
      "core payload",
      "apply payload"
    ],
    "mnemonic": "Nội dung cốt lõi của gói tin hoặc request."
  },
  {
    "id": "it-29",
    "word": "Repository",
    "ipa": "/ri'pɔzitəri/",
    "partOfSpeech": "noun",
    "vietnamese": "Kho lưu trữ mã nguồn (Git)",
    "category": "it",
    "level": "B1",
    "definition": "Repository is a key concept in it. Nơi lưu trữ toàn bộ code và lịch sử commit.",
    "example": "a repository of goods",
    "exampleVi": "kho hàng",
    "collocations": [
      "repository analysis",
      "core repository",
      "apply repository"
    ],
    "mnemonic": "Nơi lưu trữ toàn bộ code và lịch sử commit."
  },
  {
    "id": "it-30",
    "word": "Serialization",
    "ipa": "/serialization/",
    "partOfSpeech": "noun",
    "vietnamese": "Tuần tự hóa dữ liệu (Object sang JSON/Bytes)",
    "category": "it",
    "level": "B2",
    "definition": "Serialization is a key concept in it. Ép đối tượng thành chuỗi văn bản để gửi qua mạng.",
    "example": "The team analyzed the serialization during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tuần tự hóa dữ liệu (object sang json/bytes) trong buổi đánh giá dự án.",
    "collocations": [
      "serialization analysis",
      "core serialization",
      "apply serialization"
    ],
    "mnemonic": "Ép đối tượng thành chuỗi văn bản để gửi qua mạng."
  },
  {
    "id": "it-31",
    "word": "Deserialization",
    "ipa": "/deserialization/",
    "partOfSpeech": "noun",
    "vietnamese": "Giải tuần tự hóa (JSON sang Object)",
    "category": "it",
    "level": "B2",
    "definition": "Deserialization is a key concept in it. Dựng lại đối tượng từ chuỗi JSON.",
    "example": "The team analyzed the deserialization during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố giải tuần tự hóa (json sang object) trong buổi đánh giá dự án.",
    "collocations": [
      "deserialization analysis",
      "core deserialization",
      "apply deserialization"
    ],
    "mnemonic": "Dựng lại đối tượng từ chuỗi JSON."
  },
  {
    "id": "it-32",
    "word": "Redundancy",
    "ipa": "/redundancy/",
    "partOfSpeech": "noun",
    "vietnamese": "Dự phòng độ tin cậy (Backup)",
    "category": "it",
    "level": "C1",
    "definition": "Redundancy is a key concept in it. Chuẩn bị sẵn server phụ khi server chính bị sự cố.",
    "example": "The team analyzed the redundancy during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố dự phòng độ tin cậy (backup) trong buổi đánh giá dự án.",
    "collocations": [
      "redundancy analysis",
      "core redundancy",
      "apply redundancy"
    ],
    "mnemonic": "Chuẩn bị sẵn server phụ khi server chính bị sự cố."
  },
  {
    "id": "it-33",
    "word": "Failover",
    "ipa": "/failover/",
    "partOfSpeech": "noun",
    "vietnamese": "Chuyển đổi dự phòng tự động",
    "category": "it",
    "level": "C1",
    "definition": "Failover is a key concept in it. Tự động nhảy sang server phụ khi máy chính sập.",
    "example": "The team analyzed the failover during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố chuyển đổi dự phòng tự động trong buổi đánh giá dự án.",
    "collocations": [
      "failover analysis",
      "core failover",
      "apply failover"
    ],
    "mnemonic": "Tự động nhảy sang server phụ khi máy chính sập."
  },
  {
    "id": "it-34",
    "word": "Cache",
    "ipa": "/cache/",
    "partOfSpeech": "noun",
    "vietnamese": "Bộ nhớ đệm siêu tốc",
    "category": "it",
    "level": "B1",
    "definition": "Cache is a key concept in it. Lưu tạm dữ liệu hay dùng để truy xuất tức thì.",
    "example": "The team analyzed the cache during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố bộ nhớ đệm siêu tốc trong buổi đánh giá dự án.",
    "collocations": [
      "cache analysis",
      "core cache",
      "apply cache"
    ],
    "mnemonic": "Lưu tạm dữ liệu hay dùng để truy xuất tức thì."
  },
  {
    "id": "it-35",
    "word": "Loadbalancer",
    "ipa": "/loadbalancer/",
    "partOfSpeech": "noun",
    "vietnamese": "Bộ cân bằng tải",
    "category": "it",
    "level": "B2",
    "definition": "Loadbalancer is a key concept in it. Phân phối đều lượng truy cập sang nhiều server.",
    "example": "The team analyzed the loadbalancer during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố bộ cân bằng tải trong buổi đánh giá dự án.",
    "collocations": [
      "loadbalancer analysis",
      "core loadbalancer",
      "apply loadbalancer"
    ],
    "mnemonic": "Phân phối đều lượng truy cập sang nhiều server."
  },
  {
    "id": "it-36",
    "word": "Algorithm",
    "ipa": "/algorithm/",
    "partOfSpeech": "noun",
    "vietnamese": "Thuật toán xử lý logic",
    "category": "it",
    "level": "B1",
    "definition": "Algorithm is a key concept in it. Từng bước tuần tự để giải quyết một bài toán.",
    "example": "The team analyzed the algorithm during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố thuật toán xử lý logic trong buổi đánh giá dự án.",
    "collocations": [
      "algorithm analysis",
      "core algorithm",
      "apply algorithm"
    ],
    "mnemonic": "Từng bước tuần tự để giải quyết một bài toán."
  },
  {
    "id": "it-37",
    "word": "Heuristic",
    "ipa": "/heuristic/",
    "partOfSpeech": "adjective",
    "vietnamese": "Phương pháp phỏng đoán tối ưu",
    "category": "it",
    "level": "C1",
    "definition": "Heuristic is a key concept in it. Tìm cách giải bài toán đủ tốt một cách nhanh nhất.",
    "example": "The team analyzed the heuristic during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố phương pháp phỏng đoán tối ưu trong buổi đánh giá dự án.",
    "collocations": [
      "heuristic analysis",
      "core heuristic",
      "apply heuristic"
    ],
    "mnemonic": "Tìm cách giải bài toán đủ tốt một cách nhanh nhất."
  },
  {
    "id": "it-38",
    "word": "Abstraction",
    "ipa": "/abstraction/",
    "partOfSpeech": "noun",
    "vietnamese": "Tính trừu tượng hóa",
    "category": "it",
    "level": "B2",
    "definition": "Abstraction is a key concept in it. Ẩn đi chi tiết phức tạp, chỉ hiển thị giao diện đơn giản.",
    "example": "The team analyzed the abstraction during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tính trừu tượng hóa trong buổi đánh giá dự án.",
    "collocations": [
      "abstraction analysis",
      "core abstraction",
      "apply abstraction"
    ],
    "mnemonic": "Ẩn đi chi tiết phức tạp, chỉ hiển thị giao diện đơn giản."
  },
  {
    "id": "it-39",
    "word": "Inheritance",
    "ipa": "/in'heritəns/",
    "partOfSpeech": "noun",
    "vietnamese": "Tính kế thừa (OOP)",
    "category": "it",
    "level": "B2",
    "definition": "Inheritance is a key concept in it. Lớp con thừa hưởng thuộc tính từ lớp cha.",
    "example": "The team analyzed the inheritance during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tính kế thừa (oop) trong buổi đánh giá dự án.",
    "collocations": [
      "inheritance analysis",
      "core inheritance",
      "apply inheritance"
    ],
    "mnemonic": "Lớp con thừa hưởng thuộc tính từ lớp cha."
  },
  {
    "id": "it-40",
    "word": "Interface",
    "ipa": "/interface/",
    "partOfSpeech": "noun",
    "vietnamese": "Giao diện kết nối / Bản hợp đồng phương thức",
    "category": "it",
    "level": "B1",
    "definition": "Interface is a key concept in it. Quy chuẩn các hàm mà một lớp phải cài đặt.",
    "example": "The team analyzed the interface during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố giao diện kết nối / bản hợp đồng phương thức trong buổi đánh giá dự án.",
    "collocations": [
      "interface analysis",
      "core interface",
      "apply interface"
    ],
    "mnemonic": "Quy chuẩn các hàm mà một lớp phải cài đặt."
  },
  {
    "id": "business-1",
    "word": "Negotiation",
    "ipa": "/ni,gouʃi'eiʃn/",
    "partOfSpeech": "noun",
    "vietnamese": "Thương lượng, đàm phán hợp đồng",
    "category": "business",
    "level": "B2",
    "definition": "Negotiation is a key concept in business. Thương thảo đôi bên cùng có lợi.",
    "example": "to enter into (upon) a negotiation with",
    "exampleVi": "đàm phán với",
    "collocations": [
      "negotiation analysis",
      "core negotiation",
      "apply negotiation"
    ],
    "mnemonic": "Thương thảo đôi bên cùng có lợi."
  },
  {
    "id": "business-2",
    "word": "Stakeholder",
    "ipa": "/'steik,houldə/",
    "partOfSpeech": "noun",
    "vietnamese": "Bên liên quan trực tiếp đến dự án",
    "category": "business",
    "level": "B2",
    "definition": "Stakeholder is a key concept in business. Nắm giữ phần lợi ích trong dự án.",
    "example": "The team analyzed the stakeholder during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố bên liên quan trực tiếp đến dự án trong buổi đánh giá dự án.",
    "collocations": [
      "stakeholder analysis",
      "core stakeholder",
      "apply stakeholder"
    ],
    "mnemonic": "Nắm giữ phần lợi ích trong dự án."
  },
  {
    "id": "business-3",
    "word": "Leverage",
    "ipa": "/leverage/",
    "partOfSpeech": "verb",
    "vietnamese": "Tận dụng đòn bẩy lợi thế tối đa",
    "category": "business",
    "level": "C1",
    "definition": "Leverage is a key concept in business. Dùng đòn bẩy nhỏ để nâng tảng đá lớn.",
    "example": "The team analyzed the leverage during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tận dụng đòn bẩy lợi thế tối đa trong buổi đánh giá dự án.",
    "collocations": [
      "leverage analysis",
      "core leverage",
      "apply leverage"
    ],
    "mnemonic": "Dùng đòn bẩy nhỏ để nâng tảng đá lớn."
  },
  {
    "id": "business-4",
    "word": "Feasibility",
    "ipa": "/,fi:zə'biliti/",
    "partOfSpeech": "noun",
    "vietnamese": "Tính khả thi trong thực tế",
    "category": "business",
    "level": "B2",
    "definition": "Feasibility is a key concept in business. Khả năng biến ý tưởng trên giấy thành hiện thực.",
    "example": "The team analyzed the feasibility during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tính khả thi trong thực tế trong buổi đánh giá dự án.",
    "collocations": [
      "feasibility analysis",
      "core feasibility",
      "apply feasibility"
    ],
    "mnemonic": "Khả năng biến ý tưởng trên giấy thành hiện thực."
  },
  {
    "id": "business-5",
    "word": "Deliverable",
    "ipa": "/deliverable/",
    "partOfSpeech": "noun",
    "vietnamese": "Sản phẩm bàn giao đúng hẹn",
    "category": "business",
    "level": "B2",
    "definition": "Deliverable is a key concept in business. Hạng mục phải bàn giao cho khách hàng.",
    "example": "The team analyzed the deliverable during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố sản phẩm bàn giao đúng hẹn trong buổi đánh giá dự án.",
    "collocations": [
      "deliverable analysis",
      "core deliverable",
      "apply deliverable"
    ],
    "mnemonic": "Hạng mục phải bàn giao cho khách hàng."
  },
  {
    "id": "business-6",
    "word": "Synergy",
    "ipa": "/synergy/",
    "partOfSpeech": "noun",
    "vietnamese": "Hiệu ứng cộng hưởng (1 + 1 > 2)",
    "category": "business",
    "level": "C1",
    "definition": "Synergy is a key concept in business. Hợp lực tạo ra sức mạnh vượt trội.",
    "example": "The team analyzed the synergy during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố hiệu ứng cộng hưởng (1 + 1 > 2) trong buổi đánh giá dự án.",
    "collocations": [
      "synergy analysis",
      "core synergy",
      "apply synergy"
    ],
    "mnemonic": "Hợp lực tạo ra sức mạnh vượt trội."
  },
  {
    "id": "business-7",
    "word": "Benchmark",
    "ipa": "/benchmark/",
    "partOfSpeech": "noun",
    "vietnamese": "Tiêu chuẩn đối sánh chuẩn mực",
    "category": "business",
    "level": "B2",
    "definition": "Benchmark is a key concept in business. Cột mốc chuẩn mực để đo vị thế trên thị trường.",
    "example": "The team analyzed the benchmark during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tiêu chuẩn đối sánh chuẩn mực trong buổi đánh giá dự án.",
    "collocations": [
      "benchmark analysis",
      "core benchmark",
      "apply benchmark"
    ],
    "mnemonic": "Cột mốc chuẩn mực để đo vị thế trên thị trường."
  },
  {
    "id": "business-8",
    "word": "Due Diligence",
    "ipa": "/due diligence/",
    "partOfSpeech": "noun",
    "vietnamese": "Thẩm định chuyên sâu (trước khi đầu tư)",
    "category": "business",
    "level": "C1",
    "definition": "Due Diligence is a key concept in business. Soi xét kỹ pháp lý và tài chính trước khi mua bán.",
    "example": "The team analyzed the due diligence during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố thẩm định chuyên sâu (trước khi đầu tư) trong buổi đánh giá dự án.",
    "collocations": [
      "due diligence analysis",
      "core due diligence",
      "apply due diligence"
    ],
    "mnemonic": "Soi xét kỹ pháp lý và tài chính trước khi mua bán."
  },
  {
    "id": "business-9",
    "word": "Bandwidth",
    "ipa": "/bandwidth/",
    "partOfSpeech": "noun",
    "vietnamese": "Quỹ thời gian / Sức chứa công việc",
    "category": "business",
    "level": "B2",
    "definition": "Bandwidth is a key concept in business. Quỹ thời gian sẵn có để nhận thêm việc.",
    "example": "The team analyzed the bandwidth during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố quỹ thời gian / sức chứa công việc trong buổi đánh giá dự án.",
    "collocations": [
      "bandwidth analysis",
      "core bandwidth",
      "apply bandwidth"
    ],
    "mnemonic": "Quỹ thời gian sẵn có để nhận thêm việc."
  },
  {
    "id": "business-10",
    "word": "Retrospective",
    "ipa": "/retrospective/",
    "partOfSpeech": "noun",
    "vietnamese": "Cuộc họp nhìn lại và rút kinh nghiệm",
    "category": "business",
    "level": "B2",
    "definition": "Retrospective is a key concept in business. Rút bài học sau mỗi chu kỳ dự án.",
    "example": "The team analyzed the retrospective during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố cuộc họp nhìn lại và rút kinh nghiệm trong buổi đánh giá dự án.",
    "collocations": [
      "retrospective analysis",
      "core retrospective",
      "apply retrospective"
    ],
    "mnemonic": "Rút bài học sau mỗi chu kỳ dự án."
  },
  {
    "id": "business-11",
    "word": "Acquisition",
    "ipa": "/acquisition/",
    "partOfSpeech": "noun",
    "vietnamese": "Thương vụ thâu tóm doanh nghiệp",
    "category": "business",
    "level": "B2",
    "definition": "Acquisition is a key concept in business. Mua lại công ty khác để mở rộng thị phần.",
    "example": "The team analyzed the acquisition during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố thương vụ thâu tóm doanh nghiệp trong buổi đánh giá dự án.",
    "collocations": [
      "acquisition analysis",
      "core acquisition",
      "apply acquisition"
    ],
    "mnemonic": "Mua lại công ty khác để mở rộng thị phần."
  },
  {
    "id": "business-12",
    "word": "Overhead",
    "ipa": "/overhead/",
    "partOfSpeech": "noun",
    "vietnamese": "Chi phí vận hành cố định",
    "category": "business",
    "level": "B2",
    "definition": "Overhead is a key concept in business. Tiền thuê mặt bằng, điện nước, quản lý hàng tháng.",
    "example": "The team analyzed the overhead during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố chi phí vận hành cố định trong buổi đánh giá dự án.",
    "collocations": [
      "overhead analysis",
      "core overhead",
      "apply overhead"
    ],
    "mnemonic": "Tiền thuê mặt bằng, điện nước, quản lý hàng tháng."
  },
  {
    "id": "business-13",
    "word": "Monetization",
    "ipa": "/,mʌnitai'zeiʃn/",
    "partOfSpeech": "noun",
    "vietnamese": "Chiến lược kiếm tiền từ sản phẩm",
    "category": "business",
    "level": "B2",
    "definition": "Monetization is a key concept in business. Biến lượt xem/người dùng thành doanh thu.",
    "example": "The team analyzed the monetization during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố chiến lược kiếm tiền từ sản phẩm trong buổi đánh giá dự án.",
    "collocations": [
      "monetization analysis",
      "core monetization",
      "apply monetization"
    ],
    "mnemonic": "Biến lượt xem/người dùng thành doanh thu."
  },
  {
    "id": "business-14",
    "word": "Pivot",
    "ipa": "/'pivət/",
    "partOfSpeech": "verb",
    "vietnamese": "Chuyển hướng chiến lược kinh doanh",
    "category": "business",
    "level": "B2",
    "definition": "Pivot is a key concept in business. Xoay trục sang sản phẩm mới tiềm năng hơn.",
    "example": "The team analyzed the pivot during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố chuyển hướng chiến lược kinh doanh trong buổi đánh giá dự án.",
    "collocations": [
      "pivot analysis",
      "core pivot",
      "apply pivot"
    ],
    "mnemonic": "Xoay trục sang sản phẩm mới tiềm năng hơn."
  },
  {
    "id": "business-15",
    "word": "Bootstrapping",
    "ipa": "/bootstrapping/",
    "partOfSpeech": "noun",
    "vietnamese": "Tự lực cánh sinh (không gọi vốn ngoài)",
    "category": "business",
    "level": "B2",
    "definition": "Bootstrapping is a key concept in business. Khởi nghiệp tự nuôi sống từ doanh thu.",
    "example": "The team analyzed the bootstrapping during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tự lực cánh sinh (không gọi vốn ngoài) trong buổi đánh giá dự án.",
    "collocations": [
      "bootstrapping analysis",
      "core bootstrapping",
      "apply bootstrapping"
    ],
    "mnemonic": "Khởi nghiệp tự nuôi sống từ doanh thu."
  },
  {
    "id": "business-16",
    "word": "Valuation",
    "ipa": "/valuation/",
    "partOfSpeech": "noun",
    "vietnamese": "Định giá trị doanh nghiệp",
    "category": "business",
    "level": "B2",
    "definition": "Valuation is a key concept in business. Giá trị ước tính toàn bộ công ty trên thị trường.",
    "example": "The team analyzed the valuation during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố định giá trị doanh nghiệp trong buổi đánh giá dự án.",
    "collocations": [
      "valuation analysis",
      "core valuation",
      "apply valuation"
    ],
    "mnemonic": "Giá trị ước tính toàn bộ công ty trên thị trường."
  },
  {
    "id": "business-17",
    "word": "Liquidity",
    "ipa": "/liquidity/",
    "partOfSpeech": "noun",
    "vietnamese": "Tính thanh khoản tiền mặt",
    "category": "business",
    "level": "B2",
    "definition": "Liquidity is a key concept in business. Khả năng chuyển đổi tài sản thành tiền mặt tức thì.",
    "example": "The team analyzed the liquidity during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tính thanh khoản tiền mặt trong buổi đánh giá dự án.",
    "collocations": [
      "liquidity analysis",
      "core liquidity",
      "apply liquidity"
    ],
    "mnemonic": "Khả năng chuyển đổi tài sản thành tiền mặt tức thì."
  },
  {
    "id": "business-18",
    "word": "Diversification",
    "ipa": "/diversification/",
    "partOfSpeech": "noun",
    "vietnamese": "Đa dạng hóa danh mục đầu tư",
    "category": "business",
    "level": "B2",
    "definition": "Diversification is a key concept in business. Không bỏ tất cả trứng vào một giỏ.",
    "example": "The team analyzed the diversification during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố đa dạng hóa danh mục đầu tư trong buổi đánh giá dự án.",
    "collocations": [
      "diversification analysis",
      "core diversification",
      "apply diversification"
    ],
    "mnemonic": "Không bỏ tất cả trứng vào một giỏ."
  },
  {
    "id": "business-19",
    "word": "Procurement",
    "ipa": "/procurement/",
    "partOfSpeech": "noun",
    "vietnamese": "Quy trình thu mua trang thiết bị",
    "category": "business",
    "level": "C1",
    "definition": "Procurement is a key concept in business. Bộ phận mua sắm vật tư cho toàn công ty.",
    "example": "The team analyzed the procurement during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố quy trình thu mua trang thiết bị trong buổi đánh giá dự án.",
    "collocations": [
      "procurement analysis",
      "core procurement",
      "apply procurement"
    ],
    "mnemonic": "Bộ phận mua sắm vật tư cho toàn công ty."
  },
  {
    "id": "business-20",
    "word": "Consortium",
    "ipa": "/kən'sɔ:tjəm/",
    "partOfSpeech": "noun",
    "vietnamese": "Tập đoàn liên doanh đấu thầu",
    "category": "business",
    "level": "C1",
    "definition": "Consortium is a key concept in business. Liên minh nhiều doanh nghiệp cùng làm đại dự án.",
    "example": "The team analyzed the consortium during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tập đoàn liên doanh đấu thầu trong buổi đánh giá dự án.",
    "collocations": [
      "consortium analysis",
      "core consortium",
      "apply consortium"
    ],
    "mnemonic": "Liên minh nhiều doanh nghiệp cùng làm đại dự án."
  },
  {
    "id": "business-21",
    "word": "Franchise",
    "ipa": "/'fræntʃaiz/",
    "partOfSpeech": "noun",
    "vietnamese": "Nhượng quyền thương mại",
    "category": "business",
    "level": "B1",
    "definition": "Franchise is a key concept in business. Mua quyền kinh doanh thương hiệu có sẵn.",
    "example": "The team analyzed the franchise during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố nhượng quyền thương mại trong buổi đánh giá dự án.",
    "collocations": [
      "franchise analysis",
      "core franchise",
      "apply franchise"
    ],
    "mnemonic": "Mua quyền kinh doanh thương hiệu có sẵn."
  },
  {
    "id": "business-22",
    "word": "Revenue",
    "ipa": "/revenue/",
    "partOfSpeech": "noun",
    "vietnamese": "Tổng doanh thu bán hàng",
    "category": "business",
    "level": "B1",
    "definition": "Revenue is a key concept in business. Tổng số tiền thu về trước khi trừ chi phí.",
    "example": "The team analyzed the revenue during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tổng doanh thu bán hàng trong buổi đánh giá dự án.",
    "collocations": [
      "revenue analysis",
      "core revenue",
      "apply revenue"
    ],
    "mnemonic": "Tổng số tiền thu về trước khi trừ chi phí."
  },
  {
    "id": "business-23",
    "word": "Profitability",
    "ipa": "/profitability/",
    "partOfSpeech": "noun",
    "vietnamese": "Khả năng sinh lời lợi nhuận",
    "category": "business",
    "level": "B2",
    "definition": "Profitability is a key concept in business. Tỷ lệ sinh lời của doanh nghiệp.",
    "example": "The team analyzed the profitability during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố khả năng sinh lời lợi nhuận trong buổi đánh giá dự án.",
    "collocations": [
      "profitability analysis",
      "core profitability",
      "apply profitability"
    ],
    "mnemonic": "Tỷ lệ sinh lời của doanh nghiệp."
  },
  {
    "id": "business-24",
    "word": "Incentive",
    "ipa": "/in'sentiv/",
    "partOfSpeech": "noun",
    "vietnamese": "Chính sách khen thưởng khích lệ",
    "category": "business",
    "level": "B2",
    "definition": "Incentive is a key concept in business. Phần thưởng động viên nhân viên cống hiến.",
    "example": "an incentive speech",
    "exampleVi": "bài nói chuyện khích lệ",
    "collocations": [
      "incentive analysis",
      "core incentive",
      "apply incentive"
    ],
    "mnemonic": "Phần thưởng động viên nhân viên cống hiến."
  },
  {
    "id": "business-25",
    "word": "Accountability",
    "ipa": "/accountability/",
    "partOfSpeech": "noun",
    "vietnamese": "Tinh thần chịu trách nhiệm",
    "category": "business",
    "level": "C1",
    "definition": "Accountability is a key concept in business. Sẵn sàng giải trình và chịu trách nhiệm về kết quả.",
    "example": "The team analyzed the accountability during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tinh thần chịu trách nhiệm trong buổi đánh giá dự án.",
    "collocations": [
      "accountability analysis",
      "core accountability",
      "apply accountability"
    ],
    "mnemonic": "Sẵn sàng giải trình và chịu trách nhiệm về kết quả."
  },
  {
    "id": "travel-1",
    "word": "Itinerary",
    "ipa": "/ai'tinərəri/",
    "partOfSpeech": "noun",
    "vietnamese": "Lịch trình chuyến đi chi tiết",
    "category": "travel",
    "level": "B1",
    "definition": "Itinerary is a key concept in travel. Bản kế hoạch chi tiết từng ngày từng giờ.",
    "example": "The team analyzed the itinerary during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố lịch trình chuyến đi chi tiết trong buổi đánh giá dự án.",
    "collocations": [
      "itinerary analysis",
      "core itinerary",
      "apply itinerary"
    ],
    "mnemonic": "Bản kế hoạch chi tiết từng ngày từng giờ."
  },
  {
    "id": "travel-2",
    "word": "Accommodation",
    "ipa": "/accommodation/",
    "partOfSpeech": "noun",
    "vietnamese": "Chỗ ở, nơi lưu trú",
    "category": "travel",
    "level": "B1",
    "definition": "Accommodation is a key concept in travel. Khách sạn, resort hoặc homestay.",
    "example": "The team analyzed the accommodation during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố chỗ ở, nơi lưu trú trong buổi đánh giá dự án.",
    "collocations": [
      "accommodation analysis",
      "core accommodation",
      "apply accommodation"
    ],
    "mnemonic": "Khách sạn, resort hoặc homestay."
  },
  {
    "id": "travel-3",
    "word": "Concierge",
    "ipa": "/concierge/",
    "partOfSpeech": "noun",
    "vietnamese": "Quản gia khách sạn / Hỗ trợ đặc biệt",
    "category": "travel",
    "level": "C1",
    "definition": "Concierge is a key concept in travel. Nhân viên hỗ trợ đặt vé, tour, bàn ăn VIP.",
    "example": "The team analyzed the concierge during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố quản gia khách sạn / hỗ trợ đặc biệt trong buổi đánh giá dự án.",
    "collocations": [
      "concierge analysis",
      "core concierge",
      "apply concierge"
    ],
    "mnemonic": "Nhân viên hỗ trợ đặt vé, tour, bàn ăn VIP."
  },
  {
    "id": "travel-4",
    "word": "Layover",
    "ipa": "/layover/",
    "partOfSpeech": "noun",
    "vietnamese": "Thời gian quá cảnh / Dừng nối chuyến",
    "category": "travel",
    "level": "B1",
    "definition": "Layover is a key concept in travel. Thời gian nghỉ chờ chuyến bay tiếp theo.",
    "example": "The team analyzed the layover during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố thời gian quá cảnh / dừng nối chuyến trong buổi đánh giá dự án.",
    "collocations": [
      "layover analysis",
      "core layover",
      "apply layover"
    ],
    "mnemonic": "Thời gian nghỉ chờ chuyến bay tiếp theo."
  },
  {
    "id": "travel-5",
    "word": "Complimentary",
    "ipa": "/,kɔmpli'mentəri/",
    "partOfSpeech": "adjective",
    "vietnamese": "Được tặng kèm miễn phí",
    "category": "travel",
    "level": "B2",
    "definition": "Complimentary is a key concept in travel. Dịch vụ miễn phí đính kèm từ khách sạn.",
    "example": "to be complimentary about somebody's work",
    "exampleVi": "ca ngợi việc làm của ai",
    "collocations": [
      "complimentary analysis",
      "core complimentary",
      "apply complimentary"
    ],
    "mnemonic": "Dịch vụ miễn phí đính kèm từ khách sạn."
  },
  {
    "id": "travel-6",
    "word": "Breathtaking",
    "ipa": "/breathtaking/",
    "partOfSpeech": "adjective",
    "vietnamese": "Đẹp đến nghẹt thở, ngoạn mục",
    "category": "travel",
    "level": "B2",
    "definition": "Breathtaking is a key concept in travel. Khung cảnh thiên nhiên kỳ vĩ choáng ngợp.",
    "example": "The team analyzed the breathtaking during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố đẹp đến nghẹt thở, ngoạn mục trong buổi đánh giá dự án.",
    "collocations": [
      "breathtaking analysis",
      "core breathtaking",
      "apply breathtaking"
    ],
    "mnemonic": "Khung cảnh thiên nhiên kỳ vĩ choáng ngợp."
  },
  {
    "id": "travel-7",
    "word": "Excursion",
    "ipa": "/iks'kə:ʃn/",
    "partOfSpeech": "noun",
    "vietnamese": "Chuyến dã ngoại / Tour tham quan ngắn",
    "category": "travel",
    "level": "B2",
    "definition": "Excursion is a key concept in travel. Tour đi chơi trong ngày kết hợp ngắm cảnh.",
    "example": "The team analyzed the excursion during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố chuyến dã ngoại / tour tham quan ngắn trong buổi đánh giá dự án.",
    "collocations": [
      "excursion analysis",
      "core excursion",
      "apply excursion"
    ],
    "mnemonic": "Tour đi chơi trong ngày kết hợp ngắm cảnh."
  },
  {
    "id": "travel-8",
    "word": "Hospitality",
    "ipa": "/,hɔspi'tæliti/",
    "partOfSpeech": "noun",
    "vietnamese": "Lòng hiếu khách / Ngành du lịch khách sạn",
    "category": "travel",
    "level": "B2",
    "definition": "Hospitality is a key concept in travel. Sự đón tiếp niềm nở, chu đáo.",
    "example": "The team analyzed the hospitality during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố lòng hiếu khách / ngành du lịch khách sạn trong buổi đánh giá dự án.",
    "collocations": [
      "hospitality analysis",
      "core hospitality",
      "apply hospitality"
    ],
    "mnemonic": "Sự đón tiếp niềm nở, chu đáo."
  },
  {
    "id": "travel-9",
    "word": "Jet Lag",
    "ipa": "/jet lag/",
    "partOfSpeech": "noun",
    "vietnamese": "Mệt mỏi do lệch múi giờ bay",
    "category": "travel",
    "level": "B1",
    "definition": "Jet Lag is a key concept in travel. Cơ thể chưa kịp thích nghi với múi giờ mới.",
    "example": "The team analyzed the jet lag during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố mệt mỏi do lệch múi giờ bay trong buổi đánh giá dự án.",
    "collocations": [
      "jet lag analysis",
      "core jet lag",
      "apply jet lag"
    ],
    "mnemonic": "Cơ thể chưa kịp thích nghi với múi giờ mới."
  },
  {
    "id": "travel-10",
    "word": "Customs",
    "ipa": "/customs/",
    "partOfSpeech": "noun",
    "vietnamese": "Cửa khẩu hải quan kiểm tra hành lý",
    "category": "travel",
    "level": "B1",
    "definition": "Customs is a key concept in travel. Nơi kiểm tra khai báo hàng hóa nhập cảnh.",
    "example": "to pay customs on something",
    "exampleVi": "đóng thuế nhập khẩu cái gì",
    "collocations": [
      "customs analysis",
      "core customs",
      "apply customs"
    ],
    "mnemonic": "Nơi kiểm tra khai báo hàng hóa nhập cảnh."
  },
  {
    "id": "travel-11",
    "word": "Baggage Claim",
    "ipa": "/baggage claim/",
    "partOfSpeech": "noun",
    "vietnamese": "Khu vực nhận hành lý ký gửi",
    "category": "travel",
    "level": "A2",
    "definition": "Baggage Claim is a key concept in travel. Băng chuyền hành lý sau khi hạ cánh.",
    "example": "The team analyzed the baggage claim during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố khu vực nhận hành lý ký gửi trong buổi đánh giá dự án.",
    "collocations": [
      "baggage claim analysis",
      "core baggage claim",
      "apply baggage claim"
    ],
    "mnemonic": "Băng chuyền hành lý sau khi hạ cánh."
  },
  {
    "id": "travel-12",
    "word": "Boarding Pass",
    "ipa": "/boarding pass/",
    "partOfSpeech": "noun",
    "vietnamese": "Thẻ lên máy bay",
    "category": "travel",
    "level": "A2",
    "definition": "Boarding Pass is a key concept in travel. Vé giấy/điện tử có số ghế và cổng bay.",
    "example": "The team analyzed the boarding pass during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố thẻ lên máy bay trong buổi đánh giá dự án.",
    "collocations": [
      "boarding pass analysis",
      "core boarding pass",
      "apply boarding pass"
    ],
    "mnemonic": "Vé giấy/điện tử có số ghế và cổng bay."
  },
  {
    "id": "travel-13",
    "word": "Embarkation",
    "ipa": "/em'bɑ:'keiʃn/",
    "partOfSpeech": "noun",
    "vietnamese": "Sự lên tàu / Lên máy bay",
    "category": "travel",
    "level": "B2",
    "definition": "Embarkation is a key concept in travel. Quá trình bước lên phương tiện khởi hành.",
    "example": "The team analyzed the embarkation during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố sự lên tàu / lên máy bay trong buổi đánh giá dự án.",
    "collocations": [
      "embarkation analysis",
      "core embarkation",
      "apply embarkation"
    ],
    "mnemonic": "Quá trình bước lên phương tiện khởi hành."
  },
  {
    "id": "travel-14",
    "word": "Disembarkation",
    "ipa": "/,disembɑ:'keiʃn/",
    "partOfSpeech": "noun",
    "vietnamese": "Sự xuống tàu / Rời máy bay",
    "category": "travel",
    "level": "B2",
    "definition": "Disembarkation is a key concept in travel. Bước xuống sau khi kết thúc hành trình.",
    "example": "The team analyzed the disembarkation during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố sự xuống tàu / rời máy bay trong buổi đánh giá dự án.",
    "collocations": [
      "disembarkation analysis",
      "core disembarkation",
      "apply disembarkation"
    ],
    "mnemonic": "Bước xuống sau khi kết thúc hành trình."
  },
  {
    "id": "travel-15",
    "word": "Souvenir",
    "ipa": "/'su:vəniə/",
    "partOfSpeech": "noun",
    "vietnamese": "Quà lưu niệm chuyến đi",
    "category": "travel",
    "level": "A2",
    "definition": "Souvenir is a key concept in travel. Món đồ mua về làm kỷ niệm chuyến du lịch.",
    "example": "The team analyzed the souvenir during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố quà lưu niệm chuyến đi trong buổi đánh giá dự án.",
    "collocations": [
      "souvenir analysis",
      "core souvenir",
      "apply souvenir"
    ],
    "mnemonic": "Món đồ mua về làm kỷ niệm chuyến du lịch."
  },
  {
    "id": "travel-16",
    "word": "Scenic",
    "ipa": "/'si:nik/ (scenical) /'si:nikəl/",
    "partOfSpeech": "adjective",
    "vietnamese": "Có phong cảnh đẹp như tranh",
    "category": "travel",
    "level": "B1",
    "definition": "Scenic is a key concept in travel. Tuyến đường có cảnh sắc thiên nhiên tuyệt đẹp.",
    "example": "The team analyzed the scenic during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố có phong cảnh đẹp như tranh trong buổi đánh giá dự án.",
    "collocations": [
      "scenic analysis",
      "core scenic",
      "apply scenic"
    ],
    "mnemonic": "Tuyến đường có cảnh sắc thiên nhiên tuyệt đẹp."
  },
  {
    "id": "travel-17",
    "word": "Ecotourism",
    "ipa": "/ecotourism/",
    "partOfSpeech": "noun",
    "vietnamese": "Du lịch sinh thái bảo vệ môi trường",
    "category": "travel",
    "level": "B2",
    "definition": "Ecotourism is a key concept in travel. Du lịch khám phá thiên nhiên có trách nhiệm.",
    "example": "The team analyzed the ecotourism during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố du lịch sinh thái bảo vệ môi trường trong buổi đánh giá dự án.",
    "collocations": [
      "ecotourism analysis",
      "core ecotourism",
      "apply ecotourism"
    ],
    "mnemonic": "Du lịch khám phá thiên nhiên có trách nhiệm."
  },
  {
    "id": "travel-18",
    "word": "Trekking",
    "ipa": "/trekking/",
    "partOfSpeech": "noun",
    "vietnamese": "Đi bộ leo núi đường trường",
    "category": "travel",
    "level": "B1",
    "definition": "Trekking is a key concept in travel. Hành trình đi bộ dã ngoại qua rừng núi.",
    "example": "The team analyzed the trekking during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố đi bộ leo núi đường trường trong buổi đánh giá dự án.",
    "collocations": [
      "trekking analysis",
      "core trekking",
      "apply trekking"
    ],
    "mnemonic": "Hành trình đi bộ dã ngoại qua rừng núi."
  },
  {
    "id": "travel-19",
    "word": "Expedition",
    "ipa": "/,ekspi'diʃn/",
    "partOfSpeech": "noun",
    "vietnamese": "Chuyến thám hiểm khoa học/vùng đất mới",
    "category": "travel",
    "level": "B2",
    "definition": "Expedition is a key concept in travel. Chuyến đi khám phá vùng đất xa xôi hoang sơ.",
    "example": "The team analyzed the expedition during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố chuyến thám hiểm khoa học/vùng đất mới trong buổi đánh giá dự án.",
    "collocations": [
      "expedition analysis",
      "core expedition",
      "apply expedition"
    ],
    "mnemonic": "Chuyến đi khám phá vùng đất xa xôi hoang sơ."
  },
  {
    "id": "daily-1",
    "word": "Procrastinate",
    "ipa": "/procrastinate/",
    "partOfSpeech": "verb",
    "vietnamese": "Trì hoãn việc cần làm",
    "category": "daily",
    "level": "B2",
    "definition": "Procrastinate is a key concept in daily. Thói quen lười để việc đến hạn chót.",
    "example": "The team analyzed the procrastinate during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố trì hoãn việc cần làm trong buổi đánh giá dự án.",
    "collocations": [
      "procrastinate analysis",
      "core procrastinate",
      "apply procrastinate"
    ],
    "mnemonic": "Thói quen lười để việc đến hạn chót."
  },
  {
    "id": "daily-2",
    "word": "Spontaneous",
    "ipa": "/spontaneous/",
    "partOfSpeech": "adjective",
    "vietnamese": "Ngẫu hứng, không lên kế hoạch trước",
    "category": "daily",
    "level": "B2",
    "definition": "Spontaneous is a key concept in daily. Thích là làm ngay tức khắc.",
    "example": "The team analyzed the spontaneous during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố ngẫu hứng, không lên kế hoạch trước trong buổi đánh giá dự án.",
    "collocations": [
      "spontaneous analysis",
      "core spontaneous",
      "apply spontaneous"
    ],
    "mnemonic": "Thích là làm ngay tức khắc."
  },
  {
    "id": "daily-3",
    "word": "Empathy",
    "ipa": "/'empəθi/",
    "partOfSpeech": "noun",
    "vietnamese": "Sự thấu cảm sâu sắc",
    "category": "daily",
    "level": "B2",
    "definition": "Empathy is a key concept in daily. Đặt trọn trái tim vào nỗi đau của người khác.",
    "example": "The team analyzed the empathy during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố sự thấu cảm sâu sắc trong buổi đánh giá dự án.",
    "collocations": [
      "empathy analysis",
      "core empathy",
      "apply empathy"
    ],
    "mnemonic": "Đặt trọn trái tim vào nỗi đau của người khác."
  },
  {
    "id": "daily-4",
    "word": "Resilient",
    "ipa": "/ri'ziliənt/",
    "partOfSpeech": "adjective",
    "vietnamese": "Kiên cường, mau hồi phục sau vấp ngã",
    "category": "daily",
    "level": "B2",
    "definition": "Resilient is a key concept in daily. Ngã bao nhiêu lần cũng bật dậy mạnh mẽ.",
    "example": "The team analyzed the resilient during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố kiên cường, mau hồi phục sau vấp ngã trong buổi đánh giá dự án.",
    "collocations": [
      "resilient analysis",
      "core resilient",
      "apply resilient"
    ],
    "mnemonic": "Ngã bao nhiêu lần cũng bật dậy mạnh mẽ."
  },
  {
    "id": "daily-5",
    "word": "Serendipity",
    "ipa": "/,seren'dipiti/",
    "partOfSpeech": "noun",
    "vietnamese": "Cơ duyên may mắn tình cờ",
    "category": "daily",
    "level": "C1",
    "definition": "Serendipity is a key concept in daily. Sự tình cờ mang đến niềm hạnh phúc bất ngờ.",
    "example": "The team analyzed the serendipity during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố cơ duyên may mắn tình cờ trong buổi đánh giá dự án.",
    "collocations": [
      "serendipity analysis",
      "core serendipity",
      "apply serendipity"
    ],
    "mnemonic": "Sự tình cờ mang đến niềm hạnh phúc bất ngờ."
  },
  {
    "id": "daily-6",
    "word": "Overwhelmed",
    "ipa": "/overwhelmed/",
    "partOfSpeech": "adjective",
    "vietnamese": "Bị quá tải, choáng ngợp",
    "category": "daily",
    "level": "B1",
    "definition": "Overwhelmed is a key concept in daily. Núi công việc đổ dồn khiến não nghẹt thở.",
    "example": "The team analyzed the overwhelmed during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố bị quá tải, choáng ngợp trong buổi đánh giá dự án.",
    "collocations": [
      "overwhelmed analysis",
      "core overwhelmed",
      "apply overwhelmed"
    ],
    "mnemonic": "Núi công việc đổ dồn khiến não nghẹt thở."
  },
  {
    "id": "daily-7",
    "word": "Nostalgia",
    "ipa": "/nɔs'tældʤiə/",
    "partOfSpeech": "noun",
    "vietnamese": "Nỗi hoài niệm da diết về quá khứ",
    "category": "daily",
    "level": "B2",
    "definition": "Nostalgia is a key concept in daily. Cảm giác bồi hồi khi nhớ về kỷ niệm tuổi thơ.",
    "example": "The team analyzed the nostalgia during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố nỗi hoài niệm da diết về quá khứ trong buổi đánh giá dự án.",
    "collocations": [
      "nostalgia analysis",
      "core nostalgia",
      "apply nostalgia"
    ],
    "mnemonic": "Cảm giác bồi hồi khi nhớ về kỷ niệm tuổi thơ."
  },
  {
    "id": "daily-8",
    "word": "Sincere",
    "ipa": "/sin'siə/",
    "partOfSpeech": "adjective",
    "vietnamese": "Chân thành từ đáy lòng",
    "category": "daily",
    "level": "B1",
    "definition": "Sincere is a key concept in daily. Chân thật không dối trá hay vụ lợi.",
    "example": "The team analyzed the sincere during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố chân thành từ đáy lòng trong buổi đánh giá dự án.",
    "collocations": [
      "sincere analysis",
      "core sincere",
      "apply sincere"
    ],
    "mnemonic": "Chân thật không dối trá hay vụ lợi."
  },
  {
    "id": "daily-9",
    "word": "Boundary",
    "ipa": "/boundary/",
    "partOfSpeech": "noun",
    "vietnamese": "Ranh giới cá nhân lành mạnh",
    "category": "daily",
    "level": "B2",
    "definition": "Boundary is a key concept in daily. Biết nói Không để bảo vệ không gian riêng.",
    "example": "The team analyzed the boundary during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố ranh giới cá nhân lành mạnh trong buổi đánh giá dự án.",
    "collocations": [
      "boundary analysis",
      "core boundary",
      "apply boundary"
    ],
    "mnemonic": "Biết nói Không để bảo vệ không gian riêng."
  },
  {
    "id": "daily-10",
    "word": "Gratitude",
    "ipa": "/'grætitju:d/",
    "partOfSpeech": "noun",
    "vietnamese": "Lòng biết ơn sâu sắc",
    "category": "daily",
    "level": "B1",
    "definition": "Gratitude is a key concept in daily. Trân trọng những điều tốt đẹp xung quanh.",
    "example": "to express one's deep gratitude to somebody",
    "exampleVi": "tỏ lòng biết ơn sâu sắc đối với ai",
    "collocations": [
      "gratitude analysis",
      "core gratitude",
      "apply gratitude"
    ],
    "mnemonic": "Trân trọng những điều tốt đẹp xung quanh."
  },
  {
    "id": "daily-11",
    "word": "Epiphany",
    "ipa": "/i'pifəni/",
    "partOfSpeech": "noun",
    "vietnamese": "Khoảnh khắc bừng tỉnh ngộ ra chân lý",
    "category": "daily",
    "level": "C1",
    "definition": "Epiphany is a key concept in daily. Đột nhiên đầu óc thông suốt một vấn đề lớn.",
    "example": "The team analyzed the epiphany during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố khoảnh khắc bừng tỉnh ngộ ra chân lý trong buổi đánh giá dự án.",
    "collocations": [
      "epiphany analysis",
      "core epiphany",
      "apply epiphany"
    ],
    "mnemonic": "Đột nhiên đầu óc thông suốt một vấn đề lớn."
  },
  {
    "id": "daily-12",
    "word": "Vulnerable",
    "ipa": "/'vʌlnərəbl/",
    "partOfSpeech": "adjective",
    "vietnamese": "Dễ bị tổn thương tâm lý",
    "category": "daily",
    "level": "B2",
    "definition": "Vulnerable is a key concept in daily. Mở lòng chia sẻ điểm yếu của bản thân.",
    "example": "vulnerable theory",
    "exampleVi": "thuyết có thể công kích được",
    "collocations": [
      "vulnerable analysis",
      "core vulnerable",
      "apply vulnerable"
    ],
    "mnemonic": "Mở lòng chia sẻ điểm yếu của bản thân."
  },
  {
    "id": "daily-13",
    "word": "Compassion",
    "ipa": "/kəm'pæʃn/",
    "partOfSpeech": "noun",
    "vietnamese": "Lòng trắc ẩn, xót thương",
    "category": "daily",
    "level": "B2",
    "definition": "Compassion is a key concept in daily. Tình yêu thương và mong muốn giúp đỡ người khó khăn.",
    "example": "to have (take) compassion on (upon somebody)",
    "exampleVi": "thương hại ai",
    "collocations": [
      "compassion analysis",
      "core compassion",
      "apply compassion"
    ],
    "mnemonic": "Tình yêu thương và mong muốn giúp đỡ người khó khăn."
  },
  {
    "id": "daily-14",
    "word": "Mindfulness",
    "ipa": "/mindfulness/",
    "partOfSpeech": "noun",
    "vietnamese": "Chánh niệm (sống trọn ở hiện tại)",
    "category": "daily",
    "level": "B2",
    "definition": "Mindfulness is a key concept in daily. Tập trung tâm trí vào giây phút hiện tại.",
    "example": "The team analyzed the mindfulness during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố chánh niệm (sống trọn ở hiện tại) trong buổi đánh giá dự án.",
    "collocations": [
      "mindfulness analysis",
      "core mindfulness",
      "apply mindfulness"
    ],
    "mnemonic": "Tập trung tâm trí vào giây phút hiện tại."
  },
  {
    "id": "daily-15",
    "word": "Introvert",
    "ipa": "/,introu'və:t/",
    "partOfSpeech": "noun",
    "vietnamese": "Người hướng nội",
    "category": "daily",
    "level": "B1",
    "definition": "Introvert is a key concept in daily. Nạp năng lượng khi ở một mình yên tĩnh.",
    "example": "The team analyzed the introvert during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố người hướng nội trong buổi đánh giá dự án.",
    "collocations": [
      "introvert analysis",
      "core introvert",
      "apply introvert"
    ],
    "mnemonic": "Nạp năng lượng khi ở một mình yên tĩnh."
  },
  {
    "id": "daily-16",
    "word": "Extrovert",
    "ipa": "/extrovert/",
    "partOfSpeech": "noun",
    "vietnamese": "Người hướng ngoại",
    "category": "daily",
    "level": "B1",
    "definition": "Extrovert is a key concept in daily. Thích giao lưu, nạp năng lượng từ đám đông.",
    "example": "The team analyzed the extrovert during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố người hướng ngoại trong buổi đánh giá dự án.",
    "collocations": [
      "extrovert analysis",
      "core extrovert",
      "apply extrovert"
    ],
    "mnemonic": "Thích giao lưu, nạp năng lượng từ đám đông."
  },
  {
    "id": "daily-17",
    "word": "Optimism",
    "ipa": "/'ɔptimizm/",
    "partOfSpeech": "noun",
    "vietnamese": "Tinh thần lạc quan yêu đời",
    "category": "daily",
    "level": "B1",
    "definition": "Optimism is a key concept in daily. Luôn nhìn về mặt tích cực của cuộc sống.",
    "example": "revolutionary optimism",
    "exampleVi": "lạc quan cách mạng",
    "collocations": [
      "optimism analysis",
      "core optimism",
      "apply optimism"
    ],
    "mnemonic": "Luôn nhìn về mặt tích cực của cuộc sống."
  },
  {
    "id": "daily-18",
    "word": "Pessimism",
    "ipa": "/'pesimizm/",
    "partOfSpeech": "noun",
    "vietnamese": "Thái độ bi quan tiêu cực",
    "category": "daily",
    "level": "B2",
    "definition": "Pessimism is a key concept in daily. Luôn lo lắng về viễn cảnh xấu nhất.",
    "example": "The team analyzed the pessimism during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố thái độ bi quan tiêu cực trong buổi đánh giá dự án.",
    "collocations": [
      "pessimism analysis",
      "core pessimism",
      "apply pessimism"
    ],
    "mnemonic": "Luôn lo lắng về viễn cảnh xấu nhất."
  },
  {
    "id": "daily-19",
    "word": "Authenticity",
    "ipa": "/authenticity/",
    "partOfSpeech": "noun",
    "vietnamese": "Tính chân thật, là chính mình",
    "category": "daily",
    "level": "C1",
    "definition": "Authenticity is a key concept in daily. Sống thật với cảm xúc và giá trị của bản thân.",
    "example": "The team analyzed the authenticity during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tính chân thật, là chính mình trong buổi đánh giá dự án.",
    "collocations": [
      "authenticity analysis",
      "core authenticity",
      "apply authenticity"
    ],
    "mnemonic": "Sống thật với cảm xúc và giá trị của bản thân."
  },
  {
    "id": "academic-1",
    "word": "Discrepancy",
    "ipa": "/discrepancy/",
    "partOfSpeech": "noun",
    "vietnamese": "Sự sai lệch giữa hai nguồn dữ liệu",
    "category": "academic",
    "level": "C1",
    "definition": "Discrepancy is a key concept in academic. Hai con số đối chiếu không khớp.",
    "example": "The team analyzed the discrepancy during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố sự sai lệch giữa hai nguồn dữ liệu trong buổi đánh giá dự án.",
    "collocations": [
      "discrepancy analysis",
      "core discrepancy",
      "apply discrepancy"
    ],
    "mnemonic": "Hai con số đối chiếu không khớp."
  },
  {
    "id": "academic-2",
    "word": "Ubiquitous",
    "ipa": "/ju:'bikwitəs/",
    "partOfSpeech": "adjective",
    "vietnamese": "Hiện diện ở khắp mọi nơi",
    "category": "academic",
    "level": "C1",
    "definition": "Ubiquitous is a key concept in academic. Có mặt ở khắp nơi trong đời sống.",
    "example": "The team analyzed the ubiquitous during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố hiện diện ở khắp mọi nơi trong buổi đánh giá dự án.",
    "collocations": [
      "ubiquitous analysis",
      "core ubiquitous",
      "apply ubiquitous"
    ],
    "mnemonic": "Có mặt ở khắp nơi trong đời sống."
  },
  {
    "id": "academic-3",
    "word": "Empirical",
    "ipa": "/em'pirikəl/",
    "partOfSpeech": "adjective",
    "vietnamese": "Dựa trên thực nghiệm, số liệu thực tế",
    "category": "academic",
    "level": "C1",
    "definition": "Empirical is a key concept in academic. Dựa vào thí nghiệm chứ không nói suông.",
    "example": "The team analyzed the empirical during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố dựa trên thực nghiệm, số liệu thực tế trong buổi đánh giá dự án.",
    "collocations": [
      "empirical analysis",
      "core empirical",
      "apply empirical"
    ],
    "mnemonic": "Dựa vào thí nghiệm chứ không nói suông."
  },
  {
    "id": "academic-4",
    "word": "Paradigm",
    "ipa": "/paradigm/",
    "partOfSpeech": "noun",
    "vietnamese": "Hệ hình, mô hình mẫu chuẩn mực",
    "category": "academic",
    "level": "C1",
    "definition": "Paradigm is a key concept in academic. Mô hình tư duy nền tảng của một lĩnh vực.",
    "example": "The team analyzed the paradigm during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố hệ hình, mô hình mẫu chuẩn mực trong buổi đánh giá dự án.",
    "collocations": [
      "paradigm analysis",
      "core paradigm",
      "apply paradigm"
    ],
    "mnemonic": "Mô hình tư duy nền tảng của một lĩnh vực."
  },
  {
    "id": "academic-5",
    "word": "Substantiate",
    "ipa": "/səb'stænʃieit/",
    "partOfSpeech": "verb",
    "vietnamese": "Chứng minh bằng chứng cứ xác thực",
    "category": "academic",
    "level": "C1",
    "definition": "Substantiate is a key concept in academic. Đưa ra số liệu cụ thể để bảo vệ luận điểm.",
    "example": "to substantiate a report",
    "exampleVi": "chứng minh một bản báo cáo",
    "collocations": [
      "substantiate analysis",
      "core substantiate",
      "apply substantiate"
    ],
    "mnemonic": "Đưa ra số liệu cụ thể để bảo vệ luận điểm."
  },
  {
    "id": "academic-6",
    "word": "Proliferation",
    "ipa": "/proliferation/",
    "partOfSpeech": "noun",
    "vietnamese": "Sự bùng nổ gia tăng số lượng nhanh chóng",
    "category": "academic",
    "level": "C1",
    "definition": "Proliferation is a key concept in academic. Sinh sôi nảy nở theo cấp số nhân.",
    "example": "The team analyzed the proliferation during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố sự bùng nổ gia tăng số lượng nhanh chóng trong buổi đánh giá dự án.",
    "collocations": [
      "proliferation analysis",
      "core proliferation",
      "apply proliferation"
    ],
    "mnemonic": "Sinh sôi nảy nở theo cấp số nhân."
  },
  {
    "id": "academic-7",
    "word": "Exacerbate",
    "ipa": "/eks'æsə:beit/ (acerbate) /'æsəbeit/",
    "partOfSpeech": "verb",
    "vietnamese": "Làm trầm trọng thêm vấn đề / căn bệnh",
    "category": "academic",
    "level": "C1",
    "definition": "Exacerbate is a key concept in academic. Đổ thêm dầu vào lửa khiến tình hình tồi tệ hơn.",
    "example": "The team analyzed the exacerbate during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố làm trầm trọng thêm vấn đề / căn bệnh trong buổi đánh giá dự án.",
    "collocations": [
      "exacerbate analysis",
      "core exacerbate",
      "apply exacerbate"
    ],
    "mnemonic": "Đổ thêm dầu vào lửa khiến tình hình tồi tệ hơn."
  },
  {
    "id": "academic-8",
    "word": "Alleviate",
    "ipa": "/alleviate/",
    "partOfSpeech": "verb",
    "vietnamese": "Làm dịu bớt, giảm nhẹ gánh nặng",
    "category": "academic",
    "level": "B2",
    "definition": "Alleviate is a key concept in academic. Xoa dịu bớt nỗi đau và áp lực.",
    "example": "The team analyzed the alleviate during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố làm dịu bớt, giảm nhẹ gánh nặng trong buổi đánh giá dự án.",
    "collocations": [
      "alleviate analysis",
      "core alleviate",
      "apply alleviate"
    ],
    "mnemonic": "Xoa dịu bớt nỗi đau và áp lực."
  },
  {
    "id": "academic-9",
    "word": "Juxtaposition",
    "ipa": "/,dʤʌkstəpə'ziʃn/",
    "partOfSpeech": "noun",
    "vietnamese": "Sự đặt cạnh nhau để làm nổi bật tương phản",
    "category": "academic",
    "level": "C2",
    "definition": "Juxtaposition is a key concept in academic. Đặt 2 mảng sáng tối cạnh nhau để so sánh.",
    "example": "The team analyzed the juxtaposition during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố sự đặt cạnh nhau để làm nổi bật tương phản trong buổi đánh giá dự án.",
    "collocations": [
      "juxtaposition analysis",
      "core juxtaposition",
      "apply juxtaposition"
    ],
    "mnemonic": "Đặt 2 mảng sáng tối cạnh nhau để so sánh."
  },
  {
    "id": "academic-10",
    "word": "Plausible",
    "ipa": "/plausible/",
    "partOfSpeech": "adjective",
    "vietnamese": "Hợp lý, đáng tin cậy",
    "category": "academic",
    "level": "B2",
    "definition": "Plausible is a key concept in academic. Nghe rất có lý và có căn cứ thuyết phục.",
    "example": "The team analyzed the plausible during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố hợp lý, đáng tin cậy trong buổi đánh giá dự án.",
    "collocations": [
      "plausible analysis",
      "core plausible",
      "apply plausible"
    ],
    "mnemonic": "Nghe rất có lý và có căn cứ thuyết phục."
  },
  {
    "id": "academic-11",
    "word": "Hypothesis",
    "ipa": "/hypothesis/",
    "partOfSpeech": "noun",
    "vietnamese": "Giả thuyết khoa học",
    "category": "academic",
    "level": "B2",
    "definition": "Hypothesis is a key concept in academic. Nhận định ban đầu cần làm thí nghiệm để kiểm chứng.",
    "example": "The team analyzed the hypothesis during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố giả thuyết khoa học trong buổi đánh giá dự án.",
    "collocations": [
      "hypothesis analysis",
      "core hypothesis",
      "apply hypothesis"
    ],
    "mnemonic": "Nhận định ban đầu cần làm thí nghiệm để kiểm chứng."
  },
  {
    "id": "academic-12",
    "word": "Correlation",
    "ipa": "/correlation/",
    "partOfSpeech": "noun",
    "vietnamese": "Mối tương quan giữa các biến số",
    "category": "academic",
    "level": "B2",
    "definition": "Correlation is a key concept in academic. Hai hiện tượng cùng tăng hoặc cùng giảm với nhau.",
    "example": "The team analyzed the correlation during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố mối tương quan giữa các biến số trong buổi đánh giá dự án.",
    "collocations": [
      "correlation analysis",
      "core correlation",
      "apply correlation"
    ],
    "mnemonic": "Hai hiện tượng cùng tăng hoặc cùng giảm với nhau."
  },
  {
    "id": "academic-13",
    "word": "Causation",
    "ipa": "/causation/",
    "partOfSpeech": "noun",
    "vietnamese": "Quan hệ nhân quả trực tiếp",
    "category": "academic",
    "level": "C1",
    "definition": "Causation is a key concept in academic. Cái này là nguyên nhân trực tiếp sinh ra cái kia.",
    "example": "The team analyzed the causation during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố quan hệ nhân quả trực tiếp trong buổi đánh giá dự án.",
    "collocations": [
      "causation analysis",
      "core causation",
      "apply causation"
    ],
    "mnemonic": "Cái này là nguyên nhân trực tiếp sinh ra cái kia."
  },
  {
    "id": "academic-14",
    "word": "Methodology",
    "ipa": "/methodology/",
    "partOfSpeech": "noun",
    "vietnamese": "Phương pháp luận nghiên cứu",
    "category": "academic",
    "level": "B2",
    "definition": "Methodology is a key concept in academic. Hệ thống các phương pháp thực hiện luận án.",
    "example": "The team analyzed the methodology during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố phương pháp luận nghiên cứu trong buổi đánh giá dự án.",
    "collocations": [
      "methodology analysis",
      "core methodology",
      "apply methodology"
    ],
    "mnemonic": "Hệ thống các phương pháp thực hiện luận án."
  },
  {
    "id": "academic-15",
    "word": "Synthesize",
    "ipa": "/synthesize/",
    "partOfSpeech": "verb",
    "vietnamese": "Tổng hợp và đúc kết thông tin",
    "category": "academic",
    "level": "C1",
    "definition": "Synthesize is a key concept in academic. Đọc nhiều nguồn tài liệu rồi đúc kết thành ý mới.",
    "example": "The team analyzed the synthesize during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tổng hợp và đúc kết thông tin trong buổi đánh giá dự án.",
    "collocations": [
      "synthesize analysis",
      "core synthesize",
      "apply synthesize"
    ],
    "mnemonic": "Đọc nhiều nguồn tài liệu rồi đúc kết thành ý mới."
  },
  {
    "id": "academic-16",
    "word": "Comprehensive",
    "ipa": "/,kɔmpri'hensiv/",
    "partOfSpeech": "adjective",
    "vietnamese": "Toàn diện, bao quát mọi mặt",
    "category": "academic",
    "level": "B2",
    "definition": "Comprehensive is a key concept in academic. Đầy đủ tất cả các khía cạnh không bỏ sót.",
    "example": "a comprehensive term",
    "exampleVi": "một thuật ngữ bao hàm nhiều khái niệm",
    "collocations": [
      "comprehensive analysis",
      "core comprehensive",
      "apply comprehensive"
    ],
    "mnemonic": "Đầy đủ tất cả các khía cạnh không bỏ sót."
  },
  {
    "id": "academic-17",
    "word": "Anomalous",
    "ipa": "/anomalous/",
    "partOfSpeech": "adjective",
    "vietnamese": "Bất thường, dị thường so với quy luật",
    "category": "academic",
    "level": "C1",
    "definition": "Anomalous is a key concept in academic. Khác biệt hoàn toàn so với mẫu số chung.",
    "example": "The team analyzed the anomalous during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố bất thường, dị thường so với quy luật trong buổi đánh giá dự án.",
    "collocations": [
      "anomalous analysis",
      "core anomalous",
      "apply anomalous"
    ],
    "mnemonic": "Khác biệt hoàn toàn so với mẫu số chung."
  },
  {
    "id": "academic-18",
    "word": "Pragmatic",
    "ipa": "/præg'mætik/",
    "partOfSpeech": "adjective",
    "vietnamese": "Mang tính thực dụng, coi trọng thực tế",
    "category": "academic",
    "level": "C1",
    "definition": "Pragmatic is a key concept in academic. Giải quyết vấn đề dựa trên hiệu quả thực tiễn.",
    "example": "pragmatic history",
    "exampleVi": "sử căn cứ vào sự thực",
    "collocations": [
      "pragmatic analysis",
      "core pragmatic",
      "apply pragmatic"
    ],
    "mnemonic": "Giải quyết vấn đề dựa trên hiệu quả thực tiễn."
  },
  {
    "id": "academic-19",
    "word": "Nuance",
    "ipa": "/nju:'Ỵ:ns/",
    "partOfSpeech": "noun",
    "vietnamese": "Sắc thái tinh tế, khác biệt nhỏ",
    "category": "academic",
    "level": "C1",
    "definition": "Nuance is a key concept in academic. Sự khác biệt nhỏ nhưng quan trọng về ý nghĩa.",
    "example": "The team analyzed the nuance during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố sắc thái tinh tế, khác biệt nhỏ trong buổi đánh giá dự án.",
    "collocations": [
      "nuance analysis",
      "core nuance",
      "apply nuance"
    ],
    "mnemonic": "Sự khác biệt nhỏ nhưng quan trọng về ý nghĩa."
  },
  {
    "id": "health-1",
    "word": "Cardiovascular",
    "ipa": "/cardiovascular/",
    "partOfSpeech": "adjective",
    "vietnamese": "Thuộc về tim và hệ mạch máu",
    "category": "health",
    "level": "B2",
    "definition": "Cardiovascular is a key concept in health. Hệ tuần hoàn tim mạch.",
    "example": "The team analyzed the cardiovascular during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố thuộc về tim và hệ mạch máu trong buổi đánh giá dự án.",
    "collocations": [
      "cardiovascular analysis",
      "core cardiovascular",
      "apply cardiovascular"
    ],
    "mnemonic": "Hệ tuần hoàn tim mạch."
  },
  {
    "id": "health-2",
    "word": "Rehabilitation",
    "ipa": "/'ri:ə,bili'teiʃn/",
    "partOfSpeech": "noun",
    "vietnamese": "Phục hồi chức năng sau chấn thương",
    "category": "health",
    "level": "B2",
    "definition": "Rehabilitation is a key concept in health. Tập vật lý trị liệu để cử động bình thường.",
    "example": "The team analyzed the rehabilitation during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố phục hồi chức năng sau chấn thương trong buổi đánh giá dự án.",
    "collocations": [
      "rehabilitation analysis",
      "core rehabilitation",
      "apply rehabilitation"
    ],
    "mnemonic": "Tập vật lý trị liệu để cử động bình thường."
  },
  {
    "id": "health-3",
    "word": "Sedentary",
    "ipa": "/'sedntəri/",
    "partOfSpeech": "adjective",
    "vietnamese": "Ít vận động, ngồi lì một chỗ",
    "category": "health",
    "level": "B2",
    "definition": "Sedentary is a key concept in health. Ngồi ghế dính chặt 8 tiếng mỗi ngày.",
    "example": "sedentary posture",
    "exampleVi": "tư thế ngồi",
    "collocations": [
      "sedentary analysis",
      "core sedentary",
      "apply sedentary"
    ],
    "mnemonic": "Ngồi ghế dính chặt 8 tiếng mỗi ngày."
  },
  {
    "id": "health-4",
    "word": "Prescription",
    "ipa": "/pris'kripʃn/",
    "partOfSpeech": "noun",
    "vietnamese": "Đơn thuốc do bác sĩ kê",
    "category": "health",
    "level": "B1",
    "definition": "Prescription is a key concept in health. Toa thuốc chỉ định loại thuốc và liều dùng.",
    "example": "The team analyzed the prescription during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố đơn thuốc do bác sĩ kê trong buổi đánh giá dự án.",
    "collocations": [
      "prescription analysis",
      "core prescription",
      "apply prescription"
    ],
    "mnemonic": "Toa thuốc chỉ định loại thuốc và liều dùng."
  },
  {
    "id": "health-5",
    "word": "Metabolism",
    "ipa": "/me'tæbəlizm/",
    "partOfSpeech": "noun",
    "vietnamese": "Quá trình trao đổi chất và đốt calo",
    "category": "health",
    "level": "B2",
    "definition": "Metabolism is a key concept in health. Bộ máy đốt cháy năng lượng của cơ thể.",
    "example": "The team analyzed the metabolism during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố quá trình trao đổi chất và đốt calo trong buổi đánh giá dự án.",
    "collocations": [
      "metabolism analysis",
      "core metabolism",
      "apply metabolism"
    ],
    "mnemonic": "Bộ máy đốt cháy năng lượng của cơ thể."
  },
  {
    "id": "health-6",
    "word": "Preventive",
    "ipa": "/pri'ventiv/ (preventative) /pri'ventətiv/",
    "partOfSpeech": "adjective",
    "vietnamese": "Mang tính phòng ngừa trước khi phát bệnh",
    "category": "health",
    "level": "B2",
    "definition": "Preventive is a key concept in health. Phòng bệnh hơn chữa bệnh.",
    "example": "preventive measure",
    "exampleVi": "biện pháp phòng ngừa",
    "collocations": [
      "preventive analysis",
      "core preventive",
      "apply preventive"
    ],
    "mnemonic": "Phòng bệnh hơn chữa bệnh."
  },
  {
    "id": "health-7",
    "word": "Immunity",
    "ipa": "/i'mju:niti/",
    "partOfSpeech": "noun",
    "vietnamese": "Hệ miễn dịch, sức đề kháng",
    "category": "health",
    "level": "B2",
    "definition": "Immunity is a key concept in health. Lá chắn sinh học bảo vệ cơ thể chống vi khuẩn.",
    "example": "immunity from taxation",
    "exampleVi": "sự được miễm thuế",
    "collocations": [
      "immunity analysis",
      "core immunity",
      "apply immunity"
    ],
    "mnemonic": "Lá chắn sinh học bảo vệ cơ thể chống vi khuẩn."
  },
  {
    "id": "health-8",
    "word": "Therapeutic",
    "ipa": "/,θerə'pju:tik/ (therapeutical) /,θerə'pju:tikəl/",
    "partOfSpeech": "adjective",
    "vietnamese": "Có tác dụng trị liệu và chữa lành",
    "category": "health",
    "level": "B2",
    "definition": "Therapeutic is a key concept in health. Liệu pháp xoa dịu thể xác và tâm trí.",
    "example": "The team analyzed the therapeutic during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố có tác dụng trị liệu và chữa lành trong buổi đánh giá dự án.",
    "collocations": [
      "therapeutic analysis",
      "core therapeutic",
      "apply therapeutic"
    ],
    "mnemonic": "Liệu pháp xoa dịu thể xác và tâm trí."
  },
  {
    "id": "health-9",
    "word": "Hygiene",
    "ipa": "/'haidʤi:n/",
    "partOfSpeech": "noun",
    "vietnamese": "Vệ sinh phòng dịch và sức khỏe",
    "category": "health",
    "level": "B1",
    "definition": "Hygiene is a key concept in health. Giữ gìn vệ sinh sạch sẽ để vi khuẩn không xâm nhập.",
    "example": "The team analyzed the hygiene during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố vệ sinh phòng dịch và sức khỏe trong buổi đánh giá dự án.",
    "collocations": [
      "hygiene analysis",
      "core hygiene",
      "apply hygiene"
    ],
    "mnemonic": "Giữ gìn vệ sinh sạch sẽ để vi khuẩn không xâm nhập."
  },
  {
    "id": "health-10",
    "word": "Diagnosis",
    "ipa": "/diagnosis/",
    "partOfSpeech": "noun",
    "vietnamese": "Sự chẩn đoán bệnh chính xác",
    "category": "health",
    "level": "B2",
    "definition": "Diagnosis is a key concept in health. Bác sĩ kết luận chính xác bệnh sau khi xét nghiệm.",
    "example": "The team analyzed the diagnosis during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố sự chẩn đoán bệnh chính xác trong buổi đánh giá dự án.",
    "collocations": [
      "diagnosis analysis",
      "core diagnosis",
      "apply diagnosis"
    ],
    "mnemonic": "Bác sĩ kết luận chính xác bệnh sau khi xét nghiệm."
  },
  {
    "id": "health-11",
    "word": "Symptom",
    "ipa": "/symptom/",
    "partOfSpeech": "noun",
    "vietnamese": "Triệu chứng biểu hiện của bệnh",
    "category": "health",
    "level": "B1",
    "definition": "Symptom is a key concept in health. Dấu hiệu như sốt, ho, đau đầu báo hiệu cơ thể bất ổn.",
    "example": "The team analyzed the symptom during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố triệu chứng biểu hiện của bệnh trong buổi đánh giá dự án.",
    "collocations": [
      "symptom analysis",
      "core symptom",
      "apply symptom"
    ],
    "mnemonic": "Dấu hiệu như sốt, ho, đau đầu báo hiệu cơ thể bất ổn."
  },
  {
    "id": "health-12",
    "word": "Chronic",
    "ipa": "/'krɔnik/",
    "partOfSpeech": "adjective",
    "vietnamese": "Mãn tính (kéo dài kinh niên)",
    "category": "health",
    "level": "B2",
    "definition": "Chronic is a key concept in health. Bệnh kéo dài nhiều tháng nhiều năm không dứt.",
    "example": "a chronic disease",
    "exampleVi": "bệnh mạn",
    "collocations": [
      "chronic analysis",
      "core chronic",
      "apply chronic"
    ],
    "mnemonic": "Bệnh kéo dài nhiều tháng nhiều năm không dứt."
  },
  {
    "id": "health-13",
    "word": "Acute",
    "ipa": "/acute/",
    "partOfSpeech": "adjective",
    "vietnamese": "Cấp tính (bộc phát dữ dội đột ngột)",
    "category": "health",
    "level": "B2",
    "definition": "Acute is a key concept in health. Cơn đau bùng phát dữ dội cần cấp cứu ngay.",
    "example": "The team analyzed the acute during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố cấp tính (bộc phát dữ dội đột ngột) trong buổi đánh giá dự án.",
    "collocations": [
      "acute analysis",
      "core acute",
      "apply acute"
    ],
    "mnemonic": "Cơn đau bùng phát dữ dội cần cấp cứu ngay."
  },
  {
    "id": "health-14",
    "word": "Prognosis",
    "ipa": "/prognosis/",
    "partOfSpeech": "noun",
    "vietnamese": "Tiên lượng khả năng hồi phục bệnh",
    "category": "health",
    "level": "C1",
    "definition": "Prognosis is a key concept in health. Dự đoán của bác sĩ về tiến triển bệnh sau điều trị.",
    "example": "The team analyzed the prognosis during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố tiên lượng khả năng hồi phục bệnh trong buổi đánh giá dự án.",
    "collocations": [
      "prognosis analysis",
      "core prognosis",
      "apply prognosis"
    ],
    "mnemonic": "Dự đoán của bác sĩ về tiến triển bệnh sau điều trị."
  },
  {
    "id": "health-15",
    "word": "Epidemic",
    "ipa": "/,epi'demik/",
    "partOfSpeech": "noun",
    "vietnamese": "Dịch bệnh lây lan nhanh chóng",
    "category": "health",
    "level": "B2",
    "definition": "Epidemic is a key concept in health. Căn bệnh lây truyền cho số đông người trong khu vực.",
    "example": "an epidemic disease",
    "exampleVi": "bệnh dịch",
    "collocations": [
      "epidemic analysis",
      "core epidemic",
      "apply epidemic"
    ],
    "mnemonic": "Căn bệnh lây truyền cho số đông người trong khu vực."
  },
  {
    "id": "health-16",
    "word": "Inflammation",
    "ipa": "/,inflə'meiʃn/",
    "partOfSpeech": "noun",
    "vietnamese": "Phản ứng viêm sưng tấy",
    "category": "health",
    "level": "B2",
    "definition": "Inflammation is a key concept in health. Cơ thể sưng đỏ tự vệ khi bị tổn thương.",
    "example": "The team analyzed the inflammation during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố phản ứng viêm sưng tấy trong buổi đánh giá dự án.",
    "collocations": [
      "inflammation analysis",
      "core inflammation",
      "apply inflammation"
    ],
    "mnemonic": "Cơ thể sưng đỏ tự vệ khi bị tổn thương."
  },
  {
    "id": "health-17",
    "word": "Antibiotic",
    "ipa": "/'æntibai'ɔtik/",
    "partOfSpeech": "noun",
    "vietnamese": "Thuốc kháng sinh diệt vi khuẩn",
    "category": "health",
    "level": "B1",
    "definition": "Antibiotic is a key concept in health. Thuốc đặc trị tiêu diệt vi khuẩn gây nhiễm trùng.",
    "example": "The team analyzed the antibiotic during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố thuốc kháng sinh diệt vi khuẩn trong buổi đánh giá dự án.",
    "collocations": [
      "antibiotic analysis",
      "core antibiotic",
      "apply antibiotic"
    ],
    "mnemonic": "Thuốc đặc trị tiêu diệt vi khuẩn gây nhiễm trùng."
  },
  {
    "id": "health-18",
    "word": "Anesthesia",
    "ipa": "/,ænis'θi:zjə/ (anesthesia) /,ænis'θetik/",
    "partOfSpeech": "noun",
    "vietnamese": "Gây mê / Thuốc tê giảm đau",
    "category": "health",
    "level": "C1",
    "definition": "Anesthesia is a key concept in health. Làm mất cảm giác đau đớn khi phẫu thuật.",
    "example": "The team analyzed the anesthesia during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố gây mê / thuốc tê giảm đau trong buổi đánh giá dự án.",
    "collocations": [
      "anesthesia analysis",
      "core anesthesia",
      "apply anesthesia"
    ],
    "mnemonic": "Làm mất cảm giác đau đớn khi phẫu thuật."
  },
  {
    "id": "health-19",
    "word": "Nutrient",
    "ipa": "/'nju:triənt/",
    "partOfSpeech": "noun",
    "vietnamese": "Chất dinh dưỡng nuôi cơ thể",
    "category": "health",
    "level": "B1",
    "definition": "Nutrient is a key concept in health. Vitamin, protein, khoáng chất trong thực phẩm.",
    "example": "The team analyzed the nutrient during the project review.",
    "exampleVi": "Đội ngũ đã phân tích yếu tố chất dinh dưỡng nuôi cơ thể trong buổi đánh giá dự án.",
    "collocations": [
      "nutrient analysis",
      "core nutrient",
      "apply nutrient"
    ],
    "mnemonic": "Vitamin, protein, khoáng chất trong thực phẩm."
  }
];
