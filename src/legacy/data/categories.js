export const equipmentCategories = [
  {
    id: 'earthmoving',
    name: 'Землеройная техника',
    nameEn: 'Earthmoving Equipment',
    icon: '🚜',
    popular: true,
    subcategories: [
      { id: 'track-excavators', name: 'Гусеничные экскаваторы', nameEn: 'Track Excavators' },
      { id: 'wheeled-excavators', name: 'Колёсные экскаваторы', nameEn: 'Wheeled Excavators' },
      { id: 'mini-excavators', name: 'Мини-экскаваторы', nameEn: 'Mini Excavators' },
      { id: 'backhoe-loaders', name: 'Экскаваторы-погрузчики', nameEn: 'Backhoe Loaders' },
      { id: 'bulldozers', name: 'Бульдозеры', nameEn: 'Bulldozers' },
      { id: 'trenchers', name: 'Траншеекопатели', nameEn: 'Trenchers' },
    ]
  },
  {
    id: 'lifting',
    name: 'Грузоподъёмная техника',
    nameEn: 'Lifting Equipment',
    icon: '🏗',
    popular: true,
    subcategories: [
      { id: 'mobile-cranes', name: 'Автокраны', nameEn: 'Mobile Cranes' },
      { id: 'tower-cranes', name: 'Башенные краны', nameEn: 'Tower Cranes' },
      { id: 'loader-cranes', name: 'Краны-манипуляторы', nameEn: 'Loader Cranes' },
      { id: 'mini-cranes', name: 'Мини-краны', nameEn: 'Mini Cranes' },
      { id: 'crawler-cranes', name: 'Гусеничные краны', nameEn: 'Crawler Cranes' },
    ]
  },
  {
    id: 'transport',
    name: 'Транспортная техника',
    nameEn: 'Transport Equipment',
    icon: '🚚',
    popular: true,
    subcategories: [
      { id: 'dump-trucks', name: 'Самосвалы', nameEn: 'Dump Trucks' },
      { id: 'lowboys', name: 'Тралы', nameEn: 'Lowboy Trailers' },
      { id: 'flatbed-trucks', name: 'Бортовые машины', nameEn: 'Flatbed Trucks' },
      { id: 'concrete-mixers', name: 'Бетономешалки', nameEn: 'Concrete Mixers' },
      { id: 'semi-trailers', name: 'Тонары', nameEn: 'Semi Trailers' },
    ]
  },
  {
    id: 'road',
    name: 'Дорожная техника',
    nameEn: 'Road Construction',
    icon: '🛣',
    popular: false,
    subcategories: [
      { id: 'pavers', name: 'Асфальтоукладчики', nameEn: 'Asphalt Pavers' },
      { id: 'rollers', name: 'Катки', nameEn: 'Road Rollers' },
      { id: 'graders', name: 'Грейдеры', nameEn: 'Motor Graders' },
      { id: 'milling-machines', name: 'Фрезы дорожные', nameEn: 'Milling Machines' },
    ]
  },
  {
    id: 'agricultural',
    name: 'Сельхозтехника',
    nameEn: 'Agricultural Equipment',
    icon: '🌾',
    popular: false,
    subcategories: [
      { id: 'tractors', name: 'Тракторы', nameEn: 'Tractors' },
      { id: 'combines', name: 'Комбайны', nameEn: 'Combine Harvesters' },
      { id: 'sprayers', name: 'Опрыскиватели', nameEn: 'Sprayers' },
      { id: 'balers', name: 'Пресс-подборщики', nameEn: 'Balers' },
    ]
  },
  {
    id: 'aerial',
    name: 'Подъёмники / Высотные работы',
    nameEn: 'Aerial Equipment',
    icon: '⬆️',
    popular: false,
    subcategories: [
      { id: 'scissor-lifts', name: 'Ножничные подъёмники', nameEn: 'Scissor Lifts' },
      { id: 'boom-lifts', name: 'Коленчатые подъёмники', nameEn: 'Boom Lifts' },
      { id: 'telescopic-lifts', name: 'Телескопические подъёмники', nameEn: 'Telescopic Lifts' },
      { id: 'bucket-trucks', name: 'Автовышки', nameEn: 'Bucket Trucks' },
    ]
  },
  {
    id: 'concrete',
    name: 'Бетонное оборудование',
    nameEn: 'Concrete Equipment',
    icon: '🏗',
    popular: false,
    subcategories: [
      { id: 'concrete-pumps', name: 'Бетононасосы', nameEn: 'Concrete Pumps' },
      { id: 'mobile-plants', name: 'Мобильные бетонные заводы', nameEn: 'Mobile Concrete Plants' },
      { id: 'compactors', name: 'Виброплиты и виброкатки', nameEn: 'Plate Compactors' },
      { id: 'generators', name: 'Строительные генераторы', nameEn: 'Generators' },
    ]
  }
];

export const workTypes = [
  { id: 'excavation', name: 'Выкопать котлован / фундамент', nameEn: 'Excavation / Foundation' },
  { id: 'grading', name: 'Планировка участка', nameEn: 'Grading / Site Preparation' },
  { id: 'demolition', name: 'Демонтаж / снос', nameEn: 'Demolition' },
  { id: 'trenching', name: 'Рытьё траншеи', nameEn: 'Trenching' },
  { id: 'hauling', name: 'Вывоз грунта', nameEn: 'Material Hauling' },
  { id: 'installation', name: 'Монтаж конструкций', nameEn: 'Installation / Assembly' },
  { id: 'concrete', name: 'Заливка бетона', nameEn: 'Concrete Work' },
  { id: 'road-work', name: 'Дорожные работы', nameEn: 'Road Construction' },
  { id: 'other', name: 'Другое', nameEn: 'Other' },
];

export const serviceRadiusOptions = [
  { value: 25, label: '25 miles', description: 'Fast - usually same day' },
  { value: 50, label: '50 miles', description: 'Recommended', recommended: true },
  { value: 75, label: '75 miles', description: 'Extended coverage' },
  { value: 100, label: '100 miles', description: 'Wide area' },
  { value: 150, label: '150 miles', description: 'Regional' },
  { value: 200, label: '200 miles', description: 'Maximum range' },
];
