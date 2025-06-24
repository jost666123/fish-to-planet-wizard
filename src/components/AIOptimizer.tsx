
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { optimizeText } from '@/services/aiService';

interface AIOptimizerProps {
  type: 'title' | 'description';
  originalText: string;
  onOptimized: (optimizedText: string) => void;
}

const AIOptimizer: React.FC<AIOptimizerProps> = ({ type, originalText, onOptimized }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedText, setOptimizedText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleOptimize = async () => {
    if (!originalText.trim()) {
      setError('请先输入内容再进行AI优化');
      return;
    }

    setIsOptimizing(true);
    setError(null);
    
    try {
      const result = await optimizeText(originalText, type);
      setOptimizedText(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI优化失败');
      console.error('AI优化错误:', err);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleApply = () => {
    onOptimized(optimizedText);
    setOptimizedText('');
    setError(null);
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
          disabled={isOptimizing || !originalText.trim()}
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

        {error && (
          <div className="flex items-center gap-2 p-3 text-red-600 bg-red-50 rounded-lg">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        
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
