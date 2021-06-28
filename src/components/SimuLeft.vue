<template>
  <div class="container">
    <div class="row">
      <div class="mt-5">
        <!-- <h2>SimuLeft</h2> -->
        <ul class="fabric_list col border border-3 border-info py-3">
          <li
            v-for="item in fabric_list"
            :key="item.product_id"
            class="fabric_item"
            @click="changeFabric(item.product_id)"
            v-bind:id="'product_' + item.product_id"
            :class="[fabric_id == item.product_id ? 'active' : '']"
          >
            <p class="kiji_img" style="display: none;">{{ item.kiji_image }}</p>
            <figure>
              <div class="prodcut__list__iconset">
                <span class="product__list__icon icon_mizuiro">W</span>
              </div>
              <img
                :src="server_img_path + 'product/' + item.main_image"
                class="lazyitemlister"
              />
            </figure>
            <p class="product__list__info_opener">INFO</p>
            <div class="product__list__data">
              <p class="product__list__data__maker">{{ item.product_code }}</p>
              <p class="product__list__data__name">{{ item.name }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimuLeft",
  data() {
    return {
      api_path: "http://localhost:8081/vue_src/src/services/",
      img_path: "",
    };
  },
  props: ["server_img_path", "step", "fabric_id", "fabric_list"],
  methods: {
    changeFabric(id) {
      this.$emit("changeFabric", id);
    },
  },
  mounted() {},
};
</script>
