<template>
  <div class="container-simuleft">
    <div class="simuleft-top">
      <h3 class="simuleft-top-style">CLASS</h3>
      <h4 class="simuleft-top-model">Regular Model</h4>
      <p class="simuleft-top-itemcombine">シングル2ピース</p>
    </div>
    <div class="simuleft-main">
      <div style="display: none" class="kiji_preloader">
          <img v-bind:src="kiji_img_src" @load="kijiLoaded" alt="" />
      </div>
      <div class="simuleft-sample">
            <img :src="design.sample_path" class="img_sample" />
            <object
              ref="carousel_or_anything"
              type="image/svg+xml"
              v-bind:data="design.design_path"
              @load="svgLoaded02"
              class="suitmodel"
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
export default {
  name: "SimuLeft",
  data() {
    return {
    };
  },
  props: [
    "simu_img_path",
    "itemActive",
    "designActive",

    "step",
    "obj_bg_path",
    "viewMode",
    "partNo",
    "partNo_zentai",
    "completeOrder",
  ],
  methods: {
    defaultLoaded() {
      $(".loadding_bl").addClass("on");
      setTimeout(function() {
        $(".loadding_bl").removeClass("on");
      }, 700);
    },
    kijiLoaded() {
      var target = document.querySelector(".suitmodel").contentDocument;
      var tex = $(".simulator__preloader").find("img");
      // $(target)
      //   .find("pattern")
      //   .not("#buttons")
      //   .find("image")
      //   .attr("xlink:href", tex[0].currentSrc)
      //   .attr("width", tex[0].naturalWidth)
      //   .attr("height", tex[0].naturalHeight);
      // $(target)
      //   .find("pattern")
      //   .not("#buttons")
      //   .attr("width", tex[0].naturalWidth)
      //   .attr("height", tex[0].naturalHeight);
      // this.modalSvgLoad();
    },
    //test change erigata 衿型
    changeEriGata() {
      var target = document.querySelector(".suitmodel").contentDocument;
      if (
        $(target)
          .find("pattern#img1")
          .attr("style")
      ) {
        $(target)
          .find("pattern")
          .not("#img1")
          .attr("style", "display: none;");
        $(target)
          .find("pattern#img1")
          .removeAttr("style");
      } else {
        $(target)
          .find("pattern")
          .not("#img2")
          .attr("style", "display: none;");
        $(target)
          .find("pattern#img2")
          .removeAttr("style");
      }
    },
    modalSvgLoad() {
      var target = document.querySelector(".suitmodel02").contentDocument;
      var tex = $(".simulator__preloader").find("img");
      $(target)
        .find("pattern")
        .not("#buttons")
        .find("image")
        .attr("xlink:href", tex[0].currentSrc)
        .attr("width", tex[0].naturalWidth)
        .attr("height", tex[0].naturalHeight);
      $(target)
        .find("pattern")
        .not("#buttons")
        .attr("width", tex[0].naturalWidth)
        .attr("height", tex[0].naturalHeight);
    },
    svgLoaded02() {
      this.kijiLoaded();
      setTimeout(function() {
        $(".loadding_bl").removeClass("on");
      }, 300);
    },
    modalFullviewShow: function() {
      this.cloneData01 = $(".simu_price").html();
      $(".simu-modal-fullview").addClass("active");
    },
    modalFullviewHide: function() {
      $(".simu-modal-fullview").removeClass("active");
    },
    notfounder: function(e) {
      e.target.src = this.simu_img_path + "notfounder.png";
    },
    completeOrderCheck: function() {
      if (this.completeOrder) {
        window.location.replace("/sample/test01/cart.html");
      } else {
        alert("選択されていない項目があります。ご確認ください。");
        return false;
      }
    },
  },
  watch: {
    model_path_change: function() {
      $(".loadding_bl").addClass("on");
    },
  },
  mounted() {
    this.defaultLoaded();
  },
  computed: {
    //design path
    design: function() {
      return {
        sample_path: this.simu_img_path + 'designs/' + this.designActive + "/sample.png",
        design_path: this.simu_img_path + 'designs/' + this.designActive + "/design.svg",
        shadow_path: this.simu_img_path + 'designs/' + this.designActive + "/shadow.png",
      }
    },
    //kiji path
    kiji_img_src: function(){
      return "/html/upload/save_image/0730151143_6103981fcfa43.jpeg"
    },
    model_path_change: function() {
      //return this.design_path.model_path;
    },
    //option path
    option_main_path: function() {
      var option_main_src = "";
      if (this.viewMode != "") {
        option_main_src =
          this.simu_img_path +
          "simulator/options/" +
          this.partNo_zentai.split("_all")[0] +
          "/";
      } else {
        if (this.partNo != "") {
          option_main_src =
            this.simu_img_path + "simulator/options/" + this.partNo + "/";
        } else {
          option_main_src = this.simu_img_path + "simulator/options/" + "3/";
        }
      }
      return option_main_src;
    },
    option_target: function() {
      //step 3
      var option_target_temp = "";
      if (this.viewMode == "all" || this.partNo == "") {
        option_target_temp = "all";
      } else {
        option_target_temp = "up";
      }
      return option_target_temp;
    },
    buttons: function() {
      return "19";
    },
    flowers: function() {
      return "05";
    },
    option_button_path: function() {
      return (
        this.option_main_path +
        this.option_target +
        "/button/" +
        this.buttons +
        ".png"
      );
    },
    option_flower_path: function() {
      return (
        this.option_main_path +
        this.option_target +
        "/flower/" +
        this.flowers +
        ".png"
      );
    },
  },
};
</script>
