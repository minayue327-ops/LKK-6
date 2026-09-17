import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Global browser shims for SSR
(global as any).getComputedStyle = () => ({
  getPropertyValue: () => '',
  color: '',
  fontSize: '16px',
  width: '100px',
  height: '100px'
});
(global as any).IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
(global as any).ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
(global as any).requestAnimationFrame = (cb: any) => setTimeout(cb, 0);
(global as any).cancelAnimationFrame = (id: any) => clearTimeout(id);
(global as any).localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};

// Register image extensions so node doesn't choke
const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.mp4'];
for (const ext of extensions) {
  require.extensions[ext] = (module: any, filename: string) => {
    module.exports = filename;
  };
}

// Load url mapping
const urlMap: Record<string, string> = JSON.parse(fs.readFileSync('scripts/url-map.json', 'utf8'));

const pagesToGenerate: Array<{
  filename: string;
  pageKey: string;
  title: string;
  description: string;
}> = [
  {
    filename: 'index.html',
    pageKey: 'home',
    title: 'LKK 洛可可创新设计集团 - 三品合一助力企业成为品类冠军 | 22年全案设计创新服务',
    description: '洛可可创新设计集团（LKK）创立于2004年，作为国家级工业设计示范企业，首创「三品合一」品类战略创新方法论，涵盖品类战略咨询、产品创新设计、品牌创新设计全链路服务。'
  },
  {
    filename: 'contact-us.html',
    pageKey: 'contact',
    title: '联系我们 - LKK 洛可可创新设计集团 | 全国12城布局 快速响应创新需求',
    description: '联系洛可可创新设计集团全国各办事处与专家团队。提供商业创新评估、爆品孵化咨询、工业设计与品牌升级一对一沟通。咨询热线：400-062-3130。'
  },
  {
    filename: 'case-detail.html',
    pageKey: 'case-detail',
    title: '精选爆品案例详情 - LKK 洛可可创新设计集团 | 助力小仙炖、海底捞打造品类冠军',
    description: '深度复盘洛可可打造的超级爆品与品类冠军案例，包含小仙炖鲜炖燕窝冷鲜包装、海底捞智慧餐厅、思哲睿手术机器人等全案拆解与创新实效。'
  },
  {
    filename: 'product-innovation.html',
    pageKey: 'product',
    title: '产品创新设计 - LKK 洛可可创新设计集团 | 工业设计·结构工程·CMF·量产落地',
    description: '洛可可产品创新服务涵盖全链路硬件创新设计，从工业设计概念、人机工程、结构开模评估到CMF趋势落地，已斩获国际顶级设计大奖600余项。'
  },
  {
    filename: 'brand-innovation.html',
    pageKey: 'brand',
    title: '品牌创新设计 - LKK 洛可可创新设计集团 | 品牌全案·超级符号·包装创新·IP打造',
    description: '洛可可品牌创新体系以超级符号与品类心智为核心，为企业提供从品牌顶层战略定位、VI视觉识别系统、爆品包装矩阵到文创潮玩IP的全域体验设计。'
  },
  {
    filename: 'cases.html',
    pageKey: 'cases',
    title: '客户案例精选 - LKK 洛可可创新设计集团 | 2000+行业伙伴与世界500强的共同选择',
    description: '浏览洛可可22年来为世界500强企业、独角兽品牌及专精特新隐形冠军打造的数百个现象级爆品案例库，涵盖硬科技、智能硬件、快消食品等前沿赛道。'
  },
  {
    filename: 'category-consulting.html',
    pageKey: 'category-v2',
    title: '品类战略创新咨询 - LKK 洛可可创新设计集团 | 帮助企业找准黄金赛道 成为品类第一',
    description: '洛可可品类战略创新咨询，打破传统咨询与设计割裂局面，以咨询定方向，以设计做爆品，以品牌占心智，实现从战略规划到商业落地的闭环交付。'
  },
  {
    filename: 'three-in-one.html',
    pageKey: 'three-in-one',
    title: '三品合一方法论 - LKK 洛可可创新设计集团 | 品类战略×产品创新×品牌心智',
    description: '贾伟先生创立的「三品合一」创新方法论：品类战略是灯塔，产品创新是抓手，品牌心智是壁垒。三大支柱协同发力，构建企业持续增长底座。'
  },
  {
    filename: 'three-in-one-learning.html',
    pageKey: 'three-in-one-learning',
    title: '三品合一研习院 - LKK 洛可可创新设计集团 | 董事长高管研修营·实战工作坊',
    description: '洛可可三品合一研习院，由贾伟及集团合伙人亲授，提供董事长品类战略高管营、爆品打造实战营及企业内训，助力千家企业创始人掌握商业创新逻辑。'
  },
  {
    filename: 'course-detail.html',
    pageKey: 'course-landing',
    title: '实战课程详情 - LKK 洛可可创新设计集团三品合一研习院',
    description: '查看三品合一研习院各期精品课程大纲、师资阵容、实战演练案例及限额报名入口。'
  },
  {
    filename: 'three-in-one-category.html',
    pageKey: 'three-in-one-category',
    title: '三品合一品类创新咨询专页 - LKK 洛可可创新设计集团',
    description: '洛可可三品合一品类创新咨询专线服务，帮助专精特新与传统转型企业明确品类定位，开创并定义全新赛道。'
  },
  {
    filename: 'product-innovation-consulting.html',
    pageKey: 'product-innovation-consulting',
    title: '产品创新0-1全案咨询 - LKK 洛可可创新设计集团',
    description: '从用户洞察、定义爆品定义书、可行性验证到敏捷试产，提供全流程陪伴式产品创新0-1咨询。'
  },
  {
    filename: 'brand-innovation-consulting.html',
    pageKey: 'brand-innovation-consulting',
    title: '品牌创新0-1全案咨询 - LKK 洛可可创新设计集团',
    description: '打造深入人心的超级品牌认知体系，重构品牌价值主张与消费触点体验。'
  },
  {
    filename: 'service-detail.html',
    pageKey: 'industrial-design',
    title: '细分设计服务详情 - LKK 洛可可创新设计集团 | 工业设计·结构设计·生产落地',
    description: '了解洛可可各专业细分领域的深度设计服务标准、设计流程与交付周期。'
  },
  {
    filename: 'about-us.html',
    pageKey: 'about',
    title: '关于洛可可 - 22年专注设计创新与品类突围 | LKK 洛可可创新设计集团',
    description: '洛可可创新设计集团成立于2004年，以贾伟先生为核心，秉持「创意是水」的哲学，累计荣获世界四大设计大奖600余项，服务超10000家海内外知名品牌。'
  },
  {
    filename: 'news.html',
    pageKey: 'news',
    title: '新闻中心 - LKK 洛可可创新设计集团 | 最新企业资讯·行业深度洞见',
    description: '掌握洛可可最新集团动态、国际设计大奖获奖报道、行业前沿技术洞察及贾伟先生深度设计观点。'
  },
  {
    filename: 'news-detail.html',
    pageKey: 'news-detail',
    title: '新闻详情 - LKK 洛可可创新设计集团',
    description: '阅读洛可可官方发布的深度文章、行业专访及创新案例白皮书解读。'
  },
  {
    filename: 'industry.html',
    pageKey: 'industry',
    title: '行业专精解决方案 - LKK 洛可可创新设计集团 | 14大垂直赛道深耕经验',
    description: '洛可可深入具身智能机器人、高端医疗装备、智能新能源、智能家电、新消费食品酒饮等14个垂直产业赛道，提供针对性的爆品落地解决方案。'
  },
  {
    filename: 'industry-detail.html',
    pageKey: 'industry-detail',
    title: '垂直行业解决方案详情 - LKK 洛可可创新设计集团',
    description: '探索针对特定垂直产业的深度痛点剖析、成功范式、标杆案例与专家团队。'
  },
  {
    filename: 'insights.html',
    pageKey: 'insights',
    title: '行业洞察与研究报告 - LKK 洛可可创新设计集团 | 免费下载趋势白皮书',
    description: '洛可可设计创新趋势研究中心定期发布新消费、硬科技、智能硬件等各赛道年度发展洞察与品类突围白皮书。'
  },
  {
    filename: 'success-path.html',
    pageKey: 'success-path',
    title: '企业成功路径 - LKK 洛可可创新设计集团 | 从0到1爆品突破 到1到100品类冠军',
    description: '洛可可梳理提炼的中国企业商业创新成长路径图：从概念萌芽、原型打磨、量产上市到品牌心智护城河构建。'
  }
];

