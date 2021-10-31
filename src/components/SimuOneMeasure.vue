<template>
  <div class="container-onemeasure">
    <div class="toz-page m-container">
            <!--interface, input the sex,height and weight. Click the picture to trigger opening camera  -->
            <div id="tozInterface" class="toz-container onestep1">
              <div class="onemeasure-step1">
                <h3 class="onemeasure-title">身長・体重を入力</h3>
                <div class="onemeasure-iniinfo">
                  <div class="onemeasure-iniinfo-row">
                    <p class="onemeasure-iniinfo-label">性別</p>
                    <div class="onemeasure-iniinfo-input d-flex justify-content-center align-items-center">
                      <select id="userGender" >
                          <option id="selectMale" value="male">男性</option>
                          <option id="selectFemale" value="female">女性</option>
                      </select>
                    </div>
                  </div>
                  <div class="onemeasure-iniinfo-row">
                    <p class="onemeasure-iniinfo-label">身長</p>
                    <div class="onemeasure-iniinfo-input d-flex justify-content-center align-items-center">
                      <input id="userHeight" type="number"><span class="onemeasure-unit">cm</span>
                    </div>
                  </div>
                  <div class="onemeasure-iniinfo-row">
                    <p class="onemeasure-iniinfo-label">体重</p>
                    <div class="onemeasure-iniinfo-input d-flex justify-content-center align-items-center">
                      <input id="userWeight" type="number"><span class="onemeasure-unit">kg</span>
                    </div>
                  </div>
                </div>
                <div class="onemeasure-iniinfo-btn">
                  <button type="button" class="btn btn-dark" onclick="doNext(2);">採寸する</button>
                  <span class="onemeasure-notice">カメラが起動します</span>
                </div>
              </div>
            </div>

            <!--camera view, take pictures of front/side pose-->
            <div id="tozCameraView" class="toz-camera-container toz-container" style="display: none">
                <div class="onemeasure-nav d-flex justify-content-between align-items-center">
                  <span class="onemeasure-nav-prev" onClick="doPrev();"><i class="fas fa-chevron-left"></i></span>
                  <span class="onemeasure-nav-title" v-if="oneStep == 2">正面を撮影</span>
                  <span class="onemeasure-nav-title" v-if="oneStep == 3">側面を撮影</span>
                  <span class="onemeasure-nav-detail" @click="showOneGuide"><i class="fas fa-info-circle"></i></span>
                </div>
                <div class="cameraBox">
                  <div class="cameraBox-camera">
                      <!--when chrome kernel version is 65, the accelerometer can not be used if the video label exists. Suggest to append video label after initializing accelerometer  -->
                      <video id="tozCameraVideo"  playsinline="" autoplay ></video>
                      <div class="tozCameraView_button">
                          <!-- <button  id="closeCamera" style="height: 50px;width: 30%;max-width: 100px" @click="OnePrevStep">キャンセル</button> -->
                          <button id="captureImage"><span></span></button><br>
                          <span class="hidden_button" id="nexttostep2" @click="OneNextStep(2)">Next to step 2</span>
                          <span class="hidden_button" id="nexttostep3" @click="OneNextStep(3)">Next to step 3</span>
                          <span class="hidden_button" id="nexttostep4" @click="OneNextStep(4)">Next to step 3</span>
                          <span class="hidden_button" id="backtostep1" @click="OnePrevStep(1)">Back to step 1</span>
                          <span class="hidden_button" id="backtostep2" @click="OnePrevStep(2)">Back to step 2</span>
                          <span class="hidden_button" id="backtostep3" @click="OnePrevStep(3)">Back to step 3</span>
                      </div>
                  </div>
                  <div class="onemeasure-camera-sample">
                    <img :src="this.main_path + '/html/user_data/assets/img/common/onemeasure-model-01.svg'" alt="" v-if="oneStep == 2">
                    <img :src="this.main_path + '/html/user_data/assets/img/common/onemeasure-model-02.svg'" alt="" v-if="oneStep == 3">
                  </div>
                  <div class="onemeasure-camera-result">
                        <img id="frontThumbnail" :src="this.main_path + '/html/user_data/assets/img/common/onemeasure-model-front.png'">
                  </div>
                  <transition name="modal">
                    <div class="modal-mask onemeasure-modal-mask" v-if="guide_show_flg && oneStep == 2">
                      <div class="modal-wrapper">
                        <div class="modal-container">
                            <span class="onemeasure-modal-closebtn" @click="closeOneGuide"><i class="fas fa-times"></i></span>
                            <div class="modal-body">
                              <div class="onemeasure-modal-title d-flex justify-content-center align-items-center">側面を撮影</div>
                              <div class="onemeasure-modal-img">
                                <img :src="this.main_path + '/html/user_data/assets/img/common/onemeasure-guide-01.png'" alt="">
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
                    <div class="modal-mask onemeasure-modal-mask" v-if="guide_show_flg && oneStep == 3">
                      <div class="modal-wrapper">
                        <div class="modal-container">
                            <span class="onemeasure-modal-closebtn" @click="closeOneGuide"><i class="fas fa-times"></i></span>
                            <div class="modal-body">
                              <div class="onemeasure-modal-title d-flex justify-content-center align-items-center">側面を撮影</div>
                              <div class="onemeasure-modal-img">
                                <img :src="this.main_path + '/html/user_data/assets/img/common/onemeasure-guide-02.png'" alt="">
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
                <div class="tozCameraView-bottom">
                  <p>左右に傾けないでください</p>
                </div>
            </div>

            <div id="tozResult" class="toz-container" style="display: none">
              <div class="onemeasure-step1">
                <h3 class="onemeasure-title">採寸結果</h3>
                <div class="onemeasure-iniinfo">
                  <div id="sizeTableResult" class="d-flex justify-content-between align-items-center flex-wrap"></div>
                  <span class="onemeasure-result-hidden hidden_button"></span>
                </div>
                <div class="onemeasure-iniinfo-btn">
                  <button type="button" class="btn btn-dark" onclick="doResetMeasure();">もう一度撮影する</button>
                  <button type="button" class="btn btn-dark" @click="getSizeMeasure">採寸を完了する</button>
                </div>
              </div>
            </div>
            <transition name="modal">
              <div class="loaddingDataIo">
                <div class="loadingio-spinner-spinner-482naetb3m">
                  <div class="ldio-2vyxc9gibh9">
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    <div></div><div></div><div></div>
                  </div>
                </div>
              </div>

            </transition>

            <transition name="modal">
              <div id="modal-measure-result" class="modal-mask" v-if="resultMeasureShow">
                  <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-close-btn" @click="resultMeasureShow = false"><i class="fas fa-times"></i></div>
                        <div class="modal-header">推奨ゲージサイズ</div>
                        <div class="modal-body">
                          <ul class="modal-measure-list">
                            <li class="modal-measure-item d-flex justify-content-between align-items-center" v-for="(Design, index) in designDataActive" :key="index">
                              <span class="modal-measure-label">{{Design.design_label}}</span>
                              <span class="modal-measure-sizeval">{{getSizeMeasureDesign(Design.design_id)}}</span>
                            </li>
                          </ul>
                        </div>
                        <div class="modal-footer justify-content-center">
                          <div class="onemeasure-iniinfo-btn">
                            <button type="button" class="btn btn-dark" @click="doBackToSimu">オーダー画面に戻る</button>
                            <span class="onemeasure-notice">画面が横になります</span>
                          </div>
                        </div>
                    </div>
                  </div>
              </div>
            </transition>

            <!--photo view, here you can handle the photo return from server-->
            <div id="tozPhotoView" class="toz-photo-view-container toz-container" style="display: none">
                <div class="toz-photo-view-img-container">
                    <img id="tozFrontPhoto" src="">
                </div>
                <div class="toz-photo-view-img-container">
                    <img id="tozSidePhoto" src="">
                </div>
                <button id="getMeasurementsByProfile">getMeasurementsByProfile</button>
                <button style="top: 45px;" id="getMeasurementsByTaskId" >getMeasurementsByTaskId</button>
            </div>

            <!--adjust view. Adjust outline and upload the adjusted result-->
            <div id="tozAdjustView"  class="toz-adjust-view-container toz-container" style="display: none">
                <div id="tozAdjustingFront" class="toz-adjusting-front toz-adjusting-interface">
                    <div id="tozFrontMagnifier" class="toz-magnifier-container"  style="display:none;">
                        <canvas id="tozFrontProfileMagnifier" class="toz-magnifier-profile"></canvas>
                        <canvas id="tozFrontImageMagnifier" class="toz-magnifier-image"></canvas>
                    </div>
                    <canvas id="tozFrontProfile" class="toz-adjust-profile"></canvas>
                    <canvas id="tozFrontImage" class="toz-adjust-image"></canvas>
                    <button id="tozFrontRetract" disabled="disabled" >front Undo</button>
                    <button class="toz-draw-outline-to-photo-view">Return</button>
                </div>
                <div id="tozAdjustingSide"  class="toz-adjusting-side toz-adjusting-interface">
                    <div id="tozSideMagnifier" class="toz-magnifier-container" style="display:none;">
                        <canvas id="tozSideProfileMagnifier" class="toz-magnifier-profile"></canvas>
                        <canvas id="tozSideImageMagnifier" class="toz-magnifier-image"></canvas>
                    </div>
                    <canvas id="tozSideProfile" class="toz-adjust-profile"></canvas>
                    <canvas id="tozSideImage" class="toz-adjust-image"></canvas>
                    <button id="tozSideRetract" disabled="disabled">side Undo</button>
                    <button class="toz-draw-outline-to-photo-view">Return</button>
                </div>
            </div>
            
            <!--show QR code when errors occur-->
            <div id="tozQRCode" class="toz-QRCode-container toz-container" style="display: none">
                <div class="toz-QRCode-text-container">
                    <div class="toz-QRCode-text-header">
                        <p>ERROR</p>
                    </div>
                    <div class="toz-QRCode-text-content">
                        <p>Your browser does not support webRTC, please</p><br>
                        <p>1. Download <strong>1Measure</strong> APP, and share your measurement data via scanning the following QR code，or</p>
                        <p>2. Scan the following QR code to open <strong>1Measure</strong> mini program at weChat</p><br>
                    </div>
                </div>
                <figure class="toz-QRCode-image-container">
                    <div id="tozQRCodeImg" ></div>  <!--warning: don't delete or change the img's id-->
                </figure>
                <button onclick="returnInterfaceView();" style="position: absolute;bottom: 100px">Return</button>
            </div>
    </div>
  </div> 
