import { z } from 'zod';

export const aiChatRequestSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, 'Message is required.')
    .max(4000, 'Message is too long.'),

  previousResponseId: z.string().nullable().optional(),
});

export type AiChatRequest = z.infer<typeof aiChatRequestSchema>;
