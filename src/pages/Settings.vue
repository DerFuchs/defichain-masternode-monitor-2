<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <dark-mode />
      <colorful-mode />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useUserStore } from "stores/user";

import DarkMode from "components/Settings/DarkMode.vue";
import ColorfulMode from "components/Settings/ColorfulMode.vue";

export default defineComponent({
  name: "AppSettings",

  components: {
    DarkMode,
    ColorfulMode,
  },

  setup() {
    return {
      user: useUserStore(),
    };
  },
});
</script>
