<template>
  <settings-card headline="Dark Mode">
    <template #description>
      {{ quote }}
    </template>
    <!-- MANUALLY -->
    <q-card>
      <q-card-section class="row q-pa-none">
        <div
          class="col-6 text-center bg-white q-pa-md q-pt-lg"
          style="cursor: pointer"
          @click="setting = false"
        >
          <q-icon name="fa-light fa-starfighter" size="lg" color="accent" />
          <p class="q-mt-md q-mb-none">
            <q-radio v-model="setting" :val="false" :dark="false" color="accent" />
          </p>
        </div>
        <!--
        <div class="col-4 text-center white-black q-pa-lg" tag="label">
          <q-icon name="fa-light fa-user-bounty-hunter" size="lg" color="accent" />
          <p class="q-mt-lg q-mb-none">
            <q-radio v-model="setting" val="auto" :dark="false" color="accent" />
          </p>
        </div>
        -->
        <div
          class="col-6 text-center bg-black q-pa-md q-pt-lg"
          style="cursor: pointer"
          @click="setting = true"
        >
          <q-icon
            name="fa-light fa-starfighter-twin-ion-engine"
            size="lg"
            color="accent"
          />
          <p class="q-mt-md q-mb-none">
            <q-radio v-model="setting" :val="true" :dark="true" color="accent" />
          </p>
        </div>
      </q-card-section>
    </q-card>
    <!-- AUTO -->
    <q-item class="q-px-none" tag="label">
      <q-item-section>
        <q-item-label>Detect Automatically</q-item-label>
      </q-item-section>
      <q-item-section side>
        <!--
        <q-toggle
          v-model="setting"
          true-value="auto"
          :false-value="false"
          checked-icon="fa-light fa-check"
          unchecked-icon="fa-light fa-xmark"
          color="accent"
          size="lg"
          dense
        />
        -->
        <q-radio v-model="setting" val="auto" color="accent" />
      </q-item-section>
    </q-item>
  </settings-card>
</template>

<script>
import { defineComponent, ref, toRef, computed } from "vue";
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

    /*
    const setting = user.settings.darkMode;
    const active = ref();

    if (setting === true) {
      active.value = true;
    }

    if (setting === false) {
      active.value = false;
    }

    if (setting === "auto") {
      active.value = null;
    }
    */

    return {
      /*
      active: toRef(user.settings, "darkMode"),
      auto: ref(),
      isAuto: computed(() => user.settings.darkMode === "auto"),
      */
      setting: toRef(user.settings, "darkMode"),
      quote: starWarsQuotes[Math.floor(Math.random() * starWarsQuotes.length)],
    };
  },
});
</script>
