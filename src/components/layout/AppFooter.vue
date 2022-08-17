<template>
  <q-footer class="bg-dark text-white">
    <q-toolbar dense>
      <q-toolbar-title></q-toolbar-title>
      <refresh />
      <messages class="q-ml-sm" />
    </q-toolbar>
  </q-footer>
</template>

<script>
import { defineComponent } from "vue";
import { useBasicsStore } from "stores/basics";

import Refresh from "src/components/layout/AppFooter/Refresh.vue";
import Messages from "src/components/layout/AppFooter/Messages.vue";

export default defineComponent({
  name: "AppFooter",

  components: { Messages, Refresh },

  setup() {
    const basics = useBasicsStore();

    return {
      basics,
    };
  },
});
</script>
