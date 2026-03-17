const fs = require("fs");

const filePath = "data/vietnam-career-map.json";
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const titleVi = "Bản đồ định hướng nghề nghiệp Việt Nam";
const descriptionVi = "Khám phá các ngành đại học tại Việt Nam và lộ trình nghề nghiệp theo từng nhóm ngành.";

const sectionMeta = {
  technology: {
    order: 1,
    titleVi: "Công nghệ thông tin và máy tính",
    focusVi: "Đào tạo nền tảng tính toán, kỹ thuật phần mềm, dữ liệu và hệ thống số.",
    workTypesVi: [
      "Doanh nghiệp sản phẩm công nghệ",
      "Gia công phần mềm và dịch vụ CNTT",
      "Khởi nghiệp công nghệ",
      "Trung tâm dữ liệu và hạ tầng số",
      "Nghiên cứu và phát triển (R&D)"
    ],
    outcomeJobsVi: [
      "Lập trình viên phần mềm",
      "Kỹ sư dữ liệu",
      "Kỹ sư AI/ML",
      "Chuyên viên an toàn thông tin",
      "Quản trị hệ thống và mạng"
    ]
  },
  business: {
    order: 2,
    titleVi: "Kinh doanh và quản trị",
    focusVi: "Đào tạo quản trị doanh nghiệp, vận hành, marketing và thương mại.",
    workTypesVi: [
      "Doanh nghiệp thương mại và dịch vụ",
      "Công ty tư vấn quản trị",
      "Doanh nghiệp xuất nhập khẩu",
      "Bán lẻ và thương mại điện tử",
      "Khởi nghiệp kinh doanh"
    ],
    outcomeJobsVi: [
      "Chuyên viên phát triển kinh doanh",
      "Chuyên viên marketing",
      "Chuyên viên nhân sự",
      "Chuyên viên chuỗi cung ứng",
      "Quản lý vận hành"
    ]
  },
  finance: {
    order: 3,
    titleVi: "Tài chính, kế toán và kiểm toán",
    focusVi: "Đào tạo quản trị dòng tiền, phân tích tài chính và kiểm soát tuân thủ.",
    workTypesVi: [
      "Ngân hàng thương mại",
      "Công ty chứng khoán và quỹ đầu tư",
      "Doanh nghiệp kiểm toán",
      "Doanh nghiệp bảo hiểm",
      "Phòng tài chính doanh nghiệp"
    ],
    outcomeJobsVi: [
      "Chuyên viên phân tích tài chính",
      "Kế toán tổng hợp",
      "Kiểm toán viên",
      "Chuyên viên tín dụng",
      "Chuyên viên quản trị rủi ro"
    ]
  },
  design: {
    order: 4,
    titleVi: "Thiết kế và truyền thông số",
    focusVi: "Đào tạo thiết kế thị giác, đa phương tiện và trải nghiệm người dùng.",
    workTypesVi: [
      "Studio thiết kế sáng tạo",
      "Agency truyền thông quảng cáo",
      "Công ty sản phẩm số",
      "Nhà xuất bản và media",
      "Freelance sáng tạo"
    ],
    outcomeJobsVi: [
      "Nhà thiết kế đồ họa",
      "Nhà thiết kế UI/UX",
      "Chuyên viên motion graphic",
      "Chuyên viên sản xuất nội dung số",
      "Biên tập hình ảnh/video"
    ]
  },
  engineering: {
    order: 5,
    titleVi: "Kỹ thuật và công nghiệp",
    focusVi: "Đào tạo kỹ thuật chế tạo, tự động hóa, điện và xây dựng hạ tầng.",
    workTypesVi: [
      "Nhà máy và khu công nghiệp",
      "Doanh nghiệp xây dựng và hạ tầng",
      "Doanh nghiệp cơ điện và tự động hóa",
      "Công ty năng lượng",
      "Trung tâm R&D kỹ thuật"
    ],
    outcomeJobsVi: [
      "Kỹ sư cơ khí",
      "Kỹ sư điện - điện tử",
      "Kỹ sư tự động hóa",
      "Kỹ sư xây dựng",
      "Kỹ sư bảo trì và vận hành"
    ]
  },
  healthcare: {
    order: 6,
    titleVi: "Y tế và khoa học sức khỏe",
    focusVi: "Đào tạo khám chữa bệnh, dược, điều dưỡng và xét nghiệm y học.",
    workTypesVi: [
      "Bệnh viện và phòng khám",
      "Doanh nghiệp dược phẩm",
      "Trung tâm xét nghiệm y khoa",
      "Y tế cộng đồng",
      "Nghiên cứu lâm sàng"
    ],
    outcomeJobsVi: [
      "Bác sĩ",
      "Dược sĩ",
      "Điều dưỡng",
      "Kỹ thuật viên xét nghiệm",
      "Chuyên viên quản lý chất lượng y tế"
    ]
  },
  professional: {
    order: 7,
    titleVi: "Luật, kiến trúc và dịch vụ chuyên nghiệp",
    focusVi: "Đào tạo pháp lý, thiết kế không gian và quản trị dịch vụ du lịch - khách sạn.",
    workTypesVi: [
      "Văn phòng luật và pháp chế doanh nghiệp",
      "Công ty kiến trúc - xây dựng",
      "Doanh nghiệp du lịch và khách sạn",
      "Tổ chức tư vấn chuyên môn",
      "Khu nghỉ dưỡng và dịch vụ cao cấp"
    ],
    outcomeJobsVi: [
      "Chuyên viên pháp chế",
      "Trợ lý luật sư",
      "Kiến trúc sư",
      "Quản lý khách sạn",
      "Chuyên viên điều hành tour"
    ]
  },
  "education-language": {
    order: 8,
    titleVi: "Sư phạm và ngôn ngữ",
    focusVi: "Đào tạo giảng dạy, phát triển học liệu và năng lực ngoại ngữ ứng dụng.",
    workTypesVi: [
      "Trường học và trung tâm đào tạo",
      "Tổ chức giáo dục quốc tế",
      "Doanh nghiệp biên phiên dịch",
      "Công ty bản địa hóa nội dung",
      "Đơn vị đào tạo doanh nghiệp"
    ],
    outcomeJobsVi: [
      "Giáo viên",
      "Chuyên viên phát triển chương trình học",
      "Biên dịch viên",
      "Phiên dịch viên",
      "Chuyên viên truyền thông song ngữ"
    ]
  }
};

