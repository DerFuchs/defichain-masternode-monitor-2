<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <master-node-entry
        v-for="masterNode in user.masterNodes"
        :key="masterNode.ownerAddress"
      />
      <add-master-node />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import MasterNodeEntry from "components/ManageMasterNodes/MasterNodeEntry.vue";
import AddMasterNode from "components/ManageMasterNodes/AddMasterNode.vue";
import { useUserStore } from "stores/user";

export default defineComponent({
  name: "ManageMasterNodes",

  components: {
    MasterNodeEntry,
    AddMasterNode,
  },

  setup() {
    return {
      user: useUserStore(),
    };
  },
});
</script>
