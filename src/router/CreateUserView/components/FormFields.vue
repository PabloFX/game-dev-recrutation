<template>
	<QForm class="form row q-col-gutter-lg">
		<div class="col-12 col-md-8">
			<div class="column bg-white full-height justify-between q-pa-lg q-pt-xl">
				<div class="row input-grid">
					<QInput
						outlined
						stack-label
						dense
						class="col-12 col-md"
						v-model="formFields.firstNameValue.value"
						label="First Name"
						:error="!!formFields.firstNameErrors.value.length"
						:error-message="formFields.firstNameErrorMessage.value"
					/>
					<QInput
						outlined
						stack-label
						dense
						class="col-12 col-md"
						v-model="formFields.lastNameValue.value"
						label="Last Name"
						:error="!!formFields.lastNameErrors.value.length"
						:error-message="formFields.lastNameErrorMessage.value"
					/>
				</div>
				<div class="row q-mt-md">
					<AppButton @click="validateForm">Update Details</AppButton>
				</div>
			</div>
		</div>
		<div class="col-12 col-md-4">
			<div class="column bg-white items-center q-pa-lg">
				<QAvatar size="120px" class="q-mb-xl">
					<QImg
						:src="
							!!formFields.avatarValue.value ? formFields.avatarValue.value : AVATAR_PLACEHOLDER_URL
						"
						fit="cover"
					></QImg>
				</QAvatar>
				<AppButton outline color="grey-8" class="full-width" @click="showAvatarDialog = true"
					><QIcon name="photo_camera" left />Change photo</AppButton
				>
			</div>
		</div>
		<QDialog v-model="showAvatarDialog" class="avatar-dialog">
			<QCard class="q-pa-lg" style="width: 400px; max-width: 100vw">
				<QCardSection>
					<QInput
						outlined
						stack-label
						dense
						class="col"
						v-model="formFields.avatarValue.value"
						label="Avatar Url"
						:error="!!formFields.avatarErrors.value.length"
						:error-message="formFields.avatarErrorMessage.value"
					/>
				</QCardSection>
				<QCardActions align="right">
					<AppButton @click="showAvatarDialog = false">Close Dialog</AppButton>
				</QCardActions>
			</QCard>
		</QDialog>
	</QForm>
</template>

<script setup lang="ts">
import {
	getFormFields,
	getValidationSchema,
	initialFormValues,
	AVATAR_PLACEHOLDER_URL,
} from './form.config';

import { AppButton } from '@web/components';
import { useForm } from 'vee-validate';
import { UserFormModel } from '@web/types';
import { ref, watch } from 'vue';

const props = defineProps<{ userData?: UserFormModel }>();
const showAvatarDialog = ref(false);

const emit = defineEmits<{ (e: 'submitForm', value: UserFormModel): void }>();

const form = useForm({
	initialValues: props.userData ? props.userData : initialFormValues,
	validationSchema: getValidationSchema(),
});
const formFields = getFormFields();

const validateForm = async () => {
	await form.validate();

	if (!form.meta.value.valid) {
		return;
	}

	emit('submitForm', form.values);
};

watch(
	() => props.userData,
	(currentData) => {
		form.resetForm({ values: currentData ?? initialFormValues });
	},
);
</script>

<style scoped lang="scss">
:deep(.q-field__label) {
	top: -10px;
	left: -10px;
	font-weight: 600;
	transform: none;
}

:deep(.q-field--labeled .q-field__native) {
	padding-top: 0;
	padding-bottom: 0;
}

.input-grid {
	gap: 32px;
}
</style>
