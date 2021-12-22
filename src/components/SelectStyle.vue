<template>
  <div class="container-selectstyle">
    <div class="simu-styleList" v-if="styleData != null && styleData.length > 0">
      <carousel v-bind="settings" @page-change="pageChangeHandle">
          <slide class="simu-styleItem" :class="{disable: Item.disable}" v-for="Item in styleData" :key="Item.id"
          @slideclick="styleClick(Item.id, Item.disable)">
            <div class="simu-styleItem-front">
              <img v-lazy="style_img_path + Item.image" alt="" @error="imgError">
              <div class="simu-styleItem-label">
                <h2 class="simu-styleItem-name">{{Item.name}}</h2>
                <h3 class="simu-styleItem-productname">{{moneyTypeShow02(Item.product_price * (1 + initialData.tax_rate/100), 'tax')}}</h3>
              </div>
              <!-- <button class="simu-styleItem-btn">MORE DETAILS</button> -->
            </div>
            <div class="simu-styleItem-detail" :class="{active: styleActive == Item.id}">
              <span class="closeBtn" @click="styleClose(Item.id)"><img :src="main_path + 'html/user_data/assets/img/common/header_close_white.png'" alt=""></span>
              <div class="simu-styleItem-detailTop">
                <h2 class="simu-styleItem-name">{{Item.name}}</h2>
                <p class="simu-styleItem-description"><pre>{{Item.detail}}</pre></p>
              </div>
              <div class="simu-styleItem-model">
                <ul class="simu-styleItem-modelList">
                  <li v-for="styleModel in Item.model" :key="styleModel.id" @click="modelSelect(styleModel.id)" class="hover">
                    {{styleModel.name}}
                  </li>
                </ul>
              </div>
            </div>
          </slide>
      </carousel>
    </div>
    <div class="simu-styleNone" v-if="styleData != null && styleData.length == 0">
      <p><i class="fas fa-exclamation-triangle"></i><span>スタイルはありませんでした。</span></p>
    </div>
    <div class="loadding_bl simu-style-loading">
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
    <transition name="transitionRightToLeft">
      <SelectModel 
        v-if="page == 2"
      />
    </transition>
  </div>
</template>

<script>

//vue-carousel
import { Carousel, Slide } from 'vue-carousel'
import SelectModel from './SelectModel.vue'
import { mapGetters } from 'vuex'
import Mixins from '../mixin/mixin'


export default {
  name: "SelectStyle",
  components: { Carousel,Slide,SelectModel},
  mixins: [Mixins],
  data() {
    return {
      settings: {
        "perPageCustom": [[320, 1],[640, 2.2],[768, 3.2]],
        "scrollPerPage": false,
        "paginationEnabled": false,
        "navigationEnabled": true,
        "navigationNextLabel": '<img src="/html/user_data/assets/img/common/icon_arraw_right_02.png" alt="">'
      },
      styleActive: 0
    };
  },
  methods: {
    styleClick(id, disable){
      if(!disable){
        this.styleActive = id
      } else{
        return false
      }
    },
    styleClose(id){
      this.styleActive = 0
    },
    modelSelect(id){
      this.$store.dispatch('handleChangePage', 2)
      this.$store.dispatch('handleChangeModelTemp', {styleId: this.styleActive, modelId: id})
    },
    
    //refresh data when back button click
    refreshData(){
      this.$store.dispatch('handleRefreshApp', null)
      return true
    },
    refreshStartData: async function(){
      await this.refreshData()
    },
    pageChangeHandle(page_num) {
      if(page_num + 3 == this.styleData.length){
        $('.VueCarousel-navigation').css('display', 'none')
      } else{
        $('.VueCarousel-navigation').css('display', 'block')
      }
    }
  },
  props: [],
  mounted() {
    if(this.styleData.length == 0){
      $('.simu-style-loading').addClass("on")
    }
    this.refreshStartData()

    //Hide Cart button
    $('.header-cart-btn').css("display", "block");
  },
  watch: {

  },
  computed: {
    ...mapGetters([
      'main_path',
      'style_img_path',
      'styleData',
      'page',
      'initialData'
    ])
  }
};

</script>



<style scoped>
</style>


