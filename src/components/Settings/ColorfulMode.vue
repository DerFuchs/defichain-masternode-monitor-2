<template>
  <settings-card headline="Colorful Mode">
    <template #description>
      Somewhere, over the rainbow, skies are blue... and the dreams that you dare to dream
      really do come true.
    </template>
    <q-separator class="light-gradient q-my-sm" size="10px"></q-separator>
    <q-item v-ripple class="q-px-none" tag="label">
      <q-item-section>
        <q-item-label v-if="active">Colorful Mode Active</q-item-label>
        <q-item-label v-else>Regular Color Mode Active</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-toggle
          v-model="active"
          checked-icon="fa-light fa-check"
          unchecked-icon="fa-light fa-xmark"
          color="accent"
          size="lg"
          dense
        />
      </q-item-section>
    </q-item>
  </settings-card>
</template>

<script>
import { defineComponent, toRef } from "vue";
import SettingsCard from "components/common/SettingsCard.vue";
import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

export default defineComponent({
  name: "ColorfulModeSetting",
  components: { SettingsCard },

  setup() {
    const user = useUserStore();
    const active = toRef(user.settings, "colorfulMode");

    return {
      basics: useBasicsStore(),
      user,
      active,
    };
  },
});
</script>
