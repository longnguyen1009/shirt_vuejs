<template>
  <div class="container-kiji-searchbrand d-flex justify-content-between flex-column">
    <div class="simuright-sub-name d-flex justify-content-center align-items-center">生地選択</div>
    <div class="simuright-sub-content">
      <div class="simuright-sub-kiji">
        <div class="simuright-sub-nav simuright-sub-search">
          <div class="simuright-sub-searchTop d-flex justify-content-between align-items-center">
            <div class="simuright-sub-searchInput">
              <span><img :src="main_path + 'html/user_data/assets/img/common/icon_search.png'" alt=""></span>
              <input type="text" @input="isTyping = true" v-model="searchKijiBrandName" placeholder="ブランド名を入力" aria-label="検索">
            </div>
          </div>
        </div>
        <div class="simuright-sub-result searchkiji-brand">
            <div class="searchkiji-brand-group" v-for="(Group, id) in arrBrandSortByAlphabet" :key="id">
              <span class="searchkiji-brand-letter">{{Group.letter}}</span>
              <ul class="searchkiji-brand-list d-flex justify-content-between align-items-center flex-wrap">
                <li class="searchkiji-brand-item" v-for="(Brand, id2) in Group.brand" :key="id2">
                  <input class="fancy-radio" hidden :id="'brand-' + Brand.id" name="size" type="checkbox" :value="Brand.id" v-model="brandSelected">
                  <label class="fancy-radio-label" :for="'brand-' + Brand.id">
                      <span class="fancy-label--text searchkiji-brand-name">{{Brand.name}}</span><br>
                      <span class="fancy-label--text searchkiji-brand-kana">{{Brand.kana}}</span>
                      <span class="fancy-checkbox">
                          <span class="radiobutton-dot"></span>
                      </span>
                  </label>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </div>
    <div class="simuright-sub-navi d-flex align-items-center">
      <button class="simu-common-btn btnSize02 btnSizeHalf" @click="closeSearchKiji">戻る</button>
      <button class="simu-common-btn btnSize02 gray btnSizeHalf" @click="confirmSearchBrand">決定</button>
    </div>

    <transition name="modal">
      <div class="loaddingDataIo" v-if="isLoading">
        <div class="loadingio-spinner-spinner-482naetb3m">
          <div class="ldio-2vyxc9gibh9">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash'

export default {
  name: "KijiSearchBrand",
  components: {},
  data() {
    return {
      isLoading: false,

      sortParam: {
      },
      isTyping: false,
      searchKijiBrandName: '',
      searchKijiBrandResult: []
    };
  },
  methods: {
    closeSearchKiji: function(){
      this.$emit('closeSearchKiji')
    },
    confirmSearchBrand: function(){
      this.$emit('confirmSearchKiji', {brand: this.brandSelected})
    },
    getKijiSearchData: async function(){
      let ret = null
      await this.axios.request({
        url: this.main_path + 'myshop/getkijisearch/',
        method: 'get',
        headers: {'X-Requested-With': 'XMLHttpRequest'}
      })
      .then(response => {
        ret = response.data.data
      })
      .catch(error => {
        this.$store.dispatch('handleChangeErrorCode', 2)
        console.log(error)
      })
      this.isLoading = false
      return ret
    },
    updateKijiSearchData: async function(){
      this.isLoading = true
      await this.getKijiSearchData().then(response => {
        if(response){
          this.searchKijiBrandResult = response.brand
          this.$store.dispatch('handleUpdateKijiSearchData', response)
        }
      })
    },
    searchKijiBrand: function(){
      let ret = this.kijiSearchBrand
      if(this.searchKijiBrandName){
        ret = ret.filter(item => (item.name.toLowerCase().includes(this.searchKijiBrandName.toLowerCase()) || item.kana.includes(this.searchKijiBrandName)))
      }

      this.searchKijiBrandResult = ret
      setTimeout(() => this.isLoading = false, 100)
    }
  },
  props: ['brandSelected'],
  mounted() {
    if(Object.keys(this.kijiSearchData).length === 0){
      this.updateKijiSearchData()
    }
    this.searchKijiBrandResult = this.kijiSearchBrand
  },
  watch: {
    searchKijiBrandName: _.debounce(function() {
      this.isTyping = false;
    }, 500),
    isTyping: function(value) {
      if (!value) {
        // this.brandSelected = []
        this.isLoading = true
        this.searchKijiBrand()
      }
    },
    arrBrandSortByAlphabet: function(){
      console.log(this.arrBrandSortByAlphabet)
    }
  },
  computed: {
    ...mapGetters([
      'main_path',
      'kijiSearchData'
    ]),
    kijiSearchBrand : function(){
      if(Object.keys(this.kijiSearchData).length){
        return this.kijiSearchData.brand
      } else{
        return []
      }
    },
    arrBrandSortByAlphabet: function(){
      const groupNames = arr => {
        const map = arr.reduce((acc, val) => {
            let char = val.name.charAt(0).toUpperCase();
            acc[char] = [].concat((acc[char] || []), val);
            return acc;
        }, {})
        const res = Object.keys(map).map(el => ({
            letter: el,
            brand: map[el]
        }))
        return res
      }
      return groupNames(this.searchKijiBrandResult).sort(function(a,b){
        if(a.letter < b.letter) return -1
        if(a.letter > b.letter) return 1
        return 0
      })
    }
  },
};
</script>

<style scoped>
	
</style>


