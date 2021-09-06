<template>
  <div class="container-selectstyle">
    <div class="simu-styleList" v-if="styleItems != null && styleItems.length > 0">
      <carousel v-bind="settings">
          <slide class="simu-styleItem" v-for="Item in styleItems" :key="Item.id">
            <div class="simu-styleItem-front">
              <img :src="style_img_path + Item.image" alt="" @click="styleClick(Item.id)" @touchstart="styleClick(Item.id)">
              <div class="simu-styleItem-label" @click="styleClick(Item.id)" @touchstart="styleClick(Item.id)">
                <h2 class="simu-styleItem-name">{{Item.name}}</h2>
                <h3 class="simu-styleItem-productname">{{Item.category}}&nbsp;&nbsp;</h3>
              </div>
              <button class="simu-styleItem-btn" @click="">MORE DETAILS</button>
            </div>
            <div class="simu-styleItem-detail" :class="{active: styleActive == Item.id}">
              <span class="closeBtn" @click="styleClose(Item.id)"><i class="fas fa-times"></i></span>
              <div class="simu-styleItem-detailTop">
                <h2 class="simu-styleItem-name">{{Item.name}}</h2>
                <p class="simu-styleItem-description">{{Item.detail}}</p>
              </div>
              <div class="simu-styleItem-model">
                <ul class="simu-styleItem-modelList">
                  <li v-for="styleModel in Item.model" :key="styleModel.id" @click="modelSelect(styleModel.id)">
                    {{styleModel.name}}
                  </li>
                </ul>
              </div>
            </div>
          </slide>
      </carousel>
    </div>
    <div class="simu-styleNone" v-if="styleItems != null && styleItems.length == 0">
      <p><i class="fas fa-exclamation-triangle"></i><span>スタイルはありませんでした。</span></p>
    </div>
    <div class="loadding_bl simu-style-loading">
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
    <transition name="simuModelPage">
      <SelectModel 
        v-if="modelActive != 0"
        :styleId="styleActive"
        :modelId="modelActive"
      />
    </transition>
  </div>
</template>

<script>

//vue-carousel
import { Carousel, Slide } from 'vue-carousel';
import SelectModel from './SelectModel.vue'
import { mapGetters } from 'vuex'


export default {
  name: "SelectStyle",
  components: { Carousel,Slide,SelectModel},
  data() {
    return {
      styleItems: null,
      // styleItems: [
      //   {
      //   "id": 9,
      //   "name": "FORMAL",
      //   "brand": 1,
      //   "category": "スーツ",
      //   "product_price": 58300,
      //   "image": "0825154005_6125e5c5446cd.jpg",
      //   "detail": null,
      //   "model": []
      //   },
      //   {
      //   "id": 6,
      //   "name": "CLASSIC",
      //   "brand": 1,
      //   "category": "スーツ",
      //   "product_price": 58300,
      //   "image": "0825154005_6125e5c5446cd.jpg",
      //   "detail": null,
      //   "model": [
      //   {
      //   "id": 6,
      //   "name": "REGULAR"
      //   }
      //   ]
      //   },
      //   {
      //   "id": 1,
      //   "name": "STANDARD",
      //   "brand": 1,
      //   "category": "スーツ",
      //   "product_price": 58300,
      //   "image": "0819022128_611d4198a9fd4.JPG",
      //   "detail": "スタンダードスーツ",
      //   "model": [
      //   {
      //   "id": 5,
      //   "name": "S-MODEL"
      //   }
      //   ]
      //   },
      //   {
      //   "id": 3,
      //   "name": "COMFORT",
      //   "brand": 1,
      //   "category": "スーツ",
      //   "product_price": 58300,
      //   "image": "0819031015_611d4d07dee13.jpg",
      //   "detail": "This is testing. This is testing. This is testing. This is testing. This is testing. This is testing.",
      //   "model": [
      //   {
      //   "id": 2,
      //   "name": "REDULER"
      //   }
      //   ]
      //   },
      //   {
      //   "id": 7,
      //   "name": "URPSP",
      //   "brand": 1,
      //   "category": "スーツ",
      //   "product_price": 58300,
      //   "image": "0825153836_6125e56c8215a.jpg",
      //   "detail": null,
      //   "model": []
      //   },
      //   {
      //   "id": 8,
      //   "name": "UNIFORM",
      //   "brand": 1,
      //   "category": "スーツ",
      //   "product_price": 58300,
      //   "image": "0825153915_6125e59368d3c.jpg",
      //   "detail": null,
      //   "model": []
      //   },
        
      // ],
      settings: {
        "perPage": 3.2,
        "scrollPerPage": false,
        "paginationEnabled": false,
        "navigationEnabled": true
      },
      styleActive: 0,
      modelActive: 0
    };
  },
  methods: {
    styleClick(id){
      this.styleActive = id
    },
    styleClose(id){
      this.styleActive = 0
    },
    modelSelect(id){
      this.modelActive = id
    },
    getStyleFromAPI: async function(){
      let ret = null
      await this.axios.get('http://54.248.46.255/myshop/getstyle/')
        .then(response => {
          ret = response.data.data
        })
        .catch(error => console.log(error))
      return ret
    },
    setStyleData: async function(){
      this.styleItems = await this.getStyleFromAPI()
      console.log(this.styleItems)
    }
  },
  props: [],
  mounted() {
    $('.simu-style-loading').addClass("on")
    this.setStyleData()
    setTimeout(function() {
      $(".simu-style-loading").removeClass("on")
    }, 300);
  },
  computed: {
    ...mapGetters(['style_img_path'])
  }
};
</script>

<style scoped>
</style>


