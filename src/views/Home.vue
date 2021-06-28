<template>
  <div class="simupage_container">
    <!-- <Header /> -->
    <div class="container">
      <div class="row">
        <div class="col-md-6 mt-4">
          <SimuRight
            :server_img_path="server_img_path"
            :gender="gender"
            :obj_bg_path="obj_bg_path"
            :viewMode="viewMode"
            :partNo="partNo"
            :partNo_zentai="partNo_zentai"
          />
        </div>
        <div class="col-md-6 mt-4">
          <SimuDesign
            :viewMode="viewMode"
            :server_img_path="server_img_path"
            :c3CategoryList="c3CategoryList"
            :c3CategoryId="c3CategoryId"
            :orderId="order_id"
            :gender="gender"
            :fabric_list="fabric_list"
            :fabric_id="fabric_id"
            @changeCategory="changeCategory($event)"
            @view-mode="changeViewMode($event)"
            @changeFabric="changeFabric($event)"
            @showFabricDetail="showFabricDetail($event)"
            @changeStepNow="changeStepNow($event)"
            @submitFabric="submitFabric($event)"
          />
        </div>
      </div>
      <SimuModal
        :modal_data="modal_data"
        :fabricDetail="fabricDetail"
        :server_img_path="server_img_path"
        @submitFabric="submitFabric($event)"
      />
    </div>
    <div class="row simu_price">
      <div class="container py-2">
        <p class="simu_price_txt">
          商品価格：{{ product_price }}円 + カスタマイズ価格：4,500円
          お支払い価格：{{ product_price + 4500 }}円　　納期: 12/30
        </p>
      </div>
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import SimuStep from "../components/SimuStep.vue";
import SimuLeft from "../components/SimuLeft.vue";
import SimuGender from "../components/SimuGender.vue";
import SimuRight from "../components/SimuRight.vue";
import SimuNav from "../components/SimuNav.vue";
import SimuCourse from "../components/SimuCourse.vue";
import SimuDesign from "../components/SimuDesign.vue";
import SimuModal from "../components/SimuModal.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    SimuStep,
    SimuLeft,
    SimuGender,
    SimuRight,
    SimuNav,
    SimuCourse,
    SimuDesign,
    SimuModal,
  },
  data() {
    return {
      order_id: "",
      server_img_path: "/src/assets/images/", //image folder path
      obj_bg_path: "/src/assets/images/simulator/default/default_tex.jpg", //svg backgroud url

      //category
      c3CategoryId: "",
      c3CategoryList: {
        1: { id: 1, name: "ジャケット", partId: "" },
        2: { id: 2, name: "パンツ", partId: "" },
      },

      gender: "men", //current gender
      fabric_id: 0, //fabric selected ID
      fabricDetail: "",

      //init: fabric list (from api)
      fabric_list: [
        {
          product_id: "2545",
          name: "TECH PLUS WOOL",
          main_image: "02211545_603201742c64d.jpg",
          kiji_image: "02211545_60320184bd821.jpg",
          product_code: "138103A",
        },
        {
          product_id: "2546",
          name: "WOOL&POLYESTER SUCKER",
          main_image: "02211546_603201bb64bfe.jpg",
          kiji_image: "02281611_603b423febc78.jpg",
          product_code: "138111A",
        },
        {
          product_id: "2547",
          name: "WOOL&POLYESTER SUCKER",
          main_image: "02211547_603201fbb47dd.jpg",
          kiji_image: "02211547_603202079af2f.jpg",
          product_code: "138129A",
        },
        {
          product_id: "2548",
          name: "WOOL&POLYESTER SUCKER",
          main_image: "02211548_6032022b819e7.jpg",
          kiji_image: "02211548_60320237ef743.jpg",
          product_code: "138137A",
        },
        {
          product_id: "2549",
          name:
            "COOLMAX \u3057\u308f\u8efd\u6e1b\u30b9\u30e9\u30c3\u30af\u30b9\u30d7\u30ea\u30fc\u30c4\u4fdd\u6301",
          main_image: "02281612_603b4274a67c5.jpg",
          kiji_image: "02281612_603b42674fb90.jpg",
          product_code: "138145A",
        },
        {
          product_id: "2550",
          name:
            "COOLMAX \u3057\u308f\u8efd\u6e1b\u30b9\u30e9\u30c3\u30af\u30b9\u30d7\u30ea\u30fc\u30c4\u4fdd\u6301",
          main_image: "02281613_603b42ae4ddc6.jpg",
          kiji_image: "02281613_603b42a276df7.jpg",
          product_code: "138153A",
        },
        {
          product_id: "2551",
          name:
            "COOLMAX \u3057\u308f\u8efd\u6e1b\u30b9\u30e9\u30c3\u30af\u30b9\u30d7\u30ea\u30fc\u30c4\u4fdd\u6301",
          main_image: "02281614_603b42e5b75a2.jpg",
          kiji_image: "02281614_603b42d79374e.jpg",
          product_code: "138161A",
        },
        {
          product_id: "2552",
          name:
            "COOLMAX \u3057\u308f\u8efd\u6e1b\u30b9\u30e9\u30c3\u30af\u30b9\u30d7\u30ea\u30fc\u30c4\u4fdd\u6301",
          main_image: "02281615_603b432061c05.jpg",
          kiji_image: "02281615_603b431209b0e.jpg",
          product_code: "138179A",
        },
        {
          product_id: "2553",
          name: "Platinum Rich SUPER140s",
          main_image: "02211548_603202567e893.jpg",
          kiji_image: "02211549_6032026662ea7.jpg",
          product_code: "138187A",
        },
        {
          product_id: "2554",
          name: "Platinum Rich SUPER140s",
          main_image: "02211549_6032028d68d76.jpg",
          kiji_image: "02211549_603202824b2f4.jpg",
          product_code: "138195A",
        },
        {
          product_id: "2555",
          name: "Platinum Rich SUPER140s",
          main_image: "02211550_603202ad33cce.jpg",
          kiji_image: "02211550_603202ba2afa0.jpg",
          product_code: "138218A",
        },
        {
          product_id: "2556",
          name: "Platinum Rich SUPER140s",
          main_image: "02211551_603202da73f53.jpg",
          kiji_image: "02281616_603b434542a99.jpg",
          product_code: "138226A",
        },
      ],
      // STEP 3
      partNo: "", //part selected in step 3
      partNo_zentai: "", //part_zentai selected in step 3
      viewMode: "all", //viewmode in step 3: no_zentai or zentai

      modal_data: { show: false, data: "" },
      product_price: 39000,
      // api url
      api_path: "http://localhost:8081/vue_src/src/services/",
      //svg list in image folder
      svgList: {
        "2": "10",
        "3": "13",
        "4": "17",
        "5": "18",
        "6": "19",
        "7": "2",
        "8": "20",
        "9": "21",
        "10": "21_all",
        "11": "21_skirt",
        "12": "22",
        "13": "23",
        "14": "24",
        "15": "25",
        "16": "26",
        "17": "27",
        "18": "28",
        "19": "29",
        "20": "2B3piece",
        "21": "3",
        "22": "30",
        "23": "3_all",
        "24": "3b3piece",
        "25": "4",
        "26": "41",
        "27": "41_all",
        "28": "42",
        "29": "42_all",
        "30": "43",
        "31": "44",
        "32": "44_all",
        "33": "45",
        "34": "45_all",
        "35": "46",
        "36": "47",
        "37": "48",
        "38": "49",
        "39": "4_all",
        "40": "4_all_backup",
        "41": "5",
        "42": "5_all",
        "43": "5_skirt",
        "44": "6",
        "45": "6_all",
        "46": "7",
        "47": "7_all",
        "48": "7_skirt",
        "49": "8",
        "50": "9",
        "51": "ladies1bpeak",
        "52": "ladies1bpeak_pants_suit",
        "53": "ladies1bpeak_up",
        "54": "ladies2bpeak",
        "55": "ladies2bpeak_pants_suit",
        "56": "ladies2bpeak_up",
        "57": "pantsnotuck",
        "58": "regular2bpeak",
        "59": "regular2bpeak_up",
        "60": "relaxing2bnotch",
        "61": "relaxing2bnotchup",
        "62": "relaxing2bpeak-svg",
        "63": "relaxing2bpeakup",
        "64": "relaxing3b",
        "65": "relaxing3b_up",
        "66": "relaxing4b_up",
        "67": "relaxing_dan",
        "68": "relaxing_dan_up",
        "69": "relaxingdouble",
        "70": "relaxingdouble6b",
        "71": "relaxingdouble6b_up",
        "72": "slim2bnotch",
        "73": "slim2bnotchup",
        "74": "slim2bpeakup",
        "75": "slim_danup",
        "76": "slimnotchdan_all",
        "77": "slimpeak",
        "78": "vest-5b-2-svg",
        "79": "vest4b",
        "80": "vest4b_renoma",
        "81": "vest6b",
        "82": "vest6b_collar",
      },
      stepNowHome: 1,
    };
  },
  methods: {
      
    //change fabic in step 1
    changeFabric(fabric_id) {
      var items = this.fabric_list;
      var kiji_img = Object.keys(items)
        .map((key) => items[key]) // turn an array of keys into array of items.
        .filter((item) => item.product_id === fabric_id)[0].kiji_image;
      var obj_bg_path = this.server_img_path + "product/" + kiji_img;
      this.obj_bg_path = obj_bg_path;
    },
    submitFabric(fabric_id) {
      this.fabric_id = fabric_id;
    },
    showFabricDetail(fabric_id) {
      var items = this.fabric_list;
      this.fabricDetail = Object.keys(items)
        .map((key) => items[key])
        .filter((item) => item.product_id === fabric_id)[0];
    },
    //change gender
    changeGender(gender) {
      this.gender = gender;
      this.obj_bg_path = "";
      this.fabric_id = 0;
      (this.partNo = ""), (this.partNo_zentai = ""), (this.viewMode = "");
    },

    //change viewmode in step 3
    changeViewMode(viewmode) {
      this.viewMode = viewmode;
    },

    changeStepNow(step) {
      this.stepNowHome = step;
      if (this.fabric_id) {
        this.changeFabric(this.fabric_id);
      } else {
        //reset default fabric
        this.obj_bg_path =
          "/src/assets/images/simulator/default/default_tex.jpg";
      }
    },
    changeCategory(cateId) {
      this.c3CategoryId = cateId;
      this.partNo = this.c3CategoryList[cateId]["partId"];
      this.viewMode = "";
    },
  },
  watch: {
    order_id: function() {
      if (this.order_id) {
        this.partNo_zentai = "6_all";
        this.c3CategoryList[1].partId = 6;
        this.c3CategoryList[2].partId = 46;
      } else {
        this.partNo_zentai = "41_all";
        this.c3CategoryList[1].partId = 41;
        this.c3CategoryList[2].partId = 10;
      }
    },
  },
  mounted() {
    this.order_id = this.$route.query.id;
  },
  computed: {},
};
</script>
