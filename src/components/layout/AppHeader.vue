<template>
  <q-header
    class="text-white bg-primary-dark"
    :class="{ 'light-gradient': user.settings.colorfulMode }"
    height-hint="98"
  >
    <q-toolbar>
      <master-node-tabs />
      <q-space />
      <q-btn
        color="white"
        dense
        flat
        round
        icon="fal fa-bars"
        @click="toggleLeftDrawer"
      />
    </q-toolbar>
  </q-header>
  <main-navigation v-model="leftDrawerOpen" />
</template>

<script>
import { defineComponent, ref } from "vue";
import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";
import MasterNodeTabs from "components/layout/AppHeader/MasterNodeTabs.vue";
import MainNavigation from "components/layout/AppHeader/MainNavigation.vue";

export default defineComponent({
  name: "AppHeader",

  components: {
    MasterNodeTabs,
    MainNavigation,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      basics: useBasicsStore(),
      user: useUserStore(),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
