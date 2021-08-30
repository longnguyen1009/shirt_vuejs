<template>
    <div class="container-simuright d-flex flex-column">
      <div class="simuright-top d-flex justify-content-between">
        <div class="btn-group" role="group">
          <button class="simuright-modeBtn" :class="{active: optionMode == 1}">コードスキャン</button>
          <button class="simuright-modeBtn" :class="{active: optionMode == 2}">リストから選択</button>
        </div>
        <select aria-label="select-item" class="form-control" v-model="itemActive" @change="changeItem($event)">
          <option v-for="(item, id) in itemData" :key="id" :value="item.id">{{item.label}}</option>
        </select>
      </div>
      <div class="simuright-options">
        <div class="simuright-options-row">
          <div class="simuright-options-rowTop d-flex justify-content-between"
            @click="openDetailOption(1)">
            <span class="simuright-options-label">生地</span>
            <div class="simuright-options-name"
            v-if="kijiActive != 0">{{kijiObjectActive.name}}</div>
            <span class="simuright-options-arraw"><i class="fas fa-chevron-right"></i></span>
          </div>
        </div>
        <div class="simuright-options-row">
          <div class="simuright-options-rowTop d-flex justify-content-between">
            <span class="simuright-options-label">付属</span>
            <div class="simuright-options-name">NAME NAME NAME NAME</div>
            <span class="simuright-options-arraw"><i class="fas fa-chevron-right"></i></span>
          </div>
        </div>
        <div class="simuright-options-row">
          <div class="simuright-options-rowTop d-flex justify-content-between">
            <span class="simuright-options-label">ディティール</span>
            <div class="simuright-options-name">NAME NAME NAME NAME</div>
            <span class="simuright-options-arraw"><i class="fas fa-chevron-right"></i></span>
          </div>
        </div>
        <div class="simuright-options-row">
          <div class="simuright-options-rowTop d-flex justify-content-between">
            <span class="simuright-options-label">サイズ</span>
            <div class="simuright-options-name">NAME NAME NAME NAME</div>
            <span class="simuright-options-arraw"><i class="fas fa-chevron-right"></i></span>
          </div>
        </div>
      </div>
      <div class="simuright-price d-flex justify-content-between">
          <div class="simuright-price-left">
            <p>商品価格：39,000円<br>+ カスタマイズ価格：4,500円</p>
            <p>お支払い金額: 43,500円</p>
          </div>
          <div class="simuright-price-right">
            <p class="delivery-date">仕上がり予定日：12月12日</p>
            <button class="btn btn-secondary">オーダー内容確認</button>
          </div>
      </div>

      <transition name="simurightSubPage">
        <div class="simuright-sub" 
        v-if="detailOptionActive != 0">
          <SelectKiji 
          :kiji_img_path="kiji_img_path"
          :kijiList="kijiData"
          :kijiActive="kijiActive"
          @closeOption="closeDetailOption($event)"
          @set-kiji="setKiji($event)"
          @kiji-confirm="kijiConfirm($event)"
          />
        </div>
      </transition>
    </div>
</template>

