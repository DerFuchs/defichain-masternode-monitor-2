<template>
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
    <q-card
      class="full-width full-height"
      :class="{ 'bg-grey-2': basics.darkMode === false }"
    >
      <q-card-section class="text-h6 q-py-sm"> Add Master Node </q-card-section>

      <q-separator :class="{ 'light-gradient': user.settings.colorfulMode }" />

      <q-card-section>
        <!-- INPUT: master node name -->
        <q-input
          v-model="newMasterNodeName"
          :label="$t('manageMasterNodes.masterNodeNameInput')"
          :class="{ 'bg-white': basics.darkMode === false }"
        >
          <template #prepend>
            <q-icon name="fa-light fa-input-text" />
          </template>
        </q-input>

        <!-- INPUT: master node address -->
        <q-input
          v-model="newMasterNodeAddress"
          :label="$t('manageMasterNodes.addressInput')"
          class="q-mt-sm"
          :class="{ 'bg-white': basics.darkMode === false }"
        >
          <template #prepend>
            <q-icon name="fa-light fa-address-card" />
          </template>
        </q-input>

        <!-- BUTTON -->
        <q-btn
          :disable="!addButtonEnabled || user.watchesMasterNode(newMasterNodeAddress)"
          :outline="!addButtonEnabled || user.watchesMasterNode(newMasterNodeAddress)"
          class="q-mt-sm full-width"
          no-caps
          @click="
            user.addWatchedMasterNode(newMasterNodeAddress, newMasterNodeName);
            clear();
          "
        >
          <div class="ellipsis">
            <span v-if="!user.watchesMasterNode(newMasterNodeAddress)">
              <q-icon name="fa-light fa-circle-plus" class="q-mr-xs" />
              {{ $t("manageMasterNodes.addBtnLabel", { name: addButtonLabel }) }}
            </span>
            <span v-else>you already watch this master node</span>
          </div>
        </q-btn>
      </q-card-section>
      <q-card-section class="q-pt-none text-caption text-grey-8">
        Master Node Monitor will have to fetch all available Master Nodes from
        DeFiChain.<br />
        This includes roughly ~15 Megabytes of data and will take some time, depending on
        the speed of your internet connection.
      </q-card-section>

      <q-inner-loading :showing="basics.isProcessing('add_watched_master_node')">
        <q-spinner-puff size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

export default defineComponent({
  name: "AddMasterNode",

  setup() {
    const newMasterNodeName = ref("");
    const newMasterNodeAddress = ref("");

    let addButtonLabel = computed(() =>
      newMasterNodeName.value.length > 0
        ? newMasterNodeName.value
        : newMasterNodeAddress.value
    );

    return {
      basics: useBasicsStore(),
      user: useUserStore(),
      newMasterNodeName,
      newMasterNodeAddress,
      addButtonLabel,
      addButtonEnabled: computed(
        () =>
          // check for correct DeFiChain address length
          newMasterNodeAddress.value.length == 34 ||
          newMasterNodeAddress.value.length == 42
      ),
      clear: () => {
        newMasterNodeName.value = "";
        newMasterNodeAddress.value = "";
      },
    };
  },
});
</script>
