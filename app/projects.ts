export type Project = {
  id: string;
  slug: string;
  title: string;
  english: string;
  subtitle: string;
  category: string;
  year: string;
  role: string;
  image: string;
  color: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  gallery: string[];
  objectiveTitle?: string;
  objectiveSummary?: string;
  objectives?: { title: string; description: string }[];
};

export const projects: Project[] = [
  {
    id:'P01', slug:'spring-duck', title:'春游鸭上新', english:'SPRING OUTING', subtitle:'品牌春日视觉活动', category:'品牌视觉设计', year:'2024', role:'主视觉 / 电商 / 社交传播', image:'/projects/spring-duck.jpg', color:'#b7ff4a',
    summary:'以春游、户外与年轻社交为核心，把品牌鸭子角色带入明亮轻快的春日世界。',
    challenge:'在保持品牌识别的同时，为季节活动建立更鲜明、更容易传播的情绪记忆点。',
    approach:'以蓝天、草地和柔软三维角色构成主视觉，再将统一图形语言延展至详情页与移动端传播。',
    outcome:'形成从活动主画面到电商触点的完整视觉套系，让角色、产品与春游主题保持一致。',
    gallery:['/projects/spring-duck-1.jpg','/projects/spring-duck-2.jpg','/projects/spring-duck-3.jpg'],
    objectiveTitle:'明确目标，建立统一且具有春日记忆点的视觉表达。',
    objectiveSummary:'围绕“春游鸭”主题，从活动识别、信息传播与场景延展三个维度建立统一视觉体系，让角色、产品与春日氛围形成完整关联。',
    objectives:[
      { title:'强化活动识别', description:'以小黄鸭角色、春日色彩与户外元素建立鲜明的主题视觉记忆，使消费者能够快速识别“春游鸭”活动内容，并与品牌形成稳定关联。' },
      { title:'提升信息传播效率', description:'通过清晰的视觉层级与重点信息强化，让消费者快速理解活动主题、新品信息与核心卖点，提升线上传播中的阅读效率与视觉吸引力。' },
      { title:'支持多场景延展', description:'建立可持续延展的视觉语言，使主题角色、色彩与图形元素能够灵活应用于电商页面、活动物料及线下场景，保持不同触点的视觉一致性。' },
    ],
  },
  {
    id:'P02', slug:'weilong', title:'卫龙联名活动', english:'WEILONG COLLAB', subtitle:'品牌联合营销视觉', category:'联名活动设计', year:'2024', role:'KV / 电商页面 / 传播物料', image:'/projects/weilong.jpg', color:'#ff5c35',
    summary:'林里柠檬茶与卫龙围绕年轻消费群体展开联名合作，希望借助双方鲜明的品牌个性与产品特征，打造具有话题性和传播力的新品活动。设计需要在保留林里清爽活力调性的同时，融入卫龙“爆辣、趣味、强记忆”的品牌特征，让消费者快速感知联名关系与产品差异。',
    challenge:'在保留林里清爽活力调性的同时，融入卫龙“爆辣、趣味、强记忆”的品牌特征，让消费者快速感知联名关系与产品差异。',
    approach:'通过高识别度色彩、强对比构图与角色互动强化视觉记忆，并将统一语言延展至主视觉、电商页面及活动物料。',
    outcome:'使联名从单一产品合作转化为更具参与感和传播性的品牌体验。',
    gallery:['/projects/weilong-1.jpg','/projects/weilong-2.jpg','/projects/weilong-3.jpg'],
    objectiveTitle:'围绕“清爽 × 爆辣”的反差体验，建立兼具双方品牌识别度的联名视觉体系。',
    objectiveSummary:'通过高识别度色彩、强对比构图与角色互动强化视觉记忆，并将统一语言延展至主视觉、电商页面及活动物料，使联名从单一产品合作转化为更具参与感和传播性的品牌体验。',
    objectives:[
      { title:'融合品牌识别', description:'提取林里清爽活力与卫龙爆辣趣味的核心特征，在保持双方辨识度的基础上建立统一的联名视觉语言。' },
      { title:'强化联名记忆', description:'利用高对比色彩、夸张视觉符号与角色互动强化“清爽 × 爆辣”的反差感，让消费者快速感知联名主题与产品卖点。' },
      { title:'支持传播延展', description:'建立可灵活应用的视觉系统，使核心元素能够延展至KV、电商页面、宣传物料及线下活动，在不同传播触点中保持一致。' },
    ],
  },
  {
    id:'P03', slug:'bitter-melon', title:'清火苦瓜轻蔬茶', english:'BITTER MELON TEA', subtitle:'新品上市整合视觉', category:'新品上市', year:'2024', role:'主视觉 / 卖点表达 / 电商', image:'/projects/bitter-melon.jpg', color:'#86f26b',
    summary:'把苦瓜的健康属性转译为清爽、有记忆点的新品视觉，强化轻负担与夏日饮用场景。',
    challenge:'在避免传统健康食品印象的同时，准确传达苦瓜与轻蔬茶的核心卖点。',
    approach:'运用低饱和奶油底色、清透绿色和放大的原料细节，建立年轻化的健康饮品形象。',
    outcome:'建立从新品 KV 到电商页面的清晰信息层级，兼顾产品识别、口味表达与促销传播。',
    gallery:['/projects/bitter-melon-1.jpg','/projects/bitter-melon-2.jpg','/projects/bitter-melon-3.jpg'],
  },
  {
    id:'P03-1', slug:'linlee-mini-store', title:'林里迷你门店', english:'LINLEE MINI STORE', subtitle:'品牌空间概念视觉', category:'品牌视觉设计', year:'2025', role:'空间概念 / 3D 视觉 / 品牌延展', image:'/projects/linlee-mini-store.jpg', color:'#9be23d',
    summary:'随着茶饮品牌竞争从产品本身延伸至品牌体验与内容传播，传统静态周边较难持续激发用户参与。林里希望通过更具互动性和收藏属性的衍生产品，将消费者熟悉的门店、店员与品牌元素转化为可拼装的积木场景，在延续品牌识别的同时，拓展茶饮之外的互动与社交场景。',
    challenge:'传统静态周边较难持续激发用户参与，需要在延续品牌识别的同时，把门店、店员与产品元素转化为具有互动性和收藏属性的衍生体验。',
    approach:'将真实门店、店员形象与品牌视觉拆解为模块化积木语言，通过统一结构与标志元素建立可拼装、可组合并可持续扩展的品牌场景。',
    outcome:'兼顾产品展示、包装传播与后续系列化延展，让消费者在拼装过程中重新体验品牌场景。',
    gallery:['/projects/linlee-mini-store.jpg'],
    objectiveTitle:'以“林里迷你门店”为核心，将品牌场景转化为具有可玩性与收藏感的积木产品。',
    objectiveSummary:'通过模块化结构和统一的品牌元素，让消费者能够在拼装过程中重新体验品牌场景，同时兼顾产品展示、包装传播与后续系列化延展的可能性。',
    objectives:[
      { title:'强化品牌识别', description:'提取门店造型、品牌Logo、员工服饰与标志性色彩，将真实品牌触点转化为具有辨识度的积木语言。' },
      { title:'提升互动体验', description:'将传统静态周边转化为可拼装、可组合的互动产品，让消费者通过搭建过程增强对品牌场景的参与感与记忆。' },
      { title:'建立衍生体系', description:'采用模块化设计逻辑，使门店、角色、陈列与产品元素能够持续扩展，为后续系列角色与场景开发预留空间。' },
    ],
  },
  {
    id:'P04', slug:'crayon-shin', title:'蜡笔小新商业系列', english:'CRAYON SHIN-CHAN', subtitle:'IP 衍生与空间设计', category:'商业 IP 设计', year:'2025', role:'衍生品 / 展陈 / 快闪空间', image:'/projects/crayon-shin.jpg', color:'#70d8ff',
    summary:'围绕蜡笔小新的轻松日常与角色魅力，完成多主题长图、衍生品和线下展陈视觉。',
    challenge:'在多种营销主题和空间尺寸中保持 IP 性格统一，同时让商品陈列足够清晰。',
    approach:'以高识别角色动作、彩色图形和模块化展架为核心，将线上内容与线下空间串联。',
    outcome:'形成覆盖内容传播、陈列道具、快闪空间与迷你店积木的系列化商业设计。',
    gallery:['/projects/crayon-shin-1.jpg','/projects/crayon-shin-2.jpg','/projects/crayon-shin-3.jpg','/projects/crayon-shin-4.jpg','/projects/crayon-shin-5.jpg'],
  },
  {
    id:'P04-1', slug:'crayon-jar-flavor', title:'罐罐有味', english:'CRAYON SHIN-CHAN JAR SERIES', subtitle:'蜡笔小新联名产品视觉', category:'品牌视觉设计', year:'2026', role:'主视觉 / 电商 Banner / IP 延展', image:'/projects/crayon-jar-flavor.jpg', color:'#ff5959',
    summary:'围绕蜡笔小新春日部防卫队角色，打造轻松有趣的罐装产品推荐视觉，强化角色互动与商品记忆点。',
    challenge:'在有限的横版画面中兼顾角色表现、产品卖点与授权信息，让内容清楚且具有吸引力。',
    approach:'以红粉色场景、夸张角色表情和罐装造型为视觉核心，建立活泼鲜明的联名传播画面。',
    outcome:'建立兼具 IP 趣味与商品信息传达的详情页体系，使角色吸引力与产品卖点形成统一的消费视觉体验。',
    gallery:['/projects/crayon-jar-flavor.jpg'],
    objectiveTitle:'明确目标，建立童趣鲜明且易于理解的商品视觉表达。',
    objectiveSummary:'围绕角色识别、卖点传达与版式统一三个维度展开，让视觉兼具趣味性、商品感与传播效率。',
    objectives:[
      { title:'强化角色识别', description:'通过蜡笔小新的高辨识度角色形象与活泼表情，增强产品记忆点与 IP 联名感。' },
      { title:'优化卖点表达', description:'将口味、产品形态与核心信息进行视觉化呈现，让消费者快速理解产品特色与购买理由。' },
      { title:'统一页面语言', description:'统一角色、色彩、版式与产品元素，保持详情页各模块之间的视觉一致性与阅读节奏。' },
    ],
  },
  {
    id:'P04-2', slug:'sanrio-magic-fruit', title:'幻变果粒', english:'SANRIO MAGIC FRUIT', subtitle:'三丽鸥角色联名视觉', category:'品牌视觉设计', year:'2026', role:'主视觉 / 产品卖点 / 电商 Banner', image:'/projects/sanrio-magic-fruit.jpg', color:'#c9a0ff',
    summary:'以三丽鸥角色与透明果粒概念结合，营造柔软梦幻的产品氛围，突出轻盈、可爱与收藏感。',
    challenge:'在浅色梦幻画面中保持产品主体清晰，并让角色授权信息与促销卖点拥有明确层级。',
    approach:'运用紫粉渐变、透明泡泡和柔和云朵构建空间，通过集中构图放大产品与角色识别。',
    outcome:'建立从主视觉、角色展示到产品信息的完整详情页视觉体系，使 IP 情绪与商品卖点保持统一表达。',
    gallery:['/projects/sanrio-magic-fruit.jpg'],
    objectiveTitle:'明确目标，建立梦幻治愈且具有商品记忆点的视觉表达。',
    objectiveSummary:'围绕 IP 气质、产品卖点与浏览体验三个维度展开，让视觉兼具情绪吸引力、信息清晰度与商品延展性。',
    objectives:[
      { title:'强化 IP 气质', description:'通过粉紫色调、云朵、星空与柔和光感延续三丽鸥梦幻治愈的角色氛围，增强用户对产品的第一印象。' },
      { title:'突出产品卖点', description:'将水果元素、角色形象与产品信息进行视觉融合，让消费者快速理解商品特点与系列差异。' },
      { title:'提升浏览体验', description:'通过统一版式、清晰层级与场景化表达，使详情页兼顾可读性、沉浸感与视觉连续性。' },
    ],
  },
  {
    id:'P04-3', slug:'crayon-finger-football', title:'指偶足球联赛', english:'FINGER PUPPET FOOTBALL', subtitle:'蜡笔小新夏日产品视觉', category:'品牌视觉设计', year:'2026', role:'主视觉 / 活动主题 / 电商 Banner', image:'/projects/crayon-finger-football.jpg', color:'#62d6ff',
    summary:'以夏日足球联赛为主题，将蜡笔小新角色指偶融入球场场景，呈现轻松热闹的互动产品体验。',
    challenge:'同时表达角色趣味、产品形态与比赛主题，让小尺寸 Banner 仍保持清晰的视觉焦点。',
    approach:'采用清爽蓝色、球场透视和庆典彩带强化运动气氛，以双角色对比形成画面中心。',
    outcome:'建立适合电商 Banner、活动宣传与系列产品延展的夏日联名视觉。',
    gallery:['/projects/crayon-finger-football.jpg'],
    objectiveTitle:'明确目标，建立活力有趣且具参与感的互动视觉表达。',
    objectiveSummary:'围绕角色互动、使用场景与页面节奏三个维度展开，让用户快速感知产品玩法与趣味属性。',
    objectives:[
      { title:'强化互动感', description:'通过角色动作、足球元素与情境化表达，让静态指偶产品呈现更强的互动性与趣味性。' },
      { title:'建立使用场景', description:'将角色放入春日球场与游戏情境中，帮助消费者直观理解产品玩法与使用方式。' },
      { title:'营造活力氛围', description:'通过高明度绿色、蓝色及卡通图形建立轻松活泼的视觉节奏，强化年轻化与运动感。' },
    ],
  },
  {
    id:'P05', slug:'veggie-kingdom', title:'Veggie Kingdom', english:'RACING CLUB', subtitle:'原创赛车王国 IP', category:'原创 IP 设计', year:'2025', role:'角色设定 / 3D 视觉 / 衍生品', image:'/projects/veggie-kingdom.jpg', color:'#ff8f3d',
    summary:'由七位蔬果赛车手组成的原创世界，以速度、勇气与梦想构建轻松明快的角色群像。',
    challenge:'让多个角色拥有独立性格与轮廓，同时共享同一套赛车世界观和品牌识别。',
    approach:'从角色剪影、车辆造型与主题色出发，延展至海报、贴纸、证件卡和收藏型周边。',
    outcome:'完成可持续扩展的原创 IP 基础系统，为后续故事内容与商业衍生提供统一资产。',
    gallery:['/projects/veggie-kingdom-1.jpg','/projects/veggie-kingdom-2.jpg','/projects/veggie-kingdom-3.jpg','/projects/veggie-kingdom-4.jpg','/projects/veggie-kingdom-5.jpg'],
  },
  {
    id:'P06', slug:'summy-dessert', title:'Summy Dessert', english:'SUMMER DESSERT', subtitle:'原创甜品店 IP', category:'原创 IP 设计', year:'2025', role:'世界观 / 角色 / 包装与场景', image:'/projects/summy-dessert.jpg', color:'#b68cff',
    summary:'以一家夏日甜品店为舞台，塑造不同职业与性格的动物角色，建立温暖的品牌故事。',
    challenge:'让角色群像既能独立用于传播，又能共同支撑完整的甜品店空间与产品体验。',
    approach:'统一三维比例、服装语言与暖色光影，再延展到角色卡、包装、店铺场景和户外广告。',
    outcome:'形成从角色设定到商业空间想象的完整原创 IP 提案，具备系列化开发潜力。',
    gallery:['/projects/summy-dessert-1.jpg','/projects/summy-dessert-2.jpg','/projects/summy-dessert-3.jpg','/projects/summy-dessert-4.jpg','/projects/summy-dessert-5.jpg','/projects/summy-dessert-6.jpg'],
  },
  {
    id:'P07', slug:'snow-online', title:'雪山 ONLINE', english:'SNOW ONLINE', subtitle:'雪山动物角色视觉', category:'3D 视觉设计', year:'2025', role:'角色视觉 / 场景 / 主视觉', image:'/work/project-04-cover-v2.webp', color:'#f3a46f',
    summary:'围绕“10086个 online 时刻”的赛事主题，将“雪山登顶”这一具有挑战感和情绪张力的瞬间作为故事核心。通过不同角色身处雪山、居家、海边及办公等场景的交叉叙事，表现数字连接如何跨越空间，让原本属于一个人的冒险，被远方的伙伴共同看见、回应与分享，呼应中国移动作为“数字生活伙伴”陪伴用户重要时刻的品牌角色。',
    challenge:'将赛事中的“always online”从抽象功能概念转化为可感知的情绪体验，同时让多场景叙事、角色关系与品牌价值保持清晰。',
    approach:'通过登山挑战、信号连接、好友响应与最终共同见证登顶的故事递进，结合视频通话、在线状态与多场景切换强化“Online”概念。',
    outcome:'完成一套适合活动封面与线上传播的雪山主题角色视觉。',
    gallery:['/work/project-04-cover-v2.webp'],
    objectiveTitle:'明确目标，让一次登顶成为大家共同在线的时刻。',
    objectiveSummary:'围绕情绪共鸣、数字连接与品牌陪伴三个维度展开，让“Online”从功能概念转化为具有温度的生活体验。',
    objectives:[
      { title:'建立情绪共鸣', description:'以雪山登顶作为故事高潮，通过挑战与陪伴的情绪递进，让用户感受到重要时刻被共同见证的价值。' },
      { title:'强化 Online 概念', description:'将视频连线、在线状态与多场景互动融入剧情，使网络连接成为推动故事发展的核心线索。' },
      { title:'自然融入品牌价值', description:'通过跨场景连接体现中国移动“数字生活伙伴”的陪伴属性，让品牌能力自然服务于故事与人物关系。' },
    ],
  },
  {
    id:'P08', slug:'sunny-restaurant', title:'晴日餐厅', english:'SUNNY RESTAURANT', subtitle:'原创餐厅 IP 视觉', category:'原创 IP 设计', year:'2025', role:'角色 / 场景 / 品牌主视觉', image:'/work/project-05-cover-v2.webp', color:'#8c77ff',
    summary:'以温暖的晴日餐厅为背景，通过拟人猫咪店员与柔和光影建立轻松治愈的品牌气质。',
    challenge:'让角色、餐厅空间与品牌标识在同一画面中形成明确层级，同时保留生活感与故事感。',
    approach:'运用暖色木质场景、自然逆光和统一制服造型，塑造具有亲和力的餐厅角色世界。',
    outcome:'形成可延展到海报、菜单、包装和社交传播的原创餐厅 IP 主视觉。',
    gallery:['/work/project-05-cover-v2.webp'],
  },
];

// The console cartridges have a fixed visual order:
// orange Veggie Kingdom, blue collaboration, green Spring Duck, red Crayon Shin-chan.
const featuredSlugs = ['veggie-kingdom', 'weilong', 'spring-duck', 'crayon-shin'];
export const featuredProjects = featuredSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is Project => Boolean(project));

