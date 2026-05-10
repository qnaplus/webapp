<template>
	<!--
		flex-1 makes this fill the horizontal space left by the Sidebar's gap div.
		min-h-svh ensures the content area is at least as tall as the viewport.
	-->
	<main class="relative flex min-h-svh flex-1 flex-col" data-sidebar="inset">
		<slot />
	</main>
</template>
