<template>
  <div id="simupage_container" class="d-flex flex-column">
    <Step/>
    <div class="simupage_main">
      <SelectStyle v-if="step == 1"/>
      <!-- <Header /> -->
      <transition name="transitionRightToLeft">
        <div class="container-ordersimu" v-if="step == 2">
          <div class="container-order-main">
              <SimuLeft/>
              <SimuRight/>
          </div>
        </div>
        <SimuComplete v-if="step == 4"/>
      </transition>

      <transition name="modal">
        <SimuConfirm v-if="step == 3"/>
      </transition>

      <transition name="modal">
        <div class="loaddingDataIo" v-if="loaddingData">
          <div class="loadingio-spinner-spinner-482naetb3m">
            <div class="ldio-2vyxc9gibh9">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <transition name="modal">
      <div class="modal-mask" v-if="errorCode" id="model-error">
        <div class="modal-wrapper">
          <div class="modal-container">
              <div class="modal-body center">
                <span class="order-confirm-question">{{Errors.text}}</span>
              </div>
              <div class="modal-footer">
                <button class="simu-common-btn btnSize01" @click="clodeErrorModal">閉じる</button>
              </div>
          </div>
        </div>
      </div>
      <div class="modal-mask" v-if="HcErrorLogin" id="model-error">
        <div class="modal-wrapper">
          <div class="modal-container">
              <div class="modal-body">
                <span class="order-confirm-question">今HC番号を設定していません。</span>
              </div>
              <div class="modal-footer">
                <button class="simu-common-btn" @click="showHcSearchModal">HC番号を選択</button>
              </div>
          </div>
        </div>
      </div>

      <SimuHcSearch v-if="HCSearchPopup"
      @closeHcModal="closeHcModal"/>
    </transition>

    <span @click="HCSearchPopup = true" id="hc_search_popup" style="display: none;">&nbsp;</span>

    <transition name="modalOneMeasure">
      <SimuOneMeasure 
      :itemDataActive = "itemDataActive"/>
    </transition>
  </div>

</template>

<script>
import Step from "../components/Step.vue";
import SelectStyle from "../components/SelectStyle.vue";
import SimuLeft from "../components/SimuLeft.vue";
import SimuRight from "../components/SimuRight.vue";
import SimuConfirm from "../components/SimuConfirm.vue";
import SimuComplete from "../components/SimuComplete.vue";
import SimuOneMeasure from "../components/SimuOneMeasure.vue";
import SimuHcSearch from "../components/SimuHcSearch.vue";

import { mapGetters } from 'vuex'

