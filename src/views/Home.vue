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
      </transition>
    </div>
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
    SimuConfirm
  },
  data() {
    return {

    };
  },
  methods: {
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
      .catch(error => console.log(error))
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
      'optionSelectedData'
    ]),
  },
};
</script>
