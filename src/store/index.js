import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    step: 1,
    simu_img_path: "/html/upload/simu_model/",
    style_img_path: "/html/upload/save_image/",
    model_img_path: "/html/upload/save_image/",
    kiji_img_path: "/html/upload/save_image/",
    option_img_path: "/html/upload/simu_model/options/",

    styleSelected: 0,
    modeSelected: 0,
    itemSelected: [],

    optionMode: 2,

    designActive: 0,
    kijiActive: null

  },
  getters: {
    //step
    step: state => state.step,

    //image path
    simu_img_path: state => state.simu_img_path,
    style_img_path: state => state.style_img_path,
    model_img_path: state => state.model_img_path,
    kiji_img_path: state => state.kiji_img_path,
    option_img_path: state => state.option_img_path,

    //
    styleSelected: state => state.styleSelected,
    modeSelected: state => state.modeSelected,
    itemSelected: state => state.itemSelected,

    optionMode: state => state.optionMode,
    designActive: state => state.designActive,
    kijiActive: state => state.kijiActive

  },
  mutations: {
    changeStep(state, newStep){
      state.step = newStep
    },
    changeStyleModelItem(state, style_model_item_data){
      state.styleSelected = style_model_item_data.style,
      state.modeSelected = style_model_item_data.model,
      state.itemSelected = style_model_item_data.item
    },
    changeDesign(state, designId){
      state.designActive = designId
    },
    changeKiji(state, kiji){
      state.kijiActive = kiji
    }
  },
  actions: {
    handleChangeStep(context, newStep){
      context.commit('changeStep', newStep)
    },
    handleChangeItem(context, style_model_item_data){
      context.commit('changeStyleModelItem', style_model_item_data)
    },
    handleChangeDesign(context, designId){
      context.commit('changeDesign', designId)
    },
    handleChangeKiji(context, kiji){
      context.commit('changeKiji', kiji)
    }

  }
})
