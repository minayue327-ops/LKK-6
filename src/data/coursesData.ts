// ==============================================================================
// 洛可可官网 · 创新研学项目课程数据模型与占位变量定义
// 4个研学课程共用同一套落地页模板 CourseLandingTemplate
// 包含占位变量标注：{{course_title}} {{hero_image}} {{detail_infographic_image}} 等
// ==============================================================================

// 静态视觉资产导入
import workshopExecutiveImg from '../assets/images/workshop_executive_scene_1787620007630.jpg';
import workshopProductCampImg from '../assets/images/workshop_product_camp_1787620021720.jpg';
import methodologyVisualImg from '../assets/images/methodology_visual_diagram_1787620064287.jpg';
import pillarStrategyImg from '../assets/images/pillar_strategy_diagram_1787620077990.jpg';
import pillarProductImg from '../assets/images/pillar_product_ux_1787620090549.jpg';
import pillarBrandImg from '../assets/images/pillar_brand_semiotics_1787620103763.jpg';
import pillarCmfImg from '../assets/images/pillar_cmf_engineering_1787620117012.jpg';
import caseXiaoxiandunImg from '../assets/images/case_xiaoxiandun_photo_1787620035912.jpg';

// 生成的高分辨率课程全景大纲图及现场真实图
import executiveInfographicImg from '../assets/images/executive_curriculum_infographic_1788944267013.jpg';
import productInfographicImg from '../assets/images/product_curriculum_infographic_1788944290249.jpg';
import semioticsInfographicImg from '../assets/images/semiotics_curriculum_infographic_1788944313361.jpg';
import customInfographicImg from '../assets/images/custom_curriculum_infographic_1788944329711.jpg';
import workshopMentoringImg from '../assets/images/workshop_mentoring_scene_1788944348676.jpg';

// 生成的高清学员证言头像
import avatarMaleCeo from '../assets/images/testimonial_avatar_male_ceo_1788944367447.jpg';
import avatarFemaleDir from '../assets/images/testimonial_avatar_female_dir_1788944395177.jpg';
import avatarRdVp from '../assets/images/testimonial_avatar_rd_vp_1788944414559.jpg';

/**
 * 往期实战照片与描述
 */
export interface PastCohortPhoto {
  imageUrl: string;      // {{past_cohort_image}}
  caption: string;       // {{past_cohort_caption}}
  tag?: string;          // {{past_cohort_tag}}
}

/**
 * 核心量化指标
 */
export interface CohortMetric {
  value: string;         // {{metric_value}} (数值或完整格式)
  unit?: string;         // 单位（例如：期, +, %）
  label: string;         // {{metric_label}}
  subtext?: string;
}

/**
 * 学员证言卡片
 */
export interface Testimonial {
  name: string;          // {{testimonial_name}}
  role: string;          // {{testimonial_role}}
  company: string;       // {{testimonial_company}}
  avatar: string;        // {{testimonial_avatar}}
  comment: string;       // {{testimonial_comment}} 40-60字
}

/**
 * 报名入口区域配置
 */
export interface EnrollmentConfig {
  title: string;         // {{enrollment_title}}
  cardTitle?: string;    // 左侧深色卡片大标题
  subtitle: string;      // {{enrollment_subtitle}}
  formTitle?: string;    // 右侧表单标题
  formSubtitle?: string; // 右侧表单副标题
  formType: 'seat' | 'custom'; // {{form_type}}
  ctaButtonText: string; // {{enrollment_cta_button}}
  benefits: string[];    // {{enrollment_benefits}}
}

/**
 * 课程落地页通用数据接口
 * 变量与提示词占位符严格对应
 */
