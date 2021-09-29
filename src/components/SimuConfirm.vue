<template>
  <div class="container-confirm d-flex flex-column justify-content-between">
    <div class="simu-comfirm-top flex-grow-1">
      <div class="simu-confirm-main">
        <div class="simu-confirm-content">
          <div class="simu-confirm-card" v-for="OrderTemp in orderTempItem" :key="OrderTemp.id">
            <div class="simu-confirm-card-top d-flex justify-content-between align-items-stretch">
              <div class="simu-confirm-kiji d-flex justify-content-start flex-grow-1">
                <span class="simu-confirm-kiji-img">
                  <img :src="kiji_img_path + kijiObj(OrderTemp.product_id).img" alt="">
                </span>
                <div class="simu-confirm-kiji-detail d-flex flex-column justify-content-between">
                  <p class="">
                    <span class="simu-confirm-kiji-code">{{kijiObj(OrderTemp.product_id).code}}</span><br>
                    <span class="simu-confirm-kiji-name">{{kijiObj(OrderTemp.product_id).name}}</span><br>
                    <span class="simu-confirm-kiji-name">c/# 09</span>
                  </p>
                  <button class="simu-common-btn">サイズ詳細</button>
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
            <div class="simu-confirm-detail">
              <div class="simu-confirm-detail-more d-flex align-items-center justify-content-center">
                <span class="" @click="showOrderDetail($event)">受注詳細</span>
              </div>
              <div class="simu-confirm-detail-bottom">
                <div class="simu-confirm-option">
                  <div class="simu-confirm-designItem"
                  v-for="Design in designData(OrderTemp.id)" :key="Design.design_id">
                    <h4 class="simu-confirm-design"><i class="far fa-square"></i>&nbsp;{{Design.design_label}}</h4>
                    <ul class="simu-confirm-detail-list d-flex justify-content-between">
                      <li class="simu-confirm-detail-item d-flex justify-content-between align-items-center"
                      v-for="OptionParent in getOptionParent(Design.design_id)" :key="OptionParent.parent_id">
                        <span class="simu-confirm-detail-label">{{OptionParent.name}}</span>
                        <span class="simu-confirm-detail-value">
                          {{getOptionItem(OrderTemp.id, Design.combine_id, Design.item_id, Design.design_id, OptionParent.parent_id).name}}
                        </span>
                        <button type="button" class="simu-confirm-detail-change btn btn-outline-dark" 
                        @click="showDetail(OrderTemp.id, OrderTemp.model, Design.combine_id, Design.item_id, Design.design_id, OptionParent.parent_id)">
                        修正</button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="simu-confirm-detail-return d-flex align-items-center justify-content-center">
                  <button class="simu-common-btn" @click="doBack(OrderTemp.id)">シミュレーターに戻る</button>
                </div>
              </div>
            </div>
          </div>
          <div class="simu-confirm-payment d-flex justify-content-between">
              <div class="simu-confirm-payment-left d-flex flex-column justify-content-start">
                <span class="simu-confirm-label">受取方法</span>
                <div class="simu-confirm-payment-deli">
                  <input class="fancy-radio" hidden id="delivery1" name="deliMethod" type="radio" value="1"
                  v-model="deli_id">
                  <label class="fancy-radio-label" for="delivery1">
                      <span class="fancy-label--text">配送</span>
                      <span class="fancy-radiobutton">
                          <span class="radiobutton-dot"></span>
                      </span>
                  </label>
                  <input class="fancy-radio" hidden id="delivery2" name="deliMethod" type="radio" value="2"
                  v-model="deli_id">
                  <label class="fancy-radio-label" for="delivery2">
                      <span class="fancy-label--text">当店で受け取り</span>
                      <span class="fancy-radiobutton">
                          <span class="radiobutton-dot"></span>
                      </span>
                  </label>
                </div>
              </div>
              <div class="simu-confirm-payment-right d-flex flex-column justify-content-between">
                <span class="simu-confirm-label">商品価格(税込)</span>
                <span class="simu-confirm-payment-price">￥41,800</span>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="simu-comfirm-nav d-flex align-items-center justify-content-center">
      <div class="dropup">
        <button class="simu-common-btn dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
          オーダー追加
        </button>
        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
          <li class="dropdown-item">小名サイズで作成</li>
          <li class="dropdown-item">違うサイズで作成</li>
          <li class="dropdown-item" @click="doSaveOrderTemp(1)">履歴川作成</li>
        </ul>
      </div>
      <button id="simu-confirm-btn" class="simu-common-btn"
      @click="confirmModalShow">オーダー完了</button>
    </div>

    <!-- Modal -->
    <transition name="modal">
      <div class="modal-mask" v-if="optionConfirmActive">
        <div class="modal-wrapper">
          <div class="modal-container modal-container-option">
            <SelectKiji v-if="optionConfirmActive=='kiji'"
            @closeOption="closeDetailOption($event)"/>
            <SelectOption
            v-if="optionConfirmActive != 'kiji'"
            :orderId="orderIdActive"
            @closeOption="closeDetailOption($event)"/>
          </div>
        </div>
      </div>
      <div class="modal-mask" v-if="orderConfirmCheck">
        <div class="modal-wrapper">
          <div class="modal-container">
              <div class="modal-body">
                <span class="order-confirm-question">オーダーを完了しますか？</span>
              </div>
              <div class="modal-footer justify-content-center">
                <slot name="footer">
                  <button class="simu-common-btn" @click="confirmModalClose">戻る</button>
                  <button class="simu-common-btn" @click="doOrderComplete(1)">完了</button>
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
import SelectKiji from "../components/SelectKiji.vue"
import SelectOption from "../components/SelectOption.vue"

