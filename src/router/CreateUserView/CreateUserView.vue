<template>
	<div>
		<h1 class="text-h4 text-left">Add User</h1>
		<FormFields @submit-form="submitForm" />
	</div>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import { UserFormModel } from '@web/types';
import { UserService } from '@web/services';

import FormFields from './components/FormFields.vue';

import { ROUTER_CONFIG } from '../router.config';

const router = useRouter();
const $q = useQuasar();

const { error, mutate } = useMutation({
	mutationFn: (formValues: UserFormModel) => UserService.createUser(formValues),
});

const submitForm = async (formValues: UserFormModel) => {
	mutate(formValues);

	if (!error.value) {
		$q.notify({ message: 'Succesfully created user', color: 'positive', textColor: 'white' });
		router.push(ROUTER_CONFIG.userList);
	}
};
</script>

<style scoped lang="scss">
:deep(.q-field__label) {
	top: -10px;
	left: -10px;
	font-weight: 600;
	transform: none;
}

.input-grid {
	gap: 16px;
}
</style>
