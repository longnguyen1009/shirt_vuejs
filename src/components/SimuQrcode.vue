<template>
  <div class="container-qrcode">
    <span class="closeBtn" 
      @click="closeQrCode">
      <img :src="main_path + 'html/user_data/assets/img/common/header_close_white.png'" alt="">
    </span>
    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>
    <p class="qr-error">{{error}}</p>
    <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
      <div v-show="showScanConfirmation" class="scan-confirmation">
        <img :src="main_path + 'html/user_data/assets/img/common/checkmark.svg'" alt="Checkmark" width="128px" />
      </div>
    </qrcode-stream>
  </div>
</template>

<script>

import { QrcodeStream } from "vue-qrcode-reader"
import { mapGetters } from 'vuex'

export default {
  name: "SimuQrcode",
  components: { QrcodeStream },

  data() {
    return {
      camera: "auto",
      result: null,
      error: '',
      showScanConfirmation: false,
    };
  },

  methods: {
    closeQrCode: function(){
      this.$emit('closeQrCode')
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permission"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        } else if (error.name === 'InsecureContextError') {
          this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      } finally {
        this.showScanConfirmation = this.camera === "off";
      }
    },
    async onDecode(content) {
      this.result = content;
      this.pause();
      await this.timeout(500);
      this.unpause();
    },
    unpause() {
      this.camera = "auto";
    },
    pause() {
      this.camera = "off";
    },
    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
      });
    },
  },
  computed: {
    ...mapGetters([
      'main_path'
    ]),
  }
};
</script>

<style scoped>
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.error {
  font-weight: bold;
  color: red;
}
</style>
