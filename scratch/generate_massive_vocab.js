import fs from 'fs';
import path from 'path';

// Let's create an extensive list of specialized terms for each domain
const itWords = [
  { word: 'Scalability', vi: 'Khả năng mở rộng hệ thống', level: 'B2', pos: 'noun', m: 'Khả năng hệ thống tăng quy mô mà không sập.' },
  { word: 'Deployment', vi: 'Triển khai phần mềm lên server', level: 'B1', pos: 'noun', m: 'Đưa code từ máy cá nhân lên server production.' },
  { word: 'Vulnerability', vi: 'Lỗ hổng bảo mật, điểm yếu', level: 'B2', pos: 'noun', m: 'Kẽ hở để hacker tấn công.' },
  { word: 'Refactoring', vi: 'Tái cấu trúc mã nguồn', level: 'B2', pos: 'noun', m: 'Dọn dẹp code cho gọn mà app vẫn chạy như cũ.' },
  { word: 'Latency', vi: 'Độ trễ truyền dữ liệu mạng', level: 'B2', pos: 'noun', m: 'Thời gian chờ đợi dữ liệu phản hồi từ máy chủ.' },
  { word: 'Deprecate', vi: 'Khai tử, ngưng hỗ trợ tính năng cũ', level: 'C1', pos: 'verb', m: 'Không khuyến khích dùng nữa, chuẩn bị xóa bỏ.' },
  { word: 'Microservices', vi: 'Kiến trúc dịch vụ siêu nhỏ', level: 'B2', pos: 'noun', m: 'Chia nhỏ app thành các dịch vụ độc lập.' },
  { word: 'Asynchronous', vi: 'Bất đồng bộ (không chặn tiến trình)', level: 'B2', pos: 'adjective', m: 'Xử lý ngầm, không bắt người dùng đứng đợi.' },
  { word: 'Idempotent', vi: 'Bất biến khi lặp lại', level: 'C1', pos: 'adjective', m: 'Gọi nhiều lần kết quả trạng thái vẫn như một.' },
  { word: 'Containerization', vi: 'Đóng gói ứng dụng vào container (Docker)', level: 'B2', pos: 'noun', m: 'Gói code + thư viện vào thùng Docker chạy mọi nơi.' },
  { word: 'Concurrency', vi: 'Xử lý đồng thời nhiều tác vụ', level: 'C1', pos: 'noun', m: 'Nhiều luồng chạy đan xen thông minh.' },
  { word: 'Telemetry', vi: 'Đo lường giám sát dữ liệu từ xa', level: 'C1', pos: 'noun', m: 'Theo dõi chỉ số CPU/RAM/traffic từ xa.' },
  { word: 'Polymorphism', vi: 'Tính đa hình (OOP)', level: 'C1', pos: 'noun', m: 'Cùng 1 hàm nhưng mỗi đối tượng xử lý riêng.' },
  { word: 'Middleware', vi: 'Phần mềm trung gian xử lý request', level: 'B2', pos: 'noun', m: 'Người gác cổng kiểm tra bảo mật ở giữa.' },
  { word: 'Orchestration', vi: 'Điều phối tự động (Kubernetes)', level: 'C1', pos: 'noun', m: 'Chỉ huy dàn container phối hợp nhịp nhàng.' },
  { word: 'Immutability', vi: 'Tính bất biến (không thể sửa đổi)', level: 'C1', pos: 'noun', m: 'Tạo ra rồi là giữ nguyên vĩnh viễn.' },
  { word: 'Deadlock', vi: 'Tắc nghẽn bế tắc tài nguyên', level: 'B2', pos: 'noun', m: 'Hai tiến trình đợi nhau nhả khóa làm đơ hệ thống.' },
  { word: 'Throughput', vi: 'Lưu lượng xử lý (request/giây)', level: 'B2', pos: 'noun', m: 'Lượng dữ liệu truyền qua hệ thống trong 1 giây.' },
  { word: 'Encapsulation', vi: 'Tính đóng gói dữ liệu (OOP)', level: 'B2', pos: 'noun', m: 'Bọc kín dữ liệu bên trong lớp đối tượng.' },
  { word: 'Pagination', vi: 'Phân trang dữ liệu', level: 'B1', pos: 'noun', m: 'Chia dữ liệu lớn thành từng trang nhỏ tải nhanh.' },
  { word: 'Deterministic', vi: 'Định thức (cùng input luôn ra cùng output)', level: 'C1', pos: 'adjective', m: 'Luôn cho kết quả nhất quán không ngẫu nhiên.' },
  { word: 'Virtualization', vi: 'Ảo hóa phần cứng', level: 'B2', pos: 'noun', m: 'Biến 1 máy chủ vật lý thành nhiều máy ảo độc lập.' },
  { word: 'Authentication', vi: 'Xác thực danh tính người dùng', level: 'B1', pos: 'noun', m: 'Kiểm tra bạn là ai (Login / Mật khẩu).' },
  { word: 'Authorization', vi: 'Phân quyền truy cập', level: 'B2', pos: 'noun', m: 'Kiểm tra bạn được phép làm những gì (Admin / User).' },
  { word: 'Bandwidth', vi: 'Băng thông đường truyền mạng', level: 'B1', pos: 'noun', m: 'Độ rộng của đường ống truyền tải dữ liệu.' },
  { word: 'Encryption', vi: 'Mã hóa bảo vệ dữ liệu', level: 'B2', pos: 'noun', m: 'Biến đổi dữ liệu thành mật mã để chống đọc trộm.' },
  { word: 'Decryption', vi: 'Giải mã dữ liệu', level: 'B2', pos: 'noun', m: 'Biến mật mã trở lại dữ liệu gốc.' },
  { word: 'Payload', vi: 'Khối dữ liệu truyền tải', level: 'B2', pos: 'noun', m: 'Nội dung cốt lõi của gói tin hoặc request.' },
  { word: 'Repository', vi: 'Kho lưu trữ mã nguồn (Git)', level: 'B1', pos: 'noun', m: 'Nơi lưu trữ toàn bộ code và lịch sử commit.' },
  { word: 'Serialization', vi: 'Tuần tự hóa dữ liệu (Object sang JSON/Bytes)', level: 'B2', pos: 'noun', m: 'Ép đối tượng thành chuỗi văn bản để gửi qua mạng.' },
  { word: 'Deserialization', vi: 'Giải tuần tự hóa (JSON sang Object)', level: 'B2', pos: 'noun', m: 'Dựng lại đối tượng từ chuỗi JSON.' },
  { word: 'Redundancy', vi: 'Dự phòng độ tin cậy (Backup)', level: 'C1', pos: 'noun', m: 'Chuẩn bị sẵn server phụ khi server chính bị sự cố.' },
  { word: 'Failover', vi: 'Chuyển đổi dự phòng tự động', level: 'C1', pos: 'noun', m: 'Tự động nhảy sang server phụ khi máy chính sập.' },
  { word: 'Cache', vi: 'Bộ nhớ đệm siêu tốc', level: 'B1', pos: 'noun', m: 'Lưu tạm dữ liệu hay dùng để truy xuất tức thì.' },
  { word: 'Loadbalancer', vi: 'Bộ cân bằng tải', level: 'B2', pos: 'noun', m: 'Phân phối đều lượng truy cập sang nhiều server.' },
  { word: 'Algorithm', vi: 'Thuật toán xử lý logic', level: 'B1', pos: 'noun', m: 'Từng bước tuần tự để giải quyết một bài toán.' },
  { word: 'Heuristic', vi: 'Phương pháp phỏng đoán tối ưu', level: 'C1', pos: 'adjective', m: 'Tìm cách giải bài toán đủ tốt một cách nhanh nhất.' },
  { word: 'Abstraction', vi: 'Tính trừu tượng hóa', level: 'B2', pos: 'noun', m: 'Ẩn đi chi tiết phức tạp, chỉ hiển thị giao diện đơn giản.' },
  { word: 'Inheritance', vi: 'Tính kế thừa (OOP)', level: 'B2', pos: 'noun', m: 'Lớp con thừa hưởng thuộc tính từ lớp cha.' },
  { word: 'Interface', vi: 'Giao diện kết nối / Bản hợp đồng phương thức', level: 'B1', pos: 'noun', m: 'Quy chuẩn các hàm mà một lớp phải cài đặt.' }
];

