const fs = require("fs");

const DATA_PATH = "data/vietnam-career-map.json";
const LIST_URL = "nhom-nganh-dao-tao.html";
const MAX_MAJORS = 220;
const CONCURRENCY = 8;

function stripTags(text) {
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtmlEntities(text) {
  const named = {
    nbsp: " ",
    amp: "&",
    quot: '"',
    apos: "'",
    lt: "<",
    gt: ">",
    // Common Latin entities that appear in Vietnamese content.
    agrave: "à",
    aacute: "á",
    acirc: "â",
    atilde: "ã",
    auml: "ä",
    aring: "å",
    egrave: "è",
    eacute: "é",
    ecirc: "ê",
    iacute: "í",
    igrave: "ì",
    oacute: "ó",
    ograve: "ò",
    ocirc: "ô",
    otilde: "õ",
    ouml: "ö",
    uacute: "ú",
    ugrave: "ù",
    ucirc: "û",
    udblac: "ű",
    yacute: "ý",
    yuml: "ÿ",
    aelig: "æ",
    ccedil: "ç",
    ntilde: "ñ",
    szlig: "ß",
    oslash: "ø",
    thorn: "þ",
    eth: "ð",
    Agrave: "À",
    Aacute: "Á",
    Acirc: "Â",
    Atilde: "Ã",
    Egrave: "È",
    Eacute: "É",
    Ecirc: "Ê",
    Iacute: "Í",
    Igrave: "Ì",
    Oacute: "Ó",
    Ograve: "Ò",
    Ocirc: "Ô",
    Otilde: "Õ",
    Uacute: "Ú",
    Ugrave: "Ù",
    Ucirc: "Û",
    Yacute: "Ý",
    // Vietnamese-specific extensions often used by some CMS exports.
    abreve: "ă",
    Abreve: "Ă",
    ohorn: "ơ",
    Ohorn: "Ơ",
    uhorn: "ư",
    Uhorn: "Ư",
    dstrok: "đ",
    Dstrok: "Đ"
  };

  const decodedNumeric = text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCodePoint(parseInt(code, 16)));

  return decodedNumeric.replace(/&([a-zA-Z]+);/g, (full, key) => {
    if (named[key]) {
      return named[key];
    }

    // Keep unknown entities unchanged to avoid silent data loss.
    return full;
  });
}

function stripTagsMultiline(text) {
  return decodeHtmlEntities(
    text
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<\s*br\s*\/?\s*>/gi, "\n")
      .replace(/<\s*\/p\s*>/gi, "\n")
      .replace(/<\s*\/li\s*>/gi, "\n")
      .replace(/<\s*\/h[1-6]\s*>/gi, "\n")
      .replace(/<[^>]*>/g, " ")
      .replace(/\t/g, " ")
      .replace(/[ ]{2,}/g, " ")
      .replace(/\n{2,}/g, "\n")
      .trim()
  );
}

