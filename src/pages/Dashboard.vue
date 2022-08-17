<template>
  <q-page class="q-pa-md">
    <div class="row items-stretch q-col-gutter-md">
      <mintings-count />
      <tx-sum />
      <reward-sum />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
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
    const store = useBasicsStore();
    return { store };
  },
});
</script>
