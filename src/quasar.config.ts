import { Notify } from 'quasar';
import langEn from 'quasar/lang/en-US';
import iconSet from 'quasar/icon-set/material-icons';

export const QUASAR_CONFIG = {
	iconSet: iconSet,
	plugins: {
		Notify,
	},
	config: {
		notify: {
			color: 'warning',
			textColor: 'black',
			icon: 'warning',
			position: 'top' as const,
			timeout: 10 * 1000,
		},
	},
	lang: langEn,
};
