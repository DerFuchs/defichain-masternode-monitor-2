<template>
  <q-spinner-puff v-if="basics.isProcessing('reFetchAllData')" color="accent" size="md" />
  <q-btn v-else flat dense :icon="icon" color="white" @click="reFetchAllData()"> </q-btn>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useBasicsStore } from "stores/basics";
import { useDeFiChainStore } from "stores/defichain";
import { useUserStore } from "stores/user";

export default defineComponent({
  name: "DataRefresh",

  setup() {
    const basics = useBasicsStore();
    const defichain = useDeFiChainStore();
    const user = useUserStore();

    const icons = {
      default: "fa-light fa-arrow-rotate-right",
      finished: "fa-light fa-check",
    };
    const icon = ref(icons.default);

    return {
      basics,
      icon,
      reFetchAllData: () => {
        basics.setProcessing("reFetchAllData");
        Promise.all([
          defichain.fetchRewardDistribution(),
          user.fetchWatchedMasterNodesData(),
        ]).then(() => {
          setTimeout(() => {
            basics.setProcessingFinished("reFetchAllData");
            icon.value = icons.finished;
            setTimeout(() => (icon.value = icons.default), 1500);
          }, 1000);
          basics.lastRefresh = new Date().toISOString();
        });
      },
    };
  },
});
</script>
