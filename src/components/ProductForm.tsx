
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Plus } from 'lucide-react';
import { Product, ProductFormData } from '@/types/product';
import ImageUpload from './ImageUpload';

interface ProductFormProps {
  product?: Product;
  onSave: (product: ProductFormData) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    coverImage: '',
    pddPrice: 0,
    xiangyuPrice: 0,
    pddLink: '',
    xiangyuLink: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        coverImage: product.coverImage,
        pddPrice: product.pddPrice,
        xiangyuPrice: product.xiangyuPrice,
        pddLink: product.pddLink,
        xiangyuLink: product.xiangyuLink,
      });
    }
  }, [product]);

  const profit = formData.xiangyuPrice - formData.pddPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateField = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {product ? <Save className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          {product ? '编辑产品' : '添加新产品'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 左列 */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">产品标题</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="请输入产品标题"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">产品文案</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="请输入产品描述文案"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label>封面图片</Label>
                <ImageUpload
                  value={formData.coverImage}
                  onChange={(url) => updateField('coverImage', url)}
                />
              </div>
            </div>

            {/* 右列 */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pddPrice">拼多多价格</Label>
                  <Input
                    id="pddPrice"
                    type="number"
                    step="0.01"
                    value={formData.pddPrice}
                    onChange={(e) => updateField('pddPrice', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="xiangyuPrice">闲鱼价格</Label>
                  <Input
                    id="xiangyuPrice"
                    type="number"
                    step="0.01"
                    value={formData.xiangyuPrice}
                    onChange={(e) => updateField('xiangyuPrice', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">预计利润</div>
                <div className="text-2xl font-bold text-green-600">
                  ¥{profit.toFixed(2)}
                  {formData.pddPrice > 0 && (
                    <span className="text-sm font-normal ml-2">
                      ({((profit / formData.pddPrice) * 100).toFixed(1)}%)
                    </span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="pddLink">拼多多商品链接</Label>
                <Input
                  id="pddLink"
                  value={formData.pddLink}
                  onChange={(e) => updateField('pddLink', e.target.value)}
                  placeholder="https://mobile.yangkeduo.com/goods.html?..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="xiangyuLink">闲鱼商品链接（可选）</Label>
                <Input
                  id="xiangyuLink"
                  value={formData.xiangyuLink}
                  onChange={(e) => updateField('xiangyuLink', e.target.value)}
                  placeholder="https://2.taobao.com/item.htm?..."
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              {product ? '更新产品' : '保存产品'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              取消
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