export interface CourseLandingData {
  id: 'executive' | 'product' | 'semiotics' | 'custom'; // 唯一标识符
  course_code: string;                                   // 编号代码，如 01, 02
  course_badge: string;                                  // {{course_badge}} 如 "01 / 高管战略班"
  course_title: string;                                  // {{course_title}} 课程名
  course_title_en: string;                               // {{course_title_en}} 英文副名
  positioning_statement: string;                         // {{positioning_statement}} 定位语
  target_audience: string;                               // {{target_audience}} 适合人群
  duration: string;                                      // {{duration}} 课程时长
  quota: string;                                         // {{quota}} 班额/限额
  hero_cta_text: string;                                 // {{hero_cta_text}} 主CTA按钮文案
  hero_image: string;                                    // {{hero_image}} 场景大图
  detail_infographic_image: string;                      // {{detail_infographic_image}} 课程详情大幅整版配图
  detail_infographic_alt: string;                        // {{detail_infographic_alt}}
  metrics: CohortMetric[];                               // {{cohort_metrics}} 1-2个数据点
  past_cohorts: PastCohortPhoto[];                       // {{past_cohorts}} 3-4张现场照片网格
  testimonials: Testimonial[];                           // {{testimonials}} 3张证言卡片横排 (40-60字短评)
  enrollment_section: EnrollmentConfig;                  // {{enrollment_section}} 报名入口
}

/**
 * 4门课程的完整数据字典
 */
