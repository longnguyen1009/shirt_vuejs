<template>
  <div class="container-kiji-searchbrand d-flex justify-content-between flex-column">
    <div class="simuright-sub-name d-flex justify-content-center align-items-center">生地選択</div>
    <div class="simuright-sub-content">
      <div class="simuright-sub-kiji">
        <div class="simuright-sub-result searchkiji-brand">
            <div class="searchkiji-item">
              <p class="searchkiji-item-label">シーズン</p>
              <ul class="searchkiji-brand-list d-flex justify-content-between align-items-center flex-wrap">
                <li class="searchkiji-brand-item" v-for="(Season, id) in kijiSearchData.season" :key="id">
                  <input class="fancy-radio" hidden :id="'season-' + Season.id" name="season" type="checkbox" :value="Season.id" v-model="seasonSelected">
                  <label class="fancy-radio-label" :for="'season-' + Season.id">
                      <span class="fancy-label--text searchkiji-brand-name">{{Season.name}}</span>
                      <span class="fancy-checkbox">
                          <span class="radiobutton-dot"></span>
                      </span>
                  </label>
                </li>
              </ul>
            </div>
            <div class="searchkiji-item">
              <p class="searchkiji-item-label">カラー</p>
              <ul class="searchkiji-brand-list d-flex justify-content-between align-items-center flex-wrap">
                <li class="searchkiji-brand-item" v-for="(Color, id) in kijiSearchData.color" :key="id">
                  <input class="fancy-radio" hidden :id="'color-' + Color.id" name="color" type="checkbox" :value="Color.id" v-model="colorSelected">
                  <label class="fancy-radio-label fancy-radio-label-color" :for="'color-' + Color.id">
                      <span class="fancy-label--text searchkiji-brand-name"><span class="searchkiji-color-fixed" :style="'background-color:' + getFixedColor(id)"></span>{{Color.name}}</span>
                      <span class="fancy-checkbox">
                          <span class="radiobutton-dot"></span>
                      </span>
                  </label>
                </li>
              </ul>
            </div>
            <div class="searchkiji-item">
              <p class="searchkiji-item-label">柄</p>
              <ul class="searchkiji-brand-list d-flex justify-content-between align-items-center flex-wrap">
                <li class="searchkiji-brand-item" v-for="(Pattern, id) in kijiSearchData.pattern" :key="id">
                  <input class="fancy-radio" hidden :id="'pattern-' + Pattern.id" name="pattern" type="checkbox" :value="Pattern.id" v-model="patternSelected">
                  <label class="fancy-radio-label" :for="'pattern-' + Pattern.id">
                      <span class="fancy-label--text searchkiji-brand-name">{{Pattern.name}}</span>
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
      <button class="simu-common-btn btnSize02 btnSizeHalf" @click="clearAllSearchKiji">すべてクリア</button>
      <button class="simu-common-btn btnSize02 btnSizeHalf gray" @click="confirmSearchOther">決定</button>
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
  name: "KijiSearchOther",
  components: {},
  data() {
    return {
      isLoading: false,
      colorFix: [
        {id: 0, code: 'rgb(255,255,255)'},
        {id: 1, code: 'rgb(0,0,0)'},
        {id: 2, code: 'rgb(191,191,191)'},
        {id: 3, code: 'rgb(95,95,95)'},
        {id: 4, code: 'rgb(117,51,51)'},
        {id: 5, code: 'rgb(0,163,87)'},
        {id: 6, code: 'rgb(0,97,194)'},
        {id: 7, code: 'rgb(0,73,112)'},
        {id: 8, code: 'rgb(255,255,255)'}
      ]
    };
  },
  methods: {
    closeSearchKiji: function(){
      this.$emit('closeSearchKiji')
    },
    clearAllSearchKiji: function(){
      this.seasonSelected = []
      this.colorSelected = []
      this.patternSelected = []
    },
    confirmSearchOther: function(){
      this.$emit('confirmSearchKiji', {season: this.seasonSelected, color: this.colorSelected, pattern: this.patternSelected})
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
    },
    getFixedColor(id){
      if(this.colorFix.findIndex(item => item.id == id) !== -1){
        return this.colorFix.find(item => item.id == id).code
      } else{
        return '#ccc'
      }
    }
  },
  props: ['seasonSelected', 'colorSelected', 'patternSelected'],
  mounted() {
    if(Object.keys(this.kijiSearchData).length === 0){
      this.updateKijiSearchData()
    }
  },
  computed: {
    ...mapGetters([
      'kijiSearchData',
      'main_path'
    ]),
  },
  watch: {


  }
};
</script>

<style scoped>
	
</style>


