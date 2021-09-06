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
            <div class="simu-model-itemType">
              <input type="checkbox" :id="'itemType-'+Items.item_type_id" v-model="itemTypeCheck[Items.item_type_id]" @click="typeClick(Items.item_type_id)">
              <label :for="'itemType-'+Items.item_type_id">{{Items.item_type_name}}</label>
            </div>
            <div class="simu-model-item d-flex justify-content-between flex-grow-1">
              <div class="form-check form-check-inline" 
                v-for="item in Items.items" :key="item.id"
                :class="{item_select_off: Items.items.length == 1}">
                <input type="radio" :id="'itemId-' + item.id" v-model="itemSelected[Items.item_type_id]" :value="item.id" @click="itemClick(Items.item_type_id)">
                <label class="form-check-label" :for="'itemId-' + item.id">{{item.name}}</label>
              </div>  
            </div>
          </li>
        </ul>
        <div class="simu-model-order d-flex justify-content-between align-items-end">
          <p class="simu-model-price">￥{{modelDetail.price}}</p>
          <button type="button" class="btn btn-secondary"
          @click="doOrder">ORDER</button>
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
      itemSelected: [],
      itemTypeCheck: [],
    };
  },
  methods: {
    doOrder(){
      var selectedData = this.itemSelected.filter(val => (val!==undefined) && (val!==null));
      if(selectedData.length > 0){
        this.$store.dispatch('handleChangeItem', {style: this.styleId, model: this.modelId, item: selectedData})
        this.$store.dispatch('handleChangeStep', 2)
      } else{
        alert("アイテムを選択していません。")
        return false
      }
    },
    typeClick(typeid){
      if(this.itemTypeCheck[typeid]){
        this.itemSelected[typeid] = null
      } else{
        if(!this.itemSelected[typeid]){
          this.itemSelected[typeid] = this.modelDetail.itemlist[typeid].items[0].id
        }
      }
    },
    itemClick(typeid){
      if(this.itemTypeCheck[typeid]){
        return false
      } else{
        this.itemTypeCheck[typeid] = true
      }
    }
  },
  props: ["styleId", "modelId"],
  mounted() {
     this.axios.get('http://54.248.46.255/myshop/getmodel/'+this.modelId)
      .then(response => {
        this.modelDetail = response.data.data
        console.log(this.modelDetail)
        // this.modelDetail.itemlist.map(function(value, key) {
        //   this.itemSelected.push({"type": value.item_type_id, "itemid": ""})
        // })
      })
      .catch(error => console.log(error))
  },
  computed: {
    ...mapGetters(['model_img_path']),
    hasImg(){
      return Object.keys(this.modelDetail).length
    }
  }
};
</script>

<style scoped>
	
</style>