const bizWords = [
  { word: 'Negotiation', vi: 'Thương lượng, đàm phán hợp đồng', level: 'B2', pos: 'noun', m: 'Thương thảo đôi bên cùng có lợi.' },
  { word: 'Stakeholder', vi: 'Bên liên quan trực tiếp đến dự án', level: 'B2', pos: 'noun', m: 'Nắm giữ phần lợi ích trong dự án.' },
  { word: 'Leverage', vi: 'Tận dụng đòn bẩy lợi thế tối đa', level: 'C1', pos: 'verb', m: 'Dùng đòn bẩy nhỏ để nâng tảng đá lớn.' },
  { word: 'Feasibility', vi: 'Tính khả thi trong thực tế', level: 'B2', pos: 'noun', m: 'Khả năng biến ý tưởng trên giấy thành hiện thực.' },
  { word: 'Deliverable', vi: 'Sản phẩm bàn giao đúng hẹn', level: 'B2', pos: 'noun', m: 'Hạng mục phải bàn giao cho khách hàng.' },
  { word: 'Synergy', vi: 'Hiệu ứng cộng hưởng (1 + 1 > 2)', level: 'C1', pos: 'noun', m: 'Hợp lực tạo ra sức mạnh vượt trội.' },
  { word: 'Benchmark', vi: 'Tiêu chuẩn đối sánh chuẩn mực', level: 'B2', pos: 'noun', m: 'Cột mốc chuẩn mực để đo vị thế trên thị trường.' },
  { word: 'Due Diligence', vi: 'Thẩm định chuyên sâu (trước khi đầu tư)', level: 'C1', pos: 'noun', m: 'Soi xét kỹ pháp lý và tài chính trước khi mua bán.' },
  { word: 'Bandwidth', vi: 'Quỹ thời gian / Sức chứa công việc', level: 'B2', pos: 'noun', m: 'Quỹ thời gian sẵn có để nhận thêm việc.' },
  { word: 'Retrospective', vi: 'Cuộc họp nhìn lại và rút kinh nghiệm', level: 'B2', pos: 'noun', m: 'Rút bài học sau mỗi chu kỳ dự án.' },
  { word: 'Acquisition', vi: 'Thương vụ thâu tóm doanh nghiệp', level: 'B2', pos: 'noun', m: 'Mua lại công ty khác để mở rộng thị phần.' },
  { word: 'Overhead', vi: 'Chi phí vận hành cố định', level: 'B2', pos: 'noun', m: 'Tiền thuê mặt bằng, điện nước, quản lý hàng tháng.' },
  { word: 'Monetization', vi: 'Chiến lược kiếm tiền từ sản phẩm', level: 'B2', pos: 'noun', m: 'Biến lượt xem/người dùng thành doanh thu.' },
  { word: 'Pivot', vi: 'Chuyển hướng chiến lược kinh doanh', level: 'B2', pos: 'verb', m: 'Xoay trục sang sản phẩm mới tiềm năng hơn.' },
  { word: 'Bootstrapping', vi: 'Tự lực cánh sinh (không gọi vốn ngoài)', level: 'B2', pos: 'noun', m: 'Khởi nghiệp tự nuôi sống từ doanh thu.' },
  { word: 'Valuation', vi: 'Định giá trị doanh nghiệp', level: 'B2', pos: 'noun', m: 'Giá trị ước tính toàn bộ công ty trên thị trường.' },
  { word: 'Liquidity', vi: 'Tính thanh khoản tiền mặt', level: 'B2', pos: 'noun', m: 'Khả năng chuyển đổi tài sản thành tiền mặt tức thì.' },
  { word: 'Diversification', vi: 'Đa dạng hóa danh mục đầu tư', level: 'B2', pos: 'noun', m: 'Không bỏ tất cả trứng vào một giỏ.' },
  { word: 'Procurement', vi: 'Quy trình thu mua trang thiết bị', level: 'C1', pos: 'noun', m: 'Bộ phận mua sắm vật tư cho toàn công ty.' },
  { word: 'Consortium', vi: 'Tập đoàn liên doanh đấu thầu', level: 'C1', pos: 'noun', m: 'Liên minh nhiều doanh nghiệp cùng làm đại dự án.' },
  { word: 'Franchise', vi: 'Nhượng quyền thương mại', level: 'B1', pos: 'noun', m: 'Mua quyền kinh doanh thương hiệu có sẵn.' },
  { word: 'Revenue', vi: 'Tổng doanh thu bán hàng', level: 'B1', pos: 'noun', m: 'Tổng số tiền thu về trước khi trừ chi phí.' },
  { word: 'Profitability', vi: 'Khả năng sinh lời lợi nhuận', level: 'B2', pos: 'noun', m: 'Tỷ lệ sinh lời của doanh nghiệp.' },
  { word: 'Incentive', vi: 'Chính sách khen thưởng khích lệ', level: 'B2', pos: 'noun', m: 'Phần thưởng động viên nhân viên cống hiến.' },
  { word: 'Accountability', vi: 'Tinh thần chịu trách nhiệm', level: 'C1', pos: 'noun', m: 'Sẵn sàng giải trình và chịu trách nhiệm về kết quả.' }
];

