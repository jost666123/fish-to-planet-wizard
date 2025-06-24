
import { AI_CONFIG } from '@/config/ai';

interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const optimizeText = async (text: string, type: 'title' | 'description'): Promise<string> => {
  if (!AI_CONFIG.apiKey) {
    throw new Error('请先设置API密钥');
  }

  try {
    const systemPrompts = {
      title: '你是一个专业的电商文案专家，专门优化商品标题。请帮助优化商品标题，使其更有吸引力，包含关键词，适合闲鱼平台。要求简洁有力，突出卖点。',
      description: '你是一个专业的电商文案专家，专门优化商品描述。请帮助优化商品描述文案，使其更有吸引力和说服力，适合闲鱼平台。要求突出产品特色、优势和服务保障。'
    };

    const userPrompts = {
      title: `请优化这个商品标题，使其更吸引人：${text}`,
      description: `请优化这个商品描述，使其更有吸引力和说服力：${text}`
    };

    const messages: AIMessage[] = [
      {
        role: 'system',
        content: systemPrompts[type]
      },
      {
        role: 'user',
        content: userPrompts[type]
      }
    ];

    console.log('发送AI请求:', {
      url: `${AI_CONFIG.baseURL}/chat/completions`,
      model: AI_CONFIG.model,
      apiKeyExists: !!AI_CONFIG.apiKey
    });

    const response = await fetch(`${AI_CONFIG.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: messages,
        temperature: 0.7,
        max_tokens: type === 'title' ? 100 : 500,
      }),
    });

    console.log('API响应状态:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API错误详情:', errorData);
      
      if (response.status === 401) {
        throw new Error('API密钥无效，请检查密钥是否正确');
      } else if (response.status === 429) {
        throw new Error('请求过于频繁，请稍后重试');
      } else {
        throw new Error(`API请求失败: ${response.status} - ${errorData.error?.message || '未知错误'}`);
      }
    }

    const data = await response.json();
    console.log('API响应数据:', data);
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error('API返回数据格式错误');
    }
  } catch (error) {
    console.error('AI优化失败:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('AI优化服务暂时不可用，请稍后重试');
    }
  }
};
