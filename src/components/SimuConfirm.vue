<template>
  <div class="container-confirm d-flex flex-column justify-content-between">
    <div class="simu-comfirm-top flex-grow-1">
      <div class="simu-confirm-main">
        <div class="simu-confirm-content">
          <div class="simu-confirm-card" v-for="OrderTemp in orderTempItem" :key="OrderTemp.id">
            <div class="simu-confirm-card-top d-flex justify-content-between align-items-stretch">
              <div class="simu-confirm-kiji d-flex justify-content-start flex-grow-1">
                <span class="simu-confirm-kiji-img">
                  <img :src="kiji_img_path + kijiObj(OrderTemp.product_id).img" alt="" @error="imgError">
                </span>
                <div class="simu-confirm-kiji-detail d-flex flex-column justify-content-between">
                  <p class="font-poppins font-medium">
                    <span class="simu-confirm-kiji-code">{{kijiObj(OrderTemp.product_id).code}}</span><br>
                    <span class="simu-confirm-kiji-name" v-if="kijiObj(OrderTemp.product_id).name">
                      {{kijiObj(OrderTemp.product_id).name}}
                    </span>
                    <span class="simu-confirm-kiji-name" v-if="!kijiObj(OrderTemp.product_id).name">
                      {{kijiObj(OrderTemp.product_id).sub_name}}
                    </span>
                    <br>
                    <span class="simu-confirm-kiji-name" v-if="kijiObj(OrderTemp.product_id).fabric_color">C/#{{kijiObj(OrderTemp.product_id).fabric_color}}</span>
                  </p>
                  <button class="simu-common-btn"
                  @click="showSizeDetail(OrderTemp.id)">サイズ詳細</button>
                </div>
              </div>
              <div class="simu-confirm-card-bl">
                <span class="simu-confirm-label">単価</span>
                <span class="simu-confirm-card-value font-poppins font-medium">{{moneyTypeShow02(getPriceOrder(OrderTemp.id))}}</span>
              </div>
              <div class="simu-confirm-card-bl">
                <span class="simu-confirm-label">数量</span>
                <span class="simu-confirm-card-value font-poppins font-medium">{{OrderTemp.quantity}}</span>
              </div>
              <div class="simu-confirm-card-bl">
                <span class="simu-confirm-label">小計</span>
                <span class="simu-confirm-card-value font-poppins font-medium">{{moneyTypeShow02(OrderTemp.quantity * getPriceOrder(OrderTemp.id))}}</span>
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
                      <template v-for="OptionParent in getOptionParent(Design.design_id, OrderTemp.model)">
                        <li class="simu-confirm-detail-item d-flex justify-content-between align-items-center"
                        :key="OptionParent.parent_id"
                        v-if="checkDependOnParent(OptionParent, OrderTemp.id, Design.combine_id, Design.item_id, Design.design_id)">
                          <span class="simu-confirm-detail-label">{{OptionParent.name}}</span>
                          <span class="simu-confirm-detail-value">
                            {{getNameOptionItem(OrderTemp.id, Design.combine_id, Design.item_id, Design.design_id, OptionParent.parent_id)}}
                            <span class="simu-alert" v-if="checkAction && !getNameOptionItem(OrderTemp.id, Design.combine_id, Design.item_id, Design.design_id, OptionParent.parent_id)">
                              <i class="fas fa-exclamation-triangle"></i>&nbsp;選択してください。
                            </span>
                          </span>
                          <button type="button" class="simu-confirm-detail-change btn btn-outline-dark" 
                          @click="showDetail(OrderTemp.id, OrderTemp.model, Design.combine_id, Design.item_id, Design.design_id, OptionParent.parent_id)">
                          修正</button>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
                <div class="simu-confirm-detail-return d-flex align-items-center justify-content-center">
                  <button class="simu-common-btn btnSize02" @click="doBack(OrderTemp.id)">シミュレーターに戻る</button>
                </div>
              </div>
            </div>
            <span class="simu-confirm-removeBtn closeBtn" 
            @click="removeConfirmOrderTemp(OrderTemp.id)">
            <img :src="main_path + 'html/user_data/assets/img/common/header_close_white.png'" alt="">
            </span>
          </div>
          <div class="simu-confirm-payment d-flex justify-content-between">
              <div class="simu-confirm-payment-left d-flex flex-column justify-content-start">
                <span class="simu-confirm-label">受取方法</span>
                <div class="simu-confirm-payment-deli">
                  <span v-for="Deli in deliData" :key="Deli.id">
                    <input class="fancy-radio" hidden :id="'delivery' + Deli.id" name="deliMethod" type="radio" :value="Deli.id"
                    v-model="deli_id">
                    <label class="fancy-radio-label" :for="'delivery' + Deli.id">
                        <span class="fancy-label--text">{{Deli.name}}</span>
                        <span class="fancy-checkbox">
                            <span class="radiobutton-dot"></span>
                        </span>
                    </label>
                  </span>
                </div>
              </div>
              <div class="simu-confirm-payment-right d-flex flex-column justify-content-between">
                <span class="simu-confirm-label">商品価格(税込)</span>
                <span class="simu-confirm-payment-price font-poppins font-medium">{{moneyTypeShow02(getSumPrice() * (1 + initialData.tax_rate/100))}}</span>
                <ul class="simu-confirm-label simu-confirm-payment-cost font-poppins" v-if="isStaff">
                  <li v-for="(OrderTemp, id) in orderTempItem" :key="id">{{parseInt(OrderTemp.cost_temp ? OrderTemp.cost_temp : 0)}}</li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="simu-comfirm-nav d-flex align-items-center justify-content-center">
      <div class="dropup" v-if="orderTempItem.length > 0">
        <button class="simu-common-btn dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
          オーダー追加
        </button>
        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
          <li class="dropdown-item" @click="doSaveOrderTemp(1)">同じサイズで作成</li>
          <li class="dropdown-item" @click="doSaveOrderTemp(2)">違うサイズで作成</li>
          <li class="dropdown-item" @click="doSaveOrderTemp(3)">履歴から作成</li>
        </ul>
      </div>
      <button class="simu-common-btn btnSize02"
      @click="confirmModalShow"
      v-if="orderTempItem.length > 0">オーダー完了</button>

      <button class="simu-common-btn btnSize02"
        v-if="orderTempItem.length == 0"
        @click="goToTop">TOP</button>
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
      <div class="modal-mask" v-if="orderSizeActive !== null">
        <div class="modal-wrapper">
          <div class="modal-container white modal-container-sizeconfirm">
            <transition name="transitionRightToLeftHalfWidth">
                <div class="measure-sub" v-if="correction_selected_id" ref="measure_scroll">
                  <ul class="measure-sub-list" ref="measure_scroll_ul">
                    <li class="measure-sub-item" v-for="correctDetailItem in correctDetailActive" :key="correctDetailItem.id">
                      <span class="fancy-input black">
                        <input class="fancy-radio" hidden 
                          :id="'correctDetailItem-' + correctDetailItem.id" 
                          :name="'correctDetailItem' + correction_selected_id" 
                          type="radio" 
                          :value="correctDetailItem.id"
                          v-model="tempCorrectDetailId"
                        >
                        <label class="fancy-radio-label" :for="'correctDetailItem-' + correctDetailItem.id" @click="selectCorrectDetail(correctDetailItem.id)">
                            <span class="fancy-label--text">{{correctDetailItem.text}}</span>
                            <span class="fancy-radiobutton">
                                <span class="radiobutton-dot"></span>
                            </span>
                        </label>
                      </span>
                    </li>
                    <div class="matashita-correct-input" v-if="hasCorrectCustom && tempCorrectDetailId">
                      <input type="text" v-model="correctCustomValue"><br>
                      <span v-if="correctCustomError">数字で入力してください</span>
                      <span class="simu-common-btn btnSize01" @click="correctCustomConfirm">決定</span>
                    </div>
                  </ul>
                  <div class="loaddingDataIo" v-if="loaddingDataCorrectDetail">
                    <div class="loadingio-spinner-spinner-482naetb3m">
                      <div class="ldio-2vyxc9gibh9">
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div>
                      </div>
                    </div>
                  </div>
                </div>
            </transition>
            <div class="measure-sub-fade" v-if="correction_selected_id" @click="closeCorrectionDetail"></div>
            <div class="modal-sizeconfirm-content d-flex flex-column justify-content-center">
              <div class="modal-body">
                <div v-for="(Design, id) in designData(orderSizeActive)" :key="id" class="modal-sizeconfirm-designItem">
                  <h4 class="modal-sizeconfirm-designName">{{Design.design_label}}</h4>
                  <ul class="modal-sizeconfirm-list d-flex justify-content-between flex-wrap align-content-start">
                    <li class="model-sizeconfirm-item d-flex justify-content-between align-items-between">
                      <span class="modal-sizeconfirm-label">サイズ</span>
                      <span class="modal-sizeconfirm-result flex-grow-1 font-ua font-medium">{{getSizeOfDesign(Design.design_id, Design.item_id)}}</span>
                    </li>
                    <li class="model-sizeconfirm-item d-flex justify-content-between align-items-between"
                    v-for="(CorrectDetailItem, correctID) in getSizeDataActiveByDesign(Design.design_id, Design.item_id)"
                    :key="correctID">
                      <span class="modal-sizeconfirm-label">{{CorrectDetailItem.correct_name}}</span>
                      <span class="modal-sizeconfirm-result flex-grow-1 font-ua font-medium">
                        <span v-if="CorrectDetailItem.correct_detail_id">補正：{{CorrectDetailItem.correct_detail_name}}</span><br>
                        <span v-if="CorrectDetailItem.correct_custom_value">({{CorrectDetailItem.correct_custom_value}}cm)</span>
                        <span v-if="CorrectDetailItem.correct_result != null">仕上：{{CorrectDetailItem.correct_result}}cm</span>
                      </span>
                      <button type="button" class="simu-confirm-detail-change btn btn-outline-dark"
                      v-if="!isNaN(CorrectDetailItem.correct_id)"
                      @click="showCorrectionDetail(CorrectDetailItem.correct_id, CorrectDetailItem.design_id, CorrectDetailItem.item_id)">修正</button>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="modal-footer">
                <button class="simu-common-btn white btnSize02 btnSizeHalf" @click="doBack(orderSizeActive)">シミュレーターに戻る</button>
                <button class="simu-common-btn gray btnSize02 btnSizeHalf" @click="confirmModalClose">オーダー確認画面に戻る</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-mask" v-if="orderConfirmCheck">
        <div class="modal-wrapper">
          <div class="modal-container">
              <div class="modal-body center">
                <span class="order-confirm-question">オーダーを完了しますか？</span>
              </div>
              <div class="modal-footer">
                <button class="simu-common-btn btnSize02 btnSizeHalf" @click="confirmModalClose">戻る</button>
                <button class="simu-common-btn btnSize02 btnSizeHalf gray" @click="doOrderComplete(1)">完了</button>
              </div>
          </div>
        </div>
      </div>
      <div class="modal-mask" v-if="orderRemoveCheck != null">
        <div class="modal-wrapper">
          <div class="modal-container">
              <div class="modal-body center">
                <span class="order-confirm-question">このオーダーアイテムを削除しますか？</span>
              </div>
              <div class="modal-footer">
                <button class="simu-common-btn btnSize02 btnSizeHalf" @click="confirmModalClose">戻る</button>
                <button class="simu-common-btn btnSize02 btnSizeHalf gray" @click="removeOrderTemp(orderRemoveCheck)">確認</button>
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
import Mixins from '../mixin/mixin'

