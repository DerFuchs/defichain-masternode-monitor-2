<template>
	<q-page class="q-pa-md">
		<div
			v-if="user.watchesMasterNodes"
			class="row items-stretch q-col-gutter-md q-mb-md"
		>
			<div class="col-12">
				<q-toggle
					v-model="settings.showAddresses"
					color="accent"
					label="Show Addresses"
					checked-icon="fa-light fa-check"
					unchecked-icon="fa-light fa-x"
				/>
				<q-toggle
					v-model="settings.showDetails"
					color="accent"
					label="Show More Details"
					checked-icon="fa-light fa-check"
					unchecked-icon="fa-light fa-x"
				/>
			</div>
		</div>
		<q-separator
			v-if="user.watchesMasterNodes"
			:class="{ 'light-gradient': user.settings.colorfulMode }"
		/>
		<div
			class="row items-stretch q-col-gutter-md"
			:class="{ 'q-my-md': user.watchesMasterNodes }"
		>
			<master-node-entry
				v-for="masterNode in user.watchedMasterNodes"
				:key="masterNode.ownerAddress"
				:data="masterNode"
			/>
		</div>
		<q-separator
			v-if="user.watchesMasterNodes"
			:class="{ 'light-gradient': user.settings.colorfulMode }"
		/>
		<div class="row items-stretch q-col-gutter-md q-mt-xs">
			<add-master-node />
			<export-qr-code />
		</div>
	</q-page>
</template>

<script>
import { defineComponent, reactive, watch, unref } from "vue";

import { useUserStore } from "stores/user";

import MasterNodeEntry from "components/ManageMasterNodes/MasterNodeEntry.vue";
import AddMasterNode from "components/ManageMasterNodes/AddMasterNode.vue";
import ExportQrCode from "components/ManageMasterNodes/ExportQrCode.vue";

export default defineComponent({
	name: "ManageMasterNodes",

	components: {
		MasterNodeEntry,
		AddMasterNode,
		ExportQrCode,
	},

	setup() {
		const user = useUserStore();

		const settings = reactive({
			...{
				showAddresses: true,
				showDetails: true,
			},
			...(user.settings?.manageMasternodesPage ?? {}),
		});

		if (
			user.settings?.manageMasternodesPage.length == undefined ||
			user.settings?.manageMasternodesPage.length == 0
		) {
			user.settings.manageMasternodesPage = unref(settings);
		}

		watch(settings, (newSettings) => {
			user.settings.manageMasternodesPage = newSettings;
		});

		return {
			user,
			settings,
		};
	},
});
</script>
