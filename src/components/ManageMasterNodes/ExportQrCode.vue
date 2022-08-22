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
              <div class="text-h6">Import/Export</div>
            </q-item-section>
          </template>

          <q-card :class="{ 'bg-grey-2': basics.darkMode === false }">
            <q-card-section>
              <p>
                Bring your watched masternodes to another Masternode Monitor, simply by
                scanning a QR code.
              </p>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section>

      <q-separator :class="{ 'light-gradient': user.settings.colorfulMode }" />

      <q-card-section>
        <q-btn
          outline
          icon="fa-light fa-upload"
          label="export"
          class="full-width"
          @click="exportQrCodeVisible = !exportQrCodeVisible"
        >
          <q-dialog
            v-model="exportQrCodeVisible"
            persistent
            maximized
            transition-show="slide-up"
            transition-hide="slide-down"
          >
            <q-card>
              <q-card-section class="bg-primary-dark">
                <div class="text-h4 text-white">Export</div>
              </q-card-section>

              <q-card-section class="flex flex-center">
                <QRCodeVue3
                  :width="1000"
                  :height="1000"
                  myclass="qr-container"
                  imgclass="qr-image"
                  :dots-options="{
                    type: 'square',
                    color: '#000',
                  }"
                  :corners-square-options="{ type: 'square', color: '#000' }"
                  :qr-options="{
                    typeNumber: 0,
                    mode: 'Byte',
                    errorCorrectionLevel: 'M',
                  }"
                  :value="JSON.stringify(exportData)"
                />
                <!--
                  :download="true"
                  download-button="my-button"
                  :download-options="{
                    name: 'masternode-monitor',
                    extension: 'png',
                  }"
                  -->
              </q-card-section>
              <q-card-section class="text-body2 text-weight-light">
                Scan this image using the "import" button in the "Manage Masternodes"
                section in another Masternode Monitor to import this Masternode Monitor's
                watched masternodes.
              </q-card-section>
              <q-card-section class="text-body2 text-weight-light q-mb-xl">
                You can also save this image to save your masternode list.
              </q-card-section>
              <q-card-section style="position: fixed; bottom: 0; left: 0; right: 0">
                <q-btn
                  v-close-popup
                  outline
                  icon="fa-light fa-close"
                  label="close"
                  class="full-width"
                />
              </q-card-section>
            </q-card>
          </q-dialog>
        </q-btn>
        <q-btn
          outline
          icon="fa-light fa-download"
          label="import"
          class="full-width q-mt-md"
          @click="captureQrCodeVisible = !captureQrCodeVisible"
        >
          <q-dialog
            v-model="captureQrCodeVisible"
            persistent
            maximized
            transition-show="slide-up"
            transition-hide="slide-down"
          >
            <q-card>
              <q-card-section class="bg-primary-dark">
                <div class="text-h4 text-white">Import</div>
              </q-card-section>
              <q-card-section
                v-if="!hasMasternodesToBeImported"
                class="square text-center"
              >
                <qrcode-stream class="content" @init="onCameraInit" @decode="qrDecoded">
                  <div
                    v-if="cameraLoading"
                    style="width: 100%"
                    class="text-center q-mt-xl"
                  >
                    <q-spinner size="xl" />
                  </div>
                </qrcode-stream>
              </q-card-section>

              <q-card-section
                v-if="!hasMasternodesToBeImported"
                class="text-body2 text-weight-light q-mb-xl"
              >
                Scan the QR code showing by tapping on the "export" button in the "Manage
                Masternodes" section in another Masternode Monitor to import that
                Masternode Monitor's watched masternodes into this one.
              </q-card-section>

              <q-card-section v-if="hasMasternodesToBeImported">
                <q-list bordered separator>
                  <q-item
                    v-for="(masternodeName, ownerAddress) in importMasternodeList"
                    :key="ownerAddress"
                  >
                    <q-item-section>
                      <q-item-label>{{ masternodeName || "Unnamed" }}</q-item-label>
                      <q-item-label caption>{{ ownerAddress }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <div class="text-center q-mt-md">
                  <q-icon name="fa-light fa-arrow-down-long" size="md" />
                </div>
                <span v-if="user.watchesMasterNodes">
                  <q-btn
                    v-close-popup
                    outline
                    icon="fa-light fa-layer-plus"
                    label="Add to existing masternodes"
                    class="full-width q-mt-md"
                    @click="importAdd()"
                  />
                  <div class="text-center q-my-md">OR</div>
                  <q-btn
                    v-close-popup
                    outline
                    icon="fa-light fa-broom"
                    color="negative"
                    label="Wipe Existing Before Import"
                    class="full-width"
                    @click="importWipe()"
                  />
                </span>
                <q-btn
                  v-else
                  v-close-popup
                  outline
                  icon="fa-light fa-layer-plus"
                  label="import these masternodes"
                  class="full-width q-mt-md"
                  @click="importAdd()"
                />
              </q-card-section>

              <q-card-section style="position: fixed; bottom: 0; left: 0; right: 0">
                <q-btn
                  v-close-popup
                  outline
                  icon="fa-light fa-close"
                  label="close"
                  class="full-width"
                />
              </q-card-section>
            </q-card>
          </q-dialog>
        </q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";

import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";

import QRCodeVue3 from "qrcode-vue3";

import { QrcodeStream /*QrcodeDropZone, QrcodeCapture*/ } from "qrcode-reader-vue3";

export default defineComponent({
  name: "ImportExportMasterNode",

  components: {
    QRCodeVue3,
    QrcodeStream,
  },

  setup() {
    const user = useUserStore();

    const exportQrCodeVisible = ref(false);
    const captureQrCodeVisible = ref(false);

    const exportData = computed(() => {
      let collection = {};
      user.watchedMasterNodes.forEach(
        (entry) => (collection[entry.ownerAddress] = entry.name)
      );
      return collection;
    });

    const cameraLoading = ref(false);
    const importMasternodeList = ref({});

    const importAdd = async () => {
      for await (const [masternodeOwnerAddress, masternodeName] of Object.entries(
        importMasternodeList.value
      )) {
        await user.addWatchedMasterNode(masternodeOwnerAddress, masternodeName);
      }
    };

    const importWipe = async () => {
      user.watchedMasterNodes = [];
      importAdd();
    };

    return {
      basics: useBasicsStore(),
      user,
      exportData,
      exportQrCodeVisible,
      captureQrCodeVisible,
      qrDecoded: (data) => {
        importMasternodeList.value = JSON.parse(data);
      },
      importMasternodeList,
      hasMasternodesToBeImported: computed(
        () => Object.keys(importMasternodeList.value).length > 0
      ),
      cameraLoading,
      onCameraInit: async (promise) => {
        cameraLoading.value = true;
        try {
          await promise;
        } catch (error) {
          console.error(error);
        } finally {
          cameraLoading.value = false;
        }
      },
      importAdd,
      importWipe,
    };
  },
});
</script>

<style lang="sass">
.qr-container
  background-color: #fff
  padding: 10px

.qr-image
  width: 100%
  height: 100%
  object-fit: contain

.square
  width: 100% !important
  height: 0 !important
  padding-top: 100% !important
  position: relative

  .content
    position: absolute
    max-height: 80vh
    max-width: 80vh
    top: 0
    left: 0
</style>
