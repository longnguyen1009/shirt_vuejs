<template>
    <div class="container-simuright d-flex flex-column">
      <div class="simuright-top d-flex justify-content-between">
        <div class="btn-group" role="group">
          <button class="simuright-modeBtn" :class="{active: optionMode == 1}">コードスキャン</button>
          <button class="simuright-modeBtn" :class="{active: optionMode == 2}">リストから選択</button>
        </div>
        <select aria-label="select-item" class="form-control" v-model="designActiveId" @change="changeItem($event)">
            <option v-for="(design, id) in designData" :key="id" :value="id">
              {{design.design_label}}
            </option>
        </select>
      </div>
      <div class="simuright-options">
        <div class="simuright-options-row">
          <div class="simuright-options-rowTop d-flex optionLv1 align-items-center"
            @click="openDetailOption('kiji')">
            <span class="simuright-options-label">生地</span>
            <div class="simuright-options-name"
            v-if="kijiActive">{{kijiObjectActive.name}}</div>
          </div>
        </div>
        <div class="simuright-options-row" 
          v-for="OptionParents in optionParentData" :key="OptionParents.genre_id">
          <div class="simuright-options-rowTop optionLv1 d-flex align-items-center">
            <span class="simuright-options-label">{{OptionParents.genre_name}}</span>
            <div class="simuright-options-name"></div>
          </div>
          <div class="simuright-options-rowDown">
            <ul class="simuright-optionLists">
              <li class="optionLv2 d-flex align-items-center"
              v-for="Options in OptionParents.options" :key="Options.parent_id"
              @click="openDetailOption(Options.parent_id)">
                <span class="simuright-options-img"><img :src="option_img_path+Options.img" alt=""></span>
                <span class="simuright-options-label">{{Options.name}}</span>
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
          <SelectOption
            v-if="detailOptionActive && detailOptionActive != 'kiji'"
            @closeOption="closeDetailOption($event)"
          />
        </div>
      </transition>
    </div>
</template>

<script>

import SelectKiji from "../components/SelectKiji.vue"
import SelectOption from "../components/SelectOption.vue"
import { mapGetters } from 'vuex';

export default {
    name: "SimuRight",
    components: {SelectKiji, SelectOption},
    data() {
        return {
          designActiveId: 0,
          itemData: null,
          optionParentData: {},
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
        // this.$store.dispatch('handleChangeDesign', this.designActiveSplit())
      },
      
      //Promise to fetch Kiji
      getKijiFromAPI: async function(){
        let ret = null
        await this.axios.get('http://54.248.46.255/myshop/getkijilist/')
          .then(response => {
            // console.log(response)
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
      getOptionParentData: async function(){
        var data = new FormData();
        data.append('design_id', this.designActive.design_id);
        let ret = null
        if(this.designActive.design_id){
          await this.axios.post('http://54.248.46.255/myshop/getoptionparent/', data)
            .then(response => {
              console.log(response.data.data)
              ret = response.data.data
            })
            .catch(error => console.log(error))
        } 
        return ret
      },
      updateOptionParent: async function(){
        this.optionParentData = await this.getOptionParentData()
      }
    },
    mounted() {
      this.setItemData()
      this.setKijiData()
      console.log({
        styleId: this.styleSelected,
        modelId: this.modelSelected,
        itemId: this.itemSelected
      })
    },
    watch: {
      itemData: function(){
        this.$emit('sendItemData', this.itemData)
      },
      designActiveSplit: function(){
        this.$store.dispatch('handleChangeDesign', this.designActiveSplit)
      },
      designActive: function(){
        console.log(this.designActive)

        this.updateOptionParent()
      }
    },
    computed: {
      ...mapGetters([
        'kiji_img_path',
        'option_img_path',
        'optionMode',
        'styleSelected',
        'modelSelected',
        'itemSelected',
        'designActive',
        'kijiActive'
      ]),
      kijiObjectActive: function(){
        return this.kijiData.filter((item) => item.id === this.kijiActive)[0]
      },
      designData: function(){
        return (this.itemData) ? this.itemData.design : null
      },
      designActiveSplit: function(){
        if(this.designData){
          return {
            combine_id: this.designData[this.designActiveId].combine_id,
            item_id: this.designData[this.designActiveId].item_id,
            design_id: this.designData[this.designActiveId].design_id
          }
        } else{
          return {}
        }
      },
      


    },
};
</script>

<style scoped>
    
</style>