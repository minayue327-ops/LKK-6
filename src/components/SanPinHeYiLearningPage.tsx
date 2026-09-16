import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Compass, 
  Layers, 
  Target, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Users, 
  Award, 
  Download, 
  Sparkles, 
  ChevronRight,
  ChevronLeft,
  Check,
  Building2,
  TrendingUp,
  Presentation,
  Clock,
  MapPin,
  Eye,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollSectionTitle } from './ScrollSectionTitle';
import { ResearchReportsSection } from './ResearchReportsSection';
import { OnlineDiagnosisBanner } from './OnlineDiagnosisBanner';

// Visual Assets
import workshopExecutiveImg from '../assets/images/workshop_executive_scene_1787620007630.jpg';
import workshopProductCampImg from '../assets/images/workshop_product_camp_1787620021720.jpg';
import caseXiaoxiandunImg from '../assets/images/case_xiaoxiandun_photo_1787620035912.jpg';
import caseSurgicalRobotImg from '../assets/images/case_surgical_robot_1787620051544.jpg';
import methodologyVisualImg from '../assets/images/methodology_visual_diagram_1787620064287.jpg';
import pillarStrategyImg from '../assets/images/pillar_strategy_diagram_1787620077990.jpg';
import pillarProductImg from '../assets/images/pillar_product_ux_1787620090549.jpg';
import pillarBrandImg from '../assets/images/pillar_brand_semiotics_1787620103763.jpg';
import pillarCmfImg from '../assets/images/pillar_cmf_engineering_1787620117012.jpg';

interface SanPinHeYiLearningPageProps {
  onOpenContactModal: () => void;
  onNavigateDetail?: (url: string) => void;
  CounterComponent?: React.FC<{ target: number }>;
}

const DefaultCounter: React.FC<{ target: number }> = ({ target }) => {
  return <span>{target}</span>;
};

