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
          <template v-for="Option in optionCurrLists">
            <div class="optionItem" :class="{active: Option.id == optionSelected}" :key="Option.id">
              <img v-lazy="option_img_path + Option.img" alt="" class="optionitem-img" @error="imgError"
                @click="optionChange(Option.id, Option.simu_img, Option.option_shirt_svg, Option.option_shirt_shadow, optionParent.type)">
              <span class="simuright-option-icon" @click="showOptionDetail(Option.id)">
                <img :src="main_path + 'html/user_data/assets/img/common/icon_info.png'" alt="">
              </span>
              <div class="simuright-option-text" @click="optionChange(Option.id, Option.simu_img, Option.option_shirt_svg, Option.option_shirt_shadow, optionParent.type)">
                <div class="simuright-kiji-text-top d-flex flex-column justify-content-between">
                  <span class="simuright-kiji-name">{{Option.name}}</span>
                  <span class="simuright-kiji-name">
                    <span v-if="(arrOptionSpecialType.indexOf(optionParent.type) != -1) && Option.color_code">C/#{{Option.color_code}}</span>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="simuright-sub-result" v-if="optionDetailActive == optionCustomNameID">
          <div class="option-customname-row option-customname-type">
              <p class="option-customname-title">刺繍ネーム</p>
              <ul class="option-customname-itemList d-flex justify-content-start align-items-center simu-custom-scroll">
                <li v-for="Option in optionCurrLists" :key="Option.id"
                  class="optionItem d-flex justify-content-center align-items-center"
                  :class="{active: (Option.id == optionSelected)}"
                  @click="optionChange(Option.id, Option.simu_img, '', '', optionParent.type)">
                    <span class="option-code">{{Option.name}}</span>
                </li>
              </ul>
          </div>
          <div class="option-customname-row option-customname-color" v-if="optionSelected != optionCustomNameNot && optionCustomNameSubParent02">
            <p class="option-customname-title">刺繍位置</p>
              <ul class="option-customname-itemList d-flex justify-content-start align-items-center simu-custom-scroll">
                <li v-for="Option in optionCustomNameSubLists02" :key="Option.id"
                class="optionItem d-flex justify-content-center align-items-center"
                  :class="{active: (Option.id == optionCustomNameSelected02)}"
                  @click="optionChangeCustomNameSub02(Option.id)">
                    <span class="option-code">{{Option.name}}</span>
                </li>
              </ul>
          </div>
          <div class="option-customname-row option-customname-color" v-if="optionSelected != optionCustomNameNot">
            <p class="option-customname-title">刺繍糸色</p>
              <ul class="option-customname-itemList d-flex justify-content-start align-items-center simu-custom-scroll">
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
        :arrOptionSpecialType="arrOptionSpecialType"
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
import Mixins from '../mixin/mixin'

