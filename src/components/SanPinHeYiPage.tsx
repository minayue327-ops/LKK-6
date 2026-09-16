import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Compass, Layers, Target, CheckCircle2, GraduationCap, Play, Pause, ChevronRight, ChevronLeft, FileText, Download, BookOpen, X } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollSectionTitle } from './ScrollSectionTitle';
import { ResearchReportsSection } from './ResearchReportsSection';
import { OnlineDiagnosisBanner } from './OnlineDiagnosisBanner';

// Visual Assets
import bookSanpinheyiImg from '../assets/images/book_sanpinheyi_1787619969143.jpg';
import bookDesignPowerImg from '../assets/images/book_design_power_1787619983428.jpg';
import bookWhitepaperMockupImg from '../assets/images/book_whitepaper_mockup_1787619995065.jpg';
import pillarStrategyImg from '../assets/images/pillar_strategy_diagram_1787620077990.jpg';
import pillarProductImg from '../assets/images/pillar_product_ux_1787620090549.jpg';
import pillarBrandImg from '../assets/images/pillar_brand_semiotics_1787620103763.jpg';
import caseSurgicalRobotImg from '../assets/images/case_surgical_robot_1787620051544.jpg';
import pillarCmfEngineeringImg from '../assets/images/pillar_cmf_engineering_1787620117012.jpg';
import methodologyVisualImg from '../assets/images/methodology_visual_diagram_1787620064287.jpg';

interface SanPinHeYiPageProps {
  onOpenContactModal: () => void;
  onNavigateDetail?: (url: string) => void;
  CounterComponent?: React.FC<{ target: number }>;
}

const DefaultCounter: React.FC<{ target: number }> = ({ target }) => {
  return <span>{target}</span>;
};

