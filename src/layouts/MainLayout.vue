<template>
  <q-layout
    view="lHh Lpr lFf"
    :class="{
      'bg-darker': basics.darkMode === true,
      'bg-white': basics.darkMode === false,
    }"
  >
    <app-header />

    <q-page-container>
      <router-view />
    </q-page-container>

    <app-footer />
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

import { useBasicsStore } from "stores/basics";

import AppHeader from "components/layout/AppHeader.vue";
import AppFooter from "components/layout/AppFooter.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    AppHeader,
    AppFooter,
  },

  setup() {
    return {
      basics: useBasicsStore(),
    };
  },
});
</script>
