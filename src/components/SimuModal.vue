<template>
  <div class="simu-modal">
    <div>
      <b-modal id="modal-1" title="スタイル画像" class="modal_content">
        <img :src="server_img_path + 'product/' + show_modal_data" alt="" />
      </b-modal>
      <b-modal id="modal-3" title="生地詳細" centered size="lg">
        <div class="row d-flex justify-content-between">
          <div class="col-6">
            <img
              :src="server_img_path + 'product/' + fabricDetail.main_image"
            />
          </div>
          <div class="col-6">
            <p class="mb-1">STANDARD (ALL SEASON)</p>
            <p class="font-weight-bold mb-1">
              {{ fabricDetail.product_id }} / {{ fabricDetail.product_code }} /
              {{ fabricDetail.name }}
            </p>
            <p class="mb-4">標準 \ 49500(税込)</p>
            <p>
              クロ/ムジ ウール55%ポリエステル45%
              年間定番生地。冠婚葬祭にお使いいただける生地です。就活やリクルートにもおすすめです。オールシーズン生地
            </p>
            <button
              type="button"
              class="btn btn-dark mt-4"
              @click="submitFabric(fabricDetail.product_id)"
            >
              この生地で決定する
            </button>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimuModal",
  props: ["modal_data", "server_img_path", "fabricDetail"],
  methods: {
    submitFabric(id) {
      this.$emit("submitFabric", id);
      this.$bvModal.hide("modal-3");
      this.$emit("changeStepNow", 1);
    },
  },
  mounted() {},
  computed: {
    show_modal_data: function() {
      return this.modal_data.data;
    },
  },
};
</script>

<style></style>
