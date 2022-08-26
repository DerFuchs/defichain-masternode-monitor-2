<template>
  <dashboard-card
    headline="Total TX Secured"
    :card-sizes="{ xs: 6, sm: 3, md: 3, lg: 2, xl: 2 }"
  >
    <template #description>
      The total number of Transactions your masternodes have written into DeFiChain within
      the {{ mintingsCount }} blocks they have minted.
    </template>
    <q-card-section class="text-h2 text-primary">
      {{ txCount.toLocaleString() }}
    </q-card-section>
  </dashboard-card>
</template>

<script>
import { defineComponent, computed } from "vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

import DashboardCard from "components/common/DashboardCard.vue";

export default defineComponent({
  name: "RewardSum",

  components: { DashboardCard },

  setup() {
    const basics = useBasicsStore();
    const user = useUserStore();

    return {
      basics,
      user,
      txCount: computed(() => {
        return user.totalBlockPropertyContext("transactionCount");
      }),
      mintingsCount: computed(() =>
        user.watchedMasterNodesContext.reduce(
          (total, masternode) => masternode.mintedBlocksCount + total,
          0
        )
      ),
    };
  },
});
</script>
