<template>
  <router-view />
</template>

<script>
import { defineComponent, watch, toRef, onBeforeMount } from "vue";
import { useQuasar } from "quasar";

import { useUserStore } from "stores/user";
import { useDeFiChainStore } from "src/stores/defichain";

export default defineComponent({
  name: "App",
  setup() {
    const quasar = useQuasar();
    const user = useUserStore();
    const deFiChain = useDeFiChainStore();

    onBeforeMount(() => {
      deFiChain.$persistedState
        .isReady()
        .then(() => {
          deFiChain.fetchRewardDistribution();
          deFiChain.cleanupAllKnownMasterNodes();
          user.fetchWatchedMasterNodesData();
        })
        .then(() => {
          if (process.env.DEBUG)
            console.log(
              "Number of known master nodes:",
              deFiChain.allKnownMasterNodes.length
            );
        });
    });

    const darkModeSetting = toRef(user.settings, "darkMode");
    quasar.dark.set(darkModeSetting);
    watch(darkModeSetting, (newSetting) => {
      quasar.dark.set(newSetting);
    });

    //basics.fetchAllMintings();
  },
});
</script>
