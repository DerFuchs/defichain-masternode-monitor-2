<!--
  This is the basic component for all settings cards. It bootstraps the whole ui
  element to keep up consistency.

  Just use it as follows. For better example, have a look at a random component from
  components/Settings/

  import SettingsCard from "components/common/SettingsCard.vue";

  // ...

  <settings-card headline="Setting's Name">
    <template #description>
      Some fancy description of what that setting does
    </template>
    // your Markup
  </settings-card>
-->
<template>
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
    <q-card class="full-width" :class="{ 'bg-grey-2': basics.darkMode === false }">
      <q-card-section class="q-px-none q-py-none">
        <q-expansion-item
          class="q-pa-none q-ma-none"
          expand-icon="fa-light fa-circle-question"
        >
          <template #header>
            <q-item-section class="q-pa-none q-ma-none">
              <div class="text-h6">{{ headline }}</div>
            </q-item-section>
          </template>

          <q-card :class="{ 'bg-grey-2': basics.darkMode === false }">
            <q-card-section>
              <slot name="description"></slot>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section>

      <q-separator :class="{ 'light-gradient': user.settings.colorfulMode }" />

      <q-card-section>
        <slot></slot>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

export default defineComponent({
  name: "SettingsCard",

  props: {
    headline: {
      type: String,
      required: true,
    },
  },

  setup() {
    return {
      basics: useBasicsStore(),
      user: useUserStore(),
    };
  },
});
</script>
