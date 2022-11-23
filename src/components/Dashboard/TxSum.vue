<template>
	<dashboard-card
		headline="Total TX Secured"
		:card-sizes="{
			xs: settings.showBigger ? 12 : 6,
			sm: 4,
			md: 3,
			lg: 2,
			xl: 1,
		}"
	>
		<template #description>
			The total number of Transactions your masternodes have written into
			DeFiChain within the {{ mintingsCount }} blocks they have minted.
		</template>
		<template #settings>
			<!-- show sum -->
			<q-item v-ripple tag="label">
				<q-item-section>
					<q-item-label>Show sums</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-toggle
						v-model="settings.showSum"
						color="secondary"
						icon-color="black"
						keep-color
						checked-icon="fa-light fa-check"
						unchecked-icon="fa-light fa-x"
					/>
				</q-item-section>
			</q-item>
			<!-- show separately -->
			<q-item v-ripple tag="label">
				<q-item-section>
					<q-item-label>Show separately</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-toggle
						v-model="settings.showSeparately"
						color="secondary"
						icon-color="black"
						keep-color
						checked-icon="fa-light fa-check"
						unchecked-icon="fa-light fa-x"
					/>
				</q-item-section>
			</q-item>
			<!-- show bigger -->
			<q-item v-ripple tag="label">
				<q-item-section>
					<q-item-label>Show bigger on smartphones</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-toggle
						v-model="settings.showBigger"
						color="secondary"
						icon-color="black"
						keep-color
						checked-icon="fa-light fa-check"
						unchecked-icon="fa-light fa-x"
					/>
				</q-item-section>
			</q-item>
		</template>
		<transition
			:enter-active-class="basics.dashboardCardsContentEnterAnimation"
			:leave-active-class="basics.dashboardCardsContentLeaveAnimation"
		>
			<q-card-section
				v-if="settings.showSum"
				class="text-primary text-weight-light text-center"
				:class="{ 'text-h2': txCount < 1000, 'text-h3': txCount >= 1000 }"
			>
				{{ txCount.toLocaleString() }}
			</q-card-section>
		</transition>
		<transition-group
			:enter-active-class="basics.dashboardCardsContentEnterAnimation"
			:leave-active-class="basics.dashboardCardsContentLeaveAnimation"
		>
			<q-separator
				v-if="
					settings.showSeparately &&
					user.watchedActiveMasterNodesContext.length > 1
				"
				key="separator"
			/>
			<q-card-section
				v-if="
					settings.showSeparately &&
					user.watchedActiveMasterNodesContext.length > 1
				"
				key="data"
				class="q-px-none"
			>
				<q-list class="row text-center">
					<q-item
						v-for="masternode in user.watchedActiveMasterNodesContext"
						:key="masternode.id"
						class="col-xs-6 col-sm-4 col-md-4 q-px-none"
					>
						<q-item-section>
							<q-item-label class="text-h5 text-primary text-weight-light">
								{{
									masternode.mintedBlocks
										.reduce(
											(subTotal, minting) =>
												parseFloat(minting["transactionCount"]) + subTotal,
											0
										)
										.toLocaleString()
								}}
							</q-item-label>
							<q-item-label caption class="ellipsis">{{
								masternode.name
							}}</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</q-card-section>
		</transition-group>
	</dashboard-card>
</template>

<script>
import { defineComponent, computed, reactive, watch } from "vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

import DashboardCard from "components/common/DashboardCard.vue";

export default defineComponent({
	name: "RewardSum",

	components: { DashboardCard },

	setup() {
		const basics = useBasicsStore();
		const user = useUserStore();

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

		return {
			basics,
			user,
			settings,
			txCount: computed(() => {
				return user.totalBlockPropertyContext("transactionCount");
			}),
			mintingsCount: computed(() =>
				user.watchedMasterNodesContext.reduce(
					(total, masternode) => masternode.mintedBlocksCount + total,
					0
				)
			),
		};
	},
});
</script>
