
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
    //round(12345.6789, 2) = 12345.68
    //round(12345.6789, 1) = 12345.7
    round(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }
  },
  computed: {
    ...mapGetters([
      'kiji_img_path'
    ])
  }
}