<template>
  <div class="container-simuleft">
    <div class="simuleft-top">
      <h3 class="simuleft-top-style">{{styleObject.name}}</h3>
      <h4 class="simuleft-top-model">{{modelData.name}}</h4>
      <p class="simuleft-top-itemcombine" v-if="itemCombineActive">{{itemCombineActive.name}}</p>
    </div>
    <div class="simuleft-main">
      <div style="display: none" class="kiji_preloader">
          <img v-bind:src="kiji_img_src" @load="kijiLoaded" alt="" kiji-id=""/>
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
        <img
        v-for="(Option,id) in optionSaved" :key="id"
        :id="createIdForOption(Option)"
        :src="option_img_path + Option.option_img" class="img_option" v-on:error="notfounder"/>
        <span v-html="optionTempHtml"></span>
      </div>
      <div class="sumi-left-zoombtn">+ZOOM</div>
      <div class="sumi-left-downbtn"><i class="fas fa-download"></i></div>
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
    };
  },
  props: ["itemData"],
  methods: {
    defaultLoaded() {
      $(".loadding_bl").addClass("on");
      setTimeout(function() {
        $(".loadding_bl").removeClass("on");
      }, 700);
    },
    kijiLoaded() {
      var target = document.querySelector(".svgModel").contentDocument;
      var kiji = $(".kiji_preloader").find("img");
      $(target)
        .find("pattern")
        .not("#buttons")
        .find("image")
        .attr("xlink:href", kiji[0].currentSrc)
        .attr("width", kiji[0].naturalWidth)
        .attr("height", kiji[0].naturalHeight);
      $(target)
        .find("pattern")
        .not("#buttons")
        .attr("width", kiji[0].naturalWidth)
        .attr("height", kiji[0].naturalHeight);
    },
    svgLoaded02() {
      this.kijiLoaded();
      setTimeout(function() {
        $(".loadding_bl").removeClass("on");
      }, 500);
    },
    notfounder: function(e) {
      e.target.src = this.option_img_path + "notfounder.png";
    },
    createIdForOption(Option){
      return 'option-'+Option.combine_id+'-'+Option.item_id+'-'+Option.design_id+'-'+Option.parent_id
    }
  },
  watch: {
    
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
        'optionTemp'
      ]),
    //design path
    design: function() {
      $(".loadding_bl").addClass("on")
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
    kiji_img_src: function(){
      return "/html/upload/save_image/0730151143_6103981fcfa43.jpeg"
    },
    designActive_path: function(){
      return (this.itemData && this.designActive) ? this.designActive.design_id : null
    },
    itemCombineActive: function(){
      if(this.itemData){
        var itemObjectActive = this.itemData.items.filter((item) => item.id === this.designActive.combine_id)[0]
        return itemObjectActive
      } else{
        return null
      }
    },
    styleObject: function(){
      if(this.styleData){
        return this.styleData.filter((item) => item.id === this.styleSelected)[0]
      } else{
        return {}
      }
    },
    optionSaved: function(){
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
    optionTempHtml: function(){
      if(this.optionTemp){
        return '<img id="option_temp" src="'+this.option_img_path + this.optionTemp.option_img+'" class="img_option">'
      } else{
        return ''
      }
    }
  },
};
</script>