function sanitizeHtml(html: string): string {
  // 1. Replace remote github release URLs with local assets/images/
  for (const [remoteUrl, localPath] of Object.entries(urlMap)) {
    if (remoteUrl.startsWith('http')) {
      const escaped = remoteUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      html = html.replace(new RegExp(escaped, 'g'), localPath);
    }
  }

  // 2. Replace local /app/applet/src/assets/images/... and /src/assets/images/...
  html = html.replace(/src=["']\/app\/applet\/src\/assets\/images\/([^"']+)["']/g, 'src="assets/images/$1"');
  html = html.replace(/src=["']\/src\/assets\/images\/([^"']+)["']/g, 'src="assets/images/$1"');
  html = html.replace(/src=["']src\/assets\/images\/([^"']+)["']/g, 'src="assets/images/$1"');

  // Also replace any remaining github releases urls with generic local image
  html = html.replace(/https:\/\/github\.com\/minaxyue-ops\/MINA\/releases\/download\/[^"' )]+/g, (match) => {
    let basename = path.basename(decodeURIComponent(match));
    if (match.includes('2%E6%A1%88%E4%BE%8B') || match.includes('2案例')) {
      basename = 'casedetail_' + basename;
    }
    basename = basename.replace(/[^a-zA-Z0-9._-]/g, '_');
    return 'assets/images/' + basename;
  });

  // 3. Convert navigation links to relative static html URLs
  // Header Logo link
  html = html.replace(/<a[^>]*href="#"[^>]*class="[^"]*inline-flex items-center flex-shrink-0 group"[^>]*>/g, '<a href="index.html" class="inline-flex items-center flex-shrink-0 group">');

  // Navigation Links in Header & Footer
  const linkReplacements: Array<[RegExp, string]> = [
    [/href="\/about"/g, 'href="about-us.html"'],
    [/href="\/about-us"/g, 'href="about-us.html"'],
    [/href="\/contact"/g, 'href="contact-us.html"'],
    [/href="\/contact-us"/g, 'href="contact-us.html"'],
    [/href="\/cases"/g, 'href="cases.html"'],
    [/href="\/case-detail"/g, 'href="case-detail.html"'],
    [/href="\/news"/g, 'href="news.html"'],
    [/href="\/news-detail"/g, 'href="news-detail.html"'],
    [/href="\/insights"/g, 'href="insights.html"'],
    [/href="\/success-path"/g, 'href="success-path.html"'],
    [/href="\/product-innovation"/g, 'href="product-innovation.html"'],
    [/href="\/brand-innovation"/g, 'href="brand-innovation.html"'],
    [/href="\/category-consulting-2"/g, 'href="category-consulting.html"'],
    [/href="\/category-consulting"/g, 'href="category-consulting.html"'],
    [/href="\/three-in-one"/g, 'href="three-in-one.html"'],
    [/href="\/three-in-one-learning"/g, 'href="three-in-one-learning.html"'],
    [/href="\/three-in-one-category"/g, 'href="three-in-one-category.html"'],
    [/href="\/product-innovation-consulting"/g, 'href="product-innovation-consulting.html"'],
    [/href="\/brand-innovation-consulting"/g, 'href="brand-innovation-consulting.html"'],
    [/href="\/industry"/g, 'href="industry.html"'],
    [/href="\/course-detail"/g, 'href="course-detail.html"'],
    [/href="\/service-detail"/g, 'href="service-detail.html"']
  ];

  for (const [re, rep] of linkReplacements) {
    html = html.replace(re, rep);
  }

  // 4. Ensure standard HTML form attributes with required and names
  // In footer form:
  html = html.replace(
    /<form([^>]*)class="([^"]*flex flex-col sm:flex-row gap-2\.5[^"]*)"([^>]*)>/,
    '<!-- TODO: 接入企业后端咨询线索接收接口或 CRM API (如 POST /api/leads) -->\n<form$1 id="footer-contact-form" action="#" method="POST" class="$2"$3>'
  );

  // In modal form:
  html = html.replace(
    /<form([^>]*)class="([^"]*space-y-4[^"]*)"([^>]*)>/,
    '<!-- TODO: 接入企业后端咨询线索接收接口或 CRM API (如 POST /api/contact) -->\n<form$1 id="modal-contact-form" action="#" method="POST" class="$2"$3>'
  );

  return html;
}

