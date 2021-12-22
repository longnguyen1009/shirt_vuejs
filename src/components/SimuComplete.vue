<template>
  <div class="container-confirm d-flex flex-column justify-content-between" id="container-complete">
    <div class="simu-comfirm-top flex-grow-1">
      <div class="simu-confirm-main">
        <div class="simu-confirm-content">
          <div class="simu-confirm-card" v-for="Item in orderData.orderitem" :key="Item.item_id">
            <div class="simu-confirm-card-top d-flex justify-content-between align-items-stretch">
              <div class="simu-confirm-kiji d-flex justify-content-start flex-grow-1">
                <span class="simu-confirm-kiji-img">
                  <img :src="kiji_img_path + getKijiObj(Item.product_id).img" alt="">
                </span>
                <div class="simu-confirm-kiji-detail d-flex flex-column justify-content-between">
                  <p class="">
                    <span class="simu-confirm-kiji-code">{{getKijiObj(Item.product_id).code}}</span><br>
                    <span class="simu-confirm-kiji-name" v-if="getKijiObj(Item.product_id).name">{{getKijiObj(Item.product_id).name}}<br></span>
                    <span class="simu-confirm-kiji-name" v-if="!getKijiObj(Item.product_id).name">{{getKijiObj(Item.product_id).sub_name}}<br></span>
                    <span class="simu-confirm-kiji-name">C/#{{getKijiObj(Item.product_id).fabric_color}}</span>
                  </p>
                </div>
              </div>
              <div class="simu-confirm-card-bl">
                <span class="simu-confirm-label">単価(税込)</span>
                <span class="simu-confirm-card-value">{{moneyTypeShow02(Item.price * (1 + initialData.tax_rate/100))}}</span>
              </div>
              <div class="simu-confirm-card-bl">
                <span class="simu-confirm-label">数量</span>
                <span class="simu-confirm-card-value">{{Item.quantity}}</span>
              </div>
              <div class="simu-confirm-card-bl">
                <span class="simu-confirm-label">小計(税込)</span>
                <span class="simu-confirm-card-value">{{moneyTypeShow02(Item.price * Item.quantity * (1 + initialData.tax_rate/100))}}</span>
              </div>
            </div>
          </div>
          <div class="simu-confirm-payment d-flex justify-content-between">
              <div class="simu-confirm-payment-left d-flex flex-column justify-content-center">
                <span class="simu-confirm-label">受取方法：{{getDeliName(orderData.shipping)}}</span>
              </div>
              <div class="simu-confirm-payment-right d-flex flex-column justify-content-between">
                <span class="simu-confirm-label">商品価格(税込)</span>
                <span class="simu-confirm-payment-price">{{moneyTypeShow02(orderData.payment)}}</span>
                <span class="simu-confirm-label" v-if="isStaff">{{parseInt(orderData.cost)}}</span>
              </div>
          </div>
        </div>
        <div class="barCode-showBtn d-flex align-items-center justify-content-center">
          <button class="simu-common-btn btnSize02" @click="showBarCode">バーコードを表示</button>
        </div>
      </div>
    </div>
    <div class="simu-comfirm-nav d-flex align-items-center justify-content-center">
      <button class="simu-common-btn btnSize02" @click="goToTop">TOP</button>
    </div>

    <!-- Modal -->
    <transition name="modal">
      <div class="modal-mask" v-if="barCodeShow" id="barCodeModal">
        <div class="modal-wrapper">
          <div class="modal-container white">
              <div class="modal-body overflow">
                <div class="barCodeLists">
                  <div class="barCodeItem">
                    <p class="barCodeName">HCバーコード</p>
                    <ul class="barCodeImgList">
                      <li class="barCodeImg">
                        <barcode :value="orderData.hc_code" format="codabar" height="68" displayValue="false">
                          バーコードはエラーが発生しました。
                        </barcode>
                      </li>
                    </ul>
                  </div>
                  <div class="barCodeItem" v-for="Item in orderData.orderitem" :key="Item.item_id">
                    <p class="barCodeName">オーダー({{Item.item_id}}) PO品番・金額</p>
                    <ul class="barCodeImgList">
                      <li class="barCodeImg"><span>PO品番</span><br>
                        <barcode :value="fomatPoCode(Item.order_code)" format="codabar" height="68" displayValue="false">
                          バーコードはエラーが発生しました。
                        </barcode>
                      </li>
                      <li class="barCodeImg"><span>金額</span><br>
                        <barcode :value="fomatPayment(Number(Item.price))" format="codabar" height="68" displayValue="false">
                          バーコードはエラーが発生しました。
                        </barcode>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button class="simu-common-btn white btnSize02" @click="barCodeModalClose">戻る</button>
              </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueBarcode from 'vue-barcode'
