
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';

interface AIOptimizerProps {
  type: 'title' | 'description';
  originalText: string;
  onOptimized: (optimizedText: string) => void;
}

const AIOptimizer: React.FC<AIOptimizerProps> = ({ type, originalText, onOptimized }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedText, setOptimizedText] = useState('');

  const handleOptimize = async () => {
    setIsOptimizing(true);
    
    // 模拟AI优化过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let optimized = '';
    if (type === 'title') {
      optimized = `【限时特价】${originalText} 正品保证 包邮到家`;
    } else {
      optimized = `${originalText}\n\n✨ 产品特色：\n• 正品保证，假一赔十\n• 顺丰包邮，24小时发货\n• 7天无理由退换\n• 专业客服，贴心服务\n\n🔥 限时优惠，数量有限，先到先得！`;
    }
    
    setOptimizedText(optimized);
    setIsOptimizing(false);
  };

  const handleApply = () => {
    onOptimized(optimizedText);
    setOptimizedText('');
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-purple-500" />
          AI {type === 'title' ? '标题' : '文案'}优化
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleOptimize}
          disabled={isOptimizing || !originalText}
          className="w-full"
        >
          {isOptimizing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              AI优化中...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              开始AI优化
            </>
          )}
        </Button>
        
        {optimizedText && (
          <div className="space-y-3">
            <Textarea
              value={optimizedText}
              onChange={(e) => setOptimizedText(e.target.value)}
              rows={type === 'title' ? 2 : 6}
              placeholder="AI优化结果..."
            />
            <Button onClick={handleApply} className="w-full" variant="outline">
              应用优化结果
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIOptimizer;
