<template>
  <div class="container-confirm d-flex flex-column justify-content-between" id="container-complete">
    <div class="simu-comfirm-top flex-grow-1">
      <div class="simu-confirm-main">
        <div class="simu-confirm-content">
          <div class="simu-confirm-card">
            <div class="simu-confirm-card-top d-flex justify-content-between align-items-stretch">
              <div class="simu-confirm-kiji d-flex justify-content-start flex-grow-1">
                <span class="simu-confirm-kiji-img">
                  <img :src="kiji_img_path + kijiActiveObj.img" alt="">
                </span>
                <div class="simu-confirm-kiji-detail d-flex flex-column justify-content-between">
                  <p class="">
                    <span class="simu-confirm-kiji-code">{{kijiActiveObj.code}}</span><br>
                    <span class="simu-confirm-kiji-name">{{kijiActiveObj.name}}</span><br>
                    <span class="simu-confirm-kiji-name">c/# 09</span>
                  </p>
                </div>
              </div>
              <div class="simu-confirm-card-bl">
                <span class="simu-confirm-label">単価(税込)</span>
                <span class="simu-confirm-card-value">￥41,800</span>
              </div>
              <div class="simu-confirm-card-bl">
                <span class="simu-confirm-label">数量</span>
                <span class="simu-confirm-card-value">1</span>
              </div>
              <div class="simu-confirm-card-bl">
                <span class="simu-confirm-label">小計(税込)</span>
                <span class="simu-confirm-card-value">￥41,800</span>
              </div>
            </div>
          </div>
          <div class="simu-confirm-payment d-flex justify-content-between">
              <div class="simu-confirm-payment-left d-flex flex-column justify-content-center">
                <span class="simu-confirm-label">受取方法：配送</span>
              </div>
              <div class="simu-confirm-payment-right d-flex flex-column justify-content-between">
                <span class="simu-confirm-label">商品価格(税込)</span>
                <span class="simu-confirm-payment-price">￥41,800</span>
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
                    <p class="barCodeName">オーダー(2) PO品番・金額</p>
                    <ul class="barCodeImgList">
                      <li class="barCodeImg">
                        <barcode value="1111-1234-10102013" format="codabar" height="68" displayValue="false">
                          バーコードはエラーが発生しました。
                        </barcode>
                      </li>
                      <li class="barCodeImg">
                        <barcode value="1111-1234-10102013" format="codabar" height="68" displayValue="false">
                          バーコードはエラーが発生しました。
                        </barcode>
                      </li>
                    </ul>
                  </div>
                  <div class="barCodeItem">
                    <p class="barCodeName">オーダー(2) PO品番・金額</p>
                    <ul class="barCodeImgList">
                      <li class="barCodeImg">
                        <barcode value="1111-1234-10102013" format="codabar" height="68" displayValue="false">
                          バーコードはエラーが発生しました。
                        </barcode>
                      </li>
                      <li class="barCodeImg">
                        <barcode value="1111-1234-10102013" format="codabar" height="68" displayValue="false">
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
      barCodeShow: false
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
    }
  },
  mounted(){
    
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
      'delivery_method',
      'initialData'
    ]),
    kijiActiveObj: function(){
      if(this.kijiData){
        return this.kijiData.filter(item => item.id == this.kijiActive)[0]
      } else{
        return {}
      }
    }
  }
};
</script>
