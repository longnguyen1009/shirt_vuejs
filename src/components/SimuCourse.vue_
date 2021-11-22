<template>
  <ul class="course_list col border border-3 border-info p-3">
    <!-- <h1>SimuCourse</h1> -->
    <li
      class="course_item d-flex mb-2 align-items-center justify-content-between"
      v-for="(item, key) in selectparts_list"
      :key="item.styleNo"
      v-bind:class="[courseIndex === key ? 'active' : '']"
      @click="changeSource(key)"
    >
      <div class="source_img"><img :src="server_img_path + item.img" /></div>
      <div class="source_txt">
        <span>{{ item.en }}</span
        ><br /><span>{{ item.ja }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SimuCourse",
  data() {
    return {
      api_path: "http://localhost:8081/vue_src/src/services/",
      img_path: "",
      selectparts_list: "",
    };
  },
  props: ["server_img_path", "gender", "courseIndex"],
  methods: {
    changeSourseGender() {
      if (this.gender == "men") {
        this.selectparts_list = this.$parent.selectparts.men;
      } else {
        this.selectparts_list = this.$parent.selectparts.women;
      }
    },
    changeSource(styleNo) {
      if (styleNo != this.courseIndex) {
        this.$emit("part-selected", styleNo);
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.changeSourseGender();
  },
  watch: {},
};
</script>

<style></style>
