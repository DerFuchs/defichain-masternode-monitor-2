<template>
	<div class="col-12 text-center absolute-bottom q-pb-md">
		<arrange-cards />
		<!-- <q-card
			class="full-width full-height"
			:class="{ 'bg-grey-2': basics.darkMode === false }"
		>
			<q-card-section class="q-ma-none">
        <q-btn
          v-if="user.settings.dashboard.invisibleCards.length > 0"
          outline
          icon="fa-light fa-plus"
          label="add card"
          class="full-width"
        />
      </q-card-section>
		</q-card> -->
	</div>
</template>

<script>
import { defineComponent } from "vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

import ArrangeCards from "components/Dashboard/DashboardOptions/ArrangeCards.vue";

export default defineComponent({
	name: "DashboardOptions",

	components: {
		ArrangeCards,
	},

	setup() {
		const basics = useBasicsStore();

		const user = useUserStore();
		/*
    const settings = reactive({
      ...{
        showSum: true,
        showSeparately: false,
        showBigger: false,
      },
      ...(user.settings?.dashboard?.TxSum ?? {}),
    });

    watch(settings, (newSettings) => {
      user.settings.dashboard.TxSum = newSettings;
    });
    */

		return {
			basics,
			user,
			/*
      settings,
      */
		};
	},
});
</script>
