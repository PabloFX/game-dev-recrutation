import { QTableColumn } from 'quasar';

export const columns: QTableColumn[] = [
	{
		name: 'avatar',
		label: '',
		align: 'left',
		field: 'avatar',
		headerClasses: 'q-table--col-auto-width',
	},
	{
		name: 'name',
		label: 'Full Name',
		align: 'left',
		field: 'name',
		sortable: true,
	},
	{
		name: 'actions',
		label: 'Actions',
		align: 'right',
		field: () => null,
	},
];
