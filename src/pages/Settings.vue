<template>
  <q-page class="q-pa-md">
    <div class="row items-stretch q-col-gutter-md">
      <div class="text-overline col-12">
        DeFiChain
        <q-separator :class="{ 'light-gradient': user.settings.colorfulMode }" />
      </div>
      <chain-network />
      <custom-ocean />
      <div class="text-overline col-12">
        Appearance
        <q-separator :class="{ 'light-gradient': user.settings.colorfulMode }" />
      </div>
      <dark-mode />
      <colorful-mode />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useUserStore } from "stores/user";

import DarkMode from "components/Settings/DarkMode.vue";
import ColorfulMode from "components/Settings/ColorfulMode.vue";
import CustomOcean from "components/Settings/CustomOcean.vue";
import ChainNetwork from "components/Settings/ChainNetwork.vue";

export default defineComponent({
  name: "AppSettings",

  components: {
    DarkMode,
    ColorfulMode,
    CustomOcean,
    ChainNetwork,
  },

  setup() {
    return {
      user: useUserStore(),
    };
  },
});
</script>
