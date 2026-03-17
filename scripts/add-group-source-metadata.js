const fs = require("fs");

const filePath = "data/vietnam-career-map.json";
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const portalMajorsByGroup = {
  technology: ["Toán tin", "Toán ứng dụng", "Khoa học tính toán", "Công nghệ thông tin", "Khoa học máy tính"],
  business: ["Quản trị kinh doanh", "Marketing", "Kinh doanh quốc tế", "Quản trị nhân lực", "Thương mại điện tử"],
  finance: ["Tài chính", "Ngân hàng", "Kế toán", "Kiểm toán", "Bảo hiểm"],
  design: ["Thiết kế đồ họa", "Thiết kế đa phương tiện", "Thiết kế UI/UX", "Truyền thông số", "Mỹ thuật ứng dụng"],
  engineering: ["Kỹ thuật cơ khí", "Kỹ thuật điện", "Kỹ thuật xây dựng", "Tự động hóa", "Cơ điện tử"],
  healthcare: ["Y khoa", "Dược học", "Điều dưỡng", "Xét nghiệm y học", "Y tế công cộng"],
  professional: ["Luật", "Kiến trúc", "Quản trị dịch vụ du lịch và lữ hành", "Quản trị khách sạn", "Quản lý đô thị"],
  "education-language": ["Sư phạm", "Ngôn ngữ Anh", "Ngôn ngữ Trung", "Ngôn ngữ Nhật", "Giáo dục học"]
};

data.sourceReferences = [
  {
    id: "tuyensinhso-major-groups",
    name: "Tuyển Sinh Số",
    url: "nhom-nganh-dao-tao.html",
    description: "Danh mục nhóm ngành và ngành đào tạo đại học tại Việt Nam.",
    descriptionI18n: {
      en: "Vietnam higher-education major group and major catalog.",
      vi: "Danh mục nhóm ngành và ngành đào tạo đại học tại Việt Nam."
    }
  }
];

const groupCatalogById = new Map((data.groupCatalog || []).map((item) => [item.id, item]));

data.groupCatalog = (data.academicOrder || [])
  .map((groupId, index) => {
    const existing = groupCatalogById.get(groupId) || { id: groupId };
    const majorIds = (data.nodes || [])
      .filter((node) => node.section === groupId)
      .map((node) => node.id);

    return {
      ...existing,
      order: existing.order || index + 1,
      majorIds,
      portalMajorsI18n: {
        en: [],
        vi: portalMajorsByGroup[groupId] || []
      }
    };
  })
  .sort((a, b) => a.order - b.order);

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

console.log({
  sourceReferences: data.sourceReferences.length,
  groupCatalog: data.groupCatalog.length,
  withMajorIds: data.groupCatalog.filter((item) => Array.isArray(item.majorIds) && item.majorIds.length > 0).length
});