export default {
  name: "SimuConfirm",
  components: {SelectKiji, SelectOption},
  data() {
    return {
      arrOrderTemp: [],
      optionConfirmActive: null,
      deli_id: null,
      orderConfirmCheck: null,
      orderIdActive: null,
    }
  },
  methods: {
    showOrderDetail(event){
      $(event.target).parents('.simu-confirm-detail').find('.simu-confirm-detail-bottom').toggleClass('on')
      $(event.target).toggleClass('on')
    },
    getOptionParent(design_id){
      if(this.optionParentData.filter(item => item.design_id == design_id).length){
        return this.optionParentData.filter(item => item.design_id == design_id)[0].parentData
      }
    },
    getOptionItem(orderId, combine_id, item_id, design_id, parent_id){
        let optionIndex = this.optionSelectedData.findIndex(
          item => item.orderId == orderId
          && item.combine_id == combine_id
          && item.item_id == item_id
          && item.design_id == design_id
          && item.parent_id == parent_id
        )
        if(optionIndex !== -1){
          return this.optionSelectedData[optionIndex]
        } else{
          return {}
        }
    },
    showDetailKiji(){
      this.optionConfirmActive = 'kiji'
    },
    showDetail(orderId, model, combine_id, item_id, design_id, parent_id){
        this.orderIdActive = orderId
        this.$store.dispatch('handleChangeDesign',{
          combine_id: combine_id,
          item_id: item_id,
          design_id: design_id
        })
        this.$store.dispatch('handleChangeModelSelected', model)
        this.$store.dispatch('handleChangeOptionDetailActive', parent_id)
        this.optionConfirmActive = parent_id
    },
    closeDetailOption(){
      this.optionConfirmActive = null
      this.orderIdActive = null
    },
    doBack(orderId){
      this.$store.dispatch('handleChangeOrder', orderId)
      this.$store.dispatch('handleChangeStep', this.step - 1)
    },
    confirmModalShow(){
      this.orderConfirmCheck = 1
    },
    confirmModalClose(){
      this.orderConfirmCheck = null
    },
    saveOrder: async function(order_status){
      this.confirmModalClose();
      this.$store.dispatch('handleChangeLoaddingData', true)
      let ret = null
      await this.axios.request({
        url: 'http://54.248.46.255/myshop/addorder/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          order_status : order_status,
          product_id: this.kijiActive,
          category_select: this.initialData.category_select,
          style: this.styleSelected,
          model: this.modelSelected,
          item: this.itemSelected,
          option_selected : this.optionSelectedData,
          price: 1000,
          quantity: 1,
          delivery_id: this.delivery_method
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
    doOrderComplete: async function(order_status){
      await(this.saveOrder(order_status)).then((response) => {
      if(response !== null){
          this.$store.dispatch('handleChangeLoaddingData', false)
          this.$store.dispatch('handleChangeStep', 4)
          // // this.$store.dispatch('handleChangeCartItemId', response)
        }
      })
    },
    saveOrderTemp: async function(order_status){
      this.$store.dispatch('handleChangeLoaddingData', true)
      let ret = null
      await this.axios.request({
        url: 'http://54.248.46.255/myshop/addordertemp/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          orderTemp: this.orderTempItem
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
    doSaveOrderTemp: function(order_status){
      this.$store.dispatch('handleUpdateOptionSelectedOrderTemp', null)
      this.saveOrderTemp(order_status).then((response) => {
      if(response !== null){
          this.$store.dispatch('handleChangeLoaddingData', false)
          console.log(response)
        }
      })
    },
    kijiObj: function(kijiId){
      if(this.kijiData.length && this.kijiData.filter(item => item.id == kijiId).length){
        return this.kijiData.filter(item => item.id == kijiId)[0]
      } else{
        return {}
      }
    },
    designData: function(orderId){
      if(this.itemData.length && this.itemData.filter(item => item.orderId == orderId).length){
        return this.itemData.filter(item => item.orderId == orderId)[0].design
      } else{
        return null
      }
    },
    getOrderItemSession: async function(){
      let ret = null
      await this.axios.request({
        url: 'http://54.248.46.255/myshop/getordertemp/',
        method: 'get',
        headers: {'X-Requested-With': 'XMLHttpRequest'}
      })
      .then(response => {
        ret = response.data.data
      })
      .catch(error => {
        this.$store.dispatch('handleChangeErrorCode', 2)
        console.log(error)
      })
      return ret
    },
    updateOrderItemList: async function(){
      await this.getOrderItemSession().then(response => {
        if(response && response.length){
         this.$store.dispatch('handleChangeOrderTemp', response)
        }
      })
    },
  },
  mounted(){
    this.deli_id = this.delivery_method
    //save orderItemNow to arrOrderItem
    this.$store.dispatch('handleUpdateOrderTemp',{
      id: this.orderNowId,
      category_select: this.category_select,
      product_id: this.kijiActive,
      style: this.styleSelected,
      model: this.modelSelected,
      item: this.itemSelected,
      option_selected: this.optionSelectedData.filter(item => item.orderId == this.orderNowId)
    })
    this.updateOrderItemList()
  },
  props: [],
  watch: {
    deli_id: function(){
      this.$store.dispatch('handleChangeDeliData', this.deli_id)
    }
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
      'initialData',
      'orderNowId',
      'orderTempItem',
      'category_select'
    ]),
    itemCombineData: function(){
        return (this.itemData) ? this.itemData.items : null
    }
  }
};
</script>
