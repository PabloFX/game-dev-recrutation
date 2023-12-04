<template>
	<QPagination
		direction-links
		unelevated
		color="white"
		active-color="primary"
		active-text-color="white"
		class="app-pagination q-mr-auto"
		text-color="primary"
		gutter="none"
		padding="none"
		active-design="unelevated"
		:maxPages="maxPages"
		:max="max"
		v-model="value"
		icon-next="keyboard_double_arrow_right"
		icon-prev="keyboard_double_arrow_left"
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ max: number; maxPages: number; modelValue: number }>();
const emit = defineEmits(['update:modelValue']);

const value = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});
</script>

<style scoped lang="scss">
:deep(.q-pagination__content) {
	border: 1px solid $grey-4;
	background-color: #fff;
	.q-btn {
		border-radius: 0;
		height: 100%;
		font-size: 12px;

		.q-btn__content {
			min-width: 24px;
			min-height: 24px;
		}

		.q-icon {
			font-size: 14px;
		}
	}
}

:deep(.q-pagination__middle) {
	border-left: 1px solid $grey-4;
	border-right: 1px solid $grey-4;
	.q-btn {
		&:not(:last-child) {
			border-right: 1px solid $grey-4;
		}
	}
}
</style>
