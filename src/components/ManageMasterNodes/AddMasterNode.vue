<template>
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
    <q-card
      class="full-width full-height"
      :class="{ 'bg-grey-2': basics.darkMode === false }"
    >
      <q-card-section class="q-px-none q-py-none">
        <q-expansion-item
          class="q-pa-none q-ma-none"
          expand-icon="fa-light fa-circle-question"
        >
          <template #header>
            <q-item-section class="q-pa-none q-ma-none">
              <div class="text-h6">Add Masternode</div>
            </q-item-section>
          </template>

          <q-card :class="{ 'bg-grey-2': basics.darkMode === false }">
            <q-card-section>
              <p>
                This is a list of your watched masternodes. You can add more, or remove
                old ones. This will not and cannot manipulate your masternodes.
              </p>
              <p>
                Masternode Monitor also supports resigned masternodes. If you regularly
                resign old and spin up new ones later, you can track them all to see a
                history.
              </p>
              <p>
                To add another masternode to your list, just paste in its owner address,
                operator address or masternode id and give it a name if you like.
              </p>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section>

      <q-separator :class="{ 'light-gradient': user.settings.colorfulMode }" />

      <q-card-section>
        <!-- INPUT: masternode name -->
        <q-input
          v-model="newMasterNodeName"
          :label="$t('manageMasterNodes.masterNodeNameInput')"
          :class="{ 'bg-white': basics.darkMode === false }"
        >
          <template #prepend>
            <q-icon name="fa-light fa-input-text" />
          </template>
        </q-input>

        <!-- INPUT: masternode address -->
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
              add {{ addButtonLabel }}
            </span>
            <span v-else>you already watch this masternode</span>
          </div>
        </q-btn>
      </q-card-section>
      <q-card-section class="q-pt-none text-caption text-grey-8">
        Masternode Monitor will have to fetch all available Masternodes from DeFiChain.
        This includes roughly ~10 Megabytes of data and will take some time, depending on
        the speed of your internet connection.
      </q-card-section>

      <q-inner-loading
        :showing="basics.isProcessing('add_watched_master_node')"
        class="q-pa-xl text-center bg-blur"
      >
        <ocean-spinner />
        <p v-if="basics.isFetching('masternode_list')">
          Asking DeFiChain for a complete list of all masternodes ever existed (~10 MB)
        </p>
        <p
          v-if="
            basics.isFetching('masternode_details') &&
            !basics.isFetching('masternode_list')
          "
        >
          Asking DeFiChain for this masternode's details &amp; mintings
        </p>
      </q-inner-loading>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";
import OceanSpinner from "../common/OceanSpinner.vue";

export default defineComponent({
  name: "AddMasterNode",
  components: { OceanSpinner },

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