export default function SanPinHeYiPage({
  onOpenContactModal,
  onNavigateDetail,
  CounterComponent = DefaultCounter,
}: SanPinHeYiPageProps) {
  const [activeBookIndex, setActiveBookIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 课题报告精读弹窗状态
  const [activeReport, setActiveReport] = useState<{
    title: string;
    tag: string;
    pages: string;
    overview: string;
    keyPoints: string[];
    chapters: string[];
  } | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // 苹果风格并排卡片自适应尺寸与居中测量
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

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

  const publications = [
    {
      id: 'sanpinheyi',
      title: '《三品合一》',
      author: '贾伟 著',
      publisher: '中信出版集团',
      tag: '品类创新经典 · 畅销专著',
      headline: '从红海竞争走向品类冠军，掌握增长底层逻辑。',
      description: '系统解构中国企业从制造代工走向自主品牌、从产品功能走向心智认同的三位一体方法体系。经由 500+ 爆品与千亿市场实战检验。',
      highlights: [
        '品类战略导航与蓝海赛道锚定',
        'MOT 关键时刻体验与自传播设计',
        '超级品牌符号与心智认同构建'
      ],
      image: bookSanpinheyiImg,
      actionText: '获取精编导读',
    },
    {
      id: 'design-power',
      title: '《设计的力量》',
      author: '贾伟 著',
      publisher: '电子工业出版社',
      tag: '工业设计与商业力量 · 高校推荐教材',
      headline: '温润人心的设计，重塑商业力量。',
      description: '记录中国工业设计二十年崛起与探索之路，阐释设计如何从美学工具跃迁为推动商业增长与产业创新的核心动力。',
      highlights: [
        '从功能满足到情感共鸣的人机温度',
        '东方美学在现代制造业中的新生转化',
        '世界级设计创新思维与爆品实践'
      ],
      image: bookDesignPowerImg,
      actionText: '获取精编导读',
    },
    {
      id: 'whitepaper',
      title: '《爆款设计的底层逻辑》',
      author: '洛可可创新研究院 编著',
      publisher: '内部实战工具集',
      tag: '实战推演工具表单 · 深度解构',
      headline: '500+ 现象级爆品打造工具与推演表单。',
      description: '深度解构小仙炖、悦鲜活、思哲睿、库迪咖啡等现象级爆品打造全流程，提供可复制、开箱即用的落地方法论表单。',
      highlights: [
        '爆品机会点评估与赛道筛选矩阵',
        '用户旅程与 MOT 峰值体验卡片',
        'CMF 趋势核检表与量产管控标准'
      ],
      image: bookWhitepaperMockupImg,
      actionText: '申领实战工具包',
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveBookIndex((prev) => (prev + 1) % publications.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, publications.length]);
  return (
    <div className="w-full bg-[#FFFFFF] text-[#374151] font-sans antialiased">
      {/* ================= 1. 首屏 HERO 区域 (调整为「携手洛可可，开启您的『三品合一』创新之旅」) ================= */}
      <section id="sanpinheyi-hero" className="py-16 md:py-24 text-center bg-[#FFFFFF] relative overflow-hidden border-b border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-[5%] relative z-10 flex flex-col items-center">
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
            <span className="text-[12px] tracking-[0.3em] font-bold text-[#007BC7] font-mono uppercase">
              THREE-IN-ONE INNOVATION JOURNEY
            </span>
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-title text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#111827] leading-[1.15] font-display text-center"
          >
            <span className="block">携手洛可可</span>
            <span className="block mt-1 sm:mt-2">
              开启您的<span className="text-[#007BC7]">「三品合一」</span>创新之旅
            </span>
          </motion.h1>

          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-[#6B7280] uppercase mt-4 font-mono">
            LKK Consulting & Design Group
          </p>

          <p className="text-sm md:text-base text-[#4B5563] max-w-3xl mt-8 leading-[1.8] font-normal text-center text-balance">
            不论您处于开辟新品类、突破制造代工、还是寻求产品与品牌升级阶段，我们的资深品类专家与主笔设计团队随时为您提供全案诊断与咨询。
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <button 
              onClick={onOpenContactModal}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#007BC7] hover:bg-[#005F96] text-white text-sm sm:text-base font-medium transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer select-none"
              title="进入线上诊断"
            >
              <span>进入线上诊断</span>
              <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={onOpenContactModal}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-[#007BC7]/5 border border-[#007BC7] text-[#007BC7] text-sm sm:text-base font-medium transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-[0.98] cursor-pointer select-none"
              title="预约资深专家咨询"
            >
              <span>预约资深专家咨询</span>
              <ArrowRight className="w-4 h-4 text-[#007BC7] transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3D 架构动图框 (纯净框架，尺寸与研习页完全同等，无文字遮挡，预留后期动图) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-12 sm:mt-14 w-full rounded-[24px] overflow-hidden bg-[#F5F5F7] border border-black/5 shadow-[0_16px_48px_rgba(0,0,0,0.06)] group relative"
          >
            <div className="w-full aspect-[16/9] overflow-hidden bg-[#F5F5F7]">
              <video 
                src="https://github.com/minaxyue-ops/MINA/releases/download/1/2026-08-20.163819.mp4" 
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

      {/* ================= 2. QUANTIFIED ACHIEVEMENTS SECTION ================= */}
      <section className="achievement-section">
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12">
          <div className="achievement-grid">
            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={22} /><span className="achievement-unit-gray">年</span>
              </div>
              <div className="achievement-label">行业经验积淀</div>
            </div>

            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={600} /><span className="achievement-unit-blue">+</span>
              </div>
              <div className="achievement-label">专业奖项认证</div>
            </div>

            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={1000} /><span className="achievement-unit-gray">+</span>
              </div>
              <div className="achievement-label">行业头部客户认可</div>
            </div>

            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={10000} /><span className="achievement-unit-blue">+</span>
              </div>
              <div className="achievement-label">产品成功落地</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. METHODOLOGY THREE PILLARS (三品合一核心内涵) ================= */}
      <section className="py-16 md:py-24 border-t border-[#E5E5E5] bg-white text-[#111827]">
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12">
          
          {/* Section Header */}
          <ScrollSectionTitle 
            badge="THREE PILLARS · 三大战略支柱"
            title="三品协同：突破企业单点增长天花板"
            subtitle="传统设计往往割裂战略、外观与品牌营销。“三品合一”将商业判断、硬件体验与用户心智融为一体，形成相互支撑的高爆发增长飞轮。"
            align="between"
          />

          {/* 3 Pillars Grid (Apple Official Style with Condensed Copy) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                number: '01',
                badge: 'PILLAR 01 · 战略导航',
                title: '品类战略',
                tagline: '回答「做什么」',
                desc: '锁定高价值细分赛道，明确差异化商业定位与产品路线。',
                tags: ['赛道机会', '差异定位', '路线规划'],
                image: pillarStrategyImg,
                url: '/three-in-one-category',
                actionText: '探索品类战略',
                icon: Compass,
              },
              {
                number: '02',
                badge: 'PILLAR 02 · 体验底座',
                title: '产品创新',
                tagline: '回答「如何被体验」',
                desc: '设计牵引工程与供应链，将创新概念转化为高品质量产爆品。',
                tags: ['工业美学', '结构工程', '量产协同'],
                image: pillarProductImg,
                url: '/product-innovation-consulting',
                actionText: '探索产品创新',
                icon: Layers,
              },
              {
                number: '03',
                badge: 'PILLAR 03 · 心智认同',
                title: '品牌创新',
                tagline: '回答「如何被选择」',
                desc: '打造超级记忆符号与爆款包装，建立强烈辨识度与品牌溢价。',
                tags: ['超级符号', '爆款包装', '资产沉淀'],
                image: pillarBrandImg,
                url: '/brand-innovation-consulting',
                actionText: '探索品牌创新',
                icon: Target,
              },
            ].map((pillar) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="bg-[#F5F5F7] rounded-[24px] p-7 sm:p-8 lg:p-9 border border-black/[0.05] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 group relative overflow-hidden"
                >
                  {/* Top Text & Narrative Hierarchy */}
                  <div>
                    {/* Eyebrow & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-[#6B7280] tracking-wider uppercase">
                        {pillar.badge}
                      </span>
                      <PillarIcon className="w-4 h-4 text-[#6B7280]" />
                    </div>

                    {/* Headline */}
                    <h4 className="text-2xl font-bold text-[#111827] tracking-tight font-display">
                      {pillar.title}
                    </h4>

                    {/* Streamlined Description (Merged with Core Proposition) */}
                    <p className="text-sm text-[#4B5563] leading-relaxed mt-2.5">
                      {pillar.tagline}：{pillar.desc}
                    </p>

                    {/* Apple Style Capsule Tags (Single Row) */}
                    <div className="flex items-center gap-1.5 sm:gap-2 mt-4 overflow-hidden">
                      {pillar.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-white text-[#6B7280] text-xs font-medium px-2.5 sm:px-3 py-1 rounded-full border border-black/[0.06] shadow-2xs whitespace-nowrap shrink-0"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Visual Image Showcase & Action Link */}
                  <div className="mt-7">
                    {/* Card Media Preview */}
                    <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-white border border-black/[0.05] relative shadow-xs">
                      <img
                        src={pillar.image}
                        alt={`${pillar.title} 视觉展示`}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-5 pt-3.5 border-t border-black/[0.05] flex items-center justify-between">
                      <span className="text-xs font-medium text-[#6B7280]">
                        0{pillar.number} / 03
                      </span>
                      <button
                        onClick={() => {
                          if (onNavigateDetail) {
                            onNavigateDetail(pillar.url);
                          } else {
                            onOpenContactModal();
                          }
                        }}
                        className="text-xs font-medium text-[#0071E3] hover:underline inline-flex items-center gap-1 group/btn cursor-pointer transition-colors"
                      >
                        <span>{pillar.actionText}</span>
                        <ChevronRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 全案诊断入口卡片 (统一线上诊断卡片) */}
          <OnlineDiagnosisBanner
            className="mt-8 sm:mt-10 md:mt-12"
            title="不知从哪一品切入？先做一次全案诊断"
            description="洛可可提供基于“三品合一”视角的企业商业痛点诊断，由品类战略、产品体验与品牌设计专家联合把脉。"
            onAction={onOpenContactModal}
          />
        </div>
      </section>

      {/* ================= 5. 前瞻课题与行业深度报告 ================= */}
      <ResearchReportsSection 
        onOpenContactModal={onOpenContactModal} 
        onNavigate={onNavigateDetail} 
      />

      {/* ================= 6. 权威专著研读 (Apple 并排露边横向画廊) ================= */}
      <section id="publications" className="py-20 md:py-28 bg-[#FFFFFF] border-t border-[#E5E5E5] overflow-hidden">
        <div className="w-full mx-auto">
          
          <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12">
            <ScrollSectionTitle 
              badge="Publications"
              title="权威专著研读"
              subtitle="洛可可创始人贾伟及创新团队二十年方法论沉淀，被清华大学、长江商学院等收录推荐。"
              align="between"
            />
          </div>

          {/* 苹果并排画廊容器 (Horizontal Side-by-Side Peeking Track) */}
          {(() => {
            const isMobile = containerWidth < 640;
            const isTablet = containerWidth >= 640 && containerWidth < 1024;
            // 保持原本卡片宽广舒展的经典比例（在桌面端可达 1120px，同时自然露出左右卡片边沿）
            const cardWidth = isMobile 
              ? Math.max(containerWidth * 0.88, 280) 
              : isTablet 
                ? containerWidth * 0.84 
                : Math.min(containerWidth * 0.82, 1120);
            const cardGap = isMobile ? 16 : 28;
            const trackTranslateX = (containerWidth - cardWidth) / 2 - activeBookIndex * (cardWidth + cardGap);

            return (
              <div 
                ref={carouselContainerRef} 
                className="w-full relative overflow-hidden py-2 select-none"
              >
                <motion.div 
                  className="flex items-stretch"
                  style={{ gap: `${cardGap}px` }}
                  animate={{ x: trackTranslateX }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  {publications.map((book, idx) => (
                    <div 
                      key={book.id} 
                      onClick={() => setActiveBookIndex(idx)}
                      style={{ width: `${cardWidth}px` }}
                      className="shrink-0 flex-none cursor-pointer"
                    >
                      <div className="bg-[#FFFFFF] rounded-[24px] border border-black/5 shadow-[0_12px_44px_rgba(0,0,0,0.06)] min-h-[400px] sm:min-h-[420px] h-full flex flex-col md:flex-row items-center p-8 sm:p-12 md:p-14 gap-8 md:gap-12">
                        
                        {/* 左侧：文字排版 */}
                        <div className="w-full md:w-7/12 flex flex-col items-start text-left">
                          {/* 样式 3：辅助元信息（标签、出版社、作者） */}
                          <div className="flex items-center gap-2 mb-3 text-xs font-medium text-neutral-400">
                            <span>{book.tag}</span>
                            <span className="text-neutral-300">·</span>
                            <span>{book.publisher}</span>
                            <span className="text-neutral-300">·</span>
                            <span>{book.author}</span>
                          </div>

                          {/* 样式 1：主标题 */}
                          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-4">
                            {book.title}
                          </h3>

                          {/* 样式 2：正文描述与要点（统一 text-sm text-neutral-500） */}
                          <p className="text-sm font-normal text-neutral-500 leading-relaxed mb-6 max-w-xl">
                            {book.headline} {book.description}
                          </p>

                          <div className="space-y-2.5 mb-7 text-sm font-normal text-neutral-500">
                            {book.highlights.map((item, i) => (
                              <div key={i} className="flex items-center gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>

                          {/* 样式 3：操作按钮（text-xs font-medium 反白） */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenContactModal();
                            }}
                            className="bg-[#007BC7] hover:bg-[#005F96] active:scale-95 text-white px-6 py-2.5 rounded-full text-xs font-medium transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                          >
                            <span>{book.actionText}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* 右侧：实体照片展示 */}
                        <div className="w-full md:w-5/12 flex items-center justify-center py-4">
                          <div className="relative flex items-center justify-center max-w-[280px] sm:max-w-[330px] md:max-w-[370px]">
                            <img 
                              src={book.image} 
                              alt={book.title}
                              className="w-full h-auto max-h-[380px] object-contain transition-transform duration-500 hover:scale-[1.03] select-none pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.1)]"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            );
          })()}

          {/* 底部控制器：播放/暂停 + 胶囊指示条 */}
          <div className="mt-8 flex items-center justify-center gap-3">
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
              {publications.map((book, idx) => (
                <button
                  key={book.id}
                  onClick={() => setActiveBookIndex(idx)}
                  aria-label={`切换至 ${book.title}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeBookIndex === idx 
                      ? 'w-7 h-1.5 bg-[#007BC7]' 
                      : 'w-1.5 h-1.5 bg-[#86868B]/40 hover:bg-[#86868B]'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 苹果风格报告精读弹窗 (Apple Executive Summary Modal) */}
      {activeReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-[24px] p-6 sm:p-8 shadow-2xl border border-black/5 max-h-[85vh] overflow-y-auto text-left">
            
            {/* 关闭按钮 */}
            <button
              onClick={() => setActiveReport(null)}
              aria-label="关闭报告"
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#111827] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* 弹窗头部 */}
            <div className="pr-8 mb-5">
              <span className="text-xs font-mono font-semibold text-[#007BC7] block mb-1.5">
                {activeReport.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                {activeReport.title}
              </h3>
              <p className="text-xs text-[#6B7280] font-mono mt-1">
                {activeReport.pages}
              </p>
            </div>

            {/* 报告摘要 */}
            <div className="mb-5 pb-5 border-b border-black/5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#6B7280] mb-2 font-semibold">
                报告摘要
              </h4>
              <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                {activeReport.overview}
              </p>
            </div>

            {/* 核心发现 */}
            <div className="mb-5 pb-5 border-b border-black/5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#6B7280] mb-2.5 font-semibold">
                核心发现
              </h4>
              <ul className="space-y-2">
                {activeReport.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#374151]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007BC7] shrink-0 mt-1.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 章节目录 */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#6B7280] mb-2.5 font-semibold">
                章节目录
              </h4>
              <div className="space-y-1.5 bg-[#F5F5F7] p-3.5 rounded-xl">
                {activeReport.chapters.map((ch, i) => (
                  <div key={i} className="text-xs text-[#374151]">
                    {ch}
                  </div>
                ))}
              </div>
            </div>

            {/* 弹窗底部操作 */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-black/5">
              <span className="text-xs text-[#6B7280]">
                需获取高清完整PDF版？
              </span>
              <button
                onClick={() => {
                  setActiveReport(null);
                  onOpenContactModal();
                }}
                className="px-5 py-2 rounded-full bg-[#007BC7] hover:bg-[#005F96] text-white text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer"
              >
                立即申请完整白皮书
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
