
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Link, DollarSign } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit }) => {
  const profitMargin = ((product.profit / product.pddPrice) * 100).toFixed(1);

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(product)}
            className="flex-shrink-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {product.coverImage && (
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.coverImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-red-500" />
              <span className="font-medium">拼多多: ¥{product.pddPrice}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-green-500" />
              <span className="font-medium">闲鱼: ¥{product.xiangyuPrice}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              利润: ¥{product.profit} ({profitMargin}%)
            </Badge>
          </div>
          
          <div className="flex gap-2">
            {product.pddLink && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => window.open(product.pddLink, '_blank')}
              >
                <Link className="h-3 w-3 mr-1" />
                拼多多
              </Button>
            )}
            {product.xiangyuLink && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => window.open(product.xiangyuLink, '_blank')}
              >
                <Link className="h-3 w-3 mr-1" />
                闲鱼
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
