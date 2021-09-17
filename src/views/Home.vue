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
      <SimuConfirm v-if="step == 3"/>
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
    
  },
  watch: {
  },
  mounted() {

  },
  computed: {
    ...mapGetters(['step'])
  },
};
</script>
