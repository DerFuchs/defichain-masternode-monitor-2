<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary-dark text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="fal fa-bars" @click="toggleLeftDrawer" />
      </q-toolbar>
      <q-tabs align="left" dense inline-label outside-arrows mobile-arrows>
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
        <q-route-tab to="/page3" label="Page Three" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile">
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-primary-dark text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Blockping</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Dashboard",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Time Line",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Manage Master Nodes",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
];

import { defineComponent, ref } from "vue";

import { useBasicsStore } from "stores/basics";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const store = useBasicsStore();
    store.fetchAllMintings();

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      store,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
