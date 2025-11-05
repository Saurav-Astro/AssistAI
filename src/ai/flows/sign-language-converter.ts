'use server';

/**
 * @fileOverview Implements a sign language to text converter using the device's camera and AI.
 *
 * - convertSignToText - A function that handles the sign language conversion.
 * - ConvertSignToTextInput - The input type for the convertSignToText function.
 * - ConvertSignToTextOutput - The return type for the convertSignToText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConvertSignToTextInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a hand sign, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ConvertSignToTextInput = z.infer<typeof ConvertSignToTextInputSchema>;

const ConvertSignToTextOutputSchema = z.object({
  text: z.string().describe("The converted text from the sign language gesture."),
});
export type ConvertSignToTextOutput = z.infer<typeof ConvertSignToTextOutputSchema>;

export async function convertSignToText(input: ConvertSignToTextInput): Promise<ConvertSignToTextOutput> {
  return convertSignToTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'convertSignToTextPrompt',
  input: {schema: ConvertSignToTextInputSchema},
  output: {schema: ConvertSignToTextOutputSchema},
  prompt: `You are an expert in American Sign Language (ASL). Analyze the image of the hand sign and provide the corresponding word or letter.

Image: {{media url=photoDataUri}}`,
});

const convertSignToTextFlow = ai.defineFlow(
  {
    name: 'convertSignToTextFlow',
    inputSchema: ConvertSignToTextInputSchema,
    outputSchema: ConvertSignToTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
