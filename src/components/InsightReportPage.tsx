import React, { useState, useMemo } from 'react';
import { 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar, 
  Clock, 
  Eye, 
  Share2,
  Download,
  Sparkles,
  CheckCircle2,
  X,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ReportContentBlock {
  type: 'paragraph' | 'subtitle' | 'image';
  text?: string;
  src?: string;
  caption?: string;
}

export interface InsightReportCardItem {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  imageCaption?: string;
  author: string;
  readTime: string;
  pages: number;
  views: number;
  tags: string[];
  keyFindings: string[];
  contentBlocks: ReportContentBlock[];
}

export const INSIGHT_CATEGORIES = [
  '全部',
  'AI与人机协同',
  '三品合一品类战略',
  '全球化与出海',
  'CMF与可持续新材料',
  '具身智能与医疗'
];

export const INSIGHT_REPORTS_LIST: InsightReportCardItem[] = [
  {
    id: 'report-ai-design',
    title: '2025 AI+工业设计产业创新白皮书：从人机协同到品类重塑',
    date: '2025年1月15日',
    category: 'AI与人机协同',
    description: '基于洛可可20年近万款产品创新积淀与全球生成式AI前沿实践，深度解构AI如何重构从市场预研、用户同理心洞察、CMF工程到柔性制造的产品研发全生命周期，并提出“算法+设计+商业”的三维破局范式。',
    image: '/src/assets/images/book_whitepaper_mockup_1787619995065.jpg',
    imageCaption: '洛可可创新研究院与AI人机协同设计实验室联合发布《2025 AI+工业设计产业创新白皮书》',
    author: '洛可可创新研究院 & AI设计实验室',
    readTime: '8 分钟',
    pages: 68,
    views: 18450,
    tags: ['AI人机协同', '生成式算法', '研发提效40%', '三品合一'],
    keyFindings: [
      '概念打样与数字仿真周期由平均 60 天缩减至 7 天，全流程研发周期压缩达 40% 以上',
      'AI赋能的同理心用户洞察模型在消费电子品类预测准确率提升至 82%',
      '提出“人机共创操作系统”：设计师聚焦高阶同理心与美学哲学，算法负责高频穷举与拓扑计算'
    ],
    contentBlocks: [
      {
        type: 'paragraph',
        text: '当前，全球制造与消费产业正经历从“规模红利”向“认知与智能红利”的剧烈转变。在市场同质化严重的背景下，传统工业设计的单点美学改善已无法为企业提供充足的商业安全感。大语言模型与多模态生成式AI的爆发，为产品创新提供了前所未有的加速杠杆。'
      },
      {
        type: 'subtitle',
        text: '《核心洞察：AI不是取代设计师，而是重塑创新的底层操作系统》'
      },
      {
        type: 'paragraph',
        text: '传统研发流程从需求提出到结构开模往往历经6至10个月，AI模型可实现概念渲染、FEA力学测算与成本预估的实时同步。在概念发散与结构仿真阶段显著降低试错成本，概念打样从按月缩短至按周，整体研发周期平均压缩达40%以上。'
      },
      {
        type: 'image',
        src: '/src/assets/images/methodology_visual_diagram_1787620064287.jpg',
        caption: '洛可可AI驱动的三品合一产品创新与全链路赋能模型架构图'
      },
      {
        type: 'subtitle',
        text: '《趋势一：从“功能代工”到“情绪与智能共生”》'
      },
      {
        type: 'paragraph',
        text: '在洛可可过去一年的创新咨询实践中，超过68%的硬件客户主动提出了“人机交互温度感”与“陪伴属性”的研发诉求。无论是扫地机器人、智能电饭煲，还是手术辅助机器人，用户对科技产品的关注点正从冷酷的技术参数，转向使用体验时的情绪舒缓度与交互直觉性。'
      },
      {
        type: 'image',
        src: '/src/assets/images/case_surgical_robot_1787620051544.jpg',
        caption: '具身智能与医疗级高精设备的人机工程创新应用'
      },
      {
        type: 'subtitle',
        text: '《落地路径：三品合一爆品研发范式》'
      },
      {
        type: 'paragraph',
        text: '洛可可创始人贾伟总结指出：“创新的本质不是追求前所未见的外形，而是精准解决用户真实场景下的痛点与渴望。”三品合一，即是将品牌的灵魂、产品的体魄与品类的蓝海融为一体。面向2025及更长远的未来，中国实体制造企业唯有依托设计驱动与底层技术创新，才能在全球价值链中占据无可替代的枢纽地位。'
      }
    ]
  },
  {
    id: 'report-category-breakthrough',
    title: '中国消费品类突围白皮书：三品合一重塑爆品底层逻辑',
    date: '2024年11月20日',
    category: '三品合一品类战略',
    description: '在传统电商流量红利消退、存量博弈白热化的今天，消费品牌如何跳出杀价内卷？洛可可全面公开“三品合一”战略爆品全案方法论，助力传统企业从单点产品跨越至品类领导地位。',
    image: '/src/assets/images/book_sanpinheyi_1787619969143.jpg',
    imageCaption: '洛可可方法论经典出版物《三品合一》与品类突围系列研究成果',
    author: '洛可可战略咨询事业群',
    readTime: '6 分钟',
    pages: 84,
    views: 16210,
    tags: ['品类创新', '爆品方法论', '商业心智占位', '存量破局'],
    keyFindings: [
      '品类决定企业的天花板，产品决定用户的黏性，品牌决定资本溢价率',
      '践行“三品合一”战略的客户平均毛利率相比同品类竞品提高 28%',
      '通过定义全新场景与微痛点，打破同质化红海，让企业成为细分行业标准制定者'
    ],
    contentBlocks: [
      {
        type: 'paragraph',
        text: '中国消费品市场正在经历从“渠道驱动”、“营销驱动”向“产品与品类价值驱动”的历史性转折。单纯依靠流量投放买量做爆款的时代已经彻底结束，没有产品壁垒与心智占位的单品在流量停止后往往迅速归零。'
      },
      {
        type: 'subtitle',
        text: '《三品合一的黄金三角：品类、产品与品牌》'
      },
      {
        type: 'paragraph',
        text: '“品类、产品、品牌”三者从来不是孤立割裂的。品类决定企业天花板，产品决定用户忠诚度，品牌决定市场溢价能力。三者合一，方能形成牢不可破的商业护城河。'
      },
      {
        type: 'image',
        src: '/src/assets/images/pillar_brand_semiotics_1787620103763.jpg',
        caption: '三品合一商业闭环模型演进与心智占位雷达图'
      },
      {
        type: 'paragraph',
        text: '报告通过详实的数据对比，展示了践行“三品合一”战略的企业在毛利率、用户净推荐值（NPS）以及产品生命周期跨度上显著优于行业平均水平的优异表现。'
      }
    ]
  },
  {
    id: 'report-global-hardware',
    title: '2025全球智能硬件与机器人出海创新洞察白皮书',
    date: '2024年12月08日',
    category: '全球化与出海',
    description: '深度洞察欧美、日韩及东南亚市场硬件消费偏好与合规标准，详解中国智造从“成本优势代工”走向“设计驱动型高溢价全球品牌”的成功突围路径。',
    image: '/src/assets/images/lkk_humanoid_robot_1783302961282.jpg',
    imageCaption: '洛可可出海创新战略团队助力中国硬科技品牌布局全球主流市场',
    author: '洛可可全球化战略中心',
    readTime: '7 分钟',
    pages: 56,
    views: 12890,
    tags: ['硬件出海', '全球合规设计', '本土化人机交互', '高溢价品牌'],
    keyFindings: [
      '海外消费者对“可持续环保材质”与“数据隐私安全设计”的关注度提升了 4.2 倍',
      '从海外众筹到线下商超全渠道落地：产品造型语言与品牌语境的跨文化适配',
      '设计赋能带来的品牌溢价平均达到 35%~50%，彻底告别低价倾销标签'
    ],
    contentBlocks: [
      {
        type: 'paragraph',
        text: '随着国内智能硬件供应链的极致成熟，出海成为中国制造业开拓第二增长曲线的必由之路。然而，“国内爆款直接平移海外”的粗放模式正遭遇日益严峻的跨文化文化水土不服与海外法规壁垒。'
      },
      {
        type: 'subtitle',
        text: '《从工程师思维到全球生活方式提案》'
      },
      {
        type: 'paragraph',
        text: '海外用户更注重产品与居住空间的和谐度、操作逻辑的直觉化以及材质的环保可溯源性。洛可可出海咨询团队结合欧美真实家庭环境，重构了智能割草机、便携储能电源及宠物智能设备的形态范式。'
      },
      {
        type: 'image',
        src: '/src/assets/images/pillar_strategy_diagram_1787620077990.jpg',
        caption: '全球化本土化（Glocalization）产品创新策略模型'
      }
    ]
  },
  {
    id: 'report-cmf-engineering',
    title: 'CMF前沿工程与可持续材料应用趋势报告（2025版）',
    date: '2024年10月18日',
    category: 'CMF与可持续新材料',
    description: '解码生物基材料、回收聚合物与数字化光谱着色技术在3C数码、智能出行与高端家电中的应用实践，提供兼顾低碳环保与高端质感落地的选材指南。',
    image: '/src/assets/images/pillar_cmf_engineering_1787620117012.jpg',
    imageCaption: '洛可可CMF新材料实验室与微纳米表面工艺样板研究',
    author: '洛可可CMF新材料实验室',
    readTime: '6 分钟',
    pages: 92,
    views: 14330,
    tags: ['CMF工程', '绿色低碳', '质感美学', '工艺降本增效'],
    keyFindings: [
      '生物基材料在高端消费品外观件中的应用渗透率同比提升 180%',
      '免喷涂环保材料与微纳米纹理激光雕刻技术的成熟应用，单件综合生产成本下降 15%',
      '发布2025-2026年度五大主导情绪色盘：冷曜灰、生机苔绿、暖玉白、旷野沙金、深邃钛蓝'
    ],
    contentBlocks: [
      {
        type: 'paragraph',
        text: '材料（Material）、色彩（Color）与表面处理（Finishing）是连接用户触觉与视觉直观认知的第一界面。随着ESG全球标准与碳关税政策的推行，CMF已经从“纯美学修饰”跃升为关乎企业产品合规准入的战略支柱。'
      },
      {
        type: 'subtitle',
        text: '《轻量化合金与回收材质的高级感解题方法》'
      },
      {
        type: 'paragraph',
        text: '过去“环保材料等于质感粗糙”的刻板印象已被先进制造工艺彻底颠覆。通过微弧氧化、物理气相沉积（PVD）及纳米级纹理注塑，环保材质完全能够呈现出甚至超越传统金属与烤漆的顶级温润触感。'
      }
    ]
  },
  {
    id: 'report-medical-robotics',
    title: '具身智能与医疗高精设备人机交互创新白皮书',
    date: '2024年9月25日',
    category: '具身智能与医疗',
    description: '结合思哲睿微创手术机器人等国家级获奖案例，全面解析无菌洁净环境人机工学、多自由度机械臂触觉反馈与拟人化视听语言设计规范。',
    image: '/src/assets/images/case_surgical_robot_1787620051544.jpg',
    imageCaption: '荣获国家级工业设计奖的思哲睿微创手术机器人系统',
    author: '洛可可医疗健康设计实验室',
    readTime: '5 分钟',
    pages: 64,
    views: 9740,
    tags: ['医疗机器人', '高精人机工学', '临床医患关怀', '国之重器'],
    keyFindings: [
      '通过人机工程学手臂力学平衡优化，主刀医生连续手术疲劳度降低 35%',
      '模块化无死角包裹蒙皮设计，使得手术室终末消毒效率提升 50%',
      '建立符合国内外顶级三甲医院无菌流线规范的设备布局标准体系'
    ],
    contentBlocks: [
      {
        type: 'paragraph',
        text: '医疗高精设备不仅是高端制造的皇冠明珠，更直接关乎生命健康的安全红线。长期以来，高端手术机器人与生命支持系统被欧美跨国巨头垄断，中国本土创新医疗设备在突围过程中必须兼顾严苛的临床指标与国际顶尖的人机体验。'
      },
      {
        type: 'subtitle',
        text: '《消除手术室冰冷感的温情设计理念》'
      },
      {
        type: 'paragraph',
        text: '洛可可设计团队在思哲睿康多多机器人研发中，打破了以往医疗设备庞大笨重的视觉心理压迫感，引入流线型曲面与柔和氛围光指示，显著缓解患者在术前的焦虑情绪。'
      }
    ]
  },
  {
    id: 'report-emotion-branding',
    title: '新消费品牌情绪价值与包装符号系统研究报告',
    date: '2024年8月12日',
    category: '三品合一品类战略',
    description: '深度剖析小仙炖鲜炖燕窝、悦鲜活鲜牛奶等现象级爆款背后的视觉超级符号与感官开箱体验设计，揭示当代年轻消费群体“悦己消费”的心理机制。',
    image: '/src/assets/images/pillar_brand_semiotics_1787620103763.jpg',
    imageCaption: '基于超级符号与五感体验的新消费品牌包装资产构建',
    author: '洛可可快消创新研究组',
    readTime: '6 分钟',
    pages: 50,
    views: 15680,
    tags: ['情绪消费', '超级符号', '感官包装', '爆款逻辑'],
    keyFindings: [
      '超过 74% 的年轻新中产消费者愿意为具备“情绪舒缓与治愈感”的产品支付溢价',
      '包装的“0.1秒货架第一眼识别度”直接影响终端购买决策转化率',
      '打造“可触摸的品牌仪式感”：从开箱阻尼感、材质温润感建立长久复购黏性'
    ],
    contentBlocks: [
      {
        type: 'paragraph',
        text: '在物资极大丰富的当下，功能性需求已退居基本门槛，能够触动用户精神世界、带来情绪满足感的产品才能产生持久的溢价空间与社交裂变动力。'
      },
      {
        type: 'subtitle',
        text: '《从视觉符号到全感官信任状的构建》'
      },
      {
        type: 'paragraph',
        text: '以洛可可打造的小仙炖鲜炖燕窝为例，经典的钟形玻璃瓶型不仅完美契合传统东方炖煮美学，其握持手感与开盖清脆声更是形成了标志性的感官记忆点，成功树立高端鲜炖品类的新标杆。'
      }
    ]
  }
];

interface InsightReportPageProps {
  initialReportId?: string;
  onOpenContactModal?: () => void;
  onNavigate?: (url: string) => void;
}

export const InsightReportPage: React.FC<InsightReportPageProps> = ({
  onOpenContactModal,
  onNavigate
}) => {
  // Pagination state (6 items per page)
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Active Reading Modal State (defaults to null so no popup opens automatically)
  const [activeReport, setActiveReport] = useState<InsightReportCardItem | null>(null);

  // All reports without category filter bar
  const filteredReports = INSIGHT_REPORTS_LIST;

  // Total pages
  const totalPages = Math.ceil(filteredReports.length / pageSize) || 1;

  // Paginated reports
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredReports.slice(start, start + pageSize);
  }, [filteredReports, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const targetElement = document.getElementById('reports-grid-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadReport = (report: InsightReportCardItem) => {
    if (onOpenContactModal) {
      onOpenContactModal();
    } else {
      alert(`已提交《${report.title}》官方白皮书完整PDF索取申请，洛可可产业顾问将尽快将资料发送至您的邮箱。`);
    }
  };

  const handleShareReport = (report: InsightReportCardItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert(`已复制《${report.title}》报告分享链接至剪贴板`);
    }
  };

  return (
    <div className="w-full bg-white text-neutral-900 min-h-screen">
      
      {/* 1. 首屏 HERO 板块——完全照搬新闻中心详情页设计规范（排版、文字层级、大标题、元数据） */}
      <div className="bg-white border-b border-neutral-100 py-8 md:py-12">
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[1.5px] w-6 bg-[#007BC7]"></span>
                <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">
                  RESEARCH & INSIGHTS · 行业前瞻
                </span>
              </div>
              <h1 className="hero-title text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#111827] leading-[1.05] font-display">
                前瞻课题与行业深度报告
              </h1>
              {/* 元数据信息 - 与新闻中心详情页一致 */}
              <div className="flex flex-wrap items-center gap-2.5 md:gap-3 text-xs md:text-sm font-semibold tracking-wider text-[#007BC7] uppercase mt-3 font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  2024-2025 年度战略系列
                </span>
                <span>·</span>
                <span>洛可可创新研究院与战略中心</span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  持续更新
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  行业总研读 58,000+
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-3.5 max-w-xl">
              <p className="text-sm text-[#4B5563] leading-relaxed text-left lg:text-right">
                基于洛可可20年创新实践与数万款产品研发生态，聚焦AI人机协同、三品合一爆品重构、具身智能、先进制造与出海趋势，输出兼具战略研判与实战落地的行业权威白皮书与深度洞察报告。
              </p>
              <button 
                onClick={onOpenContactModal}
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#007BC7] hover:bg-[#005F96] text-white text-xs sm:text-sm font-medium transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer select-none"
                title="进入线上诊断"
              >
                <span>进入线上诊断</span>
                <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 下方内容——一张卡片一个报告 */}
      <section id="reports-grid-section" className="py-12 md:py-16 bg-white min-h-[600px]">
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12">
          
          {/* 报告卡片网格——一张卡片一个报告 */}
          <AnimatePresence mode="wait">
            {paginatedReports.length > 0 ? (
              <motion.div 
                key={currentPage}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -12, transition: { duration: 0.15 } }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.04
                    }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {paginatedReports.map((report) => (
                  <motion.div 
                    key={report.id}
                    variants={{
                      hidden: { opacity: 0, y: 28, scale: 0.97 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 280,
                          damping: 22
                        }
                      }
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    onClick={() => setActiveReport(report)}
                    className="bg-white rounded-[24px] overflow-hidden border border-neutral-200/70 shadow-sm hover:shadow-xl hover:border-[#007BC7] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  >
                    {/* 卡片封面图 */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-100 shrink-0">
                      <img 
                        src={report.image} 
                        alt={report.title} 
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    {/* 卡片内容区域 */}
                    <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                      <div>
                        {/* 辅助信息：日期与研读数 */}
                        <div className="flex items-center justify-between text-xs font-medium text-neutral-400 mb-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{report.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{report.views} 研读</span>
                          </div>
                        </div>

                        {/* 主标题 */}
                        <h3 className="text-lg font-bold text-neutral-900 line-clamp-2 leading-snug group-hover:text-neutral-700 transition-colors duration-200">
                          {report.title}
                        </h3>

                        {/* 简介/正文 */}
                        <p className="text-sm font-normal text-neutral-500 mt-3 line-clamp-3 leading-relaxed">
                          {report.description}
                        </p>
                      </div>

                      {/* 底部操作条 */}
                      <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-medium">
                        <span className="text-neutral-400 group-hover:text-neutral-900 transition-colors">
                          阅读报告全文与白皮书
                        </span>
                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-20 text-center bg-white rounded-[24px] border border-dashed border-neutral-200">
                <p className="text-neutral-400 text-sm">该分类下暂无报告内容</p>
              </div>
            )}
          </AnimatePresence>

          {/* 分页控制栏 */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-200/60">
              <span className="text-xs text-[#8C8C8C] font-mono">
                第 {currentPage} 页 / 共 {totalPages} 页
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-neutral-700 transition-all cursor-pointer shadow-sm active:scale-95"
                  aria-label="上一页"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
                  const isActive = currentPage === num;
                  return (
                    <button
                      key={num}
                      onClick={() => handlePageChange(num)}
                      className={`w-10 h-10 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#007BC7] text-white shadow-md shadow-blue-500/20'
                          : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-neutral-700 transition-all cursor-pointer shadow-sm active:scale-95"
                  aria-label="下一页"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 3. 报告全文深度阅读与下载弹窗（完全沿用新闻中心详情页的正文阅读版式与排版设计） */}
      <AnimatePresence>
        {activeReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* 背景遮罩 */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveReport(null)}
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />

            {/* 报告详情内容主容器 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl bg-white rounded-[24px] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto border border-neutral-100"
            >
              {/* 弹窗顶部栏 */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 md:px-8 py-4 border-b border-neutral-100 flex items-center justify-between z-20">
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                  <span className="font-bold text-[#007BC7]">{activeReport.category}</span>
                  <span>·</span>
                  <span>PDF {activeReport.pages}页完整报告</span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDownloadReport(activeReport)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#007BC7] text-white text-xs font-semibold hover:bg-[#005F96] transition-colors border-none cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>免费索取PDF</span>
                  </button>

                  <button 
                    onClick={() => setActiveReport(null)}
                    className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors border-none cursor-pointer"
                    aria-label="关闭窗口"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 弹窗内部滚动正文区域（与新闻中心详情页 1:1 样式对齐） */}
              <div className="p-6 md:p-10 overflow-y-auto max-w-[760px] mx-auto w-full">
                
                {/* 标题与元数据 */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] leading-tight font-display">
                  {activeReport.title}
                </h2>

                {/* 元数据栏 */}
                <div className="flex flex-wrap items-center gap-2.5 md:gap-3 text-xs font-semibold tracking-wider text-[#007BC7] uppercase mt-4 font-mono pb-4 border-b border-neutral-100">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeReport.date}
                  </span>
                  <span>·</span>
                  <span>{activeReport.author}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {activeReport.readTime}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    {activeReport.views} 次阅读
                  </span>
                </div>

                {/* 报告导读摘要卡片 */}
                {activeReport.description && (
                  <div className="my-6 p-5 rounded-[16px] bg-blue-50/60 border border-blue-100 text-sm text-neutral-700 leading-relaxed">
                    <div className="flex items-center gap-1.5 font-bold text-[#007BC7] text-xs uppercase mb-1 font-mono">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>EXECUTIVE SUMMARY · 课题摘要</span>
                    </div>
                    {activeReport.description}
                  </div>
                )}

                {/* 白皮书核心研判速览 (Key Findings) */}
                {activeReport.keyFindings && activeReport.keyFindings.length > 0 && (
                  <div className="mb-8 p-5 rounded-[16px] bg-neutral-50 border border-neutral-200/80">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 mb-3 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-[#007BC7]" />
                      <span>报告核心研判速览 (KEY TAKEAWAYS)</span>
                    </div>
                    <ul className="space-y-2 text-xs md:text-sm text-neutral-700">
                      {activeReport.keyFindings.map((finding, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#007BC7] mt-1.5 shrink-0"></span>
                          <span className="leading-relaxed">{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 封面图展示 (苹果标准内嵌配图16px圆角，说明文字13px #8C8C8C) */}
                {activeReport.image && (
                  <div className="my-6">
                    <img 
                      src={activeReport.image} 
                      alt={activeReport.title} 
                      referrerPolicy="no-referrer"
                      className="w-full rounded-[16px] object-cover shadow-sm border border-neutral-100 max-h-[420px]"
                    />
                    {activeReport.imageCaption && (
                      <p className="text-[#8C8C8C] text-xs text-center mt-[8px]">
                        {activeReport.imageCaption}
                      </p>
                    )}
                  </div>
                )}

                {/* 正文内容：段落16px, #333333, 行高1.8, 段落间距24px */}
                <div className="mt-8 space-y-6">
                  {activeReport.contentBlocks.map((block, index) => {
                    if (block.type === 'subtitle') {
                      return (
                        <h3 key={index} className="text-lg md:text-xl font-bold text-[#007BC7] mt-10 mb-4 flex items-center gap-2">
                          <span className="w-1.5 h-4 bg-[#007BC7] rounded-full inline-block"></span>
                          {block.text}
                        </h3>
                      );
                    }
                    if (block.type === 'image') {
                      return (
                        <div key={index} className="my-8">
                          <img 
                            src={block.src} 
                            alt={block.caption || '报告正文配图'} 
                            referrerPolicy="no-referrer"
                            className="w-full rounded-[16px] object-cover shadow-sm border border-neutral-100"
                          />
                          {block.caption && (
                            <p className="text-[#8C8C8C] text-xs text-center mt-[8px]">
                              {block.caption}
                            </p>
                          )}
                        </div>
                      );
                    }
                    return (
                      <p key={index} className="text-base text-[#333333] leading-[1.8] mb-6 font-normal">
                        {block.text}
                      </p>
                    );
                  })}
                </div>

                {/* 底部互动操作栏 */}
                <div className="mt-12 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div 
                    onClick={() => handleShareReport(activeReport)}
                    className="flex items-center gap-2 text-xs text-neutral-400 cursor-pointer hover:text-[#007BC7] transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-[#007BC7]" />
                    <span>分享该报告</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleDownloadReport(activeReport)}
                      className="bg-[#007BC7] hover:bg-[#005F96] text-white font-bold px-6 py-2.5 rounded-full text-xs transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      索取报告完整PDF
                    </button>
                    <button 
                      onClick={() => setActiveReport(null)}
                      className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold px-6 py-2.5 rounded-full text-xs transition-all cursor-pointer flex items-center gap-2"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      返回列表
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default InsightReportPage;
