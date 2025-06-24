import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, TrendingUp, Package, DollarSign, BarChart3 } from 'lucide-react';
import { Product, ProductFormData } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import ProductForm from '@/components/ProductForm';
import Statistics from '@/components/Statistics';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState<'products' | 'statistics'>('products');

  const handleSaveProduct = (formData: ProductFormData) => {
    if (editingProduct) {
      // 更新现有产品
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? {
              ...editingProduct,
              ...formData,
              profit: formData.xiangyuPrice - formData.pddPrice,
              updatedAt: new Date()
            }
          : p
      ));
    } else {
      // 添加新产品
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
        profit: formData.xiangyuPrice - formData.pddPrice,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    
    setIsFormOpen(false);
    setEditingProduct(undefined);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingProduct(undefined);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProfit = products.reduce((sum, product) => sum + product.profit, 0);
  const averageProfit = products.length > 0 ? totalProfit / products.length : 0;

  if (isFormOpen) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={handleCancelForm}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 头部 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">闲鱼搬运助手</h1>
              <p className="text-gray-600 mt-1">拼多多 → 闲鱼 产品管理系统</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={currentView === 'products' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView('products')}
                  className="rounded-md"
                >
                  <Package className="h-4 w-4 mr-2" />
                  产品管理
                </Button>
                <Button
                  variant={currentView === 'statistics' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView('statistics')}
                  className="rounded-md"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  数据统计
                </Button>
              </div>
              <Button onClick={() => setIsFormOpen(true)} size="lg" className="shadow-lg">
                <Plus className="h-5 w-5 mr-2" />
                添加新产品
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'statistics' ? (
          <Statistics products={products} />
        ) : (
          <>
            {/* 统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">总产品数</p>
                      <p className="text-3xl font-bold">{products.length}</p>
                    </div>
                    <Package className="h-12 w-12 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">总利润</p>
                      <p className="text-3xl font-bold">¥{totalProfit.toFixed(2)}</p>
                    </div>
                    <DollarSign className="h-12 w-12 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">平均利润</p>
                      <p className="text-3xl font-bold">¥{averageProfit.toFixed(2)}</p>
                    </div>
                    <TrendingUp className="h-12 w-12 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 搜索栏 */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="搜索产品标题或描述..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-lg py-3"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 产品列表 */}
            {filteredProducts.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <Package className="h-24 w-24 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                    {products.length === 0 ? '暂无产品' : '未找到匹配的产品'}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {products.length === 0 
                      ? '点击上方按钮添加您的第一个产品' 
                      : '尝试使用不同的关键词搜索'
                    }
                  </p>
                  {products.length === 0 && (
                    <Button onClick={() => setIsFormOpen(true)} size="lg">
                      <Plus className="h-5 w-5 mr-2" />
                      添加第一个产品
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-semibold">产品列表</h2>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {filteredProducts.length} 个产品
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onEdit={handleEditProduct}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
