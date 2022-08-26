<template>
  <q-tabs
    v-model="activeTab"
    align="left"
    dense
    inline-label
    outside-arrows
    mobile-arrows
    shrink
    stretch
  >
    <q-tab name="all" label="all" @click="setMasterNodeContext('all')" />
    <q-tab
      v-for="mn in user.watchedActiveMasterNodes"
      :key="mn.id"
      :name="mn.id"
      :label="masterNodeName(mn)"
      @click="setMasterNodeContext(mn.id)"
    />
    <!--
    <q-route-tab to="/page2" label="MN 2" />
    -->
  </q-tabs>
</template>

<script>
import { defineComponent, ref } from "vue";

import { useUserStore } from "stores/user";

export default defineComponent({
  name: "MasterNodeTabs",
  setup() {
    const user = useUserStore();

    const activeTab = ref(user.masterNodeContext);
    return {
      user,
      activeTab,
      masterNodeName: (mnData) => {
        return mnData.name.length > 0
          ? mnData.name
          : mnData.ownerAddress.substring(0, 3) +
              "…" +
              mnData.ownerAddress.substr(mnData.ownerAddress.length - 3);
      },
      setMasterNodeContext: (masterNodeId) => {
        user.masterNodeContext = masterNodeId;
      },
    };
  },
});
</script>
