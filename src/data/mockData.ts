import { Product, Review } from '../types';

// 模拟商品数据
export const mockProducts: Product[] = [
  {
    id: '1',
    name: '简约白色衬衫',
    price: 299,
    originalPrice: 399,
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20white%20cotton%20shirt%20for%20women%2C%20minimalist%20design%2C%20clean%20background%2C%20fashion%20photography&image_size=square_hd',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=white%20shirt%20detail%20view%2C%20fabric%20texture%2C%20buttons%20close%20up%2C%20professional%20photography&image_size=square_hd'
    ],
    category: '衬衫',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['白色', '米色'],
    description: '经典白色衬衫，采用优质棉质面料，简约设计适合多种场合搭配。',
    isNew: true,
    rating: 4.8,
    reviewCount: 156,
    stock: 50
  },
  {
    id: '2',
    name: '黑色修身连衣裙',
    price: 599,
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20black%20fitted%20dress%20for%20women%2C%20modern%20minimalist%20style%2C%20fashion%20photography%2C%20clean%20background&image_size=portrait_4_3',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=black%20dress%20back%20view%2C%20zipper%20detail%2C%20professional%20fashion%20photography&image_size=portrait_4_3'
    ],
    category: '连衣裙',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['黑色'],
    description: '修身剪裁连衣裙，展现优雅女性魅力，适合商务和约会场合。',
    isHot: true,
    rating: 4.9,
    reviewCount: 203,
    stock: 30
  },
  {
    id: '3',
    name: '针织开衫外套',
    price: 459,
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=cozy%20knit%20cardigan%20sweater%20for%20women%2C%20soft%20texture%2C%20neutral%20colors%2C%20fashion%20photography&image_size=square_hd'
    ],
    category: '外套',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['米色', '灰色', '深蓝色'],
    description: '柔软针织开衫，舒适保暖，是秋冬季节的完美选择。',
    rating: 4.6,
    reviewCount: 89,
    stock: 25
  },
  {
    id: '4',
    name: '高腰牛仔裤',
    price: 399,
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=high%20waist%20denim%20jeans%20for%20women%2C%20classic%20blue%20color%2C%20modern%20fit%2C%20fashion%20photography&image_size=portrait_4_3'
    ],
    category: '裤装',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['深蓝色', '浅蓝色'],
    description: '经典高腰牛仔裤，修饰腿型，百搭实用。',
    isNew: true,
    rating: 4.7,
    reviewCount: 134,
    stock: 40
  }
];

// 模拟评价数据
export const mockReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: '小美',
    rating: 5,
    content: '质量很好，穿着很舒服，尺码标准。',
    createdAt: '2024-01-15',
    size: 'M',
    color: '白色'
  },
  {
    id: '2',
    userId: 'user2',
    userName: '时尚达人',
    rating: 4,
    content: '款式很喜欢，面料也不错，就是价格稍微贵了一点。',
    createdAt: '2024-01-10',
    size: 'S',
    color: '白色'
  },
  {
    id: '3',
    userId: 'user3',
    userName: '购物小达人',
    rating: 5,
    content: '非常满意的一次购物，衣服质量超出预期！',
    createdAt: '2024-01-08',
    size: 'L',
    color: '米色'
  }
];

// 轮播图数据
export const bannerData = [
  {
    id: '1',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=fashion%20banner%20for%20women%20clothing%20store%2C%20elegant%20model%20wearing%20white%20shirt%2C%20minimalist%20style%2C%20professional%20photography&image_size=landscape_16_9',
    title: '新品上市',
    subtitle: '简约时尚，品质生活',
    link: '/products'
  },
  {
    id: '2',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=winter%20fashion%20collection%20banner%2C%20cozy%20knitwear%20and%20outerwear%2C%20warm%20colors%2C%20lifestyle%20photography&image_size=landscape_16_9',
    title: '冬季系列',
    subtitle: '温暖舒适，时尚保暖',
    link: '/products?category=外套'
  },
  {
    id: '3',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=special%20offer%20fashion%20banner%2C%20discount%20sale%20for%20women%20clothing%2C%20elegant%20design%2C%20promotional%20style&image_size=landscape_16_9',
    title: '限时优惠',
    subtitle: '精选商品，特价促销',
    link: '/sale'
  }
];

// 商品分类数据
export const categories = [
  { id: '1', name: '衬衫', count: 45 },
  { id: '2', name: '连衣裙', count: 32 },
  { id: '3', name: '外套', count: 28 },
  { id: '4', name: '裤装', count: 38 },
  { id: '5', name: '配饰', count: 15 }
];