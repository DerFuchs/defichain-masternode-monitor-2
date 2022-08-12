<template>
	<settings-card headline="Custom Ocean Data Source">
		<template #description>
			Running your own ocean instance like
			<a
				class="text-primary"
				href="https://github.com/defichain-pond/pond-deploy"
				>@sandrich's Defichain Pond</a
			>
			or just using another one? Paste its address in here and Masternode
			Monitor will use it as it's primary data source.
		</template>
		<q-input
			v-model="newOceanUrl"
			:placeholder="defaultOceanUrl"
			:class="{
				'bg-white': basics.darkMode === false,
				'bg-dark': basics.darkMode === true,
			}"
		>
			<template #append>
				<q-btn
					flat
					dense
					icon="fa-light fa-floppy-disk"
					:disable="newOceanUrl == currentOceanUrl"
					:color="newOceanUrl == currentOceanUrl ? 'grey' : 'primary'"
					@click="setOceanUrl()"
				/>
			</template>
		</q-input>
		<q-btn
			v-if="currentOceanUrl"
			class="full-width q-mt-md"
			label="reset to default"
			@click="
				newOceanUrl = null;
				setOceanUrl();
			"
		/>
	</settings-card>
</template>

<script>
import { defineComponent, ref, toRef, watch } from "vue";
import SettingsCard from "components/common/SettingsCard.vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";
import { useDeFiChainStore } from "src/stores/defichain";

export default defineComponent({
	name: "CustomOcean",

	components: { SettingsCard },

	setup() {
		const user = useUserStore();
		const defichain = useDeFiChainStore();
		const newOceanUrl = ref(
			JSON.parse(JSON.stringify(user.settings.customOceanUrl))
		); // that's a dirty trick to remove the reference to the setting and treat it just like a local string

		watch(newOceanUrl, (newVal) => {
			if (typeof newOceanUrl.value == "string") {
				newOceanUrl.value = newVal.trim();
			}
		});

		return {
			basics: useBasicsStore(),
			user,
			defichain,
			currentOceanUrl: toRef(user.settings, "customOceanUrl"),
			newOceanUrl,
			defaultOceanUrl: process.env.OCEAN_URL,
			setOceanUrl: () => {
				user.settings.customOceanUrl =
					newOceanUrl.value?.length > 0 ? newOceanUrl.value : null;
				defichain.setCustomOceanUrl(newOceanUrl.value);
			},
		};
	},
});
</script>
