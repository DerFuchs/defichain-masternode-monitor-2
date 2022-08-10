<template>
	<q-page class="flex flex-center">
		{{ store.fetching }}
		{{ store.fetchingMintingsCount.length }}
	</q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useBasicsStore } from "stores/basics";

export default defineComponent({
	name: "IndexPage",
	setup() {
		const store = useBasicsStore();
		return { store };
	},
});
</script>
