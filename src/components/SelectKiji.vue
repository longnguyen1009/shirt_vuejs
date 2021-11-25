<template>
  <div class="container-kiji d-flex justify-content-between flex-column">
    <div class="simuright-sub-name d-flex justify-content-center align-items-center">生地選択</div>
    <div class="simuright-sub-content">
      <div class="simuright-sub-kiji">
        <div class="simuright-sub-nav simuright-sub-search">
          <div class="simuright-sub-searchTop d-flex justify-content-between align-items-center">
            <div class="simuright-sub-searchInput">
              <span><img :src="main_path + 'html/user_data/assets/img/common/icon_search.png'" alt=""></span>
              <input type="text" @input="isTyping = true" v-model="searchKijiNo" placeholder="生地品番を入力" aria-label="検索">
            </div>
            <div class="simuright-sub-searchSelect d-flex justify-content-end align-items-center">
              <span @click="search_brand_shop = true">ブランドから探す&nbsp;</span>
              <span @click="search_other_shop = true">絞り込む&nbsp;</span>
            </div>
          </div>
        </div>
        <div class="simuright-sub-result simuright-kiji-list d-flex flex-wrap">
          <template v-for="Kiji in kijiSortResult">
            <div class="kijiItem" v-if="checkStyleAndStockKiji(Kiji.id)" :key="Kiji.id"
            :class="{active: (Kiji.id == kijiSelected)}">
              <span class="kijiitem-img" @click="kijiChange(Kiji.id, Kiji.img_simu)">
                <img class="kijiitem-img" v-lazy="kiji_img_path + Kiji.img" alt="" @error="imgError">
              </span>
              <span class="simuright-kiji-icon" @click="showKijiDetail(Kiji.id)">
                <img :src="main_path + 'html/user_data/assets/img/common/icon_info.png'" alt="">
              </span>
              <div class="simuright-kiji-text" @click="kijiChange(Kiji.id, Kiji.img_simu)">
                <div class="simuright-kiji-text-top d-flex justify-content-between align-items-center">
                  <span class="simuright-kiji-code">{{Kiji.code}}</span><br>
                </div>
                <span class="simuright-kiji-name">{{Kiji.brand_name}}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="simuright-sub-navi d-flex align-items-center">
      <button class="simu-common-btn btnSize02 btnSizeHalf" @click="closeOption">戻る</button>
      <button class="simu-common-btn btnSize02 gray btnSizeHalf" @click="changeKijiConfirm">決定</button>
    </div>
    <transition name="transitionRightToLeft">
      <div class="simu-subpage" v-if="kijiDetailId != 0">
        <KijiDetail 
        :kiji-detail-data="kijiDetailData"
        @close-detail="closeKijiDetail($event)"
        @kiji-confirm="confirmKijiDetail($event)"
        />
      </div>
      <KijiSearchBrand
        v-if="search_brand_shop"
        :brand-selected="sortParam.brand"
        @closeSearchKiji="closeSearchKiji(event)"
        @confirmSearchKiji="confirmSearchKiji"
      />
      <KijiSearchOther
        v-if="search_other_shop"
        :season-selected="sortParam.season"
        :color-selected="sortParam.color"
        :pattern-selected="sortParam.pattern"
        @closeSearchKiji="closeSearchKiji(event)"
        @confirmSearchKiji="confirmSearchKiji"
      />
    </transition>

    <transition name="modal">
      <div class="loaddingDataIo" v-if="isLoading">
        <div class="loadingio-spinner-spinner-482naetb3m">
          <div class="ldio-2vyxc9gibh9">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div>
          </div>
        </div>
      </div>
      <div class="modal-mask" v-if="changeKijiModalShow" id="modal-mask-option">
          <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-body center">
                  <span class="order-confirm-question">この生地に変更するとオプションの選択内容が適用されなくなるものがあります。<br>
                  この生地に対応していないオプション指定が消去されますがよろしいですか？
                  </span>
                </div>
                <div class="modal-footer">
                  <button class="simu-common-btn btnSize02 btnSizeHalf" @click="changeKijiModalShow = false">いええ</button>
                  <button class="simu-common-btn btnSize02 btnSizeHalf gray" @click="kijiConfirm">はい</button>
                </div>
            </div>
          </div>
        </div>
    </transition>
  </div>
