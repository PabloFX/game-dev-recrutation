import path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default defineConfig({
	plugins: [
		vue({
			template: { transformAssetUrls },
		}),

		quasar({
			autoImportComponentCase: 'pascal',
			sassVariables: 'src/quasar-variables.sass',
		}),
	],
	resolve: {
		alias: {
			'@web': path.resolve(__dirname, './src'),
		},
	},
});
