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

      </transition>
      <transition name="modal">
        <SimuConfirm v-if="step == 3"/>
        <SimuComplete v-if="step == 4"/>
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
      await this.getInitialData()
      .then(response => {
          if(response){
            console.log(response)
            if(response.iniData){
              this.$store.dispatch('handleRestoreFromIni', response.iniData)
              this.$store.dispatch('handleChangeStep', 2)
            }
            this.$store.dispatch('handleChangeIniData', {
              shop_id: response.shop_id,
              staff_id: response.staff_id,
              customer_id: response.customer_id,
              category_select: response.category_select,
              cartItemId: response.cartItemId,
              orderItemId: response.orderItemId
            })
          }
      })
      .catch(error => console.log(error))
    }
  },
  watch: {
  },
  mounted() {
    this.setInitialData()
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
      'errorData'
    ]),
    Errors: function(){
      if(this.errorCode){
        return this.errorData.filter((item) => item.errorCode == this.errorCode)[0]
      } else{
        return {}
      }
    }
  },
};
</script>
