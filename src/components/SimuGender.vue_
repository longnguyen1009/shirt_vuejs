<template>
  <div class="selector__gender_selector">
    <div class="d-flex flex-row justify-content-between">
      <b-button
        class="p-2"
        variant="outline-dark"
        @click="changeGender('men')"
        v-bind:class="[gender == 'men' ? 'active' : '']"
        >MEN's</b-button
      >
      <b-button
        class="p-2"
        variant="outline-dark"
        @click="changeGender('women')"
        v-bind:class="[gender == 'women' ? 'active' : '']"
        >LADIES'</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "SimuGender",
  data() {
    return {};
  },
  props: ["gender"],
  methods: {
    changeGender(gender) {
      if (this.gender != gender) {
        $(".loadding_bl").addClass("on");
        this.$emit("changeGender", gender);
      }
    },
  },
  mounted() {},
};
</script>
