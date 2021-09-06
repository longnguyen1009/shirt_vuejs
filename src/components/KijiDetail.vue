<template>
  <div class="container-kiji-detail d-flex justify-content-between flex-column">
    <div class="kiji-detail-top flex-grow-1">
        <img class="kiji-detail-img" alt="" :src="kiji_img_path + kijiDetailData.img">
        <span class="kiji-detail-closeBtn" @click="closeKijiDetail"><i class="fas fa-times"></i></span>
        <div class="kiji-detail-info">
          <span class="kiji-detail-code">{{kijiDetailData.code}}</span><br><span class="kiji-detail-name">{{kijiDetailData.name}}<br>STANDARD (ALL SEASON)</span>
        </div>
    </div>
    <div class="kiji-detail-bottom d-flex flex-column justify-content-between">
      <div class="kiji-detail-description">
        {{kijiDetailData.description}}
      </div>
      <div class="kiji-detail-confirm d-flex justify-content-between align-items-end">
        <span class="kiji-detail-price">標準 ¥{{kijiDetailData.price}} (税込)</span>
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


