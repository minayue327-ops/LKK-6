import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Users, 
  Clock, 
  ShieldCheck, 
  Check, 
  Sparkles,
  ChevronLeft,
  Quote,
  TrendingUp,
  Award,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollSectionTitle } from './ScrollSectionTitle';
import { CourseLandingData, COURSES_DATABASE } from '../data/coursesData';

interface CourseLandingTemplateProps {
  /**
   * 当前展示的课程数据对象
   * 包含所有占位变量：{{course_title}}、{{hero_image}}、{{detail_infographic_image}} 等
   */
  course: CourseLandingData;
  /**
   * 切换当前查看的研学课程
   */
  onSelectCourse?: (courseId: CourseLandingData['id']) => void;
  /**
   * 返回研习方法论母页面
   */
  onBackToLearning?: () => void;
  /**
   * 开启全站统一咨询弹窗
   */
  onOpenContactModal?: () => void;
}

export default function CourseLandingTemplate({
  course,
  onSelectCourse,
  onBackToLearning,
  onOpenContactModal,
}: CourseLandingTemplateProps) {
  // 报名表单状态
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    role: '',
    needs: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSubmitted(true);
    setTimeout(() => {
      // 保持成功状态
    }, 1000);
  };

  const scrollToEnrollment = () => {
    const el = document.getElementById('enrollment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 获取所有4个课程以便在顶部切换栏快速预览
  const allCourses = Object.values(COURSES_DATABASE);

  return (
    <div 
      id="course-landing-page" 
      className="w-full bg-[#FFFFFF] text-[#374151] font-sans antialiased selection:bg-[#007BC7] selection:text-white"
    >
      {/* ================= 顶栏面包屑与 4 门课程切换器 ================= */}
      <div 
        id="course-secondary-nav"
        className="secondary-nav-sticky border-b border-[#E5E5E5] bg-[#FFFFFF]/90 backdrop-blur-md z-40 transition-all"
        style={{ top: 'var(--current-header-offset, 0px)' }}
      >
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-6 sm:px-12 md:px-10 lg:px-24 2xl:px-12 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* 面包屑导航 */}
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <button 
              onClick={onBackToLearning}
              className="hover:text-[#111827] transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>研习创新方法论</span>
            </button>
            <span className="text-[#D1D5DB]">/</span>
            <span className="text-[#9CA3AF]">创新研学项目</span>
            <span className="text-[#D1D5DB]">/</span>
            {/* 占位变量: {{course_title}} */}
            <span className="font-semibold text-[#111827] truncate max-w-[200px] sm:max-w-none">
              {course.course_title}
            </span>
          </div>

          {/* 4 门课程快速切换 Pill 栏（共用同一套模板验证） */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#9CA3AF] mr-1 shrink-0 hidden lg:inline-block">
              SELECT PROGRAM:
            </span>
            {allCourses.map((c) => {
              const isActive = c.id === course.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectCourse?.(c.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#007BC7] text-white shadow-xs font-semibold hover:bg-[#005F96]' 
                      : 'bg-[#F5F5F7] text-[#6B7280] hover:text-[#111827] hover:bg-[#E5E5EA]'
                  }`}
                >
                  {c.course_badge.split('/')[1]?.trim() || c.course_title}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* =========================================================================
          模块 1: 课程首屏 (HERO)
          结构: 课程名 + 定位语 + 关键信息条（人群/时长/限额）+ 主CTA蓝色胶囊按钮 + 场景大图
          板块标题侧边距严格遵循全站统一规范，大图卡片侧边距采用三品合一动图标准
          占位变量: {{course_badge}}, {{course_title}}, {{positioning_statement}},
                    {{target_audience}}, {{duration}}, {{quota}}, {{hero_cta_text}}, {{hero_image}}
         ========================================================================= */}
      <section 
        id="course-hero" 
        className="py-14 sm:py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5] relative overflow-hidden"
      >
        {/* 板块主体与标题区域：侧边距不动，保持全站统一标准 */}
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-6 sm:px-12 md:px-10 lg:px-24 2xl:px-12">
          
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            
            {/* 编号与英文标签 */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-[1.5px] w-6 sm:w-8 bg-[#007BC7]"></span>
              <span className="text-xs sm:text-[13px] tracking-[0.25em] font-bold text-[#007BC7] font-mono uppercase">
                {/* 占位变量: {{course_badge}} */}
                {course.course_badge}
              </span>
              <span className="h-[1.5px] w-6 sm:w-8 bg-[#007BC7]"></span>
            </div>

            {/* 课程大标题: {{course_title}} */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111827] leading-[1.18] font-display text-center"
            >
              {course.course_title}
            </motion.h1>

            {/* 英文副标题 */}
            <p className="text-xs font-semibold tracking-[0.2em] text-[#9CA3AF] uppercase mt-3 font-mono">
              {course.course_title_en}
            </p>

            {/* 课程定位语: {{positioning_statement}} (Hero 板块样式 2: 18px 导读正文) */}
            <p className="text-lg text-[#4B5563] max-w-3xl mt-6 sm:mt-8 leading-relaxed font-normal text-center text-balance">
              {course.positioning_statement}
            </p>

            {/* 关键信息条（人群 / 时长 / 限额） */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 sm:mt-10 w-full max-w-3xl bg-[#F5F5F7] rounded-[24px] p-4 sm:p-6 border border-black/[0.04] shadow-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-black/5 text-left">
                
                {/* 人群: {{target_audience}} */}
                <div className="flex items-start gap-3 pt-2 sm:pt-0 sm:px-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 text-[#007BC7] shadow-xs border border-black/5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    {/* Hero 板块样式 4: 12px 英文字段微标 */}
                    <span className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF] block font-medium">
                      TARGET AUDIENCE
                    </span>
                    {/* Hero 板块样式 3: 14px 关键参数值 */}
                    <span className="text-sm font-semibold text-[#111827] mt-0.5 block">
                      {course.target_audience}
                    </span>
                  </div>
                </div>

                {/* 时长: {{duration}} */}
                <div className="flex items-start gap-3 pt-3 sm:pt-0 sm:px-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 text-[#007BC7] shadow-xs border border-black/5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    {/* Hero 板块样式 4: 12px 英文字段微标 */}
                    <span className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF] block font-medium">
                      COURSE DURATION
                    </span>
                    {/* Hero 板块样式 3: 14px 关键参数值 */}
                    <span className="text-sm font-semibold text-[#111827] mt-0.5 block">
                      {course.duration}
                    </span>
                  </div>
                </div>

                {/* 限额: {{quota}} */}
                <div className="flex items-start gap-3 pt-3 sm:pt-0 sm:px-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 text-[#007BC7] shadow-xs border border-black/5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    {/* Hero 板块样式 4: 12px 英文字段微标 */}
                    <span className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF] block font-medium">
                      CLASS CAPACITY
                    </span>
                    {/* Hero 板块样式 3: 14px 关键参数值 */}
                    <span className="text-sm font-semibold text-[#111827] mt-0.5 block">
                      {course.quota}
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* 主 CTA 蓝色胶囊按钮: {{hero_cta_text}} (Hero 板块样式 3: 14px 交互操作按钮) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <button 
                onClick={scrollToEnrollment}
                className="bg-[#007BC7] hover:bg-[#005F96] text-white font-semibold px-8 sm:px-10 py-3.5 rounded-full text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2 group"
              >
                <span>{course.hero_cta_text}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button 
                onClick={onOpenContactModal}
                className="bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#111827] font-semibold px-6 py-3.5 rounded-full text-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>获取课程简章 PDF</span>
              </button>
            </motion.div>

          </div>

        </div>

        {/* 场景大图卡片: {{hero_image}} (仅调整图片的侧边距为三品合一动图标准: max-w-6xl mx-auto px-[5%]) */}
        <div className="max-w-6xl mx-auto px-[5%] w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-12 sm:mt-16 w-full rounded-[24px] overflow-hidden bg-[#F5F5F7] border border-black/5 shadow-[0_16px_48px_rgba(0,0,0,0.06)] group relative"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img 
                src={course.hero_image} 
                alt={`${course.course_title} 场景图`}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 text-white text-left">
                {/* Hero 板块样式 1: 20px 大图标题 */}
                <h3 className="text-xl font-bold tracking-tight">
                  {course.course_title} · 实战研学现场
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          模块 2: 课程详情 (CURRICULUM ARCHITECTURE)
          规范: 仅放一张大幅整版配图（大圆角矩形），不加文字说明，作为纯视觉展示框
          规则: 板块标题侧边距不动，仅图片卡片采用三品合一动图侧边距 (max-w-6xl mx-auto px-[5%])
          占位变量: {{detail_infographic_image}}, {{detail_infographic_alt}}
         ========================================================================= */}
      <section 
        id="course-details-infographic" 
        className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E5E5E5]"
      >
        {/* 板块统一标题规范：侧边距绝对不动，与全站所有板块严格对齐 */}
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-6 sm:px-12 md:px-10 lg:px-24 2xl:px-12">
          <ScrollSectionTitle 
            badge="01 / CURRICULUM ARCHITECTURE"
            title="课程体系与全景大纲。"
            subtitle="沉淀 22 年实战体系，融合顶层商业逻辑、MOT 体验架构与闭环执行工具。"
            align="between"
          />
        </div>

        {/* 纯视觉展示框：仅调整图片的侧边距为三品合一动图标准 (max-w-6xl mx-auto px-[5%])，框架尺寸随图片自然展开 */}
        <div className="max-w-6xl mx-auto px-[5%] w-full mt-8 sm:mt-12">
          <div className="w-full rounded-[24px] overflow-hidden bg-[#F5F5F7] border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <img 
              src={course.detail_infographic_image || 'https://github.com/minaxyue-ops/MINA/releases/download/1/Group.136.jpg'} 
              alt={course.detail_infographic_alt || '课程体系与全景大纲'}
              className="w-full h-auto block"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          模块 3: 往期回顾 (PAST COHORTS)
          规范: 3-4张现场照片网格/横向画廊，配简短caption，可加1-2个数据点
          占位变量: {{past_cohorts}}, {{cohort_metrics}}
         ========================================================================= */}
      <section 
        id="past-cohorts-section" 
        className="py-20 sm:py-28 bg-[#F5F5F7] border-b border-[#E5E5E5]"
      >
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-6 sm:px-12 md:px-10 lg:px-24 2xl:px-12">
          
          {/* 板块统一标题规范 */}
          <ScrollSectionTitle 
            badge="02 / PAST COHORTS"
            title="往期实战回顾与现场。"
            subtitle="沉浸式实战攻防、真实业务解构，在深度推演中建立创新肌肉记忆。"
            align="between"
          />

          {/* 3个核心量化数据卡片: {{cohort_metrics}} (往期回顾板块样式 1: 48px 大数字视觉焦点 + 样式 3: 14px 指标说明) */}
          {course.metrics && course.metrics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-6 sm:mb-8 w-full">
              {course.metrics.map((metric, idx) => {
                const match = metric.value.match(/^([\d.]+)(.*)$/);
                const num = metric.unit ? metric.value : (match ? match[1] : metric.value);
                const unit = metric.unit || (match ? match[2] : '');

                return (
                  <div 
                    key={idx}
                    className="bg-[#FFFFFF] rounded-[24px] py-8 sm:py-10 px-6 border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                  >
                    {/* 样式 1: 48px 核心大数字与品牌蓝单位符号 */}
                    <div className="flex items-baseline justify-center tracking-tight font-display">
                      <span className="text-5xl font-extrabold text-[#111827] tracking-tight">
                        {num}
                      </span>
                      {unit && (
                        <span className="text-5xl font-extrabold text-[#007BC7] ml-1">
                          {unit}
                        </span>
                      )}
                    </div>
                    {/* 样式 3: 14px 指标辅助说明 */}
                    <div className="text-sm font-normal text-[#4B5563] mt-3 tracking-wide">
                      {metric.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 3 张现场照片网格，配简短 caption 与实战实录标号: {{past_cohorts}} */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
            {course.past_cohorts.map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#FFFFFF] rounded-[24px] overflow-hidden border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                {/* 统一比例裁切的大圆角图片 */}
                <div className="w-full relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img 
                    src={item.imageUrl} 
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* 简短 caption 与图文穿插 */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  {/* 样式 2: 16px 实战案例要点解构标题 */}
                  <p className="text-base text-[#1D1D1F] leading-relaxed font-medium">
                    {item.caption}
                  </p>
                  <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
                    {/* 样式 3: 14px 辅助说明 */}
                    <span className="text-sm text-[#86868B] font-normal">往期实战实录</span>
                    {/* 样式 4: 12px 编号微标链接 */}
                    <span className="text-xs text-[#007BC7] font-semibold font-mono flex items-center gap-1">
                      0{idx + 1} &gt;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          模块 4: 学员反馈 (TESTIMONIALS)
          规范: 3张证言卡片横排，头像+姓名职位+1-2句短评（40-60字）
          文字样式严格限定 4 种：
          - 样式 1 (反馈原声): text-lg text-[#1D1D1F] font-normal leading-relaxed
          - 样式 2 (学员姓名): text-base font-bold text-[#111827]
          - 样式 3 (职位头衔): text-sm font-semibold text-[#007BC7]
          - 样式 4 (企业机构): text-xs font-normal text-[#86868B]
          占位变量: {{testimonials}}
         ========================================================================= */}
      <section 
        id="testimonials-section" 
        className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E5E5E5]"
      >
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-6 sm:px-12 md:px-10 lg:px-24 2xl:px-12">
          
          {/* 板块统一标题规范 */}
          <ScrollSectionTitle 
            badge="03 / PARTICIPANT TESTIMONIALS"
            title="来自一线实战决策者的反馈。"
            subtitle="倾听 500+ 位产业领军者、产研负责人与创新主理人的实战沉淀与评价。"
            align="between"
          />

          {/* 3 张证言卡片横排 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {course.testimonials.map((t, idx) => (
              <div 
                key={idx}
                className="bg-[#F5F5F7] rounded-[24px] p-7 sm:p-8 border border-black/[0.04] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                {/* 引用装饰图标 */}
                <div className="text-[#007BC7]/20 mb-4">
                  <Quote className="w-8 h-8" />
                </div>

                {/* 样式 1: 18px 学员反馈原声短评 (40-60字，字号放大增强视觉冲击与信赖感) */}
                <p className="text-lg text-[#1D1D1F] leading-relaxed mb-6 font-normal">
                  "{t.comment}"
                </p>

                {/* 学员信息：头像 + 姓名职位 + 企业 */}
                <div className="pt-5 border-t border-black/5 flex items-center gap-3.5">
                  <img 
                    src={t.avatar} 
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-white shadow-xs shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    {/* 样式 2: 16px 学员决策者姓名 */}
                    <h4 className="text-base font-bold text-[#111827] truncate">
                      {t.name}
                    </h4>
                    {/* 样式 3: 14px 职务角色头衔 */}
                    <p className="text-sm font-semibold text-[#007BC7] truncate mt-0.5">
                      {t.role}
                    </p>
                    {/* 样式 4: 12px 所属企业与机构 */}
                    <p className="text-xs font-normal text-[#86868B] truncate mt-0.5">
                      {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          模块 5: 报名入口 (ENROLLMENT)
          规范: "申请席位"或"定制方案"CTA区块/表单
          文字样式严格限定 4 种：
          - 样式 1 (卡片大标题): text-2xl font-bold (24px)
          - 样式 2 (强调操作/热线号码): text-base font-semibold (16px)
          - 样式 3 (正文/条款/输入框/副标): text-sm font-normal (14px)
          - 样式 4 (字段标签/微标前缀): text-xs font-medium (12px)
          占位变量: {{enrollment_section}}
         ========================================================================= */}
      <section 
        id="enrollment-section" 
        className="py-20 sm:py-28 bg-[#F5F5F7] border-b border-[#E5E5E5]"
      >
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-6 sm:px-12 md:px-10 lg:px-24 2xl:px-12">
          
          <ScrollSectionTitle 
            badge="04 / APPLY & ENROLL"
            title={course.enrollment_section.formType === 'custom' ? '定制企业专属方案。' : '即刻申请当期研学席位。'}
            subtitle="提交申请后，洛可可教研专家团队将在 1 小时内致电与您对接课程排期与前置诊断。"
            align="between"
          />

          {/* 报名权益与在线申请席位双卡片布局 */}
          <div className="mt-8 sm:mt-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            
            {/* 左卡：深色参训专属核心权益卡片 */}
            <div className="lg:col-span-5 bg-[#111317] rounded-[24px] p-8 sm:p-10 md:p-11 border border-white/[0.08] shadow-[0_16px_44px_rgba(0,0,0,0.18)] flex flex-col justify-between">
              <div>
                {/* 样式 4: 12px 微标与英文前缀 */}
                <span className="text-xs font-medium tracking-wider text-[#007BC7] uppercase block font-mono">
                  PARTICIPATION PRIVILEGES
                </span>

                {/* 样式 1: 24px 卡片大标题 */}
                <h3 className="text-2xl font-bold tracking-tight text-white font-display mt-2 mb-3">
                  {course.enrollment_section.cardTitle || '参训专属核心权益'}
                </h3>

                {/* 样式 3: 14px 辅助说明文案 */}
                <p className="text-sm font-normal text-[#86868B] leading-relaxed mb-6 sm:mb-8">
                  {course.enrollment_section.subtitle}
                </p>

                {/* 样式 3: 14px 权益清单 */}
                <div className="space-y-4">
                  {course.enrollment_section.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm font-normal text-[#E5E5E7]">
                      <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0 mt-1" />
                      <span className="leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 底部：专线电话与服务说明 */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#007BC7] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  {/* 样式 2 与 样式 4: 16px 专线号码与 12px 标签 */}
                  <div className="text-base font-semibold text-white">
                    <span className="text-xs font-medium text-[#86868B]">官方研学专线：</span>400–062–3130
                  </div>
                  {/* 样式 3: 14px 服务时间与辅导说明 */}
                  <div className="text-sm font-normal text-[#86868B]">
                    工作日 09:00 - 18:30 · 资深导师 1 对 1 咨询
                  </div>
                </div>
              </div>
            </div>

            {/* 右卡：浅色在线申请席位表单卡片 */}
            <div className="lg:col-span-7 bg-white rounded-[24px] p-8 sm:p-10 md:p-11 border border-black/[0.04] shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between">
              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center justify-center my-auto"
                >
                  <div className="w-16 h-16 bg-blue-50 text-[#007BC7] rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  {/* 样式 1: 24px 大标题 */}
                  <h4 className="text-2xl font-bold tracking-tight text-[#1D1D1F] font-display">
                    席位申请已提交成功
                  </h4>
                  {/* 样式 3: 14px 说明 */}
                  <p className="text-sm font-normal text-[#86868B] mt-2 max-w-sm mx-auto leading-relaxed">
                    洛可可教研顾问将在 24 小时内与您联系，发送详细《课程指南》及自测问卷。
                  </p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 text-sm font-semibold text-[#007BC7] hover:underline"
                  >
                    重新提交或更改联系信息
                  </button>
                </motion.div>
              ) : (
                <div>
                  {/* 样式 1: 24px 表单大标题 */}
                  <h3 className="text-2xl font-bold tracking-tight text-[#1D1D1F] font-display">
                    {course.enrollment_section.formTitle || (course.enrollment_section.formType === 'custom' ? '在线定制需求' : '在线申请席位')}
                  </h3>

                  {/* 样式 3: 14px 表单副标题 */}
                  <p className="text-sm font-normal text-[#86868B] mt-1.5 mb-6 sm:mb-8 leading-relaxed">
                    {course.enrollment_section.formSubtitle || '提交后 24 小时内由课程顾问初审并发送《课程指南》。'}
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        {/* 样式 4: 12px 表单标签 */}
                        <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                          您的姓名 <span className="text-[#007BC7]">*</span>
                        </label>
                        {/* 样式 3: 14px 输入框 */}
                        <input 
                          type="text"
                          required
                          placeholder="请输入姓名"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#F5F5F7] border border-black/5 rounded-xl px-4 py-3 text-sm font-normal text-[#1D1D1F] placeholder-[#86868B] outline-none focus:border-[#007BC7] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        {/* 样式 4: 12px 表单标签 */}
                        <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                          联系电话 / 微信 <span className="text-[#007BC7]">*</span>
                        </label>
                        {/* 样式 3: 14px 输入框 */}
                        <input 
                          type="tel"
                          required
                          placeholder="请输入手机号"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[#F5F5F7] border border-black/5 rounded-xl px-4 py-3 text-sm font-normal text-[#1D1D1F] placeholder-[#86868B] outline-none focus:border-[#007BC7] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        {/* 样式 4: 12px 表单标签 */}
                        <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                          企业名称
                        </label>
                        {/* 样式 3: 14px 输入框 */}
                        <input 
                          type="text"
                          placeholder="如：某某科技公司"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-[#F5F5F7] border border-black/5 rounded-xl px-4 py-3 text-sm font-normal text-[#1D1D1F] placeholder-[#86868B] outline-none focus:border-[#007BC7] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        {/* 样式 4: 12px 表单标签 */}
                        <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                          担任职位
                        </label>
                        {/* 样式 3: 14px 输入框 */}
                        <input 
                          type="text"
                          placeholder="如：创始人 / 产品总监"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full bg-[#F5F5F7] border border-black/5 rounded-xl px-4 py-3 text-sm font-normal text-[#1D1D1F] placeholder-[#86868B] outline-none focus:border-[#007BC7] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      {/* 样式 4: 12px 表单标签 */}
                      <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                        您当下最关注的业务命题或需求备注
                      </label>
                      {/* 样式 3: 14px 输入框 */}
                      <textarea 
                        rows={3}
                        placeholder="简述企业当前遇到的品类/产品/组织创新瓶颈..."
                        value={formData.needs}
                        onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
                        className="w-full bg-[#F5F5F7] border border-black/5 rounded-xl px-4 py-3 text-sm font-normal text-[#1D1D1F] placeholder-[#86868B] outline-none focus:border-[#007BC7] focus:bg-white transition-all resize-none"
                      />
                    </div>

                    {/* 样式 2: 16px 按钮 */}
                    <button 
                      type="submit"
                      className="w-full bg-[#007BC7] hover:bg-[#0066A6] text-white font-semibold py-3.5 px-6 rounded-full transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-5 text-base"
                    >
                      <span>{course.enrollment_section.ctaButtonText || '立即申请席位'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 模块 6: Footer 复用现有站点，由 App.tsx 统一渲染 */}
    </div>
  );
}
