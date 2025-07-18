'use server';
/**
 * @fileOverview AI agent that suggests relevant knowledge base articles based on the ticket content.
 *
 * - suggestKnowledgeBaseArticles - A function that suggests knowledge base articles for a given ticket.
 * - SuggestKnowledgeBaseArticlesInput - The input type for the suggestKnowledgeBaseArticles function.
 * - SuggestKnowledgeBaseArticlesOutput - The return type for the suggestKnowledgeBaseArticles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestKnowledgeBaseArticlesInputSchema = z.object({
  ticketContent: z
    .string()
    .describe('The content of the support ticket.'),
});
export type SuggestKnowledgeBaseArticlesInput = z.infer<typeof SuggestKnowledgeBaseArticlesInputSchema>;

const SuggestKnowledgeBaseArticlesOutputSchema = z.object({
  suggestedArticles: z.array(z.string()).describe('An array of suggested knowledge base article titles.'),
});
export type SuggestKnowledgeBaseArticlesOutput = z.infer<typeof SuggestKnowledgeBaseArticlesOutputSchema>;

export async function suggestKnowledgeBaseArticles(input: SuggestKnowledgeBaseArticlesInput): Promise<SuggestKnowledgeBaseArticlesOutput> {
  return suggestKnowledgeBaseArticlesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestKnowledgeBaseArticlesPrompt',
  input: {schema: SuggestKnowledgeBaseArticlesInputSchema},
  output: {schema: SuggestKnowledgeBaseArticlesOutputSchema},
  prompt: `You are a support agent expert. Based on the content of the following support ticket, suggest relevant knowledge base articles that could help resolve the issue. Return a list of article titles.

Ticket Content: {{{ticketContent}}}

Suggested Articles:`, // Added 'Suggested Articles:' to guide the output format
});

const suggestKnowledgeBaseArticlesFlow = ai.defineFlow(
  {
    name: 'suggestKnowledgeBaseArticlesFlow',
    inputSchema: SuggestKnowledgeBaseArticlesInputSchema,
    outputSchema: SuggestKnowledgeBaseArticlesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
