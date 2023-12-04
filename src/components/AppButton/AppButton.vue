<template>
	<QBtn
		class="app-button"
		:color="$attrs.color ? `${$attrs.color}` : 'primary'"
		:noCaps="$attrs.noCaps != null ? !!$attrs.noCaps : true"
		unelevated
		v-bind="$attrs"
		><slot
	/></QBtn>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.app-button {
	text-transform: none;
	font-weight: 600;
}
</style>