function toSlug(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeMajorName(name) {
  return name
    .replace(/^nganh\s+/i, "")
    .replace(/^ngành\s+/i, "")
    .replace(/^chuyen\s+nganh\s+/i, "")
    .replace(/^chuyên\s+ngành\s+/i, "")
    .trim();
}

function normalizeNoAccent(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeForSearch(value) {
  return normalizeNoAccent(decodeHtmlEntities(value)).replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function assignGroupId(majorName) {
  const normalized = normalizeNoAccent(majorName);

  if (/(cong nghe thong tin|khoa hoc may tinh|an toan thong tin|tri tue nhan tao|du lieu|toan tin|mang may tinh|phan mem)/.test(normalized)) {
    return "it-computing";
  }
  if (/(tai chinh|ngan hang|ke toan|kiem toan|bao hiem|kinh te|dau tu)/.test(normalized)) {
    return "finance-economics";
  }
  if (/(quan tri|marketing|kinh doanh|thuong mai|logistics|du lich|khach san|dich vu)/.test(normalized)) {
    return "business-management";
  }
  if (/(ky thuat|co khi|dien|xay dung|tu dong hoa|o to|nang luong|vat lieu|hoa hoc)/.test(normalized)) {
    return "engineering-technology";
  }
  if (/(y|duoc|dieu duong|xet nghiem|rang ham mat|ho sinh|y te cong cong|phuc hoi chuc nang)/.test(normalized)) {
    return "health-medical";
  }
  if (/(luat|kien truc|quy hoach|quan ly cong|quan ly nha nuoc|quan he quoc te|hanh chinh)/.test(normalized)) {
    return "law-public-architecture";
  }
  if (/(su pham|giao duc|ngon ngu|van hoc|lich su|dia ly|tam ly|xa hoi hoc)/.test(normalized)) {
    return "education-language-social";
  }
  if (/(thiet ke|truyen thong|bao chi|my thuat|dien anh|nhiep anh|do hoa|da phuong tien)/.test(normalized)) {
    return "design-media-arts";
  }
  if (/(nong|lam|ngu|thuy san|chan nuoi|thu y|moi truong|sinh hoc)/.test(normalized)) {
    return "agriculture-environment";
  }

  return "other-interdisciplinary";
}

function suggestJobsByMajor(majorName, groupId, groupMetaItem) {
  const n = normalizeNoAccent(majorName);

  const common = [
    `Chuyên viên ${majorName}`,
    `Trợ lý dự án ngành ${majorName}`
  ];

  if (groupId === "it-computing") {
    return [
      `Kỹ sư ${majorName}`,
      `Lập trình viên ${majorName}`,
      `Chuyên viên triển khai ${majorName}`,
      `Chuyên viên phân tích hệ thống ${majorName}`,
      ...common
    ].slice(0, 6);
  }

  if (groupId === "finance-economics") {
    return [
      `Chuyên viên phân tích ${majorName}`,
      `Chuyên viên tư vấn ${majorName}`,
      `Chuyên viên nghiệp vụ ${majorName}`,
      `Kiểm soát viên ${majorName}`,
      ...common
    ].slice(0, 6);
  }

  if (groupId === "business-management") {
    return [
      `Chuyên viên vận hành ${majorName}`,
      `Chuyên viên phát triển kinh doanh ${majorName}`,
      `Chuyên viên tư vấn ${majorName}`,
      `Quản trị viên ${majorName}`,
      ...common
    ].slice(0, 6);
  }

  if (groupId === "engineering-technology") {
    return [
      `Kỹ sư ${majorName}`,
      `Kỹ thuật viên ${majorName}`,
      `Chuyên viên giám sát ${majorName}`,
      `Chuyên viên thiết kế ${majorName}`,
      ...common
    ].slice(0, 6);
  }

  if (groupId === "health-medical") {
    const clinical = /y|duoc|dieu duong|xet nghiem|rang ham mat|ho sinh/.test(n);
    return [
      clinical ? `Nhân sự chuyên môn ${majorName}` : `Chuyên viên ${majorName}`,
      `Chuyên viên chăm sóc sức khỏe từ ${majorName}`,
      `Chuyên viên kỹ thuật ${majorName}`,
      `Điều phối viên dịch vụ ${majorName}`,
      ...common
    ].slice(0, 6);
  }

  if (groupId === "law-public-architecture") {
    return [
      `Chuyên viên pháp lý/quản lý ${majorName}`,
      `Tư vấn viên ${majorName}`,
      `Chuyên viên hồ sơ dự án ${majorName}`,
      `Điều phối viên ${majorName}`,
      ...common
    ].slice(0, 6);
  }

  if (groupId === "education-language-social") {
    return [
      `Giảng viên/giáo viên ${majorName}`,
      `Biên tập/biên soạn ${majorName}`,
      `Chuyên viên đào tạo ${majorName}`,
      `Tư vấn giáo dục ${majorName}`,
      ...common
    ].slice(0, 6);
  }

  if (groupId === "design-media-arts") {
    return [
      `Nhà thiết kế ${majorName}`,
      `Chuyên viên sản xuất nội dung ${majorName}`,
      `Chuyên viên sáng tạo ${majorName}`,
      `Biên tập viên ${majorName}`,
      ...common
    ].slice(0, 6);
  }

  if (groupId === "agriculture-environment") {
    return [
      `Kỹ sư ${majorName}`,
      `Chuyên viên hiện trường ${majorName}`,
      `Chuyên viên phát triển bền vững ${majorName}`,
      `Chuyên viên kiểm định ${majorName}`,
      ...common
    ].slice(0, 6);
  }

  const fallbackGroupOutcomes = groupMetaItem?.outcomeJobsVi ?? [];
  const merged = fallbackGroupOutcomes.map((job) => `${job} (${majorName})`);
  return [...merged, ...common].slice(0, 6);
}

const groupMeta = {
  "it-computing": {
    order: 1,
    titleEn: "IT and Computing",
    titleVi: "Công nghệ thông tin và máy tính",
    focusVi: "Đào tạo lập trình, dữ liệu, hệ thống và công nghệ số.",
    workTypesVi: ["Doanh nghiệp công nghệ", "Sản phẩm số", "Dịch vụ CNTT", "Khởi nghiệp công nghệ", "R&D"],
    outcomeJobsVi: ["Lập trình viên", "Kỹ sư dữ liệu", "Kỹ sư AI", "Kỹ sư hệ thống", "Chuyên viên an toàn thông tin"]
  },
  "business-management": {
    order: 2,
    titleEn: "Business and Management",
    titleVi: "Kinh doanh và quản trị",
    focusVi: "Đào tạo quản trị doanh nghiệp, vận hành, marketing và thương mại.",
    workTypesVi: ["Doanh nghiệp thương mại", "Bán lẻ", "Thương mại điện tử", "Tư vấn", "Khởi nghiệp"],
    outcomeJobsVi: ["Chuyên viên kinh doanh", "Chuyên viên marketing", "Quản lý vận hành", "Chuyên viên nhân sự", "Chuyên viên chuỗi cung ứng"]
  },
  "finance-economics": {
    order: 3,
    titleEn: "Finance and Economics",
    titleVi: "Tài chính, kế toán và kinh tế",
    focusVi: "Đào tạo tài chính, kế toán, kiểm toán và phân tích kinh tế.",
    workTypesVi: ["Ngân hàng", "Công ty chứng khoán", "Kiểm toán", "Bảo hiểm", "Tài chính doanh nghiệp"],
    outcomeJobsVi: ["Chuyên viên tài chính", "Kế toán", "Kiểm toán viên", "Chuyên viên tín dụng", "Chuyên viên phân tích kinh tế"]
  },
  "engineering-technology": {
    order: 4,
    titleEn: "Engineering and Technology",
    titleVi: "Kỹ thuật và công nghệ ứng dụng",
    focusVi: "Đào tạo kỹ thuật chế tạo, điện, xây dựng và tự động hóa.",
    workTypesVi: ["Nhà máy", "Công trường", "Doanh nghiệp cơ điện", "Hạ tầng", "Năng lượng"],
    outcomeJobsVi: ["Kỹ sư cơ khí", "Kỹ sư điện", "Kỹ sư xây dựng", "Kỹ sư tự động hóa", "Kỹ sư vận hành"]
  },
  "health-medical": {
    order: 5,
    titleEn: "Health and Medical",
    titleVi: "Y dược và sức khỏe",
    focusVi: "Đào tạo khám chữa bệnh, dược, điều dưỡng và kỹ thuật y học.",
    workTypesVi: ["Bệnh viện", "Phòng khám", "Doanh nghiệp dược", "Xét nghiệm", "Y tế cộng đồng"],
    outcomeJobsVi: ["Bác sĩ", "Dược sĩ", "Điều dưỡng", "Kỹ thuật viên y học", "Chuyên viên quản lý y tế"]
  },
  "law-public-architecture": {
    order: 6,
    titleEn: "Law, Public and Architecture",
    titleVi: "Luật, công và kiến trúc",
    focusVi: "Đào tạo pháp lý, quản lý công, kiến trúc và quy hoạch.",
    workTypesVi: ["Văn phòng luật", "Pháp chế doanh nghiệp", "Cơ quan công", "Công ty kiến trúc", "Tư vấn quy hoạch"],
    outcomeJobsVi: ["Chuyên viên pháp lý", "Luật sư", "Kiến trúc sư", "Chuyên viên quản lý công", "Chuyên viên quy hoạch"]
  },
  "education-language-social": {
    order: 7,
    titleEn: "Education, Language and Social",
    titleVi: "Sư phạm, ngôn ngữ và xã hội",
    focusVi: "Đào tạo giảng dạy, ngôn ngữ, truyền đạt tri thức và khoa học xã hội.",
    workTypesVi: ["Trường học", "Trung tâm đào tạo", "Biên phiên dịch", "Tổ chức xã hội", "Truyền thông giáo dục"],
    outcomeJobsVi: ["Giáo viên", "Biên dịch viên", "Phiên dịch viên", "Chuyên viên giáo dục", "Chuyên viên xã hội"]
  },
  "design-media-arts": {
    order: 8,
    titleEn: "Design, Media and Arts",
    titleVi: "Thiết kế, truyền thông và nghệ thuật",
    focusVi: "Đào tạo thiết kế, sáng tạo nội dung và sản xuất truyền thông.",
    workTypesVi: ["Studio", "Agency", "Tòa soạn", "Sản xuất nội dung", "Freelance"],
    outcomeJobsVi: ["Nhà thiết kế", "Chuyên viên truyền thông", "Biên tập viên", "Nhà sản xuất nội dung", "Nghệ sĩ số"]
  },
  "agriculture-environment": {
    order: 9,
    titleEn: "Agriculture and Environment",
    titleVi: "Nông nghiệp và môi trường",
    focusVi: "Đào tạo nông lâm ngư nghiệp, công nghệ sinh học và môi trường.",
    workTypesVi: ["Trang trại", "Doanh nghiệp nông nghiệp", "Kiểm định", "Môi trường", "Phát triển bền vững"],
    outcomeJobsVi: ["Kỹ sư nông nghiệp", "Kỹ sư môi trường", "Chuyên viên kiểm định", "Chuyên viên phát triển bền vững", "Chuyên viên kỹ thuật sinh học"]
  },
  "other-interdisciplinary": {
    order: 10,
    titleEn: "Other and Interdisciplinary",
    titleVi: "Ngành khác và liên ngành",
    focusVi: "Nhóm ngành liên ngành hoặc chưa đủ tín hiệu để phân nhóm chuyên sâu.",
    workTypesVi: ["Doanh nghiệp đa ngành", "Tư vấn", "Nghiên cứu", "Tổ chức dịch vụ"],
    outcomeJobsVi: ["Chuyên viên tổng hợp", "Điều phối dự án", "Nghiên cứu viên", "Tư vấn viên"]
  }
};

function extractMajorLinks(html) {
  const regex = /<a[^>]+href="(https:\/\/tuyensinhso\.vn\/nhom-nganh-dao-tao\/nganh-[^"]+\.html)"[^>]*>([\s\S]*?)<\/a>/gi;
  const result = [];
  const seen = new Set();

  let match;
  while ((match = regex.exec(html)) !== null) {
    const url = match[1];
    const raw = stripTags(match[2]);
    const name = normalizeMajorName(raw);

    if (!name || name.length < 3) {
      continue;
    }

    if (seen.has(url)) {
      continue;
    }

    seen.add(url);
    result.push({ url, name });
  }

  return result.slice(0, MAX_MAJORS);
}

function extractJobsFromMajorPage(html) {
  function buildJobs(sectionHtml, sectionText) {
    const liJobs = [];
    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    let liMatch;
    while ((liMatch = liRegex.exec(sectionHtml)) !== null) {
      const text = stripTagsMultiline(liMatch[1]);
      if (text.length >= 4 && text.length <= 180) {
        liJobs.push(text.replace(/^[-*\d.\s]+/, "").trim());
      }
    }

    const jobsFromSentence = sectionText
      .split(/\n|\.|;/)
      .map((item) => item.trim())
      .filter((item) => item.length >= 12 && item.length <= 140)
      .filter((item) => !/^xem\s+them$/i.test(item));

    const jobs = Array.from(new Set((liJobs.length > 0 ? liJobs : jobsFromSentence))).slice(0, 14);
    return jobs;
  }

  function extractFallbackSectionFromText(rawHtml) {
    const text = stripTagsMultiline(rawHtml);
    const lines = text
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    const normalizedLines = lines.map((line) => normalizeForSearch(line));

    let startIndex = -1;
    for (let i = 0; i < normalizedLines.length; i += 1) {
      const line = normalizedLines[i];

      if (/(co hoi viec lam|co hoi nghe nghiep|hoc nganh .* ra lam gi|ra truong lam gi|viec lam nganh)/.test(line)) {
        startIndex = i;
        break;
      }

      if (/(sau khi tot nghiep).*(co the lam viec|lam viec tai|lam viec o|co hoi viec lam|that nghiep)/.test(line)) {
        startIndex = i;
        break;
      }
    }

    if (startIndex < 0) {
      return "";
    }

    let endIndex = lines.length;
    for (let i = startIndex + 1; i < normalizedLines.length; i += 1) {
      const line = normalizedLines[i];
      if (/^(7|8|9|10|11|12)\s/.test(line) && /(muc luong|nhung to chat|thong tin can biet|diem chuan|tin tuc lien quan)/.test(line)) {
        endIndex = i;
        break;
      }

      if (/^(thong tin can biet|diem chuan dai hoc|tin tuc lien quan)$/.test(line)) {
        endIndex = i;
        break;
      }
    }

    const sectionLines = lines.slice(startIndex, endIndex);
    const sectionText = sectionLines.join("\n").trim();
    if (sectionText.length > 2400) {
      return sectionText.slice(0, 2400);
    }
    return sectionText;
  }

  const stripped = html.replace(/\r/g, "");
  const headingRegex = /<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/gi;
  const headings = [];
  let headingMatch;

  while ((headingMatch = headingRegex.exec(stripped)) !== null) {
    const rawHeading = headingMatch[0];
    const headingText = stripTagsMultiline(rawHeading);
    headings.push({
      start: headingMatch.index,
      end: headingRegex.lastIndex,
      text: headingText,
      normalized: normalizeForSearch(headingText)
    });
  }

  const targetHeading = headings.find((heading) =>
    /(co hoi viec lam|co hoi nghe nghiep|viec lam sau khi ra truong|ra truong lam gi)/.test(heading.normalized)
  );

  if (!targetHeading) {
    const fallbackText = extractFallbackSectionFromText(stripped);
    if (!fallbackText) {
      return { jobs: [], sectionText: "" };
    }

    return {
      jobs: buildJobs("", fallbackText),
      sectionText: fallbackText
    };
  }

  const nextHeading = headings.find((heading) => heading.start > targetHeading.start);
  const sectionHtml = stripped.slice(targetHeading.end, nextHeading ? nextHeading.start : stripped.length);
  const sectionText = stripTagsMultiline(sectionHtml);

  const jobs = buildJobs(sectionHtml, sectionText);
  return { jobs, sectionText };
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });
  if (!response.ok) {
    throw new Error(`Request failed ${response.status} for ${url}`);
  }
  return response.text();
}

