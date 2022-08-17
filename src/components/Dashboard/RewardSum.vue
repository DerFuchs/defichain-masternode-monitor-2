<template>
  <dashboard-card
    headline="Total Rewards"
    :card-sizes="{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }"
  >
    <template #description>
      The total number of DFI your masternodes have received as rewards for the
      {{ mintingsCount }} blocks they have minted.
    </template>
    DFI
    <span class="text-h2 text-primary">
      {{ totalDfi.toLocaleString({}, basics.formatting.currency.dfiNoSymbol) }}
    </span>
    <br />
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
      totalDfi: computed(() => user.totalBlockProperty("reward")),
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
