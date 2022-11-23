<template>
	<div class="col-12 text-center absolute-bottom q-pb-md">
		<arrange-cards />
	</div>
</template>

<script>
import { defineComponent } from "vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

import ArrangeCards from "components/Dashboard/DashboardOptions/ArrangeCards.vue";

export default defineComponent({
	name: "DashboardOptions",

	components: {
		ArrangeCards,
	},

	setup() {
		const basics = useBasicsStore();
		const user = useUserStore();
		return {
			basics,
			user,
		};
	},
});
</script>
