<template>
	<router-view />

	<!-- <q-dialog :model-value="basics.hasUnreadErrors" position="bottom">
    <q-card square>
      <q-card-section class="row items-center no-wrap">
        <q-list>
          <q-item v-for="(error, index) in basics.unreadErrors" :key="index">
            {{ error.message }}
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog> -->
</template>

<script>
import { defineComponent, watch, toRef, onBeforeMount } from "vue";
import { useQuasar } from "quasar";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";
import { useDeFiChainStore } from "src/stores/defichain";

export default defineComponent({
	name: "App",
	setup() {
		const basics = useBasicsStore();
		const quasar = useQuasar();
		const user = useUserStore();
		const deFiChain = useDeFiChainStore();

		onBeforeMount(() => {
			Promise.all([
				basics.$persistedState.isReady(),
				user.$persistedState.isReady(),
				deFiChain.$persistedState.isReady(),
			])
				.then(() => {
					if (user.settings.customOceanUrl) {
						deFiChain.setCustomOceanUrl(user.settings.customOceanUrl);
					}
					deFiChain.setChainNetwork(user.settings.chainNetwork);

					deFiChain.fetchRewardDistribution();
					deFiChain.fetchStats();
					deFiChain.fetchPrices();
					deFiChain.cleanupAllKnownMasterNodes();
					user.fetchWatchedMasterNodesData();
					basics.lastRefresh = new Date().toISOString();
				})
				.then(() => {
					if (process.env.DEBUG)
						console.log(
							"Number of known masternodes:",
							deFiChain.allKnownMasterNodes.length
						);
				});
		});

		const darkModeSetting = toRef(user.settings, "darkMode");
		quasar.dark.set(darkModeSetting.value);
		watch(darkModeSetting, (newSetting) => {
			quasar.dark.set(newSetting);
		});

		return {
			basics,
		};
	},
});
</script>
