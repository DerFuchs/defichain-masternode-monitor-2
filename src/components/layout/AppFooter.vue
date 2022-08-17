<template>
  <q-footer
    :class="{
      'bg-grey-2': basics.darkMode === false,
      'bg-dark': basics.darkMode === true,
    }"
  >
    <q-separator :class="{ 'light-gradient': user.settings.colorfulMode }" />
    <q-toolbar dense>
      <q-toolbar-title></q-toolbar-title>
      <refresh :class="{ 'text-black': basics.darkMode === false }" />
      <messages class="q-ml-sm" :class="{ 'text-black': basics.darkMode === false }" />
    </q-toolbar>
  </q-footer>
</template>

<script>
import { defineComponent } from "vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

import Refresh from "src/components/layout/AppFooter/Refresh.vue";
import Messages from "src/components/layout/AppFooter/Messages.vue";

export default defineComponent({
  name: "AppFooter",

  components: { Messages, Refresh },

  setup() {
    return {
      basics: useBasicsStore(),
      user: useUserStore(),
    };
  },
});
</script>
