<template>
  <div class="container-option-detail d-flex justify-content-between flex-column">
    <div class="option-detail-top flex-grow-1">
        <img class="option-detail-img" alt="" :src="option_img_path + OptionDetailData.img">
        <span class="option-detail-closeBtn" @click="closeOptionDetail"><i class="fas fa-times"></i></span>
        <div class="option-detail-info">
          <span class="option-detail-code">{{OptionDetailData.ua_code_jp}}</span>
          <br><span class="option-detail-name">{{OptionDetailData.name}}<br>STANDARD (ALL SEASON)</span>
        </div>
    </div>
    <div class="option-detail-bottom d-flex flex-column justify-content-between">
      <div class="option-detail-description">
        {{OptionDetailData.description}}
      </div>
      <div class="option-detail-confirm d-flex justify-content-between align-items-end">
        <span class="option-detail-price">標準 ¥{{OptionDetailData.cost}} (税込)</span>
        <button class="simu-common-btn" @click="optionConfirmDetail">決定</button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: "KijiDetail",
  components: {},
  data() {
    return {
    };
  },
  methods: {
    closeOptionDetail: function(){
      this.$emit("close-detail")
    },
    optionConfirmDetail: function(){
      this.$emit("option-confirm", {"id": this.OptionDetailData.id, "img": this.OptionDetailData.img})
    }
  },
  props: ['OptionDetailData'],
  mounted() {
    
  },
  computed: {
    ...mapGetters([
      'option_img_path'
    ]),
  }
};
</script>

<style scoped>
	
</style>


