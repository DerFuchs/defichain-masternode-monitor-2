<template>
	<q-btn
		outline
		icon="fa-light fa-arrow-down-arrow-up"
		label="arrange"
		@click="dialogVisible = !dialogVisible"
	>
		<q-dialog
			v-model="dialogVisible"
			seamless
			position="bottom"
			transition-show="slide-up"
			transition-hide="slide-down"
		>
			<q-card>
				<q-card-section
					class="row items-center q-py-xs text-white bg-primary-dark"
				>
					<div class="text-h6">Arrange Cards</div>
					<q-space />
					<q-btn
						v-close-popup
						icon="fa-light fa-close"
						flat
						round
						dense
						color="white"
					/>
				</q-card-section>
				<q-card-section class="q-px-none">
					<q-list separator>
						<draggable
							v-model="cardSort"
							tag="div"
							item-key="name"
							handle=".handle"
							ghost-class="bg-accent"
							animation="250"
							easing="cubic-bezier(1, 0, 0, 1)"
						>
							<template #item="{ element }">
								<q-item :key="element.name">
									<q-item-section>
										<q-item-label :class="{ 'text-grey-6': !element.visible }">
											{{ cardText[element.name] }}
										</q-item-label>
									</q-item-section>

									<q-item-section top side>
										<div class="text-grey-8 q-gutter-xs">
											<q-btn
												v-if="element.visible"
												size="12px"
												flat
												dense
												round
												icon="fa-light fa-eye"
												@click="toggleVisibility(element.name)"
											/>
											<q-btn
												v-if="!element.visible"
												size="12px"
												flat
												dense
												round
												icon="fa-light fa-eye-slash"
												@click="toggleVisibility(element.name)"
											/>
											<q-btn
												size="12px"
												flat
												dense
												round
												class="handle"
												icon="fa-light fa-grip-dots-vertical"
											/>
										</div>
									</q-item-section>
								</q-item>
							</template>
						</draggable>
					</q-list>
				</q-card-section>
			</q-card>
		</q-dialog>
	</q-btn>
</template>

<script>
import { defineComponent, ref, computed } from "vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

import draggable from "vuedraggable";

const cardText = {
	RewardSum: "Total Rewards",
	MintingsCount: "Minted Blocks",
	TxSum: "Total TX Secured",
	MintingPerformance: "Minting Performance",
};

export default defineComponent({
	name: "DashboardOptions",

	components: {
		draggable,
	},

	setup() {
		const basics = useBasicsStore();
		const user = useUserStore();

		const availableCards = user.availableCards.map((name, index) => {
			return { name, order: index + 1, fixed: false };
		});

		if (user.settings.dashboard.cardSort.length == 0) {
			user.settings.dashboard.cardSort = user.availableCards;
		} else {
			user.settings.dashboard.cardSort = [
				...new Set([
					...user.settings.dashboard.cardSort,
					...user.availableCards,
				]),
			];
		}

		const cardSort = computed({
			get: () =>
				[
					...new Set([
						...user.settings.dashboard.cardSort,
						...user.availableCards,
					]),
				].map((name, index) => {
					const invisible = new Set(user.settings.dashboard.invisibleCards).has(
						name
					);
					return { name, order: index + 1, visible: !invisible };
				}),
			set: (newArragement) => {
				user.settings.dashboard.cardSort = newArragement.map(
					(card) => card.name
				);
			},
		});

		return {
			basics,
			user,
			availableCards,
			cardSort,
			cardText,
			dialogVisible: ref(false),
			drag: ref(false),
			dragOptions: {
				animation: 200,
				group: "description",
				disabled: false,
				ghostClass: "ghost",
			},
			toggleVisibility: (cardName) => {
				if (new Set(user.settings.dashboard.invisibleCards).has(cardName)) {
					user.settings.dashboard.invisibleCards =
						user.settings.dashboard.invisibleCards.filter(
							(item) => item != cardName
						);
				} else {
					user.settings.dashboard.invisibleCards.push(cardName);
				}
			},
		};
	},
});
</script>

<style lang="sass">
.button
  margin-top: 35px

.flip-list-move
  transition: transform 0.5s

.no-move
  transition: transform 0s

.ghost
  opacity: 0.5
  background: #c8ebfb
</style>