const majorVi = {
  "computer-science": ["Khoa học máy tính", "Học nền tảng tính toán, thuật toán, hệ thống và cơ sở phần mềm."],
  "information-technology": ["Công nghệ thông tin", "Xây dựng và vận hành hệ thống, dịch vụ CNTT trong doanh nghiệp."],
  "software-engineering": ["Kỹ thuật phần mềm", "Thiết kế, phát triển, kiểm thử và bảo trì sản phẩm phần mềm quy mô lớn."],
  "artificial-intelligence": ["Trí tuệ nhân tạo", "Ứng dụng trí tuệ máy vào nhận dạng, ngôn ngữ và ra quyết định."],
  "data-science": ["Khoa học dữ liệu", "Khai phá tri thức từ dữ liệu bằng thống kê và tính toán."],
  cybersecurity: ["An toàn thông tin", "Bảo vệ hệ thống, mạng và dữ liệu trước các mối đe dọa an ninh mạng."],
  "computer-networks": ["Mạng máy tính", "Thiết kế và quản trị hạ tầng kết nối, truyền thông dữ liệu."],
  "information-systems": ["Hệ thống thông tin", "Kết nối nghiệp vụ doanh nghiệp với giải pháp công nghệ."],
  "business-analytics": ["Phân tích kinh doanh", "Sử dụng dữ liệu để tối ưu hóa quyết định kinh doanh."],
  "game-development": ["Phát triển trò chơi", "Xây dựng cơ chế game, công cụ và trải nghiệm tương tác."],
  "business-administration": ["Quản trị kinh doanh", "Học quản lý, vận hành và chiến lược tổ chức."],
  marketing: ["Marketing", "Xây dựng thương hiệu và tạo nhu cầu thị trường."],
  "international-business": ["Kinh doanh quốc tế", "Vận hành và mở rộng hoạt động kinh doanh trên thị trường toàn cầu."],
  "human-resource-management": ["Quản trị nhân lực", "Quản lý nhân sự, phát triển tài năng và văn hóa tổ chức."],
  "logistics-supply-chain": ["Logistics và chuỗi cung ứng", "Tối ưu mua hàng, tồn kho, vận chuyển và giao nhận."],
  ecommerce: ["Thương mại điện tử", "Vận hành kênh kinh doanh trực tuyến và tăng trưởng số."],
  finance: ["Tài chính", "Phân tích vốn, đầu tư và quyết định tài chính."],
  banking: ["Ngân hàng", "Quản lý tín dụng, huy động vốn và dịch vụ ngân hàng."],
  accounting: ["Kế toán", "Ghi nhận, báo cáo và phân tích giao dịch tài chính."],
  economics: ["Kinh tế học", "Nghiên cứu thị trường, chính sách và hành vi kinh tế."],
  auditing: ["Kiểm toán", "Đánh giá kiểm soát, tuân thủ và độ tin cậy thông tin tài chính."],
  insurance: ["Bảo hiểm", "Đánh giá rủi ro và thiết kế sản phẩm bảo hiểm."],
  "graphic-design": ["Thiết kế đồ họa", "Truyền đạt ý tưởng bằng hình ảnh, bố cục và kiểu chữ."],
  "multimedia-design": ["Thiết kế đa phương tiện", "Sản xuất nội dung chuyển động, video và truyền thông đa nền tảng."],
  "ui-ux-design": ["Thiết kế UI/UX", "Thiết kế giao diện và trải nghiệm người dùng trực quan."],
  "digital-media": ["Truyền thông số", "Sản xuất và phân phối nội dung trên các kênh số."],
  "mechanical-engineering": ["Kỹ thuật cơ khí", "Phát triển hệ thống cơ khí cho công nghiệp và sản xuất."],
  "electrical-engineering": ["Kỹ thuật điện", "Thiết kế hệ thống điện, lưới điện và mạch điều khiển."],
  "civil-engineering": ["Kỹ thuật xây dựng", "Lập kế hoạch và thi công các công trình hạ tầng."],
  "automation-engineering": ["Kỹ thuật tự động hóa", "Tự động hóa quy trình bằng điều khiển và robot."],
  mechatronics: ["Cơ điện tử", "Kết hợp cơ khí, điện tử và phần mềm để tạo hệ thống thông minh."],
  medicine: ["Y khoa", "Đào tạo chẩn đoán, điều trị và chăm sóc lâm sàng."],
  pharmacy: ["Dược học", "Nghiên cứu, sản xuất và bảo đảm an toàn thuốc."],
  nursing: ["Điều dưỡng", "Chăm sóc bệnh nhân trực tiếp và phối hợp dịch vụ y tế."],
  "medical-laboratory": ["Xét nghiệm y học", "Thực hiện xét nghiệm chẩn đoán hỗ trợ quyết định điều trị."],
  law: ["Luật", "Nghiên cứu hệ thống pháp lý, quy định và giải quyết tranh chấp."],
  architecture: ["Kiến trúc", "Thiết kế không gian và công trình bảo đảm công năng và thẩm mỹ."],
  "tourism-hospitality-management": ["Quản trị du lịch và khách sạn", "Quản lý dịch vụ du lịch, sự kiện và vận hành khách sạn."],
  "english-language": ["Ngôn ngữ Anh", "Phát triển năng lực ngoại ngữ cho giao tiếp và hội nhập quốc tế."],
  pedagogy: ["Sư phạm", "Nghiên cứu phương pháp dạy học, chương trình và khoa học giáo dục."]
};

