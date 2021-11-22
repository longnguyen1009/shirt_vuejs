<template>
  <div class="container-hcsearch">
    <div class="hcsearch-fade" @click="closeModal"></div>
    <div class="hcsearch-content">
      <span class="closeBtn" @click="closeModal"><img :src="main_path + 'html/user_data/assets/img/common/header_close_white.png'" alt=""></span>
      <div class="hcsearch-header d-flex align-items-center justify-content-center">HC情報を検索</div>
      <div class="hcsearch-body">
        <div class="loaddingDataIo" v-if="loaddingDataHcSearch">
          <div class="loadingio-spinner-spinner-482naetb3m">
            <div class="ldio-2vyxc9gibh9">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div>
            </div>
          </div>
        </div>
        <div class="hcsearch-guide">
          <span>HC番号または</span><br>
          <span>HC番号以外の場合は２項目入力してください。</span><br>
        </div>
        <div class="hcsearch-form">
          <div class="hcsearch-form-top">
            <dl class="hcsearch-form-item">
              <dt class="hcsearch-for-label">HC番号（数字10桁）</dt>
              <dd class="hcsearch-for-input">
                <input type="text" v-model="hcSearchData.hc_no" maxlength="10">
                <span class="hcsearch-error" v-if="hcSearchError.hc_no">{{hcSearchError.hc_no}}</span>
              </dd>
            </dl>
            <dl class="hcsearch-form-item">
              <dt class="hcsearch-for-label">氏(カナ)</dt>
              <dd class="hcsearch-for-input">
                <input type="text" v-model="hcSearchData.hc_name01" maxlength="10">
                <span class="hcsearch-error" v-if="hcSearchError.hc_name01">{{hcSearchError.hc_name01}}</span>
              </dd>
            </dl>
            <dl class="hcsearch-form-item">
              <dt class="hcsearch-for-label">名(カナ)</dt>
              <dd class="hcsearch-for-input">
                <input type="text" v-model="hcSearchData.hc_name02" maxlength="10">
                <span class="hcsearch-error" v-if="hcSearchError.hc_name02">{{hcSearchError.hc_name02}}</span>
              </dd>
            </dl>
            <dl class="hcsearch-form-item">
              <dt class="hcsearch-for-label">電話番号（下4桁）</dt>
              <dd class="hcsearch-for-input">
                <input type="text" v-model="hcSearchData.hc_phone" maxlength="4">
                <span class="hcsearch-error" v-if="hcSearchError.hc_phone">{{hcSearchError.hc_phone}}</span>
              </dd>
            </dl>
            <dl class="hcsearch-form-item">
              <dt class="hcsearch-for-label">携帯電話番号（下4桁）</dt>
              <dd class="hcsearch-for-input">
                <input type="text" v-model="hcSearchData.hc_mobilephone" maxlength="4">
                <span v-if="hcSearchError.hc_mobilephone">{{hcSearchError.hc_mobilephone}}</span>
              </dd>
            </dl>
          </div>
          <div class="hcsearch-form-bottom d-flex align-items-center justify-content-center">
            <button class="simu-common-btn btnSize01 white" @click="doClearSeachHc">クリア</button>
            <button class="simu-common-btn gray btnSize01" @click="doSeachHc">検索</button>
          </div>
        </div>
        <div class="hcsearch-result" v-if="searchFinish">
          <p class="ec-para-normal">{{arrHcResult.length}}件の履歴があります</p>
          <table class="hcsearch-result-table">
              <thead>
                  <tr>
                      <th scope="col" colspan="1">HC番号</th>
                      <th scope="col" colspan="1">お客様名</th>
                      <th scope="col" colspan="1">電話番号</th>
                      <th scope="col" colspan="1">最終購入日</th>
                      <th scope="col" colspan="1">選択</th>
                  </tr>
              </thead>
              <tbody>
                <template v-if="arrHcResult.length > 0">
                  <tr v-for="(HC, id) in getHcItems" :key="id">
                      <td scope="row" class="">{{HC.kaiinNo}}</td>
                      <td>{{HC.nameKn1}}{{HC.nameKn2}}</td>
                      <td>{{HC.tel3 ? HC.tel3.slice(HC.tel3.length - 4) : HC.keiTelNo3.slice(HC.keiTelNo3.length - 4)}}</td>
                      <td>{{getDateFomat(HC.birthDate)}}</td>
                      <td>
                          <button class="simu-common-btn gray btnSize01" @click="HcConfirm(HC)">選択</button>
                      </td>
                  </tr>
                </template>
                <tr v-if="getHcItems.length == 0">
                    <td colspan="10">検索結果はありません。</td>
                </tr>
              </tbody>
          </table>
          <Paginate
            :page-count="getPageCount"
            :click-handler="clickCallback"
            :prev-text="'前へ'"
            :next-text="'次へ'"
            :container-class="'ec-pager'"
            :page-class="'ec-pager__item'"
            :next-class="'ec-pager__item'"
            :prev-class="'ec-pager__item'"
            :first-last-button="true"
            :first-button-text="'最初へ'"
            :page-range="5"
            :last-button-text="'最後へ'"
            hide-prev-next="true"
            break-view-class="break"
            v-if="getPageCount > 1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Paginate from 'vuejs-paginate'

