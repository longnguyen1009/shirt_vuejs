<template>
  <div class="container-kiji d-flex justify-content-between flex-column">
    <div class="simuright-sub-name d-flex justify-content-center align-items-center">生地選択</div>
    <div class="simuright-sub-content">
      <div class="simuright-sub-kiji">
        <div class="simuright-sub-nav simuright-sub-search">
          <div class="simuright-sub-searchTop d-flex justify-content-between align-items-center">
            <div class="simuright-sub-searchInput">
              <span><i class="fas fa-search"></i></span>
              <input type="text" placeholder="検索する" aria-label="検索">
            </div>
            <div class="simuright-sub-searchSelect">
              <span>絞り込む&nbsp;<i class="fas fa-th-list"></i></span>
            </div>
          </div>
        </div>
        <div class="simuright-sub-result simuright-kiji-list d-flex flex-wrap">
          <template v-for="Kiji in kijiData">
            <div class="kijiItem" v-if="checkStockKiji(Kiji.id)" :key="Kiji.id"
            :class="{active: (Kiji.id == kijiSelected)}">
              <img :src="kiji_img_path + Kiji.img" alt=""
                @click="kijiChange(Kiji.id, Kiji.img_simu)">
              <span class="simuright-kiji-icon" @click="showKijiDetail(Kiji.id)"><i class="fas fa-info-circle"></i></span>
              <div class="simuright-kiji-name"
                @click="kijiChange(Kiji.id, Kiji.img_simu)">
                <span class="kiji-code">{{Kiji.code}}</span><br>
                <span class="kiji-name">{{Kiji.name}}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="simuright-sub-navi d-flex align-items-center">
      <button class="simu-common-btn" @click="closeOption">戻る</button>
      <button class="simu-common-btn" @click="kijiConfirm">決定</button>
    </div>
    <transition name="transitionRightToLeft">
      <div class="simu-subpage" v-if="kijiDetailId != 0">
        <KijiDetail 
        :kijiDetailData="kijiDetailData"
        @close-detail="closeKijiDetail($event)"
        @kiji-confirm="confirmKijiDetail($event)"
        />

      </div>
    </transition>
  </div>
</template>

<script>
import KijiDetail from './KijiDetail.vue';
import { mapGetters } from 'vuex';

export default {
  name: "SelectKiji",
  components: {KijiDetail},
  data() {
    return {
      kijiSelected: 0,
      kijiDetailId: 0,
    };
  },
  methods: {
    closeOption: function(){
      this.$emit("closeOption")
    },
    closeKijiDetail:function(){
      this.kijiDetailId = 0
    },
    kijiChange: function(id, img){
      this.kijiSelected = id
      $('.kiji_preloader img').attr('src', this.kiji_img_path + img)
      $('.kiji_preloader img').attr('kiji-id', id)
    },
    kijiConfirm: function(){
      if(this.kijiSelected){
        this.$store.dispatch('handleChangeKiji', this.kijiSelected)
        this.closeOption()
      } else{
        alert('生地を選択してください')
      }
    },
    showKijiDetail(id){
      this.kijiDetailId = id
    },
    confirmKijiDetail(data){
      this.kijiChange(data.id, data.img_simu)
      this.kijiConfirm()
    },
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
    checkStockKiji: function(id){
      let Kiji = this.kijiData.find(item => item.id == id)
      if(Kiji.stock_unlimited){
        return true
      }
      if((Kiji.fabric_kind == 1 && Kiji.stock >= this.stockSelectedDataNow.sensei_min) || 
      ((Kiji.fabric_kind == 2 && Kiji.stock >= this.stockSelectedDataNow.bichikusei_min))){
        return true
      } else{
        return false
      }
    }
  },
  props: [],
  mounted() {
    this.setKijiData()
    this.kijiSelected = this.kijiActive
  },
  computed: {
    ...mapGetters([
      'kiji_img_path',
      'kijiActive',
      'kijiData',
      'stockSelectedData',
      'orderNowId'
    ]),
    kijiDetailData: function(){
      if(this.kijiDetailId != 0){
        return this.kijiData.filter((item) => item.id === this.kijiDetailId)[0];
      }
    },
    stockSelectedDataNow: function(){
      return this.stockSelectedData.find(item => item.orderId == this.orderNowId)
    }
  }
};
</script>

<style scoped>
	
</style>


