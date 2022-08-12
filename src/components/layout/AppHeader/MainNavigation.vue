<template>
  <q-drawer side="left" behavior="mobile">
    <q-list>
      <q-item-label header>
        <q-img src="icons/master-node-monitor-logo.svg" height="40px" fit="contain" />
      </q-item-label>

      <q-separator
        inset
        class="q-mb-sm"
        :class="{ 'light-gradient': user.settings.colorfulMode }"
      />

      <NaviEntry v-for="link in linksList" :key="link.title" v-bind="link" />

      <q-separator
        inset
        class="q-my-sm"
        :class="{ 'light-gradient': user.settings.colorfulMode }"
      />

      <div class="row justify-evenly">
        <q-item
          clickable
          tag="a"
          class="col-3 flex flex-center"
          :to="{ name: 'settings' }"
        >
          <q-item-section class="text-center">
            <q-item-label>
              <q-icon name="fa-light fa-screwdriver-wrench" size="xs" class="q-mb-xs" />
            </q-item-label>
            <q-item-label caption>Settings</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" class="col-3 flex flex-center">
          <q-item-section class="text-center">
            <q-item-label>
              <q-icon name="fa-light fa-circle-question" size="xs" class="q-mb-xs" />
            </q-item-label>
            <q-item-label caption>WTF?!</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" class="col-3 flex flex-center">
          <q-item-section class="text-center">
            <q-item-label>
              <q-icon name="fa-light fa-brackets-curly" size="xs" class="q-mb-xs" />
            </q-item-label>
            <q-item-label caption>Changes</q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <q-separator
        inset
        class="q-my-sm"
        :class="{ 'light-gradient': user.settings.colorfulMode }"
      />

      <q-item v-ripple tag="label">
        <q-item-section>
          <q-item-label>Privacy Mode</q-item-label>
          <q-item-label caption>Hide Sensitive Data</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle
            v-model="privacy"
            checked-icon="fa-light fa-check"
            unchecked-icon="fa-light fa-xmark"
            color="accent"
          />
        </q-item-section>
      </q-item>

      <q-separator
        inset
        class="q-my-sm"
        :class="{ 'light-gradient': user.settings.colorfulMode }"
      />
    </q-list>
  </q-drawer>
</template>

<script>
import { defineComponent, ref } from "vue";

import { useUserStore } from "stores/user";

import NaviEntry from "components/layout/AppHeader/MainNavigation/NaviEntry.vue";

const linksList = [
  {
    title: "Dashboard",
    caption: "the main overview",
    icon: "fa-light fa-objects-column",
    to: "dashboard",
  },
  {
    title: "Time Line",
    caption: "a historical view",
    icon: "fa-light fa-chart-simple",
    to: "timeline",
  },
  {
    title: "Manage Masternodes",
    caption: "your watched masternodes",
    icon: "fa-light fa-square-list",
    to: "manage-master-nodes",
  },
];

export default defineComponent({
  name: "MainNavigation",

  components: {
    NaviEntry,
  },

  setup() {
    return {
      user: useUserStore(),
      linksList,
      privacy: ref(true),
    };
  },
});
</script>
