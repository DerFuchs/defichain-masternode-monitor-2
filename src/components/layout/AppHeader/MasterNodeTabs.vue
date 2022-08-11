<template>
  <q-tabs align="left" dense inline-label outside-arrows mobile-arrows shrink stretch>
    <q-tab label="all" />
    <q-tab v-for="mn in user.watchedActiveMasterNodes" :key="mn.id" :label="mn.name" />
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
    return {
      user: useUserStore(),
    };
  },
});
</script>
