import { RouteConfig } from './router.model';

const userList = {
	path: '/',
	name: 'user_list',
	meta: {},
} as const satisfies RouteConfig;

const createUser = {
	path: '/create-user',
	name: 'create_user',
	meta: {},
} as const satisfies RouteConfig;

const editUser = {
	path: '/edit-user/:id',
	name: 'edit_user',
	meta: {},
} as const satisfies RouteConfig;

export const ROUTER_CONFIG = {
	userList,
	createUser,
	editUser,
};

export type RouterConfig = typeof ROUTER_CONFIG;
export type RouterPath = RouterConfig[keyof RouterConfig]['path'];
export type RouteObject = {
	name: string;
	params: { [key: string]: string | number };
};