<script>
  import SelectKiji from "../components/SelectKiji.vue"

  export default {
      name: "SimuRight",
      components: {SelectKiji},
      data() {
          return {
              optionMode: 2,
              detailOption: {
                1: 'kiji',
              },
              detailOptionActive: 0,
              kijiData: [],
              kijiActive: 0,
              itemActive: 0,

              stepList: [
                  {id: 1,name: "スタイル"}, 
                  {id: 2,name: "生地"}, 
                  {id: 3,name: "サイズ補正"},
              ],
              measure_data: {
                  0: {id: 0,name: "補正1",value: 0, min : -10, max : 10, step : 0.5},
                  1: {id: 1,name: "補正2",value: 0, min : -10, max : 10, step : 0.5},
                  2: {id: 2,name: "補正3",value: 0, min : -10, max : 10, step : 0.5},
                  3: {id: 3,name: "補正4",value: 0, min : -10, max : 10, step : 0.5}
              },
              partLists: {
                  0: {id: 0,name: "ポケット",img: "08021549_5d43dcefd3791.jpg",option: {
                      0: {id: 15, name: '船形(直線)'},
                      1: {id: 16, name: 'バルカ(曲線)'},
                      2: {id: 17, name: 'パッチポケット'},
                      3: {id: 18, name: '両玉縁フラップ 有り'},
                      4: {id: 19, name: 'スラント両玉縁フラップ 有り'}
                  }},
                  1: {id: 1,name: "ボタン",img: "07291208_5d3e63493b8ca.jpg",option: {
                      0: {id: 20, name: '5B'},
                      1: {id: 21, name: '6B'}
                  }},
                  2: {id: 2,name: "補正1",img: "07291331_5d3e7686bfd43.jpg",option:{
                      0: {id: 21, name: 'テキスト'},
                      1: {id: 22, name: 'テキスト'},
                  }},
                  3: {id: 3,name: "背裏", img: "07291207_5d3e62efc5a64.jpg",option: {
                      0: {id: 23, name: '総裏'},
                      1: {id: 24, name: '背抜き'},
                      2: {id: 25, name: '裏無し'},
                  }},
                  4: {id: 4,name: "胴裏地", img: "07291114_5d3e5676161a2.jpg",option:{
                      0: {id: 26, name: 'テキスト'},
                      1: {id: 27, name: 'テキスト'},
                  }},
                  5: {id: 5,name: "○ ○ ○", img: "07291103_5d3e540a01264.jpg",option:{
                      0: {id: 28, name: 'テキスト'},
                      1: {id: 29, name: 'テキスト'},
                  }},
                  6: {id: 6,name: "○ ○ ○", img: "07291157_5d3e60aa4d877.jpg",option:{
                      0: {id: 30, name: 'テキスト'},
                      1: {id: 31, name: 'テキスト'},
                  }},
                  7: {id: 7,name: "○ ○ ○", img: "07291157_5d3e60aa4d877.jpg",option:{
                      0: {id: 32, name: 'テキスト'},
                      1: {id: 33, name: 'テキスト'},
                  }},
              },
              stepActive: [1],
              partsActive: [null,null,null,null,null,null,null,null], //{partID: 0, partDetailId: [15, 16, 17]}
              stepNow: 1,
              partDetailNow: '',
              partDetailIdTemp: '',
              select_type: 1, // select_type:　0:一覧から選択　/ 1: コードから選択
              fabric_selected: "",
              checkCompleteOrder: false,

              //QR Code
              camera: "auto",
              result: null,
              showScanConfirmation: false,
              interval: false
          };
      },
      props: ["kiji_img_path","viewMode","itemData", "orderId","c3CategoryList","c3CategoryId","gender","fabric_id","fabric_list"],
      methods: {
        openDetailOption: function(optionid){
          this.detailOptionActive = optionid
        },
        closeDetailOption: function(){
          this.detailOptionActive = 0
        },
        setKiji: function(data){
          this.kijiData = data
        },
        kijiConfirm: function(kiji_id){
          this.kijiActive = kiji_id
        },
        changeItem: function(){
          //console.log(this.itemActive)
        },


        

          c3CateChange: function (c3CateId) {
              this.$emit("changeCategory", c3CateId);
          },
          changeModeViewAll: function () {
              this.$emit("view-mode", "all");
          },
          changeFabric(id) {
              this.$emit("changeFabric", id);
              this.fabric_selected = id;
          },
          changeFabricConfirmOK(id, event) {
              this.$emit("submitFabric", this.fabric_selected)
              this.stepActive.push(2)
              this.changeStep(1)
              this.popupCancel(event)
              this.partsActive[0] = null 
              this.partsActive[1] = null 
              this.partsActive[2] = null
          },
          partSelect(partId) {
              this.partDetailNow = partId
              this.partDetailIdTemp = this.partsActive[partId]
          },
          submitFabric: function () {
              if (this.fabric_selected != "") {
                  if (this.fabric_selected != this.fabric_id) {
                      //change fabric_id or the fisrt time has order_id
                      if (this.fabric_id != "" || this.orderId ) {
                          $("#simu-popup02").addClass("active");
                      } else {
                          //first time select
                          this.$emit("submitFabric", this.fabric_selected);
                          this.stepActive.push(2);
                          this.changeStep(1);
                      }
                  } else {
                      this.changeStep(1);
                  }
              } else {
                  alert("生地を選択していません。");
              }
          },
          submitMeasureData: function () {
              this.stepActive.push(3);
              this.changeStep(1);
          },
          showFabricDetail(id) {
              this.$emit("showFabricDetail", id);
          },
          changeStep(id) {
              if (this.stepNow == 1 && id == 1) {
                  $("#simu-popup01").addClass("active");
              } else {
                  this.stepNow = id;
              }
          },
          returnStep(step) {
              this.stepNow = 1;
              this.partDetailNow = ''
              this.partDetailIdTemp = ''
          },
          decreaseSize(id) {
              this.measure_data[id].value = this.measure_data[id].value - 1;
          },
          increaseSize(id) {
              this.measure_data[id].value = this.measure_data[id].value + 1;
          },
          changeStyleConfirmOK: function () {
              $("#simu-popup01").removeClass("active");
          },
          popupCancel: function (event) {
              $(event.target).parents(".simu-popup").removeClass("active");
          },
          getOrderDetail(id) {
              if (id) {
                  this.partsActive[0] = 19
                  this.partsActive[1] = 21
                  this.partsActive[2] = 22
                  this.partsActive[3] = 24
                  this.partsActive[4] = 27
                  this.partsActive[5] = 29
                  this.partsActive[6] = 31
                  this.partsActive[7] = 33

                  this.stepActive = [1, 3]
                  this.select_type = 1
                  this.measure_data[0].value = 2;
                  this.measure_data[1].value = 3;
                  this.measure_data[2].value = 4;
                  this.measure_data[3].value = 5;
              } else{
                  this.partsActive[0] = null
                  this.partsActive[1] = null
                  this.partsActive[2] = null
                  this.partsActive[3] = null
                  this.partsActive[4] = null
                  this.partsActive[5] = null
                  this.partsActive[6] = null
                  this.partsActive[7] = null
              }
          },
          changeSelectType(type) {
              this.select_type = type;
          },
          partItemDetailSelect(part_id){
              if(this.partDetailIdTemp == part_id){
                  this.partDetailIdTemp = ''
              } else{
                  this.partDetailIdTemp = part_id
              }
          },
          partItemDetailConfirm(partId, partDetailId){
              if(partDetailId){
                  this.partsActive[partId] = partDetailId
                  this.returnStep(1)
              } else{
                  alert(this.partLists[partId].name+'を選択していません。')
              }
              this.checkCompleteOrderUpdate();
          },
          checkCompleteOrderUpdate(){
              if(this.partsActive.every(function(i) { return i !== null; }) && this.fabric_id != '' && this.stepActive.includes(3)){
                  this.checkCompleteOrder = true
              } else{
                  this.checkCompleteOrder = false
              }
          },
          even: function(min, max, step){
              var length = (max - min) / step + 1;
              return new Array(length).fill(min).map((_, i) => min + i * step)
          },
          mousedownMinus(i){
              if(this.measure_data[i].value > this.measure_data[i].min){
                  this.measure_data[i].value = parseFloat(this.measure_data[i].value) - parseFloat(this.measure_data[i].step)
                  if(!this.interval){
                      this.interval = setInterval(() => this.sizeChange('down', i), 150)	
                  }
              }
          },
          mousedownAdd(i){
              if(this.measure_data[i].value < this.measure_data[i].max){
                  this.measure_data[i].value = parseFloat(this.measure_data[i].value) + parseFloat(this.measure_data[i].step)
                  if(!this.interval){
                      this.interval = setInterval(() => this.sizeChange('up', i), 150)	
                  }
              }
          },
          sizeChange(change, i){
              if(change == 'up' && this.measure_data[i].value < this.measure_data[i].max){
                  this.measure_data[i].value = parseFloat(this.measure_data[i].value) + parseFloat(this.measure_data[i].step)
              }
              if(change == 'down' && this.measure_data[i].value > this.measure_data[i].min){
                  this.measure_data[i].value = parseFloat(this.measure_data[i].value) - parseFloat(this.measure_data[i].step)
              }
          },
          mouseup() {
              clearInterval(this.interval)
              this.interval = false
          },
      },
      mounted() {
        this.itemActive = this.itemData[0].id
      },
      watch: {
          itemActive: function () {
            this.$emit('change-item', this.itemActive)
          },
          stepNow: function () {
              this.$emit("changeStepNow", this.stepNow);
              this.fabric_selected = this.fabric_id;
          },
          fabric_id: function () {
              this.fabric_selected = this.fabric_id;
          },
          checkCompleteOrder: function(){
              this.$emit("check-complete", this.checkCompleteOrder);
          },
          stepActive: function(){
              this.checkCompleteOrderUpdate()
          }

      },
      computed: {
          kijiObjectActive: function(){
            return Object.keys(this.kijiData)
                  .map((key) => this.kijiData[key])
                  .filter((item) => item.id === this.kijiActive)[0]
          },
          showPartCheck: function () {
              if (this.stepNow == 1 && (this.stepActive.includes(2) || this.orderId) && this.partDetailNow === '') {
                      return true;
              }
              return false;
          },
          fabric_code: function(){
              if(this.fabric_id){
                  return Object.keys(this.fabric_list)
                  .map((key) => this.fabric_list[key])
                  .filter((item) => item.product_id === this.fabric_id)[0].product_code;
              }

              return ''
          },
          button_code: function(){
              if(this.partsActive[1] !== null){
                  return "CODE-BUTON001"
              }
              return ''
          },
          pocket_code: function(){
              if(this.partsActive[0] !== null){
                  return "CODE-POCKET001"
              }
              return ''
          },
          ura_code: function(){
              if(this.partsActive[3] !== null){
                  return "CODE-URA001"
              }
              return ''
          },
          size_code: function(){
              if(this.orderId){
                  return "CODE-001"
              }
              return ''
          },
          showPartDetailCheck: function(){
              if(this.partDetailNow !== '' && this.stepNow == 1){
                  return true
              } else{
                  return false
              }
          }
      },
  };
</script>

<style scoped>
    .scan-confirmation {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.8);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
</style>