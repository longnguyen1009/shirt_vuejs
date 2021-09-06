<template>
  <div id="simupage_container" class="d-flex flex-column">
    <Step/>
    <SelectStyle v-if="step == 1"/>
    <!-- <Header /> -->
    <div class="container-ordersimu" v-if="showSimuPage">
      <div class="container-order-main">
          <SimuLeft
          :itemData="itemData"/>
          <SimuRight
          @sendItemData="sendItemData($event)"/>
      </div>
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
  },
  data() {
    return {
      itemData: null
    };
  },
  methods: {
    sendItemData(data){
      this.itemData = data
    }
  },
  watch: {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['step']),
    showSimuPage: function(){
      return (this.step == 2)
    },
  },
};
</script>
