<template>
  <div class="container-selectmodel d-flex justify-content-between">
    <div class="simu-model-left">
      <div class="simu-model-intro">
        <h3>Sihlouette:</h3>
        <p>着丈を短くすることで、軽快な印象を強調</p>
      </div>
      <div class="simu-model-imgList">
        <VueSlickCarousel v-bind="settings">
            <div class="simu-model-img"><img :src="img_path + 'model/' + modelDetail.modelImg.img1" alt=""></div>
            <div class="simu-model-img"><img :src="img_path + 'model/' + modelDetail.modelImg.img2" alt=""></div>
            <div class="simu-model-img"><img :src="img_path + 'model/' + modelDetail.modelImg.img3" alt=""></div>
        </VueSlickCarousel>
      </div>
    </div>
    <div class="simu-model-right d-flex flex-column justify-content-between">
      <div class="simu-model-rightTop">
        <h3 class="simu-model-styleName">CLASSIC</h3>
        <h4 class="simu-model-modelTyle">{{modelDetail.type}}</h4>
        <p class="simu-model-description">{{modelDetail.description}}</p>
      </div>
      <div class="simu-model-itemSelect d-flex flex-column justify-content-end">
        <ul class="simu-model-itemList">
          <li v-for="Items in modelDetail.modelItemList" :key="Items.itemTypeId"
            class="d-flex justify-content-start">
            <div class="simu-model-itemType">
              <input type="checkbox" :id="'itemType-'+Items.itemTypeId" value="option1">
              <label class="form-check-label" :for="'itemType-'+Items.itemTypeId">{{Items.itemType}}</label>
            </div>
            <div class="simu-model-item d-flex justify-content-around flex-grow-1">
              <div class="form-check form-check-inline" 
                v-for="item in Items.itemList" :key="item.id">
                <input type="checkbox" :id="'itemId-' + item.id" value="option1">
                <label class="form-check-label" :for="'itemId-' + item.id">{{item.name}}</label>
              </div>  
            </div>
          </li>
        </ul>
        <div class="simu-model-order d-flex justify-content-between align-items-end">
          <p class="simu-model-price">￥00,000</p>
          <button type="button" class="btn btn-secondary"
          @click="doOrder">ORDER</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

//vue-slick
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: "SelectModel",
  components: {VueSlickCarousel},
  data() {
    return {
      modelDetail: {
        id: 1,
        type: 'REGULAR MODEL',
        modelImg: {img1: 'model01.png', img2: 'model02.png', img3: 'model03.png'},
        description: "オーセンティックで洗練されたフォルムが特徴の「REGULAR」と、ソフトで軽量な作りとモダンなフォルムが特徴の「S-MODEL」をご用意しています。",
        modelItemList: [
          {
            itemTypeId: 1,
            itemType: 'スーツ',
            itemList: [
              {id: 1, name: 'スングル'},
              {id: 2, name: 'ダブル'}
            ]
          },
          {
            itemTypeId: 2,
            itemType: 'ジャケット',
            itemList: [
              {id: 3, name: 'スングル'},
              {id: 4, name: 'ダブル'}
            ]
          },
          {
            itemTypeId: 3,
            itemType: 'トラウザーズ',
            itemList: []
          },
          {
            itemTypeId: 4,
            itemType: 'ベスト',
            itemList: []
          }
        ]
      },
      settings: {
        "dots": false,
        "arrows" : true,
        "infinite": true,
        "slidesToShow": 1,
        "slidesToScroll": 1,
      },
    };
  },
  methods: {
    doOrder(){
      console.log("aaaaaa");
      const modelData = {id: this.modelId}
      this.$emit("modelSelected", modelData);
    }
  },
  props: ["img_path", "modelId"],
  mounted() {

  },
};
</script>

<style scoped>
	
</style>


