<template>
  <div class="container-sub-page d-flex justify-content-between flex-column">
    <div class="simuright-sub-name d-flex justify-content-center align-items-center">{{optionParent.name}}選択</div>
    <div class="simuright-sub-content">
      <div class="simuright-sub-contentBox">
        <div class="simuright-sub-nav" v-if="cateLists.length > 0 && optionDetailActive != optionCustomNameID">
          <div class="simuright-sub-searchTop d-flex justify-content- align-items-center">
            <!-- Button Category -->
            <ul class="optionParentList scroll">
              <li class="optionParent"
              v-for="Cate in cateLists" :key="Cate.cate_id"
              :class="{active: cateCurr == Cate.cate_id}"
              @click="changeOptionCategory(Cate.cate_id)"
              >{{Cate.cate_name}}</li>
            </ul>
          </div>
        </div>
        <div class="optionParentCurrent d-flex justify-content-center align-items-center"
          v-if="cateCurrObj && optionDetailActive != optionCustomNameID">
          <span>{{cateCurrObj.cate_name}}</span>
        </div>
        <div class="simuright-sub-result d-flex flex-wrap" v-if="optionDetailActive != optionCustomNameID">
          <div v-for="Option in optionCurrLists" :key="Option.id" class="optionItem"
            :class="{active: (Option.id == optionSelected)}">
            <img :src="option_img_path + Option.img" alt="" class="optionitem-img"
              @click="optionChange(Option.id, Option.simu_img, Option.option_shirt_svg, Option.option_shirt_shadow, optionParent.type)">
            <span class="simuright-option-icon" @click="showOptionDetail(Option.id)">
              <img :src="main_path + 'html/user_data/assets/img/common/icon_info.png'" alt="">
            </span>
            <div class="simuright-option-text" @click="optionChange(Option.id, Option.simu_img, Option.option_shirt_svg, Option.option_shirt_shadow, optionParent.type)">
              <div class="simuright-kiji-text-top d-flex justify-content-between align-items-center">
                <span class="simuright-kiji-code">{{Option.name}}</span><br>
              </div>
              <span class="simuright-kiji-name">
                <span v-if="(optionParent.type == 'button' || optionParent.type == 'uraji') && Option.color_code">C/#{{Option.color_code}}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="simuright-sub-result" v-if="optionDetailActive == optionCustomNameID">
          <div class="option-customname-row option-customname-type">
              <p class="option-customname-title">刺繍ネーム</p>
              <ul class="option-customname-itemList d-flex justify-content-start align-items-center">
                <li v-for="Option in optionCurrLists" :key="Option.id"
                  class="optionItem d-flex justify-content-center align-items-center"
                  :class="{active: (Option.id == optionSelected)}"
                  @click="optionChange(Option.id, Option.simu_img, '', '', optionParent.type)">
                    <span class="option-code">{{Option.name}}</span>
                </li>
              </ul>
          </div>
          <div class="option-customname-row option-customname-color" v-if="optionSelected != optionCustomNameNot">
            <p class="option-customname-title">刺繍糸色</p>
              <ul class="option-customname-itemList d-flex justify-content-start align-items-center">
                <li v-for="Option in optionCustomNameSubLists" :key="Option.id"
                class="optionItem d-flex justify-content-center align-items-center"
                  :class="{active: (Option.id == optionCustomNameSelected)}"
                  @click="optionChangeCustomNameSub(Option.id)">
                    <span class="option-code">{{Option.name}}</span>
                </li>
              </ul>
          </div>
          <div class="option-customname-row option-customname-input justify-content-start align-items-center" v-if="optionSelected != optionCustomNameNot">
            <p class="option-customname-title">ネーム入力</p>
            <p class="option-customname-inputval">
              <!-- <span class="text-alert">※ヤンアルタ14文字/東和10文字/那須8文字まで</span> -->
              <input type="text" placeholder="" :maxlength="getMaxLengthCustomName(facatory_id)" v-model="optionCustomNameText">
            </p>
          </div>

        </div>
      </div>
    </div>
    <div class="simuright-sub-navi d-flex align-items-center">
      <button class="simu-common-btn btnSize02 btnSizeHalf" @click="closeOption">戻る</button>
      <button class="simu-common-btn btnSize02 btnSizeHalf gray" @click="buttonConfirm">決定</button>
    </div>
    <transition name="transitionRightToLeft">
      <div class="simu-subpage" v-if="optionDetailId">
        <OptionDetail 
        :OptionDetailData="OptionDetailData"
        :cateCurrObj="cateCurrObj"
        :optionParent="optionParent"
        @close-detail="closeOptionDetail($event)"
        @option-confirm="confirmOptionDetail($event)"
        />
      </div>
    </transition>
    <transition name="modal">
        <div class="loaddingDataIo" v-if="loaddingOptionData">
          <div class="loadingio-spinner-spinner-482naetb3m">
            <div class="ldio-2vyxc9gibh9">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div>
            </div>
          </div>
        </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OptionDetail from './OptionDetail.vue';

