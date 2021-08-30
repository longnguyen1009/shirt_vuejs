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
          <div v-for="(Kiji, id) in kijiList" :key="id">
            <img :src="kiji_img_path + Kiji.img" alt="">
            <span><i class="fas fa-info-circle"></i></span>
            <div class="simuright-kiji-name">
              <span class="kiji-code">{{Kiji.code}}</span><br>
              <span class="kiji-name">{{Kiji.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="simuright-sub-navi d-flex align-items-center">
      <button class="simu-common-btn">戻る</button>
      <button class="simu-common-btn">決定</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "SelectKiji",
  components: {},
  data() {
    return {
     kijiList: [
       {id: 1, name: "TECH PLUSH WOOL", code: "138103A", img: "0730151611_6103992bd5250.jpeg"},
       {id: 2, name: "TECH PLUSH WOOL", code: "138103A", img: "0730151510_610398ee19b7d.jpeg"},
       {id: 3, name: "TECH PLUSH WOOL", code: "138103A", img: "0730151444_610398d4a58ff.jpeg"},
       {id: 4, name: "TECH PLUSH WOOL", code: "138103A", img: "0730151400_610398a8d28a9.jpeg"},
       {id: 5, name: "TECH PLUSH WOOL", code: "138103A", img: "0730151400_610398a8d28a9.jpeg"}
     ]
    };
  },
  methods: {
    
  },
  props: ['kiji_img_path'],
  mounted() {
    //  this.axios.get('http://54.248.46.255/myshop/getmodel/'+this.modelId)
    //   .then(response => {
    //     this.modelDetail = response.data.data
    //     // this.modelDetail.itemlist.map(function(value, key) {
    //     //   this.itemSelected.push({"type": value.item_type_id, "itemid": ""})
    //     // })
    //   })
    //   .catch(error => console.log(error))
  },
};
</script>

<style scoped>
	
</style>


