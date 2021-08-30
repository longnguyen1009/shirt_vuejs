<template>
  <div class="container-selectmodel d-flex justify-content-between align-items-stretch">
    <div class="simu-model-left">
      <div class="simu-model-intro">
        <h3>Sihlouette:</h3>
        <p>着丈を短くすることで、軽快な印象を強調</p>
      </div>
      <div class="simu-model-imgList">
        <carousel v-bind="settings">
          <slide v-if="modelDetail.images.img1">
            <div class="simu-model-img"><img :src="model_img_path + modelDetail.images.img1" alt=""></div>
          </slide>
          <slide v-if="modelDetail.images.sub_images1">
            <div class="simu-model-img"><img :src="model_img_path + modelDetail.images.sub_images1" alt=""></div>
          </slide>
          <slide v-if="modelDetail.images.sub_images2">
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
            <div class="simu-model-itemType" v-if="Items.items.length > 1">
              <input type="checkbox" :id="'itemType-'+Items.item_type_id">
              <label class="form-check-label" :for="'itemType-'+Items.item_type_id">{{Items.item_type_name}}</label>
            </div>
            <div class="simu-model-item d-flex justify-content-between flex-grow-1">
              <div class="form-check form-check-inline" 
                v-for="item in Items.items" :key="item.id">
                <input type="radio" :id="'itemId-' + item.id" v-model="itemSelected[Items.item_type_id]" :value="item.id">
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

export default {
  name: "SelectModel",
  components: {Carousel,Slide},
  data() {
    return {
      modelDetail: [],
      // modelDetail: {
      //   "id": 6,
      //   "name": "REGULAR",
      //   "price": 60000,
      //   "style_id": 6,
      //   "style_name": "CLASSIC",
      //   "images": {
      //   "img1": "0825151657_6125e059d9a0e.jpg",
      //   "sub_images1": "0825151704_6125e0603229e.jpg",
      //   "sub_images2": "0825151713_6125e069579d6.jpg"
      //   },
      //   "detail": "オーセンティックで洗練されたフォルムが特徴のREGULARモデル。",
      //   "itemlist": {
      //   "1": {
      //   "item_type_id": 1,
      //   "item_type_name": "Suit",
      //   "items": [
      //     {
      //     "id": 4,
      //     "name": "スーツ（シングル）"
      //     }
      //   ]
      //   },
      //     "2": {
      //     "item_type_id": 2,
      //     "item_type_name": "Jacket",
      //     "items": [
      //     {
      //     "id": 1,
      //     "name": "ジャケット（シングル）"
      //     }
      //     ]
      //   },
      //   "4": {
      //   "item_type_id": 4,
      //   "item_type_name": "Pants",
      //   "items": [
      //   {
      //   "id": 3,
      //   "name": "パンツ"
      //   }
      //   ]
      //   },
      //   "5": {
      //   "item_type_id": 5,
      //   "item_type_name": "Vest",
      //   "items": [
      //   {
      //   "id": 5,
      //   "name": "ヴェスト"
      //   }
      //   ]
      //   }
      //   }
      // },
      settings: {
        "perPage": 1,
        "scrollPerPage": false,
        "paginationEnabled": false,
        "navigationEnabled": true,
        "loop": true
      },
      itemSelected: []
    };
  },
  methods: {
    doOrder(){
      var selectedData = this.itemSelected.filter(val => (val!==undefined) && (val!==null));
      if(selectedData.length > 0){
        this.$emit("item-selected", selectedData)
      } else{
        alert("アイテムを選択していません。")
        return false
      }
    }
  },
  props: ["model_img_path", "modelId"],
  mounted() {
     this.axios.get('http://54.248.46.255/myshop/getmodel/'+this.modelId)
      .then(response => {
        this.modelDetail = response.data.data
        // this.modelDetail.itemlist.map(function(value, key) {
        //   this.itemSelected.push({"type": value.item_type_id, "itemid": ""})
        // })
      })
      .catch(error => console.log(error))
  },
};
</script>

<style scoped>
	
</style>


