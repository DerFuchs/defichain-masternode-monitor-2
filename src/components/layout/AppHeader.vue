<template>
	<q-header class="bg-primary-dark text-white" height-hint="98">
		<q-toolbar>
			<master-node-tabs />
			<q-space />
			<q-btn dense flat round icon="fal fa-bars" @click="toggleLeftDrawer" />
		</q-toolbar>
	</q-header>
	<main-navigation v-model="leftDrawerOpen" />
</template>

<script>
import { defineComponent, ref } from "vue";
import MasterNodeTabs from "components/layout/AppHeader/MasterNodeTabs.vue";
import MainNavigation from "components/layout/AppHeader/MainNavigation.vue";

export default defineComponent({
	name: "AppHeader",

	components: {
		MasterNodeTabs,
		MainNavigation,
	},

	setup() {
		const leftDrawerOpen = ref(false);

		return {
			leftDrawerOpen,
			toggleLeftDrawer() {
				leftDrawerOpen.value = !leftDrawerOpen.value;
			},
		};
	},
});
</script>
