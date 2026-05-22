// 作品数据
// 图片放在 public/images/ 目录下
// MD 文件放在 public/md/ 目录下（文件名对应 id）

export interface Work {
  id: string;
  title: string;
  image: string;       // 图片路径，如 '/images/001.jpg'
  alt?: string;
  width?: number;       // 原图宽度，不填则在构建时自动获取
  height?: number;      // 原图高度
  bilibili?: string;    // B站动态ID，如 '732456789012345678'
  hasMd?: boolean;      // 是否有本地 MD 文件
}

// ★★★ 在这里添加/修改作品数据 ★★★
// 图片放在 public/images/ 目录下，命名如 001.jpg、002.png
// B站动态：填写动态ID（URL里的数字部分），不填则不关联
// MD文件：放在 public/md/ 目录下，命名如 001.md、002.md

export const works: Work[] = [
  {
    id: '1',
    title: 'Day1 小仓唯（ver.哥特）',
    image: '/images/d1_xcw.png',
    bilibili: '1192511284832108577',
  },
  {
    id: '4',
    title: 'Day4 露米大人x星临者',
    image: '/images/d4_露米.png',
    bilibili: '1193656606593646597',
  },
  {
    id: '5',
    title: 'Day5 是魔法师伊吹哦!',
    image: '/images/d5伊吹.png',
    bilibili: '1193982156516360212',
  },
  {
    id: '6',
    title: 'Day6 上课..?还是摸个鱼吧',
    image: '/images/d6羽安.png',
    bilibili: '1194260326504202240',
  },
  {
    id: '7',
    title: 'Day7 是可怜desu!!',
    image: '/images/d7可怜.png',
    bilibili: '1194651089047126024',
  },
  {
    id: '8',
    title: 'Day8 是谁把璐璐卡惹哭了啦!',
    image: '/images/d8璐璐卡.png',
    bilibili: '1195127014395215872',
  },
  {
    id: '9',
    title: 'Day9 是露露卡!',
    image: '/images/d9露露卡.png',
    bilibili: '1195362795185504261',
  },
  {
    id: '10',
    title: 'Day10 露露卡!金发魔法少女!',
    image: '/images/d10露露卡.png',
    bilibili: '1195754968669224965',
  },
  {
    id: '11',
    title: 'Day11 莉莉露露！',
    image: '/images/d11莉莉露露.png',
    bilibili: '1196123829079900164',
  },
  {
    id: '14',
    title: 'Day14 要和风堇一起睡午觉吗～',
    image: '/images/d14风堇.png',
    bilibili: '1197241010161188868',
  },
  {
    id: '15',
    title: 'Day15 是羽濑川小鸠！',
    image: '/images/d15小鸠.png',
    bilibili: '1197595293408821249',
  },
  {
    id: '17',
    title: 'Day17 雪风大人吶诺哒～！',
    image: '/images/d17雪风.png',
    bilibili: '1198398203195555864',
  },
  {
    id: '19',
    title: 'Day19 岛风！',
    image: '/images/d19岛风.png',
    bilibili: '1199099895666966532',
  },
  {
    id: '21',
    title: 'Day21 拉菲 兔兔偶像！',
    image: '/images/d21_拉菲.png',
    bilibili: '1199853810561843220',
  },
  {
    id: '22',
    title: 'Day22 咲希生日快乐～🎂',
    image: '/images/d22_咲希.png',
    bilibili: '1200211783200014337',
  },
  {
    id: '24',
    title: 'Day24 阿巴巴巴 我也要画画吗',
    image: '/images/d24_小混沌.png',
    bilibili: '1201015156855799814',
  },
  {
    id: '26',
    title: 'Day26 欢迎来到学园生活部～',
    image: '/images/d26由纪.png',
    hasMd: 'true',
  },
  {
    id: '29',
    title: 'Day29 星星的碎片～',
    image: '/images/d29诺艾尔.png',
    bilibili: '1202813536957366305',
  },
  {
    id: '32',
    title: 'day32 桐间纱路～',
    image: '/images/d32_纱路.png',
    bilibili: '1203985199737602049',
  },
  {
    id: '33',
    title: 'Day33 可爱小妖精',
    image: '/images/d33_普莉卡.png',
    bilibili: '1204360850469552149',
  },
  {
    id: '34',
    title: 'Day34 天江衣！',
    image: '/images/d34_衣.png',
    bilibili: '1204714811596734472',
  }
];