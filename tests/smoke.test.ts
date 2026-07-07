import { describe, it, expect } from 'vitest';
import { Plugin } from 'obsidian';

// Smoke test: verifies the test runner and the Obsidian mock alias are wired up.
describe('test harness', () => {
	it('resolves the mocked obsidian module', () => {
		expect(typeof Plugin).toBe('function');
	});
});