export default {
  name: "SelectOption",
  components: {OptionDetail},
  mixins: [Mixins],
  data() {
    return {
      optionSelected: 0,
      optionDetailId: null,
      cateCurr: null,
      cateLists: [],
      optionLists: [],
      loaddingOptionData: false,

      //刺繍ネーム Customize 
      optionCustomNameSubLists: [],
      optionCustomNameSubLists02: [],
      optionCustomNameSelected: 0,
      optionCustomNameSelected02: 0,
      optionCustomNameText: '',

      arrJacketCustomNameFixed: [35, 43, 36], //35: Jacketの刺繍ネーム、43: Jacketの刺繍ネームの無し、36: Jacketの刺繍糸色ID
      //Demo 
      //arrShirtCustomNameFixed: [98, 163, 36, 99], //98: Shirtの刺繍ネーム、163: Shirtの刺繍ネームの無し、36: Shirtの刺繍糸色ID, 99: Shirtの刺繍位置
      //Staging
      arrShirtCustomNameFixed: [98, 184, 100, 99],
      optionCustomNameID: 35, //刺繍ネームID
      optionCustomNameNot: 43, //刺繍ネームの無
      optionCustomNameSubParent: 36, //刺繍糸色ID
      optionCustomNameSubParent02: null, //Shirtの刺繍位置ID

      //ボータン、裏地、胴裏、袖浦のtype fixed
      arrOptionSpecialType: ['button', 'uraji', 'doura', 'sodeura']
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
        if(this.optionSelected && this.optionDetailData.find(item => item.id == this.optionSelected)){
          let selectedObj = this.optionDetailData.find(item => item.id == this.optionSelected)
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
            cost: selectedObj.price,
            glr_kind: selectedObj.glr_kind,
            genre: this.optionParent.genre_id,
            sort_no: this.optionParent.sort_no
          })

          //check is depend on Option and remove if depend_option_id is not selected
          let parentLists = this.optionParentData.find(item => item.design_id == this.designActive.design_id && item.model == this.modelSelected)
          let parentCurr = parentLists.parentData
          let dependOptionParent = parentCurr.find(item => item.depend_parent_id == this.optionDetailActive)
          if(dependOptionParent && dependOptionParent.depend_option_id != this.optionSelected){
            this.$store.dispatch('handleRemoveOptionData', {orderId: this.orderId, combine_id: this.designActive.combine_id, item_id: this.designActive.item_id, design_id: this.designActive.design_id, parent_id: dependOptionParent.parent_id})
          }
          
          this.closeOption()
        } else{
          alert('オプションを選択してください')
          return false
        }
      } else{
        //刺繍ネーム
        if(this.optionSelected && this.optionDetailData.find(item => item.id == this.optionSelected)){
          let selectedObj = this.optionDetailData.find(item => item.id == this.optionSelected)
          let reg = new RegExp('^[0-9a-zA-Z.\\s]+$');
          if(this.optionSelected == this.optionCustomNameNot 
            || (this.optionSelected != this.optionCustomNameNot && !this.optionCustomNameSubParent02 && this.optionCustomNameSelected && this.optionCustomNameText != '' && reg.test(this.optionCustomNameText))
            || (this.optionSelected != this.optionCustomNameNot && this.optionCustomNameSubParent02 && this.optionCustomNameSelected02 && this.optionCustomNameSelected && this.optionCustomNameText != '' && reg.test(this.optionCustomNameText))
          ){

            //刺繡糸色
            let optionCustomNameObj = this.optionCustomNameSubLists.length ? this.optionCustomNameSubLists.find(item => item.id == this.optionCustomNameSelected) : null
            //刺繡位置
            let optionCustomNameObj02 = this.optionCustomNameSubLists02 ? this.optionCustomNameSubLists02.find(item => item.id == this.optionCustomNameSelected02) : null

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
                custom_name_position_id: (this.optionSelected == this.optionCustomNameNot) ? null : (optionCustomNameObj02 ? optionCustomNameObj02.id : null),
                custom_name_potition_name: (this.optionSelected == this.optionCustomNameNot) ? null : (optionCustomNameObj02 ? optionCustomNameObj02.name : null),
                custom_name_val: (this.optionSelected == this.optionCustomNameNot) ? null : this.optionCustomNameText,
                glr_kind: selectedObj.glr_kind,
                genre: this.optionParent.genre_id,
                sort_no: this.optionParent.sort_no
              })
            this.closeOption()
          }
          else{
            if(this.optionCustomNameSubParent02 && !this.optionCustomNameSelected02){
              alert('刺繍糸色を選択してください。')
            } 
            else if(!this.optionCustomNameSelected){
              alert('刺繍糸色を選択してください。')
            } 
            else if(this.optionCustomNameText == ''){
              alert('ネームを入力してください。')
            } 
            else if(!reg.test(this.optionCustomNameText)){
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
    setOptionCustomNameColor02: async function(customname_id){
      await this.getOptionCustomNameColor(customname_id).then(response => {
        if(response){
            this.optionCustomNameSubLists02 = response.options[customname_id]
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
            //sort options, category, check cate has option
            let tempOptionLists = this.mergeAllOption(response.options)
            let tempCateList = response.cates
            if(this.initialData.shop_kind == 2 && this.kijiObj && this.kijiObj.glr_kind){
              tempOptionLists = tempOptionLists.filter(option => (option.glr_kind && option.glr_kind.indexOf(this.kijiObj.glr_kind + '') != -1))
            }
            tempCateList = tempCateList.filter(Cate => tempOptionLists.filter(item => item.cateId == Cate.cate_id).length > 0)
            this.cateLists = tempCateList
            this.optionLists = tempOptionLists

            this.loaddingOptionData = false
            this.$store.dispatch('handleSaveOptionDataLoaded', {
              model_id: this.modelSelected,
              design_id: this.designActive.design_id,
              parent_id: this.optionDetailActive,
              cateLists: response.cates,
              optionLists: response.options
            })
            this.$store.dispatch('handleUpdateOptionDetailData', response.options)
            this.setOptionSelected()
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
          if(this.optionCustomNameSubParent02){
            this.optionCustomNameSelected02 = this.optionSelectedData[optionSelectedIndex].custom_name_position_id
          }
        }
      }

      if(this.optionSelected && this.optionDetailData){
        let selectedObj = this.optionDetailData.find(item => item.id == this.optionSelected)
        if(!selectedObj || (selectedObj && !this.checkOptionItemShow(selectedObj))){
          this.optionSelected = 0
        }
      }
    },
    optionChangeCustomNameSub(sub_id){
      this.optionCustomNameSelected = sub_id
    },
    optionChangeCustomNameSub02(sub_id){
      this.optionCustomNameSelected02 = sub_id
    },
    getMaxLengthCustomName: function(facatory_id){
      //ヤンアルタ
      if([1].indexOf(facatory_id) !== -1){
        return 14
      } 
      //東和
      else if([5].indexOf(facatory_id) !== -1 ){
        return 10
      }
      //那須 
      else if([4].indexOf(facatory_id) !== -1){
        return 8
      } else{
        return 8
      }
    },
    checkOptionItemShow: function(Option){
      if(this.initialData.shop_kind == 2 && this.kijiObj && this.kijiObj.glr_kind){
        if(!Option.glr_kind || (Option.glr_kind && Option.glr_kind.indexOf(this.kijiObj.glr_kind + '') == -1)){
          return false
        }
      }
      return true
    },
    mergeAllOption(optionList){
      let ret = [];
      for (const [key, value] of Object.entries(optionList)) {
        ret.push(...value)
      }
      return ret;
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
    //check is shirt and is custom name option
    //シャツの刺繍位置 fixed
    if(this.optionDetailActive == this.arrShirtCustomNameFixed[0]){
      this.optionCustomNameID = this.arrShirtCustomNameFixed[0],
      this.optionCustomNameNot = this.arrShirtCustomNameFixed[1],
      this.optionCustomNameSubParent = this.arrShirtCustomNameFixed[2]
      this.optionCustomNameSubParent02 = this.arrShirtCustomNameFixed[3]
    }

    //if save loaded data then no download data from api
    if(this.optionDataLoaded){
      const loadedDataIndex = this.optionDataLoaded.findIndex(
        (item) => item.model_id == this.modelSelected
        && item.design_id == this.designActive.design_id
        && item.parent_id == this.optionDetailActive
      )
      if(loadedDataIndex !== -1) {
        let tempOptionLists = this.mergeAllOption(this.optionDataLoaded[loadedDataIndex].optionLists)
        let tempCateList = this.optionDataLoaded[loadedDataIndex].cateLists

        if(this.initialData.shop_kind == 2 && this.kijiObj && this.kijiObj.glr_kind){
          tempOptionLists = tempOptionLists.filter(option => (option.glr_kind && option.glr_kind.indexOf(this.kijiObj.glr_kind + '') != -1))
        }
        tempCateList = tempCateList.filter(Cate => tempOptionLists.filter(item => item.cateId == Cate.cate_id).length > 0)

        this.cateLists = tempCateList
        this.optionLists = tempOptionLists
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

      // Shirtの刺繡位置
      if(this.optionCustomNameSubParent02){
        //load 刺繍糸色Data ID = 36
        const loadedCustomNameDataIndex02 = this.optionDataLoaded.findIndex(
          (item) => item.model_id == this.modelSelected
          && item.design_id == this.designActive.design_id
          && item.parent_id == this.optionCustomNameSubParent02
        )
        if(loadedCustomNameDataIndex02 !== -1) {
          this.optionCustomNameSubLists02 = this.optionDataLoaded[loadedCustomNameDataIndex02].optionLists[this.optionCustomNameSubParent02]
        } else{
          this.setOptionCustomNameColor02(this.optionCustomNameSubParent02)
        }
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
      'itemData',
      'initialData',
      'kijiData',
      'kijiActive'
    ]),
    cateCurrObj: function(){
      if(this.cateLists && this.cateCurr){
        return this.cateLists.find(item => item.cate_id == this.cateCurr);
      } else{
        return null
      }
    },
    optionCurrLists: function(){
      if(this.optionLists && this.cateCurr){
        return this.optionLists.filter(item => item.cateId == this.cateCurr);
      } else{
        return this.optionLists.filter(item => item.cateId == this.optionDetailActive);
      }
    },
    OptionDetailData: function(){
      return this.optionCurrLists.find((item) => item.id == this.optionDetailId)
    },
    optionParent: function(){
      var parentLists = this.optionParentData.find((item) => item.design_id == this.designActive.design_id && item.model == this.modelSelected);
      var parentCurr = parentLists.parentData.find((item) => item.parent_id == this.optionDetailActive);
      if(parentCurr){
        return parentCurr
      } else{
        return {}
      }
    },
    cateOfSelectedOption: function(){
      let cate_id_val = null
      if(this.optionSelected){
        let selectedOptionObj = this.optionLists.find(item => item.id == this.optionSelected)
        if(selectedOptionObj){
          cate_id_val = selectedOptionObj.cateId
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
    },
    kijiObj: function(){
      if(this.kijiData && this.kijiActive){
        return this.kijiData.find(item => item.id == this.kijiActive)
      } else{
        return null
      }
    }
  }
};
</script>

<style scoped>
	
</style>


