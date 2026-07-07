import { App, PluginSettingTab, Setting } from 'obsidian';
import type AgentChatPlugin from '../main';

/** Settings tab. Split into focused sub-panels as options grow. */
export class AgentChatSettingTab extends PluginSettingTab {
	private readonly plugin: AgentChatPlugin;

	constructor(app: App, plugin: AgentChatPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName('System prompt')
			.setDesc('Base instruction sent to the model.')
			.addTextArea((text) =>
				text
					.setValue(this.plugin.settings.systemPrompt)
					.onChange(async (value) => {
						this.plugin.settings.systemPrompt = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