const travelWords = [
  { word: 'Itinerary', vi: 'Lịch trình chuyến đi chi tiết', level: 'B1', pos: 'noun', m: 'Bản kế hoạch chi tiết từng ngày từng giờ.' },
  { word: 'Accommodation', vi: 'Chỗ ở, nơi lưu trú', level: 'B1', pos: 'noun', m: 'Khách sạn, resort hoặc homestay.' },
  { word: 'Concierge', vi: 'Quản gia khách sạn / Hỗ trợ đặc biệt', level: 'C1', pos: 'noun', m: 'Nhân viên hỗ trợ đặt vé, tour, bàn ăn VIP.' },
  { word: 'Layover', vi: 'Thời gian quá cảnh / Dừng nối chuyến', level: 'B1', pos: 'noun', m: 'Thời gian nghỉ chờ chuyến bay tiếp theo.' },
  { word: 'Complimentary', vi: 'Được tặng kèm miễn phí', level: 'B2', pos: 'adjective', m: 'Dịch vụ miễn phí đính kèm từ khách sạn.' },
  { word: 'Breathtaking', vi: 'Đẹp đến nghẹt thở, ngoạn mục', level: 'B2', pos: 'adjective', m: 'Khung cảnh thiên nhiên kỳ vĩ choáng ngợp.' },
  { word: 'Excursion', vi: 'Chuyến dã ngoại / Tour tham quan ngắn', level: 'B2', pos: 'noun', m: 'Tour đi chơi trong ngày kết hợp ngắm cảnh.' },
  { word: 'Hospitality', vi: 'Lòng hiếu khách / Ngành du lịch khách sạn', level: 'B2', pos: 'noun', m: 'Sự đón tiếp niềm nở, chu đáo.' },
  { word: 'Jet Lag', vi: 'Mệt mỏi do lệch múi giờ bay', level: 'B1', pos: 'noun', m: 'Cơ thể chưa kịp thích nghi với múi giờ mới.' },
  { word: 'Customs', vi: 'Cửa khẩu hải quan kiểm tra hành lý', level: 'B1', pos: 'noun', m: 'Nơi kiểm tra khai báo hàng hóa nhập cảnh.' },
  { word: 'Baggage Claim', vi: 'Khu vực nhận hành lý ký gửi', level: 'A2', pos: 'noun', m: 'Băng chuyền hành lý sau khi hạ cánh.' },
  { word: 'Boarding Pass', vi: 'Thẻ lên máy bay', level: 'A2', pos: 'noun', m: 'Vé giấy/điện tử có số ghế và cổng bay.' },
  { word: 'Embarkation', vi: 'Sự lên tàu / Lên máy bay', level: 'B2', pos: 'noun', m: 'Quá trình bước lên phương tiện khởi hành.' },
  { word: 'Disembarkation', vi: 'Sự xuống tàu / Rời máy bay', level: 'B2', pos: 'noun', m: 'Bước xuống sau khi kết thúc hành trình.' },
  { word: 'Souvenir', vi: 'Quà lưu niệm chuyến đi', level: 'A2', pos: 'noun', m: 'Món đồ mua về làm kỷ niệm chuyến du lịch.' },
  { word: 'Scenic', vi: 'Có phong cảnh đẹp như tranh', level: 'B1', pos: 'adjective', m: 'Tuyến đường có cảnh sắc thiên nhiên tuyệt đẹp.' },
  { word: 'Ecotourism', vi: 'Du lịch sinh thái bảo vệ môi trường', level: 'B2', pos: 'noun', m: 'Du lịch khám phá thiên nhiên có trách nhiệm.' },
  { word: 'Trekking', vi: 'Đi bộ leo núi đường trường', level: 'B1', pos: 'noun', m: 'Hành trình đi bộ dã ngoại qua rừng núi.' },
  { word: 'Expedition', vi: 'Chuyến thám hiểm khoa học/vùng đất mới', level: 'B2', pos: 'noun', m: 'Chuyến đi khám phá vùng đất xa xôi hoang sơ.' }
];

