<template>
	<!--
		flex-1 + min-h-0 make this fill the remaining height between header and
		footer. overflow-y-auto enables scrolling within that bounded space.
	-->
	<div
		class="flex min-h-0 flex-1 flex-col"
		data-sidebar="content"
	>
		<slot />
	</div>
</template>

<style scoped>
div {
	overflow-y: auto;
	overflow-y: overlay;
}
</style>