</template>

<script>
import KijiDetail from './KijiDetail.vue';
import KijiSearchBrand from './KijiSearchBrand.vue';
import KijiSearchOther from './KijiSearchOther.vue';
import { mapGetters } from 'vuex';
import _ from 'lodash'
import Mixins from '../mixin/mixin'

export default {
  name: "SelectKiji",
  components: {KijiDetail, KijiSearchBrand, KijiSearchOther},
  mixins: [Mixins],
  data() {
    return {
      kijiSelected: 0,
      kijiDetailId: 0,
      isLoading: false,

      sortParam: {
        kijiNo: '',
        brand: [],
        season: [],
        color: [],
        pattern: []
      },
      isTyping: false,
      searchKijiNo: '',
      kijiSortResult: null,
      search_brand_shop: false,
      search_other_shop: false,
      changeKijiModalShow: false
    };
  },
  methods: {
    closeOption: function(){
      this.$emit("closeOption")
    },
    closeSearchKiji: function(){
      this.search_brand_shop = false,
      this.search_other_shop = false
    },
    confirmSearchKiji: function(searchKijiData){
      this.search_brand_shop = false
      this.search_other_shop = false
      for (const [key, value] of Object.entries(searchKijiData)) {
        this.sortParam[key] = value
      }
      this.isLoading = true
      this.searchKiji()
    },
    closeKijiDetail:function(){
      this.kijiDetailId = 0
    },
    kijiChange: function(id, img){
      this.kijiSelected = id
      $('.kiji_preloader img').attr('src', this.kiji_img_path + img)
      $('.kiji_preloader img').attr('kiji-id', id)
    },
    //create temp stock of kiji
    saveKijiStockApi: async function(kijiId, stock){
      this.isLoading = true
      let ret = null
        await this.axios.request({
          url: this.main_path + 'myshop/savekijistock/',
          method: 'post',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: {
            kiji: kijiId,
            stock: stock,
            stock_old_id: this.stock_old_id
          }
        })
        .then(response => {
          // console.log(response)
          ret = response.data.data
          this.isLoading = false
        })
        .catch(error => {
          this.isLoading = false
          this.$store.dispatch('handleChangeErrorCode', 2)
          console.log(error)
        })
        return ret
    },
    changeKijiConfirm:function(){
      let Kiji = this.kijiData.find(item => item.id == this.kijiSelected)
      if(this.kijiSelected && Kiji){
        if(this.kijiSelected == this.kijiActive || this.initialData.shop_kind == 1 || this.optionSelectedChanged.length == 0){
          this.kijiConfirm()
        } else{
          this.changeKijiModalShow = true
        }
      } else{
        alert('生地を選択してください')
      }
    },
    kijiConfirm: function(){
      this.changeKijiModalShow = false
      if(this.kijiSelected && this.kijiData.find(item => item.id == this.kijiSelected)){
        let Kiji = this.kijiData.find(item => item.id == this.kijiSelected)
        let requireStock = 0

        if(!Kiji.stock_unlimited){
          if(Kiji.fabric_kind == 1) {
              requireStock = this.stockSelectedDataNow.bichikusei_min
          } else if(Kiji.fabric_kind == 2){
              requireStock = this.stockSelectedDataNow.sensei_min
          }
        }
        
        this.saveKijiStockApi(this.kijiSelected, requireStock).then(response => {
          if(response){
            if(response == 'nostock'){
              this.$store.dispatch('handleChangeErrorCode', 7)
              this.setKijiData()
            } else{
              if(Number.isInteger(response)){
                this.$store.dispatch('handleUpdateStockOldId', response)
              } else{
                this.$store.dispatch('handleUpdateStockOldId', false)
              }
              this.$store.dispatch('handleChangeKiji', this.kijiSelected)
              this.closeOption()
            }
          } else{
            this.$store.dispatch('handleChangeErrorCode', 2)
            this.setKijiData()
          }
        })

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
          url: this.main_path + 'myshop/getkijilist/',
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
    checkStyleAndStockKiji: function(id){
      let Kiji = this.kijiData.find(item => item.id == id)
      if(Kiji.style.length == 0 || Kiji.style.findIndex(item => item.style_id == this.styleSelected) == -1){
        return false
      }
      if(Kiji.stock_unlimited){
        return true
      }
      if((Kiji.fabric_kind == 1 && Kiji.stock >= this.stockSelectedDataNow.bichikusei_min) || 
      ((Kiji.fabric_kind == 2 && Kiji.stock >= this.stockSelectedDataNow.sensei_min))){
        return true
      } else{
        return false
      }
    },
    searchKiji: function(){
      let ret = this.kijiData
      //kijiNo
      if(this.sortParam.kijiNo != null){
        ret = ret.filter(item => item.code.toLowerCase().includes(this.sortParam.kijiNo.toLowerCase()))
      }
      //brand
      if(this.sortParam.brand.length){
        ret = ret.filter(item => this.sortParam.brand.indexOf(item.brand_id) !== -1)
      }
      //season
      if(this.sortParam.season.length){
        ret = ret.filter(item => this.sortParam.season.indexOf(item.season_id) !== -1)
      }
      //color
      if(this.sortParam.color.length){
        ret = ret.filter(item => this.sortParam.color.every(element => item.color.findIndex(item2 => item2.id == element) != -1))
      }
      //pattern
      if(this.sortParam.pattern.length){
        ret = ret.filter(item => this.sortParam.pattern.every(element => item.pattern.findIndex(item2 => item2.id == element) != -1))
      }
      
      this.kijiSortResult = ret
      setTimeout(() => this.isLoading = false, 200)
    }
  },
  props: [],
  mounted() {
    this.setKijiData()
    this.kijiSelected = this.kijiActive
    this.kijiSortResult = this.kijiData
  },
  watch: {
    searchKijiNo: _.debounce(function() {
      this.isTyping = false;
    }, 500),
    isTyping: function(value) {
      if (!value) {
        this.isLoading = true
        this.sortParam.kijiNo = this.searchKijiNo
        this.searchKiji()
      }
    }
  },
  computed: {
    ...mapGetters([
      'main_path',
      'kiji_img_path',
      'kijiActive',
      'kijiData',
      'stockSelectedData',
      'orderNowId',
      'styleSelected',
      'stock_old_id',
      'initialData',
      'optionSelectedData',
      'orderNowId'
    ]),
    kijiDetailData: function(){
      if(this.kijiDetailId != 0){
        let KijiTemp = this.kijiData.find(item => item.id === this.kijiDetailId)
        let styleIndex = KijiTemp.style.findIndex(item => item.style_id == this.styleSelected)
        if(styleIndex !== -1){
          KijiTemp.rank = KijiTemp.style[styleIndex].rank
        } else{
          KijiTemp.rank = 0
        }
        return KijiTemp
      }
    },
    stockSelectedDataNow: function(){
      return this.stockSelectedData.find(item => item.orderId == this.orderNowId)
    },
    optionSelectedDataNow: function(){
      if(this.optionSelectedData){
        return this.optionSelectedData.filter(item => (item.orderId == this.orderNowId))
      } else{
        return false
      }
    },
    optionSelectedChanged: function(){
      if(this.initialData.shop_kind == 2 && this.kijiSelected && this.optionSelectedDataNow){
        let kijiObj = this.kijiData.find(item => item.id == this.kijiSelected)
        if(kijiObj && kijiObj.glr_kind){
          return this.optionSelectedDataNow.filter(item => 
            (item.glr_kind && item.glr_kind.length && item.glr_kind.indexOf(kijiObj.glr_kind + '') == -1)
          )
        }
      }
      return []
    }
  }
};
</script>

<style scoped>
	
</style>


