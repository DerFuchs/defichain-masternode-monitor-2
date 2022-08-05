<template>
	<q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile">
		<q-list>
			<q-item-label header> Essential Links </q-item-label>
			<NaviEntry v-for="link in linksList" :key="link.title" v-bind="link" />
		</q-list>
	</q-drawer>
</template>

<script>
import { defineComponent, ref } from "vue";
import NaviEntry from "src/components/layout/AppHeader/MainNavigation/NaviEntry.vue";

const linksList = [
	{
		title: "Dashboard",
		caption: "the main overview",
		icon: "fa-light fa-objects-column",
		to: "dashboard",
	},
	{
		title: "Time Line",
		caption: "a historical view",
		icon: "fa-light fa-chart-simple",
		to: "timeline",
	},
	{
		title: "Manage Master Nodes",
		caption: "add and remove watches master nodes",
		icon: "fa-light fa-square-list",
		to: "manage-master-nodes",
	},
];

export default defineComponent({
	name: "MainNavigation",

	components: {
		NaviEntry,
	},

	setup() {
		return {
			linksList,
		};
	},
});
</script>
