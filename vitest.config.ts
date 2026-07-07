import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
	test: {
		environment: 'node',
		include: ['tests/**/*.test.ts', 'src/**/*.test.ts'],
		passWithNoTests: true,
	},
	resolve: {
		alias: {
			// Unit tests run outside Obsidian; resolve the API to a lightweight mock.
			obsidian: fileURLToPath(
				new URL('./tests/mocks/obsidian.ts', import.meta.url),
			),
		},
	},
});
