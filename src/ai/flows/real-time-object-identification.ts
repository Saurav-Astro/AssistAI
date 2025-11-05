// Real-Time Object Identification flow using Genkit and the Gemini vision model.

'use server';

/**
 * @fileOverview Implements real-time object identification using the device's camera, audibly announcing identified objects to the user.
 *
 * - identifyObjects - Uses the Gemini vision model to identify objects in an image and returns a description.
 * - IdentifyObjectsInput - The input type for the identifyObjects function, expects an image data URI.
 * - IdentifyObjectsOutput - The return type for the identifyObjects function, returns a description of the objects found.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyObjectsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo captured by the device's camera, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyObjectsInput = z.infer<typeof IdentifyObjectsInputSchema>;

const IdentifyObjectsOutputSchema = z.object({
  objectDescription: z.string().describe('A description of the objects identified in the image.'),
});
export type IdentifyObjectsOutput = z.infer<typeof IdentifyObjectsOutputSchema>;

export async function identifyObjects(input: IdentifyObjectsInput): Promise<IdentifyObjectsOutput> {
  return identifyObjectsFlow(input);
}

const identifyObjectsPrompt = ai.definePrompt({
  name: 'identifyObjectsPrompt',
  input: {schema: IdentifyObjectsInputSchema},
  output: {schema: IdentifyObjectsOutputSchema},
  prompt: `You are an AI vision assistant that analyzes images and identifies the objects present.

  Given the following image, describe the objects you see in it.

  Image: {{media url=photoDataUri}}
  `,
});

const identifyObjectsFlow = ai.defineFlow(
  {
    name: 'identifyObjectsFlow',
    inputSchema: IdentifyObjectsInputSchema,
    outputSchema: IdentifyObjectsOutputSchema,
  },
  async input => {
    const {output} = await identifyObjectsPrompt(input);
    return output!;
  }
);
