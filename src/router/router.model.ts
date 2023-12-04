import { RouteMeta } from 'vue-router';

export type RouteConfig = {
	path: string;
	name: string;
	meta: RouteMeta;
};

export type NavigationConfigItem = {
	main: RouteConfig;
	children: NavigationConfigItem[];
};
