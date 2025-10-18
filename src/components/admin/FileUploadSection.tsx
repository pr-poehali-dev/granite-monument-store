import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface FileUploadSectionProps {
  loading: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDownloadTemplate: () => void;
}

export default function FileUploadSection({
  loading,
  onFileUpload,
  onDownloadTemplate,
}: FileUploadSectionProps) {
  return (
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
                  onChange={onFileUpload}
                  className="hidden"
                  disabled={loading}
                />
              </div>
            </Label>
          </div>
        </div>
        <div className="flex gap-4">
          <Button onClick={onDownloadTemplate} variant="outline">
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
  );
}
