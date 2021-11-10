<template>
  <div class="container-simuleft">
    <div class="simuleft-top">
      <h3 class="simuleft-top-style">{{styleDataObj.name}}</h3>
      <h4 class="simuleft-top-model">{{modelDataObj.name}}</h4>
      <p class="simuleft-top-itemcombine" v-if="itemCombineActive">{{itemCombineActive.name}}</p>
    </div>

    <div class="simuleft-main">
      <div style="display: none" class="kiji_preloader">
          <img v-bind:src="kiji_img_path + kiji_img" @load="kijiLoaded" alt="" kiji-id=""/>
      </div>
      <div class="simuleft-sample" :class="{hide: (correct_detail_id_now && hasCorrectImg)}">
            <img :src="design.sample_path" class="img_sample" v-on:error="loadImgError"/>
            <object
              ref="carousel_or_anything"
              type="image/svg+xml"
              v-bind:data="design.design_path"
              @load="svgLoaded02"
              class="svgModel"
              style="image-rendering: pixelated"
            ></object>
            <img :src="design.shadow_path" class="img_shadow" v-on:error="loadImgError"/>
      </div>
      <div class="correct_detail_img" v-if="correct_detail_id_now && hasCorrectImg">
        <img :src="correct_detail_img" alt="" v-on:error="loadCorrectImgError">
      </div>
      <div class="simuleft-options">
        <span v-for="(Option,id) in optionSaved" :key="id">
          <img v-if="Option.option_img || ShirtCheck()"
          :id="createIdForOption(Option)"
          :src="option_img_path + Option.option_img"
          :cate="Option.type"
          :option_id="Option.option_id" 
          class="img_option" v-on:error="loadImgError"
          @load="loadOption($event, Option.option_img, Option.type, Option.option_id)"/>
        </span>
        <span v-if="optionTemp">
         <img id="option_temp"
         :src="option_img_path + optionTemp.option_img" 
         class="img_option" 
         :cate="optionTemp.type"
         :option_id="optionTemp.option_id"
          @load="loadOption($event, optionTemp.option_img, optionTemp.type, optionTemp.option_id)"
         v-on:error="loadImgError">
        </span>
      </div>
      <!-- <div class="sumi-left-zoombtn">+ZOOM</div> -->
      <span class="sumi-left-downbtn" @click="doSaveTemp">
        <img :src="main_path + 'html/user_data/assets/img/common/icon_save.png'" alt="">
      </span>
      <button class="sumi-left-allbody simu-common-btn" v-if="SuitCheck()" @click="changeViewMode" :class="{gray : viewMode == 1}">全身ON/OFF</button>
      <div class="loadding_bl">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: "SimuLeft",
  data() {
    return {
      //全身ON/OFF
      viewMode: 0,
      firstLoaded: false,
      hasCorrectImg: false
    };
  },
  props: [],
  methods: {
    defaultLoaded() {
      $(".loadding_bl").addClass("on");
    },
    kijiLoaded() {
      var target = document.querySelector(".svgModel").contentDocument;
      var kiji = $(".kiji_preloader").find("img");
      $(target)
        .find("pattern[type='kiji']")
        // .not("#button")
        .find("image")
        .attr("xlink:href", kiji[0].currentSrc)
        // .attr("width", kiji[0].naturalWidth / 20)
        .attr("width", 74)
        .attr("height", 74);
      $(target)
        .find("pattern[type='kiji']")
        // .not("#button")
        .attr("width", 74)
        .attr("height", 74);
    },
    loadOption(event, img, cate, option_id){
      let target = document.querySelector(".svgModel").contentDocument;
      if(img){
        if(cate && $(target).find("pattern[cate='"+cate+"']").length){
          $(target)
          .find("pattern[cate='"+cate+"']")
          .find("image")
          .attr("xlink:href", $(event.target).attr('src'))
        }
      }
      if(cate && this.ShirtCheck()){
        if($(target).find('.'+cate).length){
          $(target).find('.'+cate).css('display', 'none')
          $(target).find("[data-name='"+ cate +"-"+ option_id+"']").css('display', 'block')
        }
      }
    },
    loadAllOption : async function(){
      //if have type: load img to svg
      var target = document.querySelector(".svgModel").contentDocument;
      await $(".img_option").each(function(index) {
        var cate = $(this).attr('cate')
        if(cate && $(target).find("pattern[cate='"+cate+"']").length){
          $(target)
          .find("pattern[cate='"+cate+"']")
          .find("image")
          .attr("xlink:href", $(this).attr('src'))
        }
      })
    },
    svgLoaded02() {
      this.kijiLoaded()
      this.loadAllOption().then(response => {
        setTimeout(function() {
          $(".loadding_bl").removeClass("on");
        }, 300)
      })
    },
    loadImgError: function(e) {
      var target = document.querySelector(".svgModel").contentDocument;
      var cate = $(e.target).attr('cate')
      if(cate && $(target).find("pattern[cate='"+cate+"']").length){
        $(target)
        .find("pattern[cate='"+cate+"']")
        .find("image")
        .attr("xlink:href", this.option_img_path + "notfounder.png")
      }
      e.target.src = this.option_img_path + "notfounder.png";
    },
    loadCorrectImgError: function(e){
      this.hasCorrectImg = false
    },
    createIdForOption(Option){
      return 'option-'+Option.combine_id+'-'+Option.item_id+'-'+Option.design_id+'-'+Option.parent_id
    },
    changeViewMode: function(){
      this.viewMode = this.viewMode ? 0 : (this.SuitCheck())
    },
    addToCart: async function(){
      this.$store.dispatch('handleChangeLoaddingData', true)
      let ret = null
      let stockTemp = 0
      let $KijiTemp = this.kijiData.find(item => item.id == this.kijiActive)
      if($KijiTemp.fabric_kind == 1){
        stockTemp = this.stockSelectedData.find(item => item.orderId == this.orderNowId).bichikusei_min
      } else{
        stockTemp = this.stockSelectedData.find(item => item.orderId == this.orderNowId).sensei_min
      }
      await this.axios.request({
        url: this.main_path + 'myshop/addproducttocart/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          'cartItemId': this.initialData.cartItemId,
          'product_id': this.kijiActive,
          'category_select': this.category_select,
          'style': this.styleSelected,
          'model': this.modelSelected,
          'item': this.itemSelected,
          'combineId': this.combineIdActive,
          'option_selected' : this.optionSelectedData.filter(item => item.orderId == this.orderNowId),
          'size_selected' : this.sizeSelectedData.filter(item => item.orderId == this.orderNowId),
          'necksize' : this.neckSelectedData.filter(item => item.orderId == this.orderNowId),
          'correct_selected' : this.correctSelectedData.filter(item => item.order_id == this.orderNowId),
          'quantity': 1,
          'stock': stockTemp
        }
      })
      .then(response => {
        ret = response.data.data
        this.$store.dispatch('handleChangeLoaddingData', false)
      })
      .catch(error => {
        this.$store.dispatch('handleChangeErrorCode', 2)
        this.$store.dispatch('handleChangeLoaddingData', false)
        console.log(error)
      })
      return ret
    },
    doSaveTemp: async function(){
      if(!this.kijiActive){
        alert('生地を選択してください。')
      } else if(!this.initialData.customer_id){
        alert('HC番号を設定ください。')
      } else if(this.kijiActive){
        await this.addToCart().then((response) => {
        if(response !== null){
            this.$store.dispatch('handleChangeErrorCode', 4)
            this.$store.dispatch('handleChangeCartItemId', response)
          }
        })
      }
    },

    SuitCheck: function(){
      let ret = 0 　//スーツじゃない
      if(this.designData && this.designData.findIndex(item => item.item_id == 2 || item.item_id == 4) !== -1){
        if(this.designData.findIndex(item => item.item_id == 2) !== -1){
          ret = 1 //ダブルスーツ
        } else{
          ret = 2 //シングルスーツ
        }
      }
      return ret
    },
    ShirtCheck: function(){
      return (this.designData && this.designData.findIndex(item => item.item_id == 8) !== -1) ? 1 : 0
    }
  },
  watch: {
    designActive: function(){
      if(this.firstLoaded && this.SuitCheck() != 0){
        this.viewMode = this.SuitCheck()
      } else{
        this.viewMode = 0
      }
    },
    designActive_path: function(){
      $(".loadding_bl").addClass("on");
    },
    correct_detail_id_now: function(){
        this.hasCorrectImg = this.correct_detail_id_now ? true : false
    }
  },
  mounted() {
    this.firstLoaded = true
  },
  computed: {
    ...mapGetters([
        'main_path',
        'kiji_img_path',
        'simu_img_path',
        'option_img_path',
        'correct_detail_img_path',
        'optionMode',
        'styleSelected',
        'modelSelected',
        'itemSelected',
        'designActive',
        'styleData',
        'modelData',
        'optionDetailActive',
        'optionSelectedData',
        'optionTemp',
        'kijiActive',
        'kijiData',
        'itemData',
        'initialData',
        'orderNowId',
        'combineIdActive',
        'category_select',
        'sizeSelectedData',
        'correctSelectedData',
        'stockSelectedData',
        'correct_detail_id_now',
        'neckSelectedData'
      ]),
    //design path
    design: function() {
      if(this.designActive_path){
        this.firstLoaded = false
        return {
          sample_path: this.simu_img_path + 'designs/' + this.designActive_path + "/sample.png",
          design_path: this.simu_img_path + 'designs/' + this.designActive_path + "/design.svg",
          shadow_path: this.simu_img_path + 'designs/' + this.designActive_path + "/shadow.png",
        }
      } else{
        return {}
      }
    },
    correct_detail_img: function(){
      if(this.correct_detail_id_now){
        return this.correct_detail_img_path + this.correct_detail_id_now + '.png'
      } else{
        return ''
      }
    },
    //kiji path
    kiji_img: function(){
      if(this.kijiActive && this.kijiData.length && this.kijiData.findIndex(item => item.id == this.kijiActive) !== -1){
        let kijiTemp = this.kijiData.find(item => item.id == this.kijiActive)
        return kijiTemp.img_simu ? kijiTemp.img_simu : '0730151143_6103981fcfa43.jpeg'
      } else{
        return "0730151143_6103981fcfa43.jpeg"
      }
    },
    designActive_path: function(){
      if(this.viewMode && this.SuitCheck()){
        return 'all/' + this.viewMode
      } else{
        return (this.designData && this.designActive.design_id) ? this.designActive.design_id : null
      }
    },
    itemCombineActive: function(){
      if(this.itemDataActive){
        // let itemObjectActive = this.itemDataActive.items.filter((item) => item.id == this.designActive.combine_id)[0]
        return this.itemDataActive.items
      } else{
        return null
      }
    },
    styleDataObj: function(){
      if(this.styleData && this.styleData.findIndex(item => item.id == this.styleSelected) !== -1){
        return this.styleData[this.styleData.findIndex(item => item.id == this.styleSelected)]
      } else{
        return {}
      }
    },
    modelDataObj: function(){
      if(this.modelData.filter(item => item.modelId == this.modelSelected).length){
        return this.modelData.filter(item => item.modelId == this.modelSelected)[0].data
      }
      else{
        return {}
      }
    },
    optionSaved: function(){
      if($("#option_temp").length > 0 && !this.optionTemp){
        var target = document.querySelector(".svgModel").contentDocument;
        $(target).find("pattern[cate='"+$("#option_temp").attr('cate')+"']")
        .find('image').attr("xlink:href", this.option_img_path + "notfounder.png")
      }
      var optionSavedList = this.optionSelectedData.filter(
        (item) => (item.combine_id == this.designActive.combine_id && 
            item.item_id == this.designActive.item_id &&
            item.design_id == this.designActive.design_id)
      )
      if(this.optionTemp){
        var existOptionSelected = optionSavedList.findIndex(
          (item) => (
            item.parent_id == this.optionDetailActive
          ))
        if(existOptionSelected !== -1){
          optionSavedList.splice(existOptionSelected, 1)
        } 
      }
      return optionSavedList
    },
    itemDataActive(){
      if(this.itemData.length && this.itemData.filter(item => item.orderId == this.orderNowId) != -1){
        return this.itemData.find(item => item.orderId == this.orderNowId)
      } else{
        return null
      }
    },
    designData: function(){
      if(this.itemDataActive){
        return this.itemDataActive.design
      } else{
        return null
      }
    },
  },
};
</script>