import Mixins from '../mixin/mixin'

export default {
  name: "SimuComplete",
  components: {
    'barcode': VueBarcode
  },
  mixins: [Mixins],
  data() {
    return {
      barCodeShow: false,
      orderData: {}
    }
  },
  methods: {
    goToTop(){
      window.location.href = this.main_path + "myshop/neworder/";
    },
    showBarCode(){
      this.barCodeShow = true
    },
    barCodeModalClose(){
      this.barCodeShow = false
    },
    getDeliName(deliId){
      if(this.deliData.findIndex(item => item.id == deliId) !== -1){
        return this.deliData.find(item => item.id == deliId).name
      } else{
        return ''
      }
    },
    getKijiObj(kijiId){
      return this.kijiData.find(item => item.id == kijiId)
    },
    getOrderInfo: async function(){
      this.$store.dispatch('handleChangeLoaddingData', true)
      let ret = null
      await this.axios.request({
        url: this.main_path + 'myshop/getorderinfo/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          orderid: this.orderCompleteId
        }
      })
      .then(response => {
        ret = response.data.data
      })
      .catch(error => {
        this.$store.dispatch('handleChangeLoaddingData', false)
        this.$store.dispatch('handleChangeErrorCode', 2)
        console.log(error)
      })
      return ret
    },
    setOrderInfo: async function(){
      await this.getOrderInfo().then(response => {
        if(response){
          this.orderData = response
          this.$store.dispatch('handleChangeLoaddingData', false)
        }
      })
    },
    sendCompleteMailToFactory: async function(){
      let ret = null
      await this.axios.request({
        url: this.main_path + 'myshop/sendcompletemailtofactory/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          orderId: this.orderCompleteId
        }
      })
      .then(response => {
        ret = response.data.data
        if(!ret){
          this.$store.dispatch('handleChangeErrorCode', 9)
        }
      })
      .catch(error => {
        console.log(error)
        this.$store.dispatch('handleChangeErrorCode', 9)
      })
      return ret
    },
    //1129-273-0010 -> 112927300100000
    fomatPoCode: function(pocode){
      return pocode.replaceAll('-', '') + '0000';
    },
    fomatPayment: function(payment){
      let paymentTemp = payment.toString()
      while (paymentTemp.length < 7) {
        paymentTemp = '0' + paymentTemp;
      }
      return paymentTemp
    }
  },
  props: [],
  mounted(){
    this.setOrderInfo()
    this.sendCompleteMailToFactory()
  },
  watch: {
    
  },
  computed: {
    ...mapGetters([
      'main_path',
      'step',
      'kiji_img_path',
      'kijiData',
      'kijiActive',
      'styleSelected',
      'modelSelected',
      'itemSelected',
      'itemData',
      'optionParentData',
      'optionSelectedData',
      'deliActive',
      'initialData',
      'orderCompleteId',
      'deliData'
    ]),
    isStaff: function(){
      if((this.initialData.customer_id + '').startsWith("000")){
        return true
      } else{
        return true
      }
    }
  }
};
</script>
