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
                    <span class="simu-confirm-kiji-name">{{getKijiObj(Item.product_id).name}}</span><br>
                    <span class="simu-confirm-kiji-name">c/# 09</span>
                  </p>
                </div>
              </div>
              <div class="simu-confirm-card-bl">
                <span class="simu-confirm-label">単価(税込)</span>
                <span class="simu-confirm-card-value">{{moneyTypeShow02(Item.price)}}</span>
              </div>
              <div class="simu-confirm-card-bl">
                <span class="simu-confirm-label">数量</span>
                <span class="simu-confirm-card-value">{{Item.quantity}}</span>
              </div>
              <div class="simu-confirm-card-bl">
                <span class="simu-confirm-label">小計(税込)</span>
                <span class="simu-confirm-card-value">{{moneyTypeShow02(Item.price * Item.quantity)}}</span>
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
              </div>
          </div>
        </div>
        <div class="barCode-showBtn d-flex align-items-center justify-content-center">
          <button class="simu-common-btn" @click="showBarCode">バーコードを表示</button>
        </div>
      </div>
    </div>
    <div class="simu-comfirm-nav d-flex align-items-center justify-content-center">
      <button id="simu-confirm-btn" class="simu-common-btn"
      @click="goToTop">TOP</button>
    </div>

    <!-- Modal -->
    <transition name="modal">
      <div class="modal-mask" v-if="barCodeShow" id="barCodeModal">
        <div class="modal-wrapper">
          <div class="modal-container">
              <div class="modal-body">
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
                        <barcode :value="Item.order_code" format="codabar" height="68" displayValue="false">
                          バーコードはエラーが発生しました。
                        </barcode>
                      </li>
                      <li class="barCodeImg"><span>金額</span><br>
                        <barcode :value="Number(Item.price)" format="codabar" height="68" displayValue="false">
                          バーコードはエラーが発生しました。
                        </barcode>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="modal-footer justify-content-center">
                <slot name="footer">
                  <button class="simu-common-btn" @click="barCodeModalClose">戻る</button>
                </slot>
              </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueBarcode from 'vue-barcode';

export default {
  name: "SimuComplete",
  components: {
    'barcode': VueBarcode
  },
  data() {
    return {
      barCodeShow: false,
      orderData: {}
    }
  },
  methods: {
    goToTop(){
      window.location.href = "http://54.248.46.255/myshop/neworder/";
    },
    showBarCode(){
      this.barCodeShow = true
    },
    barCodeModalClose(){
      this.barCodeShow = false
    },
    moneyTypeShow02(number){
      return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number)
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
        url: 'http://54.248.46.255/myshop/getorderinfo/',
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
    }
  },
  mounted(){
    this.setOrderInfo()
  },
  props: [],
  watch: {
    
  },
  computed: {
    ...mapGetters([
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
    ])
  }
};
</script>