const dailyWords = [
  { word: 'Procrastinate', vi: 'Trì hoãn việc cần làm', level: 'B2', pos: 'verb', m: 'Thói quen lười để việc đến hạn chót.' },
  { word: 'Spontaneous', vi: 'Ngẫu hứng, không lên kế hoạch trước', level: 'B2', pos: 'adjective', m: 'Thích là làm ngay tức khắc.' },
  { word: 'Empathy', vi: 'Sự thấu cảm sâu sắc', level: 'B2', pos: 'noun', m: 'Đặt trọn trái tim vào nỗi đau của người khác.' },
  { word: 'Resilient', vi: 'Kiên cường, mau hồi phục sau vấp ngã', level: 'B2', pos: 'adjective', m: 'Ngã bao nhiêu lần cũng bật dậy mạnh mẽ.' },
  { word: 'Serendipity', vi: 'Cơ duyên may mắn tình cờ', level: 'C1', pos: 'noun', m: 'Sự tình cờ mang đến niềm hạnh phúc bất ngờ.' },
  { word: 'Overwhelmed', vi: 'Bị quá tải, choáng ngợp', level: 'B1', pos: 'adjective', m: 'Núi công việc đổ dồn khiến não nghẹt thở.' },
  { word: 'Nostalgia', vi: 'Nỗi hoài niệm da diết về quá khứ', level: 'B2', pos: 'noun', m: 'Cảm giác bồi hồi khi nhớ về kỷ niệm tuổi thơ.' },
  { word: 'Sincere', vi: 'Chân thành từ đáy lòng', level: 'B1', pos: 'adjective', m: 'Chân thật không dối trá hay vụ lợi.' },
  { word: 'Boundary', vi: 'Ranh giới cá nhân lành mạnh', level: 'B2', pos: 'noun', m: 'Biết nói Không để bảo vệ không gian riêng.' },
  { word: 'Gratitude', vi: 'Lòng biết ơn sâu sắc', level: 'B1', pos: 'noun', m: 'Trân trọng những điều tốt đẹp xung quanh.' },
  { word: 'Epiphany', vi: 'Khoảnh khắc bừng tỉnh ngộ ra chân lý', level: 'C1', pos: 'noun', m: 'Đột nhiên đầu óc thông suốt một vấn đề lớn.' },
  { word: 'Vulnerable', vi: 'Dễ bị tổn thương tâm lý', level: 'B2', pos: 'adjective', m: 'Mở lòng chia sẻ điểm yếu của bản thân.' },
  { word: 'Compassion', vi: 'Lòng trắc ẩn, xót thương', level: 'B2', pos: 'noun', m: 'Tình yêu thương và mong muốn giúp đỡ người khó khăn.' },
  { word: 'Mindfulness', vi: 'Chánh niệm (sống trọn ở hiện tại)', level: 'B2', pos: 'noun', m: 'Tập trung tâm trí vào giây phút hiện tại.' },
  { word: 'Introvert', vi: 'Người hướng nội', level: 'B1', pos: 'noun', m: 'Nạp năng lượng khi ở một mình yên tĩnh.' },
  { word: 'Extrovert', vi: 'Người hướng ngoại', level: 'B1', pos: 'noun', m: 'Thích giao lưu, nạp năng lượng từ đám đông.' },
  { word: 'Optimism', vi: 'Tinh thần lạc quan yêu đời', level: 'B1', pos: 'noun', m: 'Luôn nhìn về mặt tích cực của cuộc sống.' },
  { word: 'Pessimism', vi: 'Thái độ bi quan tiêu cực', level: 'B2', pos: 'noun', m: 'Luôn lo lắng về viễn cảnh xấu nhất.' },
  { word: 'Authenticity', vi: 'Tính chân thật, là chính mình', level: 'C1', pos: 'noun', m: 'Sống thật với cảm xúc và giá trị của bản thân.' }
];

