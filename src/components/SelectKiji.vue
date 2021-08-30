<template>
  <div class="container-kiji d-flex justify-content-between flex-column">
    <div class="simuright-sub-name d-flex justify-content-center align-items-center">生地選択</div>
    <div class="simuright-sub-content">
      <div class="simuright-sub-kiji">
        <div class="simuright-sub-search">
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
        <div class="simuright-kiji-list d-flex flex-wrap">
          <div v-for="(Kiji, id) in kijiList" :key="id" class="kijiItem"
            :class="{active: (Kiji.id == kijiSelected)}">
            <img :src="kiji_img_path + Kiji.img" alt=""
              @click="kijiChange(Kiji.id, Kiji.img)">
            <span class="simuright-kiji-icon" @click="showKijiDetail()"><i class="fas fa-info-circle"></i></span>
            <div class="simuright-kiji-name"
              @click="kijiChange(Kiji.id, Kiji.img)">
              <span class="kiji-code">{{Kiji.code}}</span><br>
              <span class="kiji-name">{{Kiji.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="simuright-sub-navi d-flex align-items-center">
      <button class="simu-common-btn" @click="closeOption">戻る</button>
      <button class="simu-common-btn" @click="kijiConfirm">決定</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "SelectKiji",
  components: {},
  data() {
    return {
      kijiSelected: 0,
    //  kijiList: [
    //    {id: 1, name: "TECH PLUSH WOOL", code: "138103A", img: "0730151611_6103992bd5250.jpeg"},
    //    {id: 2, name: "TECH PLUSH WOOL", code: "138103A", img: "0730151510_610398ee19b7d.jpeg"},
    //    {id: 3, name: "TECH PLUSH WOOL", code: "138103A", img: "0730151444_610398d4a58ff.jpeg"},
    //    {id: 4, name: "TECH PLUSH WOOL", code: "138103A", img: "0730151400_610398a8d28a9.jpeg"},
    //    {id: 5, name: "TECH PLUSH WOOL", code: "138103A", img: "0730151400_610398a8d28a9.jpeg"}
    //  ],
    };
  },
  methods: {
    closeOption: function(){
      this.$emit("closeOption")
    },
    kijiChange: function(id, img){
      this.kijiSelected = id
      $('.kiji_preloader img').attr('src', this.kiji_img_path + img)
    },
    kijiConfirm: function(){
      if(this.kijiSelected == 0){
        alert('生地を選択してください')
      } else{
        this.$emit("kiji-confirm", this.kijiSelected)
        this.closeOption()
      }
    }
  },
  props: ['kiji_img_path', 'kijiList', 'kijiActive'],
  mounted() {
    console.log(this.kijiList)
    this.kijiSelected = this.kijiActive
    if(this.kijiList.length == 0){
      this.axios.get('http://54.248.46.255/myshop/getkijilist/')
      .then(response => {
        this.$emit('set-kiji', response.data.data)
      })
      .catch(error => console.log(error))
    }
  },
};
</script>

<style scoped>
	
</style>


