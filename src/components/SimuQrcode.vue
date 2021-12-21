<template>
  <div class="container-qrcode">
    <span class="closeBtn" 
      @click="closeQrCode">
      <img :src="main_path + 'html/user_data/assets/img/common/header_close_white.png'" alt="">
    </span>
    <div class="barcodeScan-top">
      <div class="barcodeScan-input d-flex justify-content-between flex-wrap align-items-center">
        <div class="barcodeScan-input-left d-flex justify-content-between">
          <input type="text" class="form-control" id="barcodeId" @input="isTyping = true" v-model="barcodeInput" placeholder="バーコードを入力" aria-label="検索">
          <span v-show="scannerActive == false" class="scan-confirmation">
            <img :src="main_path + 'html/user_data/assets/img/common/checkmark.svg'" alt="Checkmark" width="128px" />
          </span>
        </div>
        <div class="barcodeScan-button d-flex justify-content-around">
          <button @click="deleteBarcodeInput" class="simu-common-btn btnSize01 white">クリア</button>
          <button @click="optionConfirm" class="simu-common-btn btnSize01 gray">確定</button>
        </div>
        <span class="barcodeScan-input-error" v-if="error">{{error}}</span>
      </div>
      <div class="barcodeScan-result" v-if="optionResult.length">
        <div v-for="(optionItem, id) in optionResult.slice().reverse()" :key="id" 
          class="d-flex justify-content-between align-items-center barcodeScan-item">
          <span class="barcodeScan-code">{{optionItem.barcode}}</span>
          <ul v-if="!optionItem.error && optionItem.type == 'option'" class="barcodeScan-lists">
            <li v-for="(option, id2) in optionItem.options" :key="id2" class="barcodeScan-detail">
              {{option.parent_name}}&nbsp;&nbsp;|&nbsp;&nbsp;<b>{{option.option_name}}</b>
            </li>
          </ul>
          <ul v-if="!optionItem.error && optionItem.type == 'kiji'" class="barcodeScan-lists">
            <li class="barcodeScan-detail">
              生地&nbsp;&nbsp;|&nbsp;&nbsp;<b>{{optionItem.kiji.code}}</b> &nbsp;&nbsp;|&nbsp;&nbsp;{{optionItem.kiji.brand_name}}
            </li>
          </ul>
          <span v-if="optionItem.error" class="barcodeScan-error">{{optionItem.error}}</span>
        </div>
      </div>
      <div class="loaddingDataIo" v-if="isLoading">
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

