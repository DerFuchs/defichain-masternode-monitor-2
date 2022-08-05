<template>
	<router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useBasicsStore } from "stores/basics";
import { useMasterNodesStore } from "stores/masternodes";

export default defineComponent({
	name: "App",
	setup() {
		const store = useBasicsStore();
		//store.fetchAllMintings();

		/*
		const masterNodesStore = useMasterNodesStore();

		masterNodesStore.$persistedState
			.isReady()
			.then(() => {
				if (!masterNodesStore.hasMasterNodeList) {
					if (process.env.DEBUG)
						console.log("Fetching list of all known master nodes");
					masterNodesStore.fetchAllKnownDeFiChainMasterNodes();
				}
			})
			.then(() => {
				if (process.env.DEBUG)
					console.log(
						"Number of known master nodes:",
						masterNodesStore.masterNodes.length
					);
			});
      */
	},
});
</script>
