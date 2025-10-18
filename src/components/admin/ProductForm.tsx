import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
        <Label htmlFor="image_url">URL изображения</Label>
        <Input
          id="image_url"
          value={formData.image_url}
          onChange={(e) => onChange({ ...formData, image_url: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
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
