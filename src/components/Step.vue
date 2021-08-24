<template>
  <div class="container-step">
    <b-button-group class="simu-stepgroup">
      <div
        variant="outline-dark"
        class="stepBtn col-md-3"
        v-for="stepItem in steps"
        :key="stepItem.id"
        v-bind:class="[step == stepItem.id ? 'active' : '']"
      >
      {{ stepItem.name }}</div>
    </b-button-group>
  </div>
</template>

<script>
export default {
  name: "Step",
  data() {
    return {
      steps: [
        {
          id: 1,
          stepdisp: 1,
          name: "スタイル選択", 
          user: "all",
          katagaminaihito: "false",
        },
        {
          id: 2,
          stepdisp: 2,
          name: "オーダーシミュレーション",
          user: "all",
          katagaminaihito: "false",
        },
        {
          id: 3,
          stepdisp: 3,
          name: "オーダー内容確認",
          user: "shop",
          katagaminaihito: "true",
        },
        {
          id: 4,
          name: "オーダー完了",
          user: "shop",
          katagaminaihito: "false",
        },
      ],
    };
  },
  methods: {
    // changestep(id) {
    //   this.$emit("changeStep", id);
    // },
  },
  props: ["step"],
};
</script>