const phraseMap = [
  ["Software Engineer", "Kỹ sư phần mềm"],
  ["Data Scientist", "Nhà khoa học dữ liệu"],
  ["Data Analyst", "Chuyên viên phân tích dữ liệu"],
  ["Data Engineer", "Kỹ sư dữ liệu"],
  ["Machine Learning Engineer", "Kỹ sư học máy"],
  ["AI Research Engineer", "Kỹ sư nghiên cứu AI"],
  ["Computer Vision Engineer", "Kỹ sư thị giác máy tính"],
  ["NLP Engineer", "Kỹ sư xử lý ngôn ngữ tự nhiên"],
  ["Security Analyst", "Chuyên viên phân tích an ninh"],
  ["Penetration Tester", "Chuyên viên kiểm thử xâm nhập"],
  ["Network Engineer", "Kỹ sư mạng"],
  ["Business Analyst", "Chuyên viên phân tích kinh doanh"],
  ["Product Designer", "Nhà thiết kế sản phẩm"],
  ["UI Designer", "Nhà thiết kế UI"],
  ["UX Researcher", "Chuyên viên nghiên cứu UX"],
  ["Graphic Designer", "Nhà thiết kế đồ họa"],
  ["Doctor", "Bác sĩ"],
  ["Pharmacist", "Dược sĩ"],
  ["Nurse", "Điều dưỡng"],
  ["Teacher", "Giáo viên"],
  ["Translator", "Biên dịch viên"],
  ["Interpreter", "Phiên dịch viên"],
  ["Architect", "Kiến trúc sư"],
  ["Law", "Luật"],
  ["Engineer", "Kỹ sư"],
  ["Developer", "Lập trình viên"],
  ["Analyst", "Chuyên viên phân tích"],
  ["Specialist", "Chuyên viên"],
  ["Manager", "Quản lý"],
  ["Administrator", "Quản trị viên"],
  ["Consultant", "Tư vấn viên"],
  ["Coordinator", "Điều phối viên"],
  ["Associate", "Chuyên viên"],
  ["Officer", "Nhân viên"],
  ["Executive", "Chuyên viên"],
  ["Planner", "Chuyên viên hoạch định"],
  ["Researcher", "Nhà nghiên cứu"],
  ["Technician", "Kỹ thuật viên"],
  ["Technologist", "Chuyên gia kỹ thuật"],
  ["Producer", "Nhà sản xuất"],
  ["Designer", "Nhà thiết kế"],
  ["Programmer", "Lập trình viên"]
];

