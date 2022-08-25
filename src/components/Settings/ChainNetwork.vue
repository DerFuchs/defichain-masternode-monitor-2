<template>
  <settings-card headline="Network">
    <template #description> Switch between DeFiChain's networks. </template>
    <q-card-section>
      <q-radio v-model="network" val="mainnet" label="MainNet" color="accent" />
      <q-radio v-model="network" val="testnet" label="TestNet" color="secondary" />
    </q-card-section>
  </settings-card>
</template>

<script>
import { defineComponent, toRef, watch } from "vue";
import SettingsCard from "components/common/SettingsCard.vue";

import { useUserStore } from "stores/user";
import { useDeFiChainStore } from "src/stores/defichain";

export default defineComponent({
  name: "ChainNetwork",

  components: { SettingsCard },

  setup() {
    const user = useUserStore();
    const defichain = useDeFiChainStore();
    const network = toRef(user.settings, "chainNetwork");

    watch(network, (newNetworkName) => {
      defichain.setChainNetwork(newNetworkName);
    });

    return {
      user,
      defichain,
      network,
    };
  },
});
</script>
