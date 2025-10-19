import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedOrientation, setSelectedOrientation] = useState('vertical');
  const [selectedShape, setSelectedShape] = useState('classic');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedMaterial, setSelectedMaterial] = useState('black-granite');

  const monumentOrientations = [
    { id: 'vertical', name: 'Вертикальные', icon: 'RectangleVertical' },
    { id: 'horizontal', name: 'Горизонтальные', icon: 'RectangleHorizontal' },
  ];

  const monumentShapes = [
    { id: 'classic', name: 'Классическая', icon: 'Square' },
    { id: 'arch', name: 'Арочная', icon: 'ArchiveRestore' },
    { id: 'rounded', name: 'Скруглённая', icon: 'Circle' },
    { id: 'cross', name: 'Крест', icon: 'Plus' },
  ];

  const monumentSizes = [
    { id: 'small', name: 'Малая', dimensions: '80×40×5 см', price: '15 000' },
    { id: 'medium', name: 'Средняя', dimensions: '100×50×5 см', price: '25 000' },
    { id: 'large', name: 'Большая', dimensions: '120×60×8 см', price: '40 000' },
  ];

  const materials = [
    { id: 'black-granite', name: 'Чёрный гранит', color: '#1a1a1a' },
    { id: 'gray-granite', name: 'Серый гранит', color: '#5a5a5a' },
    { id: 'red-granite', name: 'Красный гранит', color: '#8b4545' },
  ];

  const galleryItems = [
    { id: 1, image: 'https://cdn.poehali.dev/projects/a972bc37-a8fd-483e-b573-f52aa6f2509f/files/43d25b10-876c-4b04-ac32-2196ee65ed01.jpg', title: 'Классический памятник' },
    { id: 2, image: 'https://cdn.poehali.dev/projects/a972bc37-a8fd-483e-b573-f52aa6f2509f/files/66b6c578-8c36-4da8-a0c0-947f3a5d4861.jpg', title: 'Парковая галерея' },
    { id: 3, image: 'https://cdn.poehali.dev/projects/a972bc37-a8fd-483e-b573-f52aa6f2509f/files/f10b4272-42fb-4968-ac61-2deea92e08db.jpg', title: 'Портретная гравировка' },
  ];

  const services = [
    { icon: 'ImagePlus', title: 'Профессиональная ретушь', desc: 'Обработка фотографий для гравировки любой сложности' },
    { icon: 'Hammer', title: 'Изготовление', desc: 'Собственное производство памятников из гранита' },
    { icon: 'Truck', title: 'Доставка и установка', desc: 'Доставка по всей России и профессиональный монтаж' },
    { icon: 'FileText', title: 'Гравировка', desc: 'Лазерная и ручная гравировка текста и изображений' },
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Гранит Мемориал</h1>
            <div className="hidden md:flex gap-6">
              {['home', 'constructor', 'gallery', 'catalog', 'services', 'about', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="hover:text-accent transition-colors capitalize"
                >
                  {section === 'home' && 'Главная'}
                  {section === 'constructor' && 'Конструктор'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'services' && 'Услуги'}
                  {section === 'about' && 'О компании'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/70 z-10" />
        <img 
          src="https://cdn.poehali.dev/projects/a972bc37-a8fd-483e-b573-f52aa6f2509f/files/66b6c578-8c36-4da8-a0c0-947f3a5d4861.jpg" 
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4 animate-fade-in">
          <h2 className="text-6xl md:text-7xl font-bold mb-6">Вечная память</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Изготовление памятников из натурального гранита с профессиональной ретушью фотографий
          </p>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg"
            onClick={() => scrollToSection('constructor')}
          >
            Создать памятник
          </Button>
        </div>
      </section>

      <section id="constructor" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4">Конструктор памятников</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Создайте уникальный памятник онлайн</p>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8 animate-fade-in">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Ориентация</h3>
                <div className="grid grid-cols-2 gap-4">
                  {monumentOrientations.map((orientation) => (
                    <Card 
                      key={orientation.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedOrientation === orientation.id ? 'ring-2 ring-accent' : ''
                      }`}
                      onClick={() => setSelectedOrientation(orientation.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <Icon name={orientation.icon} size={48} className="mx-auto mb-3 text-primary" />
                        <p className="font-medium">{orientation.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Форма памятника</h3>
                <div className="grid grid-cols-2 gap-4">
                  {monumentShapes.map((shape) => (
                    <Card 
                      key={shape.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedShape === shape.id ? 'ring-2 ring-accent' : ''
                      }`}
                      onClick={() => setSelectedShape(shape.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <Icon name={shape.icon} size={48} className="mx-auto mb-3 text-primary" />
                        <p className="font-medium">{shape.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Размер</h3>
                <div className="space-y-3">
                  {monumentSizes.map((size) => (
                    <Card 
                      key={size.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedSize === size.id ? 'ring-2 ring-accent' : ''
                      }`}
                      onClick={() => setSelectedSize(size.id)}
                    >
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{size.name}</p>
                          <p className="text-sm text-muted-foreground">{size.dimensions}</p>
                        </div>
                        <p className="text-xl font-bold text-accent">{size.price} ₽</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Материал</h3>
                <div className="grid grid-cols-3 gap-4">
                  {materials.map((material) => (
                    <Card 
                      key={material.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedMaterial === material.id ? 'ring-2 ring-accent' : ''
                      }`}
                      onClick={() => setSelectedMaterial(material.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <div 
                          className="w-16 h-16 mx-auto mb-3 rounded-lg shadow-md"
                          style={{ backgroundColor: material.color }}
                        />
                        <p className="text-sm font-medium">{material.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center animate-scale-in">
              <Card className="w-full max-w-md">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-center">Предварительный просмотр</h3>
                  <div className="aspect-[3/4] bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg shadow-2xl mb-6 flex items-center justify-center">
                    <div 
                      className={`bg-gradient-to-b ${
                        selectedMaterial === 'black-granite' ? 'from-gray-800 to-gray-950' :
                        selectedMaterial === 'gray-granite' ? 'from-gray-500 to-gray-700' :
                        'from-red-900 to-red-950'
                      } ${
                        selectedShape === 'classic' ? 'rounded-lg' :
                        selectedShape === 'arch' ? 'rounded-t-full' :
                        selectedShape === 'rounded' ? 'rounded-3xl' :
                        'clip-path-cross'
                      } ${
                        selectedOrientation === 'vertical' 
                          ? selectedSize === 'small' ? 'w-32 h-48' :
                            selectedSize === 'medium' ? 'w-40 h-56' :
                            'w-48 h-64'
                          : selectedSize === 'small' ? 'w-48 h-32' :
                            selectedSize === 'medium' ? 'w-56 h-40' :
                            'w-64 h-48'
                      } shadow-xl transition-all duration-300`}
                    />
                  </div>
                  <div className="space-y-3 text-center">
                    <p className="text-lg">
                      <span className="font-semibold">Ориентация:</span> {monumentOrientations.find(o => o.id === selectedOrientation)?.name}
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold">Форма:</span> {monumentShapes.find(s => s.id === selectedShape)?.name}
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold">Размер:</span> {monumentSizes.find(s => s.id === selectedSize)?.name}
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold">Материал:</span> {materials.find(m => m.id === selectedMaterial)?.name}
                    </p>
                    <p className="text-3xl font-bold text-accent mt-4">
                      {monumentSizes.find(s => s.id === selectedSize)?.price} ₽
                    </p>
                    <Button className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                      Оформить заказ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4">Галерея работ</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Наши завершённые проекты</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {galleryItems.map((item, index) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-72 object-cover hover:scale-105 transition-transform duration-300"
                />
                <CardContent className="p-4">
                  <p className="font-semibold text-lg">{item.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4">Каталог</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Готовые решения для разных бюджетов</p>
          
          <Tabs defaultValue="vertical-simple" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8 gap-2">
              <TabsTrigger value="vertical-simple" className="text-xs md:text-sm">Вертикальные</TabsTrigger>
              <TabsTrigger value="horizontal-simple" className="text-xs md:text-sm">Горизонтальные</TabsTrigger>
              <TabsTrigger value="vertical-carved" className="text-xs md:text-sm">Резные верт.</TabsTrigger>
              <TabsTrigger value="horizontal-carved" className="text-xs md:text-sm">Резные гориз.</TabsTrigger>
              <TabsTrigger value="cross" className="text-xs md:text-sm">Кресты</TabsTrigger>
              <TabsTrigger value="angel" className="text-xs md:text-sm">Ангелы</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vertical-simple" className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                { name: 'Вертикальный "Классика 1"', price: '25 000', desc: 'Чёрный гранит, 100×50×5 см', material: 'black-granite', shape: 'classic' },
                { name: 'Вертикальный "Классика 2"', price: '35 000', desc: 'Чёрный гранит, 120×60×8 см', material: 'black-granite', shape: 'classic' },
                { name: 'Вертикальный "Элегант"', price: '28 000', desc: 'Серый гранит, 110×55×5 см', material: 'gray-granite', shape: 'rounded' },
                { name: 'Вертикальный "Арка"', price: '30 000', desc: 'Чёрный гранит, арочная форма', material: 'black-granite', shape: 'arch' },
                { name: 'Вертикальный "Стандарт 1"', price: '18 000', desc: 'Серый гранит, 80×40×5 см', material: 'gray-granite', shape: 'classic' },
                { name: 'Вертикальный "Премиум"', price: '42 000', desc: 'Чёрный гранит премиум, 120×60×8 см', material: 'black-granite', shape: 'rounded' },
              ].map((item) => (
                <Card key={item.name} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
                    <div 
                      className={`bg-gradient-to-b ${
                        item.material === 'black-granite' ? 'from-gray-800 to-gray-950' :
                        item.material === 'gray-granite' ? 'from-gray-500 to-gray-700' :
                        'from-red-900 to-red-950'
                      } ${
                        item.shape === 'classic' ? 'rounded-lg' :
                        item.shape === 'arch' ? 'rounded-t-full' :
                        item.shape === 'rounded' ? 'rounded-3xl' :
                        'clip-path-cross'
                      } w-24 h-36 md:w-32 md:h-48 shadow-xl`}
                    />
                  </div>
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.desc}</p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <p className="text-xl md:text-2xl font-bold text-accent">{item.price} ₽</p>
                      <Button className="w-full sm:w-auto">Заказать</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="horizontal-simple" className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                { name: 'Горизонтальный "Классика 1"', price: '25 000', desc: 'Чёрный гранит, 50×100×5 см', material: 'black-granite', shape: 'classic' },
                { name: 'Горизонтальный "Классика 2"', price: '35 000', desc: 'Чёрный гранит, 60×120×8 см', material: 'black-granite', shape: 'classic' },
                { name: 'Горизонтальный "Элегант"', price: '28 000', desc: 'Серый гранит, 55×110×5 см', material: 'gray-granite', shape: 'rounded' },
                { name: 'Горизонтальный "Арка"', price: '30 000', desc: 'Чёрный гранит, арочная форма', material: 'black-granite', shape: 'arch' },
                { name: 'Горизонтальный "Стандарт 1"', price: '18 000', desc: 'Серый гранит, 40×80×5 см', material: 'gray-granite', shape: 'classic' },
                { name: 'Горизонтальный "Премиум"', price: '42 000', desc: 'Чёрный гранит премиум, 60×120×8 см', material: 'black-granite', shape: 'rounded' },
              ].map((item) => (
                <Card key={item.name} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
                    <div 
                      className={`bg-gradient-to-b ${
                        item.material === 'black-granite' ? 'from-gray-800 to-gray-950' :
                        item.material === 'gray-granite' ? 'from-gray-500 to-gray-700' :
                        'from-red-900 to-red-950'
                      } ${
                        item.shape === 'classic' ? 'rounded-lg' :
                        item.shape === 'arch' ? 'rounded-t-full' :
                        item.shape === 'rounded' ? 'rounded-3xl' :
                        'clip-path-cross'
                      } w-36 h-24 md:w-48 md:h-32 shadow-xl`}
                    />
                  </div>
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.desc}</p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <p className="text-xl md:text-2xl font-bold text-accent">{item.price} ₽</p>
                      <Button className="w-full sm:w-auto">Заказать</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="vertical-carved" className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                { name: 'Резной "Цветы 1"', price: '45 000', desc: 'Чёрный гранит с резной гравировкой цветов', material: 'black-granite' },
                { name: 'Резной "Розы"', price: '55 000', desc: 'Чёрный гранит, 120×60×8 см, резные розы', material: 'black-granite' },
                { name: 'Резной "Лилии"', price: '48 000', desc: 'Серый гранит с гравировкой лилий', material: 'gray-granite' },
                { name: 'Резной "Орнамент"', price: '47 000', desc: 'Красный гранит с резным орнаментом', material: 'red-granite' },
                { name: 'Резной "Ангел"', price: '65 000', desc: 'Чёрный гранит с изображением ангела', material: 'black-granite' },
                { name: 'Резной "Элитный"', price: '75 000', desc: 'Чёрный гранит, комплексная резьба', material: 'black-granite' },
              ].map((item) => (
                <Card key={item.name} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
                    <div 
                      className={`bg-gradient-to-b ${
                        item.material === 'black-granite' ? 'from-gray-800 to-gray-950' :
                        item.material === 'gray-granite' ? 'from-gray-500 to-gray-700' :
                        'from-red-900 to-red-950'
                      } rounded-lg w-24 h-36 md:w-32 md:h-48 shadow-xl`}
                    />
                  </div>
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.desc}</p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <p className="text-xl md:text-2xl font-bold text-accent">{item.price} ₽</p>
                      <Button className="w-full sm:w-auto">Заказать</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="horizontal-carved" className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                { name: 'Резной "Цветы 1"', price: '45 000', desc: 'Чёрный гранит с резной гравировкой цветов', material: 'black-granite' },
                { name: 'Резной "Розы"', price: '55 000', desc: 'Чёрный гранит, 60×120×8 см, резные розы', material: 'black-granite' },
                { name: 'Резной "Лилии"', price: '48 000', desc: 'Серый гранит с гравировкой лилий', material: 'gray-granite' },
                { name: 'Резной "Орнамент"', price: '47 000', desc: 'Красный гранит с резным орнаментом', material: 'red-granite' },
                { name: 'Резной "Ангел"', price: '65 000', desc: 'Чёрный гранит с изображением ангела', material: 'black-granite' },
                { name: 'Резной "Элитный"', price: '75 000', desc: 'Чёрный гранит, комплексная резьба', material: 'black-granite' },
              ].map((item) => (
                <Card key={item.name} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
                    <div 
                      className={`bg-gradient-to-b ${
                        item.material === 'black-granite' ? 'from-gray-800 to-gray-950' :
                        item.material === 'gray-granite' ? 'from-gray-500 to-gray-700' :
                        'from-red-900 to-red-950'
                      } rounded-lg w-36 h-24 md:w-48 md:h-32 shadow-xl`}
                    />
                  </div>
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.desc}</p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <p className="text-xl md:text-2xl font-bold text-accent">{item.price} ₽</p>
                      <Button className="w-full sm:w-auto">Заказать</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="cross" className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                { name: 'Крест "Православный 1"', price: '35 000', desc: 'Чёрный гранит, 120×60×8 см', material: 'black-granite' },
                { name: 'Крест "Православный 2"', price: '45 000', desc: 'Чёрный гранит, 150×70×10 см', material: 'black-granite' },
                { name: 'Крест "Католический"', price: '38 000', desc: 'Серый гранит, 130×65×8 см', material: 'gray-granite' },
                { name: 'Крест "Резной"', price: '55 000', desc: 'Чёрный гранит с резным орнаментом', material: 'black-granite' },
                { name: 'Крест "Элитный"', price: '65 000', desc: 'Чёрный гранит, комплексная резьба', material: 'black-granite' },
              ].map((item) => (
                <Card key={item.name} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
                    <div 
                      className={`bg-gradient-to-b ${
                        item.material === 'black-granite' ? 'from-gray-800 to-gray-950' :
                        item.material === 'gray-granite' ? 'from-gray-500 to-gray-700' :
                        'from-red-900 to-red-950'
                      } clip-path-cross w-20 h-28 md:w-24 md:h-36 shadow-xl`}
                    />
                  </div>
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.desc}</p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <p className="text-xl md:text-2xl font-bold text-accent">{item.price} ₽</p>
                      <Button className="w-full sm:w-auto">Заказать</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="angel" className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                { name: 'Ангел "Скорбящий"', price: '85 000', desc: 'Чёрный гранит, 150×80×40 см', material: 'black-granite' },
                { name: 'Ангел "Молящийся"', price: '75 000', desc: 'Серый гранит, 140×70×35 см', material: 'gray-granite' },
                { name: 'Ангел "Хранитель"', price: '95 000', desc: 'Чёрный гранит, 160×85×45 см', material: 'black-granite' },
                { name: 'Ангел "Детский"', price: '55 000', desc: 'Серый гранит, 100×50×30 см', material: 'gray-granite' },
                { name: 'Ангел "Элитный"', price: '120 000', desc: 'Чёрный гранит, 180×90×50 см', material: 'black-granite' },
              ].map((item) => (
                <Card key={item.name} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
                    <div 
                      className={`bg-gradient-to-b ${
                        item.material === 'black-granite' ? 'from-gray-800 to-gray-950' :
                        item.material === 'gray-granite' ? 'from-gray-500 to-gray-700' :
                        'from-red-900 to-red-950'
                      } rounded-full w-20 h-28 md:w-28 md:h-40 shadow-xl`}
                    />
                  </div>
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.desc}</p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <p className="text-xl md:text-2xl font-bold text-accent">{item.price} ₽</p>
                      <Button className="w-full sm:w-auto">Заказать</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4">Наши услуги</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Полный цикл работ от идеи до установки</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={service.title} className="text-center hover:shadow-xl transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <Icon name={service.icon} size={56} className="mx-auto mb-4 text-accent" />
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-5xl font-bold text-center mb-12">О компании</h2>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-lg leading-relaxed">
              Компания <strong>"Гранит Мемориал"</strong> работает на рынке изготовления памятников более 15 лет. 
              Мы специализируемся на создании качественных мемориальных изделий из натурального гранита.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-accent mb-2">15+</p>
                  <p className="text-muted-foreground">лет на рынке</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-accent mb-2">3000+</p>
                  <p className="text-muted-foreground">выполненных заказов</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-accent mb-2">100%</p>
                  <p className="text-muted-foreground">гарантия качества</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-lg leading-relaxed">
              Наши мастера используют современное оборудование и проверенные технологии обработки камня. 
              Мы предлагаем профессиональную ретушь фотографий для гравировки, что позволяет сохранить 
              лучшие воспоминания о близких людях на долгие годы.
            </p>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-5xl font-bold text-center mb-12">Контакты</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Icon name="MapPin" size={24} className="text-accent mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Адрес</h3>
                  <p className="opacity-90">г. Москва, ул. Примерная, д. 123</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Icon name="Phone" size={24} className="text-accent mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Телефон</h3>
                  <p className="opacity-90">+7 (495) 123-45-67</p>
                  <p className="opacity-90">+7 (800) 555-35-35</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Icon name="Mail" size={24} className="text-accent mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Email</h3>
                  <p className="opacity-90">info@granit-memorial.ru</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Icon name="Clock" size={24} className="text-accent mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Режим работы</h3>
                  <p className="opacity-90">Пн-Пт: 9:00 - 18:00</p>
                  <p className="opacity-90">Сб: 10:00 - 16:00</p>
                  <p className="opacity-90">Вс: выходной</p>
                </div>
              </div>
            </div>
            
            <Card className="bg-card text-card-foreground">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Заказать консультацию</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Имя</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Сообщение</label>
                    <textarea 
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background h-24"
                      placeholder="Опишите ваш вопрос"
                    />
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary/95 text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="opacity-80">© 2024 Гранит Мемориал. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}