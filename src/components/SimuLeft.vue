<template>
  <div class="container-simuleft">
    <div class="simuleft-top">
      <h3 class="simuleft-top-style">CLASS</h3>
      <h4 class="simuleft-top-model">Regular Model</h4>
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
      <div class="sumi-left-zoombtn">+ZOOM</div>
      <div class="sumi-left-downbtn"><i class="fas fa-download"></i></div>
      <!-- <div class="options">
        <img :src="option_button_path" class="img_option" v-on:error="notfounder"/>
        <img :src="option_flower_path" class="img_option" v-on:error="notfounder"/>
      </div> -->
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

    // modalSvgLoad() {
    //   var target = document.querySelector(".suitmodel02").contentDocument;
    //   var tex = $(".simulator__preloader").find("img");
    //   $(target)
    //     .find("pattern")
    //     .not("#buttons")
    //     .find("image")
    //     .attr("xlink:href", tex[0].currentSrc)
    //     .attr("width", tex[0].naturalWidth)
    //     .attr("height", tex[0].naturalHeight);
    //   $(target)
    //     .find("pattern")
    //     .not("#buttons")
    //     .attr("width", tex[0].naturalWidth)
    //     .attr("height", tex[0].naturalHeight);
    // },
    // modalFullviewShow: function() {
    //   this.cloneData01 = $(".simu_price").html();
    //   $(".simu-modal-fullview").addClass("active");
    // },
    // modalFullviewHide: function() {
    //   $(".simu-modal-fullview").removeClass("active");
    // },
    notfounder: function(e) {
      e.target.src = this.simu_img_path + "notfounder.png";
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
        'modeSelected',
        'itemSelected',
        'designActive',
        'kijiActive'
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
      if(this.itemData && this.designActive){
        return this.designActive
      } else{
        return null
      }
    },
    itemCombineActive: function(){
      console.log(this.designActive)
      if(this.itemData){
        var item_combine_id = Object.keys(this.itemData.design)
                  .map((key) => this.itemData.design[key])
                  .filter((item) => item.design_id === this.designActive)[0].item_id
        var itemObjectActive = Object.keys(this.itemData.items)
                  .map((key) => this.itemData.items[key])
                  .filter((item) => item.id === item_combine_id)[0]
        if(itemObjectActive){
          return itemObjectActive
        }
      } else{
        return null
      }
    }
  },
};
</script>
