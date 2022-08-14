<template>
  <q-footer class="bg-primary-dark text-white">
    <q-toolbar dense>
      <q-toolbar-title></q-toolbar-title>
      <messages />
    </q-toolbar>
  </q-footer>
</template>

<script>
import { defineComponent } from "vue";
import { useBasicsStore } from "stores/basics";

import Messages from "src/components/layout/AppFooter/Messages.vue";

export default defineComponent({
  name: "AppFooter",

  components: { Messages },

  setup() {
    const basics = useBasicsStore();

    return {
      basics,
    };
  },
});
</script>