export default {
  name: "SelectOption",
  components: {OptionDetail},
  data() {
    return {
      optionSelected: 0,
      optionDetailId: null,
      cateCurr: null,
      cateLists: [],
      optionLists: {},
      loaddingOptionData: false,

      optionCustomNameSubLists: [],
      optionCustomNameSelected: 0,
      optionCustomNameText: '',
      //刺繍ネームID
      optionCustomNameID: 35,
      optionCustomNameNot: 43,
      //刺繍糸色ID
      optionCustomNameSubParent: 36
    };
  },
  methods: {
    closeOption: function(){
      this.$emit("closeOption")
    },
    closeOptionDetail:function(){
      this.optionDetailId = null
    },
    optionChange: function(id, img, option_shirt_svg, option_shirt_shadow, type){
      if(this.optionSelected == id){
        return false
      } else{
        this.optionSelected = id
        this.$store.dispatch('handleChangeOptionTemp', {option_id: id, option_img: img, option_shirt_svg: option_shirt_svg, option_shirt_shadow: option_shirt_shadow, type: type})
      }
    },
    changeOptionCategory(cate_id){
      if(this.cateCurr == cate_id){
        return false
      } else{
        this.cateCurr = cate_id
      }
    },
    buttonConfirm: function(){
      //普通Option
      if(this.optionDetailActive != this.optionCustomNameID){
        if(this.optionSelected){
          var selectedObj = this.optionDetailData.filter((item) => item.id == this.optionSelected)[0]
          this.$store.dispatch('handleChangeOption', {
            orderId: this.orderId,
            combine_id: this.designActive.combine_id,
            item_id: this.designActive.item_id,
            design_id: this.designActive.design_id,
            parent_id: this.optionDetailActive,
            option_id: this.optionSelected,
            cate_id: (this.cateOfSelectedOption && this.cateLists.find(cate => cate.cate_id == this.cateOfSelectedOption)) ? this.cateOfSelectedOption : null,
            cate_name: (this.cateOfSelectedOption && this.cateLists.find(cate => cate.cate_id == this.cateOfSelectedOption)) ? this.cateLists.find(cate => cate.cate_id == this.cateOfSelectedOption).cate_name : null,
            option_img: selectedObj.simu_img,
            option_shirt_svg: selectedObj.option_shirt_svg,
            option_shirt_shadow: selectedObj.option_shirt_shadow,
            name: selectedObj.name,
            type: this.optionParent.type,
            cost: selectedObj.price
          })
          this.closeOption()
        } else{
          alert('オプションを選択してください')
          return false
        }
      } else{
        //刺繍ネーム
        if(this.optionSelected){
          let selectedObj = this.optionDetailData.filter((item) => item.id == this.optionSelected)[0]
          let optionCustomNameObj = this.optionCustomNameSubLists.find(item => item.id == this.optionCustomNameSelected)
          let reg = new RegExp('^[0-9a-zA-Z.\\s]+$');
          if(this.optionSelected == this.optionCustomNameNot || (this.optionSelected != this.optionCustomNameNot && this.optionCustomNameSelected && this.optionCustomNameText != '' && reg.test(this.optionCustomNameText))){

              this.$store.dispatch('handleChangeOption', {
                  orderId: this.orderId,
                  combine_id: this.designActive.combine_id,
                  item_id: this.designActive.item_id,
                  design_id: this.designActive.design_id,
                  parent_id: this.optionDetailActive,
                  option_id: this.optionSelected,
                  cate_id: null,
                  cate_name: null,
                  option_img: selectedObj.simu_img,
                  name: selectedObj.name,
                  type: this.optionParent.type,
                  cost: selectedObj.price,
                  custom_name_color_id: (this.optionSelected == this.optionCustomNameNot) ? null : (optionCustomNameObj ? optionCustomNameObj.id : null),
                  custom_name_color_name: (this.optionSelected == this.optionCustomNameNot) ? null : (optionCustomNameObj ? optionCustomNameObj.name : null),
                  custom_name_val: (this.optionSelected == this.optionCustomNameNot) ? null : this.optionCustomNameText
                })
              this.closeOption()
          }
          else{
            if(!this.optionCustomNameSelected){
              alert('刺繍糸色を選択してください。')
            } else if(this.optionCustomNameText == ''){
              alert('ネームを入力してください。')
            } else if(!reg.test(this.optionCustomNameText)){
              alert('ネームは英数字で入力してください。')
            }
            return false
          }
        }
        else{
          alert('全てオプションを選択してください')
          return false
        }
      }

    },
    showOptionDetail(id){
      this.optionDetailId = id
    },
    confirmOptionDetail(data){
      this.optionChange(data.id, data.img, data.option_shirt_svg, data.option_shirt_shadow, data.type)
      this.buttonConfirm()
    },
    getOptionData: async function(){
      this.loaddingOptionData = true
      let ret = null
      if(this.modelSelected && this.designActive.design_id && this.optionDetailActive){
        await this.axios.request({
          url: this.main_path + 'myshop/getoptionlist/',
          method: 'post',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: {
            model: this.modelSelected,
            design: this.designActive.design_id,
            parent: this.optionDetailActive
          }
        })
        .then(response => {
          ret = response.data.data
        })
        .catch(error => {
          this.loaddingOptionData = false
          this.$store.dispatch('handleChangeErrorCode', 2)
          console.log(error)
        })
      } 
      return ret
    },
    getOptionCustomNameColor: async function(customname_id){
      let ret = null
      if(this.modelSelected && this.designActive.design_id && this.optionDetailActive){
        await this.axios.request({
          url: this.main_path + 'myshop/getoptionlist/',
          method: 'post',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: {
            model: this.modelSelected,
            design: this.designActive.design_id,
            parent: customname_id
          }
        })
        .then(response => {
          ret = response.data.data
        })
        .catch(error => {
          this.loaddingOptionData = false
          this.$store.dispatch('handleChangeErrorCode', 2)
          console.log(error)
        })
      } 
      return ret
    },
    setOptionCustomNameColor: async function(customname_id){
      await this.getOptionCustomNameColor(customname_id).then(response => {
        if(response){
            this.optionCustomNameSubLists = response.options[customname_id]
            this.$store.dispatch('handleSaveOptionDataLoaded', {
              model_id: this.modelSelected,
              design_id: this.designActive.design_id,
              parent_id: customname_id,
              cateLists: response.cates,
              optionLists: response.options
            })
            this.$store.dispatch('handleUpdateOptionDetailData', response.options)
        }
      })
    },
    setOptionData: async function(){
        await this.getOptionData().then(response => {
          if(response){
            this.optionLists = response.options
            this.cateLists = response.cates
            this.loaddingOptionData = false
            this.$store.dispatch('handleSaveOptionDataLoaded', {
              model_id: this.modelSelected,
              design_id: this.designActive.design_id,
              parent_id: this.optionDetailActive,
              cateLists: this.cateLists,
              optionLists: this.optionLists
            })
            this.$store.dispatch('handleUpdateOptionDetailData', this.optionLists)
          }
        })
    },
    setOptionSelected: function(){
      const optionSelectedIndex = this.optionSelectedData.findIndex(
        (item) => (
            item.orderId == this.orderId &&
            item.combine_id == this.designActive.combine_id && 
            item.item_id == this.designActive.item_id &&
            item.design_id == this.designActive.design_id &&
            item.parent_id == this.optionDetailActive
      ))
      if(optionSelectedIndex !== -1){
        this.optionSelected = this.optionSelectedData[optionSelectedIndex].option_id
        this.cateCurr = this.optionSelectedData[optionSelectedIndex].cate_id
        //刺繍ネーム
        if(this.optionDetailActive == this.optionCustomNameID){
          this.optionCustomNameSelected = this.optionSelectedData[optionSelectedIndex].custom_name_color_id
          this.optionCustomNameText = this.optionSelectedData[optionSelectedIndex].custom_name_val
        }
      }

    },
    optionChangeCustomNameSub(sub_id){
      this.optionCustomNameSelected = sub_id
    },
    getMaxLengthCustomName: function(facatory_id){
      //ヤンアルタ
      if([11].indexOf(facatory_id) !== -1){
        return 14
      } 
      //東和
      else if([8].indexOf(facatory_id) !== -1 ){
        return 10
      }
      //那須 
      else if([10].indexOf(facatory_id) !== -1){
        return 8
      } else{
        return 8
      }
    }
  },
  watch: {
    cateLists: function(){
      if(this.cateLists.length > 0){
        const cateCurrTemp = this.cateLists.findIndex(
          (item) => (item.cate_id == this.cateCurr)
        )
        if(cateCurrTemp == -1){
          this.cateCurr = this.cateLists[0].cate_id
        }
      } else{
        this.cateCurr = null
      }
    }
  },
  props: ['orderId'],
  mounted() {
    //if save loaded data then no download data from api
    if(this.optionDataLoaded){
      const loadedDataIndex = this.optionDataLoaded.findIndex(
        (item) => item.model_id == this.modelSelected
        && item.design_id == this.designActive.design_id
        && item.parent_id == this.optionDetailActive
      )
      if(loadedDataIndex !== -1) {
        this.optionLists = this.optionDataLoaded[loadedDataIndex].optionLists
        this.cateLists = this.optionDataLoaded[loadedDataIndex].cateLists
      } else{
        this.setOptionData()
      }
    } else{
        this.setOptionData()
    }

    if(this.optionDetailActive == this.optionCustomNameID){
      //load 刺繍糸色Data ID = 36
      const loadedCustomNameDataIndex = this.optionDataLoaded.findIndex(
        (item) => item.model_id == this.modelSelected
        && item.design_id == this.designActive.design_id
        && item.parent_id == this.optionCustomNameSubParent
      )
      if(loadedCustomNameDataIndex !== -1) {
        this.optionCustomNameSubLists = this.optionDataLoaded[loadedCustomNameDataIndex].optionLists[this.optionCustomNameSubParent]
      } else{
        this.setOptionCustomNameColor(this.optionCustomNameSubParent)
      }
    }
    this.setOptionSelected()
  },
  computed: {
    ...mapGetters([
      'main_path',
      'option_img_path',
      'modelSelected',
      'designActive',
      'optionSelectedData',
      'optionDetailActive',
      'optionDataLoaded',
      'optionParentData',
      'optionDetailData',
      'orderNowId',
      'itemData'
    ]),
    cateCurrObj: function(){
      if(this.cateLists && this.cateCurr){
        return this.cateLists.filter((item) => item.cate_id == this.cateCurr)[0];
      } else{
        return null
      }
    },
    optionCurrLists: function(){
      if(this.optionLists && this.cateCurr){
        return this.optionLists[this.cateCurr];
      } else{
        return this.optionLists[this.optionDetailActive];
      }
    },
    OptionDetailData: function(){
      return this.optionCurrLists.filter((item) => item.id == this.optionDetailId)[0]
    },
    optionParent: function(){
      var parentLists = this.optionParentData.filter((item) => item.design_id == this.designActive.design_id)[0];
      var parentCurr = parentLists.parentData.filter((item) => item.parent_id == this.optionDetailActive);
      if(parentCurr){
        return parentCurr[0]
      } else{
        return {}
      }
    },
    cateOfSelectedOption: function(){
      let cate_id_val = null
      if(this.optionSelected){
        for (const [key, value] of Object.entries(this.optionLists)) {
          if(value.find(item => item.id == this.optionSelected)){
            cate_id_val = key
          }
        }
      }
      return cate_id_val
    },
    itemDataActive: function(){
      if(this.itemData.length && this.itemData.filter(item => item.orderId == this.orderNowId).length){
        return this.itemData.filter(item => item.orderId == this.orderNowId)[0]
      } else{
        return null
      }
    },
    facatory_id: function(){
      if(this.itemDataActive){
        return this.itemDataActive.factory_id
      } else{
        return 0
      }
    }
  }
};
</script>

<style scoped>
	
</style>


