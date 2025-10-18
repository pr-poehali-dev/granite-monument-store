import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <Card>
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
                onClick={() => onEdit(product)}
              >
                <Icon name="Pencil" size={16} className="mr-2" />
                Редактировать
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(product.id)}
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Удалить
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
