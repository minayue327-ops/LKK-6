import React, { useState, useMemo, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  ChevronDown, 
  Send, 
  CheckCircle2, 
  Copy, 
  Briefcase, 
  Search, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  Users,
  Image
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollSectionTitle } from './ScrollSectionTitle';

interface OfficeInfo {
  id: string;
  name: string;
  city: string;
  isHQ?: boolean;
  coords: [number, number]; // [lng, lat]
  phone: string;
  email: string;
  address: string;
  desc: string;
  tag: string;
  shortTag: string;
  serialNo: string;
  positioning: string;
  image?: string;
  heroImage?: string;
}

interface JobPosition {
  id: string;
  title: string;
  city: string;
  department: string;
  type: string;
  responsibilities: string[];
  requirements: string[];
  email: string;
}

interface ContactUsPageProps {
  onOpenContactModal?: () => void;
  onNavigate?: (path: string) => void;
}

// 9 Cities Official Office Data with High-res Space Photos & Branding Tags
const OFFICES_DATA: OfficeInfo[] = [
  {
    id: 'beijing',
    name: '北京•总部',
    city: '北京',
    isHQ: true,
    coords: [116.4074, 39.9042],
    phone: '400 692 9690',
    email: 'lkk@lkkdesign.com',
    address: '北京市朝阳区来广营西路5号望京诚盈中心3号楼',
    desc: '集团战略决策中心、AI设计实验室与品牌创新事业集群所在地。',
    tag: '集团总部 · 创新策源地',
    shortTag: '创新策源地',
    serialNo: 'NO.01 / BEIJING · HQ',
    positioning: '集团战略决策中心 · AI设计实验室与品牌创新事业集群',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85'
  },
  {
    id: 'shenzhen',
    name: '深圳',
    city: '深圳',
    coords: [114.0579, 22.5431],
    phone: '400 692 9690',
    email: 'lkk@lkkdesign.com',
    address: '深圳市福田区深业上城CEEC10层',
    desc: '深度依托大湾区电子信息与智能硬件产业链，打造全球硬件爆款。',
    tag: '华南创新中心 · 硬件基地',
    shortTag: '华南枢纽',
    serialNo: 'NO.02 / SHENZHEN',
    positioning: '华南区域枢纽 · 深度协同大湾区智能硬件产业链打造全球爆款',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85'
  },
  {
    id: 'shanghai',
    name: '上海',
    city: '上海',
    coords: [121.4737, 31.2304],
    phone: '400 692 9690',
    email: 'lkk@lkkdesign.com',
    address: '上海市黄浦区局门路457号八号桥四期408室',
    desc: '立足华东时尚与新消费高地，赋能全球品牌年轻化与品类突破。',
    tag: '华东创新中心 · 品牌设计',
    shortTag: '华东高地',
    serialNo: 'NO.03 / SHANGHAI',
    positioning: '华东时尚与新消费高地 · 赋能全球知名品牌年轻化与品类突破',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1800&q=85'
  },
  {
    id: 'suzhou',
    name: '苏州',
    city: '苏州',
    coords: [120.5853, 31.2989],
    phone: '400 692 9690',
    email: 'lkk@lkkdesign.com',
    address: '江苏省苏州市工业园区酝慧路168号星洲大厦8楼',
    desc: '聚焦高端制造、医疗器械与精密仪器领域的深度研发与工业设计。',
    tag: '医疗与高端制造创新中心',
    shortTag: '高端制造基地',
    serialNo: 'NO.04 / SUZHOU',
    positioning: '高端制造创新中心 · 聚焦医疗器械与精密仪器领域的深度研发',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1800&q=85'
  },
  {
    id: 'hangzhou',
    name: '杭州',
    city: '杭州',
    coords: [120.1551, 30.2741],
    phone: '400 692 9690',
    email: 'lkk@lkkdesign.com',
    address: '浙江省杭州市余杭区仓前街道梦想小镇创业大街26幢',
    desc: '紧密联动数字经济与电商智造，驱动新零售与智能生活终端升级。',
    tag: '数字电商与生活创新中心',
    shortTag: '数字电商枢纽',
    serialNo: 'NO.05 / HANGZHOU',
    positioning: '数字电商与生活创新中心 · 紧密联动数字经济与智能生活终端',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=85'
  },
  {
    id: 'nanjing',
    name: '南京',
    city: '南京',
    coords: [118.7969, 32.0603],
    phone: '400 692 9690',
    email: 'lkk@lkkdesign.com',
    address: '江苏省南京市秦淮区菱角市66号国家领军创业园18号楼',
    desc: '融合高校科技成果转化与硬科技产品创新，助力传统企业智造升级。',
    tag: '硬科技与成果转化基地',
    shortTag: '硬科技转化基地',
    serialNo: 'NO.06 / NANJING',
    positioning: '硬科技成果转化基地 · 融合高校科研协同与先进硬科技产品创新',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1800&q=85'
  },
  {
    id: 'chengdu',
    name: '成都',
    city: '成都',
    coords: [104.0668, 30.5728],
    phone: '400 692 9690',
    email: 'lkk@lkkdesign.com',
    address: '成都市成华区仙韵一路450号天府设计产业园',
    desc: '西南区域创意设计枢纽，文创IP、休食快消与智能出行设计基地。',
    tag: '西南创新中心 · 文创IP',
    shortTag: '西南文创枢纽',
    serialNo: 'NO.07 / CHENGDU',
    positioning: '西南区域创意设计枢纽 · 青年文创IP、休食快消与智能出行基地',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1800&q=85'
  },
  {
    id: 'foshan',
    name: '佛山',
    city: '佛山',
    coords: [113.1220, 23.0288],
    phone: '400 692 9690',
    email: 'lkk@lkkdesign.com',
    address: '佛山南海区桂城街道海八路金融公园1号馆',
    desc: '深耕家电集群与泛家居产业，工业设计深度融入万亿制造产业链。',
    tag: '泛家居与智能家电基地',
    shortTag: '泛家居家电基地',
    serialNo: 'NO.08 / FOSHAN',
    positioning: '泛家居与智能家电基地 · 深度融入大湾区万亿家电制造产业链',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=85'
  },
  {
    id: 'nanchang',
    name: '南昌',
    city: '南昌',
    coords: [115.8581, 28.6820],
    phone: '400 692 9690',
    email: 'lkk@lkkdesign.com',
    address: '江西省南昌市青山湖区上海路699号699文化创意园68栋优创空间2楼B07',
    desc: '服务中部崛起的产业创新窗口，助力地方特色产业品类升级。',
    tag: '中部特色产业创新中心',
    shortTag: '中部特色产业',
    serialNo: 'NO.09 / NANCHANG',
    positioning: '中部崛起产业创新窗口 · 助力地方特色制造产业与文创品类升级',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85'
  }
];

