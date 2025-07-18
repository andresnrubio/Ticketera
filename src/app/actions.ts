'use server';

import { suggestKnowledgeBaseArticles } from '@/ai/flows/suggest-knowledge-base-articles';
import { summarizeTickets } from '@/ai/flows/summarize-tickets';
import { type Ticket } from '@/lib/types';


export async function getAiSuggestions(ticketContent: string) {
  try {
    const result = await suggestKnowledgeBaseArticles({ ticketContent });
    return result.suggestedArticles;
  } catch (error) {
    console.error('Error fetching AI suggestions:', error);
    return [];
  }
}

export async function getTicketSummary(tickets: Ticket[]) {
  try {
    const result = await summarizeTickets({ tickets });
    return result;
  }
  catch (error) {
    console.error('Error fetching ticket summary:', error);
    return null;
  }
}
