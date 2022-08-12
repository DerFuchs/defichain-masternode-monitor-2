<template>
  <q-footer class="bg-primary-dark text-white">
    <q-toolbar dense>
      <q-toolbar-title></q-toolbar-title>
      <q-btn flat dense icon="fa-light fa-message-lines" color="white">
        <q-badge v-if="unreadMessagesCount > 0" floating color="red">
          {{ unreadMessagesCount }}
        </q-badge>
        <q-menu>
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <q-toggle v-model="mobileData" label="Use Mobile Data" />
              <q-toggle v-model="bluetooth" label="Bluetooth" />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

              <q-btn v-close-popup color="primary" label="Logout" push size="sm" />
            </div>
          </div>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-footer>
</template>

<script>
import { defineComponent, toRef, computed } from "vue";
import { useBasicsStore } from "stores/basics";

export default defineComponent({
  name: "AppFooter",

  setup() {
    const basics = useBasicsStore();

    const unreadErrors = toRef(basics, "unreadErrors");
    const unreadMessages = computed(() => {
      return [...unreadErrors.value];
    });
    const unreadMessagesCount = computed(() => {
      return unreadMessages.value.length;
    });

    return {
      basics,
      unreadMessages,
      unreadMessagesCount,
    };
  },
});
</script>
