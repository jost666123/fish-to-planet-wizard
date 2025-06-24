
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { Product } from '@/types/product';
import { TrendingUp, DollarSign, Package, Target } from 'lucide-react';

interface StatisticsProps {
  products: Product[];
}

const Statistics: React.FC<StatisticsProps> = ({ products }) => {
  // 准备图表数据
  const profitData = products.map((product, index) => ({
    name: `产品${index + 1}`,
    profit: product.profit,
    pddPrice: product.pddPrice,
    xiangyuPrice: product.xiangyuPrice,
  }));

  const priceRangeData = [
    { range: '0-50', count: products.filter(p => p.pddPrice <= 50).length },
    { range: '51-100', count: products.filter(p => p.pddPrice > 50 && p.pddPrice <= 100).length },
    { range: '101-200', count: products.filter(p => p.pddPrice > 100 && p.pddPrice <= 200).length },
    { range: '200+', count: products.filter(p => p.pddPrice > 200).length },
  ];

  const profitMarginData = products.map((product, index) => ({
    name: `产品${index + 1}`,
    margin: ((product.profit / product.pddPrice) * 100).toFixed(1),
  }));

  const pieData = [
    { name: '高利润(>30%)', value: products.filter(p => (p.profit / p.pddPrice) > 0.3).length, color: '#10b981' },
    { name: '中利润(10-30%)', value: products.filter(p => (p.profit / p.pddPrice) >= 0.1 && (p.profit / p.pddPrice) <= 0.3).length, color: '#f59e0b' },
    { name: '低利润(<10%)', value: products.filter(p => (p.profit / p.pddPrice) < 0.1).length, color: '#ef4444' },
  ];

  const chartConfig = {
    profit: {
      label: "利润",
      color: "#10b981",
    },
    pddPrice: {
      label: "拼多多价格",
      color: "#3b82f6",
    },
    xiangyuPrice: {
      label: "闲鱼价格",
      color: "#8b5cf6",
    },
  };

  // 计算统计指标
  const totalProfit = products.reduce((sum, p) => sum + p.profit, 0);
  const averageProfit = products.length > 0 ? totalProfit / products.length : 0;
  const highestProfit = products.length > 0 ? Math.max(...products.map(p => p.profit)) : 0;
  const averageMargin = products.length > 0 ? products.reduce((sum, p) => sum + (p.profit / p.pddPrice), 0) / products.length * 100 : 0;

  if (products.length === 0) {
    return (
      <Card className="text-center py-16">
        <CardContent>
          <Package className="h-24 w-24 mx-auto text-gray-300 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">暂无数据</h3>
          <p className="text-gray-500">添加产品后即可查看统计数据</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总产品数</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总利润</p>
                <p className="text-2xl font-bold">¥{totalProfit.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">平均利润</p>
                <p className="text-2xl font-bold">¥{averageProfit.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">平均利润率</p>
                <p className="text-2xl font-bold">{averageMargin.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 利润对比图 */}
        <Card>
          <CardHeader>
            <CardTitle>产品利润对比</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <BarChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="profit" fill="#10b981" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 价格分布图 */}
        <Card>
          <CardHeader>
            <CardTitle>价格区间分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <BarChart data={priceRangeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 利润率饼图 */}
        <Card>
          <CardHeader>
            <CardTitle>利润率分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 价格趋势线图 */}
        <Card>
          <CardHeader>
            <CardTitle>价格对比趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <LineChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="pddPrice" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="xiangyuPrice" stroke="#8b5cf6" strokeWidth={2} />
                <Legend />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
