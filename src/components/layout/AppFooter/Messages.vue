<template>
  <q-btn flat dense icon="fa-light fa-message-lines" color="white">
    <q-badge v-if="unreadMessagesCount > 0" floating color="red">
      {{ unreadMessagesCount }}
    </q-badge>
    <q-menu
      ref="messagesMenu"
      fit
      transition-show="jump-up"
      transition-hide="jump-down"
      max-width="375px"
    >
      <q-toolbar class="bg-primary-dark text-white">
        <q-toolbar-title>Unread Messages</q-toolbar-title>
      </q-toolbar>
      <q-list class="q-mt-sm">
        <message-entry
          v-for="(message, index) in unreadMessages"
          :key="index"
          :message="message"
        />
        <q-item>
          <q-btn
            outline
            class="full-width"
            label="see all"
            icon="fa-light fa-ballot-check"
          ></q-btn>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent, ref, toRef, computed, watch } from "vue";
import { useBasicsStore } from "stores/basics";

import MessageEntry from "src/components/layout/AppFooter/Messages/MessageEntry.vue";

export default defineComponent({
  name: "AppMessages",

  components: { MessageEntry },

  setup() {
    const basics = useBasicsStore();

    const messagesMenu = ref(null);

    const unreadMessages = toRef(basics, "unreadMessages");
    const unreadMessagesCount = computed(() => {
      return unreadMessages.value.length;
    });

    watch(unreadMessagesCount, () => {
      console.log("test");
      console.log(messagesMenu);
      messagesMenu.value.updatePosition();
      messagesMenu.value.toggle();
      messagesMenu.value.toggle();
    });

    return {
      basics,
      unreadMessages,
      unreadMessagesCount,
      messagesMenu,
    };
  },
});
</script>
