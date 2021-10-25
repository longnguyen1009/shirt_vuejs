<template>
  <div class="container-onemeasure">
    <div class="onemeasure-step1">
      <h3 class="onemeasure-title">身長・体重を入力</h3>
      <div class="onemeasure-iniinfo">
        <div class="onemeasure-iniinfo-row">
          <p class="onemeasure-iniinfo-label">身長</p>
          <div class="onemeasure-iniinfo-input d-flex justify-content-center align-items-center">
            <input type="text"><span class="onemeasure-unit">cm</span>
          </div>
        </div>
        <div class="onemeasure-iniinfo-row">
          <p class="onemeasure-iniinfo-label">体重</p>
          <div class="onemeasure-iniinfo-input d-flex justify-content-center align-items-center">
            <input type="text"><span class="onemeasure-unit">kg</span>
          </div>
        </div>
      </div>
      <div class="onemeasure-iniinfo-btn">
        <button type="button" class="btn btn-dark" @click="OneNextStep">採寸する</button>
        <span class="onemeasure-notice">カメラが起動します</span>
      </div>
    </div>
    <transition name="transitionRightToLeft">
      <div v-if="oneStep == 2" class="onemeasure-step2 d-flex flex-column">
        <div class="onemeasure-nav d-flex justify-content-between align-items-center">
          <span class="onemeasure-nav-prev" @click="OnePrevStep"><i class="fas fa-chevron-left"></i></span>
          <span class="onemeasure-nav-title">正面を撮影</span>
          <span class="onemeasure-nav-detail" @click="showOneGuide"><i class="fas fa-info-circle"></i></span>
        </div>
        <div class="onemeasure-camera">
          <div>
            
          </div>
          <div class="onemeasure-camera-sample">
            <img src="http://54.248.46.255/html/user_data/assets/img/common/onemeasure-model-front.png" alt="">
          </div>
          <transition name="modal">
            <div class="modal-mask onemeasure-modal-mask" v-if="guide_show_flg && oneStep == 2">
              <div class="modal-wrapper">
                <div class="modal-container">
                    <span class="onemeasure-modal-closebtn" @click="closeOneGuide"><i class="fas fa-times"></i></span>
                    <div class="modal-body">
                      <div class="onemeasure-modal-title d-flex justify-content-center align-items-center">側面を撮影</div>
                      <div class="onemeasure-modal-img">
                        <img src="http://54.248.46.255/html/user_data/assets/img/common/onemeasure-guide-01.png" alt="">
                      </div>
                      <div class="onemeasure-modal-textbox">
                        <ul class="onemeasure-guide-list">
                          <li>照明の当たる明るい場所を選んでください。</li>
                          <li>極力平坦な背景 (凹凸で影がなく、色差のない壁面) を選んでください。</li>
                          <li>着用している衣類と色差のある背景色にしてください。</li>
                          <li>首や肩を覆わずにタイトな服を着てください。</li>
                          <li>ガイドに従いポーズ を取ってください。</li>
                        </ul>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div> 
</template> 

<script>

//Carousel
import { mapGetters } from 'vuex';
import test from '../assets/js/common'
import * as mykey from '../assets/js/datainterface'

export default {
  name: "SimuOneMeasure",
  components: {test},
  data() {
    return {
     oneStep: 1,
     guide_show_flg: true
    };
  },
  methods: {
    OneNextStep: function(){
      this.oneStep = this.oneStep + 1
    },
    OnePrevStep: function(){
      this.oneStep = this.oneStep - 1
    },
    showOneGuide: function(){
      this.guide_show_flg = true
    },
    closeOneGuide: function(){
      this.guide_show_flg = false
    },
  },
  props: [],
  mounted() {
    console.log(mykey.OneMeasureSDKParameters)
  },
  computed: {
    ...mapGetters([
      'model_img_path',
      'modelTemp',
      'modelData',
      'itemSelected',
    ]),
  }
};
</script>

<style scoped>
	
</style>