export default {
  name: "SimuConfirm",
  components: {SelectKiji, SelectOption},
  mixins: [Mixins],
  data() {
    return {
      arrOrderTemp: [],
      optionConfirmActive: null,
      deli_id: null,
      orderConfirmCheck: null,
      orderIdActive: null,
      orderRemoveCheck: null,
      orderSizeActive: null,
      correction_selected_id: 0,
      correction_selected_design_id: 0,
      correction_selected_item_id: 0,
      loaddingDataCorrectDetail: false,
      tempCorrectDetailId: null,
      // HcErrorLogin: false

      //刺繍ネームID fixed
      optionCustomNameID: [35, 98], //35: Jacketの刺繍ネーム, 98: Shirtの刺繍ネーム

      //パンツの股下 fixed
      correctCustomArr :[25, 26],
      correctCustomError: false,
      correctCustomValue: '',
      // checkStatus
      checkAction: false
    }
  },
  methods: {
    showOrderDetail(event){
      $(event.target).parents('.simu-confirm-detail').find('.simu-confirm-detail-bottom').toggleClass('on')
      $(event.target).toggleClass('on')
    },

    //sort option parent by genre_id and sort_no
    getOptionParent(design_id, model){
      function sortByGenreAndSortNo(a, b) {
        return (a.genre_id === b.genre_id) ? (b.sort_no - a.sort_no) : (a.genre_id - b.genre_id)
      }

      if(this.optionParentData.find(item => item.design_id == design_id && item.model == model)){
        let parentTemp = this.optionParentData.find(item => item.design_id == design_id && item.model == model).parentData
        return parentTemp.slice().sort(sortByGenreAndSortNo)
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
    getNameOptionItem(orderId, combine_id, item_id, design_id, parent_id){
      let optionIndex = this.optionSelectedData.findIndex(
          item => item.orderId == orderId
          && item.combine_id == combine_id
          && item.item_id == item_id
          && item.design_id == design_id
          && item.parent_id == parent_id
        )
        if(optionIndex !== -1){
          let ret = this.optionSelectedData[optionIndex].name
          //刺繡ネーム
          if(this.optionCustomNameID.indexOf(parent_id) != -1 && this.optionSelectedData[optionIndex].custom_name_color_name){
            ret += '/' + this.optionSelectedData[optionIndex].custom_name_color_name + '/' + this.optionSelectedData[optionIndex].custom_name_val
          }
          return ret
        } else{
          return ''
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
      console.log(this.orderTempItem)
      this.$store.dispatch('handleChangeOrder', orderId)
      this.$store.dispatch('handleChangeStep', this.step - 1)
      this.$store.dispatch('handleUpdateStockSelectedData', null)
    },
    confirmModalShow(){
      //check all option selected again
      if(this.allOptionSelectedCheck.length > 0){
        this.checkAction = true
        alert("選択されていない項目があります。ご確認ください。")
      } else{
        this.checkAction = false
        this.orderConfirmCheck = 1
      }
    },
    confirmModalClose(){
      this.orderConfirmCheck = null
      this.orderRemoveCheck = null
      this.orderSizeActive = null
    },
    saveOrder: async function(order_status){
      this.$store.dispatch('handleUpdateOrderTempAllData', null)
      this.confirmModalClose();
      this.$store.dispatch('handleChangeLoaddingData', true)
      let ret = null
      await this.axios.request({
        url: this.main_path + 'myshop/addorder/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          orderitem: this.orderTempItem,
          delivery_id: this.deliActive,
          measureData: this.measureData ? this.measureData : null,
          cartTempId: this.initialData.cartItemId,
          tax_rate: this.initialData.tax_rate,
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
          this.$store.dispatch('handleChandeOrderComplete', response)
          this.$store.dispatch('handleChangeStep', 4)
        }
      })
    },
    saveOrderTemp: async function(){
      this.$store.dispatch('handleChangeLoaddingData', true)
      let ret = null
      await this.axios.request({
        url: this.main_path + 'myshop/addordertemp/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          orderTemp: this.orderTempItem,
          cartTempId: this.initialData.cartItemId
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
    doSaveOrderTemp: async function(savetype){
      this.$store.dispatch('handleUpdateOrderTempAllData', null)
      await this.saveOrderTemp().then((response) => {
      if(response !== null){
          this.$store.dispatch('handleChangeLoaddingData', false)
          if(savetype == 1 || savetype == 2){
            let orderClone = Object.assign({}, this.orderTempItem[0])
            let sizecopy = []
            let correctcopy = []
            if(savetype == 1){
              sizecopy = orderClone.size_selected.map(item => {
                let sizeClone = Object.assign({}, {...item, orderId: 0})
                return sizeClone
              })
              correctcopy = orderClone.correct_selected.map(item => {
                let correctClone = Object.assign({}, {...item, order_id: 0})
                return correctClone
              })
            }
            this.$store.dispatch('handleUpdateOrderTemp',{
              id: 0,
              category_select: orderClone.category_select,
              product_id: null,
              style: orderClone.style,
              model: orderClone.model,
              item: orderClone.item,
              option_selected: orderClone.option_selected.map(item =>{
                let optionClone = Object.assign({}, {...item, orderId: 0})
                return optionClone
              }),
              necksize: orderClone.necksize.map(item =>{
                let neckSizeClone = Object.assign({}, {...item, orderId: 0})
                return neckSizeClone
              }),
              combineId: orderClone.combineId,
              quantity: 1,
              //size and correction
              size_selected: sizecopy,
              correct_selected: correctcopy,
              stock: 0
            })
            this.$store.dispatch('handleChangeOrder', 0)
            this.$store.dispatch('handleChangeStep', this.step - 1)
            this.$store.dispatch('handleRemoveSizeData')
            this.$store.dispatch('handleUpdateStockSelectedData', null)
          } else if(savetype == 3){
            window.location.href = this.main_path + "myshop/";
          }
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
      if(this.itemData.length && this.itemData.findIndex(item => item.orderId == orderId) !== -1){
        return this.itemData.filter(item => item.orderId == orderId)[0].design
      } else{
        return null
      }
    },
    getOrderItemSession: async function(){
      let ret = null
      let order_temp_zore = null
      if(this.orderTempItem.findIndex(item => item.id == 0) !== -1){
        order_temp_zore = this.orderTempItem.find(item => item.id == 0)
      }
      await this.axios.request({
        url: this.main_path + 'myshop/getordertemp/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          'order_temp_zore': order_temp_zore,
          'cartTempId': this.initialData.cartItemId
        }
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
        if(this.isStaff){
          this.doStuffAsync()
        }
      })
    },
    doStuffAsync: async function(){
      const setAsyncTimeout = (cb, timeout = 0) => new Promise(resolve => {
          setTimeout(() => {
              cb();
              resolve();
          }, timeout);
      });
      await setAsyncTimeout(() => {
        this.getOrderCost().then(response => {
          if(response){
            this.$store.dispatch('handleUpdateOrderCostTemp', response)
          }
        })
      }, 300)
    },
    optionPrice: function(orderId){
        let optionTotalprice = 0
        if(this.initialData.shop_kind == 2){
          this.optionSelectedData.filter(item => item.orderId == orderId).forEach(val => {
            optionTotalprice += Number(val.cost ? val.cost : 0);
          })
        }
        return optionTotalprice
    },
    getPriceOrder(orderId){
      let OrderTemp = this.orderTempItem.find(item => item.id == orderId)
      let kijiObjTempIndex = this.kijiData.findIndex(item => item.id == OrderTemp.product_id)
      let rank = 0

      if(kijiObjTempIndex !== -1){
        let styleIndex = this.kijiData[kijiObjTempIndex].style.findIndex(item => item.style_id == OrderTemp.style)
        if(styleIndex !== -1){
          rank = this.kijiData[kijiObjTempIndex].style[styleIndex].rank
        }
      }
      let combinePriceIndex = this.combinePriceData.findIndex(item => (
        item.model == OrderTemp.model && item.combineId == OrderTemp.combineId && item.rank == rank
      ))
      let combinePrice = 0
      if(combinePriceIndex !== -1){
        combinePrice = this.combinePriceData[combinePriceIndex].price
      }

      let optionPriceTemp = this.optionPrice(orderId)
      this.$store.dispatch('handleUpdatePriceOfOrder', {orderId: orderId, price: optionPriceTemp + combinePrice})
      return optionPriceTemp + combinePrice
    },
    getSumPrice: function(){
      let SumPrice = 0
      this.orderTempItem.forEach(element => {
        SumPrice += this.getPriceOrder(element.id)
      })
      return SumPrice
    },
    removeConfirmOrderTemp(orderId){
      this.orderRemoveCheck = orderId
    },
    removeOrderTempApi: async function(orderId){
      let ret = null
      await this.axios.request({
        url: this.main_path + 'myshop/removeordertemp/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          id: orderId
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
    removeOrderTemp: async function(orderId){
      this.confirmModalClose();
      this.$store.dispatch('handleChangeLoaddingData', true)
      if(orderId){
        this.$store.dispatch('handleRemoveOrderTemp', orderId)
        await this.removeOrderTempApi(orderId).then(response => {
          if(response){
            this.$store.dispatch('handleChangeLoaddingData', false)
          }
        })
      } else{
        this.$store.dispatch('handleRemoveOrderTemp', orderId)
        this.$store.dispatch('handleChangeLoaddingData', false)
      }
    },
    showSizeDetail: function(orderId){
      this.orderSizeActive = orderId
    },
    getSizeDataActiveByDesign(design_id, item_id){
      return this.sizeDetailActive.filter(item => item.design_id == design_id && item.item_id == item_id)
    },
    getSizeOfDesign(design_id, item_id){
      if(this.sizeSelectedActive.find(item => item.design == design_id && item.item == item_id)){
        return this.sizeSelectedActive.find(item => item.design == design_id && item.item == item_id).name
      } else{
        return ''
      }
    },
    getOrderCost: async function(){
      let ret = null
      await this.axios.request({
        url: this.main_path + 'myshop/getcostorderitem/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          orderitem: this.orderTempItem,
        }
      })
      .then(response => {
        ret = response.data.data
      })
      .catch(error => {
        this.$store.dispatch('handleChangeErrorCode', 8)
        console.log(error)
      })
      return ret
    },
    getCostTempOrder: function(){
      let cost = 0
      this.orderTempItem.forEach(element => {
        cost += element.cost_temp ? element.cost_temp : 0
      })
      return parseInt(cost)
    },
    goToTop(){
      window.location.href = this.main_path + "myshop/neworder/";
    },
    changeCorrectDetail(correctId){
      this.correction_selected_id = correctId
    },
    getCorrectionDetailDataFromApi: async function(correctId){
      this.loaddingDataCorrectDetail = true
      let ret = null
      if(correctId){
        await this.axios.request({
          url: this.main_path + 'myshop/getcorrectiondetail/',
          method: 'post',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: {
            'correction_id': correctId
          }
        })
        .then(response => {
          ret = response.data.data
          this.loaddingDataCorrectDetail = false
        })
        .catch(error => {
          this.loaddingDataCorrectDetail = false
          this.$store.dispatch('handleChangeErrorCode', 2)
          console.log(error)
        })
      }
      return ret
    },
    getCorrectionDetailData: async function(correctId){
      await this.getCorrectionDetailDataFromApi(correctId).then(response => {
        if(response){
          this.$store.dispatch('handleUpdateCorrectionDetailData', {correct_id: correctId, detail_data: response})
        }
      })
    },
    showCorrectionDetail: function(correct_id, design_id, item_id){
        this.correction_selected_id = correct_id
        this.correction_selected_design_id = design_id
        this.correction_selected_item_id = item_id
        let correctDetailIndexNow = this.correctSelectedDataActive.findIndex(item => (
          item.order_id == this.orderSizeActive
          && item.design_id == design_id
          && item.item_id == item_id
          && item.correct_id == correct_id
        ))
        if(correctDetailIndexNow !== -1){
          this.tempCorrectDetailId = this.correctSelectedDataActive[correctDetailIndexNow].correct_detail_id
          if(this.hasCorrectCustom){
            this.correctCustomValue = this.correctSelectedDataActive[correctDetailIndexNow].correct_custom_value ? this.correctSelectedDataActive[correctDetailIndexNow].correct_custom_value : ''
          }
        } else{
          this.tempCorrectDetailId = null
        }
    },
    closeCorrectionDetail : function(){
      if(!this.hasCorrectCustom){
          this.correction_selected_id = 0
        } else{
          return false
        }
    },
    correctCustomConfirm: function(){
        if(this.tempCorrectDetailId){
            let tempCorrectDetailIndex = this.correctDetailActive.findIndex(item => item.id == this.tempCorrectDetailId)
            let correctDetailIndexNow = this.correctSelectedDataActive.findIndex(item => (
              item.order_id == this.orderSizeActive
              && item.design_id == this.correction_selected_design_id
              && item.item_id == this.correction_selected_item_id
              && item.correct_id == this.correction_selected_id
            ))

            if(tempCorrectDetailIndex !== -1 && correctDetailIndexNow !== -1){
              let tempCorrectDetailItem = this.correctDetailActive[tempCorrectDetailIndex]
              let tempCorrectionItem = this.correctSelectedDataActive[correctDetailIndexNow]
              tempCorrectionItem['correct_detail_id'] = tempCorrectDetailItem.id
              tempCorrectionItem['correct_detail_name'] = tempCorrectDetailItem.text
              tempCorrectionItem['correct_detail_val'] = tempCorrectDetailItem.value
              tempCorrectionItem['code'] = tempCorrectDetailItem.code
              
              if(tempCorrectionItem['base_val'] == null) {
                tempCorrectionItem['correct_result'] = null
              } else{
                  if(tempCorrectDetailItem.value < 0){
                      tempCorrectionItem['correct_result'] = eval(tempCorrectionItem['base_val'] + tempCorrectDetailItem.value)
                  } else if(tempCorrectDetailItem.value > 0){
                    tempCorrectionItem['correct_result'] = eval(tempCorrectionItem['base_val'] + '+' + tempCorrectDetailItem.value)
                  } else{
                    tempCorrectionItem['correct_result'] = tempCorrectionItem['base_val']
                  }
              }
              if(tempCorrectDetailItem.text.includes('無し')){
                this.correction_selected_id = 0
              } else{
                if(this.correctCustomValue != '' && !isNaN(this.correctCustomValue) && this.correctCustomValue > 0){
                  console.log(this.correctCustomValue)
                  tempCorrectionItem['correct_custom_value'] = this.correctCustomValue 
                  this.$store.dispatch('handleUpdateCorrectSelectedData', [tempCorrectionItem])
                  this.correction_selected_id = 0
                  this.correctCustomError = false
                }
                else{
                  this.correctCustomError = true
                }
              }
            }
        }
    },
    //click to 補正 option
    selectCorrectDetail : function(correct_detail_id){
      if(this.tempCorrectDetailId && this.tempCorrectDetailId == correct_detail_id){
        this.closeCorrectionDetail()
      }
    },
    //パンツオーダーの「ダブルの場合の巾」についてですが、「裾始末」でダブルを選択した場合にのみ、
    checkDependOnParent: function(Option, orderId, combine_id, item_id, design_id){
      if(Option.depend_parent_id && Option.depend_option_id){
        let option_selected_index = this.optionSelectedData.findIndex(
          (item) => item.orderId == orderId &&
                    item.combine_id == combine_id &&
                    item.item_id == item_id &&
                    item.design_id == design_id &&
                    item.parent_id == Option.depend_parent_id &&
                    item.option_id == Option.depend_option_id
        )
        if(option_selected_index == -1){
          return false
        }
      }
      return true
    }
  },
  props: [],
  mounted(){
    this.deli_id = this.deliActive

    //save orderItemNow to arrOrderItem
    if(!this.initialData.orderCart){
      this.$store.dispatch('handleUpdateOrderTemp',{
        id: this.orderNowId,
        category_select: this.category_select,
        product_id: this.kijiActive,
        style: this.styleSelected,
        model: this.modelSelected,
        item: this.itemSelected,
        option_selected: this.optionSelectedData.filter(item => item.orderId == this.orderNowId),
        combineId: this.combineIdActive,
        quantity: 1,
        necksize: this.neckSelectedData.filter(item => item.orderId == this.orderNowId),
        //size and correction
        size_selected: this.sizeSelectedData.filter(item => item.orderId == this.orderNowId),
        correct_selected: this.correctSelectedData.filter(item => item.order_id == this.orderNowId),
        stock: this.stockSelectedData.find(item => item.orderId == this.orderNowId).stockVal
      })
    } else{
      //remove orderCart flag
      this.$store.dispatch('handleChangeIniData', {...this.initialData, orderCart: null})
    }

    //show modal loginerror
    if(this.initialData.customer_id){
      this.updateOrderItemList()
    }
  },
  watch: {
    deli_id: function(){
      this.$store.dispatch('handleChangeDeliActive', this.deli_id)
    },
    correction_selected_id: function(){
      if(this.correction_selected_id 
        && this.correctDetailData.findIndex(item => item.correct_id == this.correction_selected_id) == -1){
        this.getCorrectionDetailData(this.correction_selected_id)
      }
      this.correctCustomError = false
    },
    tempCorrectDetailId: function(newval, oldval){
      let tempCorrectDetailIndex = this.correctDetailActive.findIndex(item => item.id == this.tempCorrectDetailId)
      let correctDetailIndexNow = this.correctSelectedDataActive.findIndex(item => (
          item.order_id == this.orderSizeActive
          && item.design_id == this.correction_selected_design_id
          && item.item_id == this.correction_selected_item_id
          && item.correct_id == this.correction_selected_id
        ))
      if(tempCorrectDetailIndex !== -1 && correctDetailIndexNow !== -1){
        let tempCorrectDetailItem = this.correctDetailActive[tempCorrectDetailIndex]
        let tempCorrectionItem = this.correctSelectedDataActive[correctDetailIndexNow]
        tempCorrectionItem['correct_detail_id'] = tempCorrectDetailItem.id
        tempCorrectionItem['correct_detail_name'] = tempCorrectDetailItem.text
        tempCorrectionItem['correct_detail_val'] = tempCorrectDetailItem.value
        tempCorrectionItem['code'] = tempCorrectDetailItem.code
        
        if(tempCorrectionItem['base_val'] == null) {
          tempCorrectionItem['correct_result'] = null
        } else{
            if(tempCorrectDetailItem.value < 0){
                tempCorrectionItem['correct_result'] = eval(tempCorrectionItem['base_val'] + tempCorrectDetailItem.value)
            } else if(tempCorrectDetailItem.value > 0){
              tempCorrectionItem['correct_result'] = eval(tempCorrectionItem['base_val'] + '+' + tempCorrectDetailItem.value)
            } else{
              tempCorrectionItem['correct_result'] = tempCorrectionItem['base_val']
            }
        }

        if(!this.hasCorrectCustom){
          this.$store.dispatch('handleUpdateCorrectSelectedData', [tempCorrectionItem])
        } else{
          tempCorrectionItem['correct_custom_value'] = null
          if(tempCorrectDetailItem.text.includes('無し')){
            this.$store.dispatch('handleUpdateCorrectSelectedData', [tempCorrectionItem])
          }
        }
      }

      if(!this.hasCorrectCustom){
        if(tempCorrectDetailIndex != -1 && (oldval == null || this.correctDetailActive.findIndex(item => item.id == oldval) != -1)){
          this.correction_selected_id = 0
        }
      } else if(tempCorrectDetailIndex != -1){
        let tempCorrectDetailItem2 = this.correctDetailActive[tempCorrectDetailIndex]
        if(tempCorrectDetailItem2.text.includes('無し')){
          this.correction_selected_id = 0
        }
      }
    }
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
      'orderNowId',
      'orderTempItem',
      'category_select',
      'combinePriceData',
      'combineIdActive',
      'deliData',
      'sizeSelectedData',
      'correctSelectedData',
      'stockSelectedData',
      'correctDetailData',
      'neckSelectedData',
      'measureData'
    ]),
    sizeDetailActive: function(){
      if(this.orderSizeActive !== null){
        return this.correctSelectedData.filter(item => (
          item.order_id == this.orderSizeActive
        ))
      } else{
        return []
      }
    },
    sizeSelectedActive: function(){
      if(this.orderSizeActive !== null){
        return this.sizeSelectedData.filter(item => (
          item.orderId == this.orderSizeActive
        ))
      } else{
        return []
      }
    },
    isStaff: function(){
      if((this.initialData.customer_id + '').startsWith("000")){
        return true
      } else{
        return false
      }
    },
    correctDetailActive: function(){
      if(this.correction_selected_id 
      && this.correctDetailData.findIndex(item => item.correct_id == this.correction_selected_id) !== -1){
        return this.correctDetailData.find(item => item.correct_id == this.correction_selected_id).detail_data
      } else{
        return []
      }
    },
    correctSelectedDataActive(){
      return this.correctSelectedData.filter(item => (
        item.order_id == this.orderSizeActive
      ))
    },
    hasCorrectCustom: function(){
      if(this.correctCustomArr.indexOf(this.correction_selected_id) !== -1){
        return true
      } else{
        return false
      }
    },
    allOptionSelectedCheck: function(){
      let ret = []
      this.orderTempItem.forEach(OrderItem => {
        let designData = this.designData(OrderItem.id)

        designData.forEach(design => {
          let allParents = this.optionParentData.find(item => item.design_id == design.design_id && item.model == OrderItem.model)
          if(allParents){
            allParents.parentData.forEach(parent => {
              if(!parent.depend_parent_id) {
                let tempOptionSelectedIndex = this.optionSelectedData.findIndex(item2 => (
                  item2.orderId == OrderItem.id
                  && item2.item_id == design.item_id
                  && item2.design_id == design.design_id
                  && item2.parent_id == parent.parent_id
                ))
                if(tempOptionSelectedIndex == -1){
                  ret.push({design_id: design.design_id, design_name: design.design_label, item_id: design.item_id, parent_id: parent.parent_id, parent_name: parent.name})
                }
              } else{
                  let tempOptionDependSelectedIndex = this.optionSelectedData.findIndex(item2 => (
                    item2.orderId == OrderItem.id
                    && item2.item_id == design.item_id
                    && item2.design_id == design.design_id
                    && item2.parent_id == parent.depend_parent_id
                    && item2.option_id == parent.depend_option_id
                  ))
                  let tempOptionSelectedIndex = this.optionSelectedData.findIndex(item2 => (
                    item2.orderId == OrderItem.id
                    && item2.item_id == design.item_id
                    && item2.design_id == design.design_id
                    && item2.parent_id == parent.parent_id
                  ))
                  if(tempOptionDependSelectedIndex !== -1 && tempOptionSelectedIndex == -1){
                    ret.push({design_id: design.design_id, design_name: design.design_label, item_id: design.item_id, parent_id: parent.parent_id, parent_name: parent.name})
                  }
              }
            })
          }
        })
      })
      return ret
    }
  },

  updated: function () {
    // 補正なしを上下センターでスクロールにできないか確認
    this.$nextTick(function () {
        let measure_scroll = this.$refs.measure_scroll;
        let measure_scroll_ul = this.$refs.measure_scroll_ul;
        if(measure_scroll && measure_scroll_ul){
          measure_scroll_ul.style = ''
          let scroll_height = measure_scroll.offsetHeight
          let scroll_ul_height = measure_scroll_ul.offsetHeight
          if(scroll_height < scroll_ul_height){
            let noMeasureIndex = this.correctDetailActive.findIndex(item => (item.sort_no == 0))
            if(noMeasureIndex != -1){
              measure_scroll.scrollTop = (noMeasureIndex * 44 - measure_scroll.offsetHeight/2 + 22);
            }
          } else{
            measure_scroll_ul.style.position = 'absolute'
            measure_scroll_ul.style.width = "100%"
            measure_scroll_ul.style.top = "50%"
            measure_scroll_ul.style.transform = "translateY(-50%)"
          }
        }
      })
    }
};
</script>
