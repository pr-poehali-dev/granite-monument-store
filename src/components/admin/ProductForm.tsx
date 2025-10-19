import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductFormData {
  name: string;
  category: string;
  shape: string;
  size: string;
  dimensions: string;
  material: string;
  price: string;
  description: string;
  image_url: string;
}

interface ProductFormProps {
  formData: ProductFormData;
  isEditing: boolean;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onChange: (data: ProductFormData) => void;
}

export default function ProductForm({
  formData,
  isEditing,
  loading,
  onSubmit,
  onCancel,
  onChange,
}: ProductFormProps) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const response = await fetch('https://api.poehali.dev/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.url;
        
        onChange({ ...formData, image_url: imageUrl });
      } else {
        alert('Ошибка загрузки изображения');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Ошибка загрузки изображения');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Название *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onChange({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Категория *</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => onChange({ ...formData, category: value })}
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
            onChange={(e) => onChange({ ...formData, shape: e.target.value })}
            placeholder="classic, arch, rounded"
          />
        </div>
        <div>
          <Label htmlFor="size">Размер</Label>
          <Input
            id="size"
            value={formData.size}
            onChange={(e) => onChange({ ...formData, size: e.target.value })}
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
            onChange={(e) => onChange({ ...formData, dimensions: e.target.value })}
            placeholder="100x50x5 см"
          />
        </div>
        <div>
          <Label htmlFor="material">Материал</Label>
          <Input
            id="material"
            value={formData.material}
            onChange={(e) => onChange({ ...formData, material: e.target.value })}
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
          onChange={(e) => onChange({ ...formData, price: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onChange({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <Label>Фото памятника</Label>
        <div className="mt-2 space-y-3">
          {formData.image_url && (
            <div className="aspect-[3/4] bg-white border rounded-lg flex items-center justify-center p-4">
              <img src={formData.image_url} alt="Preview" className="w-full h-full object-contain" />
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImage || loading}
            >
              {uploadingImage ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Icon name="Camera" size={20} className="mr-2" />
                  {formData.image_url ? 'Изменить фото' : 'Загрузить фото'}
                </>
              )}
            </Button>
            
            {formData.image_url && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onChange({ ...formData, image_url: '' })}
                disabled={loading}
              >
                <Icon name="Trash2" size={20} />
              </Button>
            )}
          </div>
          
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => onChange({ ...formData, image_url: e.target.value })}
            placeholder="Или вставьте URL изображения"
            className="text-sm"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Сохранение...' : isEditing ? 'Обновить' : 'Создать'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  );
}