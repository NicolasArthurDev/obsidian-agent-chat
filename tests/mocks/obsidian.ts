// Minimal mock of the Obsidian API for unit tests that run outside Obsidian.
// Extend this as adapters and tests require more of the surface.

export class Plugin {
	app: unknown;
	manifest: unknown;
	constructor(app?: unknown, manifest?: unknown) {
		this.app = app;
		this.manifest = manifest;
	}
	addCommand() {}
	addRibbonIcon() {}
	addSettingTab() {}
	registerView() {}
	async loadData() {
		return {};
	}
	async saveData() {}
}

export class PluginSettingTab {
	constructor(_app?: unknown, _plugin?: unknown) {}
	display() {}
}

export class Setting {
	constructor(_containerEl?: unknown) {}
	setName() {
		return this;
	}
	setDesc() {
		return this;
	}
	addText() {
		return this;
	}
	addToggle() {
		return this;
	}
	addDropdown() {
		return this;
	}
	addButton() {
		return this;
	}
}

export class ItemView {
	constructor(_leaf?: unknown) {}
}

export class Modal {
	constructor(_app?: unknown) {}
	open() {}
	close() {}
}

export class Notice {
	constructor(_message?: string) {}
}

export async function requestUrl(): Promise<unknown> {
	throw new Error('requestUrl is not available in unit tests');
}
