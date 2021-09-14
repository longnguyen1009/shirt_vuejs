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
          v-for="Genre in genreData" :key="Genre.genre_id">
          <div class="simuright-options-rowTop optionLv1 d-flex align-items-center" @click="showOptionParent($event)">
            <span class="simuright-options-label">{{Genre.genre_name}}</span>
            <div class="simuright-options-name"></div>
          </div>
          <div class="simuright-options-rowDown">
            <ul class="simuright-optionLists">
              <li class="optionLv2 d-flex align-items-center"
              v-for="Option in optionParentSortData[Genre.genre_id]" :key="Option.parent_id"
              @click="openDetailOption(Option.parent_id)">
                <!-- <span class="simuright-options-img"><img :src="option_img_path+Option.img" alt=""></span> -->
                <span class="simuright-options-label">{{Option.name}}</span>
                <div class="simuright-options-name">{{optionSelectedValue(Option.parent_id)}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="simuright-price d-flex justify-content-between">
          <div class="simuright-price-left d-flex justify-content-between flex-column">
            <p class="simuright-prices-basic">商品価格：{{moneyTypeShow01(itemPrice)}}<br>+ カスタマイズ価格：{{moneyTypeShow01(optionPrice)}}円</p>
            <p class="simuright-prices-total">お支払い金額: <span class="totalPayment">{{moneyTypeShow01(sumPayment)}}円</span></p>
          </div>
          <div class="simuright-price-right d-flex justify-content-between flex-column">
            <p class="delivery-date">仕上がり予定日：12月12日</p>
            <button class="simu-common-btn">オーダー内容確認</button>
          </div>
      </div>

      <transition name="transitionRightToLeft">
        <div class="simuright-sub" 
          v-if="optionDetailActive">
          <SelectKiji
            v-if="optionDetailActive == 'kiji'"
            @closeOption="closeDetailOption($event)"
          />
          <SelectOption
            v-if="optionDetailActive != 'kiji'"
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
          optionParentDataTemp: {},
          genreData: {},
        }
    },
    props: [],
    methods: {
      openDetailOption: function(optionid){
        this.$store.dispatch('handleChangeOptionDetailActive', optionid)
      },
      closeDetailOption: function(){
        this.$store.dispatch('handleChangeOptionDetailActive', null)
        //update simulator model
        //option
        this.$store.dispatch('handleChangeOptionTemp', null)

        //kiji
        if(!this.kijiActive){
          $('.kiji_preloader img').attr('src', '/html/upload/save_image/0730151143_6103981fcfa43.jpeg')
          $('.kiji_preloader img').attr('kiji-id', '')
        }
        if(this.kijiActive && this.kijiActive != $('.kiji_preloader img').attr('kiji-id')){
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
        let kijiData = await this.getKijiFromAPI()
        this.$store.dispatch('handleChangeKijiData', kijiData)
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
        let parentDataReceived = await this.getOptionParentData()
        this.genreData = parentDataReceived.genreData
        this.optionParentDataTemp = parentDataReceived.optionData
        this.$store.dispatch('handleChangeOptionParentData', 
          {design_id: this.designActive.design_id, genreData: this.genreData, parentData: this.optionParentDataTemp}
        )
      },
      showOptionParent(event){
        $(event.target).parents('.simuright-options-row').toggleClass('show')
      },
      optionSelectedValue(parent_id){
        var option_selected_index = this.optionSelectedData.findIndex(
            (item) => item.combine_id == this.designActive.combine_id &&
                      item.item_id == this.designActive.item_id &&
                      item.design_id == this.designActive.design_id &&
                      item.parent_id == parent_id
          )
        if(option_selected_index !== -1){
          return this.optionSelectedData[option_selected_index].name
        }
        return ''
      },
      //3500 -> 3,500
      moneyTypeShow01(number){
        return new Intl.NumberFormat().format(number)
      },
      //3500 -> ￥3,500
      moneyTypeShow02(number){
        new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number)
      }
    },
    mounted() {
      this.setItemData()
      this.setKijiData()
    },
    watch: {
      itemData: function(){
        this.$emit('sendItemData', this.itemData)
      },
      designActiveSplit: function(){
        this.$store.dispatch('handleChangeDesign', this.designActiveSplit)
      },
      designActive: function(){
        let optionParentIndex = this.optionParentData.findIndex(
          (item) => item.design_id === this.designActive.design_id
        )
        if(optionParentIndex !== -1){
          this.genreData = this.optionParentData[optionParentIndex].genreData
          this.optionParentDataTemp = this.optionParentData[optionParentIndex].parentData
        } else{
          this.updateOptionParent()
        }
      },
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
        'kijiActive',
        'optionDetailActive',
        'optionSelectedData',
        'optionDataLoaded',
        'kijiData',
        'optionParentData'
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
      itemPrice: function(){
        return 39000
      },
      optionPrice: function(){
        let optionTotalprice = 0
        this.optionSelectedData.forEach(val => {
          optionTotalprice += Number(val.cost);
        });
        return optionTotalprice
      },
      sumPayment: function(){
        return this.itemPrice + this.optionPrice
      },
      optionParentSortData: function(){
        let parentSortData = []
        if(this.genreData && this.optionParentDataTemp){
          for (const genre_index in this.genreData){
            parentSortData[this.genreData[genre_index].genre_id] = this.optionParentDataTemp.filter(
              (item) => item.genre_id === this.genreData[genre_index].genre_id
            )
          }
          return parentSortData
        } else{
          return []
        }
      }
    },
};
</script>

<style scoped>
    
</style>