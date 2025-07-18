'use server';

import { suggestKnowledgeBaseArticles } from '@/ai/flows/suggest-knowledge-base-articles';

export async function getAiSuggestions(ticketContent: string) {
  try {
    const result = await suggestKnowledgeBaseArticles({ ticketContent });
    return result.suggestedArticles;
  } catch (error) {
    console.error('Error fetching AI suggestions:', error);
    return [];
  }
}