async function runPool(items, worker, concurrency) {
  const result = new Array(items.length);
  let index = 0;

  async function next() {
    if (index >= items.length) {
      return;
    }

    const currentIndex = index;
    index += 1;

    result[currentIndex] = await worker(items[currentIndex], currentIndex);
    await next();
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => next()));
  return result;
}

function buildGroupCatalog(majors) {
  const groups = new Map();

  majors.forEach((major) => {
    const groupId = major.groupId;
    if (!groups.has(groupId)) {
      const meta = groupMeta[groupId] || groupMeta["other-interdisciplinary"];
      groups.set(groupId, {
        id: groupId,
        order: meta.order,
        title: meta.titleEn,
        titleI18n: { en: meta.titleEn, vi: meta.titleVi },
        academicFocusI18n: { en: meta.titleEn, vi: meta.focusVi },
        workTypesI18n: { en: [], vi: meta.workTypesVi },
        outcomeJobsI18n: { en: [], vi: meta.outcomeJobsVi },
        majorIds: [],
        portalMajorsI18n: { en: [], vi: [] },
        majors: []
      });
    }

    const group = groups.get(groupId);
    const meta = groupMeta[groupId] || groupMeta["other-interdisciplinary"];
    const directJobs = major.jobs.length > 0 ? major.jobs : suggestJobsByMajor(major.name, groupId, meta);

    group.portalMajorsI18n.vi.push(major.name);
    group.majors.push({
      id: major.id,
      nameI18n: { en: major.name, vi: major.name },
      sourceUrl: major.url,
      jobsI18n: {
        en: [],
        vi: directJobs
      },
      careerSectionI18n: {
        en: "",
        vi: major.sectionText || ""
      }
    });
  });

  return Array.from(groups.values())
    .map((group) => ({
      ...group,
      portalMajorsI18n: {
        en: group.portalMajorsI18n.en,
        vi: Array.from(new Set(group.portalMajorsI18n.vi)).sort((a, b) => a.localeCompare(b, "vi"))
      },
      majors: group.majors.sort((a, b) => {
        const aName = a.nameI18n.vi || a.nameI18n.en || "";
        const bName = b.nameI18n.vi || b.nameI18n.en || "";
        return aName.localeCompare(bName, "vi");
      })
    }))
    .sort((a, b) => a.order - b.order);
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  const retryMissingOnly = process.env.RETRY_MISSING_ONLY === "1";

  let majors = [];

  if (retryMissingOnly) {
    majors = (data.groupCatalog || [])
      .flatMap((group) =>
        (group.majors || []).map((major) => ({
          name: major.nameI18n?.vi || major.nameI18n?.en || "",
          url: major.sourceUrl || ""
        }))
      )
      .filter((major) => major.name && major.url)
      .filter((major) => {
        const group = (data.groupCatalog || []).find((item) =>
          (item.majors || []).some((m) => (m.sourceUrl || "") === major.url)
        );
        if (!group) {
          return false;
        }

        const existing = (group.majors || []).find((m) => (m.sourceUrl || "") === major.url);
        const section = existing?.careerSectionI18n?.vi || "";
        return section.trim().length === 0;
      });

    majors = Array.from(new Map(majors.map((item) => [item.url, item])).values());
  } else {
    const listHtml = await fetchHtml(LIST_URL);
    majors = extractMajorLinks(listHtml);
  }

  if (majors.length === 0) {
    console.log({ retryMissingOnly, fetchedMajors: 0, updatedMajors: 0, message: "No target majors to process." });
    return;
  }

  const majorsWithJobs = await runPool(
    majors,
    async (major, idx) => {
      try {
        const html = await fetchHtml(major.url);
        const extracted = extractJobsFromMajorPage(html);
        return {
          id: toSlug(major.name),
          name: major.name,
          url: major.url,
          jobs: extracted.jobs,
          sectionText: extracted.sectionText,
          groupId: assignGroupId(major.name),
          index: idx
        };
      } catch {
        return {
          id: toSlug(major.name),
          name: major.name,
          url: major.url,
          jobs: [],
          sectionText: "",
          groupId: assignGroupId(major.name),
          index: idx
        };
      }
    },
    CONCURRENCY
  );

  const dedupByName = new Map();
  majorsWithJobs.forEach((major) => {
    if (!dedupByName.has(major.name)) {
      dedupByName.set(major.name, major);
      return;
    }

    const existing = dedupByName.get(major.name);
    const majorScore = (major.sectionText?.length || 0) * 100 + (major.jobs?.length || 0);
    const existingScore = (existing.sectionText?.length || 0) * 100 + (existing.jobs?.length || 0);
    if (majorScore > existingScore) {
      dedupByName.set(major.name, major);
    }
  });

  const normalizedMajors = Array.from(dedupByName.values());

  if (retryMissingOnly) {
    let updatedMajors = 0;
    const updatesByUrl = new Map(normalizedMajors.map((item) => [item.url, item]));

    (data.groupCatalog || []).forEach((group) => {
      (group.majors || []).forEach((major) => {
        const update = updatesByUrl.get(major.sourceUrl || "");
        if (!update) {
          return;
        }

        const hasSection = (update.sectionText || "").trim().length > 0;
        if (hasSection) {
          major.careerSectionI18n = {
            ...(major.careerSectionI18n || {}),
            vi: update.sectionText,
            en: major.careerSectionI18n?.en || ""
          };
          updatedMajors += 1;
        }

        const existingJobs = major.jobsI18n?.vi || [];
        if ((existingJobs.length === 0 || !hasSection) && (update.jobs || []).length > 0) {
          major.jobsI18n = {
            ...(major.jobsI18n || {}),
            vi: update.jobs,
            en: major.jobsI18n?.en || []
          };
        }
      });
    });

    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf8");

    const stillMissing = (data.groupCatalog || [])
      .flatMap((group) => group.majors || [])
      .filter((major) => !(major.careerSectionI18n?.vi || "").trim()).length;

    console.log({
      retryMissingOnly,
      fetchedMajors: majors.length,
      updatedMajors,
      stillMissingCareerSection: stillMissing
    });
    return;
  }

  const groupCatalog = buildGroupCatalog(normalizedMajors);

  data.sourceReferences = [
    {
      id: "tuyensinhso-major-groups",
      name: "Tuyển Sinh Số",
      url: LIST_URL,
      description: "Danh sách nhóm ngành và ngành nghề đại học, dùng để đồng bộ group catalog.",
      descriptionI18n: {
        en: "Major groups and major list used to synchronize group catalog.",
        vi: "Danh sách nhóm ngành và ngành nghề đại học, dùng để đồng bộ group catalog."
      }
    }
  ];

  data.groupCatalog = groupCatalog;
  data.academicOrder = groupCatalog.map((group) => group.id);

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf8");

  const majorsWithJobCount = normalizedMajors.filter((major) => (major.jobs || []).length > 0).length;
  const majorsWithSectionCount = normalizedMajors.filter((major) => (major.sectionText || "").trim().length > 0).length;
  console.log({
    fetchedMajors: majors.length,
    deduplicatedMajors: normalizedMajors.length,
    majorsWithJobCount,
    majorsWithSectionCount,
    groups: groupCatalog.length
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

