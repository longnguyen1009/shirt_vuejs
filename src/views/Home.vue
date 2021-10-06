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
              <div class="modal-body">
                <span class="order-confirm-question">{{Errors.text}}</span>
              </div>
              <div class="modal-footer justify-content-center">
                <slot name="footer">
                  <button class="simu-common-btn" @click="clodeErrorModal">閉じる</button>
                </slot>
              </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Step from "../components/Step.vue";
import SelectStyle from "../components/SelectStyle.vue";
import SimuLeft from "../components/SimuLeft.vue";
import SimuGender from "../components/SimuGender.vue";
import SimuNav from "../components/SimuNav.vue";
import SimuCourse from "../components/SimuCourse.vue";
import SimuRight from "../components/SimuRight.vue";
import SimuModal from "../components/SimuModal.vue";
import SimuConfirm from "../components/SimuConfirm.vue"
import SimuComplete from "../components/SimuComplete.vue"

import { mapGetters } from 'vuex'

export default {
  name: "Home",
  components: {
    Step,
    SelectStyle,
    Header,
    Footer,
    SimuLeft,
    SimuGender,
    SimuNav,
    SimuCourse,
    SimuRight,
    SimuModal,
    SimuConfirm,
    SimuComplete
  },
  data() {
    return {

    };
  },
  methods: {
    clodeErrorModal(){
      this.$store.dispatch('handleChangeErrorCode', 0)
    },
    getInitialData: async function(){
      let ret = null
      await this.axios.request({
        url: 'http://54.248.46.255/myshop/getinitial/',
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
              if(response.cartItemId){
                this.$store.dispatch('handleChangeStep', 2)
              } else if(response.orderItemId){
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
              orderItemId: response.orderItemId
            })
          }
      })
      .catch(error => console.log(error))
    },
    //Promise to fetch Kiji
    getKijiFromAPI: async function(){
        let ret = null
        await this.axios.request({
          url: 'http://54.248.46.255/myshop/getkijilist/',
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
    getItemData: async function(item_selected, model_selected, style_selected){
        let ret = null
        if(item_selected){
          await this.axios.request({
            url: 'http://54.248.46.255/myshop/getitem/',
            method: 'post',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: {
              'items' : item_selected,
              'model' : model_selected,
              'style' : style_selected
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
    setItemData: async function(item_selected, model_selected, style_selected){
      await this.getItemData(item_selected, model_selected, style_selected).then(response => {
        if(response){
          this.$store.dispatch('handleChangeItemData', {
            orderId: this.orderNowId,
            items: response.items,
            design: response.design,
            stock: response.stock,
            size: response.size,
            correction: response.correction
          })
        }
      })
    },
    updateItemData: async function(id, item, model, style){
      await this.getItemData(item, model, style).then(response => {
        if(response){
          this.$store.dispatch('handleChangeItemData', {
            orderId: id,
            items: response.items,
            design: response.design,
            stock: response.stock,
            size: response.size,
            correction: response.correction
          })
        }
      })
    },
    getAllOptionParentData: async function(designData){
      var arrDesign = [];
      let ret = null
      if(designData && designData.length){
        designData.forEach((item) => {
          arrDesign.push(item.design_id);
        })
        await this.axios.request({
          url: 'http://54.248.46.255/myshop/getalloptionparent/',
          method: 'post',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: {
            design_id: arrDesign
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
    updateAllOptionParent: async function(){
      await this.getAllOptionParentData(this.designData).then(response => {
        if(response){
          response.forEach((item) => {
            this.$store.dispatch('handleChangeOptionParentData', 
              {design_id: item.design_id, genreData: item.genreData, parentData: item.optionData}
            )
          })
        }
      })
      .catch(error => console.log(error))
    },
    updateAllOptionParentFromOrderTemp: async function(designData){
      if(this.optionParentData.length == 0 || !(designData.every(element => this.optionParentData.findIndex(item => item.design_id == element.design_id) !== -1))){
        await this.getAllOptionParentData(designData).then(response => {
          if(response){
            response.forEach((item) => {
              this.$store.dispatch('handleChangeOptionParentData', 
                {design_id: item.design_id, genreData: item.genreData, parentData: item.optionData}
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
        url: 'http://54.248.46.255/myshop/getstyle/',
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
    getPriceFromApi: async function(model, combineId){
        let ret = null
        if(model && combineId){
          await this.axios.request({
            url: 'http://54.248.46.255/myshop/getpriceofcombine/',
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
    getModelData: async function(){
      let ret = null
      if(this.modelSelected){
        await this.axios.request({
          url: 'http://54.248.46.255/myshop/getmodel/',
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
    }
  },
  watch: {
    itemSelected: function(){
      if(this.itemSelected.length){
        this.setItemData(this.itemSelected, this.modelSelected, this.styleSelected)
      }
    },
    // designData: function(){
    //   this.updateAllOptionParent()
    // },
    //load data from history change
    orderTempItem: function(){
      this.orderTempItem.forEach(element => {
        if(this.itemData.findIndex(item => item.orderId == element.id) == -1){
          this.updateItemData(element.id, element.item, element.model, element.style)
        }
        this.updateOptionSelectedData(element.option_selected)
        this.updateCombineData(element.model, element.combineId)
      })
    },
    itemData: function(){
      this.itemData.forEach(element => {
        this.updateAllOptionParentFromOrderTemp(element.design)
      })
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
  },
  mounted() {
    this.setInitialData()
    this.setKijiData()
  },
  computed: {
    ...mapGetters([
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
      'optionParentData'
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
      if(this.itemData.length && this.itemData.filter(item => item.orderId == this.orderNowId).length){
        return this.itemData.filter(item => item.orderId == this.orderNowId)[0]
      } else{
        return null
      }
    }
  },
};
</script>
