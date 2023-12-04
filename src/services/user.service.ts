import {
	UserDataApi,
	UserDetails,
	apiToAppUserData,
	appToApiCreateUserModel,
	UserFormModel,
	apiToAppUserFormModel,
} from '@web/types';

import { Notify } from 'quasar';
import { Ref } from 'vue';

export const UserService = {
	getList: async (page: Ref<number>): Promise<{ data: UserDetails[]; totalPages: number }> => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}users?page=${page.value}&per_page=5`);
			const data = await response.json();
			const mappedData =
				data.data.map((user: UserDataApi): UserDetails => apiToAppUserData(user)) || [];

			return { data: mappedData, totalPages: data.total_pages };
		} catch (err) {
			Notify.create({
				message: 'There was an error getting users list',
			});
			throw Error('There was an error getting users list');
		}
	},
	removeUser: async (id: number) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}users/${id}`, {
				method: 'DELETE',
			});
		} catch (err) {
			Notify.create({
				message: 'There was an error removing the user',
			});
			throw Error('There was an error removing the user');
		}
	},
	createUser: async (formValues: UserFormModel) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}users`, {
				method: 'POST',
				body: JSON.stringify(appToApiCreateUserModel(formValues)),
			});
		} catch (err) {
			Notify.create({
				message: 'There was an error creating the User',
			});
			throw Error('There was an error creating the User');
		}
	},
	getUser: async (id: number): Promise<UserFormModel> => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}users/${id}`);
			const data = await response.json();
			const formData = apiToAppUserFormModel(data.data);

			return formData;
		} catch (err) {
			Notify.create({
				message: 'There was an error getting the user data',
			});
			throw Error('There was an error getting the user data');
		}
	},
	editUser: async (id: number, formValues: UserFormModel) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}users/${id}`, {
				method: 'PUT',
				body: JSON.stringify(appToApiCreateUserModel(formValues)),
			});
		} catch (err) {
			Notify.create({
				message: 'There was an error editting the user',
			});
			throw Error('There was an error editting the user');
		}
	},
};
