<template>
  <dashboard-card
    headline="Total TX Secured"
    :card-sizes="{ xs: 6, sm: 3, md: 4, lg: 3, xl: 2 }"
  >
    <template #description>
      The total number of Transactions your masternodes have secured within the
      {{ mintingsCount }} blocks they have minted.
    </template>
    <span class="text-h2 text-primary">
      {{ txCount.toLocaleString() }}
    </span>
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
      txCount: computed(() => user.totalBlockProperty("transactionCount")),
      mintingsCount: computed(() =>
        user.watchedMasterNodes.reduce(
          (total, masternode) => masternode.mintedBlocksCount + total,
          0
        )
      ),
    };
  },
});
</script>
