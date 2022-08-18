<template>
  <dashboard-card
    headline="Minted Blocks"
    :card-sizes="{ xs: 6, sm: 3, md: 3, lg: 2, xl: 1 }"
  >
    <template #description>
      The total number of blocks all your masternodes have been minting since the first
      one came to life.
    </template>
    <q-card-section class="text-h2 text-primary">
      {{ mintingsCount }}
    </q-card-section>
  </dashboard-card>
</template>

<script>
import { defineComponent, computed } from "vue";

import { useUserStore } from "stores/user";

import DashboardCard from "components/common/DashboardCard.vue";

export default defineComponent({
  name: "MintingsCount",

  components: { DashboardCard },

  setup() {
    const user = useUserStore();

    return {
      user,
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
