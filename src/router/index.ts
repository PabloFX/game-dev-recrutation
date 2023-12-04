import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { ROUTER_CONFIG } from './router.config';

import MainLayout from '../layouts/MainLayout.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: MainLayout,
		children: [
			{
				...ROUTER_CONFIG.userList,
				component: () => import('./UserListView/UserListView.vue'),
			},
			{
				...ROUTER_CONFIG.createUser,
				component: () => import('./CreateUserView/CreateUserView.vue'),
			},
			{
				...ROUTER_CONFIG.editUser,
				component: () => import('./EditUserView/EditUserView.vue'),
			},
		],
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
