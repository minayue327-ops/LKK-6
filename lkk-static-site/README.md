# LKK 洛可可创新设计集团 - 纯静态工程交付包 (HTML5 / CSS / Vanilla JS)

本项目为 **LKK 洛可可创新设计集团官方网站** 逐像素迁移的纯静态交付版本。完全剔除所有前端框架（无 React、无 Vue、无 Vite、无 npm 依赖），直接基于标准 **HTML5 语义化标签 + 独立 CSS + 原生 JavaScript** 架构。

无需任何构建步骤（免 `npm install`、免 `npm run build`），可直接部署于 **Nginx、Cloudflare Pages、Vercel (Static)、腾讯云/阿里云 OSS、AWS S3** 等静态托管环境。

---

## 1. 项目目录结构

```text
lkk-static-site/
├── index.html                           # 官网首页 (三品合一/核心业务/超级案例/实力数据/荣誉榜单)
├── category-consulting.html             # 品类战略创新咨询 (品类突围/方法体系/标杆战役/专家团队)
├── three-in-one-category.html           # 三品合一品类创新咨询专页
├── product-innovation-consulting.html   # 产品创新 0-1 全案咨询
├── brand-innovation-consulting.html     # 品牌创新 0-1 全案咨询
├── product-innovation.html              # 产品创新设计 (工业设计/结构设计/CMF/量产落地)
├── brand-innovation.html                # 品牌创新设计 (品牌全案/超级符号/爆品包装/IP设计)
├── service-detail.html                  # 细分设计服务详情 (工业设计/结构设计/生产落地/包装/IP)
├── cases.html                           # 经典成功案例精选 (多赛道分类过滤系统)
├── case-detail.html                     # 爆品案例详情页 (海底捞/小仙炖/思哲睿手术机器人全案深度拆解)
├── three-in-one.html                    # 三品合一方法论深度解析
├── three-in-one-learning.html           # 三品合一研习院 (高管营/实战营/内训)
├── course-detail.html                   # 研修营课程大纲与报名页
├── industry.html                        # 14大垂直行业专精解决方案 (具身智能/医疗装备/新能源等)
├── industry-detail.html                 # 垂直行业专属解决方案深度剖析
├── insights.html                        # 行业洞察白皮书与创新趋势报告
├── success-path.html                    # 企业商业创新成长成功路径图
├── about-us.html                        # 关于洛可可 (22年发展历程/集团规模/全国布局/创始人哲学)
├── news.html                            # 集团新闻中心
├── news-detail.html                     # 新闻专访详情页
├── contact-us.html                      # 联系我们 (全国12城办事处/商务合作/在线咨询表单)
├── LICENSE-OFL.txt                      # 字体开源授权文件 (SIL Open Font License)
└── assets/
    ├── css/
    │   └── site.css                     # 全站样式表 (字体、排版、1707px等比缩放、动效与响应式)
    ├── js/
    │   └── site.js                      # 原生交互引擎 (缩放引擎、导航、轮播、数字滚动、弹窗、表单)
    ├── fonts/                           # 100% 自托管 WOFF2 字体库
    │   ├── SourceHanSansSC.woff2        # 思源黑体 (中文主文字体)
    │   ├── PlusJakartaSans.woff2        # Plus Jakarta Sans (英文无衬线主字体)
    │   ├── SpaceGrotesk.woff2           # Space Grotesk (英文字体)
    │   └── JetBrainsMono.woff2          # JetBrains Mono (等宽数字字体)
    └── images/                          # 全站 101 张高清本地化配图与矢量图标
```

---

## 2. 核心技术特征

### ① 1707px 物理基准等比缩放引擎
- 采用设计基准物理宽度 `1707px`，通过原生 JavaScript `calculateDesktopScale()` 动态计算视口缩放比。
- 自动写入 CSS 变量 `--desktop-page-scale`、`--desktop-design-width` 与 `--desktop-canvas-offset-x`，大屏自适应、小屏平滑降级，保证在所有分辨率（1080P、2K、4K 及宽屏显示器）呈现逐像素一致的版面比例。

### ② 100% 资源本地化
- **字体**：全部采用自托管 `.woff2` 格式，并通过 `<link rel="preload">` 预加载，彻底杜绝外链字体延迟或访问受限风险。
- **图片与媒体**：全站 101 张图片与矢量图标全部下载至本地 `assets/images/`，绝无外部依赖。

### ③ 纯原生交互引擎 (`assets/js/site.js`)
- **Header 滚动检测**：根据页面上下滚动动态切换毛玻璃效果 (`is-glass`) 与智能折叠隐藏 (`is-hidden`)。
- **Mega-Menu 导航下拉**：支持 CSS `:hover` 与原生 JS 双保障，移动端抽屉式滑动菜单。
- **双向滚动标题渐显**：基于视口深度计算，文字按字平滑过渡亮色。
- **数字平滑累加**：基于 `IntersectionObserver` + `requestAnimationFrame` + 三次缓出曲线的数字计数。
- **案例与业务 Tab 过滤**：纯前端即时筛选，无卡顿刷新。
- **咨询弹窗与案例弹窗**：带遮罩阻断、Esc 快捷键关闭及移动端防滚锁定。

### ④ 标准化表单设计
- 保留标准 HTML5 `<form>` 标签、字段 `name`（`name="name"`、`phone`、`company`、`city` 等）及 `required` 必填验证。
- 预留清晰的 `<!-- TODO: 接入企业后端咨询线索接收接口或 CRM API -->` 注释，开发人员只需将 `action` 指向后端接口即可完成接入。

---

## 3. Nginx 生产环境配置示例

```nginx
server {
    listen 80;
    server_name www.lkk.com lkk.com;
    root /var/www/lkk-static-site;
    index index.html;

    # 静态资产长效缓存 (CSS, JS, Fonts, Images)
    location ~* \.(css|js|woff2|woff|ttf|png|jpg|jpeg|svg|webp|ico)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }

    # HTML 页面短缓存
    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public, no-cache";
    }

    location / {
        try_files $uri $uri/ =404;
    }
}
```

---

## 4. 交付验证说明

本交付包已通过离线运行验证与自动化无外链扫描：
- **外部多媒体 URL**：0（所有字体、图片、样式与脚本均为相对路径）。
- **页面响应速度**：本地自包含加载，首屏秒开。
- **兼容性**：Chrome, Edge, Safari, Firefox 及移动端主流 Webkit 浏览器。
