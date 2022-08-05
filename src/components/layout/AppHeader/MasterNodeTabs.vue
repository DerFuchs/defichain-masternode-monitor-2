<template>
	<q-tabs
		align="left"
		dense
		inline-label
		outside-arrows
		mobile-arrows
		shrink
		stretch
	>
		<q-route-tab to="/page1" label="MN 1" />
		<q-route-tab to="/page2" label="MN 2" />
		<q-route-tab to="/page3" label="MN 3" />
		<q-route-tab to="/page3" label="MN 4" />
		<q-route-tab to="/page3" label="MN 5" />
	</q-tabs>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "MasterNodeTabs",
});
</script>
