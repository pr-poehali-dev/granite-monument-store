import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedShape, setSelectedShape] = useState('classic');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedMaterial, setSelectedMaterial] = useState('black-granite');

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
                        selectedSize === 'small' ? 'w-32 h-48' :
                        selectedSize === 'medium' ? 'w-40 h-56' :
                        'w-48 h-64'
                      } shadow-xl`}
                    />
                  </div>
                  <div className="space-y-3 text-center">
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
          
          <Tabs defaultValue="standard" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="standard">Стандартные</TabsTrigger>
              <TabsTrigger value="premium">Премиум</TabsTrigger>
              <TabsTrigger value="exclusive">Эксклюзивные</TabsTrigger>
            </TabsList>
            
            <TabsContent value="standard" className="space-y-4">
              {[
                { name: 'Памятник "Классика"', price: '25 000', desc: 'Чёрный гранит, 100×50×5 см, стандартная гравировка' },
                { name: 'Памятник "Арка"', price: '30 000', desc: 'Серый гранит, 110×55×5 см, арочная форма' },
              ].map((item) => (
                <Card key={item.name}>
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">{item.price} ₽</p>
                      <Button className="mt-2">Заказать</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="premium" className="space-y-4">
              {[
                { name: 'Памятник "Элегант"', price: '50 000', desc: 'Карельский гранит, 120×60×8 см, портретная гравировка' },
                { name: 'Памятник "Достоинство"', price: '65 000', desc: 'Красный гранит, 130×65×8 см, резная композиция' },
              ].map((item) => (
                <Card key={item.name}>
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">{item.price} ₽</p>
                      <Button className="mt-2">Заказать</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="exclusive" className="space-y-4">
              {[
                { name: 'Памятник "Вечность"', price: '100 000', desc: 'Габбро-диабаз, 150×70×10 см, объёмная композиция' },
                { name: 'Индивидуальный проект', price: 'от 150 000', desc: 'Разработка уникального дизайна по вашим эскизам' },
              ].map((item) => (
                <Card key={item.name}>
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">{item.price} ₽</p>
                      <Button className="mt-2">Заказать</Button>
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
