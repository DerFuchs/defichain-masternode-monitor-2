<template>
	<q-layout view="lHh Lpr lFf">
		<app-header />

		<q-page-container>
			<router-view />
		</q-page-container>

		<q-footer class="bg-primary-dark text-white">
			<q-toolbar>
				<q-toolbar-title>
					<div>Blockping</div>
				</q-toolbar-title>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>

<script>
import AppHeader from "src/components/layout/AppHeader.vue";

import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "MainLayout",

	components: {
		AppHeader,
	},
});
</script>
