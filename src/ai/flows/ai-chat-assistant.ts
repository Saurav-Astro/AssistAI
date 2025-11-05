'use server';

/**
 * @fileOverview Implements the AI Chat Assistant flow for real-time guidance and question answering, using conversation history for context.
 *
 * - aiChatAssistant - A function that handles the chat assistant interaction.
 * - AIChatAssistantInput - The input type for the aiChatAssistant function, including the message and conversation history.
 * - AIChatAssistantOutput - The return type for the aiChatAssistant function, providing the AI assistant's response.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatAssistantInputSchema = z.object({
  message: z.string().describe('The current message from the user.'),
  history: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
      timestamp: z.string().optional(),
    })
  ).optional().describe('The conversation history.'),
});
export type AIChatAssistantInput = z.infer<typeof AIChatAssistantInputSchema>;

const AIChatAssistantOutputSchema = z.object({
  text: z.string().describe('The AI assistant\'s response to the user message.'),
});
export type AIChatAssistantOutput = z.infer<typeof AIChatAssistantOutputSchema>;

export async function aiChatAssistant(input: AIChatAssistantInput): Promise<AIChatAssistantOutput> {
  return aiChatAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatAssistantPrompt',
  input: {schema: AIChatAssistantInputSchema},
  output: {schema: AIChatAssistantOutputSchema},
  prompt: `You are an AI assistant providing real-time guidance and answering questions. Consider the previous conversation history for context.

{% if history %}
Conversation History:
{% each history %}
{{this.role}}: {{this.content}}
{% endeach %}
{% endif %}

User Message: {{{message}}}

Assistant:`,
});

const aiChatAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatAssistantFlow',
    inputSchema: AIChatAssistantInputSchema,
    outputSchema: AIChatAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
