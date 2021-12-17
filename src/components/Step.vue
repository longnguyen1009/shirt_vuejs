<template>
  <div class="container-step">
    <div class="simu-stepgroup btn-group" role="group">
      <div
        variant="outline-dark"
        class="stepBtn col-md-3"
        v-for="stepItem in steps"
        :key="stepItem.id"
        v-bind:class="[step == stepItem.id ? 'active' : '']"
      >
      {{ stepItem.name }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Step",
  data() {
    return {
      steps: [
        {
          id: 1,
          stepdisp: 1,
          name: "スタイル選択", 
          user: "all",
          katagaminaihito: "false",
        },
        {
          id: 2,
          stepdisp: 2,
          name: "オーダーシミュレーション",
          user: "all",
          katagaminaihito: "false",
        },
        {
          id: 3,
          stepdisp: 3,
          name: "オーダー内容確認",
          user: "shop",
          katagaminaihito: "true",
        },
        {
          id: 4,
          name: "オーダー完了",
          user: "shop",
          katagaminaihito: "false",
        },
      ],
    };
  },
  methods: {
    doBack: function(){
      //now is step 1, model select page
      if(this.step == 1){
        if(this.page == 2){
          this.$store.dispatch('handleChangePage', 1)
        } else{
          window.location.href = this.main_path + "myshop/neworder/";
        }
      } else if(this.step == 2){
        this.$store.dispatch('handleChangeModelTemp', {styleId: this.styleSelected, modelId: this.modelSelected})
        this.$store.dispatch('handleChangePage', 2)
        this.$store.dispatch('handleChangeStep', 1)
      } else{
        this.$store.dispatch('handleChangeStep', this.step - 1)
      }
    },
    testAlert: function(){
      alert('test')
    }
  },
  props: [],
  watch: {
    step: function(){
      if(this.step == 3){
        //Hide Cart button
        $('.header-cart-btn').css("display", "none");
      } else if(this.step == 2){
        $('.header-cart-btn').css("display", "block");
      }
    }
  },
  computed: {
    ...mapGetters([
      'step',
      'page',
      'styleSelected',
      'modelSelected',
    ]),
    canBack(){
      // if(this.step < 4){
      //   return true
      // } else{
      //   return false
      // }
      return true
    }
  }
};
</script>
