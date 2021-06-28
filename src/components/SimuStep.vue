<template>
  <div class="container mb-4">
    <div class="row">
      <div class="col-12 mrgnbtm">
        <div class="row">
          <b-button-group class="col-12">
            <b-button
              variant="outline-dark"
              class="stepBtn col-md-3 border"
              v-for="stepItem in steps"
              :key="stepItem.id"
              v-bind:class="[step == stepItem.id ? 'active' : '']"
            >
              {{ stepItem.name }}</b-button
            >
          </b-button-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateUser",
  data() {
    return {
      steps: [
        {
          id: 1,
          stepdisp: 1,
          name: "STEP 01: FABRIC",
          user: "all",
          katagaminaihito: "false",
        },
        {
          id: 2,
          stepdisp: 2,
          name: "STEP 2: COURSE",
          user: "all",
          katagaminaihito: "false",
        },
        {
          id: 3,
          stepdisp: 3,
          name: "STEP 3: DESIGN",
          user: "shop",
          katagaminaihito: "true",
        },
        {
          id: 4,
          name: "STEP 4: OPTION",
          user: "shop",
          katagaminaihito: "false",
        },
      ],
    };
  },
  methods: {
    changestep(id) {
      this.$emit("changeStep", id);
    },
  },
  props: ["step"],
};
</script>
