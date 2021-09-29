<template>
  <div class="container-selectmodel d-flex justify-content-between align-items-stretch">
    <div class="simu-model-left">
      <div class="simu-model-intro">
        <h3>Sihlouette:</h3>
        <p>着丈を短くすることで、軽快な印象を強調</p>
      </div>
      <div class="simu-model-imgList">
        <carousel v-bind="settings" v-if="hasImg">
          <slide>
            <div class="simu-model-img"><img :src="model_img_path + modelDetail.images.img1" alt=""></div>
          </slide>
          <slide>
            <div class="simu-model-img"><img :src="model_img_path + modelDetail.images.sub_images1" alt=""></div>
          </slide>
          <slide>
            <div class="simu-model-img"><img :src="model_img_path + modelDetail.images.sub_images2" alt=""></div>
          </slide>
        </carousel>
      </div>
    </div>
    <div class="simu-model-right d-flex flex-column justify-content-between">
      <div class="simu-model-rightTop">
        <h3 class="simu-model-styleName">{{modelDetail.style_name}}</h3>
        <h4 class="simu-model-modelTyle">{{modelDetail.name}}</h4>
        <p class="simu-model-description">{{modelDetail.detail}}</p>
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
                <label class="toggle">
                  <input type="checkbox" :id="'itemId-' + item.id" class="toggle__input"
                    v-model="itemSelectedTemp" 
                    :value="item.id"
                    :disabled="canCheck(item.id)"
                  >
                  <span class="toggle__label">
                    <span class="toggle__text">
                      {{ ((Items.items.length == 1) && (Items.item_type_id != 1) && (Items.item_type_id != 2)) ? Items.item_type_name : item.name}}
                    </span>
                  </span>
                </label>
              </div>  
            </div>
          </li>
        </ul>
        <div class="simu-model-order d-flex justify-content-between align-items-end">
          <p class="simu-model-price">￥{{modelDetail.price}}</p>
          <button type="button" class="simu-common-btn" @click="doOrder">ORDER</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

//Carousel
import { Carousel, Slide } from 'vue-carousel';
import { mapGetters } from 'vuex';

export default {
  name: "SelectModel",
  components: {Carousel,Slide},
  data() {
    return {
      modelDetail: {},
      settings: {
        "perPage": 1,
        "scrollPerPage": false,
        "paginationEnabled": false,
        "navigationEnabled": true,
        "loop": true
      },
      itemSelectedTemp: [],
      itemTypeCheck: [],
    };
  },
  methods: {
    doOrder(){
      var selectedData = this.itemSelectedTemp.filter(val => (val!==undefined) && (val!==null))
      if(selectedData.length > 0){
        this.$store.dispatch('handleChangeItem', {style: this.modelTemp.styleId, model: this.modelTemp.modelId, item: selectedData})
        this.$store.dispatch('handleChangeStep', 2)
      } else{
        alert("アイテムを選択していません。")
        return false
      }
    },
    canCheck(item_id){
      if(this.itemSelectedTemp.filter((item) => item == item_id).length){
        return false
      }
      var selectedData = this.itemSelectedTemp.filter(val => (val!==undefined) && (val!==null))
      var temp_id_arr = [].concat(selectedData, item_id).map(i=>i.toString())
      for(const item_combine in this.modelDetail.combine){
          if(temp_id_arr.every(element => this.modelDetail.combine[item_combine].indexOf(element) > -1)){
            return false
          }
      }
      return true
    }
  },
  props: [],
  mounted() {
    this.itemSelectedTemp = this.itemSelected
    if(this.modelData.length && this.modelData.filter(item => item.modelId == this.modelTemp.modelId).length){
      this.modelDetail = this.modelData.filter(item => item.modelId == this.modelTemp.modelId)[0].data
    } else{
      this.$store.dispatch('handleChangeLoaddingData', true)
      this.axios.request({
        url: 'http://54.248.46.255/myshop/getmodel/',
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
  },
  computed: {
    ...mapGetters([
      'model_img_path',
      'modelTemp',
      'modelData',
      'itemSelected',
    ]),
    hasImg(){
      return Object.keys(this.modelDetail).length
    }
  }
};
</script>

<style scoped>
	
</style>


