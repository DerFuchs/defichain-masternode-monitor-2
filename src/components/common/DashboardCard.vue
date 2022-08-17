<!--
  This is the basic component for all settings cards. It bootstraps the whole ui
  element to keep up consistency.

  For examples, have a look at a random component from components/Settings/

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
  <div :class="colWidths">
    <q-card
      class="full-width full-height"
      :class="{ 'bg-grey-2': basics.darkMode === false }"
    >
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

      <q-inner-loading :showing="isWorking" class="bg-blur">
        <q-spinner-puff size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

export default defineComponent({
  name: "DashboardCard",

  props: {
    headline: {
      type: String,
      required: true,
    },
    cardSizes: {
      type: Object,
      required: false,
      default(rawProps) {
        return {
          xs: 12,
          sm: 6,
          md: 4,
          lg: 3,
          xl: 2,
        };
      },
    },
  },

  setup(props) {
    const basics = useBasicsStore();

    return {
      basics,
      user: useUserStore(),
      colWidths: computed(
        () =>
          `col-xs-${props.cardSizes.xs} col-sm-${props.cardSizes.sm} col-md-${props.cardSizes.md} col-lg-${props.cardSizes.lg} col-xl-${props.cardSizes.xl}`
      ),
      isWorking: computed(() => basics.isFetching() || basics.isProcessing()),
    };
  },
});
</script>