async function buildAll() {
  console.log('Starting static HTML build for all 21 pages...');
  const outDir = 'lkk-static-site';
  fs.mkdirSync(outDir, { recursive: true });

  const App = require('../src/App').default;

  for (const page of pagesToGenerate) {
    console.log(`Generating ${page.filename} (pageKey: ${page.pageKey})...`);
    
    // Setup shims for this page
    const store: Record<string, string> = {
      'lkk_current_page': page.pageKey
    };

    (global as any).window = {
      innerWidth: 1707,
      innerHeight: 900,
      addEventListener: () => {},
      removeEventListener: () => {},
      matchMedia: () => ({ matches: false }),
      scrollTo: () => {},
      location: {
        search: '',
        pathname: '/' + (page.filename === 'index.html' ? '' : page.filename)
      }
    };
    (global as any).document = {
      documentElement: {
        style: {
          setProperty: () => {},
          getPropertyValue: () => '',
          removeProperty: () => ''
        }
      },
      body: {
        style: {
          setProperty: () => {},
          getPropertyValue: () => '',
          removeProperty: () => ''
        }
      },
      addEventListener: () => {},
      removeEventListener: () => {},
      querySelector: () => null,
      querySelectorAll: () => []
    };
    (global as any).sessionStorage = {
      getItem: (k: string) => store[k] || null,
      setItem: (k: string, v: string) => { store[k] = v; }
    };

    let markup = renderToStaticMarkup(React.createElement(App));
    markup = sanitizeHtml(markup);

    const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="keywords" content="洛可可,LKK,工业设计,品牌设计,品类创新,三品合一,产品设计,贾伟,设计咨询">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:type" content="website">
  <!-- 自托管中英文字体预加载 -->
  <link rel="preload" href="assets/fonts/SourceHanSansSC.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/PlusJakartaSans.woff2" as="font" type="font/woff2" crossorigin>
  <!-- 独立样式表 -->
  <link rel="stylesheet" href="assets/css/site.css">
</head>
<body class="bg-white text-neutral-900 antialiased selection:bg-[#007BC7] selection:text-white">
  ${markup}
  <!-- 独立交互脚本 -->
  <script src="assets/js/site.js" defer></script>
</body>
</html>`;

    fs.writeFileSync(path.join(outDir, page.filename), fullHtml, 'utf8');
    const size = fs.statSync(path.join(outDir, page.filename)).size;
    console.log(`✓ Created ${page.filename} (${(size / 1024).toFixed(1)} KB)`);
  }

  console.log('All 21 pages generated successfully!');
}

buildAll().catch(e => {
  console.error('Fatal error during build:', e);
  process.exit(1);
});