const academicWords = [
  { word: 'Discrepancy', vi: 'Sự sai lệch giữa hai nguồn dữ liệu', level: 'C1', pos: 'noun', m: 'Hai con số đối chiếu không khớp.' },
  { word: 'Ubiquitous', vi: 'Hiện diện ở khắp mọi nơi', level: 'C1', pos: 'adjective', m: 'Có mặt ở khắp nơi trong đời sống.' },
  { word: 'Empirical', vi: 'Dựa trên thực nghiệm, số liệu thực tế', level: 'C1', pos: 'adjective', m: 'Dựa vào thí nghiệm chứ không nói suông.' },
  { word: 'Paradigm', vi: 'Hệ hình, mô hình mẫu chuẩn mực', level: 'C1', pos: 'noun', m: 'Mô hình tư duy nền tảng của một lĩnh vực.' },
  { word: 'Substantiate', vi: 'Chứng minh bằng chứng cứ xác thực', level: 'C1', pos: 'verb', m: 'Đưa ra số liệu cụ thể để bảo vệ luận điểm.' },
  { word: 'Proliferation', vi: 'Sự bùng nổ gia tăng số lượng nhanh chóng', level: 'C1', pos: 'noun', m: 'Sinh sôi nảy nở theo cấp số nhân.' },
  { word: 'Exacerbate', vi: 'Làm trầm trọng thêm vấn đề / căn bệnh', level: 'C1', pos: 'verb', m: 'Đổ thêm dầu vào lửa khiến tình hình tồi tệ hơn.' },
  { word: 'Alleviate', vi: 'Làm dịu bớt, giảm nhẹ gánh nặng', level: 'B2', pos: 'verb', m: 'Xoa dịu bớt nỗi đau và áp lực.' },
  { word: 'Juxtaposition', vi: 'Sự đặt cạnh nhau để làm nổi bật tương phản', level: 'C2', pos: 'noun', m: 'Đặt 2 mảng sáng tối cạnh nhau để so sánh.' },
  { word: 'Plausible', vi: 'Hợp lý, đáng tin cậy', level: 'B2', pos: 'adjective', m: 'Nghe rất có lý và có căn cứ thuyết phục.' },
  { word: 'Hypothesis', vi: 'Giả thuyết khoa học', level: 'B2', pos: 'noun', m: 'Nhận định ban đầu cần làm thí nghiệm để kiểm chứng.' },
  { word: 'Correlation', vi: 'Mối tương quan giữa các biến số', level: 'B2', pos: 'noun', m: 'Hai hiện tượng cùng tăng hoặc cùng giảm với nhau.' },
  { word: 'Causation', vi: 'Quan hệ nhân quả trực tiếp', level: 'C1', pos: 'noun', m: 'Cái này là nguyên nhân trực tiếp sinh ra cái kia.' },
  { word: 'Methodology', vi: 'Phương pháp luận nghiên cứu', level: 'B2', pos: 'noun', m: 'Hệ thống các phương pháp thực hiện luận án.' },
  { word: 'Synthesize', vi: 'Tổng hợp và đúc kết thông tin', level: 'C1', pos: 'verb', m: 'Đọc nhiều nguồn tài liệu rồi đúc kết thành ý mới.' },
  { word: 'Comprehensive', vi: 'Toàn diện, bao quát mọi mặt', level: 'B2', pos: 'adjective', m: 'Đầy đủ tất cả các khía cạnh không bỏ sót.' },
  { word: 'Anomalous', vi: 'Bất thường, dị thường so với quy luật', level: 'C1', pos: 'adjective', m: 'Khác biệt hoàn toàn so với mẫu số chung.' },
  { word: 'Pragmatic', vi: 'Mang tính thực dụng, coi trọng thực tế', level: 'C1', pos: 'adjective', m: 'Giải quyết vấn đề dựa trên hiệu quả thực tiễn.' },
  { word: 'Nuance', vi: 'Sắc thái tinh tế, khác biệt nhỏ', level: 'C1', pos: 'noun', m: 'Sự khác biệt nhỏ nhưng quan trọng về ý nghĩa.' }
];

