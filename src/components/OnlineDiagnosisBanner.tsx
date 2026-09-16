import React from 'react';
import { ArrowRight } from 'lucide-react';

interface OnlineDiagnosisBannerProps {
  id?: string;
  title: string;
  description: string;
  buttonText?: string;
  onAction: () => void;
  className?: string;
}

export const OnlineDiagnosisBanner: React.FC<OnlineDiagnosisBannerProps> = ({
  id,
  title,
  description,
  buttonText = '进入线上诊断',
  onAction,
  className = '',
}) => {
  return (
    <div
      id={id}
      className={`w-full bg-[#F5F5F7] rounded-[24px] sm:rounded-[28px] border border-black/[0.04] px-7 py-8 sm:px-10 sm:py-9 md:px-12 md:py-10 lg:px-14 lg:py-11 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10 transition-all duration-300 antialiased ${className}`}
    >
      {/* 左侧文字信息区：苹果官网风格层级与字体比例 */}
      <div className="max-w-3xl flex flex-col justify-center text-left">
        <h3 className="text-2xl sm:text-[26px] lg:text-[28px] font-semibold text-[#1D1D1F] tracking-tight leading-[1.25]">
          {title}
        </h3>
        <p className="mt-2 sm:mt-2.5 text-[15px] sm:text-[17px] text-[#86868B] leading-relaxed font-normal tracking-[-0.01em] max-w-2xl lg:max-w-3xl">
          {description}
        </p>
      </div>

      {/* 右侧行动按钮：苹果官网标准胶囊按钮与交互动效 */}
      <div className="shrink-0 flex items-center self-start md:self-auto">
        <button
          onClick={onAction}
          className="group inline-flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full bg-[#007BC7] hover:bg-[#005F96] text-white text-sm sm:text-[15px] font-medium tracking-normal transition-all duration-200 active:scale-[0.98] cursor-pointer select-none whitespace-nowrap"
          title={buttonText}
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4 text-white/90 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
        </button>
      </div>
    </div>
  );
};

export default OnlineDiagnosisBanner;