export default function SanPinHeYiLearningPage({
  onOpenContactModal,
  onNavigateDetail,
  CounterComponent = DefaultCounter,
}: SanPinHeYiLearningPageProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadEmail, setDownloadEmail] = useState('');
  const [activeCourseTab, setActiveCourseTab] = useState<'all' | 'executive' | 'product' | 'semiotics' | 'custom'>('all');

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadEmail) return;
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setDownloadEmail('');
    }, 4000);
  };

  return (
    <div className="w-full bg-[#FFFFFF] text-[#374151] font-sans antialiased selection:bg-[#0071E3] selection:text-white">
      {/* ================= 1. 首屏 HERO 区域 ================= */}
      <section id="learning-hero" className="py-16 md:py-24 text-center bg-[#FFFFFF] relative overflow-hidden border-b border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-[5%] relative z-10 flex flex-col items-center">
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
            <span className="text-[12px] tracking-[0.3em] font-bold text-[#007BC7] font-mono uppercase">
              METHODOLOGY & ACADEMY
            </span>
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-title text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#111827] leading-[1.15] font-display text-center"
          >
            <span className="block">研习创新方法论</span>
            <span className="block mt-1 sm:mt-2">
              掌握<span className="text-[#007BC7]">「品类冠军」</span>底层逻辑
            </span>
          </motion.h1>

          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-[#6B7280] uppercase mt-4 font-mono">
            LKK Methodology & Innovation Academy
          </p>

          <p className="text-sm md:text-base text-[#4B5563] max-w-3xl mt-8 leading-[1.8] font-normal text-center text-balance">
            洛可可 22 年实战沉淀的品类创新科学，经由 500+ 爆品与千亿市场检验，系统面向企业与创新团队开放。
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            <button 
              onClick={onOpenContactModal}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#007BC7] hover:bg-[#005F96] text-white text-sm sm:text-base font-medium transition-all duration-200 shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer select-none"
              title="进入线上诊断"
            >
              <span>进入线上诊断</span>
              <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#workshops-courses"
              className="text-[#007BC7] hover:text-[#005F96] text-sm sm:text-base font-medium flex items-center gap-1 group transition-all"
            >
              <span>了解研习体系</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* 3D 架构全景预览 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-12 sm:mt-14 w-full rounded-[24px] overflow-hidden bg-[#F5F5F7] border border-black/5 shadow-[0_16px_48px_rgba(0,0,0,0.06)] group relative"
          >
            <img 
              src={methodologyVisualImg} 
              alt="三品合一方法论架构" 
              className="w-full aspect-[16/9] object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-6 sm:p-8 flex items-end justify-between text-left text-white">
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">三品合一 · 创新闭环体系</h2>
                <p className="text-xs text-white/80 mt-0.5 font-light">品类战略 × 体验设计 × 心智符号 × CMF量产工程</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= 2. 核心规格数据 ================= */}
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

      {/* ================= SECTION 01: 研学项目与实战营 (参考图二 Apple 经典卡片设计) ================= */}
      <section id="workshops-courses" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#D2D2D7]/40">
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12">
          
          <ScrollSectionTitle 
            badge="03 / WORKSHOPS & PROGRAMS"
            title="创新研学项目与实战营。"
            subtitle="洛可可资深导师亲自带教，结合企业真实业务课题，建立方法论肌肉记忆。"
            align="between"
          />

          {/* 筛选栏单独下移一行并居中对齐 */}
          <div className="flex justify-center mb-10 md:mb-14">
            <div className="inline-flex p-1.5 rounded-full bg-[#F5F5F7] border border-black/[0.04] shadow-2xs overflow-x-auto max-w-full">
              {[
                { id: 'all', label: '全部研学项目' },
                { id: 'executive', label: '高管战略班' },
                { id: 'product', label: '爆品实战营' },
                { id: 'semiotics', label: '超级符号营' },
                { id: 'custom', label: '企业定制营' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCourseTab(tab.id as any)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    activeCourseTab === tab.id
                      ? 'bg-[#FFFFFF] text-[#111827] shadow-sm font-semibold'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 课程卡片 2x2 网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            
            {/* 项目 1 */}
            {(activeCourseTab === 'all' || activeCourseTab === 'executive') && (
              <div 
                className="group bg-[#F5F5F7] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between border border-black/[0.04] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] cursor-pointer"
                onClick={() => onNavigateDetail ? onNavigateDetail('/learning/courses/executive') : onOpenContactModal()}
              >
                <div>
                  {/* 顶部圆角图片 */}
                  <div className="w-full relative aspect-[16/10] rounded-[16px] overflow-hidden bg-white mb-6 border border-black/5 shadow-2xs">
                    <img 
                      src={workshopExecutiveImg} 
                      alt="总裁战略班：品类顶层设计" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* 标签 & 标题 */}
                  <div className="text-xs font-medium text-[#007BC7] mb-2 font-mono">
                    面向创始人与核心高管
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111827] group-hover:text-[#007BC7] transition-colors mb-3 font-display">
                    总裁战略班：品类顶层设计
                  </h3>
                  
                  {/* 精炼描述 */}
                  <p className="text-sm text-[#4B5563] leading-relaxed mb-5 font-normal">
                    深度研判赛道锚定与企业第二增长曲线，由贾伟导师团队开展 1 对 1 私董商业诊断与战略推演。
                  </p>

                  {/* 核心亮点 */}
                  <div className="space-y-2 mb-6 text-sm text-[#374151]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                      <span>品类创新与千亿蓝海赛道锚定</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                      <span>贾伟团队 1 对 1 私董商业顶层诊断</span>
                    </div>
                  </div>
                </div>

                {/* 底部信息与胶囊按钮 */}
                <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">限额 20 人 / 期</span>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if (onNavigateDetail) onNavigateDetail('/learning/courses/executive');
                      else onOpenContactModal?.(); 
                    }}
                    className="bg-[#007BC7] hover:bg-[#005F96] text-white text-sm font-medium px-5 py-2 rounded-full inline-flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <span>申请席位</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 项目 2 */}
            {(activeCourseTab === 'all' || activeCourseTab === 'product') && (
              <div 
                className="group bg-[#F5F5F7] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between border border-black/[0.04] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] cursor-pointer"
                onClick={() => onNavigateDetail ? onNavigateDetail('/learning/courses/product') : onOpenContactModal()}
              >
                <div>
                  {/* 顶部圆角图片 */}
                  <div className="w-full relative aspect-[16/10] rounded-[16px] overflow-hidden bg-white mb-6 border border-black/5 shadow-2xs">
                    <img 
                      src={workshopProductCampImg} 
                      alt="爆品打造营：从洞察到量产" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* 标签 & 标题 */}
                  <div className="text-xs font-medium text-[#007BC7] mb-2 font-mono">
                    面向产研负责人与产品骨干
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111827] group-hover:text-[#007BC7] transition-colors mb-3 font-display">
                    爆品打造营：从洞察到量产
                  </h3>
                  
                  {/* 精炼描述 */}
                  <p className="text-sm text-[#4B5563] leading-relaxed mb-5 font-normal">
                    聚焦 MOT 关键体验时刻与量产工程标准，携带企业真实业务课题现场全流程推演落地方案。
                  </p>

                  {/* 核心亮点 */}
                  <div className="space-y-2 mb-6 text-sm text-[#374151]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                      <span>真实痛点挖掘与爆品 PRD 输入标准</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                      <span>MOT 体验地图与量产方案现场推演</span>
                    </div>
                  </div>
                </div>

                {/* 底部信息与胶囊按钮 */}
                <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">适合产研与研发团队</span>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if (onNavigateDetail) onNavigateDetail('/learning/courses/product');
                      else onOpenContactModal?.(); 
                    }}
                    className="bg-[#007BC7] hover:bg-[#005F96] text-white text-sm font-medium px-5 py-2 rounded-full inline-flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <span>申请席位</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 项目 3 */}
            {(activeCourseTab === 'all' || activeCourseTab === 'semiotics') && (
              <div 
                className="group bg-[#F5F5F7] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between border border-black/[0.04] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] cursor-pointer"
                onClick={() => onNavigateDetail ? onNavigateDetail('/learning/courses/semiotics') : onOpenContactModal()}
              >
                <div>
                  {/* 顶部圆角图片 */}
                  <div className="w-full relative aspect-[16/10] rounded-[16px] overflow-hidden bg-white mb-6 border border-black/5 shadow-2xs">
                    <img 
                      src={pillarBrandImg} 
                      alt="超级符号实训营：品牌心智占领" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* 标签 & 标题 */}
                  <div className="text-xs font-medium text-[#007BC7] mb-2 font-mono">
                    面向品牌总监与市场团队
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111827] group-hover:text-[#007BC7] transition-colors mb-3 font-display">
                    超级符号实训营：心智占领
                  </h3>
                  
                  {/* 精炼描述 */}
                  <p className="text-sm text-[#4B5563] leading-relaxed mb-5 font-normal">
                    基于认知心理学与货架首秒穿透法则，构建超级符号编码与全触点体验规范，沉淀品牌心智资产。
                  </p>

                  {/* 核心亮点 */}
                  <div className="space-y-2 mb-6 text-sm text-[#374151]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                      <span>超级符号编码与货架首秒穿透实操</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                      <span>全触点体验规范与高价值品牌资产沉淀</span>
                    </div>
                  </div>
                </div>

                {/* 底部信息与胶囊按钮 */}
                <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">限额 30 人 / 期</span>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if (onNavigateDetail) onNavigateDetail('/learning/courses/semiotics');
                      else onOpenContactModal?.(); 
                    }}
                    className="bg-[#007BC7] hover:bg-[#005F96] text-white text-sm font-medium px-5 py-2 rounded-full inline-flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <span>申请席位</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 项目 4 */}
            {(activeCourseTab === 'all' || activeCourseTab === 'custom') && (
              <div 
                className="group bg-[#F5F5F7] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between border border-black/[0.04] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] cursor-pointer"
                onClick={() => onNavigateDetail ? onNavigateDetail('/learning/courses/custom') : onOpenContactModal()}
              >
                <div>
                  {/* 顶部圆角图片 */}
                  <div className="w-full relative aspect-[16/10] rounded-[16px] overflow-hidden bg-white mb-6 border border-black/5 shadow-2xs">
                    <img 
                      src={methodologyVisualImg} 
                      alt="设计思维与组织创新：企业定制内训营" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* 标签 & 标题 */}
                  <div className="text-xs font-medium text-[#007BC7] mb-2 font-mono">
                    面向跨部门创新与业务骨干
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111827] group-hover:text-[#007BC7] transition-colors mb-3 font-display">
                    设计思维与组织创新定制营
                  </h3>
                  
                  {/* 精炼描述 */}
                  <p className="text-sm text-[#4B5563] leading-relaxed mb-5 font-normal">
                    深入企业驻场，结合真实战略命题与创新痛点定制实战工作坊，打破部门壁垒，沉淀创新肌肉记忆。
                  </p>

                  {/* 核心亮点 */}
                  <div className="space-y-2 mb-6 text-sm text-[#374151]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                      <span>结合企业真实业务命题现场解构实战</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                      <span>产出可落地的产品创新行动方案与工具包</span>
                    </div>
                  </div>
                </div>

                {/* 底部信息与胶囊按钮 */}
                <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">支持企业驻场定制</span>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if (onNavigateDetail) onNavigateDetail('/learning/courses/custom');
                      else onOpenContactModal?.(); 
                    }}
                    className="bg-[#007BC7] hover:bg-[#005F96] text-white text-sm font-medium px-5 py-2 rounded-full inline-flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <span>定制方案</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* 专属 1 对 1 商业诊断入口卡片 (统一线上诊断卡片) */}
          <OnlineDiagnosisBanner
            className="mt-8 sm:mt-10 md:mt-12"
            title="需要针对企业专属业务命题展开深度诊断？"
            description="除了通用内训营，洛可可专家团队可面向企业创始人与核心管理层提供专属 1 对 1 线上商业诊断与品类战略辅导。"
            onAction={onOpenContactModal}
          />
        </div>
      </section>

      {/* ================= SECTION 02: 标杆爆品方法论深度拆解 ================= */}
      <section id="methodology-cases" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#D2D2D7]/40">
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12">
          
          <ScrollSectionTitle 
            badge="02 / CASE STUDIES"
            title="标杆爆品方法论深度拆解。"
            subtitle="以百亿级标杆项目为切片，透视「三品合一」在不同赛道中的实战落地与增长逻辑。"
            align="between"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Case 1: 小仙炖 */}
            <div className="group bg-[#F5F5F7] rounded-[24px] overflow-hidden border border-black/[0.04] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
                  <img 
                    src={caseXiaoxiandunImg} 
                    alt="小仙炖鲜炖燕窝" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-8 sm:p-10">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111827] mb-3 font-display">
                    小仙炖：开创新一代滋补品类
                  </h3>
                  <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-6 font-normal">
                    洛可可协助小仙炖定义“鲜炖燕窝”独立品类，通过专利鲜炖瓶型、冷鲜交付系统与超级符号，实现百亿级爆发。
                  </p>

                  <div className="space-y-2.5 text-xs sm:text-sm text-[#374151] pt-5 border-t border-black/[0.08]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] shrink-0"></span>
                      <span>品类战略：切割传统干燕窝，确立鲜炖标准</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] shrink-0"></span>
                      <span>体验创新：专属耐高温鲜炖瓶与人性化开盖</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-10 pt-0 flex items-center justify-between border-t border-black/[0.08] mt-2">
                <span className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider font-mono">
                  入选商学院经典案例
                </span>
                <button 
                  onClick={() => onNavigateDetail?.('/cases')}
                  className="text-xs sm:text-sm font-semibold text-[#0071E3] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>查看详情</span>
                  <span>›</span>
                </button>
              </div>
            </div>

            {/* Case 2: 思哲睿机器人 */}
            <div className="group bg-[#F5F5F7] rounded-[24px] overflow-hidden border border-black/[0.04] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
                  <img 
                    src={caseSurgicalRobotImg} 
                    alt="思哲睿手术机器人" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-8 sm:p-10">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111827] mb-3 font-display">
                    思哲睿机器人：高端系统人机突破
                  </h3>
                  <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-6 font-normal">
                    洛可可深度参与医生操作台、病患推车与机械臂设计，融合高精尖医疗人机工效与工程开模落地。
                  </p>

                  <div className="space-y-2.5 text-xs sm:text-sm text-[#374151] pt-5 border-t border-black/[0.08]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] shrink-0"></span>
                      <span>体验创新：悬浮式控制台与微操力反馈手柄</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] shrink-0"></span>
                      <span>量产落地：严苛公差管控与医用级外壳验证</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-10 pt-0 flex items-center justify-between border-t border-black/[0.08] mt-2">
                <span className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider font-mono">
                  荣获红点、iF 设计大奖
                </span>
                <button 
                  onClick={() => onNavigateDetail?.('/cases')}
                  className="text-xs sm:text-sm font-semibold text-[#0071E3] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>查看详情</span>
                  <span>›</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 03: 前瞻课题与行业深度报告 ================= */}
      <ResearchReportsSection 
        onOpenContactModal={onOpenContactModal}
        onNavigate={onNavigateDetail}
      />

      {/* ================= SECTION 04: 极简白皮书申领 (Apple Pro 级暗黑沉浸卡片) ================= */}
      <section id="enrollment" className="py-20 md:py-28 bg-[#FFFFFF]">
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12">
          
          <div className="bg-gradient-to-b from-[#1D1D1F] to-[#141415] text-white rounded-[24px] p-8 sm:p-14 md:p-16 border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.25)] relative overflow-hidden">
            
            {/* Apple 极简环境光晕 */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#0071E3]/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
              
              {/* Left Column */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#2997FF] text-xs font-mono font-semibold tracking-wider uppercase mb-4 border border-white/10 backdrop-blur-md">
                  FREE TOOLKIT · 实战工具
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display leading-[1.12] mb-4">
                  申领《三品合一》白皮书。
                </h2>
                
                <p className="text-base sm:text-lg text-[#A1A1A6] max-w-xl leading-relaxed mb-8 font-normal">
                  获取 50+ 页系统方法论实操指南、爆品评估推演表单与企业内训大纲，为团队构建高胜率创新体系。
                </p>

                <div className="space-y-3.5 text-xs sm:text-sm text-[#F5F5F7]/90">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#2997FF] shrink-0" />
                    <span>50+ 页方法论实操 PDF 与爆品机会点诊断表</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#2997FF] shrink-0" />
                    <span>企业高管内训与工作坊定制方案一对一咨询</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Apple Frosted Glass Form */}
              <div className="lg:col-span-5 bg-white/[0.04] border border-white/10 rounded-[16px] p-6 sm:p-8 backdrop-blur-md shadow-2xl">
                {downloadSuccess ? (
                  <div className="py-8 text-center flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-[#2997FF]/20 text-[#2997FF] rounded-full flex items-center justify-center mb-3">
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <h4 className="text-base font-bold text-white">申请提交成功</h4>
                    <p className="text-xs sm:text-sm text-[#A1A1A6] mt-1.5">
                      资料已发送至您的邮箱，创新顾问将尽快与您联系。
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleDownloadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-2">
                        企业邮箱 / 手机号码
                      </label>
                      <input 
                        type="text" 
                        required
                        value={downloadEmail}
                        onChange={(e) => setDownloadEmail(e.target.value)}
                        placeholder="name@company.com 或 手机号"
                        className="w-full bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.16] border border-white/15 focus:border-[#2997FF] rounded-full px-5 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition-all"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#0071E3] hover:bg-[#0077ED] active:scale-98 text-white font-medium py-3.5 rounded-full text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_24px_rgba(0,113,227,0.4)]"
                    >
                      <Download className="w-4 h-4" />
                      <span>获取白皮书与课程大纲</span>
                    </button>

                    <p className="text-xs text-white/40 text-center">
                      严格保密，仅用于发送研学资料与内训咨询
                    </p>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

