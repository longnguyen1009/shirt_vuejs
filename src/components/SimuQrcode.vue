<template>
  <div class="container-qrcode">
    <span class="closeBtn" 
      @click="closeQrCode">
      <img :src="main_path + 'html/user_data/assets/img/common/header_close_white.png'" alt="">
    </span>
    <div class="qr-result">
      <p class="decode-result">バーコード: <b>{{ result }}</b></p>
      <ul class="qr-options" v-if="optionResult.length">
        <li v-for="(option, id) in optionResult" :key="id">
          <i class="fas fa-check-square"></i>&nbsp;{{option.design_name}}<br>
          &nbsp;&nbsp;&nbsp;&nbsp;{{option.parent_name}} | <b>{{option.option_name}}</b>
        </li>
      </ul>
      <p class="qr-error" v-if="error">{{error}}</p>
    </div>
    <div class="scan-box">
      <div id="videoWindow" class="video"></div>
      <div v-show="scannerActive == false" class="scan-confirmation">
        <img :src="main_path + 'html/user_data/assets/img/common/checkmark.svg'" alt="Checkmark" width="128px" />
      </div>
      <div class="loaddingDataIo" v-if="loadingOption">
        <div class="loadingio-spinner-spinner-482naetb3m">
          <div class="ldio-2vyxc9gibh9">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Quagga from '@ericblade/quagga2';
import { mapGetters } from 'vuex'

export default {
  name: "SimuQrcode",
  data() {
    return {
      scannerActive: false,
      result: null,
      optionResult: [],
      error: '',
      loadingOption: false
    };
  },

  methods: {
    closeQrCode: function(){
      Quagga.stop()
      this.$emit('closeQrCode')
    },
    showError: function(error) {
      console.log(err)
      if (error.message === 'DOMException: Requested device not found') {
        this.error = "ERROR: カメラ取得に失敗しました。"
      } else if (error.message === 'NotFoundError') {
        this.error = "ERROR: no camera on this device"
      } else if (error.message === 'NotSupportedError') {
        this.error = "ERROR: secure context required (HTTPS, localhost)"
      } else if (error.message === 'NotReadableError') {
        this.error = "ERROR: is the camera already in use?"
      } else if (error.message === 'OverconstrainedError') {
        this.error = "ERROR: installed cameras are not suitable"
      } else if (error.message === 'StreamApiNotSupportedError') {
        this.error = "ERROR: Stream API is not supported in this browser"
      } else if (error.message === 'InsecureContextError') {
        this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
      } else {
        this.error = `ERROR: Camera error (${error.message})`;
      }
    },
    onDecode: async function(data) {
      const foundResult = data;
      const foundCode = {
        code: foundResult.codeResult.code,
        type: foundResult.codeResult.format
      }
      this.result = foundCode.code
      this.pause()
      this.optionResult.splice(0, this.optionResult.length)
      this.loadingOption = true
      await this.getOptionFromBarCode(this.result).then(respone => {
        if(respone.options.length){
          this.error = ''
          this.designData.forEach(element => {
            let OptionItem = respone.options.find(item => item.design == element.design_id)
            if(OptionItem){
              this.$store.dispatch('handleChangeOption', {
                orderId: this.orderNowId,
                combine_id: element.combine_id,
                item_id: element.item_id,
                design_id: element.design_id,
                parent_id: OptionItem.parent_id,
                option_id: OptionItem.id,
                cate_id: OptionItem.cate_id ? OptionItem.cate_id : null,
                cate_name: OptionItem.cate_name ? OptionItem.cate_name : null,
                option_img: OptionItem.simu_img,
                option_shirt_svg: OptionItem.option_shirt_svg,
                option_shirt_shadow: OptionItem.option_shirt_shadow,
                name: OptionItem.name,
                type: OptionItem.type,
                cost: OptionItem.price,
                glr_kind: OptionItem.glr_kind
              })
              this.optionResult.push({
                design_name: element.design_label,
                parent_name: OptionItem.parent_name,
                option_name: OptionItem.name
              })
            }
          });
        } else{
          this.error = 'このオプションを選択することができません。'
        }
        this.scannerActive = true;
        Quagga.start()
      })
      this.loadingOption = false
    },
    getOptionFromBarCode: async function(barcode){
      let ret = null
      await this.axios.request({
        url: this.main_path + 'myshop/getoptionbybarcode/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          barcode: barcode,
          design_list: this.designArr,
          glr_kind: this.glr_kind,
          model: this.modelSelected
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
      this.scannerActive = true;
      Quagga.start();
    },
    pause() {
      this.scannerActive = false;
      Quagga.pause();
    },
    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    },

  },
  mounted() {
    this.scannerActive = true;
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#videoWindow'),   // Or '#yourElement' (optional),
        // area: { top: "30%", right: "0%", left: "0%", bottom: "30%" }
      },
      decoder : {
        readers : ["codabar_reader"],
        debug: {
            drawBoundingBox: false,
            showFrequency: false,
            drawScanline: false,
            showPattern: false
        },
        multiple: false
      }
    }, function(err) {
        if (err) {
            console.log(err)
            return 
        }
        //console.log("Initialization finished. Ready to start");
        Quagga.start();
    });
    Quagga.onDetected(data => this.onDecode(data))
  },
  props: ['designData'],
  computed: {
    ...mapGetters([
      'main_path',
      'modelSelected',
      'kijiActive',
      'kijiData',
      'initialData',
      'itemData',
      'orderNowId',
      'designActive'
    ]),
    glr_kind: function(){
      if(this.initialData.shop_kind == 2 && this.kijiObj && this.kijiObj.glr_kind){
          return this.kijiObj.glr_kind
      }
      return null
    },
    kijiObj: function(){
      if(this.kijiData && this.kijiActive){
        return this.kijiData.find(item => item.id == this.kijiActive)
      } else{
        return null
      }
    },
    designArr: function(){
      return this.designData.map(item => item.design_id)
    }
  }
};
</script>

<style scoped>

</style>
