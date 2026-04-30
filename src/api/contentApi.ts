import type { ContentItem } from '../types';

const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data';

export const fetchContents = async (): Promise<ContentItem[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  return await response.json();
};
