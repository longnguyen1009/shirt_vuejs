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
                    <h4 class="simu-confirm-design">{{Design.design_label}}</h4>
                    <ul class="simu-confirm-detail-list d-flex justify-content-between">
                      <li class="simu-confirm-detail-item d-flex justify-content-between align-items-center"
                      v-for="OptionParent in getOptionParent(Design.design_id)" :key="OptionParent.parent_id">
                        <span class="simu-confirm-detail-label">{{OptionParent.name}}</span>
                        <span class="simu-confirm-detail-value">
                          {{getOptionValue(Design.combine_id, Design.item_id, Design.design_id, OptionParent.parent_id).name}}
                        </span>
                        <button type="button" class="simu-confirm-detail-change btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">修正</button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="simu-confirm-detail-return d-flex align-items-center justify-content-center">
                  <button class="simu-common-btn">シミュレーターに戻る</button>
                </div>
              </div>
            </div>
          </div>
          <div class="simu-confirm-payment d-flex justify-content-between">
              <div class="simu-confirm-payment-left d-flex flex-column justify-content-start">
                <span class="simu-confirm-label">受取方法</span>
                <div class="simu-confirm-payment-deli">
                  <input class="fancy-radio" hidden id="delivery1" checked name="deliMethod" type="radio">
                  <label class="fancy-radio-label" for="delivery1">
                      <span class="fancy-label--text">配送</span>
                      <span class="fancy-radiobutton">
                          <span class="radiobutton-dot"></span>
                      </span>
                  </label>
                  <input class="fancy-radio" hidden id="delivery2" checked name="deliMethod" type="radio">
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
      <button id="simu-confirm-btn" class="simu-common-btn">オーダー完了</button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "SimuConfirm",
  data() {
    return {

    }
  },
  methods: {
    showOrderDetail(event){
      $(event.target).parents('.simu-confirm-detail').find('.simu-confirm-detail-bottom').toggleClass('on')
      $(event.target).toggleClass('on')
    },
    getOptionParent(design_id){
      console.log(this.optionParentData.filter(item => item.design_id == design_id)[0])
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
    }
  },
  props: [],
  computed: {
    ...mapGetters([
      'kiji_img_path',
      'kijiData',
      'kijiActive',
      'itemData',
      'optionParentData',
      'optionSelectedData'
    ]),
    kijiActiveObj: function(){
      return this.kijiData.filter(item => item.id == this.kijiActive)[0]
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
