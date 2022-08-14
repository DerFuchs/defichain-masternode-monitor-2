<template>
  <q-item>
    <q-item-section @click="toggleExpand()">
      <q-item-label :class="{ 'text-negative': message.type == 'error' }">
        <q-icon name="fa-light fa-bug" class="q-mr-xs" />{{ message.headline }}
      </q-item-label>
      <q-item-label caption :lines="lines">{{ message.message }}</q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-btn dense color="accent" icon="fa-light fa-check" size="sm" @click="setRead()" />
      <!-- <q-btn
        dense
        color="accent"
        icon="fa-light fa-arrows-maximize"
        class="q-mt-sm"
        size="sm"
        @click="toggleExpand()"
      /> -->
    </q-item-section>
  </q-item>
  <q-separator spaced inset :class="{ 'light-gradient': user.settings.colorfulMode }" />
</template>

<script>
import { defineComponent, ref } from "vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

export default defineComponent({
  name: "MessageEntry",

  props: {
    message: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const lines = ref(2);

    return {
      user: useUserStore(),
      lines,
      setRead: () => {
        const basics = useBasicsStore();
        basics.setMessageRead(props.message.id);

        // basics.addError(
        //   "das ist eine Testnachricht, die etwas länger ausfallen muss, um eine weitere Zeile zu triggern.",
        //   "das ist eine Headline"
        // );
      },
      toggleExpand: () => {
        if (lines.value == 0) {
          lines.value = 2;
        } else {
          lines.value = 0;
        }
      },
    };
  },
});
</script>
