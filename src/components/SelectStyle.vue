<template>
  <div class="container-selectstyle">
    <div class="simu-styleList" v-if="styleItems != null && styleItems.length > 0">
      <carousel v-bind="settings">
          <slide class="simu-styleItem" v-for="Item in styleItems" :key="Item.id"
          @slideclick="styleClick(Item.id)">
            <div class="simu-styleItem-front">
              <img :src="style_img_path + Item.image" alt="">
              <div class="simu-styleItem-label">
                <h2 class="simu-styleItem-name">{{Item.name}}</h2>
                <h3 class="simu-styleItem-productname">{{Item.category}}&nbsp;&nbsp;</h3>
              </div>
              <button class="simu-styleItem-btn">MORE DETAILS</button>
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
    <transition name="transitionRightToLeft">
      <SelectModel 
        v-if="page == 2"
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
      settings: {
        "perPage": 3.2,
        "scrollPerPage": false,
        "paginationEnabled": false,
        "navigationEnabled": true,

      },
      styleActive: 0
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
      this.$store.dispatch('handleChangePage', 2)
      this.$store.dispatch('handleChangeModelTemp', {styleId: this.styleActive, modelId: id})
    },
    getStyleFromAPI: async function(){
      let ret = null
      await this.axios.request({
        url: 'http://54.248.46.255/myshop/getstyle/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          category_select: this.initialData.category_select
        }
      })
      .then(response => {
        ret = response.data.data
      })
      .catch(error => {
        this.$store.dispatch('handleChangeErrorCode', 2)
        console.log(error)
      })
      return ret
    },
    setStyleData: async function(){
      await this.getStyleFromAPI().then(response => {
        if(response){
          console.log(response)
          this.styleItems = response
          this.$store.dispatch('handleChangeStyleData', this.styleItems)
        }
      })
      .catch(error => console.log(error))
    },
    //refresh data when back button click
    refreshData(){
      this.$store.dispatch('handleRefreshApp', null)
      return true
    },
    refreshStartData: async function(){
      await this.refreshData()
    }
  },
  props: [],
  mounted() {
    if(this.styleData){
      this.styleItems = this.styleData
    } else{
      $('.simu-style-loading').addClass("on")
      // this.setStyleData()
      // setTimeout(function() {
      //   $(".simu-style-loading").removeClass("on")
      // }, 300);
    }
    //refresh selected data
    this.refreshStartData()
  },
  watch: {
    hasCategorySelect: function(){
      if(this.hasCategorySelect){
        $('.simu-style-loading').addClass("on")
        this.setStyleData()
        setTimeout(function() {
          $(".simu-style-loading").removeClass("on")
        }, 300);
      }
    }
  },
  computed: {
    ...mapGetters([
      'style_img_path',
      'styleData',
      'page',
      'initialData'
    ]),
    hasCategorySelect: function(){
      return this.initialData.category_select
    }
  }
};
</script>

<style scoped>
</style>