</template> 

<script>

import { mapGetters } from 'vuex'; 

export default {
  name: "SimuOneMeasure",
  components: {},
  data() {
    return {
      oneStep: 1,
      guide_show_flg: true,
      resultMeasureShow: false,
      fixedParam: ['kyoui', 'hip', 'west'],

      calSizeResult: [],
      measureData: [],
      // measureData: [{"code":"msize04_020","name":"首周り","unit":"cm","imageUrl":"https://www.emtailor.com/imeas_asset/icon/icon190102/msize04_020.png","meaValue":"34.76","type":""},{"code":"msize03_010","name":"肩幅","unit":"cm","imageUrl":"https://www.emtailor.com/imeas_asset/icon/icon190102/msize03_010.png","meaValue":"43.86","type":""},{"code":"msize01_010","name":"胸囲","unit":"cm","imageUrl":"https://www.emtailor.com/imeas_asset/icon/icon190102/msize01_010.png","meaValue":"84.89","type":"kyoui"},{"code":"msize08_012","name":"ゆき丈","unit":"cm","imageUrl":"https://www.emtailor.com/imeas_asset/icon/icon190102/msize08_012.png","meaValue":"83.81","type":""},{"code":"msize01_030","name":"ウエスト","unit":"cm","imageUrl":"https://www.emtailor.com/imeas_asset/icon/icon190102/msize01_030.png","meaValue":"66.66","type":"west"},{"code":"msize01_040","name":"ヒップ","unit":"cm","imageUrl":"https://www.emtailor.com/imeas_asset/icon/icon190102/msize01_040.png","meaValue":"88.75","type":"hip"},{"code":"msize11_030","name":"ズボン総丈","unit":"cm","imageUrl":"https://www.emtailor.com/imeas_asset/icon/icon190102/msize11_030.png","meaValue":"99.14","type":""},{"code":"msize11_051","name":"股下","unit":"cm","imageUrl":"https://www.emtailor.com/imeas_asset/icon/icon190102/msize11_051.png","meaValue":"Available in pro version","type":""}]
    };
  },
  methods: {
    OneNextStep: function(step = null){
      if(step){
        this.oneStep = step
      } else{
       this.oneStep = this.oneStep + 1
      }
    },
    OnePrevStep: function(step = null){
      if(step){
        this.oneStep = step
      } else{
       this.oneStep  = this.oneStep - 1
      }
    },
    showOneGuide: function(){
      this.guide_show_flg = true
    },
    closeOneGuide: function(){
      this.guide_show_flg = false
    },
    calSizeMeasure: function(){
      let arrResultFixed = this.measureData.filter(item => (item.type != '' && this.fixedParam.indexOf(item.type) != -1))
      let arrResult = []

      if(this.sizeDataActive.length){
        this.sizeDataActive.forEach(Size => {
          if(arrResult.findIndex(item => item.design == Size.design) == -1){
            let measure = Size.measureData 
            let check_flg = true
            for (const [key, value] of Object.entries(measure)) {
              let meaval_temp = arrResultFixed.find(item2 => key.includes(item2.type))
              if(!(value != '' && 
                  ((key.includes('_under') && (meaval_temp.meaValue >= value))
                    || (key.includes('_upper') && (meaval_temp.meaValue <= value)))
                )){
                  check_flg = false
              }
            }
            if(check_flg){
              arrResult.push(Size)
            }
          }
        })
      }
      this.calSizeResult = arrResult
    },
    updateSiseFromMeasure: function(){
      if(this.calSizeResult.length){
        this.designDataActive.forEach(Design => {
          if(this.calSizeResult.findIndex(item => item.design == Design.design_id) != -1){
            let SizeTemp = this.calSizeResult.find(item => item.design == Design.design_id)
            this.$store.dispatch('handleUpdateSizeSelectedData', {
                orderId: this.orderNowId,
                design: Design.design_id,
                item: Design.item_id,
                ...SizeTemp
            })
          }
        })
      }
    },
    getSizeMeasure: function(){
      this.resultMeasureShow = true
      this.measureData = JSON.parse($('.onemeasure-result-hidden').html())
      this.calSizeMeasure()
    },
    doBackToSimu: function(){
        this.updateSiseFromMeasure()
        $('.container-onemeasure').removeClass('show')
        this.resultMeasureShow = false
        this.$store.dispatch('handleChangeStep', 2)
    },
    getSizeMeasureDesign(design_id){
      if(this.calSizeResult.findIndex(item => item.design == design_id) != -1){
        let SizeTemp = this.calSizeResult.find(item => item.design == design_id)
        return SizeTemp.name
      }
      return '無し'
    }
  },
  props: ['itemDataActive'],
  mounted() {

  },
  computed: {
    ...mapGetters([
      'main_path',
      'model_img_path',
      'modelTemp',
      'modelData',
      'itemSelected',
      'itemData',
      'orderNowId'
    ]),
    sizeDataActive: function(){
      if(this.itemDataActive){
        return this.itemDataActive.size
      } else{
        return []
      }
    },
    designDataActive: function(){
      if(this.itemDataActive){
        return this.itemDataActive.design
      } else{
        return []
      }
    }
  }
};
</script>

<style scoped>
	
</style>

