<template>
  <div class="container-selectmodel d-flex justify-content-between align-items-stretch">
    <div class="simu-model-left">
      <div class="simu-model-intro">
        <h3>Sihlouette:</h3>
        <p>着丈を短くすることで、軽快な印象を強調</p>
      </div>
      <div class="simu-model-imgList">
        <VueSlickCarousel v-bind="settings">
            <div class="simu-model-img"><img :src="model_img_path + modelDetail.images.img1" alt=""></div>
            <div class="simu-model-img"><img :src="model_img_path + modelDetail.images.sub_images1" alt=""></div>
            <div class="simu-model-img"><img :src="model_img_path + modelDetail.images.sub_images2" alt=""></div>
        </VueSlickCarousel>
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
              <input type="checkbox" :id="'itemType-'+Items.item_type_id" value="option1">
              <label class="form-check-label" :for="'itemType-'+Items.item_type_id">{{Items.item_type_name}}</label>
            </div>
            <div class="simu-model-item d-flex justify-content-around flex-grow-1">
              <div class="form-check form-check-inline" 
                v-for="item in Items.items" :key="item.id">
                <input type="checkbox" :id="'itemId-' + item.id" value="option1">
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

//vue-slick
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: "SelectModel",
  components: {VueSlickCarousel},
  data() {
    return {
      modelDetail: [],
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
      const modelData = {id: this.modelId}
      this.$emit("modelSelected", modelData);
    }
  },
  props: ["model_img_path", "modelId"],
  mounted() {
     this.axios.get('http://54.248.46.255/myshop/getmodel/'+this.modelId)
      .then(response => {
        this.modelDetail = response.data.data
        console.log(this.modelDetail.images.img1)
      })
      .catch(error => console.log(error))
  },
};
</script>

<style scoped>
	
</style>


