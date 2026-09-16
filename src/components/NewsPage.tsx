import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Sparkles, 
  X,
  Clock,
  Eye,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface NewsArticleItem {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  author?: string;
  readTime?: string;
  views?: number;
  content?: string[];
}

interface NewsPageProps {
  onOpenContactModal?: () => void;
  onSelectArticle?: (id: string) => void;
  onNavigate?: (url: string) => void;
}

const NEWS_CATEGORIES = ['全部', '公司动态', '媒体报道', '行业资讯', '品牌事件', '获奖喜讯'];

export const NEWS_DATABASE: NewsArticleItem[] = [
  {
    id: 'news-1',
    title: '风起势至，共赢未来 | 品类突围·AI助手重磅发布',
    date: '2023年5月30日',
    category: '公司动态',
    description: '洛可可创新设计集团在20周年盛典上正式发布新一代品类战略与AI设计智能助手，深度探讨数字化时代的品牌价值重塑与智能制造赋能。',
    image: '/src/assets/images/news_1.jpg',
    author: '洛可可品牌中心',
    readTime: '4 分钟',
    views: 3420,
    content: [
      '在洛可可创新设计集团成立20周年之际，主题为“风起势至·品类突围”的年度创新峰会在上海成功举行。创始人贾伟发表主旨演讲，全面重磅推出基于大模型的“AI品类创新助手”以及“三品合一”爆品全案服务范式。',
      '贾伟指出，在消费分级与数字化浪潮叠加的今天，传统产品创新正面临流量红利见顶与同质化竞争加剧的双重瓶颈。洛可可通过20年近万个成功案例的沉淀，将算法与设计经验深度结合，帮助客户精准识别高潜赛道。',
      '未来，洛可可将继续立足“咨询+设计”一体化矩阵，全面助力企业实现从单品爆款到品类常青的战略跨越。'
    ]
  },
  {
    id: 'news-2',
    title: '设计国补 | 北京企业最高获20W！洛可可全流程协助申报',
    date: '2023年6月11日',
    category: '行业资讯',
    description: '北京市经信局重磅福利来袭——工业设计服务券申领全面开启！最高可享20万元国家补贴。洛可可作为国家级工业设计中心，全流程协助申报。',
    image: '/src/assets/images/news_2.jpg',
    author: '产业政策研究部',
    readTime: '3 分钟',
    views: 2890,
    content: [
      '为加快推动北京市制造业高质量发展，深化工业设计与实体经济融合，北京市经济和信息化局正式启动工业设计服务券专项支持工作。',
      '符合条件的高新技术企业、专精特新“小巨人”企业在采购工业设计服务时，可享受最高20万元资金补贴。作为国家级工业设计中心，洛可可将设立专项服务通道，为申报企业提供合同梳理、申报材料准备及全流程专家辅导。',
      '欢迎有产品升级与外观结构设计需求的北京企事业单位及时联系洛可可顾问团队，共享政策红利。'
    ]
  },
  {
    id: 'news-3',
    title: '洛可可20周年，贾伟：创造不可能，展望AI新纪元',
    date: '2023年4月18日',
    category: '公司动态',
    description: '在20周年的分享会上，贾伟先生动情回顾了洛可可从一间小办公室成长为全球化咨询设计集团的历程，并展望洛可可的AI新纪元。',
    image: '/src/assets/images/news_3.jpg',
    author: '贾伟演讲录',
    readTime: '6 分钟',
    views: 4510,
    content: [
      '20年前，洛可可诞生于北京的一间地下室；20年后的今天，洛可可已经成长为拥有数千名设计师、服务超一万家全球客户的创新设计服务平台。',
      '“我们一直在做一件事情：用设计让世界变得更美好。”贾伟在演讲中提到，“AI时代的到来不是对设计师的替代，而是对人类创造力的极大放飞。洛可可将率先开启‘人机共创’新纪元。”',
      '大会现场展示了多个由AI辅助完成的机器人与智能家电设计案例，展现了极高的研发效率与美学质感。'
    ]
  },
  {
    id: 'news-4',
    title: '喜讯！洛可可荣膺2023德国红点奖最高荣誉 (Best of the Best)',
    date: '2023年7月22日',
    category: '获奖喜讯',
    description: '全球工业设计顶级盛事德国红点奖揭晓，洛可可设计团队选送的医疗智能机器人凭卓越的人机工程与视觉设计，一举夺得Supreme视觉荣誉。',
    image: '/src/assets/images/news_1.jpg',
    author: '国际奖项工作组',
    readTime: '3 分钟',
    views: 1980,
    content: [
      '2023年德国红点设计大奖（Red Dot Award）评审结果揭晓，洛可可为合作伙伴研发的手术辅助机器人产品从全球数万件参赛作品中脱颖而出，荣获“Best of the Best”最高奖项。',
      '红点奖评审团指出：“该产品将高精度的临床医疗功能与极具亲和力的人机交互语言巧妙结合，打破了以往医疗设备冰冷沉重的刻板印象，是工业设计赋能医疗科技的杰出示范。”',
      '截至目前，洛可可累计斩获红点、iF、IDEA、红星奖等国际国内顶级设计大奖已突破500项。'
    ]
  },
  {
    id: 'news-5',
    title: '央视专题报道：洛可可工业设计赋能实体经济高质量发展',
    date: '2023年8月15日',
    category: '媒体报道',
    description: '央视财经频道深度聚焦中国制造转型升级，走访洛可可北京创新设计中心，解读“设计+供应链”如何助力传统制造业焕发新生。',
    image: '/src/assets/images/news_2.jpg',
    author: '央视财经报道组',
    readTime: '5 分钟',
    views: 6120,
    content: [
      '中央电视台财经频道推出专栏报道《设计驱动新制造》。记者实地探访了洛可可创新中心，近距离感受工业设计如何将一项前沿科研成果转化为市场热销产品。',
      '报道重点展示了洛可可帮助某传统家用电器品牌重新定位爆款电饭煲的全过程。通过精准用户体验研究与流线型外观重塑，该产品上市仅3个月销量即突破30万台。',
      '洛可可总裁在接受采访时表示：“工业设计不仅是看得到的包装与外壳，更是看不见的供应链整合与商业模式创新。”'
    ]
  },
  {
    id: 'news-6',
    title: '品类创新 | 悦鲜活年轻化牛奶包装荣获iF设计大奖',
    date: '2023年9月08日',
    category: '品牌事件',
    description: '洛可可打造的悦鲜活高端鲜乳系列，通过差异化瓶型结构与0.09s黄金保鲜视觉叙事，一举夺得2023德国iF设计奖。',
    image: '/src/assets/images/news_3.jpg',
    author: '快消品事业部',
    readTime: '4 分钟',
    views: 2310,
    content: [
      '在快消乳品同质化严重的市场竞争中，洛可可受邀为君乐宝旗下“悦鲜活”品牌提供全新的年轻化包装与品牌视觉升级方案。',
      '设计团队打破传统牛奶盒外观，采用人体工学微弧瓶身与高透明度材质，凸显鲜奶晶莹质感；同时将杀菌时间参数进行艺术化印制，建立了强有力的品质信任状。',
      '该设计帮助悦鲜活迅速打入年轻一代白领圈层，实现了销量与品牌的双重突破。'
    ]
  },
  {
    id: 'news-7',
    title: '携手小仙炖，洛可可打造鲜炖燕窝品类新标杆',
    date: '2023年10月12日',
    category: '品牌事件',
    description: '确立“鲜炖燕窝”高端红利赛道，洛可可全维度打造冰温、保鲜及精巧包装新品类标杆，助力品牌年销售额快速破亿。',
    image: '/src/assets/images/news_1.jpg',
    author: '品牌策略中心',
    readTime: '5 分钟',
    views: 3100,
    content: [
      '传统滋补品长期面临“老气、繁琐、无信任凭证”的消费痛点。洛可可助力小仙炖开辟“鲜炖”新赛道，从品牌VI、专利瓶型到配送冷鲜盒进行了全链路重构。',
      '通过碗状便携小瓶与可拆卸环保标签，既保障了7天保鲜锁营养的体验，又满足了年轻女性在办公室、出差等多场景下的养生需求。'
    ]
  },
  {
    id: 'news-8',
    title: '故宫猫IP文创发布，展现传统文化与现代设计融合魅力',
    date: '2023年11月05日',
    category: '公司动态',
    description: '“幽幽宫殿，一猫当家”。洛可可文创团队倾力打造的故宫猫衍生IP产品震撼登场，引爆故宫文创文旅消费新风潮。',
    image: '/src/assets/images/news_2.jpg',
    author: '文创IP事业部',
    readTime: '4 分钟',
    views: 5240,
    content: [
      '围绕故宫博物院“御猫”这一天然IP，洛可可设计团队开发了包括盲盒手办、书签文具、便携随行杯等在内的全套文创衍生品。',
      '通过将明清宫廷服饰元素与萌宠猫咪形象有机融合，使沉淀数百年的故宫文化以生动有趣的姿态走进千家万户。'
    ]
  },
  {
    id: 'news-9',
    title: '医疗机器人设计突破：洛可可助力思哲睿获得创新大奖',
    date: '2023年12月01日',
    category: '获奖喜讯',
    description: '集工业设计美学、高精尖临床需求与卓越稳定性能于一体。思哲睿康多多手术机器人喜获中国优秀工业设计金奖。',
    image: '/src/assets/images/news_3.jpg',
    author: '医疗器械设计组',
    readTime: '4 分钟',
    views: 1870,
    content: [
      '在工业和信息化部指导的中国优秀工业设计奖评选中，洛可可设计的思哲睿多悬臂微创手术机器人荣获金奖殊荣。',
      '设计团队克服了复杂外科手术室的空间约束，采用轻量化碳纤维臂骨与无死角防污染蒙皮，有效提升了主治医师的操作舒适度与手术安全性。'
    ]
  },
  {
    id: 'news-10',
    title: '2024工业设计趋势白皮书发布：AI+制造的未来路径',
    date: '2024年1月15日',
    category: '行业资讯',
    description: '洛可可联合多家行业智库共同发布《2024全球工业设计趋势报告》，指出现代工业设计正全面迈向智能化、可持续化与情感化时代。',
    image: '/src/assets/images/news_1.jpg',
    author: '洛可可研究院',
    readTime: '7 分钟',
    views: 4120,
    content: [
      '《2024全球工业设计趋势白皮书》基于对全球500位知名企业CMO与首席设计师的调查，梳理出未来三年的五大核心创新趋势：AI辅助生成式设计、循环可降解材料应用、拟人化情感交互、微型智能硬件形态重构等。',
      '白皮书完整版已在洛可可官网开放免费下载，为制造业企业研发决策提供前瞻性参考。'
    ]
  },
  {
    id: 'news-11',
    title: '洛可可受邀参加国际工业设计论坛并发表主旨演讲',
    date: '2024年2月20日',
    category: '媒体报道',
    description: '在博鳌亚洲论坛工业设计平行论坛上，洛可可代表向与会数十位国际顶尖专家分享了中国制造“三品合一”爆品打造的商业实践。',
    image: '/src/assets/images/news_2.jpg',
    author: '海外事业部',
    readTime: '3 分钟',
    views: 2150,
    content: [
      '与会专家就“设计如何助力全球经济可持续增长”展开深入对话。洛可可分享的软硬件结合智能硬件案例获得了与会各国设计组织负责人的高度评价。'
    ]
  },
  {
    id: 'news-12',
    title: '智能陪伴机器人糯宝Pophie正式发布，开启情感交互新时代',
    date: '2024年3月10日',
    category: '公司动态',
    description: '三品合一打造类生命体情感陪伴机器人。融合AI算法、温润触感材料与拟人化微表情，开启家庭温情互动新纪元。',
    image: '/src/assets/images/news_3.jpg',
    author: '机器人实验室',
    readTime: '5 分钟',
    views: 3980,
    content: [
      '糯宝Pophie是洛可可孵化的软硬件一体情感陪伴机器人。不同于传统语音音箱，糯宝拥有多模态触觉感知与丰富眼部微表情系统，能根据主人的情绪提供深度陪伴体验。'
    ]
  }
];

