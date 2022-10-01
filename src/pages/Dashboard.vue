<template>
	<q-page class="q-pa-md">
		<div class="row items-stretch q-col-gutter-md">
			<component
				:is="component"
				v-for="component in user.dashboardCards"
				:key="component"
			/>
		</div>
		<div class="row q-mt-xl">
			<dashboard-options />
			<!--
      <q-card flat :bordered="!$q.dark.isActive">
        <q-card-section>
          <div class="text-h6">{{ $t("Missing Something?") }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none q-ml-none">
          <p><a href="https://t.me/Buzzjoe">@Buzzjoe on Telegram</a><br /></p>
          <p><a href="https://twitter.com/dt_buzzjoe">@dt_buzzjoe on Twitter</a><br /></p>
          <p>
            {{ $t("Public Telegram group") }}:<br />
            <a href="https://t.me/DFIMasternodeMonitor">t.me/DFIMasternodeMonitor</a>
          </p>
        </q-card-section>
      </q-card> -->
		</div>
		<q-inner-loading :showing="isWorking" class="bg-blur">
			<ocean-spinner />
		</q-inner-loading>
	</q-page>
</template>

<script>
import { defineComponent, computed } from "vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

import MintingsCount from "components/Dashboard/MintingsCount.vue";
import RewardSum from "components/Dashboard/RewardSum.vue";
import TxSum from "components/Dashboard/TxSum.vue";
import DashboardOptions from "src/components/Dashboard/DashboardOptions.vue";

export default defineComponent({
	name: "DashboardPage",

	components: {
		MintingsCount,
		RewardSum,
		TxSum,
		DashboardOptions,
	},

	setup() {
		const basics = useBasicsStore();
		const user = useUserStore();

		return {
			user,
			isWorking: computed(() => basics.isFetching() || basics.isProcessing()),
		};
	},
});
</script>