export default {
  name: "SimuHcSearch",
  components: {Paginate},
  data() {
    return {
      hcSearchData:{},
      hcSearchError:{},
      loaddingDataHcSearch: false,
      arrHcResult: [],
      searchFinish: false,

      //pagination
      perPage: 5,
      currentPage: 1
    };
  },
  methods: {
    closeModal: function(){
      this.$emit('closeHcModal')
    },
    getDateFomat(date){
      let date_string = date ? new Date(date * 1000) : new Date()
      return Intl.DateTimeFormat("ja-JP").format(date_string)
    },
    checkErrors: function(){
      Object.keys(this.hcSearchError).forEach(key => {
        delete this.hcSearchError[key]
      })
      //HC番号 : max_length 10

      if(Object.values(this.hcSearchData).filter(item => item).length == 0){
        this.hcSearchError.hc_no = '入力してください。'
        this.hcSearchError.hc_name01 = '入力してください。'
        this.hcSearchError.hc_name02 = '入力してください。'
        this.hcSearchError.hc_phone = '入力してください。'
        this.hcSearchError.hc_mobilephone = '入力してください。'
      }
      let reg_number = new RegExp(/^\d+$/);
      if(this.hcSearchData.hc_no && (this.hcSearchData.hc_no.length > 10 || !reg_number.test(this.hcSearchData.hc_no))){
        this.hcSearchError.hc_no = '10数字まで入力してください。'
      }

      if((this.hcSearchData.hc_name01 || this.hcSearchData.hc_name02 || this.hcSearchData.hc_phone || this.hcSearchData.hc_mobilephone) 
        && Object.values(this.hcSearchData).filter(item => item).length < 2
        && !this.hcSearchError.hc_no
      ){
        if(!this.hcSearchData.hc_name01){
          this.hcSearchError.hc_name01 = '入力してください。'
        }
        if(!this.hcSearchData.hc_name02){
          this.hcSearchError.hc_name02 = '入力してください。'
        }
        if(!this.hcSearchData.hc_phone){
          this.hcSearchError.hc_phone = '入力してください。'
        }
        if(!this.hcSearchData.hc_mobilephone){
          this.hcSearchError.hc_mobilephone = '入力してください。'
        }
      }

      let reg_kana = new RegExp(/^[ァ-ンヴー]*$/);
      if(this.hcSearchData.hc_name01 && !reg_kana.test(this.hcSearchData.hc_name01)){
        this.hcSearchError.hc_name01 = '全角カタカナで入力してください。'
      }
      if(this.hcSearchData.hc_name02 && !reg_kana.test(this.hcSearchData.hc_name02)){
        this.hcSearchError.hc_name02 = '全角カタカナで入力してください。'
      }
      if(this.hcSearchData.hhc_phone && (this.hcSearchData.hc_phone.length > 4 || isNaN(this.hcSearchData.hc_phone))){
        this.hcSearchError.hc_phone = '下4桁の数字で入力してください。'
      }
      if(this.hcSearchData.hc_mobilephone && (this.hcSearchData.hc_mobilephone.length > 4 || isNaN(this.hcSearchData.hc_mobilephone))){
        this.hcSearchError.hc_mobilephone = '下4桁の数字で入力してください。'
      }

      return Object.keys(this.hcSearchError).length > 0 ? true : false
    },
    doClearSeachHc: function(){
      Object.keys(this.hcSearchData).forEach(key => {
        this.hcSearchData[key] = ''
      })
    },
    doSeachHc: async function(){
      this.loaddingDataHcSearch = true

      //check error input
      if(!this.checkErrors()){
        //get HcSeach result form API
        await this.getHcSeachFromApi().then(response => {
          if(response){
            if(response.status_code == 0){
              this.arrHcResult = response.kaiinInfos
            } else{
              this.arrHcResult = []
            }
            this.loaddingDataHcSearch = false
          }
        })
      } else{
        this.arrHcResult = []
        this.loaddingDataHcSearch = false
      }
    },
    getHcSeachFromApi: async function(){
        let ret = null
        await this.axios.request({
          url: this.main_path + 'myshop/gethcsearch/',
          method: 'post',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: {
            searchparam: this.hcSearchData
          }
        })
        .then(response => {
          ret = response.data.data
        })
        .catch(error => {
          this.loaddingDataHcSearch = false
          console.log(error)
        })
        this.searchFinish = true
        return ret
    },
    HcConfirm: async function(HC){
      this.loaddingDataHcSearch = true
      await this.setHcInfo(HC).then(response => {
        if(response){
          this.loaddingDataHcSearch = false
          alert('HC番号を設定しました。')
          $('.header__customer').html(response.hc_html.content);
          this.$store.dispatch('handleChangeCustomerId', response.id)
          this.closeModal()
        }
      })
    },
    setHcInfo: async function(HC){
      let ret = null
      let HCPostData = {
        'kaiinNo': HC.kaiinNo,
        'nameKj1': HC.nameKj1,
        'nameKj2': HC.nameKj2,
        'nameKn1': HC.nameKn1,
        'nameKn2': HC.nameKn2,
        'tel3': HC.tel3,
        'keiTelNo3': HC.keiTelNo3,
        'emailAddr': HC.emailAddr,
        'birthDate': HC.birthDate
      }
        await this.axios.request({
          url: this.main_path + 'myshop/sethcinfo/',
          method: 'post',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          data: {
            hcData: HCPostData
          }
        })
        .then(response => {
          ret = response.data.data
        })
        .catch(error => {
          this.loaddingDataHcSearch = false
          console.log(error)
        })
        return ret
    },
    clickCallback: function (pageNum) {
       this.currentPage = Number(pageNum);
    }
  },
  props: [],
  computed: {
    ...mapGetters([
      'main_path',
    ]),
    getHcItems: function() {
       let current = this.currentPage * this.perPage;
       let start = current - this.perPage;
       return this.arrHcResult.slice(start, current);
    },
    getPageCount: function() {
      return Math.ceil(this.arrHcResult.length / this.perPage);
    }
  },
  watch: {
  }
};
</script>