export const COURSES_DATABASE: Record<string, CourseLandingData> = {
  // ==========================================================================
  // 课程 1：总裁战略班：品类顶层设计
  // ==========================================================================
  executive: {
    id: 'executive',
    course_code: '01',
    course_badge: '01 / 高管战略班',
    course_title: '总裁战略班：品类顶层设计',
    course_title_en: 'EXECUTIVE STRATEGY MASTERCLASS: CATEGORY ARCHITECTURE',
    positioning_statement: '深度研判赛道锚定与企业第二增长曲线，由贾伟导师团队开展 1 对 1 私董商业诊断与战略推演。',
    target_audience: '创始人 / 董事长 / CEO / 核心决策层',
    duration: '2天1夜 · 线下封闭沉浸',
    quota: '限额 20 人 / 期 (精品小班私董制)',
    hero_cta_text: '申请席位',
    hero_image: workshopExecutiveImg,
    detail_infographic_image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/Group.136.jpg',
    detail_infographic_alt: '总裁战略班品类顶层设计课程大纲与战略推演架构全景图',
    metrics: [
      { value: '12', unit: '期', label: '高管战略班成功落地' },
      { value: '300', unit: '+', label: '领军企业创始人参训' },
      { value: '99.2', unit: '%', label: '学员综合好评满意率' }
    ],
    past_cohorts: [
      {
        imageUrl: workshopExecutiveImg,
        caption: '面对面拆解真实业务难题与品类突围路径',
        tag: '现场推演'
      },
      {
        imageUrl: pillarStrategyImg,
        caption: '运用三品合一战略罗盘进行现场模拟推演',
        tag: '战略模型'
      },
      {
        imageUrl: caseXiaoxiandunImg,
        caption: '解构小仙炖从 0 到 1 开创千亿品类的实操逻辑',
        tag: '标杆案例'
      }
    ],
    testimonials: [
      {
        name: '陈海波',
        role: '董事长 & 创始人',
        company: '某智能机器人独角兽企业',
        avatar: avatarMaleCeo,
        comment: '在贾老师的私董诊断中，我们彻底理清了从硬件工程思维转向品类认知的关键分水岭。回到企业后战略落地极其迅速，新业务线单季度即实现突破。'
      },
      {
        name: '林书敏',
        role: '战略副总裁',
        company: '某知名上市消费品集团',
        avatar: avatarFemaleDir,
        comment: '两天一夜高密度商业推演，不仅是一次思维风暴，更是实打实的顶层破局。战略班给出的三品合一推演模型，直接成为我们集团未来三年的指导战略。'
      },
      {
        name: '赵元成',
        role: '联合创始人 & CEO',
        company: '国家级专精特新医疗装备企业',
        avatar: avatarRdVp,
        comment: '很多咨询公司讲理论，但洛可可教的是22年实战打磨的肌肉记忆。从赛道定义到心智穿透，私董诊断击中要害，是高管每年必修的战略课。'
      }
    ],
    enrollment_section: {
      title: '预约席位 · 获取课程简章',
      cardTitle: '参训专属核心权益',
      subtitle: '当前批次开放最后 8 个席位，报名后提供课前自测问卷，以便导师针对性备课。',
      formTitle: '在线申请席位',
      formSubtitle: '提交后 24 小时内由课程顾问初审并发送《课程指南》。',
      formType: 'seat',
      ctaButtonText: '立即申请席位',
      benefits: [
        '贾伟导师团队 1 对 1 私董商业顶层诊断',
        '《三品合一：打造品类冠军底层逻辑》精装专著',
        '开放 500+ 爆品内部商业分析脱敏案例库权限',
        '优先进入洛可可校友会高管私董圈与生态资源'
      ]
    }
  },

  // ==========================================================================
  // 课程 2：爆品打造营：从洞察到量产
  // ==========================================================================
  product: {
    id: 'product',
    course_code: '02',
    course_badge: '02 / 爆品实战营',
    course_title: '爆品打造营：从洞察到量产',
    course_title_en: 'PRODUCT INNOVATION & MASS PRODUCTION CAMP',
    positioning_statement: '聚焦 MOT 关键体验时刻与量产工程标准，携带企业真实业务课题现场全流程推演落地方案。',
    target_audience: '产研负责人 / 产品总监 / 研发骨干',
    duration: '3天全流程 · 场景实战闭环',
    quota: '每期限 6 个企业项目组',
    hero_cta_text: '申请席位',
    hero_image: workshopProductCampImg,
    detail_infographic_image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/Group.136.jpg',
    detail_infographic_alt: '爆品打造营从洞察到量产全流程实战课程大纲全景图',
    metrics: [
      { value: '18', unit: '期', label: '爆品打造营成功落地' },
      { value: '120', unit: '+', label: '现场攻坚企业真实课题' },
      { value: '86.5', unit: '%', label: '课题量产与工程转化率' }
    ],
    past_cohorts: [
      {
        imageUrl: workshopProductCampImg,
        caption: '企业团队携带在研真实项目入营，现场推演爆品定义 PRD 输入标准',
        tag: '真实课题实操'
      },
      {
        imageUrl: workshopMentoringImg,
        caption: '资深产品架构师现场拆解用户 MOT 体验峰终定律与可量产工程架构',
        tag: 'MOT体验推演'
      },
      {
        imageUrl: pillarCmfImg,
        caption: 'CMF 材质样板库实测与供应链落地评估，确保高颜值设计无损落地量产',
        tag: 'CMF量产实测'
      }
    ],
    testimonials: [
      {
        name: '刘启恒',
        role: '产研副总裁',
        company: '智能小家电行业领军品牌',
        avatar: avatarRdVp,
        comment: '带了核心研发和产品组一起入营，3天推演出的MOT体验框架，直接解决了困扰我们半年的结构与体验冲突，下个月直接开模量产！'
      },
      {
        name: '许静茹',
        role: '资深产品总监',
        company: '新锐健康科技品牌',
        avatar: avatarFemaleDir,
        comment: '市面上很多产品课偏理论空谈，但洛可可把22年打磨的PRD模板与量产评审标准毫无保留倾囊相授，帮团队建立了严密的产品肌肉记忆。'
      },
      {
        name: '周明轩',
        role: '硬件总监',
        company: '知名物联网智能硬件公司',
        avatar: avatarMaleCeo,
        comment: '导师现场手把手评审工程草图与供应链BOM结构，真正打通了从用户体验洞察到量产下线的全链路死穴，实战价值远超预期！'
      }
    ],
    enrollment_section: {
      title: '组团申请 · 现场实战企业业务课题',
      cardTitle: '参训专属核心权益',
      subtitle: '建议企业以 3-5 人小组入营，携带在研真实项目现场攻坚突破。',
      formTitle: '在线申请席位',
      formSubtitle: '提交后 24 小时内由课程顾问初审并发送《课程指南》。',
      formType: 'seat',
      ctaButtonText: '立即申请席位',
      benefits: [
        '现场完成在研真实课题 MOT 体验地图与 PRD 标准',
        '设计总监与结构总监双导师驻组指导与闭门评审',
        '获得完整《爆品研发实操工具包与量产控制手册》',
        '优先对接洛可可供应链资源库与工艺落地指导'
      ]
    }
  },

  // ==========================================================================
  // 课程 3：超级符号实训营：心智占领
  // ==========================================================================
  semiotics: {
    id: 'semiotics',
    course_code: '03',
    course_badge: '03 / 超级符号营',
    course_title: '超级符号实训营：心智占领',
    course_title_en: 'BRAND SEMIOTICS & COGNITIVE PENETRATION CAMP',
    positioning_statement: '基于认知心理学与货架首秒穿透法则，构建超级符号编码与全触点体验规范，沉淀品牌心智资产。',
    target_audience: '品牌总监 / 市场营销负责人 / 首席增长官',
    duration: '2天实战 · 心智穿透攻坚',
    quota: '限额 30 人 / 期',
    hero_cta_text: '申请席位',
    hero_image: pillarBrandImg,
    detail_infographic_image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/Group.136.jpg',
    detail_infographic_alt: '超级符号实训营品牌心智占领方法论与触点设计全景图',
    metrics: [
      { value: '15', unit: '期', label: '超级符号实训营结业' },
      { value: '300', unit: '+', label: '超级符号经典全案解码' },
      { value: '98.6', unit: '%', label: '学员心智编码方法掌握率' }
    ],
    past_cohorts: [
      {
        imageUrl: pillarBrandImg,
        caption: '货架首秒穿透实验：测试视觉符号编码在终端零售场景的瞬时注意力俘获',
        tag: '货架穿透测试'
      },
      {
        imageUrl: caseXiaoxiandunImg,
        caption: '解构小仙炖、海底捞等经典超级符号诞生全案与触点体验规范',
        tag: '经典案例拆解'
      },
      {
        imageUrl: workshopMentoringImg,
        caption: '学员团队现场实操品牌视觉资产提取，制定全触点统一心智识别规范',
        tag: '符号规范编码'
      }
    ],
    testimonials: [
      {
        name: '张雅涵',
        role: '品牌市场总监',
        company: '高成长国潮消费品牌',
        avatar: avatarFemaleDir,
        comment: '以前做包装总觉得不够吸睛，两天的符号解码训练让我们彻底掌握了货架首秒法则。课后升级的包装在电商主图点击率翻了近一倍！'
      },
      {
        name: '郭德明',
        role: '首席品牌官 (CMO)',
        company: '大型连锁新零售集团',
        avatar: avatarMaleCeo,
        comment: '超级符号不是画一个Logo，而是一整套心理投射与行为诱发系统。课程建立的心智资产量化评估模型，极大降低了我们团队的决策试错成本。'
      },
      {
        name: '苏秉义',
        role: '联合创始人 & CMO',
        company: '知名新锐食品饮料企业',
        avatar: avatarRdVp,
        comment: '导师现场用实物货架推演符号穿透力，极其震撼。所学即所用，不仅统一了品牌与市场团队的语言，更沉淀了属于品牌的终生心智资产。'
      }
    ],
    enrollment_section: {
      title: '预约席位 · 打造品牌超级符号',
      cardTitle: '参训专属核心权益',
      subtitle: '当前批次开放最后 8 个席位，报名后提供课前自测问卷，以便导师针对性备课。',
      formTitle: '在线申请席位',
      formSubtitle: '提交后 24 小时内由课程顾问初审并发送《课程指南》。',
      formType: 'seat',
      ctaButtonText: '立即申请席位',
      benefits: [
        '品牌创新合伙人级专家现场 2 天推演带教',
        '《超级符号实战方法论与全触点资产工具箱》',
        '课后 1 次针对企业实际方案的专家闭门答疑',
        '优先获邀洛可可年度创新峰会 VIP 品牌专场'
      ]
    }
  },

  // ==========================================================================
  // 课程 4：设计思维与组织创新定制营
  // ==========================================================================
  custom: {
    id: 'custom',
    course_code: '04',
    course_badge: '04 / 企业定制营',
    course_title: '设计思维与组织创新定制营',
    course_title_en: 'ENTERPRISE DESIGN THINKING & IN-HOUSE INNOVATION CAMP',
    positioning_statement: '深入企业驻场，结合真实战略命题与创新痛点定制实战工作坊，打破部门壁垒，沉淀创新肌肉记忆。',
    target_audience: '企业跨部门创新委员会 / 事业部业务骨干 / 核心管培生',
    duration: '企业驻场 · 专属定制 (1-3天按需配置)',
    quota: '专属定制 · 团队专属席位',
    hero_cta_text: '定制方案',
    hero_image: methodologyVisualImg,
    detail_infographic_image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/Group.136.jpg',
    detail_infographic_alt: '设计思维与组织创新定制营工作坊架构与工具箱全景图',
    metrics: [
      { value: '80', unit: '+', label: '500强及行业龙头定制落地' },
      { value: '98.8', unit: '%', label: '跨部门协作共创满意度' },
      { value: '100', unit: '%', label: '现场输出可执行方案大纲' }
    ],
    past_cohorts: [
      {
        imageUrl: methodologyVisualImg,
        caption: '打破产研、市场、运营部门墙，建立跨职能创新的通用方法论语言',
        tag: '跨部门协同'
      },
      {
        imageUrl: workshopExecutiveImg,
        caption: '驻场实战工作坊：以企业年度战略级重大痛点为原型的共创冲刺推演',
        tag: '战略痛点冲刺'
      },
      {
        imageUrl: workshopMentoringImg,
        caption: '现场产出企业专属《产品创新行动白皮书》与落地工具包，赋能组织持续迭代',
        tag: '工具包沉淀'
      }
    ],
    testimonials: [
      {
        name: '高世奇',
        role: '组织发展与人力总监',
        company: '千亿级高端制造产业集团',
        avatar: avatarRdVp,
        comment: '洛可可团队深入我们业务一线调研了两周才定制方案。3天的内训彻底打通了产研与销售长期的沟通鸿沟，团队创新士气空前高涨！'
      },
      {
        name: '郑晓琳',
        role: '创新实验室负责人',
        company: '头部金融科技创新平台',
        avatar: avatarFemaleDir,
        comment: '过去办过很多培训往往流于形式，但洛可可把真实项目放上沙盘，现场产生方案并制定责任清单。这是我们这几年最值得的组织投资。'
      },
      {
        name: '韩敬尧',
        role: '轮值事业部总裁',
        company: '大型新能源科技领军企业',
        avatar: avatarMaleCeo,
        comment: '不仅教会了团队设计思维，更通过方法论导入重塑了业务线的产品研发流程。训后沉淀的工具包已成为我们全员培训的标准教程。'
      }
    ],
    enrollment_section: {
      title: '定制内训方案 · 预约驻场需求评估',
      cardTitle: '企业定制专属权益',
      subtitle: '根据企业所属行业与业务命题定向研发，专家 24 小时出具方案大纲。',
      formTitle: '在线定制需求',
      formSubtitle: '提交后 24 小时内由资深导师出具初步内训大纲。',
      formType: 'custom',
      ctaButtonText: '立即申请定制',
      benefits: [
        '企业核心痛点深度调研与关键决策者 1 对 1 访谈',
        '定制贴合行业属性的专属工作坊沙盘与实战剧本',
        '输出具备明确责任人与里程碑的项目行动方案',
        '训后 3 个月跟踪辅导机制与复训知识库长期授权'
      ]
    }
  }
};
