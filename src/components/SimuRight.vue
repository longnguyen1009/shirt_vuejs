<template>
    <div class="container-simuright d-flex flex-column">
      <div class="simuright-top d-flex justify-content-between">
        <div class="btn-group" role="group">
          <button class="simuright-modeBtn" :class="{active: optionMode == 1}" @click="changeOptionMode(1)">コードスキャン</button>
          <button class="simuright-modeBtn" :class="{active: optionMode == 2}" @click="changeOptionMode(2)">リストから選択</button>
        </div>
        <select aria-label="select-item" class="form-control" v-model="designActiveId" @change="changeItem($event)">
            <option v-for="(design, id) in designData" :key="id" :value="id">
              {{design.design_label}}
            </option>
        </select>
      </div>
      <div class="simuright-options">
        <div class="simuright-options-content">
          <div class="simuright-options-row">
            <div class="simuright-options-rowTop d-flex optionLv1 align-items-center" :class="{codeMode : (optionMode == 1)}"
              @click="openDetailOption('kiji')">
              <span class="simuright-options-label">生地</span>
              <div class="simuright-options-name">
                <span v-if="kijiActive && kijiObjectActive">{{kijiObjectActive.code}}</span>
              </div>
            </div>
          </div>
          <div class="simuright-options-row" 
            v-for="Genre in genreData" :key="Genre.genre_id">
            <div class="simuright-options-rowTop optionLv1 d-flex align-items-center" @click="showOptionParent($event)">
              <span class="simuright-options-label">{{Genre.genre_name}}</span>
              <div class="simuright-options-name">
                <span v-if="checkAllOptionComplete(Genre.genre_id)"><i class="fas fa-check-double"></i>&nbsp;選択済み</span>
                <span v-if="!checkAllOptionComplete(Genre.genre_id) && checkAction" class="simu-alert"><i class="fas fa-exclamation-triangle"></i>&nbsp;残っています</span>
              </div>
            </div>
            <div class="simuright-options-rowDown">
              <ul class="simuright-optionLists">
                <li class="optionLv2 d-flex align-items-center"
                :class="{codeMode : (optionMode == 1), notComplete: checkOptionNotComplete(Option.parent_id)}"
                v-for="Option in optionParentSortData[Genre.genre_id]" :key="Option.parent_id"
                @click="openDetailOption(Option.parent_id)">
                  <span class="simuright-options-notcomplete simu-alert" v-if="checkOptionNotComplete(Option.parent_id)">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                  <span class="simuright-options-label">{{Option.name}}</span>
                  <div class="simuright-options-name">{{optionSelectedValue(Option.parent_id)}}</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="simuright-options-row" v-if="category_select == shirt_cate">
            <div class="simuright-options-rowTop optionLv1 d-flex align-items-center" @click="showOptionParent($event)">
              <span class="simuright-options-label">ネックサイズ</span>
              <div class="simuright-options-name">
                <span v-if="neckObject && neckObject.name"><i class="fas fa-check-double"></i>&nbsp;{{neckObject.name}}</span>
                <span v-if="checkAction && !neckObject" class="simu-alert"><i class="fas fa-exclamation-triangle"></i>&nbsp;残っています</span>
              </div>
            </div>
            <div class="simuright-options-rowDown simuright-options-sizeDown">
              <div class="simuright-optionLists simuright-optionLists-size">
                <div class="simuright-optionLists-sizeleft">
                  <span v-for="Size in neckSizeData" :key="Size.id">
                    <input class="fancy-radio" hidden :id="'neck-' + Size.id" name="neck" type="radio" :value="Size.id" v-model="neckSelectedValue">
                    <label class="fancy-radio-label" :for="'neck-' + Size.id">
                        <span class="fancy-label--text">{{Size.name}}</span>
                        <span class="fancy-checkbox">
                            <span class="radiobutton-dot"></span>
                        </span>
                    </label>
                  </span>
                  <span v-if="!neckSizeData || neckSizeData.length == 0">サイズがありません</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="simuright-options-row">
            <div class="simuright-options-rowTop optionLv1 d-flex align-items-center" @click="showOptionParent($event)">
              <span class="simuright-options-label">サイズ</span>
              <div class="simuright-options-name">
                <span v-if="sizeItemDataActive.name"><i class="fas fa-check-double"></i>&nbsp;{{sizeItemDataActive.name}}</span>
                <span v-if="!sizeItemDataActive.name && checkAction" class="simu-alert"><i class="fas fa-exclamation-triangle"></i>&nbsp;残っています</span>
              </div>
            </div>
            <div class="simuright-options-rowDown simuright-options-sizeDown">
              <div class="simuright-optionLists simuright-optionLists-size d-flex align-items-center justify-content-between">
                <div class="simuright-optionLists-sizeleft">
                  <span v-for="Size in sizeSortData" :key="Size.id">
                    <input class="fancy-radio" hidden :id="'size-' + Size.id" name="size" type="radio" :value="Size.id" v-model="sizeSelectedValue">
                    <label class="fancy-radio-label" :for="'size-' + Size.id">
                        <span class="fancy-label--text">{{Size.name}}</span>
                        <span class="fancy-checkbox">
                            <span class="radiobutton-dot"></span>
                        </span>
                    </label>
                  </span>
                  <span v-if="sizeSortData.length == 0">サイズがありません</span>
                </div>
                <div class="simuright-optionLists-sizeright">
                  <button type="button" class="simu-common-btn gray btnSize01" @click="changeStepOneMeasure">OneMeasure</button>
                </div>
              </div>
            </div>
          </div>
          <div class="simuright-options-row">
            <div class="simuright-options-rowTop optionLv1 d-flex align-items-center" @click="showOptionParent($event)">
              <span class="simuright-options-label">採寸</span>
              <div class="simuright-options-name">
                <span v-if="checkAllCorrectComplete()"><i class="fas fa-check-double"></i>&nbsp;選択済み</span>
                <span v-if="!checkAllCorrectComplete() && checkAction" class="simu-alert"><i class="fas fa-exclamation-triangle"></i>&nbsp;残っています</span>
              </div>
            </div>
            <div class="simuright-options-rowDown simuright-options-measureDown">
              <ul class="simuright-optionLists">
                <template v-for="correctSelectedItem in correctSelectedDataActive" >
                  <li class="optionLv2 d-flex align-items-center"
                  :class="{notComplete: checkCorrectNotComplete(correctSelectedItem.correct_id)}"
                  v-if="!isNaN(correctSelectedItem.correct_id)"
                  :key="correctSelectedItem.correct_id"
                  @click="showCorrectionDetail(correctSelectedItem.correct_id)">
                    <span class="simuright-options-notcomplete simu-alert" v-if="checkCorrectNotComplete(correctSelectedItem.correct_id)">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                    <span class="simuright-options-label">{{correctSelectedItem.correct_name}}</span>
                    <div class="simuright-options-measureValue">
                      <span v-if="correctSelectedItem.base_val != null">スペック：{{ correctSelectedItem.base_val ? correctSelectedItem.base_val : 0 }}cm</span>
                      <span v-if="correctSelectedItem.correct_detail_id">補正：{{correctSelectedItem.correct_detail_name}}</span>
                      <span v-if="correctSelectedItem.correct_custom_value">({{correctSelectedItem.correct_custom_value}}cm)</span>
                      <span v-if="correctSelectedItem.correct_result != null && correctSelectedItem.correct_detail_id">仕上：{{correctSelectedItem.correct_result}}cm</span>
                    </div>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
        <div class="measure-sub-fade" v-if="correction_selected_id" @click="closeCorrectionDetail"></div>
        
        <transition name="transitionRightToLeftHalfWidth">
          <div class="measure-sub" v-if="correction_selected_id">
            <ul class="measure-sub-list">
              <li class="measure-sub-item" v-for="correctDetailItem in correctDetailActive" :key="correctDetailItem.id">
                <input class="fancy-radio" hidden 
                  :id="'correctDetailItem-' + correctDetailItem.id" 
                  :name="'correctDetailItem' + correction_selected_id" 
                  type="radio" 
                  :value="correctDetailItem.id"
                  v-model="tempCorrectDetailId"
                >
                <label class="fancy-radio-label" :for="'correctDetailItem-' + correctDetailItem.id">
                    <span class="fancy-label--text">{{correctDetailItem.text}}</span>
                    <span class="fancy-radiobutton">
                        <span class="radiobutton-dot"></span>
                    </span>
                </label>
              </li>
            </ul>
            <div class="matashita-correct-input" v-if="hasCorrectCustom && tempCorrectDetailId">
              <input type="text" v-model="correctCustomValue"><br>
              <span v-if="correctCustomError">数字で入力してください</span>
              <span class="simu-common-btn btnSize01" @click="correctCustomConfirm">決定</span>
            </div>
            <div class="loaddingDataIo" v-if="loaddingDataCorrectDetail">
              <div class="loadingio-spinner-spinner-482naetb3m">
                <div class="ldio-2vyxc9gibh9">
                  <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                  <div></div><div></div><div></div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="simuright-price d-flex justify-content-between">
          <div class="simuright-price-left d-flex justify-content-between flex-column">
            <p class="simuright-prices-basic">商品価格：<span v-if="combinePrice">{{moneyTypeShow02(combinePrice, 'tax')}}</span><br>
            <span v-if="initialData.shop_kind == 2">+ カスタマイズ価格：<span v-if="optionPrice > 0">{{moneyTypeShow02(optionPrice, 'tax')}}</span></span></p>
            <p class="simuright-prices-total">お支払い金額: <span class="totalPayment"><span v-if="sumPayment > 0">{{moneyTypeShow02(sumPayment, 'tax')}}</span></span></p>
          </div>
          <div class="simuright-price-right d-flex justify-content-between flex-column">
            <p class="delivery-date"><span v-if="deli_date">仕上がり予定日：{{deli_date}}</span></p>
            <div class="simu-nav-confirm d-flex justify-content-between">
              <button type="button" class="simu-common-btn btnSize01" @click="doBack">戻る</button>
              <button type="button" class="simu-common-btn btnSize01 gray" @click="doOrderComfirm">決定</button>
            </div>
          </div>
      </div>

      <transition name="modal">
        <div class="modal-mask" v-if="doBackShowModal">
          <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-body center">
                  <span class="order-confirm-question">現在作成中のデータが消去されますがよろしいですか？</span>
                </div>
                <div class="modal-footer justify-content-center">
                  <slot name="footer">
                    <button class="simu-common-btn btnSize02 btnSizeHalf" @click="doBackShowModal = false">いええ</button>
                    <button class="simu-common-btn btnSize02 btnSizeHalf gray" @click="doBackConfirm">はい</button>
                  </slot>
                </div>
            </div>
          </div>
        </div>
      </transition>

      <transition name="transitionRightToLeft">
        <div class="simuright-sub" 
          v-if="optionDetailActive">
          <SelectKiji
            v-if="optionDetailActive == 'kiji'"
            @closeOption="closeDetailOption($event)"
          />
          <SelectOption
            v-if="optionDetailActive != 'kiji'"
            :orderId="orderNowId"
            @closeOption="closeDetailOption($event)"
          />
        </div>
      </transition>

    </div>
