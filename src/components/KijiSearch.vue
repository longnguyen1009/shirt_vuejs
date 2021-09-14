<template>
  <div class="container-kiji d-flex justify-content-between flex-column">
    <div class="simuright-sub-name d-flex justify-content-center align-items-center">生地選択</div>
    <div class="simuright-sub-content">
      <div class="kijiSearch-box">
        <div class="kijiSearch-label">シーズン</div>
        <div class="kijiSearch-option">
          <ul class="kijiSearch-option-list">
            <li class="kijiSearch-option-item">
              <input type="checkbox" id="searchType-1">
              <label for="searchType-1">春夏</label>
            </li>
            <li class="kijiSearch-option-item">
              <input type="checkbox" id="searchType-2">
              <label for="searchType-2">秋冬</label>
            </li>
            <li class="kijiSearch-option-item">
              <input type="checkbox" id="searchType-3">
              <label for="searchType-3">通年</label>
            </li>
          </ul>
        </div>
      </div>
      <div class="kijiSearch-box">
        <div class="kijiSearch-label">カラー</div>
        <div class="kijiSearch-option">
          <ul class="kijiSearch-option-list">
            <li class="kijiSearch-option-item">
              <input type="checkbox" id="searchType-4">
              <label for="searchType-4">ブルー</label>
            </li>
            <li class="kijiSearch-option-item">
              <input type="checkbox" id="searchType-5">
              <label for="searchType-5">グレー</label>
            </li>
            <li class="kijiSearch-option-item">
              <input type="checkbox" id="searchType-6">
              <label for="searchType-6">ホワイト</label>
            </li>
            <li class="kijiSearch-option-item">
              <input type="checkbox" id="searchType-7">
              <label for="searchType-7">ホワイト</label>
            </li>
            <li class="kijiSearch-option-item">
              <input type="checkbox" id="searchType-8">
              <label for="searchType-8">その他</label>
            </li>
            <li class="kijiSearch-option-item">
              <input type="checkbox" id="searchType-9">
              <label for="searchType-9">ネイビー</label>
            </li>
            <li class="kijiSearch-option-item">
              <input type="checkbox" id="searchType-10">
              <label for="searchType-10">ダークグレー</label>
            </li>
          </ul>
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

import { mapGetters } from 'vuex';

export default {
  name: "KijiSearch",
  components: {},
  data() {
    return {
    };
  },
  methods: {
    // closeKijiDetail: function(){
    //   this.$emit("close-detail")
    // },
    // kijiConfirmDetail: function(){
    //   this.$emit("kiji-confirm", {"id": this.kijiDetailData.id, "img": this.kijiDetailData.img})
    // }
  },
  props: [],
  mounted() {
    
  },
  computed: {
    ...mapGetters([

    ]),
  }
};
</script>

<style scoped>
	
</style>


