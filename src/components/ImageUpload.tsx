
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string | undefined) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, className }) => {
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 在实际应用中，这里应该上传到服务器并返回URL
      // 现在我们使用本地URL作为演示
      const url = URL.createObjectURL(file);
      onChange(url);
    }
  }, [onChange]);

  const handleRemove = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  return (
    <div className={className}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id="image-upload"
      />
      
      {value ? (
        <Card className="relative">
          <CardContent className="p-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
              <img
                src={value}
                alt="封面图片"
                className="w-full h-full object-cover"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <label
          htmlFor="image-upload"
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
        >
          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">点击上传封面图片</p>
          <p className="text-sm text-gray-400 mt-1">支持 JPG, PNG 格式</p>
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