const healthWords = [
  { word: 'Cardiovascular', vi: 'Thuộc về tim và hệ mạch máu', level: 'B2', pos: 'adjective', m: 'Hệ tuần hoàn tim mạch.' },
  { word: 'Rehabilitation', vi: 'Phục hồi chức năng sau chấn thương', level: 'B2', pos: 'noun', m: 'Tập vật lý trị liệu để cử động bình thường.' },
  { word: 'Sedentary', vi: 'Ít vận động, ngồi lì một chỗ', level: 'B2', pos: 'adjective', m: 'Ngồi ghế dính chặt 8 tiếng mỗi ngày.' },
  { word: 'Prescription', vi: 'Đơn thuốc do bác sĩ kê', level: 'B1', pos: 'noun', m: 'Toa thuốc chỉ định loại thuốc và liều dùng.' },
  { word: 'Metabolism', vi: 'Quá trình trao đổi chất và đốt calo', level: 'B2', pos: 'noun', m: 'Bộ máy đốt cháy năng lượng của cơ thể.' },
  { word: 'Preventive', vi: 'Mang tính phòng ngừa trước khi phát bệnh', level: 'B2', pos: 'adjective', m: 'Phòng bệnh hơn chữa bệnh.' },
  { word: 'Immunity', vi: 'Hệ miễn dịch, sức đề kháng', level: 'B2', pos: 'noun', m: 'Lá chắn sinh học bảo vệ cơ thể chống vi khuẩn.' },
  { word: 'Therapeutic', vi: 'Có tác dụng trị liệu và chữa lành', level: 'B2', pos: 'adjective', m: 'Liệu pháp xoa dịu thể xác và tâm trí.' },
  { word: 'Hygiene', vi: 'Vệ sinh phòng dịch và sức khỏe', level: 'B1', pos: 'noun', m: 'Giữ gìn vệ sinh sạch sẽ để vi khuẩn không xâm nhập.' },
  { word: 'Diagnosis', vi: 'Sự chẩn đoán bệnh chính xác', level: 'B2', pos: 'noun', m: 'Bác sĩ kết luận chính xác bệnh sau khi xét nghiệm.' },
  { word: 'Symptom', vi: 'Triệu chứng biểu hiện của bệnh', level: 'B1', pos: 'noun', m: 'Dấu hiệu như sốt, ho, đau đầu báo hiệu cơ thể bất ổn.' },
  { word: 'Chronic', vi: 'Mãn tính (kéo dài kinh niên)', level: 'B2', pos: 'adjective', m: 'Bệnh kéo dài nhiều tháng nhiều năm không dứt.' },
  { word: 'Acute', vi: 'Cấp tính (bộc phát dữ dội đột ngột)', level: 'B2', pos: 'adjective', m: 'Cơn đau bùng phát dữ dội cần cấp cứu ngay.' },
  { word: 'Prognosis', vi: 'Tiên lượng khả năng hồi phục bệnh', level: 'C1', pos: 'noun', m: 'Dự đoán của bác sĩ về tiến triển bệnh sau điều trị.' },
  { word: 'Epidemic', vi: 'Dịch bệnh lây lan nhanh chóng', level: 'B2', pos: 'noun', m: 'Căn bệnh lây truyền cho số đông người trong khu vực.' },
  { word: 'Inflammation', vi: 'Phản ứng viêm sưng tấy', level: 'B2', pos: 'noun', m: 'Cơ thể sưng đỏ tự vệ khi bị tổn thương.' },
  { word: 'Antibiotic', vi: 'Thuốc kháng sinh diệt vi khuẩn', level: 'B1', pos: 'noun', m: 'Thuốc đặc trị tiêu diệt vi khuẩn gây nhiễm trùng.' },
  { word: 'Anesthesia', vi: 'Gây mê / Thuốc tê giảm đau', level: 'C1', pos: 'noun', m: 'Làm mất cảm giác đau đớn khi phẫu thuật.' },
  { word: 'Nutrient', vi: 'Chất dinh dưỡng nuôi cơ thể', level: 'B1', pos: 'noun', m: 'Vitamin, protein, khoáng chất trong thực phẩm.' }
];

