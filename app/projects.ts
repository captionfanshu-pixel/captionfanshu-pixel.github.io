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
};

export const projects: Project[] = [
  {
    id:'P01', slug:'spring-duck', title:'春游鸭先知', english:'SPRING OUTING', subtitle:'品牌春日视觉活动', category:'品牌视觉设计', year:'2024', role:'主视觉 / 电商 / 社交传播', image:'/projects/spring-duck.jpg', color:'#b7ff4a',
    summary:'以春游、户外与年轻社交为核心，把品牌鸭子角色带入明亮轻快的春日世界。',
    challenge:'在保持品牌识别的同时，为季节活动建立更鲜明、更容易传播的情绪记忆点。',
    approach:'以蓝天、草地和柔软三维角色构成主视觉，再将统一图形语言延展至详情页与移动端传播。',
    outcome:'形成从活动主画面到电商触点的完整视觉套系，让角色、产品与春游主题保持一致。',
    gallery:['/projects/spring-duck-1.jpg','/projects/spring-duck-2.jpg','/projects/spring-duck-3.jpg'],
  },
  {
    id:'P02', slug:'weilong', title:'卫龙联名活动', english:'WEILONG COLLAB', subtitle:'品牌联合营销视觉', category:'联名活动设计', year:'2024', role:'KV / 电商页面 / 传播物料', image:'/projects/weilong.jpg', color:'#ff5c35',
    summary:'围绕清爽与解腻的传播诉求，用强烈的产品冲击、冰感色彩和年轻化排版构建联名活动。',
    challenge:'在两套品牌视觉之间建立共同语言，并让促销信息与产品画面同时保持醒目。',
    approach:'以红蓝强对比、液体飞溅和粗体标题形成高能主视觉，再延展为多尺寸活动页面。',
    outcome:'完成可适配电商首页、社交传播和活动终端的统一联名视觉系统。',
    gallery:['/projects/weilong-1.jpg','/projects/weilong-2.jpg','/projects/weilong-3.jpg'],
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
    id:'P04', slug:'crayon-shin', title:'蜡笔小新商业系列', english:'CRAYON SHIN-CHAN', subtitle:'IP 衍生与空间设计', category:'商业 IP 设计', year:'2025', role:'衍生品 / 展陈 / 快闪空间', image:'/projects/crayon-shin.jpg', color:'#70d8ff',
    summary:'围绕蜡笔小新的轻松日常与角色魅力，完成多主题长图、衍生品和线下展陈视觉。',
    challenge:'在多种营销主题和空间尺寸中保持 IP 性格统一，同时让商品陈列足够清晰。',
    approach:'以高识别角色动作、彩色图形和模块化展架为核心，将线上内容与线下空间串联。',
    outcome:'形成覆盖内容传播、陈列道具、快闪空间与迷你店积木的系列化商业设计。',
    gallery:['/projects/crayon-shin-1.jpg','/projects/crayon-shin-2.jpg','/projects/crayon-shin-3.jpg','/projects/crayon-shin-4.jpg','/projects/crayon-shin-5.jpg'],
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
    summary:'以雪山探险为主题，用拟人动物角色与电影感冰雪场景构成活泼、亲切的三维主视觉。',
    challenge:'在多人角色同框的画面中兼顾角色辨识度、故事氛围与大标题的视觉冲击。',
    approach:'通过前后景层次、统一冬季服装和明亮冷暖对比，让角色群像保持清晰并强化雪山主题。',
    outcome:'完成一套适合活动封面与线上传播的雪山主题角色视觉。',
    gallery:['/work/project-04-cover-v2.webp'],
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

export const featuredProjects = projects.slice(0,4);

