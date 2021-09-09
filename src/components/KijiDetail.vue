<template>
  <div class="container-option-detail d-flex justify-content-between flex-column">
    <div class="option-detail-top flex-grow-1">
        <img class="option-detail-img" alt="" :src="kiji_img_path + kijiDetailData.img">
        <span class="option-detail-closeBtn" @click="closeKijiDetail"><i class="fas fa-times"></i></span>
        <div class="option-detail-info">
          <span class="option-detail-code">{{kijiDetailData.code}}</span><br><span class="option-detail-name">{{kijiDetailData.name}}<br>STANDARD (ALL SEASON)</span>
        </div>
    </div>
    <div class="option-detail-bottom d-flex flex-column justify-content-between">
      <div class="option-detail-description">
        {{kijiDetailData.description}}
      </div>
      <div class="option-detail-confirm d-flex justify-content-between align-items-end">
        <span class="option-detail-price">標準 ¥{{kijiDetailData.price}} (税込)</span>
        <button class="simu-common-btn" @click="kijiConfirmDetail">決定</button>
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
    closeKijiDetail: function(){
      this.$emit("close-detail")
    },
    kijiConfirmDetail: function(){
      this.$emit("kiji-confirm", {"id": this.kijiDetailData.id, "img": this.kijiDetailData.img})
    }
  },
  props: ['kiji_img_path', 'kijiDetailData'],
  mounted() {
    
  },
  computed: {
    ...mapGetters([
      'kiji_img_path'
    ]),
  }
};
</script>

<style scoped>
	
</style>


