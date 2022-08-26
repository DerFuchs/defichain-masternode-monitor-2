<template>
  <q-header
    class="text-white bg-primary-dark"
    :class="{ 'light-gradient': user.settings.colorfulMode }"
    height-hint="98"
  >
    <q-ajax-bar position="top" color="accent" size="3px" />
    <q-toolbar>
      <master-node-tabs v-if="masterNodeTabsVisible" />
      <div v-if="headline" class="text-h6">
        <q-avatar v-if="icon" :icon="icon" />
        {{ headline }}
      </div>
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
import { defineComponent, ref, watch } from "vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

import { useRoute } from "vue-router";

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
    const route = useRoute();

    const masterNodeTabsVisible = ref(route?.meta?.masterNodeTabsVisible || false);
    const headline = ref(route?.meta?.headline || false);
    const icon = ref(route?.meta?.icon || false);

    watch(route, () => {
      masterNodeTabsVisible.value = route?.meta?.masterNodeTabsVisible || false;
      headline.value = route?.meta?.headline || false;
      icon.value = route?.meta?.icon || false;
    });

    return {
      basics: useBasicsStore(),
      user: useUserStore(),
      leftDrawerOpen,
      masterNodeTabsVisible,
      headline,
      icon,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
