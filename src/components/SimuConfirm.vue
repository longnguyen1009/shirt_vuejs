<template>
  <div class="container-confirm d-flex flex-column justify-content-between">
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
                  v-for="Design in designData" :key="Design.design_id">
                    <h4 class="simu-confirm-design"><i class="far fa-square"></i>&nbsp;{{Design.design_label}}</h4>
                    <ul class="simu-confirm-detail-list d-flex justify-content-between">
                      <li class="simu-confirm-detail-item d-flex justify-content-between align-items-center"
                      v-for="OptionParent in getOptionParent(Design.design_id)" :key="OptionParent.parent_id">
                        <span class="simu-confirm-detail-label">{{OptionParent.name}}</span>
                        <span class="simu-confirm-detail-value">
                          {{getOptionValue(Design.combine_id, Design.item_id, Design.design_id, OptionParent.parent_id).name}}
                        </span>
                        <button type="button" class="simu-confirm-detail-change btn btn-outline-dark" 
                        @click="showDetail(Design.combine_id, Design.item_id, Design.design_id, OptionParent.parent_id)">
                        修正</button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="simu-confirm-detail-return d-flex align-items-center justify-content-center">
                  <button class="simu-common-btn" @click="doBack">シミュレーターに戻る</button>
                </div>
              </div>
            </div>
          </div>
          <div class="simu-confirm-payment d-flex justify-content-between">
              <div class="simu-confirm-payment-left d-flex flex-column justify-content-start">
                <span class="simu-confirm-label">受取方法</span>
                <div class="simu-confirm-payment-deli">
                  <input class="fancy-radio" hidden id="delivery1" name="deliMethod" type="radio" value="0"
                  v-model="deli_id">
                  <label class="fancy-radio-label" for="delivery1">
                      <span class="fancy-label--text">配送</span>
                      <span class="fancy-radiobutton">
                          <span class="radiobutton-dot"></span>
                      </span>
                  </label>
                  <input class="fancy-radio" hidden id="delivery2" name="deliMethod" type="radio" value="1"
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
          <li><a class="dropdown-item active" href="#">小名サイズで作成</a></li>
          <li><a class="dropdown-item" href="#">違うサイズで作成</a></li>
          <li><a class="dropdown-item" href="#">履歴川作成</a></li>
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
            v-if="optionDetailActive != 'kiji'"
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
                  <button class="simu-common-btn" @click="confirmModalClose">完了</button>
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
      optionConfirmActive: null,
      deli_id: null,
      orderConfirmCheck: null,
    }
  },
  methods: {
    showOrderDetail(event){
      $(event.target).parents('.simu-confirm-detail').find('.simu-confirm-detail-bottom').toggleClass('on')
      $(event.target).toggleClass('on')
    },
    getOptionParent(design_id){
      return this.optionParentData.filter(item => item.design_id == design_id)[0].parentData
    },
    getOptionValue(combine_id, item_id, design_id, parent_id){
      const optionIndex = this.optionSelectedData.findIndex(
        item => item.combine_id == combine_id
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
    showDetail(combine_id, item_id, design_id, parent_id){
        this.$store.dispatch('handleChangeDesign',{
          combine_id: combine_id,
          item_id: item_id,
          design_id: design_id
        })
        this.$store.dispatch('handleChangeOptionDetailActive', parent_id)
        this.optionConfirmActive = parent_id
    },
    closeDetailOption(){
      this.optionConfirmActive = null
    },
    doBack(){
      this.$store.dispatch('handleChangeStep', this.step - 1)
    },
    confirmModalShow(){
      this.orderConfirmCheck = 1
    },
    confirmModalClose(){
      this.orderConfirmCheck = null
    }
  },
  mounted(){
    this.deli_id = this.delivery_method
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
      'itemData',
      'optionParentData',
      'optionSelectedData',
      'delivery_method'
    ]),
    kijiActiveObj: function(){
      if(this.kijiData){
        return this.kijiData.filter(item => item.id == this.kijiActive)[0]
      } else{
        return {}
      }
    },
    designData: function(){
        return (this.itemData) ? this.itemData.design : null
    },
    itemCombineData: function(){
        return (this.itemData) ? this.itemData.items : null
    }
  }
};
</script>
