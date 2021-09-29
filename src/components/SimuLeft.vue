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
      <div class="simuleft-sample">
            <img :src="design.sample_path" class="img_sample" />
            <object
              ref="carousel_or_anything"
              type="image/svg+xml"
              v-bind:data="design.design_path"
              @load="svgLoaded02"
              class="svgModel"
              style="image-rendering: pixelated"
            ></object>
            <img :src="design.shadow_path" class="img_shadow" />
      </div>
      <div class="simuleft-options">
        <span v-for="(Option,id) in optionSaved" :key="id">
          <img v-if="Option.option_img"
          :id="createIdForOption(Option)"
          :src="option_img_path + Option.option_img"
          :cate="Option.type" 
          class="img_option" v-on:error="loadImgError"
          @load="loadOption($event, Option.option_img)"/>
        </span>
        <span v-if="optionTemp">
         <img id="option_temp"
         :src="option_img_path + optionTemp.option_img" 
         class="img_option" 
         :cate="optionTemp.type"
          @load="loadOption($event, optionTemp.option_img)"
         v-on:error="loadImgError">
        </span>
      </div>
      <!-- <div class="sumi-left-zoombtn">+ZOOM</div> -->
      <button class="sumi-left-downbtn simu-common-btn"
      @click="doSaveTemp"><i class="fas fa-download"></i></button>
      <button class="sumi-left-allbody simu-common-btn" @click="changeViewMode" :class="{on : viewMode == 1}">全身ON/OFF</button>
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
      viewMode: 0
    };
  },
  props: [],
  methods: {
    defaultLoaded() {
      console.log("1111111")
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
        .attr("width", kiji[0].naturalWidth)
        .attr("height", kiji[0].naturalHeight);
      $(target)
        .find("pattern[type='kiji']")
        // .not("#button")
        .attr("width", kiji[0].naturalWidth)
        .attr("height", kiji[0].naturalHeight);
    },
    loadOption(event, img){
      if(img){
        var target = document.querySelector(".svgModel").contentDocument;
        var cate = $(event.target).attr('cate')
        if(cate && $(target).find("pattern[cate='"+cate+"']").length){
          $(target)
          .find("pattern[cate='"+cate+"']")
          .find("image")
          .attr("xlink:href", $(event.target).attr('src'))
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
          console.log("2222222")
          $(".loadding_bl").removeClass("on");
        }, 300);
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
    createIdForOption(Option){
      return 'option-'+Option.combine_id+'-'+Option.item_id+'-'+Option.design_id+'-'+Option.parent_id
    },
    changeViewMode: function(){
      this.viewMode = this.viewMode ? 0 : 1
    },
    addToCart: async function(){
      console.log(this.initialData)
      let ret = null
      await this.axios.request({
        url: 'http://54.248.46.255/myshop/addproducttocart/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          'cartItemId': this.initialData.cartItemId,
          'kiji': this.kijiActive,
          'category_select': this.initialData.category_select,
          'style': this.styleSelected,
          'model': this.modelSelected,
          'item': this.itemSelected,
          'option_selected' : this.optionSelectedData
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
    doSaveTemp: async function(){
      if(this.kijiActive){
        await(this.addToCart()).then((response) => {
        if(response !== null){
            this.$store.dispatch('handleChangeErrorCode', 4)
            this.$store.dispatch('handleChangeCartItemId', response)
          }
        })
      } else{
        alert('生地を選択してください。')
        return false
      }
    }
  },
  watch: {
    designActive: function(){
      this.viewMode = this.viewMode = 0
    },
    designActive_path: function(){
      $(".loadding_bl").addClass("on");
    }
  },
  mounted() {
    // this.defaultLoaded();
  },
  computed: {
    ...mapGetters([
        'kiji_img_path',
        'simu_img_path',
        'option_img_path',
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
        'orderNowId'
      ]),
    //design path
    design: function() {
      if(this.designActive_path){
        return {
          sample_path: this.simu_img_path + 'designs/' + this.designActive_path + "/sample.png",
          design_path: this.simu_img_path + 'designs/' + this.designActive_path + "/design.svg",
          shadow_path: this.simu_img_path + 'designs/' + this.designActive_path + "/shadow.png",
        }
      } else{
        return {}
      }
    },
    //kiji path
    kiji_img: function(){
      if(this.kijiActive && this.kijiData.length){
        return this.kijiData.filter(item => item.id == this.kijiActive)[0].img
      } else{
        return "0730151143_6103981fcfa43.jpeg"
      }
    },
    designActive_path: function(){
      if(this.viewMode){
        return 'all'
      } else{
        return (this.itemData && this.designActive) ? this.designActive.design_id : null
      }
    },
    itemCombineActive: function(){
      if(this.itemDataActive){
        let itemObjectActive = this.itemDataActive.items.filter((item) => item.id == this.designActive.combine_id)[0]
        return itemObjectActive
      } else{
        return null
      }
    },
    styleDataObj: function(){
      if(this.styleData){
        return this.styleData.filter((item) => item.id == this.styleSelected)[0]
      } else{
        return {}
      }
    },
    modelDataObj: function(){
      console.log(this.modelData)
      console.log(this.modelSelected)
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
      if(this.itemData.length && this.itemData.filter(item => item.orderId == this.orderNowId).length){
        return this.itemData.filter(item => item.orderId == this.orderNowId)[0]
      } else{
        return null
      }
    }
  },
};
</script>
