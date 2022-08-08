<template>
  <settings-card headline="Dark Mode">
    <template #description>
      {{ quote }}
    </template>
    <q-item v-ripple class="q-px-none" tag="label">
      <q-item-section>
        <q-item-label v-if="active">Dark Mode Active</q-item-label>
        <q-item-label v-else>Light Mode Active</q-item-label>
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
import { useUserStore } from "stores/user";

const starWarsQuotes = [
  "`Once You Start Down The Dark Path, Forever Will It Dominate Your Destiny.` - Yoda",
  "`If Only You Knew The Power Of The Dark Side...` - Darth Vader",
  "`The Dark Side Of The Force Is A Pathway To Many Abilities Some Consider To Be Unnatural.` - Emperor Palpatine",
  "`The Dark Side Is In Our Blood.` - Kylo Ren",
];

export default defineComponent({
  name: "DarkModeSetting",

  components: { SettingsCard },

  setup() {
    const user = useUserStore();
    const active = toRef(user.settings, "darkMode");

    return {
      active,
      quote: starWarsQuotes[Math.floor(Math.random() * starWarsQuotes.length)],
    };
  },
});
</script>
