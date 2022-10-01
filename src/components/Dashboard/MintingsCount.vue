<template>
	<dashboard-card
		headline="Minted Blocks"
		:card-sizes="{
			xs: settings.showBigger ? 12 : 6,
			sm: 4,
			md: 3,
			lg: 2,
			xl: 1,
		}"
	>
		<template #description>
			The total number of blocks all your masternodes have been minting since
			the first one came to life.
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
						color="accent"
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
						color="accent"
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
						color="accent"
						checked-icon="fa-light fa-check"
						unchecked-icon="fa-light fa-x"
					/>
				</q-item-section>
			</q-item>
		</template>
		<q-card-section
			v-if="settings.showSum"
			class="text-primary text-center text-weight-light"
			:class="{
				'text-h2': mintingsCount < 100,
				'text-h3': mintingsCount >= 100,
			}"
		>
			{{ mintingsCount.toLocaleString() }}
		</q-card-section>
		<q-separator
			v-if="
				settings.showSeparately &&
				user.watchedActiveMasterNodesContext.length > 1
			"
		/>
		<q-card-section
			v-if="
				settings.showSeparately &&
				user.watchedActiveMasterNodesContext.length > 1
			"
			class="q-px-none"
		>
			<q-list class="row text-center">
				<q-item
					v-for="masternode in user.watchedActiveMasterNodesContext"
					:key="masternode.id"
					class="col-xs-6 col-sm-4 col-md-4 q-px-none text-center"
				>
					<q-item-section>
						<q-item-label class="text-h5 text-primary text-weight-light">
							{{ masternode.mintedBlocksCount.toLocaleString() }}
						</q-item-label>
						<q-item-label caption class="ellipsis">{{
							masternode.name
						}}</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-card-section>
	</dashboard-card>
</template>

<script>
import { defineComponent, computed, reactive, watch } from "vue";

import { useUserStore } from "stores/user";

import DashboardCard from "components/common/DashboardCard.vue";

export default defineComponent({
	name: "MintingsCount",

	components: { DashboardCard },

	setup() {
		const user = useUserStore();

		const settings = reactive({
			...{
				showSum: true,
				showSeparately: false,
				showBigger: false,
			},
			...(user.settings?.dashboard?.MintingsCount ?? {}),
		});

		watch(settings, (newSettings) => {
			user.settings.dashboard.MintingsCount = newSettings;
		});

		return {
			user,
			settings,
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
