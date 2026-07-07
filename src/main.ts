import { Plugin } from 'obsidian';
import {
	AgentChatSettings,
	DEFAULT_SETTINGS,
} from './settings/AgentChatSettings';
import { AgentChatSettingTab } from './settings/AgentChatSettingTab';

/**
 * Plugin entry point. Responsible only for lifecycle and dependency wiring;
 * feature logic lives in the application and infrastructure layers.
 */
export default class AgentChatPlugin extends Plugin {
	settings!: AgentChatSettings;

	async onload(): Promise<void> {
		await this.loadSettings();
		this.addSettingTab(new AgentChatSettingTab(this.app, this));
	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<AgentChatSettings>,
		);
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
}
