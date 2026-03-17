const fs = require("fs");

const filePath = "data/vietnam-career-map.json";
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const portalMajorsByGroup = {
  technology: [
    "Toán tin",
    "Toán ứng dụng",
    "Khoa học tính toán",
    "Khoa học máy tính",
    "Công nghệ thông tin",
    "Kỹ thuật phần mềm",
    "Hệ thống thông tin",
    "Mạng máy tính và truyền thông dữ liệu",
    "An toàn thông tin",
    "Trí tuệ nhân tạo",
    "Khoa học dữ liệu",
    "Công nghệ đa phương tiện"
  ],
  business: [
    "Quản trị kinh doanh",
    "Marketing",
    "Kinh doanh quốc tế",
    "Thương mại điện tử",
    "Quản trị nhân lực",
    "Kinh doanh thương mại",
    "Quản trị chuỗi cung ứng",
    "Logistics",
    "Quản trị dịch vụ du lịch và lữ hành",
    "Quản trị khách sạn",
    "Quản trị nhà hàng và dịch vụ ăn uống",
    "Quản trị sự kiện"
  ],
  finance: [
    "Tài chính",
    "Ngân hàng",
    "Tài chính - Ngân hàng",
    "Kế toán",
    "Kiểm toán",
    "Bảo hiểm",
    "Tài chính công",
    "Kinh tế đầu tư",
    "Kinh tế phát triển",
    "Kinh tế quốc tế",
    "Kinh tế số",
    "Kinh tế học"
  ],
  design: [
    "Thiết kế đồ họa",
    "Thiết kế thời trang",
    "Thiết kế nội thất",
    "Thiết kế công nghiệp",
    "Thiết kế đa phương tiện",
    "Mỹ thuật ứng dụng",
    "Nhiếp ảnh",
    "Truyền thông đa phương tiện",
    "Sản xuất phim và truyền hình",
    "Quan hệ công chúng",
    "Báo chí",
    "Truyền thông số"
  ],
  engineering: [
    "Kỹ thuật cơ khí",
    "Kỹ thuật cơ điện tử",
    "Kỹ thuật ô tô",
    "Kỹ thuật điện",
    "Kỹ thuật điện tử - viễn thông",
    "Kỹ thuật điều khiển và tự động hóa",
    "Kỹ thuật xây dựng",
    "Kỹ thuật xây dựng công trình giao thông",
    "Kỹ thuật môi trường",
    "Kỹ thuật hóa học",
    "Kỹ thuật vật liệu",
    "Kỹ thuật năng lượng"
  ],
  healthcare: [
    "Y khoa",
    "Răng - Hàm - Mặt",
    "Y học cổ truyền",
    "Y học dự phòng",
    "Dược học",
    "Điều dưỡng",
    "Hộ sinh",
    "Kỹ thuật xét nghiệm y học",
    "Kỹ thuật hình ảnh y học",
    "Kỹ thuật phục hồi chức năng",
    "Dinh dưỡng",
    "Y tế công cộng"
  ],
  professional: [
    "Luật",
    "Luật kinh tế",
    "Luật quốc tế",
    "Kiến trúc",
    "Kiến trúc cảnh quan",
    "Quy hoạch vùng và đô thị",
    "Quản lý xây dựng",
    "Quản lý tài nguyên và môi trường",
    "Quản lý đất đai",
    "Quản lý nhà nước",
    "Quản lý công",
    "Quan hệ quốc tế"
  ],
  "education-language": [
    "Sư phạm Toán học",
    "Sư phạm Vật lý",
    "Sư phạm Hóa học",
    "Sư phạm Sinh học",
    "Sư phạm Ngữ văn",
    "Sư phạm Lịch sử",
    "Sư phạm Địa lý",
    "Giáo dục tiểu học",
    "Giáo dục mầm non",
    "Ngôn ngữ Anh",
    "Ngôn ngữ Trung Quốc",
    "Ngôn ngữ Nhật"
  ]
};

const groupCatalog = (data.groupCatalog || []).map((group) => ({
  ...group,
  portalMajorsI18n: {
    en: group.portalMajorsI18n?.en ?? [],
    vi: portalMajorsByGroup[group.id] ?? group.portalMajorsI18n?.vi ?? []
  }
}));

data.groupCatalog = groupCatalog;

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
console.log({
  groups: groupCatalog.length,
  updated: groupCatalog.filter((g) => (g.portalMajorsI18n?.vi?.length || 0) >= 10).length
});
