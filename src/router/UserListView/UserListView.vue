<template>
	<div>
		<h1 class="text-h4 text-left">User list</h1>
		<QTable
			flat
			:rows="rows"
			row-key="id"
			:columns="columns"
			:rows-per-page-options="[]"
			:loading="isFetching"
			:grid="$q.screen.lt.md"
			class="users-table q=pa-md"
		>
			<template v-slot:top-left>
				<QInput
					borderless
					dense
					debounce="300"
					v-model="filter"
					placeholder="Search for users..."
					:bg-color="filterColor"
					class="search-input"
				>
					<template #append>
						<QIcon name="search" />
					</template>
				</QInput>
			</template>
			<template #top-right>
				<AppButton rounded color="primary" :to="ROUTER_CONFIG.createUser"
					><QIcon name="add" size="xs" left /> Add User</AppButton
				>
			</template>

			<template #item="props"
				><div class="q-pa-xs col-xs-12 col-sm-6 grid-style-transition">
					<QCard bordered flat class="q-pa-md">
						<QList>
							<QItem
								v-for="col in props.cols"
								:key="col.name"
								class="row justify-center items-center q-pa-xs"
							>
								<!-- {{ col }} -->
								<template v-if="col.name === 'avatar'">
									<QAvatar>
										<QImg :src="col.value" fit="cover"></QImg>
									</QAvatar>
								</template>
								<template v-else-if="col.name === 'actions'">
									<div class="row">
										<AppButton
											flat
											size="sm"
											padding="xs"
											color="grey-7"
											:to="{ name: ROUTER_CONFIG.editUser.name, params: { id: props.row } }"
											><QIcon name="edit"
										/></AppButton>
										<AppButton flat size="sm" padding="xs" color="grey-7"
											><QIcon name="delete" @click="removeUser(props.row.id)"
										/></AppButton>
									</div>
								</template>
								<template v-else
									><span>{{ col.value }}</span></template
								></QItem
							>
						</QList>
					</QCard>
				</div>
			</template>
			<template #body-cell-avatar="props">
				<QTd :props="props"
					><QAvatar>
						<QImg :src="props.row.avatar" fit="cover"></QImg>
					</QAvatar>
				</QTd>
			</template>
			<template #body-cell-actions="props">
				<QTd :props="props">
					<div class="row inline q-gutter-x-sm">
						<AppButton
							flat
							size="sm"
							padding="xs"
							color="grey-7"
							:to="{ name: ROUTER_CONFIG.editUser.name, params: { id: props.row.id } }"
							><QIcon name="edit"
						/></AppButton>
						<AppButton flat size="sm" padding="xs" color="grey-7"
							><QIcon name="delete" @click="removeUser(props.row.id)"
						/></AppButton>
					</div>
				</QTd>
			</template>
			<template #bottom>
				<AppPagination :max="totalPages" :maxPages="3" v-model="page" />
			</template>
		</QTable>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { keepPreviousData, useQuery, useMutation } from '@tanstack/vue-query';

import { AppButton, AppPagination } from '@web/components';
import { UserDetails } from '@web/types';
import { UserService } from '@web/services';

import { columns } from './table.config';
import { ROUTER_CONFIG } from '../router.config';
import { useQuasar } from 'quasar';

const page = ref(1);
const filter = ref('');
const $q = useQuasar();
const filterColor = computed(() => ($q.screen.gt.sm ? 'grey-2' : 'white'));

const { isFetching, data, refetch } = useQuery({
	queryKey: ['usersList', page],
	queryFn: () => UserService.getList(page),
	placeholderData: keepPreviousData,
});
const { mutate, error } = useMutation({
	mutationFn: (userId: number) => UserService.removeUser(userId),
});
const removeUser = async (id: number) => {
	await mutate(id);
	if (!error.value) {
		$q.notify({ message: 'Succesfully removed user', color: 'positive', textColor: 'white' });
	}
	await refetch();
};

const totalPages = ref(data?.value?.totalPages || 0);
const rows = ref<UserDetails[]>(data?.value?.data || []);

watch(
	[() => data.value?.data, () => data.value?.totalPages],
	([currentData, currentTotalPages]) => {
		rows.value = currentData || [];
		totalPages.value = currentTotalPages ?? 0;
	},
);

watch(
	() => filter.value,
	(currentValue) => {
		const filteredData = data.value?.data.filter((row) =>
			row.name.toLocaleLowerCase().includes(currentValue.toLocaleLowerCase()),
		);
		rows.value = filteredData ?? [];
	},
);
</script>

<style scoped lang="scss">
:deep(.q-table__middle) {
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;

	@media (min-width: $breakpoint-md-min) {
		padding: 16px;
	}
}

:deep(.q-table__top) {
	padding: 0 6px;

	@media (min-width: $breakpoint-md-min) {
		padding: 12px 16px;
	}
}
:deep(.q-table__bottom) {
	background-color: $grey-3;
	padding: 1rem 0;
}

:deep(.users-table) {
	tbody {
		tr:nth-child(even) {
			background-color: $grey-2;
		}
	}
}

:deep(.q-avatar__content) {
	align-items: stretch;
}

:deep(.search-input) {
	max-width: 40vw;

	@media (min-width: $breakpoint-md-min) {
		max-width: unset;
	}
	.q-field__control {
		padding-left: 1rem;
		padding-right: 1rem;
	}
}
</style>
