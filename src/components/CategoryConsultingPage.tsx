import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, ChevronRight, ChevronDown, ChevronUp, Star, Play, Pause, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CaseStudy } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSectionTitle } from './ScrollSectionTitle';

// Visual Assets for Problem Cards
import strategyDiagramImg from '../assets/images/pillar_strategy_diagram_1787620077990.jpg';
import productUxImg from '../assets/images/pillar_product_ux_1787620090549.jpg';
import brandSemioticsImg from '../assets/images/pillar_brand_semiotics_1787620103763.jpg';
import methodologyVisualImg from '../assets/images/methodology_visual_diagram_1787620064287.jpg';

gsap.registerPlugin(ScrollTrigger);

interface CategoryConsultingPageProps {
  onOpenContactModal: () => void;
  onSelectCase: (cs: CaseStudy) => void;
  onNavigateDetail?: (url: string) => void;
  onOnlineDiagnosis?: () => void;
  onlineDiagnosisUrl?: string;
  CounterComponent: React.FC<{ target: number }>;
}

interface ExperienceCardProps {
  title: string;
  imgSrc: string;
}

function ExperienceCard({ title, imgSrc }: ExperienceCardProps) {
  return (
    <div className="w-full">
      <div
        className="experience-card relative w-full aspect-[16/9.2] sm:aspect-[16/9] rounded-2xl overflow-hidden select-none"
        style={{
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.025), 0 6px 16px rgba(0, 0, 0, 0.038)',
        }}
      >
        <img
          src={imgSrc}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default function CategoryConsultingPage({
  onOpenContactModal,
  onSelectCase,
  onNavigateDetail,
  onOnlineDiagnosis,
  onlineDiagnosisUrl,
  CounterComponent,
}: CategoryConsultingPageProps) {
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const [expandedMature, setExpandedMature] = useState<boolean>(false);
  const [activeDecisionNode, setActiveDecisionNode] = useState<number>(0);
  const [activeProblemIndex, setActiveProblemIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // 苹果风格并排卡片自适应尺寸与居中测量
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(1200);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselContainerRef.current) {
        setContainerWidth(carouselContainerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const matchingProblems = [
    {
      id: '01',
      idx: 0,
      subLabel: '方向判断',
      problemTitle: '品类问题',
      serviceTitle: '三品合一品类创新咨询',
      description: '探寻增量赛道与新品类定义，打破同质化竞争格局',
      coreQuestion: '“我的产品应该进入什么方向？”',
      questionsLabel: '当你的核心问题是：',
      questions: [
        '只能打价格战',
        '增长没有新方向',
        '产品和品牌没有形成合力',
        '想做新品类，却缺少路径',
      ],
      image: strategyDiagramImg,
      actionText: '了解品类创新咨询',
      url: '/three-in-one-category',
    },
    {
      id: '02',
      idx: 1,
      subLabel: '从机会到落地',
      problemTitle: '产品问题',
      serviceTitle: '产品创新0-1全案咨询',
      description: '打造极致用户体验与爆品原型，实现商业价值变现',
      coreQuestion: '“我应该打造什么产品？”',
      questionsLabel: '当你的核心问题是：',
      questions: [
        '有想法，没有产品路径',
        '产品缺少差异化',
        '设计无法量产',
        '研发与市场脱节',
      ],
      image: productUxImg,
      actionText: '了解产品创新咨询',
      url: '/product-innovation-consulting',
    },
    {
      id: '03',
      idx: 2,
      subLabel: '建立选择理由',
      problemTitle: '品牌问题',
      serviceTitle: '品牌创新0-1全案咨询',
      description: '沉淀品牌心智资产与独特表达，建立长效品牌溢价',
      coreQuestion: '“用户为什么选择我？”',
      questionsLabel: '当你的核心问题是：',
      questions: [
        '品牌定位不清',
        '视觉缺少统一性',
        '产品有价值，品牌无溢价',
        '传播缺少核心表达',
      ],
      image: brandSemioticsImg,
      actionText: '了解品牌创新咨询',
      url: '/brand-innovation-consulting',
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveProblemIndex((prev) => (prev + 1) % matchingProblems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, matchingProblems.length]);

  useEffect(() => {
    // 1. SCROLL-DRIVEN STACKING STATS CARDS TIMELINE
    const statsContainer = statsContainerRef.current;
    let statsCtx: gsap.Context | null = null;

    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleWindowLoad);

    if (statsContainer) {
      statsCtx = gsap.context(() => {
        const cards = statsContainer.querySelectorAll('.stat-card');
        if (cards.length) {
          const collapsedHeight = 108;
          const overlap = 52;

          const tl = gsap.timeline({ paused: true });

          cards.forEach((card, i) => {
            const eyebrow = card.querySelector('.stat-eyebrow');
            const details = card.querySelector('.card-details');
            const number = card.querySelector('.stat-number');

            tl.to(card, {
              height: collapsedHeight,
              marginTop: i === 0 ? 0 : -overlap,
              paddingTop: '1rem',
              paddingBottom: '1rem',
              borderRadius: '1rem',
              ease: 'none',
              duration: 1,
            }, i)
            .to([eyebrow, details], {
              opacity: 0,
              height: 0,
              marginTop: 0,
              marginBottom: 0,
              paddingTop: 0,
              paddingBottom: 0,
              overflow: 'hidden',
              ease: 'none',
              duration: 0.6,
            }, i)
            .to(number, {
              fontSize: '32px',
              ease: 'none',
              duration: 0.6,
            }, i);
          });

          const totalDuration = tl.duration();

          const pullSpacer = statsContainer.parentElement?.querySelector('.stats-bottom-pull-spacer');
          if (pullSpacer) {
            tl.to(pullSpacer, {
              marginTop: () => {
                const currentInitialHeight = statsContainer.offsetHeight;
                const currentFoldedHeight = 348;
                const heightDiff = Math.max(0, currentInitialHeight - currentFoldedHeight);
                return -heightDiff;
              },
              ease: 'none',
              duration: totalDuration,
            }, 0);
          }

          const pxPerSecond = 300;
          const scrollDistance = totalDuration * pxPerSecond;

          ScrollTrigger.create({
            trigger: statsContainer,
            start: 'top 80px',
            end: `+=${scrollDistance}`,
            scrub: true,
            pin: true,
            pinSpacing: true,
            animation: tl,
          });

          ScrollTrigger.refresh();
        }
      }, statsContainer);
    }

    const handleImageLoad = () => {
      ScrollTrigger.refresh();
    };
    const loadedImages = document.querySelectorAll('img');
    loadedImages.forEach((img) => {
      if (img.complete) {
        ScrollTrigger.refresh();
      } else {
        img.addEventListener('load', handleImageLoad);
      }
    });

    return () => {
      if (statsCtx) statsCtx.revert();
      window.removeEventListener('load', handleWindowLoad);
      loadedImages.forEach((img) => {
        img.removeEventListener('load', handleImageLoad);
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // 13 FAQ items
  const faqItems = [
    {
      q: "什么是洛可可的“三品合一”方法论？",
      a: "“三品合一”是洛可可集团历时22年沉淀的核心创新方法论，指将“品类创新（战略定位）”、“产品创新（极致工业设计/结构/体验）”与“品牌创新（视觉IP/营销话语/核心价值）”高度整合。通过三者高度协同，确保企业的战略定位不跑偏，设计能真正落地，品牌有爆发声量，助力企业从品类机会切入，直达商业爆品，成就细分品类冠军。"
    },
    {
      q: "品类创新咨询与传统的管理咨询/品牌咨询相比，核心差异在哪里？",
      a: "传统管理咨询侧重于宏观的财务战略和组织规划，品牌咨询侧重于视觉升级或单纯的营销创意。而洛可可的品类创新咨询是“战略+产品设计+量产落地”的三位一体。我们不仅帮助企业挖掘高成长、红利巨大的细分赛道（定义品类），更凭借自身行业领先的工业设计与供应链闭环能力，直接研发打造出承载该定位的爆品（产品创新）和超级符号（品牌创新），实现“咨询即爆品，落地即增长”。"
    },
    {
      q: "洛可可如何帮助企业在红海或空白市场中寻找新的品类机会？",
      a: "我们通过独创的“品类扫描仪”研究模型，基于用户痛点深挖、竞争对手防御空隙、产业技术革新红利、及政策和消费趋势变化进行全景扫描。我们会深入一线进行海量定量数据分析和深度定性洞察，过滤低天花板赛道，最终定位出一个既具备爆发性增长空间、又符合企业基因与制造壁垒的最佳“黄金细分品类”。"
    },
    {
      q: "品类创新“七步法”具体包含哪些闭环步骤？",
      a: "洛可可品类创新完整闭环包括：1. 洞察并锚定细分品类机会；2. 科学定义核心品类内涵与溢价点；3. 打造标志性的核心爆品（拳头产品设计）；4. 提炼占领心智的品类核心营销话语；5. 构建具辨识度的超级品牌视觉IP系统；6. 整合全域商业渠道与新媒体营销场景；7. 行业咨询专家与主笔设计团队进行“长期战术陪跑”。"
    },
    {
      q: "中小企业或传统制造型企业是否适合启动品类创新咨询？",
      a: "非常适合。传统制造型企业往往面临“有极强制造与代工能力、但无自主高毛利品牌，陷入低价竞争”的瓶颈。中小企业则往往资源受限，无法与头部巨头正面对冲。品类创新正是中小企业和传统制造业“以小博大、破局逆袭”的最优路径。通过精确定位一个高辨识度、低防御力的细分品类，饱和攻击，能够快速成为这个全新赛道的领跑者。"
    },
    {
      q: "洛可可如何保证品类咨询方案能真正上市量产，而不仅仅是纸上谈兵？",
      a: "洛可可是中国首批“国家级工业设计示范企业”，集团内拥有实力雄厚的外观设计师、机械结构工程团队、材料学家及打样测试中心，并在全国拥有强大的柔性制造供应链网络。在进行品类咨询和爆品定义伊始，设计工程和供应链团队就会全程介入。我们在方案阶段就会进行结构可行性、材料工艺难度和目标BOM成本核算评估，确保每一款方案都具备高度的量产上市可行性。"
    },
    {
      q: "“产品创新”在“三品合一”体系中扮演了怎样的角色？",
      a: "产品是品类最本质的硬件载体。没有极致的产品力作为护城河，再惊艳的品类战略和品牌口号也只是无源之水。洛可可产品创新不仅打磨令人惊艳的外观美学，更深入打通人性化的交互体验、先进的结构堆叠、创新的降本材料与人机工程学，让消费者在使用产品的瞬间，直观感知到新品类的核心价值，彻底转化为品牌忠实用户。"
    },
    {
      q: "“品牌创新 0-1 全案咨询”具体包含哪些服务？",
      a: "这是洛可可专门为从0到1孵化的新品牌，或成熟集团开拓新业务线量身定制的无忧管家式服务。具体涵盖：品牌核心定位、品牌专属命名、全套话语表达体系、标志性的超级LOGO及辅助符号视觉系统、高颜值的核心产品线包装设计、品牌视觉规范白皮书以及商业空间体验终端的整体设计，帮助新品牌生来便具备无可争议的主角姿态。"
    },
    {
      q: "洛可可目前主要服务哪些类型的客户？",
      a: "我们的服务涵盖世界500强企业（如诺基亚、西门子、三星、奥迪等）、国内500强行业支柱（如海尔、美的、茅台、青岛啤酒、京东、海底捞等），以及大量在细分行业深耕的中坚腰部企业，和高爆发性成长的行业新星品牌（如小仙炖、悦鲜活、库迪咖啡等）。无论企业处于哪个发展阶段，我们都能量身定制高ROI的创新战略方案。"
    },
    {
      q: "一个典型的品类创新咨询项目合作周期大概有多久？",
      a: "典型的系统化全案合作周期通常在 3 到 6 个月。前期深度用户洞察与品类定位大约需要 4 到 6 周；中期进行标志性爆品的产品设计（外观与结构工程）及超级品牌视觉IP/包装设计大约需要 8 到 12 周；后期开模打样、试产验证与营销话语提炼约需要 4 到 6 周。我们也会提供 12 个月以上的长期专家顾问委员会陪跑，确保成果彻底落地生根。"
    },
    {
      q: "洛可可品类创新咨询的收费模式是怎样的？",
      a: "我们坚持“一案一议”的透明定制化收费标准。收费会依据企业所处的产业赛道复杂度、项目需要覆盖的市场调研深度与广度、工业产品设计的工程研发技术难度、以及所需的供应链配对精度等因素综合合理核算。我们会给出不同层级的方案配置供企业灵活选择，力保每一分创新投入都能创造显著的商业增长溢价。"
    },
    {
      q: "洛可可在品类创新领域累积获得了哪些重磅奖项认证？",
      a: "洛可可是全球公认的创意设计实力灯塔，已累积荣获红点设计奖（Red Dot）、德国iF设计奖、美国IDEA、日本G-Mark、中国工业设计红星奖、台湾金点设计奖等在内的国内外重磅奖项超过 600 项。我们不仅注重美学价值，更将这些设计标准转化为企业在终端市场降维打击的绝对竞争壁垒。"
    },
    {
      q: "如何启动与洛可可创新咨询团队的第一步合作？",
      a: "您只需在页面底部的咨询表单中提交您的联系方式，或直接拨打我们的官方服务专线：400-062-3130。我们的垂直行业总监将在 24 小时内与您直接取得联系，开展深度的一对一线上/线下商业痛点诊断，并在会后免费为您匹配并出具第一版极具针对性的《项目定制建议书框架》。"
    }
  ];

  // State for 案例锦集 (9 Cases Horizontal Drag / Touch Swipe Carousel - 3 Groups)
  const [caseCurrentGroup, setCaseCurrentGroup] = useState<number>(0);
  const [isCaseAutoPlaying, setIsCaseAutoPlaying] = useState<boolean>(true);
  const [isCaseDragging, setIsCaseDragging] = useState<boolean>(false);
  const [caseDragOffset, setCaseDragOffset] = useState<number>(0);
  const [caseHasDragged, setCaseHasDragged] = useState<boolean>(false);
  const caseDragStartX = useRef<number>(0);
  const totalCaseGroups = 3;

  useEffect(() => {
    if (!isCaseAutoPlaying || isCaseDragging) return;
    const interval = setInterval(() => {
      setCaseCurrentGroup((prev) => (prev + 1) % totalCaseGroups);
    }, 5000);
    return () => clearInterval(interval);
  }, [isCaseAutoPlaying, isCaseDragging, totalCaseGroups]);

  const handleCaseDragStart = (clientX: number) => {
    setIsCaseDragging(true);
    caseDragStartX.current = clientX;
    setCaseDragOffset(0);
    setCaseHasDragged(false);
  };

  const handleCaseDragMove = (clientX: number) => {
    if (!isCaseDragging) return;
    const diff = caseDragStartX.current - clientX;
    if (Math.abs(diff) > 5) {
      setCaseHasDragged(true);
    }
    setCaseDragOffset(diff);
  };

  const handleCaseDragEnd = () => {
    if (!isCaseDragging) return;
    setIsCaseDragging(false);
    if (caseDragOffset > 50 && caseCurrentGroup < totalCaseGroups - 1) {
      setCaseCurrentGroup((prev) => prev + 1);
    } else if (caseDragOffset < -50 && caseCurrentGroup > 0) {
      setCaseCurrentGroup((prev) => prev - 1);
    }
    setCaseDragOffset(0);
  };

  const handleCaseWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 40) {
      if (e.deltaX > 0 && caseCurrentGroup < totalCaseGroups - 1) {
        setCaseCurrentGroup((prev) => prev + 1);
      } else if (e.deltaX < 0 && caseCurrentGroup > 0) {
        setCaseCurrentGroup((prev) => prev - 1);
      }
    }
  };

  // 9 精选品类创新全案标杆
  const CATEGORY_CASES = [
    {
      id: 'tanmujiang',
      client: '谭木匠',
      subtitle: '从传统梳妆工具，转向东方木艺生活美学',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      defaultResult: '从传统礼品转型东方木艺美学，实现品牌高端溢价跃升。',
      painPoint: '传统礼品梳具品类老化，消费场景局限于特定节庆。',
      action: '重构“东方木艺美学”品类定义，全系迭代爆品体验与品牌视觉。',
      result: '拓宽高端送礼与自我关爱场景，销量与品牌溢价同步提升。',
      tag: '品类标杆',
      url: '/cases/tanmujiang'
    },
    {
      id: '55degree',
      client: '55度杯',
      subtitle: '以产品创新建立新的使用体验与品类认知',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
      defaultResult: '开创“快速降温杯”品类，上市即引发全网现象级热销。',
      painPoint: '保温杯市场同质化白热化，缺乏突破性功能使用场景。',
      action: '发现摇摇降温核心体验，一体化打造品类爆品与超级符号。',
      result: '创造数亿元销售神话，奠定降温杯品类霸主地位。',
      tag: '全案咨询',
      url: '/cases/55degree'
    },
    {
      id: 'miaokelanduo',
      client: '妙可蓝多',
      subtitle: '通过产品、品牌与品类协同建立增长势能',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      defaultResult: '开创儿童奶酪棒黄金品类，助力品牌问鼎行业销量冠军。',
      painPoint: '国内奶酪市场被外资垄断，缺乏适合中国儿童的奶酪品类。',
      action: '重新定义“儿童奶酪棒”品类，主导产品造型阻隔包装与品牌IP化。',
      result: '3年实现数十倍爆发式增长，跻身百亿级乳品领军企业。',
      tag: '品类标杆',
      url: '/cases/miaokelanduo'
    },
    {
      id: 'case-1',
      client: '糯宝 Pophie',
      subtitle: '三品合一，打造类生命体情感陪伴机器人',
      image: '/src/assets/images/case_pophie.jpg',
      defaultResult: '融合AI算法与温润触感，定义家庭情感机器人新品类。',
      painPoint: '传统陪伴硬件机械冰冷，缺少情感交互与持续陪伴粘性。',
      action: '软硬一体化定义生命感造型、微表情反馈与亲和力品牌语言。',
      result: '上市即获科技与母婴圈层高度认可，荣获多项国际顶级设计大奖。',
      tag: '全案咨询',
      url: '/cases/case-1'
    },
    {
      id: 'xiaoxiandun',
      client: '小仙炖',
      subtitle: '确立“鲜炖燕窝”高端赛道，全维度打造保鲜标杆',
      image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.33.png',
      defaultResult: '开创即食滋补冷鲜新品类，连续多年位列全网销量第一。',
      painPoint: '传统燕窝繁琐耗时，即食燕窝品质存疑，亟需信任新支点。',
      action: '定义“鲜炖”品类标准，主导冷鲜包装容器与高端视觉符号。',
      result: '建立国民级鲜炖燕窝第一认知，引爆数十亿级高端滋补赛道。',
      tag: '品类标杆',
      url: '/cases/xiaoxiandun'
    },
    {
      id: 'haidilao',
      client: '海底捞',
      subtitle: '堂食体验延伸至家庭即食，开创便携自热火锅',
      image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.37.png',
      defaultResult: '拓宽火锅消费场景，自热即食系列年销售额破数亿元。',
      painPoint: '堂食场景受物理空间与就餐时段限制，外带即食体验严重脱节。',
      action: '定义自加热火锅结构安全与包装模块，沉淀家族化零售视觉。',
      result: '成为快消零售第二增长曲线，引领行业即食火锅标准化浪潮。',
      tag: '全案咨询',
      url: '/cases/case-5'
    },
    {
      id: 'yuexianhuo',
      client: '悦鲜活',
      subtitle: '超瞬时锁鲜技术赋能，打造年轻化高端鲜乳爆品',
      image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/7.15.1.3.gif',
      defaultResult: '0.09s黄金保鲜叙事，助力品牌跃升高端鲜奶第一梯队。',
      painPoint: '常温奶同质化严重，传统鲜奶保质期短且包装视觉老化。',
      action: '聚焦0.09s瞬时锁鲜科技心智，重构人体工学瓶身与年轻化视觉。',
      result: '销量年复合增长超100%，成为新一代高端鲜奶现象级单品。',
      tag: '品类标杆',
      url: '/cases/case-v2-1'
    },
    {
      id: 'liangpin',
      client: '良品铺子',
      subtitle: '高品质健康零食视觉体系与全新品牌超级符号',
      image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/liangpin.jpg',
      defaultResult: '从线下走到线上的零食新零售，打造全渠道高辨识度爆品包装。',
      painPoint: '传统零食门店增长触顶，线上零售缺乏高溢价差异化心智符号。',
      action: '重塑高端零食定位，打造全新超级符号与全品类爆品包装矩阵。',
      result: '全渠道视觉统一焕新，连续多年位居高端零食市场领先份额。',
      tag: '全案咨询',
      url: '/cases/case-v2-2'
    },
    {
      id: 'cotti',
      client: '库迪咖啡 Cotti',
      subtitle: '塑造全民咖啡品类创新概念，打通全链路商业闭环',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      defaultResult: '打造爆品咖啡家族化视觉与包装体验，助力全国万店规模快速扩张。',
      painPoint: '新消费咖啡赛道同质化严重，亟需高辨识度与极强亲和力的年轻化爆品体验。',
      action: '提炼全民咖啡品类价值，一体化定义爆品杯型结构、环保包材与超级视觉识别。',
      result: '达成数千家门店开业爆单，成为咖啡零售增长最快的现象级独角兽品牌之一。',
      tag: '品类标杆',
      url: '/cases/case-3'
    }
  ];

  const CATEGORY_CASE_GROUPS = [
    CATEGORY_CASES.slice(0, 3),
    CATEGORY_CASES.slice(3, 6),
    CATEGORY_CASES.slice(6, 9),
  ];

  return (
    <div className="w-full bg-white">
      
      {/* 1. HERO - QUANTITATIVE STATS SECTION */}
      <section id="category-hero" className="py-16 md:py-24 text-center bg-[#FFFFFF] relative overflow-hidden border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-[5%] relative z-10 flex flex-col items-center">
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
            <span className="text-[12px] tracking-[0.3em] font-semibold text-[#007BC7] font-mono">CATEGORY INNOVATION STRATEGY</span>
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-title text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#111827] leading-[1.05] font-display"
          >
            <span className="text-[#007BC7]">三品合一</span>
            <span className="text-[#111827]"> · </span>
            <span className="text-[#111827]">品类冠军</span>
          </motion.h1>

          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-[#6B7280] uppercase mt-4 font-mono">
            LKK Consulting & Design Group
          </p>

          <p className="text-sm md:text-base text-[#4B5563] max-w-3xl mt-8 leading-[1.8] font-normal text-center text-balance">
            洛可可独创“三品合一”系统化创新路径，高度整合品类、产品与品牌三重维度，从顶层商业战略到爆品落地研发。我们不仅帮助企业寻找并确立高增长的黄金细分品类赛道，更通过极致设计力、颠覆性技术整合与超级品牌IP化包装，重塑产品溢价与核心话语权，协助大中型制造企业与高成长新锐品牌跨越增长周期，致力于成为细分赛道的品类霸主。
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <button 
              onClick={() => onOnlineDiagnosis ? onOnlineDiagnosis() : onOpenContactModal()}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#007BC7] hover:bg-[#005F96] text-white text-sm font-medium transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer select-none"
              title="进入线上诊断"
            >
              <span>进入线上诊断</span>
              <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => onNavigateDetail ? onNavigateDetail('/three-in-one') : onOpenContactModal()}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-[#007BC7]/5 border border-[#007BC7] text-[#007BC7] text-sm font-medium transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-[0.98] cursor-pointer select-none"
              title="三品合一方法论"
            >
              <span>三品合一方法论</span>
              <ArrowRight className="w-4 h-4 text-[#007BC7] transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3D 架构动图框 (纯净框架，尺寸与三品合一页完全同等，无文字遮挡，预留后期动图) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-12 sm:mt-14 w-full rounded-[24px] overflow-hidden bg-[#F5F5F7] border border-black/5 shadow-[0_16px_48px_rgba(0,0,0,0.06)] group relative"
          >
            <div className="w-full aspect-[16/9] overflow-hidden bg-[#F5F5F7]">
              <video 
                src="https://github.com/minaxyue-ops/MINA/releases/download/1/SANpinheyi.mp4" 
                poster={methodologyVisualImg}
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover block select-none group-hover:scale-[1.01] transition-transform duration-700 ease-out border-none outline-none"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* QUANTIFIED ACHIEVEMENTS SECTION */}
      <section className="achievement-section">
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12">
          <div className="achievement-grid">
            {/* Card 1: 22年 行业经验积淀 */}
            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={22} /><span className="achievement-unit-gray">年</span>
              </div>
              <div className="achievement-label">行业经验积淀</div>
            </div>

            {/* Card 2: 600+ 专业奖项认证 */}
            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={600} /><span className="achievement-unit-blue">+</span>
              </div>
              <div className="achievement-label">专业奖项认证</div>
            </div>

            {/* Card 3: 1000+ 行业头部客户认可 */}
            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={1000} /><span className="achievement-unit-gray">+</span>
              </div>
              <div className="achievement-label">行业头部客户认可</div>
            </div>

            {/* Card 4: 10000+ 产品成功落地 */}
            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={10000} /><span className="achievement-unit-blue">+</span>
              </div>
              <div className="achievement-label">产品成功落地</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES - THREE CARD SERVICE AREA */}
      <section id="category-services" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-black/[0.06]">
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12 relative z-10">
          
          <ScrollSectionTitle 
            badge="Expertise"
            title="专业服务"
            subtitle="我们依托于核心的“战略定位+整合研发设计”闭环服务能力，提供从品类、产品、到品牌的高爆发全案咨询。"
            align="between"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            
            {/* Card 1: 三品合一品类咨询 */}
            <motion.div 
              whileHover={{ y: -6 }}
              onClick={() => onNavigateDetail?.('/three-in-one-category')}
              className="group bg-white rounded-[24px] overflow-hidden border border-black/[0.06] hover:border-[#007BC7]/40 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div className="h-60 relative overflow-hidden bg-neutral-100 border-b border-black/[0.06] flex items-center justify-center">
              </div>
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1F] group-hover:text-[#007BC7] transition-colors mb-4 font-display">
                    三品合一品类咨询
                  </h3>
                  <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                    {['品类竞争', '用户洞察', '技术规划', '品类战略', '品类品牌', '品类产品', '品类营销'].map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#424245] font-normal leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#007BC7] shrink-0"></span>
                        <span className="truncate">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-5 sm:mt-8 sm:pt-6 border-t border-black/[0.06] flex items-center justify-between">
                  <span className="text-xs text-[#86868B] font-medium uppercase tracking-wider group-hover:text-[#007BC7] transition-colors">
                    了解详情
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#F5F5F7] group-hover:bg-[#007BC7] flex items-center justify-center text-[#86868B] group-hover:text-white transition-all transform group-hover:rotate-45">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: 产品创新0-1全案咨询 */}
            <motion.div 
              whileHover={{ y: -6 }}
              onClick={() => onNavigateDetail?.('/product-innovation-consulting')}
              className="group bg-white rounded-[24px] overflow-hidden border border-black/[0.06] hover:border-[#007BC7]/40 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div className="h-60 relative overflow-hidden bg-neutral-100 border-b border-black/[0.06] flex items-center justify-center">
              </div>
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1F] group-hover:text-[#007BC7] transition-colors mb-4 font-display">
                    产品创新0-1全案咨询
                  </h3>
                  <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                    {['产品线规划', '产品家族化', '产品定义', '产品美学', '产品落地'].map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#424245] font-normal leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#007BC7] shrink-0"></span>
                        <span className="truncate">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-5 sm:mt-8 sm:pt-6 border-t border-black/[0.06] flex items-center justify-between">
                  <span className="text-xs text-[#86868B] font-medium uppercase tracking-wider group-hover:text-[#007BC7] transition-colors">
                    了解详情
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#F5F5F7] group-hover:bg-[#007BC7] flex items-center justify-center text-[#86868B] group-hover:text-white transition-all transform group-hover:rotate-45">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: 品牌创新0-1全案咨询 */}
            <motion.div 
              whileHover={{ y: -6 }}
              onClick={() => onNavigateDetail?.('/brand-innovation-consulting')}
              className="group bg-white rounded-[24px] overflow-hidden border border-black/[0.06] hover:border-[#007BC7]/40 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div className="h-60 relative overflow-hidden bg-neutral-100 border-b border-black/[0.06] flex items-center justify-center">
              </div>
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-[#1D1D1F] group-hover:text-[#007BC7] transition-colors mb-4 font-display">
                    品牌创新0-1全案咨询
                  </h3>
                  <ul className="grid gap-2.5">
                    {['品牌价值', '品牌定位', '品牌话语', '品牌美学'].map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#424245] font-normal leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#007BC7] shrink-0"></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-5 sm:mt-8 sm:pt-6 border-t border-black/[0.06] flex items-center justify-between">
                  <span className="text-xs text-[#86868B] font-medium uppercase tracking-wider group-hover:text-[#007BC7] transition-colors">
                    了解详情
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#F5F5F7] group-hover:bg-[#007BC7] flex items-center justify-center text-[#86868B] group-hover:text-white transition-all transform group-hover:rotate-45">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. SERVICE MATCHING / 01 - 找到你的问题，再找到适合你的服务 */}
      <section id="service-matching" className="py-16 sm:py-20 lg:py-24 bg-[#FFFFFF] w-full border-b border-[#E5E5E5] relative overflow-hidden">
        <div className="w-full relative z-10">
          
          {/* Section Header */}
          <div className="max-w-[min(95%,1720px)] w-full mx-auto px-6 sm:px-10 lg:px-16 2xl:px-12">
            <ScrollSectionTitle 
              badge="SERVICE MATCHING / 01 · STRATEGIC DIAGNOSIS"
              title="找到你的问题，再找到适合你的服务"
              subtitle="根据你的品类阶段、用户心智与业务问题，精准匹配更适合你的创新服务通道。"
              align="between"
            />

            {/* 全景战略诊断 Controller Card (No border, no outer shadow) */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 mb-8 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-[#007BC7]/10 text-[#007BC7] flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    <Star className="w-4 h-4 text-[#007BC7] fill-[#007BC7]" />
                  </div>
                  <div>
                    {/* 样式 2: 18px (text-lg) 次级标题 */}
                    <div className="text-lg font-bold text-[#1D1D1F]">
                      全景战略诊断：在下方折叠面板中选择与你痛点匹配的业务维度
                    </div>
                    {/* 样式 3: 14px (text-sm) 辅助说明 */}
                    <div className="text-sm text-[#86868B] mt-1 font-normal">
                      问题类型：01 品类战略不清 / 02 产品定义不准 / 03 品牌感知不足
                    </div>
                  </div>
                </div>

                {/* 右侧：进入线上诊断（后期点击加入链接） */}
                <div className="shrink-0 self-start sm:self-auto">
                  <a
                    id="online-diagnosis-link"
                    href={onlineDiagnosisUrl || '#'}
                    onClick={(e) => {
                      if (onOnlineDiagnosis) {
                        e.preventDefault();
                        onOnlineDiagnosis();
                      } else if (!onlineDiagnosisUrl || onlineDiagnosisUrl === '#') {
                        // 预留点击事件扩展，后期加入具体跳转链接
                      }
                    }}
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#007BC7] hover:bg-[#005F96] text-white text-sm font-medium transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer select-none"
                    title="进入线上诊断"
                  >
                    {/* 样式 3: 14px (text-sm) 按钮文字 */}
                    <span>进入线上诊断</span>
                    <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Centered Fast Navigation Pill Bar */}
            <div className="flex justify-center mb-10">
              <div className="bg-[#EAEAEA] shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)] p-1.5 rounded-full inline-flex items-center gap-1.5 sm:gap-2 max-w-full overflow-x-auto">
                {[
                  { id: 0, num: '01', title: '品类问题', sub: '方向判断' },
                  { id: 1, num: '02', title: '产品问题', sub: '从机会到落地' },
                  { id: 2, num: '03', title: '品牌问题', sub: '选择理由' },
                ].map((tab) => {
                  const isActive = activeProblemIndex === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveProblemIndex(tab.id)}
                      className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-white text-[#1D1D1F] font-bold shadow-xs'
                          : 'text-[#666666] hover:text-[#1D1D1F] font-medium bg-transparent'
                      }`}
                    >
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#007BC7] shrink-0" />
                      )}
                      {/* 样式 3: 14px (text-sm) 导航文字 */}
                      <span>{tab.num} {tab.title} · {tab.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 苹果并排画廊容器 (Horizontal Side-by-Side Peeking Track - 权威专著研读卡片呈现风格) */}
          {(() => {
            const isMobile = containerWidth < 640;
            const isTablet = containerWidth >= 640 && containerWidth < 1024;
            // 保持原本卡片宽广舒展的经典比例（在桌面端可达 1120px，同时自然露出左右卡片边沿）
            const cardWidth = isMobile 
              ? Math.max(containerWidth * 0.88, 280) 
              : isTablet 
                ? containerWidth * 0.84 
                : Math.min(containerWidth * 0.84, 1140);
            const cardGap = isMobile ? 16 : 28;
            const trackTranslateX = (containerWidth - cardWidth) / 2 - activeProblemIndex * (cardWidth + cardGap);

            return (
              <div 
                ref={carouselContainerRef} 
                className="w-full relative overflow-hidden py-3 select-none mb-4"
              >
                <motion.div 
                  className="flex items-stretch"
                  style={{ gap: `${cardGap}px` }}
                  animate={{ x: trackTranslateX }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  {matchingProblems.map((item, idx) => {
                    const isActive = activeProblemIndex === idx;
                    return (
                      <div 
                        key={item.id} 
                        onClick={() => setActiveProblemIndex(idx)}
                        style={{ width: `${cardWidth}px` }}
                        className="shrink-0 flex-none cursor-pointer flex flex-col"
                      >
                        <div className={`bg-[#FFFFFF] rounded-[24px] border border-black/5 shadow-[0_12px_44px_rgba(0,0,0,0.06)] flex flex-col justify-start overflow-hidden transition-opacity duration-300 p-6 sm:p-8 md:p-10 lg:p-12 h-full ${
                          isActive ? 'opacity-100' : 'opacity-85 hover:opacity-95'
                        }`}>
                          
                          {/* 上方：文字信息与核心诊断矩阵 */}
                          <div className="w-full flex flex-col gap-4 sm:gap-5 text-left pb-5 sm:pb-6">
                            
                            {/* 头部信息行：左侧痛点认知与描述，右侧推荐方案卡片 */}
                            <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
                              {/* 左侧：编号、问题大标题与问题说明 */}
                              <div className="flex-1 max-w-xl flex flex-col justify-center">
                                {/* 样式 3: 14px (text-sm) 编号与分类副标 */}
                                <div className="text-sm font-normal text-[#86868B] tracking-wider mb-2">
                                  {item.id} · {item.subLabel}
                                </div>

                                {/* 样式 1: 30px (text-3xl) 痛点大标题 */}
                                <h3 className="text-3xl font-bold tracking-tight text-[#1D1D1F] mb-3 font-display">
                                  {item.problemTitle}
                                </h3>

                                {/* 痛点描述正文：字号与板块辅助说明完全一致 (text-sm md:text-base) */}
                                <p className="text-sm md:text-base text-[#86868B] leading-relaxed max-w-lg font-normal">
                                  {item.description}
                                </p>
                              </div>

                              {/* 右侧：推荐服务卡片 (Apple 极简大气设计) */}
                              <div 
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNavigateDetail?.(item.url);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onNavigateDetail?.(item.url);
                                  }
                                }}
                                className="w-full lg:w-[390px] xl:w-[430px] shrink-0 bg-[#F5F5F7] hover:bg-[#EBEBEF] active:scale-[0.99] transition-all duration-300 rounded-[22px] p-6 sm:p-7 border border-black/[0.04] hover:border-black/[0.08] hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] flex flex-col justify-between gap-6 cursor-pointer group select-none relative"
                              >
                                <div className="flex items-center justify-between">
                                  {/* 样式 3: 14px (text-sm) 栏目标签 */}
                                  <span className="text-sm font-medium tracking-wider text-[#86868B]">
                                    推荐服务
                                  </span>
                                  {/* 样式 3: 14px (text-sm) 查看服务按钮 */}
                                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#007BC7] group-hover:bg-[#005F96] text-white text-sm font-medium tracking-tight transition-all duration-200">
                                    <span>查看服务</span>
                                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                                  </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                  {/* 样式 2: 18px (text-lg) 推荐服务标题 */}
                                  <h4 className="text-lg font-bold text-[#1D1D1F] tracking-tight leading-snug group-hover:text-black transition-colors">
                                    {item.serviceTitle}
                                  </h4>
                                  {/* 样式 3: 14px (text-sm) 核心解决说明 */}
                                  <p className="text-sm text-[#86868B] leading-relaxed">
                                    核心解决：<span className="text-[#1D1D1F] font-medium">{item.coreQuestion}</span>
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* 核心问题诊断矩阵：横向排布，极简灰点与统一炭黑文本 */}
                            <div className="w-full">
                              {/* 样式 3: 14px (text-sm) 痛点区微标 */}
                              <div className="text-sm font-normal text-[#86868B] mb-2.5">
                                常见核心痛点
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                                {item.questions.map((q, qIdx) => (
                                  <div 
                                    key={qIdx}
                                    /* 样式 3: 14px (text-sm) 痛点胶囊项目 */
                                    className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-[#F5F5F7] text-sm text-[#1D1D1F] font-normal"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#86868B] shrink-0" />
                                    <span className="truncate">{q}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* 下方：全景配图 */}
                          {item.image && (
                            <div className="w-full rounded-2xl overflow-hidden bg-[#F5F5F7] border border-black/5 aspect-[16/6] sm:aspect-[16/5.2] md:aspect-[3.1/1] lg:aspect-[3.4/1] max-h-[250px] sm:max-h-[280px] relative group">
                              <img 
                                src={item.image} 
                                alt={item.serviceTitle}
                                className="w-full h-full object-cover object-[center_35%] rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                              />
                            </div>
                          )}

                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            );
          })()}

          {/* 底部控制器：播放/暂停 + 胶囊指示条 (与权威专著研读保持完全一致的 Apple 控制条) */}
          <div className="mt-4 mb-10 sm:mb-12 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              aria-label={isAutoPlaying ? "暂停轮播" : "开始轮播"}
              className="w-8 h-8 rounded-full bg-[#E8E8ED] hover:bg-[#DCDCE0] flex items-center justify-center text-[#1D1D1F] transition-colors cursor-pointer"
            >
              {isAutoPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-[#1D1D1F]" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-[#1D1D1F] ml-0.5" />
              )}
            </button>

            <div className="bg-[#E8E8ED] px-3.5 py-2 rounded-full flex items-center gap-2 shadow-2xs">
              {matchingProblems.map((prob, idx) => (
                <button
                  key={prob.id}
                  onClick={() => setActiveProblemIndex(idx)}
                  aria-label={`切换至 ${prob.problemTitle}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeProblemIndex === idx 
                      ? 'w-7 h-1.5 bg-[#007BC7]' 
                      : 'w-1.5 h-1.5 bg-[#86868B]/40 hover:bg-[#86868B]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Strategic Consultation Guidance Banner ("不确定当前所处的品类阶段与问题？") - No border, no outer shadow */}
          <div id="category-advisory" className="max-w-[min(95%,1720px)] w-full mx-auto px-6 sm:px-10 lg:px-16 2xl:px-12">
            <div className="w-full bg-white rounded-3xl p-8 sm:p-12 lg:p-14 text-center relative overflow-hidden">
              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="text-xs font-mono font-semibold tracking-widest text-[#007BC7] uppercase block mb-3">
                  STRATEGIC DIAGNOSIS & ADVISORY
                </span>
                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1D1D1F] font-display tracking-tight mb-3">
                  不确定当前所处的品类阶段与问题？
                </h4>
                <p className="text-sm sm:text-base text-[#666666] max-w-xl mx-auto leading-relaxed mb-8 font-normal">
                  与洛可可资深战略咨询顾问展开 1 对 1 诊断沟通，梳理企业业务现状与创新契机。
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  <button
                    onClick={onOpenContactModal}
                    className="w-full sm:w-auto h-11 px-7 bg-[#007BC7] hover:bg-[#0069A8] text-white text-sm font-semibold rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>预约专家品类诊断</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigateDetail?.('/three-in-one-category')}
                    className="w-full sm:w-auto h-11 px-4 bg-transparent hover:underline text-[#007BC7] text-sm font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>查看三品合一全案方法论</span>
                    <span className="text-sm">&gt;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 3. 案例锦集 - 9个案例横向滑动 / Carousel (CASE STUDIES / 05) ================= */}
      <section id="category-cases" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5] overflow-hidden select-none">
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12">
          
          {/* Header */}
          <ScrollSectionTitle 
            badge="CASE STUDIES / 05"
            title="案例锦集"
            subtitle="精选 9 个品类创新标杆全案，展示从品类定义、产品重构到品牌引爆的完整商业实践，支持向右拖拽/滑动浏览。"
            align="between"
          />

          {/* Carousel Slide Track Container with Drag / Swipe Gesture */}
          <div 
            onMouseDown={(e) => handleCaseDragStart(e.clientX)}
            onMouseMove={(e) => handleCaseDragMove(e.clientX)}
            onMouseUp={handleCaseDragEnd}
            onMouseLeave={handleCaseDragEnd}
            onTouchStart={(e) => handleCaseDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleCaseDragMove(e.touches[0].clientX)}
            onTouchEnd={handleCaseDragEnd}
            onWheel={handleCaseWheel}
            className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing pb-2"
          >
            <div 
              className="flex w-full will-change-transform"
              style={{
                transform: `translateX(calc(-${caseCurrentGroup * 100}% - ${caseDragOffset}px))`,
                transition: isCaseDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              {CATEGORY_CASE_GROUPS.map((group, groupIdx) => (
                <div 
                  key={groupIdx} 
                  className="w-full shrink-0 basis-full min-w-full box-border"
                  aria-hidden={caseCurrentGroup !== groupIdx}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {group.map((item) => (
                      <div 
                        key={item.id}
                        id={`case-card-${item.id}`}
                        onClick={() => {
                          if (!caseHasDragged) {
                            if (onNavigateDetail && item.url) {
                              onNavigateDetail(item.url);
                            } else if (onSelectCase) {
                              onSelectCase({
                                id: item.id,
                                title: item.subtitle,
                                description: item.defaultResult,
                              });
                            }
                          }
                        }}
                        className="w-full min-w-0 box-border group relative rounded-[24px] border border-[#E5E5E5] bg-white overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#007BC7] hover:shadow-lg flex flex-col h-full"
                      >
                        {/* Image Container (拉长20%：由 aspect-[16/9] 调整为 aspect-[16/11]) */}
                        <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#F0F0F0] shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.client}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:brightness-90 pointer-events-none"
                            draggable={false}
                          />

                          {/* Dark Semi-transparent Overlay on Hover (Desktop) */}
                          <div className="absolute inset-0 bg-[#1A1A1A]/90 p-6 text-white flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex">
                            <div className="space-y-3 text-left">
                              <div>
                                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8C8C8C] mb-0.5">客户原有困境</div>
                                <p className="text-xs md:text-sm leading-relaxed text-neutral-200 line-clamp-2">{item.painPoint}</p>
                              </div>
                              <div>
                                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#007BC7] mb-0.5">洛可可关键动作</div>
                                <p className="text-xs md:text-sm leading-relaxed text-white line-clamp-2">{item.action}</p>
                              </div>
                              <div>
                                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 mb-0.5">项目结果</div>
                                <p className="text-xs md:text-sm leading-relaxed text-neutral-200 line-clamp-2">{item.result}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Content & Footer */}
                        <div className="p-6 flex-1 flex flex-col justify-between text-left">
                          <div>
                            {/* Top Line: Client Title & Category Tag */}
                            <div className="flex items-start justify-between gap-3 mb-2.5">
                              <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A] font-display tracking-tight group-hover:text-[#007BC7] transition-colors leading-snug line-clamp-1">
                                {item.client}
                              </h3>
                              <span className="shrink-0 text-xs font-mono font-medium px-2.5 py-0.5 rounded bg-[#007BC7]/10 text-[#007BC7] border border-[#007BC7]/20">
                                {item.tag || '品类标杆'}
                              </span>
                            </div>

                            {/* Subtitle / Positioning */}
                            <p className="text-xs md:text-sm text-[#8C8C8C] mb-3 font-medium line-clamp-1">
                              {item.subtitle}
                            </p>

                            {/* Default Result Description */}
                            <p className="text-sm text-[#4D4D4D] leading-relaxed line-clamp-2 min-h-[44px]">
                              {item.defaultResult}
                            </p>
                          </div>

                          {/* Mobile Summary */}
                          <div className="block lg:hidden mt-4 pt-3.5 border-t border-[#E5E5E5] text-xs space-y-1.5 text-[#4D4D4D]">
                            <div><span className="text-[#8C8C8C] font-mono">动作：</span>{item.action}</div>
                            <div><span className="text-emerald-600 font-mono font-medium">结果：</span>{item.result}</div>
                          </div>

                          {/* Card Bottom CTA (Fixed at Bottom with margin-top auto) */}
                          <div className="mt-auto pt-5 border-t border-[#E5E5E5] flex items-center justify-between">
                            <span className="text-xs font-mono font-semibold text-[#8C8C8C] group-hover:text-[#007BC7] tracking-wider uppercase transition-colors">
                              VIEW CASE STUDY
                            </span>
                            <div className="w-8 h-8 rounded-full border border-[#E5E5E5] group-hover:border-[#007BC7] group-hover:bg-[#007BC7] flex items-center justify-center transition-all duration-300">
                              <ArrowRight className="w-4 h-4 text-[#8C8C8C] group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 底部控制器：播放/暂停 + 胶囊指示条 (与权威专著研读保持完全一致的设计) */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsCaseAutoPlaying(!isCaseAutoPlaying)}
              aria-label={isCaseAutoPlaying ? "暂停轮播" : "开始轮播"}
              className="w-8 h-8 rounded-full bg-[#E8E8ED] hover:bg-[#DCDCE0] flex items-center justify-center text-[#1D1D1F] transition-colors cursor-pointer"
            >
              {isCaseAutoPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-[#1D1D1F]" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-[#1D1D1F] ml-0.5" />
              )}
            </button>

            <div className="bg-[#E8E8ED] px-3.5 py-2 rounded-full flex items-center gap-2 shadow-2xs">
              {CATEGORY_CASE_GROUPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCaseCurrentGroup(idx)}
                  aria-label={`切换至第 ${idx + 1} 组案例`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    caseCurrentGroup === idx 
                      ? 'w-7 h-1.5 bg-[#007BC7]' 
                      : 'w-1.5 h-1.5 bg-[#86868B]/40 hover:bg-[#86868B]'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. CLIENTS - SERVICE CLIENTS SECTION */}
      <section id="category-clients" className="py-20 md:py-28 bg-white w-full border-b border-black/[0.06]">
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12 relative z-10">
          <ScrollSectionTitle 
            badge="OUR CLIENTS"
            title="服务客户"
            subtitle="洛可可已服务超过数千个品牌客户，荣获多项国际工业设计大奖，打造诸多行业标杆与爆品。"
            align="between"
          />
          <div className="w-full rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.05)] bg-white">
            <img 
              src="https://github.com/minaxyue-ops/MINA/releases/download/1/Group.133.jpg" 
              alt="服务客户" 
              referrerPolicy="no-referrer"
              className="w-full h-auto aspect-[4344/2462] object-contain block"
            />
          </div>
        </div>
      </section>

      {/* 5. FAQ - SUCCESS PATH SECTION */}
      <section 
        id="category-faq" 
        className="py-20 md:py-28 bg-white w-full overflow-hidden border-b border-black/[0.06]"
      >
        {/* Title Area - Left aligned */}
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12 relative z-10 mb-10 md:mb-12">
          <ScrollSectionTitle 
            badge="FAQ"
            title="成功路径"
            subtitle="关于洛可可“三品合一”战略咨询与爆品落地全流程，解答您关心的一切核心诉求。"
            align="between"
          />
        </div>

        {/* Full-width List Container (保留5个精选核心问题) */}
        <div className="flex flex-col border-t border-black/[0.06] w-full">
          {faqItems.slice(0, 5).map((item, index) => (
            <div 
              key={index} 
              className="w-full border-b border-black/[0.06]"
            >
              {/* Centered item content */}
              <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12 py-6 flex flex-col text-left group">
                <h4 className="text-base font-semibold text-[#111827] group-hover:text-[#007BC7] transition-colors duration-300">
                  {item.q}
                </h4>
                <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 查看更多跳转按钮 (跳转至成功路径详情页) */}
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12 mt-10 md:mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => {
              if (onNavigateDetail) {
                onNavigateDetail('/success-path');
              } else {
                window.location.hash = '#success-path';
              }
            }}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F5F5F7] hover:bg-[#007BC7] text-[#111827] hover:text-white text-sm font-medium transition-all duration-300 cursor-pointer border border-black/5 hover:border-transparent shadow-xs hover:shadow-md active:scale-[0.98]"
          >
            <span>查看更多</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>

    </div>
  );
}
