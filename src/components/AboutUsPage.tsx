import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ArrowRight, Building2, Trophy, ShieldCheck, Users, Milestone, Image, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollSectionTitle } from './ScrollSectionTitle';

interface AboutUsPageProps {
  onOpenContactModal: () => void;
}

// Individual Team Member Flip Card Component
const TeamMemberCard: React.FC<{ name: string; title: string }> = ({ name, title }) => {
  const [rotation, setRotation] = useState(0);
  const isTouchRef = useRef(false);

  const handleMouseEnter = () => {
    if (isTouchRef.current) return;
    setRotation(prev => prev + 180);
  };

  const handleMouseLeave = () => {
    if (isTouchRef.current) return;
    setRotation(prev => prev + 180);
  };

  const handleClick = () => {
    if (isTouchRef.current) {
      setRotation(prev => prev + 180);
    }
  };

  const handleTouchStart = () => {
    isTouchRef.current = true;
  };

  return (
    <div 
      className="team-card-flip w-full cursor-pointer select-none"
      style={{ perspective: '1200px', aspectRatio: '3 / 4', borderRadius: '8px' }}
      onTouchStart={handleTouchStart}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div 
        className="team-card-inner relative w-full h-full transition-transform duration-[800ms]"
        style={{ 
          transformStyle: 'preserve-3d', 
          transform: `rotateY(${rotation}deg)`,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Front Face: ONLY Photo / Placeholder */}
        <div 
          className="team-card-front absolute inset-0 bg-[#F5F5F5] rounded-[24px] overflow-hidden flex flex-col items-center justify-center text-neutral-400 p-4 border border-neutral-200/50"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <Users className="w-12 h-12 mb-3 text-neutral-400/70" />
          <span className="text-xs font-medium text-neutral-500 text-center font-mono">
            [待替换：{name}职业照]
          </span>
        </div>

        {/* Back Face: Name + Title */}
        <div 
          className="team-card-back absolute inset-0 bg-[#007BC7] text-white rounded-[24px] overflow-hidden flex flex-col items-center justify-center text-center p-6 shadow-lg"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <h4 className="team-back-name text-[20px] font-bold mb-2 leading-snug">
            {name}
          </h4>
          <p className="team-back-title text-[14px] opacity-85 leading-[1.5] text-balance">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

// Qualifications Continuous Auto-Play Carousel Component
interface QualItem {
  title: string;
  code?: string;
  org?: string;
}

const qualificationItems = [
  { title: '高新技术企业证书', subtitle: '北京市科学技术委员会认定', desc: '国家级高新技术企业认证，彰显硬核技术创新与研发实力。' },
  { title: '国家级工业设计中心', subtitle: '工信部权威认定', desc: '工业和信息化部认定的国家级工业设计示范与创新中心。' },
  { title: '北京高精尖产业设计中心', subtitle: '北京市经信局认定', desc: '聚焦高精尖产业高品质设计，赋能产业升级与数字转型。' },
  { title: '中国工业设计十佳服务机构', subtitle: '中国工业设计协会', desc: '获评中国工业设计十佳创新服务机构，领跑工业设计赛道。' },
  { title: '成都市工业设计中心', subtitle: '成都市经信局认定', desc: '西南创新枢纽，驱动区域设计产业联动与高能级创新。' },
  { title: '江苏省认定工业设计中心', subtitle: '江苏省工信厅认定', desc: '华东区域工业设计标杆，助力制造企业向品牌与设计升级。' }
];

const QualificationsCarousel: React.FC = () => {
  const [activeOffset, setActiveOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const items = qualificationItems;

  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);

  // Min distance to count as swipe gesture (in px)
  const minSwipeDistance = 35;

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    if (touchStartRef.current === null || touchEndRef.current === null) return;
    const distance = touchStartRef.current - touchEndRef.current;
    if (distance > minSwipeDistance) {
      // Swiped left -> next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev
      handlePrev();
    }
    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  // Auto-play timer (every 3 seconds when not hovered/touched)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveOffset(prev => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = () => {
    setActiveOffset(prev => prev - 1);
  };

  const handleNext = () => {
    setActiveOffset(prev => prev + 1);
  };

  // Repeated repetitions array for seamless continuous looping
  const totalReps = 30;
  const getDisplayItem = (rawIdx: number) => {
    const len = items.length;
    return items[((rawIdx % len) + len) % len];
  };

  return (
    <section id="qualifications">
      {/* Header controls */}
      <ScrollSectionTitle
        badge="CERTIFICATIONS & ACCREDITATIONS"
        title="荣誉资质"
        subtitle="洛可可获得的国家级认证资质与行业权威机构授予的荣誉表彰。"
        align="between"
        rightElement={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="向前翻阅资质"
              className="w-9 h-9 rounded-full border border-[#E5E5E5] bg-white text-[#8C8C8C] flex items-center justify-center cursor-pointer transition-colors duration-300 hover:text-[#007BC7] hover:border-[#007BC7] active:scale-95 shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="向后翻阅资质"
              className="w-9 h-9 rounded-full border border-[#E5E5E5] bg-white text-[#8C8C8C] flex items-center justify-center cursor-pointer transition-colors duration-300 hover:text-[#007BC7] hover:border-[#007BC7] active:scale-95 shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        }
      />

      {/* Infinite Carousel Window */}
      <div 
        className="w-full overflow-hidden py-2 -mx-1 px-1 touch-pan-y [--step-size:300px] sm:[--step-size:340px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex items-stretch gap-5 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(calc(-1 * ${(activeOffset + totalReps * items.length / 2)} * var(--step-size)))`
          }}
        >
          {Array.from({ length: totalReps * items.length }).map((_, globalIdx) => {
            const item = getDisplayItem(globalIdx);
            return (
              <div 
                key={globalIdx}
                className="shrink-0 w-[280px] sm:w-[320px] bg-white rounded-[24px] p-4 border border-neutral-200/80 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all duration-300 group select-none"
              >
                {/* 1. TOP IMAGE AREA */}
                <div className="w-full aspect-[4/3] rounded-[16px] bg-[#FAF8F5] border border-neutral-200/70 p-3 flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-[#F5F2EC] transition-colors">
                  <div className="absolute inset-2 border border-[#D4AF37]/30 rounded-lg pointer-events-none" />
                  <Image className="w-8 h-8 mb-2 text-neutral-400 stroke-[1.5] group-hover:scale-105 transition-transform duration-300" />
                  <span className="text-xs font-semibold text-neutral-600 font-mono">
                    [证书照片]
                  </span>
                  <span className="text-[10px] text-neutral-400 mt-0.5 max-w-[80%] truncate">
                    {item.title}
                  </span>
                </div>

                {/* 2. BOTTOM TEXT AREA */}
                <div className="mt-3.5 px-0.5">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#007BC7] shrink-0" />
                    <h3 className="text-base font-bold text-neutral-900 truncate">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#007BC7] font-mono mb-1 font-medium">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onOpenContactModal }) => {
// Core Team Members (15 members)
  const teamMembers = [
    { name: '贾伟', title: 'LKK洛可可创新设计集团董事长·创始人、艺术家' },
    { name: '李湘驰', title: 'LKK洛可可创新设计集团总裁' },
    { name: '孙昱泽', title: 'LKK洛可可创新设计集团合伙人 / 研发与供应链事业部总经理' },
    { name: '黄艺姝', title: 'LKK洛可可创新设计集团合伙人 / 品牌创新事业部总经理' },
    { name: '陈兵', title: 'LKK洛可可创新设计集团合伙人 / 副总裁' },
    { name: '冯旭', title: 'LKK洛可可创新设计集团副总裁 / 工业设计事业群总经理' },
    { name: '李凡聪', title: 'LKK洛可可创新设计集团副总裁 / 深圳洛可可总经理' },
    { name: '洪源', title: 'LKK洛可可创新设计集团副总裁 / 上海洛可可总经理' },
    { name: '张健辉', title: '深圳洛可可创新设计集团副总经理' },
    { name: '杜振雷', title: '北京洛可可创新设计集团总经理' },
    { name: '詹礼峰', title: 'LKK洛可可创新设计集团合伙人 / 成都洛可可总经理' },
    { name: '常可', title: '苏州洛可可创新设计集团总经理' },
    { name: '林子健', title: '杭州洛可可创新设计集团总经理' },
    { name: '冯嫽', title: '南京洛可可创新设计集团总经理' },
    { name: '王箫', title: '武汉洛可可创新设计集团总经理' }
  ];

  // History Milestones (2004 - 2025)
  const historyMilestones = [
    { year: '2025', event: '洛可可品类增长研究院成立，聚焦AI+爆品创新全案咨询服务。' },
    { year: '2024', event: '洛可可20周年，发布AI设计大模型与AIGC智能设计平台。' },
    { year: '2023', event: '布局水滴爆品设计方法论，赋能医疗装备与智能机器人创新。' },
    { year: '2022', event: '深耕“咨询+设计”双轮驱动模式，服务新能源与AIOT高精尖行业。' },
    { year: '2021', event: '推进三品合一（品类咨询+产品创新+品牌创新）全案服务。' },
    { year: '2020', event: '助力抗疫医疗设备紧急研发，获国家工业和信息化部表彰。' },
    { year: '2019', event: '洛客共享设计平台全面升级，构建数智化创新赋能生态。' },
    { year: '2018', event: '荣获红点、iF等国际设计大奖突破400项，推进全球化设计创新。' },
    { year: '2017', event: '打造天宫二号空间实验室内部环境体验及多项国家重器项目。' },
    { year: '2016', event: '成立洛客(LKKER)共享设计平台，开启共享设计新纪元。' },
    { year: '2015', event: '爆款55度杯荣获红星奖并掀起全国温控杯品类创新热潮。' },
    { year: '2014', event: '洛可可创立10周年，全面布局互联网硬件与智能穿戴创新。' },
    { year: '2013', event: '获国家认定“国家级工业设计中心”殊荣。' },
    { year: '2012', event: '拓展伦敦国际分公司，搭建中英设计创新桥梁。' },
    { year: '2011', event: '成立上海、深圳分公司，布局全国核心创新集群。' },
    { year: '2010', event: '参与上海世博会多项展馆工业设计与品牌体验打造。' },
    { year: '2009', event: '斩获德国iF国际设计大奖，开启国际奖项大满贯征程。' },
    { year: '2008', event: '获德国红点奖（Red Dot Award），跻身国际顶尖设计机构行列。' },
    { year: '2007', event: '成立品牌设计与UI交互设计事业部，开启多学科交叉设计。' },
    { year: '2006', event: '斩获中国创新设计红星奖，确立国内工业设计领先地位。' },
    { year: '2005', event: '服务医疗装备与消费电子客户，建立规范化产品开发流程。' },
    { year: '2004', event: '贾伟先生于北京创立LKK洛可可工业设计公司。' }
  ];

  const years = useMemo(() => historyMilestones.map(m => m.year), []);
  const [activeYear, setActiveYear] = useState('2025');
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabsRowRef = useRef<HTMLDivElement>(null);

  // Arrow navigation scroll states
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Dynamic progress line states (in pixels)
  const [bgLineWidth, setBgLineWidth] = useState<number>(0);
  const [activeLineWidth, setActiveLineWidth] = useState<number>(0);

  // Synchronize background track line width to the total scrollWidth of the tabs row
  const syncLineBgWidth = useCallback(() => {
    if (tabsRowRef.current) {
      setBgLineWidth(tabsRowRef.current.scrollWidth);
    }
  }, []);

  // Update arrow disabled state based on scroll position
  const updateArrowState = useCallback(() => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  }, []);

  // Scroll handlers
  const handleScrollPrev = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleScrollNext = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Unified function to calculate and update timeline active line by exact pixel position
  const updateTimelineLine = useCallback((selectedYear: string) => {
    if (tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      const activeTab = container.querySelector<HTMLElement>(`[data-year="${selectedYear}"]`);
      if (activeTab) {
        // 色线长度 = 该年份标签左边缘位置 + 自身宽度，按真实像素计算
        const lineLength = activeTab.offsetLeft + activeTab.offsetWidth;
        setActiveLineWidth(lineLength);
      }
    }
  }, []);

  // Immediately synchronize line position and scroll arrows on mount/change
  useEffect(() => {
    syncLineBgWidth();
    updateTimelineLine(activeYear);
    updateArrowState();

    const container = tabsContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateArrowState, { passive: true });
    }

    const handleResize = () => {
      syncLineBgWidth();
      updateTimelineLine(activeYear);
      updateArrowState();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (container) {
        container.removeEventListener('scroll', updateArrowState);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [activeYear, updateTimelineLine, updateArrowState, syncLineBgWidth]);

  // Awards Quantified Data
  const awardItems = [
    { number: '37', unit: '项', title: '美国IDEA优秀奖', desc: '美国工业设计优秀奖（International Design Excellence Awards）', logoText: 'IDEA' },
    { number: '68', unit: '项', title: '德国iF国际设计奖', desc: '德国iF设计奖（iF Design Award）全球顶尖工业设计大奖', logoText: 'iF' },
    { number: '83', unit: '项', title: '德国红点设计奖', desc: '德国红点设计奖（Red Dot Design Award）国际公认的卓越设计标志', logoText: 'Red Dot' },
    { number: '83', unit: '项', title: '中国创新设计红星奖', desc: '中国工业设计顶尖奖项，彰显中国制造与创新实力', logoText: 'Red Star' },
    { number: '33', unit: '项', title: '当代好设计奖', desc: '红点奖机构主办的大型国际设计奖项', logoText: 'CGD' },
    { number: '46', unit: '项', title: '金点设计奖', desc: '全球华人市场最顶尖的设计奖项之一', logoText: 'Golden Pin' }
  ];

  // Honors & Qualifications
  const qualificationItems = [
    { title: '高新企业证书' },
    { title: '工业设计中心' },
    { title: '北京高精尖产业设计中心' },
    { title: '中国工业设计十佳设计服务机构' },
    { title: '成都市工业设计中心' },
    { title: '江苏省认定工业设计中心' }
  ];

  return (
    <div className="bg-white min-h-screen text-[#374151]">
      {/* 1. HERO / FIRST SCREEN SECTION (Replicated styling from Product/Brand Innovation Page) */}
      <section 
        id="about-hero" 
        className="py-16 md:py-24 text-center bg-white relative overflow-hidden border-b border-neutral-100"
      >
        <div className="max-w-4xl mx-auto px-[5%] relative z-10 flex flex-col items-center">
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
            <span className="text-[12px] tracking-[0.3em] font-bold text-[#007BC7] font-mono">ABOUT LKK · 关于洛可可</span>
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-title text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#111827] leading-[1.05] font-display"
          >
            <span className="text-[#007BC7]">关于洛可可</span>
            <span className="text-[#111827]"> · </span>
            <span className="text-[#111827]">创造好产品</span>
          </motion.h1>

          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-[#6B7280] uppercase mt-4 font-mono">
            LKK Innovation Design Group
          </p>

          <div className="text-sm md:text-base text-[#4B5563] max-w-3xl mt-8 leading-[1.8] font-normal text-center text-balance space-y-4">
            <p>
              洛可可创新设计集团创立于2004年，总部位于北京，分布于深圳、上海、南京、成都、苏州、杭州、南昌、佛山等多个城市。
            </p>
            <p>
              成立22年来，洛可可累计斩获红点、iF、红星等国内外设计大奖项600余项；服务世界500强企业200余家、中国500强企业300余家；业务深入工业装备、智能AIOT、连锁零售、食品酒饮、医疗健康、文化创意、新能源、家居日百等领域；累计上市项目总量50000余项。
            </p>
            <p>
              LKK洛可可由一家工业设计公司逐步发展为以"创造好产品"为核心价值的咨询设计集团，致力于为垂直行业客户，提供品类创新的咨询设计全案服务。
            </p>
          </div>

          <div className="mt-8">
            <button 
              onClick={onOpenContactModal}
              className="bg-[#007BC7] hover:bg-[#005F96] text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer border-none"
            >
              联系我们
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>
      </section>

      {/* PAGE CONTAINER FOR REMAINING SECTIONS */}
      <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12 space-y-20 py-16 md:py-24">

        {/* 2. DEVELOPMENT HISTORY SECTION */}
        <section id="history">
          <ScrollSectionTitle 
            badge="MILESTONES & HISTORY"
            title="发展历史"
            subtitle="从2004到2025，二十一年坚守与创新，见证洛可可创造好产品的每一个里程碑。"
            align="between"
          />

          {/* Timeline Nav Container with Left/Right Scroll Arrows */}
          <div className="timeline-nav flex items-center gap-3 w-full my-2">
            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={handleScrollPrev}
              disabled={!canScrollLeft}
              aria-label="向前查看更多年份"
              className="timeline-arrow timeline-arrow-prev shrink-0 w-[36px] h-[36px] rounded-full border border-[#E5E5E5] bg-white text-[#8C8C8C] flex items-center justify-center cursor-pointer transition-colors duration-300 hover:text-[#007BC7] hover:border-[#007BC7] disabled:text-[#E5E5E5] disabled:border-[#E5E5E5] disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scrollable Container containing Background Line, Active Line, and Tabs Row */}
            <div 
              ref={tabsContainerRef}
              id="timelineYears"
              className="timeline-years relative flex-1 min-w-0 overflow-x-auto py-2 scrollbar-none no-scrollbar scroll-smooth"
            >
              {/* Track Line Background (Width = total scrollWidth of tabs row) */}
              <div 
                className="timeline-line-bg absolute top-2 left-0 h-[3px] bg-[#E5E5E5] rounded-[2px] pointer-events-none"
                style={{ width: bgLineWidth ? `${bgLineWidth}px` : '100%' }}
              />
              {/* Dynamic Active Progress Line (Width = exact pixel position) */}
              <div 
                id="timelineActive"
                className="timeline-line-active absolute top-2 left-0 h-[3px] bg-[#007BC7] rounded-[2px] transition-[width] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] pointer-events-none" 
                style={{ width: `${activeLineWidth}px` }} 
              />

              <div 
                ref={tabsRowRef}
                className="timeline-tabs-row flex items-center gap-3 pt-4 pb-3 w-max"
              >
                {historyMilestones.map((item) => {
                  const isActive = activeYear === item.year;
                  return (
                    <button
                      key={item.year}
                      data-year={item.year}
                      onClick={() => {
                        setActiveYear(item.year);
                        updateTimelineLine(item.year);
                      }}
                      className={`year-tab px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 shrink-0 cursor-pointer border-none ${
                        isActive
                          ? 'active bg-[#007BC7] text-white shadow-md'
                          : 'bg-[#F0F0F0] text-[#4D4D4D] hover:bg-neutral-200'
                      }`}
                    >
                      {item.year}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Arrow Button */}
            <button
              type="button"
              onClick={handleScrollNext}
              disabled={!canScrollRight}
              aria-label="向后查看更多年份"
              className="timeline-arrow timeline-arrow-next shrink-0 w-[36px] h-[36px] rounded-full border border-[#E5E5E5] bg-white text-[#8C8C8C] flex items-center justify-center cursor-pointer transition-colors duration-300 hover:text-[#007BC7] hover:border-[#007BC7] disabled:text-[#E5E5E5] disabled:border-[#E5E5E5] disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Content Box with Year Photo + Milestone Text */}
          <div className="history-content min-h-[300px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="year-detail bg-[#F0F0F0] rounded-3xl p-6 md:p-10 mt-6 border border-neutral-200/50 flex flex-col"
              >
                {/* 对应年份配图 */}
                <div className="year-photo w-full aspect-[16/9] max-h-[360px] rounded-2xl bg-[#F5F5F5] border border-neutral-200/60 mb-6 flex flex-col items-center justify-center text-neutral-400 p-6 overflow-hidden">
                  <Image className="w-10 h-10 mb-2 text-neutral-400/80 stroke-[1.5]" />
                  <span className="text-xs font-semibold text-neutral-500 tracking-wide font-mono">
                    [待替换：{activeYear}年发展历程配图]
                  </span>
                </div>

                {/* 年份及里程碑描述 */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <div className="text-4xl md:text-6xl font-black font-mono text-[#007BC7] shrink-0 font-display">
                    {activeYear}
                  </div>
                  <div className="h-10 w-px bg-neutral-300 hidden md:block shrink-0" />
                  <div className="year-text text-base md:text-lg text-[#111827] font-medium leading-relaxed">
                    {historyMilestones.find((m) => m.year === activeYear)?.event}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* 3. COMPANY ENVIRONMENT SECTION */}
        <section id="environment">
          <ScrollSectionTitle 
            badge="WORKSPACE & ENVIRONMENT"
            title="公司环境"
            subtitle="开放、包容、充满创造力的办公生态，激发源源不断的创新灵感。"
            align="between"
          />

          {/* Single Image Banner with Strict 16:9 Aspect Ratio */}
          <div className="w-full aspect-[16/9] rounded-[24px] bg-[#F5F5F5] border border-neutral-200/60 flex flex-col items-center justify-center text-neutral-400 p-6 overflow-hidden">
            <Image className="w-12 h-12 mb-3 text-neutral-400/80 stroke-[1.5]" />
            <span className="text-sm font-semibold text-neutral-600 font-mono">
              [待替换：公司环境形象大图]
            </span>
            <span className="text-xs text-neutral-400 mt-1">开放、包容、充满创造力的办公生态</span>
          </div>
        </section>

        {/* 4. CORPORATE CULTURE SECTION */}
        <section id="culture">
          <ScrollSectionTitle 
            badge="MISSION & VALUES"
            title="企业文化"
            subtitle="洛可可咨询设计以“成就客户”为核心使命，构建起以创新为本、共创共享、品质至上为三大支柱的价值观殿堂。"
            align="between"
          />

          <div className="culture-section-inner flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-[5%]">
            {/* Left Text Block (40%) */}
            <div className="culture-text w-full lg:w-[40%] shrink-0 flex flex-col justify-center">
              <p className="text-[15px] text-[#4B5563] leading-[1.8] mb-3">
                以“成就客户”为核心使命
              </p>
              <p className="text-[15px] text-[#4B5563] leading-[1.8] mb-4">
                洛可可咨询设计以“成就客户”为核心使命，构建起以创新为本、共创共享、品质至上为三大支柱，简单、自律、敬业、激情为行为基石的价值观殿堂。我们以专业设计力量践行文化理念，坚守品质、开放协作，持续为客户创造商业价值，成为值得信赖的创新伙伴。
              </p>
              <div className="text-[15px] text-[#4B5563] leading-[1.8] space-y-1 mb-6">
                <p>三大支柱：创新为本 · 共创共享 · 品质至上</p>
                <p>行为基石：简单 · 自律 · 敬业 · 激情</p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={onOpenContactModal}
                  className="culture-text-link inline-flex items-center gap-1.5 text-[#007BC7] hover:text-[#005F96] font-semibold text-sm transition-colors group cursor-pointer"
                >
                  <span>了解详情</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Image Block (55%) */}
            <div className="culture-image w-full lg:w-[55%] rounded-[24px] overflow-hidden shrink-0">
              <div className="w-full aspect-[16/10] bg-[#F5F5F5] border border-neutral-200/60 rounded-[24px] flex flex-col items-center justify-center text-neutral-400 p-6">
                <Image className="w-12 h-12 mb-3 text-neutral-400/80 stroke-[1.5]" />
                <span className="text-sm font-semibold text-neutral-600 font-mono">
                  [待替换：企业文化形象图]
                </span>
                <span className="text-xs text-neutral-400 mt-1">
                  成就客户 · 创新为本 · 共创共享 · 品质至上
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. INNOVATION COMPANY — AWARD DATA SECTION */}
        <section id="awards">
          <ScrollSectionTitle 
            badge="AWARD-WINNING DESIGN"
            title="创新公司"
            subtitle="国际顶尖设计大奖满贯得主，用实力与荣誉定义好产品的标准。"
            align="between"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awardItems.map((award, idx) => (
              <div 
                key={idx}
                className="award-card relative bg-[#F0F0F0] rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-neutral-200/50 transition-all hover:shadow-md overflow-hidden group select-none"
              >
                {/* Award Logo Badge in top-right with scale & opacity hover transition */}
                <div className="award-logo-badge absolute top-4 right-4 w-12 h-12 rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center p-1.5 opacity-0 scale-[0.6] group-hover:opacity-100 group-hover:scale-100 transition-all duration-[280ms] ease-out pointer-events-none">
                  <div className="w-full h-full bg-[#E5E5E5] rounded-lg flex items-center justify-center text-xs font-black tracking-tight text-neutral-800 font-mono text-center leading-tight p-0.5 uppercase">
                    {award.logoText}
                  </div>
                </div>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl md:text-5xl font-black text-[#007BC7] font-mono tracking-tight font-display">
                    {award.number}
                  </span>
                  <span className="text-sm font-bold text-[#007BC7] font-mono">
                    {award.unit}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1A1A1A] mb-2">
                    {award.title}
                  </h3>
                  <p className="text-sm text-[#4D4D4D] leading-relaxed">
                    {award.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. HONORS & QUALIFICATIONS SECTION */}
        <QualificationsCarousel />

        {/* 7. CORE TEAM SECTION */}
        <section id="core-team">
          <ScrollSectionTitle 
            badge="CORE LEADERSHIP"
            title="核心团队"
            subtitle="汇聚资深创新专家、工业设计大师与商业策略顾问，为客户提供专业的全闭环创新力支撑。"
            align="between"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {teamMembers.map((member, idx) => (
              <TeamMemberCard key={idx} name={member.name} title={member.title} />
            ))}
          </div>
        </section>

      </div>

    </div>
  );
};
