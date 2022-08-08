<template>
  <router-view />
</template>

<script>
import { defineComponent, watch, toRef } from "vue";
import { useQuasar } from "quasar";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";
import { useDeFiChainStore } from "src/stores/defichain";

export default defineComponent({
  name: "App",
  setup() {
    const quasar = useQuasar();
    //const basics = useBasicsStore();
    const user = useUserStore();
    const deFiChain = useDeFiChainStore();

    //basics.fetchAllMintings();

    // Initialize dark mode and react to changes of it's setting
    const darkModeSetting = toRef(user.settings, "darkMode");
    quasar.dark.set(darkModeSetting);
    watch(darkModeSetting, (newSetting) => {
      quasar.dark.set(newSetting);
    });

    deFiChain.$persistedState
      .isReady()
      .then(() => {
        if (!deFiChain.hasKnownMasterNodeList) {
          if (process.env.DEBUG) console.log("Fetching list of all known master nodes");
          deFiChain.fetchAllKnownDeFiChainMasterNodes();
        }
      })
      .then(() => {
        if (process.env.DEBUG)
          console.log(
            "Number of known master nodes:",
            deFiChain.allKnownMasterNodes.length
          );
      });
  },
});
</script>
