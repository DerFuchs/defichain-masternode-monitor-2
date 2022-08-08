<template>
  <q-layout
    view="lHh Lpr lFf"
    :class="{
      'bg-black': basics.darkMode === true,
      'bg-white': basics.darkMode === false,
    }"
  >
    <app-header />

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-footer class="bg-primary-dark text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Blockping</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

import { useBasicsStore } from "stores/basics";

import AppHeader from "components/layout/AppHeader.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    AppHeader,
  },

  setup() {
    return {
      basics: useBasicsStore(),
    };
  },
});
</script>
