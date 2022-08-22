<template>
  <q-tabs align="left" dense inline-label outside-arrows mobile-arrows shrink stretch>
    <q-tab label="all" />
    <q-tab
      v-for="mn in user.watchedActiveMasterNodes"
      :key="mn.id"
      :label="masterNodeName(mn)"
    />
    <!--
    <q-route-tab to="/page2" label="MN 2" />
    -->
  </q-tabs>
</template>

<script>
import { defineComponent } from "vue";

import { useUserStore } from "stores/user";

export default defineComponent({
  name: "MasterNodeTabs",
  setup() {
    const user = useUserStore();
    return {
      user,
      masterNodeName: (mnData) => {
        return mnData.name.length > 0
          ? mnData.name
          : mnData.ownerAddress.substring(0, 3) +
              "…" +
              mnData.ownerAddress.substr(mnData.ownerAddress.length - 3);
      },
    };
  },
});
</script>
