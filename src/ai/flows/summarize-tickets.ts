'use server';
/**
 * @fileOverview AI agent that summarizes ticket data.
 *
 * - summarizeTickets - A function that provides a summary of ticket statistics.
 * - SummarizeTicketsInput - The input type for the summarizeTickets function.
 * - SummarizeTicketsOutput - The return type for the summarizeTickets function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Ticket } from '@/lib/types';

const SummarizeTicketsInputSchema = z.object({
  tickets: z.array(z.any()).describe('An array of ticket objects.'),
});
export type SummarizeTicketsInput = z.infer<typeof SummarizeTicketsInputSchema>;

const SummarizeTicketsOutputSchema = z.object({
  openTickets: z.number().describe('Total number of open tickets.'),
  ticketsToday: z.number().describe('Number of tickets created today.'),
  resolutionTimeHours: z.number().describe('Average resolution time in hours.'),
  satisfaction: z.number().describe('Customer satisfaction score as a percentage.'),
  summary: z.string().describe('A brief summary of the current ticket situation, highlighting any urgent issues or trends.'),
});
export type SummarizeTicketsOutput = z.infer<typeof SummarizeTicketsOutputSchema>;

export async function summarizeTickets(input: { tickets: Ticket[] }): Promise<SummarizeTicketsOutput> {
  const ticketDataForPrompt = input.tickets.map(t => ({
      id: t.id,
      status: t.status,
      priority: t.priority,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      subject: t.subject,
  }));

  // In a real app, you might calculate some stats here and pass them to the prompt.
  // For this example, we'll let the AI calculate everything.
  return summarizeTicketsFlow({ tickets: ticketDataForPrompt });
}

const prompt = ai.definePrompt({
  name: 'summarizeTicketsPrompt',
  input: { schema: SummarizeTicketsInputSchema },
  output: { schema: SummarizeTicketsOutputSchema },
  prompt: `You are a support operations analyst. Analyze the following ticket data and provide a summary.
Today's date is ${new Date().toISOString().split('T')[0]}.
Calculate the total number of open tickets, the number of tickets created today, the average resolution time in hours, and a customer satisfaction score (make up a realistic score between 80 and 95).
Provide a concise summary of the situation.

Ticket Data:
{{{json tickets}}}
`,
});

const summarizeTicketsFlow = ai.defineFlow(
  {
    name: 'summarizeTicketsFlow',
    inputSchema: SummarizeTicketsInputSchema,
    outputSchema: SummarizeTicketsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