import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: "SimuQrcode",
  data() {
    return {
      scannerActive: true,
      result: null,
      error: '',
      optionResult: [],
      isLoading: false,
      barcodeInput: '',
      isTyping: false
    };
  },

  methods: {
    closeQrCode: function(){
      // Quagga.stop()
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
    optionConfirm: async function() {
      let barcodeIndex = this.optionResult.findIndex(item => item.barcode == this.barcodeInput)
      if(barcodeIndex == -1){
        if(this.barcodeInput){
          this.isLoading = true
          await this.getOptionFromBarCode(this.barcodeInput).then(respone => {
            if(respone.type == 'kiji'){
              let kijiSearch = this.kijiData.find(item => item.id == respone.kiji.id)
              if(kijiSearch && kijiSearch.style.findIndex(item => item.style_id == this.styleSelected) != -1){
                this.setKijiStock(respone.kiji, this.barcodeInput)
              } else{
                this.error = '生地を選択できません。'
              }
            } else{
              if(respone.type == 'option' && respone.options.length){
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
                    this.addOption({
                      barcode: this.barcodeInput,
                      options: [{
                        design_name: element.design_label,
                        parent_name: OptionItem.parent_name,
                        option_name: OptionItem.name
                      }],
                      type: 'option',
                      error: false
                    })
                  }
                })
              } else{
                this.addOption({
                  barcode: this.barcodeInput,
                  options: [],
                  type: 'option',
                  error: 'オプションがありません。'
                })
              }
            }
          })
          this.scannerActive = true;
          this.isLoading = false
        }
        this.deleteBarcodeInput()
      } else{
        this.error = 'バーコードを確定しました。'
      }
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
    deleteBarcodeInput: function(){
      this.barcodeInput = ''
      this.scannerActive = true
      $('#barcodeId').prop("readonly", true);
      // $('#barcodeId').focus()
      // setTimeout(() => {
      //   $('#barcodeId').prop("readonly", false);
      // }, 50)
      this.error = ''
    },
    setKijiStock: async function(kiji, barcode){
      let requireStock = 0
      if(!kiji.stock_unlimited){
        if(kiji.fabric_kind == 1) {
            requireStock = this.stockSelectedDataNow.bichikusei_min
        } else if(kiji.fabric_kind == 2){
            requireStock = this.stockSelectedDataNow.sensei_min
        }
      }

      await this.saveKijiStockApi(kiji.id, requireStock).then(response => {
          if(response){
            if(response == 'nostock'){
              this.$store.dispatch('handleChangeErrorCode', 7)
              this.setKijiData()
              this.addOption({
                barcode: barcode,
                options: [],
                kiji: null,
                type: 'kiji',
                error: '生地を選択できません。'
              })
            } else{
              if(Number.isInteger(response)){
                this.$store.dispatch('handleUpdateStockOldId', response)
              } else{
                this.$store.dispatch('handleUpdateStockOldId', false)
              }
              this.$store.dispatch('handleChangeKiji', kiji.id)
              let kijiObj = this.kijiData.find(item => item.id == kiji.id)
              this.addOption({
                  barcode: barcode,
                  options: [],
                  kiji: kijiObj,
                  type: 'kiji',
                  error: false
                })
            }
          } else{
            this.$store.dispatch('handleChangeErrorCode', 2)
            this.setKijiData()
          }
        })

    },
    saveKijiStockApi: async function(kijiId, stock){
      this.isLoading = true
      let ret = null
        await this.axios.request({
          url: this.main_path + 'myshop/savekijistock/',
          method: 'post',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: {
            kiji: kijiId,
            stock: stock,
            stock_old_id: this.stock_old_id
          }
        })
        .then(response => {
          // console.log(response)
          ret = response.data.data
          this.isLoading = false
        })
        .catch(error => {
          this.isLoading = false
          this.$store.dispatch('handleChangeErrorCode', 2)
          console.log(error)
        })
        return ret
    },
    addOption: function(optionData){
      let optionIndex = this.optionResult.findIndex(item => item.barcode == optionData.barcode)
      if(optionIndex !== -1 && !optionData.error){
        if(optionData.type == 'option'){
          this.optionResult[optionIndex].options.push(optionData.options[0])
        }
      } else{
        this.optionResult.push(optionData)
      }
    },
    setKijiData: async function(){
      await this.getKijiFromAPI().then(response => {
        if(response){
          this.$store.dispatch('handleChangeKijiData', response)
        }
      })
    },
    getKijiFromAPI: async function(){
        let ret = null
        await this.axios.request({
          url: this.main_path + 'myshop/getkijilist/',
          method: 'get',
          headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
        .then(response => {
          // console.log(response)
          ret = response.data.data
        })
        .catch(error => {
          this.$store.dispatch('handleChangeErrorCode', 2)
          console.log(error)
        })
        return ret
    },
  },
  mounted() {
    $('#barcodeId').prop("readonly", true);
    // $('#barcodeId').focus()
    // setTimeout(() => {
    //   $('#barcodeId').prop("readonly", false);
    // }, 50)
    this.setKijiData()
    document.addEventListener('keyup', (ev) => {
      // if (ev.ctrlKey || ev.altKey) return;  // Ignore command-like keys
      if (ev.key == 'Enter') {
        this.scannerActive = false
        // this.optionConfirm()
        return
      } else if(ev.key.length > 1) { // A character not a key like F12 or Backspace
       return
      } else {
       this.barcodeInput += ev.key
      }
    });

  },
  props: ['designData'],
  watch: {
    barcodeInput: _.debounce(function() {
      this.isTyping = false;
    }, 300),
    isTyping: function(value) {
      if (!value && this.barcodeInput) {
        this.scannerActive = false
      } else{
        this.scannerActive = true
      }
    }
  },
  computed: {
    ...mapGetters([
      'main_path',
      'modelSelected',
      'kijiActive',
      'kijiData',
      'initialData',
      'itemData',
      'orderNowId',
      'designActive',
      'stockSelectedData',
      'stock_old_id',
      'styleSelected'
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
    },
    stockSelectedDataNow: function(){
      return this.stockSelectedData.find(item => item.orderId == this.orderNowId)
    },
  }
};
</script>

<style scoped>

</style>
