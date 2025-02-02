import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'node:path';

export default defineConfig({
	output: {
		filename: {
			js: '[name].js',
		},
	},
	environments: {
		web: {
			plugins: [ pluginReact() ],
			source: {
				entry: {
					popup: path.resolve(__dirname, './src/index.tsx'),
					warning: path.resolve(__dirname, './src/warning.tsx')
				},
			},
			html: {
				template: ['./static/popup.html'],

			},
			output: {
				target: 'web',
				copy: [ { from: './public' } ],
			}
		},
		webworker: {
			source: {
				entry: {
					background: './src/background.ts',
					contentScript: './src/contentScript.ts',
				},
			},
			output: {
				target: 'web-worker'
			}
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@shared': path.resolve(__dirname, './src/shared'),
			'@app': path.resolve(__dirname, './src/app'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@features': path.resolve(__dirname, './src/features'),
			'@widgets': path.resolve(__dirname, './src/widgets'),
		}
	}
});
