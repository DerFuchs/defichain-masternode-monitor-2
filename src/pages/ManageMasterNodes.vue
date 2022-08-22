<template>
  <q-page class="q-pa-md">
    <div class="row items-stretch q-col-gutter-md">
      <master-node-entry
        v-for="masterNode in user.watchedMasterNodes"
        :key="masterNode.ownerAddress"
        :data="masterNode"
      />
      <add-master-node />
      <export-qr-code />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

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
    return {
      user: useUserStore(),
    };
  },
});
</script>
