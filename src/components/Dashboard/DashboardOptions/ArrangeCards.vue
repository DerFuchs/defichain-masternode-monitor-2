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
				<!-- <q-bar class="bg-primary-dark text-white">
					Arrange Cards On Dashboard
					<q-space />
					<q-btn
						v-close-popup
						dense
						flat
						icon="fa-light fa-close"
						class="text-white"
					>
						<q-tooltip class="bg-white text-primary">Close</q-tooltip>
					</q-btn>
				</q-bar> -->
				<q-card-section>
					<q-list separator>
						<q-item v-for="(card, index) of cardSort" :key="card">
							<!-- <q-item-section avatar top> Test </q-item-section> -->

							<q-item-section top class="col-2 gt-sm">
								<q-item-label class="q-mt-sm">GitHub</q-item-label>
							</q-item-section>

							<q-item-section>
								<q-item-label :class="{ 'text-grey-6': !card.visible }">
									{{ cardText[card.name] }}

									<!-- <span class="text-grey-8"> - GitHub repository</span> -->
								</q-item-label>
								<!-- <q-item-label caption lines="1">
                  @rstoenescu in #3: > Generic type parameter for props
                </q-item-label> -->
							</q-item-section>

							<q-item-section top side>
								<div class="text-grey-8 q-gutter-xs">
									<q-btn
										v-if="card.visible"
										size="12px"
										flat
										dense
										round
										icon="fa-light fa-eye"
										@click="toggleVisibility(card.name)"
									/>
									<q-btn
										v-if="!card.visible"
										size="12px"
										flat
										dense
										round
										icon="fa-light fa-eye-slash"
										@click="toggleVisibility(card.name)"
									/>
									<q-btn
										:disabled="index == 0"
										size="12px"
										flat
										dense
										round
										icon="fa-light fa-arrow-up"
										@click="moveCardUp(card.name)"
									/>
									<q-btn
										:disabled="index == cardSort.length - 1"
										size="12px"
										flat
										dense
										round
										icon="fa-light fa-arrow-down"
										@click="moveCardDown(card.name)"
									/>
								</div>
							</q-item-section>
							<!-- <q-card-section
								style="position: fixed; bottom: 0; left: 0; right: 0"
							>
								<q-btn
									v-close-popup
									outline
									icon="fa-light fa-close"
									label="close"
									class="full-width"
								/>
							</q-card-section> -->
						</q-item>
					</q-list>
				</q-card-section>
				<!--
        <q-card-section>
          <draggable
            v-model="availableCards"
            class="list-group"
            tag="transition-group"
            :component-data="{
              tag: 'ul',
              type: 'transition-group',
              name: !drag ? 'flip-list' : null,
            }"
            v-bind="dragOptions"
            item-key="order"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element }">
              <li class="list-group-item">
                <i
                  :class="
                    element.fixed ? 'fa-light fa-anchor' : 'glyphicon glyphicon-pushpin'
                  "
                  aria-hidden="true"
                  @click="element.fixed = !element.fixed"
                ></i>
                {{ element.name }}
              </li>
            </template>
          </draggable>
        </q-card-section> -->
			</q-card>
		</q-dialog>
	</q-btn>
</template>

<script>
import { defineComponent, ref, computed } from "vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

//import draggable from "vuedraggable";

const cardText = {
	RewardSum: "Total Rewards",
	MintingsCount: "Minted Blocks",
	TxSum: "Total TX Secured",
};

export default defineComponent({
	name: "DashboardOptions",

	components: {
		//draggable,
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

		const cardSort = computed(() =>
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
			})
		);

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
			moveCardUp(cardName) {
				const arr = user.settings.dashboard.cardSort;
				const fromIndex = arr.indexOf(cardName);
				const toIndex = fromIndex - 1;
				const element = arr.splice(fromIndex, 1)[0];
				arr.splice(toIndex, 0, element);
			},
			moveCardDown(cardName) {
				const arr = user.settings.dashboard.cardSort;
				const fromIndex = arr.indexOf(cardName);
				const toIndex = fromIndex + 1;
				const element = arr.splice(fromIndex, 1)[0];
				arr.splice(toIndex, 0, element);
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

.list-group
  min-height: 20px

  &-item
    cursor: move

  &-item i
    cursor: pointer
</style>
