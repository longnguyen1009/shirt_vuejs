<template>
  <div class="container-selectstyle">
    <div class="simu-styleList" v-if="styleItems.length > 0">
      <VueSlickCarousel v-bind="settings">
        <div class="simu-styleItem" v-for="Item in styleItems" :key="Item.id">
          <div class="simu-styleItem-front">
            <img :src="style_img_path + Item.image" alt="" @click="styleClick(Item.id)">
            <div class="simu-styleItem-label" @click="styleClick(Item.id)">
              <h2 class="simu-styleItem-name">{{Item.name}}</h2>
              <h3 class="simu-styleItem-productname">{{Item.category}}&nbsp;&nbsp;￥{{Item.product_price}}</h3>
            </div>
            <button class="simu-styleItem-btn" @click="">MORE DETAILS</button>
          </div>
          <div class="simu-styleItem-detail" :class="{active: styleActive == Item.id}">
            <span class="closeBtn" @click="styleClose(Item.id)"><i class="fas fa-times"></i></span>
            <div class="simu-styleItem-detailTop">
              <h2 class="simu-styleItem-name">{{Item.name}}</h2>
              <h3 class="simu-styleItem-productname">{{Item.product_name}}&nbsp;&nbsp;￥{{Item.product_price}}</h3>
              <p class="simu-styleItem-description">{{Item.detail}}</p>
              <p class="simu-styleItem-completeTime">{{Item.detail}}～</p>
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
        :model_img_path="model_img_path"
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
      styleItems: [],
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
  props: ["style_img_path", "model_img_path"],
  mounted() {
    this.axios.get('http://54.248.46.255/myshop/getstyle/1')
    .then(response => {
      this.styleItems = response.data.data
    })
    .catch(error => console.log(error))
  },
};
</script>

<style scoped>
	
</style>