</template>

<script>

import SelectKiji from "../components/SelectKiji.vue"
import SelectOption from "../components/SelectOption.vue"
import { mapGetters } from 'vuex'
import Mixins from '../mixin/mixin'


export default {
    name: "SimuRight",
    components: {SelectKiji, SelectOption},
    mixins: [Mixins],
    data() {
        return {
          default_kiji: '/html/upload/save_image/0730151143_6103981fcfa43.jpeg',
          designActiveId: null,
          sizeSelectedValue: null,
          neckSelectedValue: null,

          optionParentDataTemp: {},
          genreData: {},

          //刺繍ネームID
          optionCustomNameID: 35,

          correctFixedData: [
            {
              design_id: 16,
              fixedData: [
                {name: '着丈', column_name: 'sh_kitake'},
                {name: 'ネック', column_name: 'sh_kneck'},
                {name: '袖丈 (右)', column_name: 'sh_yukitake_right'},
                {name: '袖口幅 (右)', column_name: 'sh_sodeguchi_right'},
                {name: '肩幅', column_name: 'sh_katahaba'},
                {name: 'ウェスト', column_name: 'sh_west'},
                {name: '袖丈 (左)', column_name: 'sh_yukitake_left'},
                {name: '袖口幅 (左)', column_name: 'sh_sodeguchi_left'},
              ],
              fixedMeasureData: [
                {name: '1 Measure (胸囲)', column_name_val1: 'onem_sh_kyoui_under', column_name_val2: 'onem_sh_kyoui_upper'},
                {name: '1 Measure (ネック寸)', column_name_val1: 'onem_sh_kneck_under', column_name_val2: 'onem_sh_kneck_upper'}
              ]
            },
            {
              design_id: 15, 
              fixedData: [
                {name: '着丈', column_name: 'sh_kitake'},
                {name: 'ネック', column_name: 'sh_kneck'},
                {name: '袖丈 (右)', column_name: 'sh_yukitake_right'},
                {name: '袖口幅 (右)', column_name: 'sh_sodeguchi_right'},
                {name: '肩幅', column_name: 'sh_katahaba'},
                {name: 'ウェスト', column_name: 'sh_west'},
                {name: '袖丈 (左)', column_name: 'sh_yukitake_left'},
                {name: '袖口幅 (左)', column_name: 'sh_sodeguchi_left'},
              ],
              fixedMeasureData: [
                {name: '1 Measure (胸囲)', column_name_val1: 'onem_sh_kyoui_under', column_name_val2: 'onem_sh_kyoui_upper'},
                {name: '1 Measure (ネック寸)', column_name_val1: 'onem_sh_kneck_under', column_name_val2: 'onem_sh_kneck_upper'}
              ]
            },
            {
              design_id: 13,
                fixedData: [
                {name: '着丈', column_name: 'jk_kitake'},
                {name: '肩幅', column_name: 'jk_katahaba'},
                {name: '袖丈 (右)', column_name: 'jk_yukitake_right'},
                {name: 'ウェスト', column_name: 'jk_west'},
                {name: '袖丈 (左)', column_name: 'jk_yukitake_left'}
              ],
              fixedMeasureData: [
                {name: '1 Measure (胸囲)', column_name_val1: 'onem_jk_kyoui_under', column_name_val2: 'onem_jk_kyoui_upper'},
                {name: '1 Measure (ウェスト)', column_name_val1: 'onem_jk_west_under', column_name_val2: 'onem_jk_west_upper'}
              ]
            },
            {
              design_id: 14,
              fixedData: [
                {name: '着丈', column_name: 'jk_kitake'},
                {name: '肩幅', column_name: 'jk_katahaba'},
                {name: '袖丈 (右)', column_name: 'jk_yukitake_right'},
                {name: 'ウェスト', column_name: 'jk_west'},
                {name: '袖丈 (左)', column_name: 'jk_yukitake_left'}
              ],
              fixedMeasureData: [
                {name: '1 Measure (胸囲)', column_name_val1: 'onem_jk_kyoui_under', column_name_val2: 'onem_jk_kyoui_upper'},
                {name: '1 Measure (ネック寸)', column_name_val1: 'onem_jk_west_under', column_name_val2: 'onem_jk_west_upper'}
              ]
            },
            {
              design_id: 6,
              fixedData: [
                {name: 'ウェスト', column_name: 'pt_west'},
                {name: 'ヒップ', column_name: 'pt_hip'}
              ],
              fixedMeasureData: [
                {name: '1 Measure (ヒップ)', column_name_val1: 'onem_pt_hip_under', column_name_val2: 'onem_pt_hip_upper'},
                {name: '1 Measure (ウェスト)', column_name_val1: 'onem_pt_west_under', column_name_val2: 'onem_pt_west_upper'}
              ]
            },
            {
              design_id: 9,
              fixedData: [
                {name: '着丈', column_name: 'vt_kitake'},
                {name: 'ウェスト', column_name: 'vt_west'},
                {name: '肩幅', column_name: 'vt_katahaba'}
              ],
              fixedMeasureData: [
                {name: '1 Measure (胸囲)', column_name_val1: 'onem_vt_kyoui_under', column_name_val2: 'onem_vt_kyoui_upper'},
                {name: '1 Measure (ウェスト)', column_name_val1: 'onem_vt_west_under', column_name_val2: 'onem_vt_west_upper'}
              ]
            },
          ],
          correction_selected_id: 0,
          tempCorrectDetailId: null,
          loaddingDataCorrectDetail: false,
          deli_date: '',

          shirt_cate: 14,
          doBackShowModal: false,

          // checkStatus
          checkAction: false,
          correctCustomValue: '',
          //パンツのカスタマイズ:袖丈[右]、袖丈[左]
          correctCustomArr :[25, 26],
          correctCustomError: false
        }
    },
    props: [],
    methods: {
      doBack(){
        this.doBackShowModal = true
      },
      doBackConfirm(){
        this.$store.dispatch('handleChangeStep', 1)
        this.$store.dispatch('handleChangePage', 2)
        this.$store.dispatch('handleChangeModelTemp', {styleId: this.styleSelected, modelId: this.modelSelected})
      },
      openDetailOption: function(optionid){
        this.$store.dispatch('handleChangeOptionDetailActive', optionid)
      },
      closeDetailOption: function(){
        this.$store.dispatch('handleChangeOptionDetailActive', null)
        //update simulator model
        //option
        this.$store.dispatch('handleChangeOptionTemp', null)

        //kiji
        if(!this.kijiActive){
          $('.kiji_preloader img').attr('src', this.default_kiji)
          $('.kiji_preloader img').attr('kiji-id', '')
        }
        if(this.kijiActive && this.kijiActive != $('.kiji_preloader img').attr('kiji-id')){
          $('.kiji_preloader img').attr('src', this.kiji_img_path + this.kijiObjectActive.img_simu)
          $('.kiji_preloader img').attr('kiji-id', this.kijiActive)
        }
      },
      changeItem: function(){
        // this.$store.dispatch('handleChangeDesign', this.designActiveSplit())
      },
      //Promise to fetch Kiji
      getKijiFromAPI: async function(){
        let ret = null
        await this.axios.request({
          url: this.main_path + 'myshop/getkijilist/',
          method: 'get',
          headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
        .then(response => {
          // console.log(response)
          ret = response.data.data
        })
        .catch(error => {
          this.$store.dispatch('handleChangeErrorCode', 2)
          console.log(error)
        })
        return ret
      },
      setKijiData: async function(){
        await this.getKijiFromAPI().then(response => {
          if(response){
            this.$store.dispatch('handleChangeKijiData', response)
          }
        })
      },
      getItemData: async function(){
        this.$store.dispatch('handleChangeLoaddingData', true)
        let ret = null
        if(this.itemSelected){
          await this.axios.request({
            url: this.main_path + 'myshop/getitem/',
            method: 'post',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: {
              'items' : this.itemSelected,
              'model' : this.modelSelected,
              'style' : this.styleSelected,
              'category' : this.category_select
            }
          })
          .then(response => {
            console.log(response.data.data)
            ret = response.data.data
          })
          .catch(error => {
            this.$store.dispatch('handleChangeLoaddingData', false)
            this.$store.dispatch('handleChangeErrorCode', 2)
            console.log(error)
          })
        }
        return ret
      },
      setItemData: async function(){
        await this.getItemData().then(response => {
          if(response){
            this.$store.dispatch('handleChangeItemData', {
              orderId: this.orderNowId,
              items: response.items,
              design: response.design,
              stock: response.stock,
              stock_design: response.stock_design,
              size: response.size,
              necksize: response.necksize,
              correction: response.correction,
              factory_id: response.factory_id
            })
            this.$store.dispatch('handleChangeLoaddingData', false)
          }
        })
      },
      getOptionParentData: async function(){
        let ret = null
        if(this.designActive.design_id){
          await this.axios.request({
            url: this.main_path + 'myshop/getoptionparent/',
            method: 'post',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: {
              'design_id': this.designActive.design_id 
            }
          })
            .then(response => {
              console.log(response.data.data)
              ret = response.data.data
            })
            .catch(error => {
              this.$store.dispatch('handleChangeErrorCode', 2)
              console.log(error)
            })
        } 
        return ret
      },
      updateOptionParent: async function(){
        await this.getOptionParentData().then(response => {
          if(response){
            this.genreData = response.genreData
            this.optionParentDataTemp = response.optionData
            this.$store.dispatch('handleChangeOptionParentData', 
              {design_id: this.designActive.design_id, genreData: this.genreData, parentData: this.optionParentDataTemp}
            )
          }
        })
      },
      showOptionParent(event){
        $(event.target).parents('.simuright-options-row').toggleClass('show')
      },
      optionSelectedValue(parent_id){
        var option_selected_index = this.optionSelectedData.findIndex(
            (item) => item.orderId == this.orderNowId &&
                      item.combine_id == this.designActive.combine_id &&
                      item.item_id == this.designActive.item_id &&
                      item.design_id == this.designActive.design_id &&
                      item.parent_id == parent_id
          )
        if(option_selected_index !== -1){
          let ret = ''
          if(this.optionSelectedData[option_selected_index].cate_name){
            ret += this.optionSelectedData[option_selected_index].cate_name + '/'
          }
          ret += this.optionSelectedData[option_selected_index].name

          if(parent_id == this.optionCustomNameID){
            if(this.optionSelectedData[option_selected_index].custom_name_color_id){
              ret += '/' + this.optionSelectedData[option_selected_index].custom_name_color_name
                    + '/' + this.optionSelectedData[option_selected_index].custom_name_val
            }
          }
          return ret
        }
        return ''
      },
      doOrderComfirm(){
        console.log(this.orderTempItem)
        if(!this.kijiActive){
          alert('生地を選択してください。')
        }
        else if(!this.initialData.customer_id){
          alert('HC番号をを設定ください。')
        } 
        else if(this.sizeSelectedCheck.length){
          this.checkAction = true
          console.log(this.sizeSelectedCheck)
          alert('選択ものが残っています。')
        } 
        else if(this.allOptionSelectedCheck.length){
          this.checkAction = true
          console.log(this.allOptionSelectedCheck)
          alert('選択ものが残っています。')
        } 
        else if(this.allCorrectSelectedCheck.length){
          this.checkAction = true
          console.log(this.allCorrectSelectedCheck)
          alert('選択ものが残っています。')
        } 
        else if(this.category_select == this.shirt_cate && !this.neckSelectedValue){
          this.checkAction = true
          alert('選択ものが残っています。')
        } 
        else{
          this.checkAction = false
          this.$store.dispatch('handleChangeStep', 3)
        }
      },
      getPriceFromApi: async function(combine_id){
        let ret = null
        if(combine_id && this.modelSelected){
          await this.axios.request({
            url: this.main_path + 'myshop/getpriceofcombine/',
            method: 'post',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: {
              'model': this.modelSelected,
              'combineId': combine_id
            }
          })
            .then(response => {
              console.log(response.data.data)
              ret = response.data.data
            })
            .catch(error => {
              this.$store.dispatch('handleChangeErrorCode', 2)
              console.log(error)
            })
        }
        return ret
      },
      updatePriceCombine: async function(combine_id){
        await this.getPriceFromApi(combine_id).then(response => {
          if(response){
            this.$store.dispatch('handleUpdateCombinePrice', response)
          }
        })
      },

      getCorrectionDetailDataFromApi: async function(correctId){
        this.loaddingDataCorrectDetail = true
        let ret = null
        if(correctId){
          await this.axios.request({
            url: this.main_path + 'myshop/getcorrectiondetail/',
            method: 'post',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: {
              'correction_id': correctId
            }
          })
          .then(response => {
            ret = response.data.data
            this.loaddingDataCorrectDetail = false
          })
          .catch(error => {
            this.loaddingDataCorrectDetail = false
            this.$store.dispatch('handleChangeErrorCode', 2)
            console.log(error)
          })
        }
        return ret
      },

      getCorrectionDetailData: async function(correctId){
        await this.getCorrectionDetailDataFromApi(correctId).then(response => {
          if(response){
            this.$store.dispatch('handleUpdateCorrectionDetailData', {correct_id: correctId, detail_data: response})
          }
        })
      },
      showCorrectionDetail: function(correct_id){
        this.correction_selected_id = correct_id
        let correctDetailIndexNow = this.correctSelectedDataActive.findIndex(item => (
          item.order_id == this.orderNowId
          && item.design_id == this.designActive.design_id
          && item.size_id == this.sizeItemDataActive.id
          && item.correct_id == this.correction_selected_id
        ))
        if(correctDetailIndexNow !== -1){
          this.tempCorrectDetailId = this.correctSelectedDataActive[correctDetailIndexNow].correct_detail_id
          if(this.hasCorrectCustom){
            this.correctCustomValue = this.correctSelectedDataActive[correctDetailIndexNow].correct_custom_value ? this.correctSelectedDataActive[correctDetailIndexNow].correct_custom_value : ''
          }
        } else{
          this.tempCorrectDetailId = null
        }
      },
      changeOptionMode(mode){
        if(this.optionMode == mode){
          return false
        } else{
          this.$store.dispatch('handleChangeOptionMode', mode)
        }
      },
      closeCorrectionDetail : function(){
        if(!this.hasCorrectCustom){
          this.correction_selected_id = 0
        } else{
          return false
        }
      },
      changeStepOneMeasure: function(){
        $('.container-onemeasure').addClass('show')
        this.$store.dispatch('handleChangeStep', 'onemeasure')
      },
      getDeliverySchedule: async function(){
        let ret = null
        if(Object.keys(this.kijiObjectActive).length > 0){
          await this.axios.request({
            url: this.main_path + 'myshop/getdeliveryscheduledate/',
            method: 'post',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: {
              'shop_kind': this.initialData.shop_kind,
              'category': this.category_select,
              'style': this.styleSelected,
              'kiji_kind': this.kijiObjectActive.kiji_kind_id
            }
          })
          .then(response => {
            ret = response.data.data
          })
          .catch(error => {
            console.log(error)
          })
        }
        return ret
      },
      updateDeliverySchedule: async function(){
        await this.getDeliverySchedule().then(response => {
            this.deli_date = response
        })
      },
      checkAllOptionComplete: function(genre_id){
        let ret = this.optionParentSortData[genre_id].filter(item => 
            this.allOptionSelectedCheck.findIndex(item2 => 
              item2.design_id == this.designActive.design_id 
              && item2.item_id == this.designActive.item_id 
              && item2.parent_id == item.parent_id) !== -1)

        return ret.length ? false : true
      },
      checkAllCorrectComplete: function(){
        let ret = false
        if(this.sizeSelectedValue){
          let sortArr = this.allCorrectSelectedCheck.filter(item => 
            item.design_id == this.designActive.design_id
            && item.item_id == this.designActive.item_id
          )
          if(!sortArr.length){
            ret = true
          }
        }
        return ret
      },
      correctCustomConfirm: function(){
        if(this.tempCorrectDetailId){
            let tempCorrectDetailIndex = this.correctDetailActive.findIndex(item => item.id == this.tempCorrectDetailId)
            let correctDetailIndexNow = this.correctSelectedDataActive.findIndex(item => (
              item.order_id == this.orderNowId
              && item.design_id == this.designActive.design_id
              && item.size_id == this.sizeItemDataActive.id
              && item.correct_id == this.correction_selected_id
            ))

            if(tempCorrectDetailIndex !== -1 && correctDetailIndexNow !== -1){
              let tempCorrectDetailItem = this.correctDetailActive[tempCorrectDetailIndex]
              let tempCorrectionItem = this.correctSelectedDataActive[correctDetailIndexNow]
              tempCorrectionItem['correct_detail_id'] = tempCorrectDetailItem.id
              tempCorrectionItem['correct_detail_name'] = tempCorrectDetailItem.text
              tempCorrectionItem['correct_detail_val'] = tempCorrectDetailItem.value
              tempCorrectionItem['code'] = tempCorrectDetailItem.code
              
              if(tempCorrectionItem['base_val'] == null) {
                tempCorrectionItem['correct_result'] = null
              } else{
                  if(tempCorrectDetailItem.value < 0){
                      tempCorrectionItem['correct_result'] = eval(tempCorrectionItem['base_val'] + tempCorrectDetailItem.value)
                  } else if(tempCorrectDetailItem.value > 0){
                    tempCorrectionItem['correct_result'] = eval(tempCorrectionItem['base_val'] + '+' + tempCorrectDetailItem.value)
                  } else{
                    tempCorrectionItem['correct_result'] = tempCorrectionItem['base_val']
                  }
              }
              if(tempCorrectDetailItem.text.includes('無し')){
                this.correction_selected_id = 0
              } else{
                if(this.correctCustomValue != '' && !isNaN(this.correctCustomValue) && this.correctCustomValue > 0){
                  console.log(this.correctCustomValue)
                  tempCorrectionItem['correct_custom_value'] = this.correctCustomValue 
                  this.$store.dispatch('handleUpdateCorrectSelectedData', [tempCorrectionItem])
                  this.correction_selected_id = 0
                  this.correctCustomError = false
                }
                else{
                  this.correctCustomError = true
                }
              }
            }
        }
      },
      checkOptionNotComplete: function(option_parent_id){
        if(this.checkAction && this.allOptionSelectedCheck.findIndex(item => item.design_id == this.designActive.design_id 
          && item.item_id == this.designActive.item_id 
          && item.parent_id == option_parent_id) !== -1
        ){
          return true
        } else{
          return false
        }
      },
      checkCorrectNotComplete: function(correct_id){
        if(this.checkAction && this.allCorrectSelectedCheck.findIndex(item => item.design_id == this.designActive.design_id
          && item.item_id == this.designActive.item_id
          && item.correct_id == correct_id) !== -1){
            return true
          } else{
            return false
          }
      }
    },
    mounted() {
      this.$store.dispatch('handleChangeOptionDetailActive', null)
      this.designActiveId = 0
      this.setKijiData()

      //Hide Cart button
      $('.header-cart-btn').css("display", "block");

      if(this.kijiActive){
        this.updateDeliverySchedule()
      } 
      // else{
      //   let deli_date_temp = new Date(new Date().getTime()+(30*24*60*60*1000));
      //   this.deli_date = deli_date_temp.getFullYear()+'年'+(deli_date_temp.getMonth() + 1) +'月'+deli_date_temp.getDate()+'日'
      // }
      if(this.kijiActive && this.kijiData.length && !(this.kijiData.find(item => item.id == this.kijiActive))){
        this.$store.dispatch('handleChangeKiji', null)
      }
      
    },
    watch: {
      designActiveSplit: function(){
        this.$store.dispatch('handleChangeDesign', this.designActiveSplit)
      },
      designActive: function(){
        //remove option show menu
        $('.simuright-options-row').removeClass('show')
        this.correction_selected_id = 0
        this.tempCorrectDetailId = null

        let optionParentIndex = this.optionParentData.findIndex(
          (item) => item.design_id == this.designActive.design_id
        )
        if(optionParentIndex !== -1){
          this.genreData = this.optionParentData[optionParentIndex].genreData
          this.optionParentDataTemp = this.optionParentData[optionParentIndex].parentData
        } else{
          this.updateOptionParent()
        }

        let sizeSelectedIndex = this.sizeSelectedData.findIndex(item => item.orderId == this.orderNowId 
          && item.design == this.designActive.design_id 
          && item.item == this.designActive.item_id)
        //set initial value size
        if(this.sizeSortData.length){
          if(sizeSelectedIndex !== -1){
            this.sizeSelectedValue = this.sizeSelectedData[sizeSelectedIndex].id
          } else{
            // this.sizeSelectedValue = this.sizeSortData[0].id // begin no select size
            this.sizeSelectedValue = null
          }
        } else{
          this.sizeSelectedValue = null
        }

        //set initial value neck size
        if(this.neckSelectedData.length && this.neckSelectedData.findIndex(item => item.orderId == this.orderNowId) !== -1){
          this.neckSelectedValue = this.neckSelectedData.find(item => item.orderId == this.orderNowId).id
        } else{
          this.neckSelectedValue = null
        }

      },
      itemCombineObj: function(){
        this.$store.dispatch('handleChangeCombineActive', this.itemCombineObj.id)
        if(this.combinePriceData.findIndex(item => item.model == this.modelSelected && item.combineId == this.itemCombineObj.id) == -1){
          this.updatePriceCombine(this.itemCombineObj.id)
        }
      },
      sizeSelectedValue: function(){
        //update size selected data
        if(this.sizeSortData.length){
          this.$store.dispatch('handleUpdateSizeSelectedData', {
            orderId: this.orderNowId,
            design: this.designActive.design_id,
            item: this.designActive.item_id,
            ...this.sizeSortData.find(item => item.id == this.sizeSelectedValue)
          })
        }
        //update correct selected data
        if(this.initialCorrectionData.length){
          this.$store.dispatch('handleUpdateCorrectSelectedDataBySize', this.initialCorrectionData)
        }
        //update stock selected data
        if(this.stockSelectedDataNow.stock_design == this.designActive.design_id){
          this.$store.dispatch('handleUpdateStockSelectedData', null)
        }
        console.log(this.stockSelectedDataNow)
      },
      neckSelectedValue: function(){
        if(this.neckSelectedValue && this.neckSizeData.findIndex(item => item.id == this.neckSelectedValue) !== -1){
          let neckObject = this.neckSizeData.find(item => item.id == this.neckSelectedValue)
          this.$store.dispatch('handleUpdateNeckSelectedData', 
            {orderId: this.orderNowId, id: neckObject.id, name: neckObject.name}
          )
        }
      },

      correction_selected_id: function(){
        if(this.correction_selected_id && this.correctDetailData.findIndex(item => item.correct_id == this.correction_selected_id) == -1){
          this.getCorrectionDetailData(this.correction_selected_id)
        }
        this.$store.dispatch('handleChangeCorrectionSelectedId', this.correction_selected_id)
        this.correctCustomError = false
      },
      //correct detail change
      tempCorrectDetailId: function(newval, oldval){

        let tempCorrectDetailIndex = this.correctDetailActive.findIndex(item => item.id == this.tempCorrectDetailId)
        let correctDetailIndexNow = this.correctSelectedDataActive.findIndex(item => (
          item.order_id == this.orderNowId
          && item.design_id == this.designActive.design_id
          && item.size_id == this.sizeItemDataActive.id
          && item.correct_id == this.correction_selected_id
        ))

        if(tempCorrectDetailIndex !== -1 && correctDetailIndexNow !== -1){
          let tempCorrectDetailItem = this.correctDetailActive[tempCorrectDetailIndex]
          let tempCorrectionItem = this.correctSelectedDataActive[correctDetailIndexNow]
          tempCorrectionItem['correct_detail_id'] = tempCorrectDetailItem.id
          tempCorrectionItem['correct_detail_name'] = tempCorrectDetailItem.text
          tempCorrectionItem['correct_detail_val'] = tempCorrectDetailItem.value
          tempCorrectionItem['code'] = tempCorrectDetailItem.code
          
          if(tempCorrectionItem['base_val'] == null) {
            tempCorrectionItem['correct_result'] = null
          } else{
              if(tempCorrectDetailItem.value < 0){
                  tempCorrectionItem['correct_result'] = eval(tempCorrectionItem['base_val'] + tempCorrectDetailItem.value)
              } else if(tempCorrectDetailItem.value > 0){
                tempCorrectionItem['correct_result'] = eval(tempCorrectionItem['base_val'] + '+' + tempCorrectDetailItem.value)
              } else{
                tempCorrectionItem['correct_result'] = tempCorrectionItem['base_val']
              }
          }

          if(!this.hasCorrectCustom){
            this.$store.dispatch('handleUpdateCorrectSelectedData', [tempCorrectionItem])
          } else{
            tempCorrectionItem['correct_custom_value'] = null
            if(tempCorrectDetailItem.text.includes('無し')){
              this.$store.dispatch('handleUpdateCorrectSelectedData', [tempCorrectionItem])
            }
          }
        }

        if(!this.hasCorrectCustom){
          if(tempCorrectDetailIndex != -1 && (oldval == null || this.correctDetailActive.findIndex(item => item.id == oldval) != -1)){
            this.correction_selected_id = 0
          }
        } else if(tempCorrectDetailIndex != -1){
          let tempCorrectDetailItem2 = this.correctDetailActive[tempCorrectDetailIndex]
          if(tempCorrectDetailItem2.text.includes('無し')){
            this.correction_selected_id = 0
          }
        }
      },
      kijiActive: function(){
        this.updateDeliverySchedule()
      }
    },
    computed: {
      ...mapGetters([
        'main_path',
        'kiji_img_path',
        'option_img_path',
        'initialData',
        'optionMode',
        'styleSelected',
        'modelSelected',
        'itemSelected',
        'designActive',
        'kijiActive',
        'optionDetailActive',
        'optionSelectedData',
        'optionDataLoaded',
        'kijiData',
        'optionParentData',
        'itemData',
        'loaddingData',
        'orderNowId',
        'combinePriceData',
        'combineIdActive',
        'sizeSelectedData',
        'correctDetailData',
        'correctSelectedData',
        'stockSelectedData',
        'category_select',
        'orderTempItem',
        'neckSelectedData'
      ]),
      kijiObjectActive: function(){
        if(this.kijiData.length && this.kijiData.findIndex((item) => item.id === this.kijiActive) !== -1){
          let KijiTemp = this.kijiData.find(item => item.id === this.kijiActive)
          let styleIndex = KijiTemp.style.findIndex(item => item.style_id == this.styleSelected)
          if(styleIndex !== -1){
            KijiTemp.rank = KijiTemp.style[styleIndex].rank
          } else{
            KijiTemp.rank = 0
          }
          return KijiTemp
        } else{
          return {}
        }
      },
      designActiveSplit: function(){
        if(this.designData && this.designActiveId != null){
          return {
            combine_id: this.designData[this.designActiveId].combine_id,
            item_id: this.designData[this.designActiveId].item_id,
            design_id: this.designData[this.designActiveId].design_id
          }
        } else{
          return {}
        }
      },
      optionPrice: function(){
        let optionTotalprice = 0
        if(this.initialData.shop_kind == 2){
          this.optionSelectedData.filter(item => item.orderId == this.orderNowId).forEach(val => {
            optionTotalprice += Number(val.cost ? val.cost : 0);
          })
        }
        return optionTotalprice
      },
      sumPayment: function(){
        return this.combinePrice + this.optionPrice
      },
      optionParentSortData: function(){
        let parentSortData = []
        if(this.genreData && this.optionParentDataTemp){
          for (const genre_index in this.genreData){
            parentSortData[this.genreData[genre_index].genre_id] = this.optionParentDataTemp.filter(
              (item) => item.genre_id === this.genreData[genre_index].genre_id
            )
          }
          return parentSortData
        } else{
          return []
        }
      },
      itemDataActive: function(){
        if(this.itemData.length && this.itemData.filter(item => item.orderId == this.orderNowId).length){
          return this.itemData.filter(item => item.orderId == this.orderNowId)[0]
        } else{
          return null
        }
      },
      itemCombineObj: function(){
        if(this.itemDataActive){
          return this.itemDataActive.items
        } else{
          return {}
        }
      },
      designData: function(){
        if(this.itemDataActive){
          return this.itemDataActive.design
        } else{
          return null
        }
      },
      //size
      sizeData: function(){
        if(this.itemDataActive){
          return this.itemDataActive.size
        } else{
          return null
        }
      },
      neckSizeData: function(){
        if(this.itemDataActive){
          return this.itemDataActive.necksize
        } else{
          return null
        }
      },
      sizeSortData: function(){
        if(this.sizeData){
          return this.sizeData.filter(item => item.design == this.designActive.design_id)
        } else{
          return []
        }
      },
      sizeItemDataActive: function(){
        if(this.sizeSortData && this.sizeSelectedValue){
          return this.sizeSortData.find(item => item.id == this.sizeSelectedValue)
        } else{
          return {}
        }
      },

      //calculateIniCorrectionData
      initialCorrectionData: function(){
        let initCorrectedData = []
        let hasCorrectedData = this.correctSelectedData.findIndex(item => (
          item.order_id == this.orderNowId
          && item.design_id == this.designActive.design_id
          && item.item_id == this.designActive.item_id
          && item.size_id == this.sizeItemDataActive.id
        ))

        if(hasCorrectedData == -1 && Object.keys(this.sizeItemDataActive).length){
          if(this.correctionData){
            // const arrNotCorrectData = this.correctFixedDataActive.filter(item => (
            //   this.correctionDataActive.findIndex(item2 => item2.size_link == item.column_name) == -1
            // ))

            // //list of correct fixed but has not registed
            // arrNotCorrectData.forEach(element => {
            //   initCorrectedData.push(
            //     {
            //       order_id: this.orderNowId,
            //       size_id: this.sizeItemDataActive.id,
            //       design_id: this.designActive.design_id,
            //       item_id: this.designActive.item_id,
            //       correct_id: element.column_name,
            //       correct_name: element.name,
            //       size_link: element.column_name,
            //       base_val: this.sizeItemDataActive[element.column_name],
            //       correct_detail_id: null,
            //       correct_detail_name: null,
            //       correct_detail_val: null,
            //       code: null,
            //       correct_result: this.sizeItemDataActive[element.column_name]
            //     }
            //   )
            // })

            //list of correct registed
            this.correctionDataActive.forEach(correct => {
                initCorrectedData.push(
                  {
                    order_id: this.orderNowId,
                    size_id: this.sizeItemDataActive.id,
                    design_id: this.designActive.design_id,
                    item_id: this.designActive.item_id,
                    correct_id: correct.id,
                    correct_name: correct.name,
                    size_link: correct.size_link,
                    base_val: this.sizeItemDataActive[correct.size_link] ? this.sizeItemDataActive[correct.size_link] : null,
                    correct_detail_id: null,
                    correct_detail_name: null,
                    correct_detail_val: null,
                    code: null,
                    correct_result: this.sizeItemDataActive[correct.size_link] ? this.sizeItemDataActive[correct.size_link]: null
                  }
                )
              })
            }
        }
        return initCorrectedData
      },

      correctSelectedDataActive(){
        return this.correctSelectedData.filter(item => (
          item.order_id == this.orderNowId
          && item.design_id == this.designActive.design_id
          && item.item_id == this.designActive.item_id
          && item.size_id == this.sizeItemDataActive.id
          && this.correctionData.findIndex(item2 => item2.id == item.correct_id) !== -1
        ))
      },
      //correction
      correctionData: function(){
        if(this.itemDataActive){
          return this.itemDataActive.correction
        } else{
          return null
        }
      },
      correctionDataActive: function(){
        if(this.correctionData){
          return this.correctionData.filter(item => (
            item.design_id == this.designActive.design_id
            //get more list correct not connect to correct fixed
            // && this.correctFixedDataActive.findIndex(item2 => item.size_link && item2.column_name == item.size_link) !== -1
          ))
        } else{
          return []
        }
      },

      correctFixedDataActive: function(){
        if(this.correctFixedData.findIndex(item => item.design_id == this.designActive.design_id) !== -1){
          return this.correctFixedData.find(item => item.design_id == this.designActive.design_id).fixedData
        } else{
          return []
        }
      },

      //combine
      combinePrice: function(){
        let combinePriceIndex = this.combinePriceData.findIndex(item => 
          item.model == this.modelSelected
          && item.combineId == this.itemCombineObj.id
          && item.rank == this.kijiObjectActive.rank
        )
        if(combinePriceIndex !== -1){
          return this.combinePriceData[combinePriceIndex].price
        } else{
          return 0
        }
      },
      correctDetailActive: function(){
        if(this.correction_selected_id && this.correctDetailData.findIndex(item => item.correct_id == this.correction_selected_id) !== -1){
          return this.correctDetailData.find(item => item.correct_id == this.correction_selected_id).detail_data
        } else{
          return []
        }
      },
      stockSelectedDataNow: function(){
        return this.stockSelectedData.find(item => item.orderId == this.orderNowId)
      },
      sizeSelectedCheck: function(){
        let ret = []
        this.designData.forEach(element => {
          let sizeDataOfDesign = this.sizeData.filter(item => item.design == element.design_id)
          let sizeSelectedOfDesign = this.sizeSelectedData.findIndex(item => item.orderId == this.orderNowId && item.design == element.design_id)
          if(sizeDataOfDesign.length > 0 && (sizeSelectedOfDesign == -1 || !(this.sizeSelectedData[sizeSelectedOfDesign].id))){
            ret.push({design_id: element.design_id, item_id: element.item_id, design_name: element.design_label})
          }
        })
        return ret
      },

      allOptionSelectedCheck: function(){
        let ret = []
        this.designData.forEach(design => {
          let allParents = this.optionParentData.find(item => item.design_id == design.design_id)
          if(allParents){
            allParents.parentData.forEach(parent => {
              if(this.optionSelectedData.findIndex(
                item2 => (item2.orderId == this.orderNowId
                && item2.item_id == design.item_id
                && item2.design_id == design.design_id
                && item2.parent_id == parent.parent_id)) == -1){
                  ret.push({design_id: design.design_id, design_name: design.design_label, item_id: design.item_id, parent_id: parent.parent_id, parent_name: parent.name})
                }
            })
          }
        })
        return ret
      },

      allCorrectSelectedCheck: function(){
        let ret = []
        if(this.designData){
          this.designData.forEach(design => {
            let allCorrects = this.correctionData.filter(item => item.design_id == design.design_id)
            allCorrects.forEach(correction => {
              if(this.correctSelectedData.findIndex(
                item2 => (item2.order_id == this.orderNowId
                && item2.item_id == design.item_id
                && item2.design_id == design.design_id
                && item2.correct_id == correction.id
                && item2.correct_detail_id == null
                )) !== -1){
                  ret.push({design_id: design.design_id, item_id: design.item_id, correct_id: correction.id, correct_name: correction.name})
                }
            })
          })
        }
        return ret
      },
      neckObject: function(){
        if(this.neckSelectedValue && this.neckSizeData.findIndex(item => item.id == this.neckSelectedValue) !== -1){
          return this.neckSizeData.find(item => item.id == this.neckSelectedValue)
        } else{
          return null
        }
      },
      hasCorrectCustom: function(){
        if(this.correctCustomArr.indexOf(this.correction_selected_id) !== -1){
          return true
        } else{
          return false
        }
      }
    },
};
</script>

<style scoped>
    
</style>