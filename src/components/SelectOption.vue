<template>
  <div class="container-sub-page d-flex justify-content-between flex-column">
    <div class="simuright-sub-name d-flex justify-content-center align-items-center">{{optionParent.name}}選択</div>
    <div class="simuright-sub-content">
      <div class="simuright-sub-contentBox">
        <div class="simuright-sub-nav" v-if="cateLists.length > 0">
          <div class="simuright-sub-searchTop d-flex justify-content- align-items-center">
            <!-- Button Category -->
            <ul class="optionParentList d-flex justify-content-around align-items-center">
              <li class="optionParent"
              v-for="Cate in cateLists" :key="Cate.cate_id"
              :class="{active: cateCurr == Cate.cate_id}"
              @click="changeOptionCategory(Cate.cate_id)"
              >{{Cate.cate_name}}</li>
            </ul>
          </div>
        </div>
        <div class="optionParentCurrent d-flex justify-content-center align-items-center"
          v-if="cateCurrObj">
          <span>{{cateCurrObj.cate_name}}</span>
        </div>
        <div class="simuright-sub-result d-flex flex-wrap">
          <div v-for="Option in optionCurrLists" :key="Option.id" class="optionItem"
            :class="{active: (Option.id == optionSelected)}">
            <img :src="option_img_path + Option.img" alt=""
              @click="optionChange(Option.id, Option.simu_img, Option.type)">
            <span class="simuright-option-icon" @click="showOptionDetail(Option.id)"><i class="fas fa-info-circle"></i></span>
            <div class="simuright-option-name"
              @click="optionChange(Option.id, Option.simu_img, Option.type)">
              <span class="option-code">{{Option.name}}</span><br>
              <span class="option-name">{{Option.ua_code_jp}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="simuright-sub-navi d-flex align-items-center">
      <button class="simu-common-btn" @click="closeOption">戻る</button>
      <button class="simu-common-btn" @click="buttonConfirm">決定</button>
    </div>
    <transition name="transitionRightToLeft">
      <div class="simu-subpage" v-if="optionDetailId">
        <OptionDetail 
        :OptionDetailData="OptionDetailData"
        @close-detail="closeOptionDetail($event)"
        @option-confirm="confirmOptionDetail($event)"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OptionDetail from './OptionDetail.vue';

export default {
  name: "SelectOption",
  components: {OptionDetail},
  data() {
    return {
      optionSelected: 0,
      optionDetailId: null,
      cateCurr: null,
      cateLists: [],
      optionLists: {}
    };
  },
  methods: {
    closeOption: function(){
      this.$emit("closeOption")
    },
    closeOptionDetail:function(){
      this.optionDetailId = null
    },
    optionChange: function(id, img, type){
      if(this.optionSelected == id){
        return false
      } else{
        this.optionSelected = id
        this.$store.dispatch('handleChangeOptionTemp', {option_id: id, option_img: img, type: type})
      }
    },
    changeOptionCategory(cate_id){
      if(this.cateCurr == cate_id){
        return false
      } else{
        this.cateCurr = cate_id
      }
    },
    buttonConfirm: function(){
      if(this.optionSelected){
        var selectedObj = this.optionCurrLists.filter((item) => item.id == this.optionSelected)[0]
        this.$store.dispatch('handleChangeOption', {
          combine_id: this.designActive.combine_id,
          item_id: this.designActive.item_id,
          design_id: this.designActive.design_id,
          parent_id: this.optionDetailActive,
          option_id: this.optionSelected,
          cate_id: this.cateCurr,
          option_img: selectedObj.simu_img,
          name: selectedObj.name,
          type: selectedObj.type,
          cost: selectedObj.cost
        })
        this.closeOption()
      } else{
        if(this.optionCurrLists){
          alert('オプションを選択してください')
          return false
        }
      }
    },
    showOptionDetail(id){
      this.optionDetailId = id
    },
    confirmOptionDetail(data){
      this.optionChange(data.id, data.img, data.type)
      this.buttonConfirm()
    },
    getOptionData: async function(){
      var data = new FormData()
      data.append('model', this.modelSelected)
      data.append('design', this.designActive.design_id)
      data.append('parent', this.optionDetailActive)
      let ret = null
      if(this.modelSelected && this.designActive.design_id && this.optionDetailActive){
        await this.axios.request({
          url: 'http://54.248.46.255/myshop/getoptionlist/',
          method: 'post',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: {
            model: this.modelSelected,
            design: this.designActive.design_id,
            parent: this.optionDetailActive
          }
        })
        .then(response => {
          ret = response.data.data
        })
        .catch(error => {
          this.$store.dispatch('handleChangeErrorCode', 2)
          console.log(error)
        })
      } 
      return ret
    },
    setOptionData: async function(){
       const optionDataReceived = await this.getOptionData()
       if(optionDataReceived){
          this.optionLists = optionDataReceived.options
          this.cateLists = optionDataReceived.cates
          this.$store.dispatch('handleSaveOptionDataLoaded', {
            model_id: this.modelSelected,
            design_id: this.designActive.design_id,
            parent_id: this.optionDetailActive,
            cateLists: this.cateLists,
            optionLists: this.optionLists
          })
          await this.$store.dispatch('handleUpdateOptionDetailData', this.optionLists)
       }
    },
    setOptionSelected: function(){
      const optionSelectedIndex = this.optionSelectedData.findIndex(
        (item) => (
            item.combine_id == this.designActive.combine_id && 
            item.item_id == this.designActive.item_id &&
            item.design_id == this.designActive.design_id &&
            item.parent_id == this.optionDetailActive
      ))
      if(optionSelectedIndex !== -1){
        this.optionSelected = this.optionSelectedData[optionSelectedIndex].option_id
        this.cateCurr = this.optionSelectedData[optionSelectedIndex].cate_id
      }
    }
  },
  watch: {
    cateLists: function(){
      if(this.cateLists.length > 0){
        const cateCurrTemp = this.cateLists.findIndex(
          (item) => (item.cate_id == this.cateCurr)
        )
        if(cateCurrTemp == -1){
          this.cateCurr = this.cateLists[0].cate_id
        }
      } else{
        this.cateCurr = null
      }
    }
  },
  props: [],
  mounted() {
    //if save loaded data then no download data from api
    if(this.optionDataLoaded){
      const loadedDataIndex = this.optionDataLoaded.findIndex(
        (item) => item.model_id == this.modelSelected
        && item.design_id == this.designActive.design_id
        && item.parent_id == this.optionDetailActive
      )
      if(loadedDataIndex !== -1) {
        this.optionLists = this.optionDataLoaded[loadedDataIndex].optionLists
        this.cateLists = this.optionDataLoaded[loadedDataIndex].cateLists
      } else{
        this.setOptionData()
      }
    } else{
        this.setOptionData()
    }
    this.setOptionSelected()
  },
  computed: {
    ...mapGetters([
      'option_img_path',
      'modelSelected',
      'designActive',
      'optionSelectedData',
      'optionDetailActive',
      'optionDataLoaded',
      'optionParentData',
      'optionDetailData'
    ]),
    cateCurrObj: function(){
      if(this.cateLists && this.cateCurr){
        return this.cateLists.filter((item) => item.cate_id == this.cateCurr)[0];
      } else{
        return null
      }
    },
    optionCurrLists: function(){
      if(this.optionLists && this.cateCurr){
        return this.optionLists[this.cateCurr];
      } else{
        return this.optionLists[this.optionDetailActive];
      }
    },
    OptionDetailData: function(){
      return this.optionCurrLists.filter((item) => item.id == this.optionDetailId)[0]
    },
    optionParent: function(){
      var parentLists = this.optionParentData.filter((item) => item.design_id == this.designActive.design_id)[0];
      var parentCurr = parentLists.parentData.filter((item) => item.parent_id == this.optionDetailActive);
      if(parentCurr){
        return parentCurr[0]
      } else{
        return {}
      }
    }
  }
};
</script>

<style scoped>
	
</style>


