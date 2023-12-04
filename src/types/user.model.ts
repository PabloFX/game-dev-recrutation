export type UserDataApi = {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
};

export type UserDetails = {
	id: number;
	name: string;
	email: string;
	avatar: string;
};

export const apiToAppUserData = (apiData: UserDataApi): UserDetails => ({
	id: apiData.id,
	name: `${apiData.first_name} ${apiData.last_name}`,
	email: apiData.email,
	avatar: apiData.avatar,
});

export type UserFormModel = {
	firstName: string;
	lastName: string;
	avatar: string;
};

export type CreateUserModelApi = {
	name: string;
};

export const appToApiCreateUserModel = (appData: UserFormModel): CreateUserModelApi => ({
	name: `${appData.firstName} ${appData.lastName}`,
});

export const apiToAppUserFormModel = (apiData: UserDataApi): UserFormModel => ({
	firstName: apiData.first_name,
	lastName: apiData.last_name,
	avatar: apiData.avatar,
});
