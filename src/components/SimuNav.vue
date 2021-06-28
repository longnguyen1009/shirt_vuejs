<template>
  <div class="simulator__controller mt-5">
    <div class="d-flex flex-row justify-content-center">
      <b-button
        class="p-2 col-4 mx-2"
        variant="outline-dark"
        @click="doPrevStep"
        >BACK</b-button
      >
      <b-button
        class="p-2 col-4 mx-2"
        variant="outline-dark"
        @click="doNextStep"
        >NEXT</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "SimuNav",
  data() {
    return {};
  },
  props: ["current_step", "arrStyleSelectedSend"],
  methods: {
    doPrevStep() {
      if (this.current_step > 1) {
        this.$parent.step = this.current_step - 1;
      } else {
        return false;
      }
    },
    doNextStep() {
      switch (this.current_step) {
        case 1:
          if (this.$parent.fabric_id == "" || this.$parent.fabric_id == 0) {
            alert("FABRICを選択してください。");
            return false;
          } else {
            this.$parent.step = this.current_step + 1;
          }
          break;
        case 2:
          if (this.$parent.selected_part == "") {
            alert("COURSEを選択してください。");
            return false;
          } else {
            this.$parent.step = this.current_step + 1;
          }
          break;
        case 3:
          if (
            this.arrStyleSelectedSend.length <
            $(".selector_design_part li").length
          ) {
            alert("選択されていない項目があります。ご確認ください。");
            return false;
          } else {
            this.$parent.step = this.current_step + 1;
          }
          break;
        default:
          this.$parent.step = this.current_step + 1;
          break;
      }
    },
  },
  mounted() {},
};
</script>
