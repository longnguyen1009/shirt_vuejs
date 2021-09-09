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
    option_img_path: "/html/upload/save_image/",

    styleSelected: 0,
    modelSelected: 0,
    itemSelected: [],

    optionMode: 2,

    designActive: {}, //{combine_id, design_id, item_id}
    kijiActive: null,

    styleData: {},
    modelData: {},

    optionSelectedData:[], // list of {design_id, parent_id, option_id, cate_id, img}
    optionDetailActive: null,

    //raw html for option change img temp
    optionTemp: ''
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
    modelSelected: state => state.modelSelected,
    itemSelected: state => state.itemSelected,

    optionMode: state => state.optionMode,
    designActive: state => state.designActive,
    kijiActive: state => state.kijiActive,

    //save data from api
    styleData: state => state.styleData,
    modelData: state => state.modelData,

    optionSelectedData: state => state.optionSelectedData,
    optionDetailActive: state => state.optionDetailActive,

    optionTemp: state => state.optionTemp
  },
  mutations: {
    changeStep(state, newStep){
      state.step = newStep
    },
    changeStyleModelItem(state, style_model_item_data){
      state.styleSelected = style_model_item_data.style,
      state.modelSelected = style_model_item_data.model,
      state.itemSelected = style_model_item_data.item
    },
    changeDesign(state, designId){
      state.designActive = designId
    },
    changeKiji(state, kiji){
      state.kijiActive = kiji
    },
    changeStyleData(state, styleData){
      state.styleData = styleData
    },
    changeModelData(state, modelData){
      state.modelData = modelData
    },
    changeOptionData(state, optionData){
      const existOptionIndex = state.optionSelectedData.findIndex(
        (item) => (
          item.combine_id == optionData.combine_id && item.item_id == optionData.item_id && item.design_id == optionData.design_id && item.parent_id == optionData.parent_id
        ))
      if(existOptionIndex !== -1){
        state.optionSelectedData[existOptionIndex] = optionData
      } else{
        state.optionSelectedData.push(optionData)
      }
      //Clone the array to trigger a UI update.
      state.optionSelectedData = [...state.optionSelectedData]
    },
    changeOptionDetail(state, optionDetailId){
      state.optionDetailActive = optionDetailId
    },
    changeOptionTemp(state, optionTemp){
      state.optionTemp = optionTemp
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
    },
    handleChangeStyleData(context, styleData){
      context.commit('changeStyleData', styleData)
    },
    handleChangeModelData(context, modelData){
      context.commit('changeModelData', modelData)
    },
    handleChangeOption(context, optionData){
      context.commit('changeOptionData', optionData)
    },
    handleChangeOptionDetailActive(context, optionDetailId){
      context.commit('changeOptionDetail', optionDetailId)
    },
    handleChangeOptionTemp(context, optionTemp){
      context.commit('changeOptionTemp', optionTemp)
    }
  }
})