// Job Openings Database
const JOB_POSITIONS: JobPosition[] = [
  {
    id: 'job-1',
    title: '资深工业设计总监 / 主理人',
    city: '北京',
    department: '工业设计事业部',
    type: '全职 · 10年以上经验',
    email: 'hr@lkkdesign.com',
    responsibilities: [
      '负责集团核心工业设计团队的项目管控与设计美学把控，主导大型客户的产品战略与品类创新设计；',
      '深入研究行业技术与用户体验趋势，输出具有市场爆款潜力的工业设计解决方案；',
      '指导并带教中高级设计师，构建高标准的设计美学规范与高效人机工程研判流程。'
    ],
    requirements: [
      '工业设计或相关专业本科及以上学历，10年以上知名设计公司或科技品牌设计管理经验；',
      '拥有多项国际顶级设计大奖（Red Dot Best of the Best, iF, IDEA等）获奖记录优先；',
      '具有极强的前瞻审美、商业洞察力及跨团队沟通协调能力。'
    ]
  },
  {
    id: 'job-2',
    title: '智能硬件结构设计专家',
    city: '深圳',
    department: '硬件工程中心',
    type: '全职 · 5-8年经验',
    email: 'hr@lkkdesign.com',
    responsibilities: [
      '负责消费电子、智能机器人及医疗设备的堆叠与结构工程开发，确保落地可量产；',
      '配合工业设计团队开展可行性评估，解决塑胶、模具、三防及散热等结构难点；',
      '把控试产、模具检讨及工厂量产交付流程，对产品结构成本与品质负责。'
    ],
    requirements: [
      '机械工程、模具设计或相关专业本科以上，5年以上精密电子结构设计经验；',
      '精通 Creo / ProE / SolidWorks / AutoCAD 等结构设计软件及钣金、注塑工艺；',
      '有完整的从0到1百万级量产项目跟进案例者优先。'
    ]
  },
  {
    id: 'job-3',
    title: '品牌策略咨询总监 (品类突围)',
    city: '上海',
    department: '品类战略咨询部',
    type: '全职 · 8-10年经验',
    email: 'hr@lkkdesign.com',
    responsibilities: [
      '主导消费品、快消乳品及健康科技等领域客户的品牌定位、品类突围策略及三品合一规划；',
      '通过定量与定性市场调研，精准提炼高潜力蓝海赛道与消费者核心买点；',
      '撰写高质量品牌战略报告并面向企业C-Level高管汇报，护航设计方案落地。'
    ],
    requirements: [
      '市场营销、广告学或战略管理等专业本科以上，8年以上品牌咨询或4A广告公司策略经验；',
      '具备深厚的商业敏锐度，擅长将品牌定位转化为具体的产品、包装与视觉符号；',
      '有成功的品类创新与新锐爆款打造全案经验。'
    ]
  },
  {
    id: 'job-4',
    title: '医疗器械工业设计师',
    city: '苏州',
    department: '医疗科技设计部',
    type: '全职 · 3-5年经验',
    email: 'hr@lkkdesign.com',
    responsibilities: [
      '负责手术机器人、体外诊断设备（IVD）及家用健康器械的外观与人机工程设计；',
      '与医疗法规与临床医师深入沟通，遵循医疗器械无菌化与人机安全标准；',
      '完成产品造型渲染、CMF方案制定及产品宣传视觉表现。'
    ],
    requirements: [
      '工业设计专业，3年以上医疗设备或大型工业设备设计经验；',
      '熟悉医疗场景人机交互与CMF材料应用，具备优秀的手绘草图与3D建模能力；',
      '拥有医疗器械相关红星奖或德国iF/Red Dot获奖作品者优先。'
    ]
  },
  {
    id: 'job-5',
    title: '体验设计专家 (UX/UI Designer)',
    city: '杭州',
    department: '数字体验实验室',
    type: '全职 · 4-6年经验',
    email: 'hr@lkkdesign.com',
    responsibilities: [
      '主导智能车载屏、智能家居中控及AI机器人多模态交互界面的UX体系搭建；',
      '输出用户旅程地图、信息架构、交互原型与极具质感的UI视觉设计规范；',
      '与前端与算法团队紧密配合，实现动效与交互细节的高品质还原。'
    ],
    requirements: [
      '视觉传达、交互设计或数字媒体相关专业本科以上，4年以上UX/UI经验；',
      '精通 Figma / Sketch / Principle / After Effects 等交互与动效设计工具；',
      '对AI Agent交互、语音/触控多模态融合有深厚探索者优先。'
    ]
  },
  {
    id: 'job-6',
    title: '硬科技产学研商务总监',
    city: '南京',
    department: '商业发展部',
    type: '全职 · 5年以上经验',
    email: 'hr@lkkdesign.com',
    responsibilities: [
      '负责华东区域专精特新企业、科研院所及龙头制造企业的商务合作开拓；',
      '深入挖掘企业在产品升级、工业设计与供应链对接方面的核心痛点，提供组合式创新解决方案；',
      '建立并维护长远战略合作伙伴关系，对区域销售目标与项目回款负责。'
    ],
    requirements: [
      '本科及以上学历，5年以上TO B高阶商务或咨询设计服务销售背景；',
      '具备出色的商务谈判、提案呈现及大客户关照能力；',
      '对工业设计行业与制造业转型升级有深刻认知。'
    ]
  },
  {
    id: 'job-7',
    title: '文创IP与潮流衍生品设计师',
    city: '成都',
    department: '文创IP事业部',
    type: '全职 · 3-5年经验',
    email: 'hr@lkkdesign.com',
    responsibilities: [
      '负责知名文旅景区、博物馆及品牌IP的形象开发、盲盒手办与衍生品设计；',
      '把控潮玩公仔的3D雕刻建模、涂装CMF及包装延展；',
      '研究泛Z世代消费者审美倾向，输出具有传播话题度的爆款文创设计。'
    ],
    requirements: [
      '动漫插画、玩具设计或工业设计相关专业，3年以上文创IP/潮玩设计经验；',
      '精通 ZBrush / Blender / Keyshot / Photoshop / Illustrator 等建模与绘图软件；',
      '有知名IP（如故宫、博物馆文创）成功落地案例者优先。'
    ]
  },
  {
    id: 'job-8',
    title: '智能家电CMF材料专家',
    city: '佛山',
    department: 'CMF创新研究中心',
    type: '全职 · 4-6年经验',
    email: 'hr@lkkdesign.com',
    responsibilities: [
      '研究泛家居与厨电领域的年度色彩、材料与工艺（CMF）流行趋势；',
      '搭建集团CMF样板库，与供应商建立环保可再生材料与特殊表面处理应用测试；',
      '为客户产品项目提供最具竞争力的CMF方案与批量打样跟进。'
    ],
    requirements: [
      '材料学、艺术设计或工业设计相关专业，4年以上CMF设计研发经验；',
      '熟悉注塑、喷涂、阳极氧化、PVD、IMD等金属与塑料表面工艺流程；',
      '具备极高的审美敏感度与供应链材料把控力。'
    ]
  },
  {
    id: 'job-9',
    title: '快消品包装创新设计师',
    city: '南昌',
    department: '包装体验设计组',
    type: '全职 · 2-4年经验',
    email: 'hr@lkkdesign.com',
    responsibilities: [
      '负责食品饮料、日化快消品的结构包装创新、瓶型造型与视觉烫印延展；',
      '优化开箱体验与环保折叠结构，提升货架展示吸引力与消费信任感；',
      '配合工厂完成印刷打样、刀模检讨与批量生产跟踪。'
    ],
    requirements: [
      '包装工程、视觉传达或工业设计专业本科以上；',
      '熟练运用 C4D / Rhino / AI / PS 进行包装三维建模与视觉贴图渲染；',
      '熟悉各类纸盒、玻璃瓶及软包装工艺与打样测试。'
    ]
  }
];

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ onNavigate }) => {
  // Active selected office (defaults to Beijing)
  const [activeOfficeId, setActiveOfficeId] = useState<string>('beijing');

  // Office copy address feedback state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Active Job Accordion state
  const [expandedJobId, setExpandedJobId] = useState<string | null>('job-1');
  const [jobCityFilter, setJobCityFilter] = useState<string>('全部');

  // Contact Form state
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    company: '',
    city: '',
    demand: ''
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Active office object (defaults to Beijing HQ)
  const activeOffice = useMemo(() => {
    return OFFICES_DATA.find(o => o.id === activeOfficeId) || OFFICES_DATA[0];
  }, [activeOfficeId]);

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    if (jobCityFilter === '全部') return JOB_POSITIONS;
    return JOB_POSITIONS.filter(j => j.city === jobCityFilter);
  }, [jobCityFilter]);

  // Handle City Change from map or list
  const handleSelectOffice = (officeId: string) => {
    setActiveOfficeId(officeId);
  };

  // Copy Address Helper
  const handleCopyAddress = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Form Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormState({ name: '', phone: '', company: '', city: '', demand: '' });
    }, 4000);
  };

  // Notify outer PageScaleShell/DesktopScaleContainer to remeasure height when accordions or filters change
  useEffect(() => {
    window.dispatchEvent(new Event('desktop-scale-remeasure'));
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('desktop-scale-remeasure'));
    }, 350);
    return () => clearTimeout(timer);
  }, [expandedJobId, activeOfficeId, jobCityFilter]);

  return (
    <div className="w-full bg-white text-neutral-900 min-h-screen">
      
      {/* HEADER HERO SECTION (案例页风格排版) */}
      <div className="bg-white border-b border-neutral-100 py-12">
        <div className="max-w-[1621.65px] w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-24">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[1.5px] w-6 bg-[#007BC7]"></span>
                <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">
                  全国创新集群 · 即刻联系
                </span>
              </div>
              <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#111827] leading-[1.15] font-display text-left">
                <span className="block">分布中国主要经济圈</span>
                <span className="block mt-2">共创商业增长</span>
              </h1>
            </div>

            <p className="text-sm text-[#4B5563] max-w-xl leading-relaxed">
              洛可可立足北京集团总部，在深圳、上海、苏州、杭州、南京、成都、佛山、南昌设立9大创新中心。本地化响应+全球化协同，随时随地开启全案设计合作。
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: MAP & OFFICE ADDRESSES INTERACTIVE SECTION */}
      <section className="py-8 bg-white">
        <div className="max-w-[1621.65px] w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-24">
          
          {/* Map + Office Details Stage (Single Column Full-bleed Canvas) */}
          <div className="map-3d-wrapper rounded-[24px] border border-neutral-200/80 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[720px] h-[720px]">

            {/* Background: Full-bleed City Branch Real Scene Panoramic Showcase (通栏铺满整个外层圆角容器) */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOffice.id + (activeOfficeId === 'all' ? '-all' : '')}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Real Office Space Interior Photo */}
                  <img
                    src={activeOffice.heroImage || activeOffice.image}
                    alt={`${activeOffice.name} 真实办公环境实景摄影`}
                    className="w-full h-full object-cover block select-none"
                    loading="eager"
                  />

                  {/* Top Subtle Gradient for contrast against top filter bar */}
                  <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-neutral-950/85 via-neutral-950/30 to-transparent pointer-events-none z-10" />

                  {/* Deep Dark Gradient Overlay at Bottom (从透明到深黑色，仅覆盖文字所在的下方区域，不影响图片整体观感) */}
                  <div className="absolute inset-x-0 bottom-0 h-[480px] bg-gradient-to-t from-neutral-950/95 via-neutral-950/60 to-transparent pointer-events-none z-10" />
                  <div className="absolute inset-y-0 left-0 w-[550px] bg-gradient-to-r from-neutral-950/45 to-transparent pointer-events-none z-10" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Top Floating Filter Bar (9 Cities Selection Pills) */}
            <div className="absolute top-5 left-6 right-6 z-20 pointer-events-auto bg-neutral-950/45 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-sm m-0">
              <div className="grid grid-cols-9 gap-1.5 w-full">
                {OFFICES_DATA.map((off) => {
                  const isActive = off.id === activeOfficeId;
                  return (
                    <button
                      key={off.id}
                      onClick={() => handleSelectOffice(off.id)}
                      className={`w-full px-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 select-none ${
                        isActive
                          ? 'bg-[#007BC7] text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                          : 'bg-white/10 hover:bg-white/20 text-white/90'
                      }`}
                    >
                      <Building2 className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-300'}`} />
                      <span>{off.name}</span>
                      {off.isHQ && (
                        <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-blue-500/30 text-sky-200'}`}>
                          HQ
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 大图左下角: 整合完整信息从上到下排版 (主标题 -> 简介文字 -> 客服电话/官方邮箱/详细地址全部保持在同一行横向排开，完整显示不截断不折行) */}
            <div className="relative z-20 px-12 pb-10 pt-0 w-full max-w-none pr-12 mt-auto pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOffice.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {/* 主标题 "洛可可 · XX" */}
                  <h2 className="text-5xl font-bold text-white font-display tracking-tight drop-shadow-md mb-4">
                    洛可可 · {activeOffice.name}
                  </h2>

                  {/* 客服电话、官方邮箱、详细地址：全部保持在同一行横向并排展示，绝不另起一行，完整显示不截断 */}
                  <div className="flex items-center flex-nowrap gap-3.5 py-1 text-sm text-white font-mono whitespace-nowrap overflow-x-auto no-scrollbar max-w-full">
                    {/* 客服电话 */}
                    <div className="flex items-center gap-2 bg-neutral-900/60 hover:bg-neutral-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 transition-all shrink-0">
                      <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="text-neutral-400 text-xs font-sans">电话:</span>
                      <a 
                        href={`tel:${activeOffice.phone.replace(/\s+/g, '')}`} 
                        className="font-bold text-white hover:text-sky-300 transition-colors"
                      >
                        {activeOffice.phone}
                      </a>
                      <button 
                        onClick={() => handleCopyAddress(activeOffice.phone, `phone-${activeOffice.id}`)}
                        className="ml-0.5 text-neutral-400 hover:text-white p-0.5 rounded transition-colors cursor-pointer"
                        title="复制电话"
                      >
                        {copiedId === `phone-${activeOffice.id}` ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* 官方邮箱 */}
                    <div className="flex items-center gap-2 bg-neutral-900/60 hover:bg-neutral-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 transition-all shrink-0">
                      <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="text-neutral-400 text-xs font-sans">邮箱:</span>
                      <a 
                        href={`mailto:${activeOffice.email}`} 
                        className="font-bold text-white hover:text-sky-300 transition-colors"
                      >
                        {activeOffice.email}
                      </a>
                      <button 
                        onClick={() => handleCopyAddress(activeOffice.email, `email-${activeOffice.id}`)}
                        className="ml-0.5 text-neutral-400 hover:text-white p-0.5 rounded transition-colors cursor-pointer"
                        title="复制邮箱"
                      >
                        {copiedId === `email-${activeOffice.id}` ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* 详细地址：同一行并列显示，绝不另起一行，地址全文完整展现不截断 */}
                    <div className="flex items-center gap-2 bg-neutral-900/60 hover:bg-neutral-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 transition-all shrink-0">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="text-neutral-400 text-xs font-sans shrink-0">地址:</span>
                      <span className="font-medium text-white/95 font-sans text-sm whitespace-nowrap select-text">
                        {activeOffice.address}
                      </span>
                      <button 
                        onClick={() => handleCopyAddress(activeOffice.address, `addr-${activeOffice.id}`)}
                        className="ml-1 text-neutral-400 hover:text-white p-0.5 rounded transition-colors shrink-0 cursor-pointer"
                        title="复制地址"
                      >
                        {copiedId === `addr-${activeOffice.id}` ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: JOIN US ENVIRONMENT & CULTURE SECTION (参照“关于我们”页的企业环境板块) */}
      <section className="py-16 bg-white border-t border-neutral-200/60">
        <div className="max-w-[1621.65px] w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-24">
          
          <ScrollSectionTitle 
            badge="JOIN US & ENVIRONMENT"
            title="加入我们"
            subtitle="开放、包容、充满创造力的办公与成长生态，期待与富有激情的设计师、工程师与咨询专家同行。"
            align="between"
          />

          {/* Single Image Banner with Strict 16:9 Aspect Ratio (参照企业环境板块) */}
          <div className="w-full aspect-[16/9] rounded-[24px] bg-[#F5F5F5] border border-neutral-200/60 flex flex-col items-center justify-center text-neutral-400 p-6 overflow-hidden">
            <Image className="w-12 h-12 mb-3 text-neutral-400/80 stroke-[1.5]" />
            <span className="text-sm font-semibold text-neutral-600 font-mono">
              [待替换：加入我们 / 工作环境形象大图]
            </span>
            <span className="text-xs text-neutral-400 mt-1">开放、包容、充满创造力的办公生态</span>
          </div>

        </div>
      </section>

      {/* SECTION 4: LKK TALENT POOL & RECRUITMENT POSITIONS */}
      <section className="py-16 bg-white border-t border-neutral-200/60">
        <div className="max-w-[1621.65px] w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-24">
          
          {/* Header */}
          <ScrollSectionTitle 
            badge="LKK TALENT POOL"
            title="洛可可的人才储备计划"
            subtitle="洛可可提供开放的创意平台与极具竞争力的薪酬福利，期待与富有激情的设计师、工程师与咨询专家同行。"
            align="between"
          />

          {/* City Filter Pills (Same filter bar style as Cases page) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {['全部', '北京', '深圳', '上海', '苏州', '杭州', '南京', '成都', '佛山', '南昌'].map((city) => {
              const isActive = jobCityFilter === city;
              const count = city === '全部' ? JOB_POSITIONS.length : JOB_POSITIONS.filter(j => j.city === city).length;

              return (
                <button
                  key={city}
                  onClick={() => setJobCityFilter(city)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#007BC7] text-white shadow-md shadow-blue-500/20'
                      : 'bg-white text-neutral-600 hover:bg-neutral-200/80 border border-neutral-200'
                  }`}
                >
                  <span>{city === '全部' ? '全部城市' : city}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-xs font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Accordion Jobs List */}
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => {
                const isExpanded = expandedJobId === job.id;
                return (
                  <div
                    key={job.id}
                    className={`bg-white rounded-[24px] border transition-all duration-300 overflow-hidden ${
                      isExpanded 
                        ? 'border-[#007BC7] shadow-lg ring-1 ring-blue-500/10' 
                        : 'border-neutral-200 hover:border-neutral-300 shadow-sm'
                    }`}
                  >
                    {/* Header Row */}
                    <button
                      onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none bg-white hover:bg-neutral-50/50 transition-colors"
                    >
                      <div className="flex flex-row items-center gap-3">
                        <span className="text-lg font-bold text-neutral-900 font-display">
                          {job.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-50 text-[#007BC7] px-2.5 py-0.5 rounded text-xs font-semibold font-mono">
                            {job.city}
                          </span>
                          <span className="bg-neutral-100 text-neutral-500 px-2.5 py-0.5 rounded text-xs font-mono">
                            {job.department}
                          </span>
                          <span className="text-xs text-neutral-400 font-mono inline-block">
                            {job.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-semibold text-[#007BC7] inline-block">
                          {isExpanded ? '收起详情' : '了解更多'}
                        </span>
                        <div className={`w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-blue-50 text-[#007BC7]' : 'text-neutral-500'}`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </button>

                    {/* Accordion Smooth Expanded Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="p-6 pt-2 border-t border-neutral-100 bg-neutral-50/40 space-y-6 text-sm text-neutral-700">
                            
                            {/* Responsibilities */}
                            <div>
                              <h4 className="font-bold text-neutral-900 mb-2 font-display flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-[#007BC7]" />
                                岗位职责：
                              </h4>
                              <ul className="list-disc list-inside space-y-1.5 text-neutral-600 pl-1 leading-relaxed">
                                {job.responsibilities.map((r, i) => (
                                  <li key={i}>{r}</li>
                                ))}
                              </ul>
                            </div>

                            {/* Requirements */}
                            <div>
                              <h4 className="font-bold text-neutral-900 mb-2 font-display flex items-center gap-2">
                                <Users className="w-4 h-4 text-[#007BC7]" />
                                任职资格：
                              </h4>
                              <ul className="list-disc list-inside space-y-1.5 text-neutral-600 pl-1 leading-relaxed">
                                {job.requirements.map((req, i) => (
                                  <li key={i}>{req}</li>
                                ))}
                              </ul>
                            </div>

                            {/* Application Info Footer Bar */}
                            <div className="pt-4 border-t border-neutral-200/60 flex flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-neutral-200">
                              <div>
                                <span className="text-xs text-neutral-400 font-mono block">简历及作品集投递至：</span>
                                <a href={`mailto:${job.email}?subject=应聘_${job.title}_${job.city}`} className="text-sm font-bold text-[#007BC7] font-mono hover:underline">
                                  {job.email}
                                </a>
                                <span className="text-[11px] text-neutral-400 ml-2">（邮件主题格式：姓名+应聘岗位+工作城市）</span>
                              </div>

                              <a
                                href={`mailto:${job.email}?subject=应聘_${job.title}_${job.city}`}
                                className="bg-[#007BC7] hover:bg-[#005F96] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
                              >
                                <Send className="w-3.5 h-3.5" />
                                投递此岗位
                              </a>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="py-16 bg-white rounded-2xl text-center border border-dashed border-neutral-200 text-neutral-400 text-sm">
                该城市暂无开放中的岗位
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Section 4 removed as requested */}
    </div>
  );
};

export default ContactUsPage;
