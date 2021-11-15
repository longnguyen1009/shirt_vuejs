<template>
  <div class="container-option-detail d-flex justify-content-between flex-column">
    <div class="option-detail-top flex-grow-1">
        <img class="option-detail-img" alt="" :src="kiji_img_path + kijiDetailData.img">
        <span class="closeBtn option-detail-closeBtn" @click="closeKijiDetail">
          <img :src="main_path + 'html/user_data/assets/img/common/header_close_white.png'" alt="">
        </span>
    </div>
    <div class="option-detail-bottom d-flex flex-column justify-content-between">
      <div class="option-detail-name">
        <span class="option-detail-catename">{{kijiDetailData.brand_name}}</span>
        <span class="option-detail-optionname" v-if="kijiDetailData.name">{{kijiDetailData.name}}</span>
        <span class="option-detail-optionname" v-if="!kijiDetailData.name">{{kijiDetailData.sub_name}}</span>
      </div>
      <div class="option-detail-confirm d-flex justify-content-between">
        <div class="option-detail-moreinfo d-flex justify-content-between flex-column">
          <div class="option-detail-moreinfo-top">
            <span class="option-detail-val">{{kijiDetailData.code}}</span>
            <span class="option-detail-val">C/#{{kijiDetailData.fabric_color}}</span>
            <span class="option-detail-val option-detail-val-composition" 
            v-for="(compo, id) in kijiDetailData.composition" :key="id">{{compo}} / </span>
            <span class="option-detail-val" v-if="kijiDetailData.sensor">WEIGHT {{kijiDetailData.sensor}}g</span>
          </div>
          <div class="option-detail-moreinfo-price">
            <span class="option-detail-price">カスタマイズ価格：{{moneyTypeShow01(getCombinePrice())}}円</span>
          </div>
        </div>
        <div class="option-detail-descript d-flex justify-content-between flex-column">
            <div class="option-detail-description">
              {{kijiDetailData.descript}}
            </div>
            <div class="option-detail-select">
              <button class="simu-common-btn btnSize02 gray" @click="kijiConfirmDetail">決定</button>
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
    moneyTypeShow01(number){
      return new Intl.NumberFormat().format(number)
    },
    closeKijiDetail: function(){
      this.$emit("close-detail")
    },
    kijiConfirmDetail: function(){
      this.$emit("kiji-confirm", {"id": this.kijiDetailData.id, "img": this.kijiDetailData.img})
    },
    getCombinePrice: function(){
      let combinePriceIndex = this.combinePriceData.findIndex(item => 
        item.model == this.modelSelected
        && item.combineId == this.itemCombineObj.id
        && item.rank == this.kijiDetailData.rank
      )
      if(combinePriceIndex !== -1){
        return this.combinePriceData[combinePriceIndex].price
      } else{
        return 0
      }
    }
  },
  props: ['kiji_img_path', 'kijiDetailData'],
  mounted() {
    
  },
  computed: {
    ...mapGetters([
      'main_path',
      'kiji_img_path',
      'initialData',
      'modelSelected',
      'orderNowId',
      'itemData',
      'combinePriceData',
      'styleSelected'
    ]),
    itemDataActive: function(){
        if(this.itemData.length && this.itemData.filter(item => item.orderId == this.orderNowId).length){
          return this.itemData.filter(item => item.orderId == this.orderNowId)[0]
        } else{
          return null
        }
      },
    itemCombineObj: function(){
        if(this.itemDataActive){
          return this.itemDataActive.items
        }
    },
  }
};
</script>

<style scoped>
	
</style>


