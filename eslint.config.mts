import obsidianmd from 'eslint-plugin-obsidianmd';
import globals from 'globals';
import { globalIgnores, defineConfig } from 'eslint/config';

export default defineConfig(
	globalIgnores([
		'node_modules',
		'dist',
		'coverage',
		'esbuild.config.mjs',
		'version-bump.mjs',
		'versions.json',
		'main.js',
		'package.json',
		'package-lock.json',
		'tsconfig.json',
		'**/*.svelte',
	]),
	{
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parserOptions: {
				projectService: {
					allowDefaultProject: [
						'eslint.config.mts',
						'manifest.json',
						'svelte.config.js',
						'vitest.config.ts',
					],
				},
				tsconfigRootDir: import.meta.dirname,
				extraFileExtensions: ['.json'],
			},
		},
	},
	...obsidianmd.configs.recommended,
	{
		// Enforce small, single-responsibility files across the source tree.
		files: ['src/**/*.ts'],
		rules: {
			'max-lines': [
				'error',
				{ max: 200, skipBlankLines: true, skipComments: true },
			],
		},
	},
	{
		// The domain layer must stay pure: no Obsidian, Node, or framework imports.
		files: ['src/domain/**/*.ts'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: [
								'obsidian',
								'electron',
								'node:*',
								'svelte',
								'svelte/*',
								'@modelcontextprotocol/*',
							],
							message:
								'The domain layer must not depend on Obsidian, Node, or infrastructure. Keep it pure.',
						},
					],
				},
			],
		},
	},
);
