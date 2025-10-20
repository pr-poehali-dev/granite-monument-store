import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedOrientation, setSelectedOrientation] = useState('vertical');
  const [selectedShape, setSelectedShape] = useState('classic');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedMaterial, setSelectedMaterial] = useState('black-granite');
  const [selectedImage, setSelectedImage] = useState<{img: string, name: string} | null>(null);

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
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-5">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-secondary">Гранит Мемориал</h1>
            <div className="hidden md:flex gap-8 text-sm">
              {['home', 'retouch', 'gallery', 'catalog', 'services', 'about', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-foreground hover:text-primary transition-colors font-medium uppercase tracking-wide"
                >
                  {section === 'home' && 'Главная'}
                  {section === 'retouch' && 'Ретушь'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'services' && 'Услуги'}
                  {section === 'about' && 'О нас'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-muted via-background to-muted">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03)_0%,transparent_50%)]" />
        <div className="relative z-20 text-center px-4 animate-fade-in max-w-4xl mx-auto">
          <div className="mb-6 inline-block">
            <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-secondary leading-tight">
            Памятники из гранита<br/>
            <span className="text-primary">премиум-класса</span>
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Индивидуальное изготовление надгробных памятников из натурального гранита.<br/>
            Профессиональная обработка фотографий и художественная гравировка.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-10 py-6 text-base shadow-lg"
              onClick={() => scrollToSection('retouch')}
            >
              Художественная ретушь
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-10 py-6 text-base"
              onClick={() => scrollToSection('catalog')}
            >
              Смотреть каталог
            </Button>
          </div>
        </div>
      </section>

      <section id="retouch" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-secondary">Художественная ретушь</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg max-w-3xl mx-auto">
            Профессиональная обработка старых и повреждённых фотографий для гравировки на памятнике.<br/>
            Восстановление качества изображения с сохранением индивидуальности.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-6">
              <Card className="overflow-hidden border-2 border-border shadow-lg">
                <div className="bg-muted py-3 px-6 border-b">
                  <h3 className="text-xl font-semibold text-center">До ретуши</h3>
                </div>
                <CardContent className="p-0">
                  <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
                    <img 
                      src="https://cdn.poehali.dev/files/1b127b0d-a42c-4b26-93b3-313340fc0512.jpeg" 
                      alt="Фото до ретуши"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  <Icon name="X" size={20} className="inline text-red-500 mr-2" />
                  Старое, выцветшее фото
                </p>
                <p className="text-muted-foreground">
                  <Icon name="X" size={20} className="inline text-red-500 mr-2" />
                  Царапины и повреждения
                </p>
                <p className="text-muted-foreground">
                  <Icon name="X" size={20} className="inline text-red-500 mr-2" />
                  Низкое качество изображения
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="overflow-hidden border-2 border-primary shadow-2xl">
                <div className="bg-primary py-3 px-6 border-b">
                  <h3 className="text-xl font-semibold text-center text-white">После ретуши</h3>
                </div>
                <CardContent className="p-0">
                  <div className="aspect-[3/4] bg-black flex items-center justify-center">
                    <img 
                      src="https://cdn.poehali.dev/files/853c0cdf-e67b-4ad8-a154-376920e10e91.jpeg" 
                      alt="Фото после ретуши"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  <Icon name="Check" size={20} className="inline text-primary mr-2" />
                  Восстановлены детали лица
                </p>
                <p className="text-muted-foreground">
                  <Icon name="Check" size={20} className="inline text-primary mr-2" />
                  Удалены повреждения
                </p>
                <p className="text-muted-foreground">
                  <Icon name="Check" size={20} className="inline text-primary mr-2" />
                  Профессиональное качество
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="bg-muted border-none">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <Icon name="Clock" size={48} className="mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">Быстро</h3>
                    <p className="text-sm text-muted-foreground">Обработка фото за 1-2 дня</p>
                  </div>
                  <div>
                    <Icon name="Shield" size={48} className="mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">Качественно</h3>
                    <p className="text-sm text-muted-foreground">Профессиональные художники</p>
                  </div>
                  <div>
                    <Icon name="Heart" size={48} className="mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">Бережно</h3>
                    <p className="text-sm text-muted-foreground">С уважением к памяти</p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10">
                    Заказать ретушь фото
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-secondary">Галерея работ</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Наши завершённые проекты высокого качества</p>
          
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

      <section id="catalog" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-secondary">Каталог памятников</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Готовые решения для разных бюджетов</p>
          
          <Tabs defaultValue="vertical-simple" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8 gap-2 h-auto flex-wrap">
              <TabsTrigger value="vertical-simple" className="text-xs md:text-sm whitespace-normal py-2">Вертикальные</TabsTrigger>
              <TabsTrigger value="horizontal-simple" className="text-xs md:text-sm whitespace-normal py-2">Горизонтальные</TabsTrigger>
              <TabsTrigger value="vertical-carved" className="text-xs md:text-sm whitespace-normal py-2">Резные верт.</TabsTrigger>
              <TabsTrigger value="horizontal-carved" className="text-xs md:text-sm whitespace-normal py-2">Резные гориз.</TabsTrigger>
              <TabsTrigger value="cross" className="text-xs md:text-sm whitespace-normal py-2">Кресты</TabsTrigger>
              <TabsTrigger value="angel" className="text-xs md:text-sm whitespace-normal py-2">Ангелы</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vertical-simple" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { name: 'Классика 1', price: '25 000', desc: '100×50×5 см', material: 'black-granite', shape: 'classic', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Классика 2', price: '35 000', desc: '120×60×8 см', material: 'black-granite', shape: 'classic', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Элегант', price: '28 000', desc: '110×55×5 см', material: 'gray-granite', shape: 'rounded', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Арка', price: '30 000', desc: '100×50×5 см', material: 'black-granite', shape: 'arch', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Стандарт 1', price: '18 000', desc: '80×40×5 см', material: 'gray-granite', shape: 'classic', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Премиум', price: '42 000', desc: '120×60×8 см', material: 'black-granite', shape: 'rounded', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
              ].map((item) => (
                <Card key={item.name} className="hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                  <div 
                    className="aspect-[3/4] bg-white flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setSelectedImage({img: item.img, name: item.name})}
                  >
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <CardContent className="p-3 flex-1 flex flex-col">
                    <h3 className="text-sm md:text-base font-semibold mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.desc}</p>
                    <div className="mt-auto">
                      <p className="text-sm md:text-lg font-bold text-accent mb-2">от {item.price} ₽</p>
                      <Button className="w-full text-xs md:text-sm h-8 md:h-10">Подробнее</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="horizontal-simple" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { name: 'Классика 1', price: '25 000', desc: '50×100×5 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Классика 2', price: '35 000', desc: '60×120×8 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Элегант', price: '28 000', desc: '55×110×5 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Арка', price: '30 000', desc: '50×100×5 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Стандарт 1', price: '18 000', desc: '40×80×5 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Премиум', price: '42 000', desc: '60×120×8 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
              ].map((item) => (
                <Card key={item.name} className="hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                  <div 
                    className="aspect-[3/4] bg-white flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setSelectedImage({img: item.img, name: item.name})}
                  >
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <CardContent className="p-3 flex-1 flex flex-col">
                    <h3 className="text-sm md:text-base font-semibold mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.desc}</p>
                    <div className="mt-auto">
                      <p className="text-sm md:text-lg font-bold text-accent mb-2">от {item.price} ₽</p>
                      <Button className="w-full text-xs md:text-sm h-8 md:h-10">Подробнее</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="vertical-carved" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { name: 'Цветы 1', price: '45 000', desc: '100×50×5 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Розы', price: '55 000', desc: '120×60×8 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Лилии', price: '48 000', desc: '110×55×5 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Орнамент', price: '47 000', desc: '105×52×5 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Ангел', price: '65 000', desc: '120×60×8 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Элитный', price: '75 000', desc: '140×70×10 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
              ].map((item) => (
                <Card key={item.name} className="hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                  <div 
                    className="aspect-[3/4] bg-white flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setSelectedImage({img: item.img, name: item.name})}
                  >
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <CardContent className="p-3 flex-1 flex flex-col">
                    <h3 className="text-sm md:text-base font-semibold mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.desc}</p>
                    <div className="mt-auto">
                      <p className="text-sm md:text-lg font-bold text-accent mb-2">от {item.price} ₽</p>
                      <Button className="w-full text-xs md:text-sm h-8 md:h-10">Подробнее</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="horizontal-carved" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { name: 'Цветы 1', price: '45 000', desc: '50×100×5 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Розы', price: '55 000', desc: '60×120×8 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Лилии', price: '48 000', desc: '55×110×5 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Орнамент', price: '47 000', desc: '52×105×5 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Ангел', price: '65 000', desc: '60×120×8 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Элитный', price: '75 000', desc: '70×140×10 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
              ].map((item) => (
                <Card key={item.name} className="hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                  <div 
                    className="aspect-[3/4] bg-white flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setSelectedImage({img: item.img, name: item.name})}
                  >
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <CardContent className="p-3 flex-1 flex flex-col">
                    <h3 className="text-sm md:text-base font-semibold mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.desc}</p>
                    <div className="mt-auto">
                      <p className="text-sm md:text-lg font-bold text-accent mb-2">от {item.price} ₽</p>
                      <Button className="w-full text-xs md:text-sm h-8 md:h-10">Подробнее</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="cross" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { name: 'Православный 1', price: '35 000', desc: '120×60×8 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Православный 2', price: '45 000', desc: '150×70×10 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Католический', price: '38 000', desc: '130×65×8 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Резной', price: '55 000', desc: '140×68×10 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Элитный', price: '65 000', desc: '160×75×12 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
              ].map((item) => (
                <Card key={item.name} className="hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                  <div 
                    className="aspect-[3/4] bg-white flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setSelectedImage({img: item.img, name: item.name})}
                  >
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <CardContent className="p-3 flex-1 flex flex-col">
                    <h3 className="text-sm md:text-base font-semibold mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.desc}</p>
                    <div className="mt-auto">
                      <p className="text-sm md:text-lg font-bold text-accent mb-2">от {item.price} ₽</p>
                      <Button className="w-full text-xs md:text-sm h-8 md:h-10">Подробнее</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="angel" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { name: 'Скорбящий', price: '85 000', desc: '150×80×40 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Молящийся', price: '75 000', desc: '140×70×35 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Хранитель', price: '95 000', desc: '160×85×45 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Детский', price: '55 000', desc: '100×50×30 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
                { name: 'Элитный', price: '120 000', desc: '180×90×50 см', img: 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png' },
              ].map((item) => (
                <Card key={item.name} className="hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                  <div 
                    className="aspect-[3/4] bg-white flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setSelectedImage({img: item.img, name: item.name})}
                  >
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <CardContent className="p-3 flex-1 flex flex-col">
                    <h3 className="text-sm md:text-base font-semibold mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.desc}</p>
                    <div className="mt-auto">
                      <p className="text-sm md:text-lg font-bold text-accent mb-2">от {item.price} ₽</p>
                      <Button className="w-full text-xs md:text-sm h-8 md:h-10">Подробнее</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
          <div className="relative bg-white rounded-lg p-6">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
            {selectedImage && (
              <div className="flex flex-col items-center">
                <img
                  src={selectedImage.img}
                  alt={selectedImage.name}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <h3 className="text-2xl font-semibold mt-4 text-center text-foreground">{selectedImage.name}</h3>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <section id="services" className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-secondary">Наши услуги</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Полный цикл работ от идеи до установки памятника</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={service.title} className="text-center hover:shadow-xl transition-shadow animate-fade-in bg-white" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <Icon name={service.icon} size={56} className="mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-4">
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-secondary">О компании</h2>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-lg leading-relaxed">
              Компания <strong>"Гранит Мемориал"</strong> работает на рынке изготовления памятников более 15 лет. 
              Мы специализируемся на создании качественных мемориальных изделий из натурального гранита.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <Card className="bg-muted border-none">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">15+</p>
                  <p className="text-muted-foreground">лет на рынке</p>
                </CardContent>
              </Card>
              <Card className="bg-muted border-none">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">3000+</p>
                  <p className="text-muted-foreground">выполненных заказов</p>
                </CardContent>
              </Card>
              <Card className="bg-muted border-none">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">100%</p>
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
                <Icon name="MapPin" size={24} className="text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Адрес</h3>
                  <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 123</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Icon name="Phone" size={24} className="text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Телефон</h3>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  <p className="text-muted-foreground">+7 (800) 555-35-35</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Icon name="Mail" size={24} className="text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">info@granit-memorial.ru</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Icon name="Clock" size={24} className="text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Режим работы</h3>
                  <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                  <p className="text-muted-foreground">Сб: 10:00 - 16:00</p>
                  <p className="text-muted-foreground">Вс: выходной</p>
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
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white" size="lg">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="opacity-80">© 2024 Гранит Мемориал. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}