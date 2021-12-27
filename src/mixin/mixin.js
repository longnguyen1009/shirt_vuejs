
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    //3500 -> 3,500
    moneyTypeShow01(number){
      return new Intl.NumberFormat().format(number ? number : 0)
    },
    //￥123,457
    moneyTypeShow02(number, taxType = null){
      let ret = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number ? number : 0)
      if(taxType == 'tax'){
        ret += '（税込）'
      } else if(taxType == 'notax'){
        ret += '（税抜）'
      }
      return ret
    },
    imgError: function(e){
      e.target.src = this.kiji_img_path + 'no-image.jpg'
    },
    imgErrorBlank: function(e){
      e.target.src = this.kiji_img_path + 'notfounder.png'
    },
    touchStart: function(e){
      $(e.target).addClass('touch')
    },
    touchMove: function(e){
      $(e.target).removeClass('touch')
    },
    touchEnd: function(e){
      $(e.target).removeClass('touch')
    },
  },
  computed: {
    ...mapGetters([
      'kiji_img_path'
    ])
  }
}