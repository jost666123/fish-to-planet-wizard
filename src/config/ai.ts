
export const AI_CONFIG = {
  apiKey: '', // 初始为空，让用户输入
  baseURL: 'https://api.gpt.ge/v1',
  model: 'gpt-3.5-turbo'
};

export const updateAIConfig = (newConfig: Partial<typeof AI_CONFIG>) => {
  Object.assign(AI_CONFIG, newConfig);
};
