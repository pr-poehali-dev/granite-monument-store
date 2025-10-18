import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const API_URL = 'https://functions.poehali.dev/4ae8f9dd-7d22-451b-a800-1c1d18383264';

interface Product {
  id: number;
  name: string;
  category: string;
  shape?: string;
  size?: string;
  dimensions?: string;
  material?: string;
  price: number;
  description?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category: 'standard',
    shape: '',
    size: '',
    dimensions: '',
    material: '',
    price: '',
    description: '',
    image_url: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить товары',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        const base64Data = base64.split(',')[1];

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
          body: base64Data,
        });

        const result = await response.json();

        if (response.ok) {
          toast({
            title: 'Успешно!',
            description: result.message,
          });
          loadProducts();
        } else {
          toast({
            title: 'Ошибка',
            description: result.error || 'Не удалось загрузить файл',
            variant: 'destructive',
          });
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить файл',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingProduct ? `${API_URL}/${editingProduct.id}` : API_URL;
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price) || 0,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: 'Успешно!',
          description: editingProduct ? 'Товар обновлён' : 'Товар создан',
        });
        loadProducts();
        resetForm();
        setIsDialogOpen(false);
      } else {
        toast({
          title: 'Ошибка',
          description: result.error || 'Не удалось сохранить товар',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить товар',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Успешно!',
          description: 'Товар удалён',
        });
        loadProducts();
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить товар',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить товар',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      shape: product.shape || '',
      size: product.size || '',
      dimensions: product.dimensions || '',
      material: product.material || '',
      price: product.price.toString(),
      description: product.description || '',
      image_url: product.image_url || '',
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'standard',
      shape: '',
      size: '',
      dimensions: '',
      material: '',
      price: '',
      description: '',
      image_url: '',
    });
  };

  const downloadTemplate = () => {
    const template = `Название,Категория,Форма,Размер,Габариты,Материал,Цена,Описание,URL изображения
Памятник "Классика",standard,classic,medium,100x50x5,black-granite,25000,Описание товара,https://example.com/image.jpg`;
    
    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'products_template.csv';
    link.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Админ-панель</h1>
            <Button variant="outline" onClick={() => (window.location.href = '/')}>
              <Icon name="Home" size={20} className="mr-2" />
              На главную
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Upload" size={24} />
                Быстрая загрузка
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="excel-file" className="cursor-pointer">
                    <div className="border-2 border-dashed border-primary rounded-lg p-8 text-center hover:bg-accent/5 transition-colors">
                      <Icon name="FileSpreadsheet" size={48} className="mx-auto mb-4 text-primary" />
                      <p className="text-lg font-semibold mb-2">Загрузить Excel файл</p>
                      <p className="text-sm text-muted-foreground">
                        Поддерживается .xlsx формат
                      </p>
                      <Input
                        id="excel-file"
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={loading}
                      />
                    </div>
                  </Label>
                </div>
              </div>
              <div className="flex gap-4">
                <Button onClick={downloadTemplate} variant="outline">
                  <Icon name="Download" size={20} className="mr-2" />
                  Скачать шаблон
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="font-semibold mb-2">Формат Excel файла:</p>
                <p>Столбцы: Название | Категория | Форма | Размер | Габариты | Материал | Цена | Описание | URL изображения</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Товары ({products.length})</h2>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить товар
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Название *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Категория *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Стандартные</SelectItem>
                        <SelectItem value="premium">Премиум</SelectItem>
                        <SelectItem value="exclusive">Эксклюзивные</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shape">Форма</Label>
                      <Input
                        id="shape"
                        value={formData.shape}
                        onChange={(e) => setFormData({ ...formData, shape: e.target.value })}
                        placeholder="classic, arch, rounded"
                      />
                    </div>
                    <div>
                      <Label htmlFor="size">Размер</Label>
                      <Input
                        id="size"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        placeholder="small, medium, large"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dimensions">Габариты</Label>
                      <Input
                        id="dimensions"
                        value={formData.dimensions}
                        onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                        placeholder="100x50x5 см"
                      />
                    </div>
                    <div>
                      <Label htmlFor="material">Материал</Label>
                      <Input
                        id="material"
                        value={formData.material}
                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                        placeholder="black-granite, gray-granite"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="price">Цена (₽) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="image_url">URL изображения</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? 'Сохранение...' : editingProduct ? 'Обновить' : 'Создать'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        resetForm();
                        setIsDialogOpen(false);
                      }}
                    >
                      Отмена
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {loading && products.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Loader2" size={48} className="mx-auto mb-4 animate-spin text-primary" />
            <p className="text-muted-foreground">Загрузка товаров...</p>
          </div>
        ) : products.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Icon name="Package" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">Товаров пока нет</p>
              <p className="text-sm text-muted-foreground mt-2">
                Добавьте товары вручную или загрузите Excel файл
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {product.image_url && (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Категория: {product.category}
                          </p>
                        </div>
                        <p className="text-2xl font-bold text-accent">
                          {product.price.toLocaleString()} ₽
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        {product.shape && <p>Форма: {product.shape}</p>}
                        {product.size && <p>Размер: {product.size}</p>}
                        {product.dimensions && <p>Габариты: {product.dimensions}</p>}
                        {product.material && <p>Материал: {product.material}</p>}
                      </div>
                      {product.description && (
                        <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          <Icon name="Pencil" size={16} className="mr-2" />
                          Редактировать
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Icon name="Trash2" size={16} className="mr-2" />
                          Удалить
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