export const NewsPage: React.FC<NewsPageProps> = ({ onSelectArticle, onNavigate }) => {
  // Category state
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  // Pagination state (6 items per page)
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Detail Modal state
  const [selectedArticle, setSelectedArticle] = useState<NewsArticleItem | null>(null);

  // Articles list
  const filteredArticles = useMemo(() => {
    if (selectedCategory === '全部') return NEWS_DATABASE;
    return NEWS_DATABASE.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  // Total pages
  const totalPages = Math.ceil(filteredArticles.length / pageSize) || 1;

  // Paginated articles slice
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredArticles.slice(start, start + pageSize);
  }, [filteredArticles, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    // Smooth scroll to news list top
    const listElement = document.getElementById('news-list-section');
    if (listElement) {
      listElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCardClick = (article: NewsArticleItem) => {
    if (onSelectArticle) {
      onSelectArticle(article.id);
    } else if (onNavigate) {
      onNavigate(`/news-detail/${article.id}`);
    } else {
      setSelectedArticle(article);
    }
  };

  return (
    <div className="w-full bg-white text-neutral-900 min-h-screen">
      
      {/* 1. PAGE HEADER (参照案例页 slogan 排版设计规范) */}
      <div className="bg-white border-b border-neutral-100 py-10 md:py-14">
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">
                LKK NEWS CENTER
              </span>
              <h1 className="hero-title text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#111827] mt-2 leading-[1.05] font-display">
                新闻中心
              </h1>
              <p className="text-xs md:text-sm font-semibold tracking-wider text-[#007BC7] uppercase mt-2 font-mono">
                探索洛可可成长足迹与设计洞察
              </p>
            </div>
            <p className="text-sm text-[#4B5563] max-w-xl leading-relaxed">
              汇聚洛可可最新企业动态、获奖荣誉、媒体报道与行业趋势分析，一站式读懂创新的商业价值。
            </p>
          </div>
        </div>
      </div>

      {/* 3. NEWS LIST — 视觉与交互完全照搬首页"新闻中心"板块 */}
      <section id="news-list-section" className="py-12 md:py-16 bg-white min-h-[600px]">
        <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12">
          
          {/* News Cards Grid */}
          <AnimatePresence mode="wait">
            {paginatedArticles.length > 0 ? (
              <motion.div 
                key={`${selectedCategory}-${currentPage}`}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -12, transition: { duration: 0.15 } }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.07,
                      delayChildren: 0.04
                    }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {paginatedArticles.map((article) => (
                  <motion.div 
                    key={article.id}
                    variants={{
                      hidden: { opacity: 0, y: 28, scale: 0.96 },
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
                    onClick={() => handleCardClick(article)}
                    className="bg-white rounded-[24px] overflow-hidden border border-neutral-200/60 shadow-sm hover:shadow-xl hover:border-[#007BC7] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  >
                  {/* Card Cover Image (拉长至与品类创新咨询卡片一样比例大小：aspect-[16/11]) */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-100 shrink-0">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                    <div>
                      {/* 辅助信息：日期与浏览量 */}
                      <div className="flex items-center justify-between text-xs font-medium text-neutral-400 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{article.views || 3200} 阅读</span>
                        </div>
                      </div>

                      {/* 主标题 */}
                      <h3 className="text-lg font-bold text-neutral-900 line-clamp-2 leading-snug group-hover:text-neutral-700 transition-colors duration-200">
                        {article.title}
                      </h3>

                      {/* 简介/正文 */}
                      <p className="text-sm font-normal text-neutral-500 mt-3 line-clamp-3 leading-relaxed">
                        {article.description}
                      </p>
                    </div>

                    {/* 底部操作条 */}
                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-medium">
                      <span className="text-neutral-400 group-hover:text-neutral-900 transition-colors">
                        阅读资讯全文
                      </span>
                      <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="py-20 text-center bg-white rounded-[24px] border border-dashed border-neutral-200">
              <p className="text-neutral-400 text-sm">该分类下暂无新闻内容</p>
            </div>
          )}
          </AnimatePresence>

          {/* Pagination Controls Bar */}
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

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-3xl rounded-[24px] overflow-hidden shadow-2xl border border-neutral-100 z-10 max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-all z-20 shadow-sm cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 md:p-10 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold bg-blue-50 text-[#007BC7] px-3 py-1 rounded-md uppercase font-mono">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-[#8C8C8C] font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedArticle.date}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] leading-tight font-display">
                  {selectedArticle.title}
                </h2>

                <div className="flex items-center gap-4 text-xs text-neutral-400 border-y border-neutral-100 py-3">
                  <span>发布：{selectedArticle.author || '洛可可创新中心'}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 阅读需 {selectedArticle.readTime || '3 分钟'}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {selectedArticle.views || 2400} 次阅读</span>
                </div>

                {/* Article Cover Image */}
                <div className="w-full aspect-[16/9] rounded-[16px] overflow-hidden bg-neutral-100 border border-neutral-100">
                  <img 
                    src={selectedArticle.image} 
                    alt={selectedArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Body Content Paragraphs */}
                <div className="space-y-4 text-neutral-700 text-sm md:text-base leading-relaxed">
                  {selectedArticle.content ? (
                    selectedArticle.content.map((p, idx) => (
                      <p key={idx} className="indent-8">{p}</p>
                    ))
                  ) : (
                    <p>{selectedArticle.description}</p>
                  )}
                </div>

                {/* Article Modal Footer Action */}
                <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Share2 className="w-4 h-4 text-[#007BC7]" />
                    分享该动态至社交平台
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="w-full sm:w-auto bg-[#007BC7] hover:bg-[#005F96] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md"
                  >
                    关闭文章
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default NewsPage;
