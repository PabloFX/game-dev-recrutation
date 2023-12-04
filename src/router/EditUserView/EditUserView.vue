<template>
	<div>
		<h1 class="text-h4 text-left">Edit User</h1>
		<FormFields @submit-form="submitForm" :userData="data" />
	</div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useRouter, useRoute } from 'vue-router';

import { UserService } from '@web/services';
import { UserFormModel } from '@web/types';

import { ROUTER_CONFIG } from '../router.config';

import FormFields from '../CreateUserView/components/FormFields.vue';

const router = useRouter();
const route = useRoute();

const $q = useQuasar();

const { id } = route.params;

const { error, mutate } = useMutation({
	mutationFn: (formValues: UserFormModel) => UserService.editUser(+id, formValues),
});

const { data } = useQuery({
	queryKey: ['user'],
	queryFn: () => UserService.getUser(+id),
});

const submitForm = async (formValues: UserFormModel) => {
	mutate(formValues);

	if (!error.value) {
		$q.notify({ message: 'Succesfully edited user', color: 'positive', textColor: 'white' });
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

.classtest {
	gap: 16px;
}
</style>
