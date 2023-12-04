<template>
	<QLayout>
		<QPageContainer class="page-container">
			<router-view />
		</QPageContainer>
	</QLayout>
</template>

<style lang="scss" scoped>
.page-container {
	width: 100%;
	height: 100%;
	background-color: $grey-3;
	max-width: 1920px;
	margin-inline: auto;
	padding: 24px;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	@media (min-width: $breakpoint-md-min) {
		padding: 96px;
	}
}
</style>
