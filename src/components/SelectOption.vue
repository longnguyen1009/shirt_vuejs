<template>
  <div class="container-sub-page d-flex justify-content-between flex-column">
    <div class="simuright-sub-name d-flex justify-content-center align-items-center">ボタン選択</div>
    <div class="simuright-sub-content">
      <div class="simuright-sub-contentBox">
        <div class="simuright-sub-nav">
          <div class="simuright-sub-searchTop d-flex justify-content- align-items-center">
            <!-- Button Category -->
            <ul class="optionParentList d-flex justify-content-around align-items-center">
              <li class="optionParent"
              v-for="optionParent in optionLists" :key="optionParent.parent_id"
              :class="{active: optionCurrParent == optionParent.parent_id}"
              @click="changeOptionParent(optionParent.parent_id)"
              >{{optionParent.parent_name}}</li>
            </ul>
          </div>
        </div>
        <div class="optionParentCurrent d-flex justify-content-center align-items-center">
            <span>{{optionParentCurrObj.parent_name}}</span>
          </div>
        <div class="simuright-sub-result d-flex flex-wrap">
          <div v-for="Option in optionCurrLists" :key="Option.id" class="optionItem"
            :class="{active: (Option.id == optionSelected)}">
            <img :src="button_img_path + Option.img" alt=""
              @click="optionChange(Option.id, Option.img)">
            <span class="simuright-option-icon" @click="showOptionDetail(Option.id)"><i class="fas fa-info-circle"></i></span>
            <div class="simuright-option-name"
              @click="optionChange(Option.id, Option.img)">
              <span class="option-code">{{Option.code}}</span><br>
              <span class="option-name">{{Option.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="simuright-sub-navi d-flex align-items-center">
      <button class="simu-common-btn" @click="closeOption">戻る</button>
      <button class="simu-common-btn" @click="buttonConfirm">決定</button>
    </div>
    <!-- <transition name="transitionRightToLeft">
      <div class="simu-subpage" v-if="buttonDetailId != 0">
        <ButtonDetail 
        :buttonDetailData="buttonDetailData"
        :button_img_path="button_img_path"
        @close-detail="closeButtonDetail($event)"
        @button-confirm="confirmButtonDetail($event)"
        />
      </div>
    </transition> -->
  </div>
</template>

<script>
// import ButtonDetail from './ButtonDetail.vue';

export default {
  name: "SelectOption",
  // components: {ButtonDetail},
  data() {
    return {
      optionSelected: 0,
      optionDetailId: 0,

      optionCurrParent: 1,

      optionLists: [
        {parent_id: 1, parent_name: 'NUT', option_list: [
          {id: 1, name: "ART SOV", code: "0 (WHITE)", img: "08281216_5d65f21c28dde.jpg"},
          {id: 2, name: "ART SOV", code: "04 (GREY)", img: "08281216_5d65f207e6bb2.jpg"},
          {id: 3, name: "ART SOV", code: "06 (DARK GREY)", img: "08281216_5d65f2284f9d5.jpg"},
          {id: 4, name: "ART SOV", code: "0 (WHITE)", img: "08281217_5d65f239b1408.jpg"},
          {id: 5, name: "ART SOV", code: "04 (GREY)", img: "08281217_5d65f2463daf7.jpg"},
          {id: 6, name: "ART SOV", code: "06 (DARK GREY)", img: "08281217_5d65f2598806a.jpg"},
          {id: 7, name: "ART SOV", code: "06 (DARK GREY)", img: "08281217_5d65f2598806a.jpg"},
          {id: 8, name: "ART SOV", code: "06 (DARK GREY)", img: "08281217_5d65f2598806a.jpg"},
          {id: 9, name: "ART SOV", code: "06 (DARK GREY)", img: "08281217_5d65f2598806a.jpg"},
        ]},
        {parent_id: 2, parent_name: 'HORN', option_list: [
          {id: 1, name: "ART SOV", code: "0 (WHITE)", img: "08281216_5d65f21c28dde.jpg"},
          {id: 2, name: "ART SOV", code: "04 (GREY)", img: "08281216_5d65f207e6bb2.jpg"},
          {id: 3, name: "ART SOV", code: "06 (DARK GREY)", img: "08281216_5d65f2284f9d5.jpg"},
          {id: 4, name: "ART SOV", code: "0 (WHITE)", img: "08281217_5d65f239b1408.jpg"},
          {id: 5, name: "ART SOV", code: "04 (GREY)", img: "08281217_5d65f2463daf7.jpg"},
          {id: 6, name: "ART SOV", code: "06 (DARK GREY)", img: "08281217_5d65f2598806a.jpg"}
        ]},
        {parent_id: 3, parent_name: 'METAL', option_list: [
          {id: 1, name: "ART SOV", code: "0 (WHITE)", img: "08281216_5d65f21c28dde.jpg"},
          {id: 2, name: "ART SOV", code: "04 (GREY)", img: "08281216_5d65f207e6bb2.jpg"},
          {id: 3, name: "ART SOV", code: "06 (DARK GREY)", img: "08281216_5d65f2284f9d5.jpg"},
          {id: 4, name: "ART SOV", code: "0 (WHITE)", img: "08281217_5d65f239b1408.jpg"},
          {id: 5, name: "ART SOV", code: "04 (GREY)", img: "08281217_5d65f2463daf7.jpg"},
          {id: 6, name: "ART SOV", code: "06 (DARK GREY)", img: "08281217_5d65f2598806a.jpg"}
        ]},
        {parent_id: 4, parent_name: 'SHELL', option_list: [
          {id: 1, name: "ART SOV", code: "0 (WHITE)", img: "08281216_5d65f21c28dde.jpg"},
          {id: 2, name: "ART SOV", code: "04 (GREY)", img: "08281216_5d65f207e6bb2.jpg"},
          {id: 3, name: "ART SOV", code: "06 (DARK GREY)", img: "08281216_5d65f2284f9d5.jpg"},
          {id: 4, name: "ART SOV", code: "0 (WHITE)", img: "08281217_5d65f239b1408.jpg"},
          {id: 5, name: "ART SOV", code: "04 (GREY)", img: "08281217_5d65f2463daf7.jpg"},
          {id: 6, name: "ART SOV", code: "06 (DARK GREY)", img: "08281217_5d65f2598806a.jpg"}
        ]},
        {parent_id: 5, parent_name: 'くるみ釦', option_list: [
          {id: 1, name: "ART SOV", code: "0 (WHITE)", img: "08281216_5d65f21c28dde.jpg"},
          {id: 2, name: "ART SOV", code: "04 (GREY)", img: "08281216_5d65f207e6bb2.jpg"},
          {id: 3, name: "ART SOV", code: "06 (DARK GREY)", img: "08281216_5d65f2284f9d5.jpg"},
          {id: 4, name: "ART SOV", code: "0 (WHITE)", img: "08281217_5d65f239b1408.jpg"},
          {id: 5, name: "ART SOV", code: "04 (GREY)", img: "08281217_5d65f2463daf7.jpg"},
          {id: 6, name: "ART SOV", code: "06 (DARK GREY)", img: "08281217_5d65f2598806a.jpg"}
        ]},
        {parent_id: 6, parent_name: 'PE', option_list: [
          {id: 1, name: "ART SOV", code: "0 (WHITE)", img: "08281216_5d65f21c28dde.jpg"},
          {id: 2, name: "ART SOV", code: "04 (GREY)", img: "08281216_5d65f207e6bb2.jpg"},
          {id: 3, name: "ART SOV", code: "06 (DARK GREY)", img: "08281216_5d65f2284f9d5.jpg"},
          {id: 4, name: "ART SOV", code: "0 (WHITE)", img: "08281217_5d65f239b1408.jpg"},
          {id: 5, name: "ART SOV", code: "04 (GREY)", img: "08281217_5d65f2463daf7.jpg"},
          {id: 6, name: "ART SOV", code: "06 (DARK GREY)", img: "08281217_5d65f2598806a.jpg"}
        ]},
      ],

    };
  },
  methods: {
    closeOption: function(){
      this.$emit("closeOption")
    },
    closeButtonDetail:function(){
      this.buttonDetailId = 0
    },
    optionChange: function(id, img){
      this.optionSelected = id
      // $('.button_preloader img').attr('src', this.button_img_path + img)
    },
    changeOptionParent(parent_id){
      if(this.optionCurrParent == parent_id){
        return false
      } else{
        this.optionCurrParent = parent_id
      }
    },
    buttonConfirm: function(){
      if(this.optionSelected == 0){
        alert('ボタンを選択してください')
      } else{
        // this.$emit("option-confirm", this.buttonSelected)
        this.closeOption()
      }
    },
    showOptionDetail(id){
      this.optionDetailId = id
    },
    confirmButtonDetail(data){
      this.optionChange(data.id, data.img)
      this.buttonConfirm()
    }
  },
  props: ['button_img_path', 'buttonActive'],
  mounted() {
    console.log("aaaaaaaa");
  },
  computed: {
    optionParentCurrObj: function(){
      if(this.optionLists != 0){
        return Object.keys(this.optionLists)
                  .map((key) => this.optionLists[key])
                  .filter((option_parent) => option_parent.parent_id === this.optionCurrParent)[0];
      } else{
        return []
      }
    },
    optionCurrLists: function(){
      if(this.optionParentCurrObj){
        return this.optionParentCurrObj.option_list;
      } else{
        return []
      }
    }
  }
};
</script>

<style scoped>
	
</style>


