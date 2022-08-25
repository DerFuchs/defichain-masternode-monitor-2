<template>
  <q-page class="q-pa-md">
    <div class="row items-stretch q-col-gutter-md">
      <mintings-count />
      <tx-sum />
      <reward-sum />
    </div>
    <q-inner-loading :showing="isWorking" class="bg-blur">
      <ocean-spinner />
    </q-inner-loading>
  </q-page>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useBasicsStore } from "stores/basics";

import MintingsCount from "components/Dashboard/MintingsCount.vue";
import RewardSum from "components/Dashboard/RewardSum.vue";
import TxSum from "components/Dashboard/TxSum.vue";

export default defineComponent({
  name: "IndexPage",

  components: {
    MintingsCount,
    RewardSum,
    TxSum,
  },

  setup() {
    const basics = useBasicsStore();
    return {
      isWorking: computed(() => basics.isFetching() || basics.isProcessing()),
    };
  },
});
</script>
