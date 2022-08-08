<template>
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
    <q-card class="full-width" :class="{ 'bg-grey-2': basics.darkMode === false }">
      <q-card-section class="text-h6 q-py-sm">
        Add Master Node
        {{ user.darkMode }}
      </q-card-section>
      <q-separator />
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
          :disable="!addButtonEnabled"
          :outline="!addButtonEnabled"
          class="q-mt-sm full-width"
          no-caps
          icon="fa-light fa-circle-plus"
          @click="
            user.setMasterNode(newMasterNodeAddress);
            clear();
          "
        >
          <div class="ellipsis">
            &nbsp;{{ $t("manageMasterNodes.addBtnLabel", { name: addButtonLabel }) }}
          </div>
        </q-btn>
      </q-card-section>
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
