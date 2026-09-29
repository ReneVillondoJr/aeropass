import { getMockAiResponse } from '../data/ai-concierge';

import type { AiResponse } from '../types/ai-concierge';

export async function askAeroPassAi(message: string): Promise<AiResponse> {
  /*
   * Temporary local AI behavior.
   *
   * Later this function can call:
   *
   * POST /api/ai/chat
   *
   * without changing the chat UI.
   */

  await new Promise((resolve) => setTimeout(resolve, 650));

  return getMockAiResponse(message);
}