// Helper to look up in local 103K dict files
const publicDictDir = path.resolve('public/dict');
const dictCache = {};

function getDictEntry(word) {
  const firstChar = word[0].toLowerCase();
  const key = (firstChar >= 'a' && firstChar <= 'z') ? firstChar : 'other';
  if (!dictCache[key]) {
    const p = path.join(publicDictDir, `${key}.json`);
    if (fs.existsSync(p)) {
      dictCache[key] = JSON.parse(fs.readFileSync(p, 'utf-8'));
    } else {
      dictCache[key] = {};
    }
  }
  return dictCache[key][word.toLowerCase()] || null;
}

function processCategory(list, catId) {
  return list.map((item, index) => {
    const dict = getDictEntry(item.word);
    const ipa = dict?.p || `/${item.word.toLowerCase()}/`;
    
    // Extract first example from dict if available
    let exEn = '';
    let exVi = '';
    if (dict?.s && dict.s.length > 0) {
      for (const s of dict.s) {
        for (const m of (s.meanings || [])) {
          if (m.ex && m.ex.length > 0) {
            exEn = m.ex[0].e;
            exVi = m.ex[0].v;
            break;
          }
        }
        if (exEn) break;
      }
    }

    if (!exEn) {
      exEn = `The team analyzed the ${item.word.toLowerCase()} during the project review.`;
      exVi = `Đội ngũ đã phân tích yếu tố ${item.vi.toLowerCase()} trong buổi đánh giá dự án.`;
    }

    return {
      id: `${catId}-${index + 1}`,
      word: item.word,
      ipa: ipa,
      partOfSpeech: item.pos,
      vietnamese: item.vi,
      category: catId,
      level: item.level,
      definition: `${item.word} is a key concept in ${catId}. ${item.m}`,
      example: exEn,
      exampleVi: exVi,
      collocations: [`${item.word.toLowerCase()} analysis`, `core ${item.word.toLowerCase()}`, `apply ${item.word.toLowerCase()}`],
      mnemonic: item.m
    };
  });
}

