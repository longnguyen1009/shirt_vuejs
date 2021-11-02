<template>
  <div class="container-option-detail d-flex justify-content-between flex-column">
    <div class="option-detail-top flex-grow-1">
        <img class="option-detail-img" alt="" :src="option_img_path + OptionDetailData.img">
        <span class="closeBtn option-detail-closeBtn" @click="closeOptionDetail">
          <img :src="main_path + 'html/user_data/assets/img/common/header_close.svg'" alt="">
        </span>
    </div>
    <div class="option-detail-bottom d-flex flex-column justify-content-between">
      <div class="option-detail-name">
        <span class="option-detail-catename" v-if="cateCurrObj != null">{{cateCurrObj.cate_name}}</span>
        <span class="option-detail-optionname">{{OptionDetailData.name}}</span>
      </div>
      <div class="option-detail-confirm d-flex justify-content-between">
        <div class="option-detail-moreinfo d-flex justify-content-between flex-column">
          <div class="option-detail-moreinfo-top">
            <span class="option-detail-val">{{OptionDetailData.color_code}}</span>
          </div>
          <div class="option-detail-moreinfo-price">
            <span class="option-detail-price" v-if="initialData.shop_kind == 2">カスタマイズ価格：{{OptionDetailData.cost}}円</span>
          </div>
        </div>
        <div class="option-detail-descript d-flex justify-content-between flex-column">
            <div class="option-detail-description">
              {{OptionDetailData.description}}
            </div>
            <div class="option-detail-select">
              <button class="simu-common-btn btnSize02 gray" @click="optionConfirmDetail">決定</button>
            </div>
        </div>
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
  props: ['OptionDetailData', 'cateCurrObj'],
  mounted() {
  },
  computed: {
    ...mapGetters([
      'main_path',
      'initialData',
      'option_img_path'
    ]),
  }
};
</script>

<style scoped>
	
</style>


