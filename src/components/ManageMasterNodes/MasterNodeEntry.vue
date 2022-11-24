<template>
	<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
		<q-card
			class="full-width full-height"
			:class="{
				'bg-grey-2': basics.darkMode === false,
				'icon-bg frozen': isFrozen,
				'icon-bg resigned': isResigned,
			}"
			style="overflow: hidden"
		>
			<q-card-section class="q-px-none q-py-none card-header">
				<q-expansion-item class="q-pa-none q-ma-none">
					<template #header>
						<!-- Masternode Name -->
						<q-item-section class="q-pa-none q-ma-none ellipsis">
							<div v-if="data.name" class="text-h6">{{ data.name }}</div>
							<span v-else class="text-h6"> Nameless Masternode </span>
						</q-item-section>
					</template>

					<q-card style="background: none !important">
						<q-card-section>
							<!-- Edit Masternode Name -->
							<q-input
								v-model="newMasterNodeName"
								label="Edit Name"
								:class="{
									'bg-white': basics.darkMode === false,
									'bg-dark': basics.darkMode === true,
								}"
							>
								<template #append>
									<q-btn
										flat
										icon="fa-light fa-floppy-disk"
										:disable="newMasterNodeName == data.name"
										:color="newMasterNodeName == data.name ? 'grey' : 'primary'"
										@click="user.renameMasterNode(data.id, newMasterNodeName)"
									/>
								</template>
							</q-input>
							<div class="full-width q-mt-md text-negative text-h6">
								Danger Zone
							</div>
							<!-- Remove this watched masternode -->
							<q-btn
								v-if="!displayConfirmRemovalBtn"
								outline
								label="remove"
								class="full-width q-mt-md"
								icon="fa-light fa-circle-trash"
								color="negative"
								dense
								@click="showConfirmRemoval(3000)"
							/>
							<q-btn
								v-if="displayConfirmRemovalBtn"
								outline
								label="sure? tap again to remove"
								class="full-width q-mt-sm"
								icon="fa-light fa-circle-question"
								color="negative"
								dense
								@click="user.removeWatchedMasterNode(data.ownerAddress)"
							/>
						</q-card-section>
					</q-card>
				</q-expansion-item>
			</q-card-section>

			<transition-group
				:enter-active-class="basics.dashboardCardsContentEnterAnimation"
				:leave-active-class="basics.dashboardCardsContentLeaveAnimation"
			>
				<q-separator
					v-if="user.settings?.manageMasternodesPage?.showAddresses"
					key="separator"
					:class="{ 'light-gradient': user.settings.colorfulMode }"
				/>
				<q-card-section
					v-if="user.settings?.manageMasternodesPage?.showAddresses"
					key="data"
				>
					<q-list>
						<!-- Owner Address -->
						<q-item class="q-px-none">
							<q-item-section side>
								<q-icon v-if="!isFrozen" name="fa-light fa-face-grin-stars" />
								<q-icon
									v-else
									name="fa-light fa-face-icicles"
									color="light-blue"
								/>
							</q-item-section>
							<q-item-section>
								<q-item-label class="ellipsis">{{
									data.ownerAddress
								}}</q-item-label>
								<q-item-label caption>Owner Address</q-item-label>
							</q-item-section>
						</q-item>

						<!-- Operator address -->
						<q-item class="q-px-none">
							<q-item-section side>
								<q-icon name="fa-light fa-face-glasses" />
							</q-item-section>
							<q-item-section>
								<q-item-label class="ellipsis">{{
									data.operatorAddress
								}}</q-item-label>
								<q-item-label caption>Operator Address</q-item-label>
							</q-item-section>
						</q-item>

						<!-- ID -->
						<q-item class="q-px-none">
							<q-item-section side>
								<q-icon name="fa-light fa-fingerprint" />
							</q-item-section>
							<q-item-section>
								<q-item-label class="ellipsis">{{ data.id }}</q-item-label>
								<q-item-label caption>ID on DeFiChain</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-card-section>
			</transition-group>
			<transition-group
				:enter-active-class="basics.dashboardCardsContentEnterAnimation"
				:leave-active-class="basics.dashboardCardsContentLeaveAnimation"
			>
				<q-separator
					v-if="user.settings?.manageMasternodesPage?.showDetails"
					key="separator"
					:class="{ 'light-gradient': user.settings.colorfulMode }"
				/>
				<q-card-section
					v-if="user.settings?.manageMasternodesPage?.showDetails"
					key="data"
				>
					<q-list class="row">
						<!-- Minted Blocks Count -->
						<q-item v-if="data.mintedBlocksCount" class="q-px-none col-6">
							<q-item-section side>
								<q-icon name="fa-light fa-cube" />
							</q-item-section>
							<q-item-section>
								<q-item-label class="ellipsis">{{
									data.mintedBlocksCount.toLocaleString()
								}}</q-item-label>
								<q-item-label caption>Minted Blocks</q-item-label>
							</q-item-section>
						</q-item>

						<!-- Created at block -->
						<q-item class="q-px-none col-6">
							<q-item-section side>
								<q-icon name="fa-light fa-hand-wave" />
							</q-item-section>
							<q-item-section>
								<q-item-label class="ellipsis">
									{{ data.creationBlock.toLocaleString() }}
								</q-item-label>
								<q-item-label caption>Created At Block</q-item-label>
							</q-item-section>
						</q-item>

						<!-- Age in Blocks -->
						<q-item class="q-px-none col-6">
							<q-item-section side>
								<q-icon name="fa-light fa-watch" />
							</q-item-section>
							<q-item-section>
								<q-item-label v-if="!isResigned" class="ellipsis">
									{{
										(
											defichain.stats.count.blocks - data.creationBlock
										).toLocaleString()
									}}
								</q-item-label>
								<q-item-label v-if="isResigned" class="ellipsis">
									{{ (data.resignBlock - data.creationBlock).toLocaleString() }}
								</q-item-label>
								<q-item-label caption>Age in Blocks</q-item-label>
							</q-item-section>
						</q-item>

						<!-- Frozen -->
						<q-item v-if="isFrozen" class="q-px-none col-6">
							<q-item-section side>
								<q-icon v-if="!isFrozen" name="fa-light fa-face-grin-stars" />
								<q-icon
									v-else
									name="fa-light fa-snowflake"
									color="light-blue"
								/>
							</q-item-section>
							<q-item-section>
								<q-item-label class="ellipsis">
									<span v-if="data.timelock == 520">10 Years</span>
									<span v-if="data.timelock == 520 / 2">5 Years</span>
								</q-item-label>
								<q-item-label caption>Frozen</q-item-label>
							</q-item-section>
						</q-item>

						<!-- Resigned -->
						<q-item v-if="isResigned" class="q-px-none col-6">
							<q-item-section side>
								<q-icon name="fa-light fa-skull" color="negative" />
							</q-item-section>
							<q-item-section>
								<q-item-label class="ellipsis">{{
									data.resignBlock.toLocaleString()
								}}</q-item-label>
								<q-item-label caption>Resigned At Block</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-card-section>
			</transition-group>
		</q-card>
	</div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";
import { useDeFiChainStore } from "stores/defichain";

export default defineComponent({
	name: "MasterNodeEntry",

	props: {
		data: {
			type: Object,
			required: true,
		},
	},

	setup(props) {
		const displayConfirmRemovalBtn = ref(false);

		return {
			basics: useBasicsStore(),
			user: useUserStore(),
			defichain: useDeFiChainStore(),

			newMasterNodeName: ref(JSON.parse(JSON.stringify(props.data.name))),

			isFrozen: computed(() => props.data.timelock > 0),
			isResigned: computed(() => props.data.resignBlock > 0),
			displayConfirmRemovalBtn,

			showConfirmRemoval: (time) => {
				displayConfirmRemovalBtn.value = true;
				setTimeout(() => {
					displayConfirmRemovalBtn.value = false;
				}, time);
			},
		};
	},
});
</script>

<style lang="sass">
.icon-bg:before
  font-family: 'Font Awesome 6 Pro'
  font-size: 250px
  right: -20px
  position: absolute
  top: -90px
  opacity: 0.07

.frozen:before
  content: "\f2dc"
  color: $light-blue

.resigned:before
  content: "\f54c"
  color: $negative

.body--dark .icon-bg:before
  opacity: 0.13
</style>
