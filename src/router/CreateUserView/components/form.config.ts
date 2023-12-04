import * as yup from 'yup';
import { useField } from 'vee-validate';
import { UserFormModel } from '@web/types';

export const AVATAR_PLACEHOLDER_URL =
	'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png';

export const initialFormValues: UserFormModel = {
	firstName: '',
	lastName: '',
	avatar: '',
};

export const getValidationSchema = () => {
	return yup.object({
		firstName: yup.string().required('First name is required'),
		lastName: yup.string().required('Last name is required'),
		avatar: yup.string().nullable(),
	});
};

export const getFormFields = () => {
	const {
		value: firstNameValue,
		errors: firstNameErrors,
		errorMessage: firstNameErrorMessage,
	} = useField<UserFormModel['firstName']>('firstName');
	const {
		value: lastNameValue,
		errors: lastNameErrors,
		errorMessage: lastNameErrorMessage,
	} = useField<UserFormModel['lastName']>('lastName');
	const {
		value: avatarValue,
		errors: avatarErrors,
		errorMessage: avatarErrorMessage,
	} = useField<UserFormModel['avatar']>('avatar');

	return {
		firstNameValue,
		firstNameErrors,
		firstNameErrorMessage,
		lastNameValue,
		lastNameErrors,
		lastNameErrorMessage,
		avatarValue,
		avatarErrors,
		avatarErrorMessage,
	};
};
