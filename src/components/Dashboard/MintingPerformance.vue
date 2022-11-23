<template>
	<dashboard-card
		headline="Minting Performance"
		:card-sizes="{ xs: 12, sm: 4, md: 4, lg: 3, xl: 2 }"
	>
		<template #description>
			The average amount of blocks you masternodes have been minting during
			different periods of time.
		</template>
		<template #settings>
			<!-- default time frame -->
			<q-item v-ripple tag="label">
				<q-item-section>
					<q-item-label>Default Time Frame</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-select
						v-model="settings.defaultTimeFrame"
						:options="availableTimeFrames"
						color="secondary"
						icon-color="black"
						keep-color
						checked-icon="fa-light fa-check"
						unchecked-icon="fa-light fa-x"
					/>
				</q-item-section>
			</q-item>
			<!-- show blocks per day -->
			<q-item v-ripple tag="label">
				<q-item-section>
					<q-item-label>Show Blocks per Day</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-toggle
						v-model="settings.showBlocksPerDay"
						color="secondary"
						icon-color="black"
						keep-color
						checked-icon="fa-light fa-check"
						unchecked-icon="fa-light fa-x"
					/>
				</q-item-section>
			</q-item>
			<!-- show day per block -->
			<q-item v-ripple tag="label">
				<q-item-section>
					<q-item-label>Show Days Per Block</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-toggle
						v-model="settings.showDaysPerBlock"
						color="secondary"
						icon-color="black"
						keep-color
						checked-icon="fa-light fa-check"
						unchecked-icon="fa-light fa-x"
					/>
				</q-item-section>
			</q-item>
			<!-- show averages per masternode -->
			<q-item v-ripple tag="label">
				<q-item-section>
					<q-item-label>Show Averages Per Masternode</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-toggle
						v-model="settings.showMnAverages"
						color="secondary"
						icon-color="black"
						keep-color
						checked-icon="fa-light fa-check"
						unchecked-icon="fa-light fa-x"
					/>
				</q-item-section>
			</q-item>
			<!-- show other time frames -->
			<q-item v-ripple tag="label">
				<q-item-section>
					<q-item-label>Show Other Time Frames</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-toggle
						v-model="settings.showOtherTimeFrames"
						color="secondary"
						icon-color="black"
						keep-color
						checked-icon="fa-light fa-check"
						unchecked-icon="fa-light fa-x"
					/>
				</q-item-section>
			</q-item>
			<!-- show other time frames -->
			<q-item v-if="settings.showOtherTimeFrames" v-ripple tag="label">
				<q-item-section>
					<q-item-label>Other Time Frames</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-select
						v-model="settings.visibleTimeFrames"
						:options="availableTimeFrames"
						multiple
						emit-value
						map-options
						color="secondary"
						icon-color="black"
						keep-color
						checked-icon="fa-light fa-check"
						unchecked-icon="fa-light fa-x"
					>
						<template #option="{ itemProps, opt, selected, toggleOption }">
							<q-item v-bind="itemProps">
								<q-item-section>
									<q-item-label>
										{{ opt.label }}
									</q-item-label>
								</q-item-section>
								<q-item-section side>
									<q-toggle
										:model-value="selected"
										color="secondary"
										icon-color="black"
										keep-color
										@update:model-value="toggleOption(opt)"
									/>
								</q-item-section>
							</q-item>
						</template>
					</q-select>
				</q-item-section>
			</q-item>
		</template>
		<template #default>
			<transition-group
				:enter-active-class="basics.dashboardCardsContentEnterAnimation"
				:leave-active-class="basics.dashboardCardsContentLeaveAnimation"
			>
				<!-- <q-separator
					v-if="
						settings.showSeparately &&
						user.watchedActiveMasterNodesContext.length > 1
					"
					key="separator"
				/> -->
				<q-card-section
					v-if="settings.showBlocksPerDay"
					key="showBlocksPerDay"
					class="q-px-none"
				>
					<div class="text-h4">{{ blocksPerDay.toLocaleString() }}</div>
					<q-list class="row text-center">
						<q-item
							v-for="masternode in user.watchedActiveMasterNodesContext"
							:key="masternode.id"
							class="col-xs-6 col-sm-4 col-md-4 q-px-none text-center"
						>
							<q-item-section>
								<q-item-label class="text-h5 text-primary text-weight-light">
									{{ blocksPerDay.toLocaleString() }}
								</q-item-label>
								<q-item-label caption class="ellipsis">{{
									masternode.name
								}}</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-card-section>
			</transition-group>
		</template>
	</dashboard-card>
</template>

<script>
import { defineComponent, computed, reactive, watch } from "vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

import DashboardCard from "components/common/DashboardCard.vue";

import { useDashboardCardSettings } from "../../composables/dashboardCardSettings.js";

export default defineComponent({
	name: "MintingPerformance",

	components: { DashboardCard },

	setup() {
		const basics = useBasicsStore();
		const user = useUserStore();

		// Card Settings ----------------------------------------------------------------
		const settings = useDashboardCardSettings("MintingsPerformance", {
			defaultTimeFrame: "30d",
			showBlocksPerDay: true,
			showDaysPerBlock: true,
			showMnAverages: true,
			showOtherTimeFrames: true,
			visibleTimeFrames: [
				"7d",
				"14d",
				"30d",
				"1y",
				"ytd",
				"last-year",
				"lifetime",
			],
		});
		// const settings = reactive({
		// ...{
		// 	defaultTimeFrame: "30d",
		// 	showBlocksPerDay: true,
		// 	showDaysPerBlock: true,
		// 	showMnAverages: true,
		// 	showOtherTimeFrames: true,
		// 	visibleTimeFrames: [
		// 		"7d",
		// 		"14d",
		// 		"30d",
		// 		"1y",
		// 		"ytd",
		// 		"last-year",
		// 		"lifetime",
		// 	],
		// },
		// 	...(user.settings?.dashboard?.MintingsPerformance ?? {}),
		// });

		// watch(settings, (newSettings) => {
		// 	user.settings.dashboard.MintingsPerformance = newSettings;
		// });

		// Calculations -----------------------------------------------------------------

		const blocksPerDay = computed(() => {
			return 1.9;
		});

		// ------------------------------------------------------------------------------

		return {
			basics,
			user,

			// Calculations ---------------------------------------------------------------

			blocksPerDay,

			// Settings -------------------------------------------------------------------
			settings,
			availableTimeFrames: [
				{
					label: "14 days",
					value: "14d",
				},
				{
					label: "7 days",
					value: "7d",
				},
				{
					label: "30 days",
					value: "30d",
				},
				{
					label: "1 year",
					value: "1y",
				},
				{
					label: "YTD",
					value: "ytd",
				},
				{
					label: "Last Year",
					value: "last-year",
				},
				{
					label: "lifetime",
					value: "lifetime",
				},
			],
		};
	},
});
</script>
