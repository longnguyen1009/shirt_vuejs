<template>
  <div class="container-selectmodel d-flex justify-content-between align-items-stretch">
    <div class="simu-model-left">
      <div class="simu-model-imgList">
        <carousel v-bind="settings" v-if="hasImg">
          <slide v-if="modelDetail.images.img1">
            <div class="simu-model-img"><img v-lazy="model_img_path + modelDetail.images.img1" alt="モデル画像" @error="imgError"></div>
          </slide>
          <slide v-if="modelDetail.images.sub_images1">
            <div class="simu-model-img"><img v-lazy="model_img_path + modelDetail.images.sub_images1" alt="モデル画像" @error="imgError"></div>
          </slide>
          <slide v-if="modelDetail.images.sub_images2">
            <div class="simu-model-img"><img v-lazy="model_img_path + modelDetail.images.sub_images2" alt="モデル画像" @error="imgError"></div>
          </slide>
        </carousel>
      </div>
    </div>
    <div class="simu-model-right d-flex flex-column justify-content-between">
      <div class="simu-model-rightTop">
        <h3 class="simu-model-styleName">{{modelDetail.style_name}}</h3>
        <h4 class="simu-model-modelTyle">{{modelDetail.name}}</h4>
        <p class="simu-model-description"><pre>{{modelDetail.detail}}</pre></p>
      </div>
      <div class="simu-model-itemSelect d-flex flex-column justify-content-end">
        <ul class="simu-model-itemList">
          <li v-for="(Items, id) in modelDetail.itemlist" :key="id"
            class="d-flex justify-content-start">
            <div class="simu-model-itemType" 
            v-if="(Items.items.length > 1) || (Items.item_type_id == 1) || (Items.item_type_id == 2)">
              <!-- <input type="checkbox" :id="'itemType-'+Items.item_type_id" 
              v-model="itemTypeCheck[Items.item_type_id]" 
              @click="typeClick(Items.item_type_id)"
              > -->
              <span>{{Items.item_type_name}}</span>
            </div>
            <div class="simu-model-item d-flex justify-content-between flex-grow-1">
              <div class="form-check form-check-inline" 
                v-for="item in Items.items" :key="item.id">
                <span class="fancy-input">
                  <input class="fancy-radio" hidden :id="'itemId-' + item.id" type="checkbox" :value="item.id" v-model="itemSelectedTemp" :disabled="canCheck(item.id)">
                  <label class="fancy-radio-label" :for="'itemId-' + item.id">
                      <span class="fancy-label--text">{{ ((Items.items.length == 1) && (Items.item_type_id != 1) && (Items.item_type_id != 2)) ? Items.item_type_name : item.name}}</span>
                      <span class="fancy-checkbox">
                          <span class="radiobutton-dot"></span>
                      </span>
                  </label>
                </span>
              </div>  
            </div>
          </li>
        </ul>
        <span class="simu-error-message" v-if="!checkErrorSelect">アイテム組み合わせが見つかりません。</span>
        <div class="simu-model-order d-flex justify-content-between align-items-end">
          <p class="simu-model-price"><span v-if="initialData.shop_kind == 2">参考価格 {{moneyTypeShow02(modelDetail.price, 'tax')}}</span></p>
          <div class="simu-nav-confirm d-flex justify-content-between">
            <button type="button" class="simu-common-btn btnSize01" @click="doBack">戻る</button>
            <button type="button" class="simu-common-btn btnSize01 gray" @click="doOrder" :disabled="!checkErrorSelect">決定</button>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>

//Carousel
import { Carousel, Slide } from 'vue-carousel'
import { mapGetters } from 'vuex'
import Mixins from '../mixin/mixin'


export default {
  name: "SelectModel",
  components: {Carousel,Slide},
  mixins: [Mixins],
  data() {
    return {
      modelDetail: {},
      settings: {
        "perPage": 1,
        "scrollPerPage": false,
        "paginationEnabled": false,
        "navigationEnabled": true,
        "loop": true,
        "navigationNextLabel": '<img src="/html/user_data/assets/img/common/icon_arraw_right_02.png" alt="">',
        "navigationPrevLabel": '<img src="/html/user_data/assets/img/common/icon_arraw_left_02.png" alt="">'
      },
      itemSelectedTemp: [],
      itemTypeCheck: [],
    };
  },
  methods: {
    doOrder(){
      let selectedData = this.itemSelectedTemp.filter(val => (val!==undefined) && (val!==null))
      if(selectedData.length > 0){
        if(this.checkErrorSelect){
          this.$store.dispatch('handleChangeItem', {style: this.modelTemp.styleId, model: this.modelTemp.modelId, item: selectedData})
          this.$store.dispatch('handleChangeStep', 2)
        } else{
          this.$store.dispatch('handleChangeErrorCode', 6)
        }
      } else{
        alert("アイテムを選択していません。")
        return false
      }
    },
    canCheck(item_id){
      if(this.itemSelectedTemp.filter((item) => item == item_id).length){
        return false
      }
      let selectedData = this.itemSelectedTemp.filter(val => (val!==undefined) && (val!==null))
      let temp_id_arr = [].concat(selectedData, item_id).map(i=>i.toString())
      for(const item_combine in this.modelDetail.combine){
          if(temp_id_arr.every(element => this.modelDetail.combine[item_combine].indexOf(element) > -1)){
            return false
          }
      }
      return true
    },
    doBack(){
      this.$store.dispatch('handleChangePage', 1)
    },
  },
  props: [],
  mounted() {
    this.itemSelectedTemp = this.itemSelected
    if(this.modelData.length && this.modelData.filter(item => item.modelId == this.modelTemp.modelId).length){
      this.modelDetail = this.modelData.filter(item => item.modelId == this.modelTemp.modelId)[0].data
    } else{
      this.$store.dispatch('handleChangeLoaddingData', true)
      this.axios.request({
        url: this.main_path + 'myshop/getmodel/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          modelid: this.modelTemp.modelId
        }
      })
      .then(response => {
        this.modelDetail = response.data.data
        this.$store.dispatch('handleChangeModelData', {modelId: this.modelTemp.modelId, data: response.data.data})
        this.$store.dispatch('handleChangeLoaddingData', false)     
      })
      .catch(error => {
        this.$store.dispatch('handleChangeLoaddingData', false)
        this.$store.dispatch('handleChangeErrorCode', 2)
        console.log(error)
      })
    }

    //Hide Cart button
    $('.header-cart-btn').css("display", "block");
  },
  computed: {
    ...mapGetters([
      'main_path',
      'model_img_path',
      'modelTemp',
      'modelData',
      'itemSelected',
      'initialData'
    ]),
    hasImg(){
      return Object.keys(this.modelDetail).length
    },
    checkErrorSelect(){
      let result = true
      let selectedData = this.itemSelectedTemp.filter(val => (val!==undefined) && (val!==null))
      if(selectedData.length > 0){
        let temp_id_arr = selectedData.map(i=>i.toString())
        const resultItems = this.modelDetail.combine.filter(item => (
          item.length == temp_id_arr.length
          && temp_id_arr.every(element => item.indexOf(element) > -1)
        ))
        result = resultItems.length ? true : false
      }
      return result
    }
  }
};
</script>

<style scoped>
	
</style>


