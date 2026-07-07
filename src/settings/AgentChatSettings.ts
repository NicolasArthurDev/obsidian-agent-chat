/** Identifier of a supported LLM provider. */
export type ProviderId = 'ollama' | 'gemini' | 'openai' | 'anthropic';

/** Persisted plugin settings. Expanded across later milestones. */
export interface AgentChatSettings {
	systemPrompt: string;
	provider: ProviderId;
}

export const DEFAULT_SETTINGS: AgentChatSettings = {
	systemPrompt: 'You are a helpful assistant inside Obsidian.',
	provider: 'ollama',
};
