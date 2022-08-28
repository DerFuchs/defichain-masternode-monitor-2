<template>
  <dashboard-card
    headline="Total Rewards"
    :card-sizes="{ xs: 12, sm: 4, md: 4, lg: 3, xl: 2 }"
  >
    <template #description>
      The total number of DFI your masternodes have received as rewards for the
      {{ mintingsCount }} blocks they have minted.
    </template>
    <template #settings>
      <!-- other currencies -->
      <q-item v-ripple tag="label">
        <q-item-section>
          <q-item-label>Show Price In Other Currencies</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="settings.showCurrencies" color="blue" val="battery" />
        </q-item-section>
      </q-item>
      <!-- TX Fees -->
      <q-item v-ripple tag="label">
        <q-item-section>
          <q-item-label>Show Earned TX Fees</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="settings.showTxFees" color="blue" val="battery" />
        </q-item-section>
      </q-item>
    </template>
    <q-card-section>
      DFI
      <span
        class="text-primary text-weight-light"
        :class="{ 'text-h2': totalDfi < 10000, 'text-h3': totalDfi >= 10000 }"
      >
        {{ totalDfi.toLocaleString({}, basics.formatting.currency.dfiNoSymbol) }}
      </span>
    </q-card-section>
    <q-separator v-if="settings.showCurrencies" />
    <q-card-section v-if="settings.showCurrencies" class="row">
      <div class="text-caption col-12">In other currencies</div>
      <div class="col-4 text-body1">
        {{
          (totalDfi * defichain.price("DFI-USD")).toLocaleString(
            {},
            basics.formatting.currency.usd
          )
        }}
      </div>
    </q-card-section>

    <q-separator v-if="settings.showTxFees" />
    <q-card-section v-if="settings.showTxFees">
      <div class="text-caption">TX Fees</div>
      DFI
      <span class="text-h5 text-primary text-weight-light">
        {{ totalDfiTxFees.toLocaleString({}, basics.formatting.currency.dfiNoSymbol) }}
      </span>
      ({{
        (totalDfiTxFees * defichain.price("DFI-USD")).toLocaleString(
          {},
          basics.formatting.currency.usd
        )
      }})
    </q-card-section>
  </dashboard-card>
</template>

<script>
import { defineComponent, computed, watch, reactive } from "vue";

import { useBasicsStore } from "stores/basics";
import { useDeFiChainStore } from "stores/defichain";
import { useUserStore } from "stores/user";

import DashboardCard from "components/common/DashboardCard.vue";

const rewardReductionData = {
  reductionStartingBlock: 894000,
  reductionCycleBlocks: 32690,
  reductionAmount: 0.01658, // 1.658 %
  initialReward: 134.999832,
};

const roundAccurately = (number, decimalPlaces) =>
  Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces);

export default defineComponent({
  name: "RewardSum",

  components: { DashboardCard },

  setup() {
    const basics = useBasicsStore();
    const defichain = useDeFiChainStore();
    const user = useUserStore();

    const settings = reactive({
      ...{
        showCurrencies: true,
        showTxFees: true,
      },
      ...(user.settings?.dashboard?.RewardSum ?? {}),
    });

    watch(settings, (newSettings) => {
      user.settings.dashboard.RewardSum = newSettings;
    });

    function getRewardAmountAtBlockHeight(blockHeight) {
      const blockDifference = blockHeight - rewardReductionData.reductionStartingBlock;
      const reductionCycles = Math.floor(
        blockDifference / rewardReductionData.reductionCycleBlocks
      );

      let blockReward = rewardReductionData.initialReward;
      for (let cycle = 1; cycle <= reductionCycles; cycle++) {
        blockReward -= blockReward * rewardReductionData.reductionAmount;
        blockReward = roundAccurately(blockReward, 8);
        // console.log(
        //   "cycle:",
        //   cycle,
        //   "since block: ",
        //   rewardReductionData.reductionStartingBlock +
        //     cycle * rewardReductionData.reductionCycleBlocks,
        //   "reward:",
        //   blockReward
        // );
      }
      return blockReward;
    }
    // 71.51820578
    // 71.51820571
    //getRewardAmountAtBlockHeight(894000);
    //getRewardAmountAtBlockHeight(2157866);

    return {
      basics,
      defichain,
      user,
      settings,
      totalDfi: computed(() => user.totalBlockPropertyContext("reward")),
      totalDfiTxFees: computed(() =>
        user.watchedMasterNodesContext.reduce(
          (total, masternode) =>
            masternode.mintedBlocks.reduce(
              (subTotal, minting) =>
                parseFloat(minting["reward"]) -
                getRewardAmountAtBlockHeight(minting.height) +
                subTotal,
              0
            ) + total,
          0
        )
      ),
      mintingsCount: computed(() =>
        user.watchedMasterNodesContext.reduce(
          (total, masternode) => masternode.mintedBlocksCount + total,
          0
        )
      ),
      roundAccurately,
    };
  },
});
</script>
