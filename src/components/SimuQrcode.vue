<template>
  <div class="container-qrcode">
    <span class="closeBtn" 
      @click="closeQrCode">
      <img :src="main_path + 'html/user_data/assets/img/common/header_close_white.png'" alt="">
    </span>
    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>
    <p class="qr-error" v-if="error">{{error}}</p>
    <div class="scan-box">
      <StreamBarcodeReader
          v-if="!showScanConfirmation"
          @decode="onDecode"
          @loaded="onLoaded"
      ></StreamBarcodeReader>
      <div v-show="showScanConfirmation" class="scan-confirmation">
        <img :src="main_path + 'html/user_data/assets/img/common/checkmark.svg'" alt="Checkmark" width="128px" />
      </div>
    </div>
  </div>
</template>

<script>

// import { QrcodeStream } from "vue-qrcode-reader"
import { StreamBarcodeReader } from "vue-barcode-reader";
import { mapGetters } from 'vuex'

export default {
  name: "SimuQrcode",
  components: { StreamBarcodeReader },

  data() {
    return {
      camera: "auto",
      result: null,
      error: ''
    };
  },

  methods: {
    closeQrCode: function(){
      this.$emit('closeQrCode')
    },
    async onLoaded(promise) {
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
        // this.showScanConfirmation = this.camera === "off"
      }
    },
    async onDecode(content) {
      this.result = content
      this.pause()
      await this.getOptionFromBarCode(this.result).then(respone => {
        console.log(respone)
        if(respone){
          this.unpause()
        }
      })
    },
    getOptionFromBarCode: async function(barcode){
      let ret = null
      await this.axios.request({
        url: this.main_path + 'myshop/getoptionbybarcode/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          barcode: barcode,
          design_list: designArr,
          glr_kind: glr_kind,
          model: this.
        }
      })
      .then(response => {
        ret = response.data.data
      })
      .catch(error => {
        this.error = error
        console.log(error)
      })
      
      return ret
    },
    unpause() {
      this.camera = "auto"
    },
    pause() {
      this.camera = "off"
    },
    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    },

  },
  computed: {
    ...mapGetters([
      'main_path'
    ]),
    showScanConfirmation() {
      return this.camera === "off"
    }
  }
};
</script>

<style scoped>

</style>