export default {
  name: "Home",
  components: {
    Step,
    SelectStyle,
    SimuLeft,
    SimuRight,
    SimuConfirm,
    SimuComplete,
    SimuOneMeasure,
    SimuHcSearch
  },
  data() {
    return {
      HcErrorLogin: false,
      HCSearchPopup: false
    };
  },
  methods: {
    clodeErrorModal(){
      this.$store.dispatch('handleChangeErrorCode', 0)
    },
    getInitialData: async function(){
      let ret = null
      await this.axios.request({
        url: this.main_path + 'myshop/getinitial/',
        method: 'get',
        headers: {'X-Requested-With': 'XMLHttpRequest'}
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
    setInitialData: async function(){
      await this.getInitialData().then(response => {
          if(response){
              if(response.iniData){
                this.$store.dispatch('handleRestoreFromIni', response.iniData)
                if(response.cartItemId || response.orderItemId){
                  this.$store.dispatch('handleChangeStep', 2)
                }
                if(response.orderCart){
                  this.$store.dispatch('handleChangeStep', 3)
                }
              }
              this.setStyleData().then((response) => {
                  $(".simu-style-loading").removeClass("on")
              })

              this.$store.dispatch('handleChangeDeliData', response.deliData)
              this.$store.dispatch('handleChangeIniData', {
                shop_id: response.shop_id,
                shop_kind: response.shop_kind,
                staff_id: response.staff_id,
                customer_id: response.customer_id,
                cartItemId: response.cartItemId,
                orderItemId: response.orderItemId,
                orderCart: response.orderCart,
                tax_rate: response.tax_rate,
              })
          }
      })
      .catch(error => console.log(error))
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
            // this.$store.dispatch('handleChangePriceRank', response.priceRankArr)
          }
        })
    },
    getItemData: async function(item_selected, model_selected, style_selected, category_select){
        this.$store.dispatch('handleChangeLoaddingData', true)
        let ret = null
        if(item_selected){
          await this.axios.request({
            url: this.main_path + 'myshop/getitem/',
            method: 'post',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: {
              'items' : item_selected,
              'model' : model_selected,
              'style' : style_selected,
              'category': category_select
            }
          })
          .then(response => {
            console.log(response.data.data)
            ret = response.data.data
            this.$store.dispatch('handleChangeLoaddingData', false)
          })
          .catch(error => {
            this.$store.dispatch('handleChangeErrorCode', 2)
            console.log(error)
            this.$store.dispatch('handleChangeLoaddingData', false)
          })
        }
        return ret
      },
    setItemData: async function(item_selected, model_selected, style_selected, category_select){
      await this.getItemData(item_selected, model_selected, style_selected, category_select).then(response => {
        if(response){
          this.$store.dispatch('handleChangeItemData', {
            orderId: this.orderNowId,
            model: model_selected,
            items: response.items,
            design: response.design,
            stock: response.stock,
            stock_design: response.stock_design,
            size: response.size,
            necksize: response.necksize,
            correction: response.correction,
            factory_id: response.factory_id
          })
        }
      })
    },
    updateItemData: async function(id, item, model, style, category_select){
      await this.getItemData(item, model, style, category_select).then(response => {
        if(response){
          this.$store.dispatch('handleChangeItemData', {
            orderId: id,
            model: model,
            items: response.items,
            design: response.design,
            stock: response.stock,
            stock_design: response.stock_design,
            size: response.size,
            necksize: response.necksize,
            correction: response.correction,
            factory_id: response.factory_id
          })
        }
      })
    },
    getAllOptionParentData: async function(designData, model){
      var arrDesign = [];
      let ret = null
      if(designData && designData.length){
        designData.forEach((item) => {
          arrDesign.push(item.design_id);
        })
        await this.axios.request({
          url: this.main_path + 'myshop/getalloptionparent/',
          method: 'post',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: {
            design_id: arrDesign,
            model: model
          }
        })
        .then(response => {
          ret = response.data.data
        })
        .catch(error => {
          this.$store.dispatch('handleChangeErrorCode', 2)
          console.log(error)
        })
      } 
      return ret
    },
    // note: option_parent depend on modelSelected
    updateAllOptionParent: async function(){
      await this.getAllOptionParentData(this.designData, this.modelSelected).then(response => {
        if(response){
          response.forEach((item) => {
            this.$store.dispatch('handleChangeOptionParentData', 
              {model:this.modelSelected, design_id: item.design_id, genreData: item.genreData, parentData: item.optionData}
            )
          })
        }
      })
      .catch(error => console.log(error))
    },
    updateAllOptionParentFromOrderTemp: async function(designData, model){
      if(this.optionParentData.length == 0 || !(designData.every(element => this.optionParentData.findIndex(item => item.design_id == element.design_id && item.model == model) !== -1))){
        await this.getAllOptionParentData(designData, model).then(response => {
          if(response){
            response.forEach((item) => {
              this.$store.dispatch('handleChangeOptionParentData', 
                {model: model, design_id: item.design_id, genreData: item.genreData, parentData: item.optionData}
              )
            })
          }
        })
        .catch(error => console.log(error))
      }
    },
    getStyleFromAPI: async function(){
      let ret = null
      await this.axios.request({
        url: this.main_path + 'myshop/getstyle/',
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
          category_select: this.category_select
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
    setStyleData: async function(){
      await this.getStyleFromAPI().then(response => {
        if(response){
          this.$store.dispatch('handleChangeStyleData', response)
        }
      })
      .catch(error => console.log(error))
    },
    updateOptionSelectedData: function(option_selected){
      option_selected.forEach(element => {
        this.$store.dispatch('handleChangeOption', element)
      })
    },
    updateSizeSelectedData: function(size_selected){
      size_selected.forEach(element => {
        this.$store.dispatch('handleUpdateSizeSelectedData', element)
      })
    },
    updateCorrectSelectedData: function(correct_selected){
      this.$store.dispatch('handleUpdateCorrectSelectedDataBySize', correct_selected)
    },
    getPriceFromApi: async function(model, combineId){
        let ret = null
        if(model && combineId){
          await this.axios.request({
            url: this.main_path + 'myshop/getpriceofcombine/',
            method: 'post',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: {
              'model': model,
              'combineId': combineId,
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
    updateCombineData: async function(model, combineId){
      if(this.combinePriceData.findIndex(item => (item.model == model && item.combineId == combineId)) == -1){
        await this.getPriceFromApi(model, combineId).then(response => {
          if(response){
            this.$store.dispatch('handleUpdateCombinePrice', response)
          }
        })
      }
    },
    updateNeckSizeData: function(id, neckSizeData){
      neckSizeData.forEach(element => {
        this.$store.dispatch('handleUpdateNeckSelectedData', {orderId: id, id: element.id, name: element.name})
      })
    },
    getModelData: async function(){
      let ret = null
      if(this.modelSelected){
        await this.axios.request({
          url: this.main_path + 'myshop/getmodel/',
          method: 'post',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: {
            modelid: this.modelSelected
          }
        })
        .then(response => {
          ret = response.data.data
        })
        .catch(error => {
          this.$store.dispatch('handleChangeErrorCode', 2)
          console.log(error)
        })
      }
      return ret
    },
    showHcSearchModal: function(){
      this.HCSearchPopup = true
      this.HcErrorLogin = false
    },
    closeHcModal: function(){
      this.HCSearchPopup = false
    }
  },
  watch: {
    itemSelected: function(){
      if(this.itemSelected.length){
        this.setItemData(this.itemSelected, this.modelSelected, this.styleSelected, this.category_select)
      }
    },
    //load data from history change
    orderTempItem: function(){
      this.orderTempItem.forEach(element => {
        if(this.itemData.findIndex(item => item.orderId == element.id) == -1){
          this.updateItemData(element.id, element.item, element.model, element.style, element.category_select)
        }
        this.updateOptionSelectedData(element.option_selected)
        this.updateSizeSelectedData(element.size_selected)
        this.updateCorrectSelectedData(element.correct_selected)
        this.updateCombineData(element.model, element.combineId)

        if(element.necksize.length){
          this.updateNeckSizeData(element.id, element.necksize)
        }
      })
    },
    itemData: function(){
      this.itemData.forEach(element => {
        this.updateAllOptionParentFromOrderTemp(element.design, element.model)
      })
      this.$store.dispatch('handleUpdateInitialStockData')
    },
    category_select: function(){
      this.setStyleData()
    },
    modelSelected: function(){
      this.getModelData().then(response => {
        if(response){
          this.$store.dispatch('handleChangeModelData', {modelId: this.modelSelected, data: response})
        }
      })
    },
    kijiActive: function(){
      this.$store.dispatch('handleUpdateStockSelectedData', null)
    }
  },
  mounted() {
    this.setInitialData()
    this.setKijiData()

    // window.setInterval(() => {
    //   if((this.step == 2 || this.step == 3) && !this.initialData.customer_id && !this.HcErrorLogin && !this.HCSearchPopup){
    //       this.HcErrorLogin = true
    //   }
    // }, 20000)
  },
  computed: {
    ...mapGetters([
      'main_path',
      'step',
      'initialData',
      'kijiActive',
      'styleSelected',
      'modelSelected',
      'itemSelected',
      'optionSelectedData',
      'errorCode',
      'errorData',
      'loaddingData',
      'itemData',
      'orderNowId',
      'orderTempItem',
      'category_select',
      'combinePriceData',
      'optionParentData',
      'stockSelectedData',
      'kijiData'
    ]),
    Errors: function(){
      if(this.errorCode){
        return this.errorData.filter((item) => item.errorCode == this.errorCode)[0]
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

    itemDataActive(){
      if(this.itemData.length && this.itemData.find(item => item.orderId == this.orderNowId)){
        return this.itemData.find(item => item.orderId == this.orderNowId)
      } else{
        return null
      }
    }
  },
};
</script>
