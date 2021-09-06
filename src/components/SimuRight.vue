<template>
    <div class="container-simuright d-flex flex-column">
      <div class="simuright-top d-flex justify-content-between">
        <div class="btn-group" role="group">
          <button class="simuright-modeBtn" :class="{active: optionMode == 1}">コードスキャン</button>
          <button class="simuright-modeBtn" :class="{active: optionMode == 2}">リストから選択</button>
        </div>
        <select aria-label="select-item" class="form-control" v-model="designActiveId" @change="changeItem($event)">
            <option v-for="design in designData" :key="design.design_id" :value="design.design_id">
              {{design.label}}
            </option>
        </select>
      </div>
      <div class="simuright-options">
        <div class="simuright-options-row">
          <div class="simuright-options-rowTop d-flex optionLv1"
            @click="openDetailOption('kiji')">
            <span class="simuright-options-label">生地</span>
            <div class="simuright-options-name"
            v-if="kijiActive">{{kijiObjectActive.name}}</div>
          </div>
        </div>
        <div class="simuright-options-row" 
          v-for="OptionCate in optionCateData" :key="OptionCate.genre">
          <div class="simuright-options-rowTop d-flex optionLv1">
            <span class="simuright-options-label">{{OptionCate.genre_name}}</span>
            <div class="simuright-options-name"></div>
          </div>
          <div class="simuright-options-rowDown">
            <ul class="simuright-optionLists">
              <li class="optionLv2 d-flex" 
              v-for="Option in OptionCate.option_list"
              :key="Option.id"
              @click="openDetailOption(Option.id)">
                <span class="simuright-options-label">{{Option.name}}</span>
                <div class="simuright-options-name"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="simuright-price d-flex justify-content-between">
          <div class="simuright-price-left">
            <p>商品価格：39,000円<br>+ カスタマイズ価格：4,500円</p>
            <p>お支払い金額: 43,500円</p>
          </div>
          <div class="simuright-price-right">
            <p class="delivery-date">仕上がり予定日：12月12日</p>
            <button class="btn btn-secondary">オーダー内容確認</button>
          </div>
      </div>

      <transition name="transitionRightToLeft">
        <div class="simuright-sub" 
        v-if="detailOptionActive != 0">
          <SelectKiji
            v-if="detailOptionActive == 'kiji'"
            :kijiList="kijiData"
            @closeOption="closeDetailOption($event)"
          />
          <SelectButton
            v-if="detailOptionActive == 1"
            :button_img_path="option_img_path"
            @closeOption="closeDetailOption($event)"
          />
        </div>
      </transition>
    </div>
</template>

<script>

import SelectKiji from "../components/SelectKiji.vue"
import SelectButton from "../components/SelectButton.vue"
import { mapGetters } from 'vuex';

export default {
    name: "SimuRight",
    components: {SelectKiji, SelectButton},
    data() {
        return {
          designActiveId: null,
          itemData: null,
          detailOption: {
            1: 'kiji',
          },
          detailOptionActive: 0,
          kijiData: [],
          optionCateData: [
            {genre: 1, genre_name:"付属", option_list:[
              {id: 1, name: 'ボタン'},{id: 2, name:'裏地'}
            ]},
            {genre: 2, genre_name:"ディティール", option_list:[
              {id: 3, name: 'ベント'},{id: 2, name:'ラペル'}
            ]},
          ]
        }
    },
    props: [],
    methods: {
      openDetailOption: function(optionid){
        this.detailOptionActive = optionid
      },
      closeDetailOption: function(){
        this.detailOptionActive = 0

        //update simulator model
        //kiji
        if(this.kijiActive != $('.kiji_preloader img').attr('kiji-id')){
          $('.kiji_preloader img').attr('src', this.kiji_img_path + this.kijiObjectActive.img)
          $('.kiji_preloader img').attr('kiji-id', this.kijiActive)
        }

      },
      changeItem: function(){
        this.$store.dispatch('handleChangeDesign', this.designActiveId)
      },

      //Promise to fetch Kiji
      getKijiFromAPI: async function(){
        let ret = null
        await this.axios.get('http://54.248.46.255/myshop/getkijilist/')
          .then(response => {
            console.log(response)
            ret = response.data.data
          })
          .catch(error => console.log(error))
        return ret
      },
      setKijiData: async function(){
        this.kijiData = await this.getKijiFromAPI()
      },
      getItemData: async function(){
        var data = new FormData();
        data.append('items', this.itemSelected);
        let ret = null
        if(this.itemSelected){
          await this.axios.post('http://54.248.46.255/myshop/getitem/', data)
            .then(response => {
              console.log(response.data.data)
              ret = response.data.data
            })
            .catch(error => console.log(error))
        } 
        return ret
      },
      setItemData: async function(){
        this.itemData = await this.getItemData()
      },
    },
    mounted() {
      this.setItemData()
      this.setKijiData()
      console.log(this.styleSelected)
      console.log(this.modeSelected)
      console.log(this.itemSelected)
    },
    watch: {
      designDefaultActive: function(){
        this.designActiveId = this.designDefaultActive
        this.$store.dispatch('handleChangeDesign', this.designDefaultActive)
      },
      itemData: function(){
        this.$emit('sendItemData', this.itemData)
      }
    },
    computed: {
      ...mapGetters([
        'kiji_img_path',
        'option_img_path',
        'optionMode',
        'styleSelected',
        'modeSelected',
        'itemSelected',
        'designActive',
        'kijiActive'
      ]),
      kijiObjectActive: function(){
        return Object.keys(this.kijiData)
              .map((key) => this.kijiData[key])
              .filter((item) => item.id === this.kijiActive)[0]
      },
      designData: function(){
        if(this.itemData){
          return this.itemData.design
        } else {
          return null
        }
      },
      designDefaultActive(){
        if(this.designData){
          return this.designData[0].design_id
        }
      }

    },
};
</script>

<style scoped>
    
</style>