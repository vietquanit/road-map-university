const fs = require("fs");

const filePath = "data/vietnam-career-map.json";
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const sectionVi = {
  technology: "Cong nghe",
  business: "Kinh doanh",
  finance: "Tai chinh",
  design: "Thiet ke va truyen thong",
  engineering: "Ky thuat",
  healthcare: "Y te",
  professional: "Nganh chuyen mon",
  "education-language": "Giao duc va ngon ngu"
};

const majorVi = {
  "computer-science": ["Khoa hoc may tinh", "Hoc nen tang tinh toan, thuat toan, he thong va co so phan mem."],
  "information-technology": ["Cong nghe thong tin", "Xay dung va van hanh he thong, dich vu CNTT trong doanh nghiep."],
  "software-engineering": ["Ky thuat phan mem", "Thiet ke, phat trien, kiem thu va bao tri san pham phan mem quy mo lon."],
  "artificial-intelligence": ["Tri tue nhan tao", "Ung dung tri tue may vao nhan dang, ngon ngu va ra quyet dinh."],
  "data-science": ["Khoa hoc du lieu", "Khai pha tri thuc tu du lieu bang thong ke va tinh toan."],
  cybersecurity: ["An toan thong tin", "Bao ve he thong, mang va du lieu truoc cac moi de doa an ninh mang."],
  "computer-networks": ["Mang may tinh", "Thiet ke va quan tri ha tang ket noi va truyen thong du lieu."],
  "information-systems": ["He thong thong tin", "Ket noi nghiep vu doanh nghiep voi giai phap cong nghe."],
  "business-analytics": ["Phan tich kinh doanh", "Su dung du lieu de toi uu hoa quyet dinh kinh doanh."],
  "game-development": ["Phat trien tro choi", "Xay dung co che game, cong cu va trai nghiem tuong tac."],
  "business-administration": ["Quan tri kinh doanh", "Hoc quan ly, van hanh va chien luoc to chuc."],
  marketing: ["Marketing", "Xay dung thuong hieu va tao nhu cau thi truong."],
  "international-business": ["Kinh doanh quoc te", "Van hanh va mo rong hoat dong kinh doanh tren thi truong toan cau."],
  "human-resource-management": ["Quan tri nhan luc", "Quan ly nhan su, phat trien tai nang va van hoa to chuc."],
  "logistics-supply-chain": ["Logistics va chuoi cung ung", "Toi uu mua hang, ton kho, van chuyen va giao nhan."],
  ecommerce: ["Thuong mai dien tu", "Van hanh kenh kinh doanh truc tuyen va tang truong so."],
  finance: ["Tai chinh", "Phan tich von, dau tu va quyet dinh tai chinh."],
  banking: ["Ngan hang", "Quan ly tin dung, huy dong von va dich vu ngan hang."],
  accounting: ["Ke toan", "Ghi nhan, bao cao va phan tich giao dich tai chinh."],
  economics: ["Kinh te hoc", "Nghien cuu thi truong, chinh sach va hanh vi kinh te."],
  auditing: ["Kiem toan", "Danh gia kiem soat, tuan thu va do tin cay thong tin tai chinh."],
  insurance: ["Bao hiem", "Danh gia rui ro va thiet ke san pham bao hiem."],
  "graphic-design": ["Thiet ke do hoa", "Truyen dat y tuong bang hinh anh, bo cuc va typography."],
  "multimedia-design": ["Thiet ke da phuong tien", "San xuat noi dung chuyen dong, video va truyen thong da nen tang."],
  "ui-ux-design": ["Thiet ke UI UX", "Thiet ke giao dien va trai nghiem nguoi dung truc quan."],
  "digital-media": ["Truyen thong so", "San xuat va phan phoi noi dung tren cac kenh so."],
  "mechanical-engineering": ["Ky thuat co khi", "Phat trien he thong co khi cho cong nghiep va san xuat."],
  "electrical-engineering": ["Ky thuat dien", "Thiet ke he thong dien, luoi dien va mach dieu khien."],
  "civil-engineering": ["Ky thuat xay dung", "Lap ke hoach va thi cong cac cong trinh ha tang."],
  "automation-engineering": ["Ky thuat tu dong hoa", "Tu dong hoa quy trinh bang dieu khien va robot."],
  mechatronics: ["Co dien tu", "Ket hop co khi, dien tu va phan mem de tao he thong thong minh."],
  medicine: ["Y khoa", "Dao tao chan doan, dieu tri va cham soc lam sang."],
  pharmacy: ["Duoc hoc", "Nghien cuu, san xuat va dam bao an toan thuoc."],
  nursing: ["Dieu duong", "Cham soc benh nhan truc tiep va phoi hop dich vu y te."],
  "medical-laboratory": ["Xet nghiem y hoc", "Thuc hien xet nghiem chan doan ho tro quyet dinh dieu tri."],
  law: ["Luat", "Nghien cuu he thong phap ly, quy dinh va giai quyet tranh chap."],
  architecture: ["Kien truc", "Thiet ke khong gian va cong trinh dam bao cong nang va tham my."],
  "tourism-hospitality-management": ["Quan tri du lich va khach san", "Quan ly dich vu du lich, su kien va van hanh khach san."],
  "english-language": ["Ngon ngu Anh", "Phat trien nang luc ngon ngu cho giao tiep va hoi nhap quoc te."],
  pedagogy: ["Su pham", "Nghien cuu phuong phap day hoc, chuong trinh va khoa hoc giao duc."]
};

data.titleI18n = {
  en: data.title,
  vi: "Ban do dinh huong nghe nghiep Viet Nam"
};

data.descriptionI18n = {
  en: data.description || "Explore Vietnam university majors and related career paths by category.",
  vi: "Kham pha nganh hoc dai hoc tai Viet Nam va cac huong nghe nghiep theo tung nhom nganh."
};

data.sections = (data.sections || []).map((section) => ({
  ...section,
  titleI18n: {
    en: section.title,
    vi: sectionVi[section.id] || section.title
  }
}));

data.nodes = (data.nodes || []).map((node) => {
  const translated = majorVi[node.id];

  return {
    ...node,
    labelI18n: {
      en: node.label,
      vi: translated ? translated[0] : node.label
    },
    descriptionI18n: {
      en: node.description,
      vi: translated ? translated[1] : node.description
    }
  };
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log({
  titleI18n: !!data.titleI18n,
  descriptionI18n: !!data.descriptionI18n,
  sectionI18nCount: data.sections.length,
  nodeI18nCount: data.nodes.length
});
