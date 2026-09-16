import React, { useState } from 'react';
import { BookOpen, Download, ChevronRight, X } from 'lucide-react';
import { ScrollSectionTitle } from './ScrollSectionTitle';

interface ReportModalData {
  title: string;
  tag: string;
  overview: string;
  keyPoints: string[];
  chapters: string[];
}

interface ResearchReportsSectionProps {
  onOpenContactModal: () => void;
  onNavigate?: (url: string) => void;
}

export const ResearchReportsSection: React.FC<ResearchReportsSectionProps> = ({
  onOpenContactModal,
  onNavigate
}) => {
  const [activeReport, setActiveReport] = useState<ReportModalData | null>(null);

  const flagshipReportData: ReportModalData = {
    title: '中国消费品类重构与“三品合一”增长白皮书',
    tag: '年度核心白皮书',
    overview: '定义品类空位，打造尖刀爆品，沉淀心智资产，构筑不讲价的长期护城河。',
    keyPoints: [
      '品类破局：发掘代偿需求，卡位心智第一空位。',
      '尖刀爆品：打造差异卖点，建立首选购买理由。',
      '品牌沉淀：摆脱买量依赖，沉淀长期品牌溢价。',
      '组织协同：研发、设计与供应链一体化作战。'
    ],
    chapters: [
      '第1章：中国消费红利变迁与品类重构周期',
      '第2章：三品合一底层逻辑与增长公式',
      '第3章：爆品孵化黄金法则与尖刀战法',
      '第4章：标杆案例深度复盘与落地手册'
    ]
  };

  const topicReports: {
    id: string;
    num: string;
    title: string;
    desc: string;
    modalData: ReportModalData;
  }[] = [
    {
      id: 'topic-01',
      num: '01',
      title: '消费品类生命周期与第二曲线',
      desc: '识别品类见顶信号，把握第二曲线增长路径。',
      modalData: {
        title: '消费品类生命周期与第二曲线',
        tag: '专题简报 · 01',
        overview: '拆解品类见顶预警信号，提供成熟企业开辟第二曲线的实战决策框架。',
        keyPoints: [
          '红海饱和度与客群更迭预警指标',
          '从单品到品类矩阵延展的战略节奏',
          '第二增长曲线资源配置与启动时机'
        ],
        chapters: [
          '1. 品类生命周期的四大阶段与拐点识别',
          '2. 企业穿越瓶颈的战略路径决策树',
          '3. 头部品牌第二曲线开辟复盘'
        ]
      }
    },
    {
      id: 'topic-02',
      num: '02',
      title: '打破价格内卷：高溢价品类重塑指南',
      desc: '摆脱低价内卷，通过三品协同沉淀高溢价资产。',
      modalData: {
        title: '打破价格内卷：高溢价品类重塑指南',
        tag: '专题简报 · 02',
        overview: '解构内卷价格战的底层机制，通过三品协同重塑产品价值锚点，实现30%+溢价。',
        keyPoints: [
          '价格战成因与利润侵蚀机制',
          '重塑产品价值锚点与差异化定位',
          '通过工效与CMF设计提升感知价值'
        ],
        chapters: [
          '1. 消费市场中的结构性升级机会',
          '2. 高溢价产品的“买理由”设计体系',
          '3. 供应链与工艺升级带来的感知价值倍增'
        ]
      }
    },
    {
      id: 'topic-03',
      num: '03',
      title: '超级单品从0到1上市推演手册',
      desc: '涵盖概念定义、测款打样至全渠道上市推演。',
      modalData: {
        title: '超级单品从0到1上市推演手册',
        tag: '专题简报 · 03',
        overview: '还原爆品孵化全闭环，建立标准化测款与冷启动流程，降低新品失败率。',
        keyPoints: [
          '概念定义期的需求验真与痛点洞察',
          '测款打样的关键量化评估指标',
          '全渠道铺设与冷启动种草发酵SOP'
        ],
        chapters: [
          '1. 超级单品孵化从0到1全景图',
          '2. 尖刀卖点提炼与视觉认知锤打造',
          '3. 爆款上市期营销、渠道与产能协同'
        ]
      }
    }
  ];

  return (
    <section id="research-reports" className="py-20 md:py-28 bg-[#FFFFFF] border-t border-black/[0.06] overflow-hidden">
      <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12">
        
        <ScrollSectionTitle 
          badge="Research & Insights"
          title="前瞻课题与行业深度报告"
          subtitle="洞悉下一代品类重构与增长范式。"
          align="between"
        />

        {/* 1. 上方大卡片：年度核心白皮书 (Apple 官网设计语言) */}
        <div className="bg-[#F5F5F7] rounded-3xl p-8 sm:p-10 md:p-12 lg:p-14 mb-6 transition-all duration-300 border border-black/[0.04]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* 左侧文字与要点区：强化字阶对比，去除杂乱样式 */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* 顶部副标：克制优雅 */}
              <div className="text-xs font-medium text-[#86868B] mb-2 tracking-tight">
                年度核心白皮书
              </div>

              {/* 标题：大字阶、紧凑字距，无书名号，具备强烈视觉冲击力 */}
              <h3 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight leading-[1.15] mb-4 font-display">
                中国消费品类重构与“三品合一”增长白皮书
              </h3>

              {/* 描述段落 */}
              <p className="text-base text-[#4B5563] leading-relaxed mb-6 max-w-xl font-normal">
                定义品类空位，打造尖刀爆品，沉淀心智资产，构筑不讲价的长期护城河。
              </p>

              {/* 3条核心要点：纯净排版 */}
              <div className="space-y-3 mb-8 w-full max-w-xl">
                <div className="text-sm text-[#111827] flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                  <span>品类破局 · 发掘代偿需求，卡位心智第一空位</span>
                </div>
                <div className="text-sm text-[#111827] flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                  <span>尖刀爆品 · 打造差异卖点，建立首选购买理由</span>
                </div>
                <div className="text-sm text-[#111827] flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                  <span>品牌沉淀 · 摆脱买量依赖，沉淀长期品牌溢价</span>
                </div>
              </div>

              {/* 苹果风格操作按钮 */}
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => setActiveReport(flagshipReportData)}
                  className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#0077ED] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all active:scale-[0.98] cursor-pointer border-none"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>阅读精要</span>
                </button>

                <button
                  onClick={onOpenContactModal}
                  className="inline-flex items-center gap-2 bg-[#E8E8ED] hover:bg-[#DEDEE3] text-[#1D1D1F] px-6 py-2.5 rounded-full text-sm font-medium transition-all active:scale-[0.98] cursor-pointer border-none"
                >
                  <Download className="w-4 h-4 text-[#86868B]" />
                  <span>获取完整报告</span>
                </button>
              </div>
            </div>

            {/* 右侧书封卡片：纯净暗黑框架 */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
              <div className="w-full max-w-[320px] aspect-[1/1.32] bg-[#12161D] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-white/10 relative overflow-hidden select-none">
                {/* 纯净暗黑框架，文字与多余内容已全部清空 */}
              </div>
            </div>

          </div>
        </div>

        {/* 2. 下方三列专题简报卡片 (文字样式严格控制在3种以内) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topicReports.map((report) => (
            <div
              key={report.id}
              className="bg-[#F5F5F7] rounded-2xl p-7 sm:p-8 flex flex-col justify-between text-left hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)] transition-all duration-300 min-h-[220px] border border-black/[0.04]"
            >
              <div>
                {/* 样式 3：辅助元信息（标号） */}
                <div className="text-xs font-medium text-neutral-400 mb-3">
                  {report.num}
                </div>

                {/* 样式 1：主标题 */}
                <h4 className="text-lg font-bold text-neutral-900 tracking-tight mb-2.5 leading-snug">
                  {report.title}
                </h4>

                {/* 样式 2：正文描述 */}
                <p className="text-sm font-normal text-neutral-500 leading-relaxed mb-6">
                  {report.desc}
                </p>
              </div>

              {/* 样式 3：操作链接 */}
              <div>
                <button
                  onClick={() => setActiveReport(report.modalData)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer border-none bg-transparent p-0 group"
                >
                  <span>阅读精要</span>
                  <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 报告精读弹窗 (Executive Summary Modal) */}
      {activeReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-[24px] p-6 sm:p-8 shadow-2xl border border-black/5 max-h-[85vh] overflow-y-auto text-left">
            
            {/* 关闭按钮 */}
            <button
              onClick={() => setActiveReport(null)}
              aria-label="关闭报告"
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#111827] flex items-center justify-center transition-colors cursor-pointer border-none"
            >
              <X className="w-4 h-4" />
            </button>

            {/* 弹窗头部 */}
            <div className="pr-8 mb-5">
              <span className="text-xs font-mono font-semibold text-[#0071E3] block mb-1.5">
                {activeReport.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                {activeReport.title}
              </h3>
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
                核心要点
              </h4>
              <ul className="space-y-2.5">
                {activeReport.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#374151]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007BC7] shrink-0 mt-2" />
                    <span className="leading-relaxed">{pt}</span>
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
                  <div key={i} className="text-xs text-[#374151] font-medium">
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
                className="px-5 py-2.5 rounded-full bg-[#007BC7] hover:bg-[#005F96] text-white text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer border-none"
              >
                立即申请完整PDF
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default ResearchReportsSection;
