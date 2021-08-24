<template>
  <div class="container-selectstyle">
    <div class="simu-styleList">
      <VueSlickCarousel v-bind="settings">
        <div class="simu-styleItem" v-for="Item in styleItems" :key="Item.id">
          <div class="simu-styleItem-front">
            <img :src="img_path+'/style/'+Item.mainImg" alt="" @click="styleClick(Item.id)">
            <div class="simu-styleItem-label" @click="styleClick(Item.id)">
              <h2 class="simu-styleItem-name">{{Item.name}}</h2>
              <h3 class="simu-styleItem-productname">{{Item.product_name}}&nbsp;&nbsp;￥{{Item.product_price}}</h3>
            </div>
            <button class="simu-styleItem-btn" @click="">MORE DETAILS</button>
          </div>
          <div class="simu-styleItem-detail" :class="{active: styleActive == Item.id}">
            <span class="closeBtn" @click="styleClose(Item.id)"><i class="fas fa-times"></i></span>
            <div class="simu-styleItem-detailTop">
              <h2 class="simu-styleItem-name">{{Item.name}}</h2>
              <h3 class="simu-styleItem-productname">{{Item.product_name}}&nbsp;&nbsp;￥{{Item.product_price}}</h3>
              <p class="simu-styleItem-description">{{Item.description}}</p>
              <p class="simu-styleItem-completeTime">{{Item.completeTime}}～</p>
            </div>
            <div class="simu-styleItem-model">
              <ul class="simu-styleItem-modelList">
                <li v-for="styleModel in Item.model" :key="styleModel.id" @click="modelSelect(styleModel.id)">
                  {{styleModel.name}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </VueSlickCarousel>
    </div>
    <transition name="simuModelPage">
      <SelectModel 
      :img_path="img_path"
        v-if="modelActive != 0"
        :modelId="modelActive"
        @modelSelected="modelSelected($event)"
      />
    </transition>
  </div>
</template>

<script>

//vue-slick
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import SelectModel from './SelectModel.vue'

export default {
  name: "SelectStyle",
  components: { VueSlickCarousel, SelectModel},
  data() {
    return {
      styleItems: [
        {
          id: 1,
          name: 'CLASSIC',
          product_name: 'Suit',
          product_price: 58300,
          mainImg: 'style01.png',
          description: 'スポーティなスタイルにも対応する快適さと機能性を重視したオールラウンドモデル',
          completeTime: '3週間',
          model: [
            {id: 1, name: 'REGULAR MODEL 1'},
            {id: 2, name: 'REGULAR MODEL 2'},
            {id: 3, name: 'REGULAR MODEL 3'},
            {id: 4, name: 'REGULAR MODEL 4'},
          ]
        },
        {
          id: 2,
          name: 'STANDARD',
          product_name: 'Suit',
          product_price: 58300,
          mainImg: 'style02.png',
          description: 'スポーティなスタイルにも対応する快適さと機能性を重視したオールラウンドモデル',
          completeTime: '3週間',
          model: [
            {id: 5, name: 'REGULAR MODEL 5'},
            {id: 6, name: 'REGULAR MODEL 6'},
            {id: 7, name: 'REGULAR MODEL 7'},
            {id: 8, name: 'REGULAR MODEL 8'},
          ]
        },
        {
          id: 3,
          name: 'COMFORT',
          product_name: 'Suit',
          product_price: 58300,
          mainImg: 'style03.png',
          description: 'スポーティなスタイルにも対応する快適さと機能性を重視したオールラウンドモデル',
          completeTime: '3週間',
          model: [
            {id: 9, name: 'REGULAR MODEL 9'},
            {id: 10, name: 'REGULAR MODEL 10'},
            {id: 11, name: 'REGULAR MODEL 11'},
            {id: 12, name: 'REGULAR MODEL 12'},
          ]
        },
        {
          id: 4,
          name: 'CLASSIC',
          product_name: 'Suit',
          product_price: 58300,
          mainImg: 'style04.png',
          description: 'スポーティなスタイルにも対応する快適さと機能性を重視したオールラウンドモデル',
          completeTime: '3週間',
          model: [
            {id: 13, name: 'REGULAR MODEL 13'},
            {id: 14, name: 'REGULAR MODEL 14'},
            {id: 15, name: 'REGULAR MODEL 15'},
            {id: 16, name: 'REGULAR MODEL 16'},
          ]
        },
        {
          id: 5,
          name: 'CLASSIC',
          product_name: 'Suit',
          product_price: 58300,
          mainImg: 'style01.png',
          description: 'スポーティなスタイルにも対応する快適さと機能性を重視したオールラウンドモデル',
          completeTime: '3週間',
          model: [
            {id: 13, name: 'REGULAR MODEL 13'},
            {id: 14, name: 'REGULAR MODEL 14'},
            {id: 15, name: 'REGULAR MODEL 15'},
            {id: 16, name: 'REGULAR MODEL 16'},
          ]
        },
        {
          id: 6,
          name: 'CLASSIC',
          product_name: 'Suit',
          product_price: 58300,
          mainImg: 'style02.png',
          description: 'スポーティなスタイルにも対応する快適さと機能性を重視したオールラウンドモデル',
          completeTime: '3週間',
          model: [
            {id: 13, name: 'REGULAR MODEL 13'},
            {id: 14, name: 'REGULAR MODEL 14'},
            {id: 15, name: 'REGULAR MODEL 15'},
            {id: 16, name: 'REGULAR MODEL 16'},
          ]
        }
      ],
      settings: {
        "dots": false,
        "infinite": false,
        "slidesToShow": 3.2,
        "slidesToScroll": 1,
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
    // next() {
    //   this.$refs.slick.next()
    // },
    modelSelected(modeldata){
      this.$emit("changeModel", modeldata);
    }
  },
  props: ["img_path"],
  mounted() {
  },
};
</script>

<style scoped>
	
</style>