function translateCareerTitle(career) {
  let translated = career;

  phraseMap.forEach(([from, to]) => {
    translated = translated.replaceAll(from, to);
  });

  return translated === career ? `${career} (VN)` : translated;
}

const sections = (data.sections || [])
  .map((section) => {
    const meta = sectionMeta[section.id] || {
      order: 99,
      titleVi: section.title,
      focusVi: "",
      workTypesVi: [],
      outcomeJobsVi: []
    };

    return {
      ...section,
      order: meta.order,
      titleI18n: {
        en: section.title,
        vi: meta.titleVi
      },
      academicFocus: section.academicFocus || "",
      academicFocusI18n: {
        en: section.academicFocus || section.title,
        vi: meta.focusVi
      },
      workTypes: section.workTypes || [],
      workTypesI18n: {
        en: section.workTypes || [],
        vi: meta.workTypesVi
      },
      outcomeJobs: section.outcomeJobs || [],
      outcomeJobsI18n: {
        en: section.outcomeJobs || [],
        vi: meta.outcomeJobsVi
      }
    };
  })
  .sort((a, b) => (a.order || 99) - (b.order || 99));

const nodes = (data.nodes || []).map((node) => {
  const vi = majorVi[node.id];
  const careersVi = (node.careers || []).map((career) => translateCareerTitle(career));

  return {
    ...node,
    labelI18n: {
      en: node.label,
      vi: vi ? vi[0] : node.label
    },
    descriptionI18n: {
      en: node.description,
      vi: vi ? vi[1] : node.description
    },
    careersI18n: {
      en: node.careers || [],
      vi: careersVi
    }
  };
});

data.titleI18n = {
  en: data.title,
  vi: titleVi
};

data.descriptionI18n = {
  en: data.description || "Explore Vietnam university majors and related career paths by category.",
  vi: descriptionVi
};

data.sections = sections;
data.nodes = nodes;

data.academicOrder = sections.map((section) => section.id);

data.groupCatalog = sections.map((section) => ({
  id: section.id,
  order: section.order,
  title: section.title,
  titleI18n: section.titleI18n,
  academicFocusI18n: section.academicFocusI18n,
  workTypesI18n: section.workTypesI18n,
  outcomeJobsI18n: section.outcomeJobsI18n
}));

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

console.log({
  sections: data.sections.length,
  nodes: data.nodes.length,
  hasAcademicOrder: Array.isArray(data.academicOrder),
  nodeCareersI18n: data.nodes.filter((node) => node.careersI18n && node.careersI18n.vi).length
});