const allWords = [
  ...processCategory(itWords, 'it'),
  ...processCategory(bizWords, 'business'),
  ...processCategory(travelWords, 'travel'),
  ...processCategory(dailyWords, 'daily'),
  ...processCategory(academicWords, 'academic'),
  ...processCategory(healthWords, 'health')
];

console.log(`Generated total of ${allWords.length} categorized domain words!`);

const outputCode = `export const VOCAB_CATEGORIES = [
  { id: 'all', name: 'Tất cả lĩnh vực', icon: 'Sparkles', color: 'indigo' },
  { id: 'it', name: 'Công nghệ & CNTT', icon: 'Code', color: 'cyan', badge: '40 Từ' },
  { id: 'business', name: 'Kinh doanh & Công sở', icon: 'Briefcase', color: 'emerald', badge: '25 Từ' },
  { id: 'travel', name: 'Du lịch & Khách sạn', icon: 'Plane', color: 'amber', badge: '20 Từ' },
  { id: 'daily', name: 'Đời sống & Giao tiếp', icon: 'Coffee', color: 'rose', badge: '20 Từ' },
  { id: 'academic', name: 'Học thuật & IELTS', icon: 'GraduationCap', color: 'violet', badge: '20 Từ' },
  { id: 'health', name: 'Y tế & Sức khỏe', icon: 'HeartPulse', color: 'teal', badge: '20 Từ' },
];

export const VOCAB_LIST = ${JSON.stringify(allWords, null, 2)};
`;

fs.writeFileSync('src/data/vocabData.js', outputCode, 'utf-8');
console.log('Successfully wrote massive specialized vocabulary to src/data/vocabData.js!');
