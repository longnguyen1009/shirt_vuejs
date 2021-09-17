import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    step: 1,
    page: 1, //page 2 is model page

    simu_img_path: "/html/upload/simu_model/",
    style_img_path: "/html/upload/save_image/",
    model_img_path: "/html/upload/save_image/",
    kiji_img_path: "/html/upload/save_image/",
    option_img_path: "/html/upload/save_image/",

    // styleData load from server
    styleData: null,

    //modelData load from server
    modelData: [], //{modelId, data}

    //back to model page
    modelTemp: null, //{styleId, modelId}

    //data selected at model page
    styleSelected: 0,
    modelSelected: 0,
    itemSelected: [],

    //option select mode
    optionMode: 2,

    //being selected design
    designActive: {}, //{combine_id, design_id, item_id}

    kijiActive: null, //kijiId 

    // kijiData load from server
    kijiData: [],

    // option parent Data by design
    optionParentData: [], //{design_id, data}

    //id of selecting option_parent 
    optionDetailActive: null,

    // optionDetailList Data load from server
    // catelist: [{cate_id, cate_name}]
    // optionLists [{cate_id: [{id, name, img, simu_img, ....}]
    optionDataLoaded: [], //{model_id, design_id, parent_id, cateLists, optionLists }
    
    //list of option item selcted 
    optionSelectedData:[], // list of {combine_id, item_id, design_id, parent_id, option_id, cate_id, option_img, simu_img, name}

    //raw html for option change img temp when change option
    optionTemp: null, // {option_id, option_img, type: type}

    //optionDetailData List
    optionDetailData:[],

    //itemData load form server
    itemData: null,
  },
  getters: {
    //step
    step: state => state.step,
    page: state => state.page,

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
    modelTemp: state => state.modelTemp,

    optionMode: state => state.optionMode,
    designActive: state => state.designActive,
    kijiActive: state => state.kijiActive,

    //save data from api
    styleData: state => state.styleData,
    modelData: state => state.modelData,

    optionSelectedData: state => state.optionSelectedData,
    optionDetailActive: state => state.optionDetailActive,

    optionTemp: state => state.optionTemp,
    optionDataLoaded: state => state.optionDataLoaded,
    kijiData: state => state.kijiData,
    optionParentData: state => state.optionParentData,
    optionDetailData: state => state.optionDetailData,
    itemData: state => state.itemData
  },
  mutations: {
    changeStep(state, newStep){
      state.step = newStep
    },
    changePage(state, page){
      state.page = page
    },
    changeStyleModelItem(state, style_model_item_data){
      state.styleSelected = style_model_item_data.style,
      state.modelSelected = style_model_item_data.model,
      state.itemSelected = style_model_item_data.item
    },
    changeModelTemp(state, modelTemp){
      state.modelTemp = modelTemp
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
      const existModelIndex = state.modelData.findIndex(
        (item) => (
          item.modeId == modelData.modelId
        ))
      if(existModelIndex !== -1){
        state.modelData[existModelIndex] = modelData
      } else{
        state.modelData.push(modelData)
      }
      //Clone the array to trigger a UI update.
      state.modelData = [...state.modelData]
    },
    changeOptionData(state, optionData){
      const existOptionIndex = state.optionSelectedData.findIndex(
        (item) => (
          item.combine_id == optionData.combine_id
          && item.item_id == optionData.item_id
          && item.design_id == optionData.design_id
          && item.parent_id == optionData.parent_id
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
    },
    changeOptionDataLoaded(state, loadedData){
      const existLoadedIndex = state.optionDataLoaded.findIndex(
        (item) => (
          item.model_id == loadedData.model_id
          && item.design_id == loadedData.design_id
          && item.parent_id == loadedData.parent_id
        ))
      if(existLoadedIndex !== -1){
        state.optionDataLoaded[existLoadedIndex] = loadedData
      } else{
        state.optionDataLoaded.push(loadedData)
      }
      //Clone the array to trigger a UI update.
      state.optionDataLoaded = [...state.optionDataLoaded]
    },
    changeKijiData(state, kijiData){
      state.kijiData = kijiData
    },
    changeOptionParentData(state, parentData){
      state.optionParentData.push(parentData)
    },
    refreshApp(state){
      state.styleSelected = 0,
      state.modelSelected = 0,
      state.itemSelected = [],
      state.optionMode = 2,
      state.designActive = {}, //{combine_id, design_id, item_id}
      state.kijiActive = null,
      state.kijiData = [],
      state.itemData = null,

      state.optionSelectedData = [], // list of {combine_id, item_id, design_id, parent_id, option_id, cate_id, option_img: simu_img, name}
      state.optionDetailActive = null,

      //raw html for option change img temp
      state.optionTemp = null,
      state.optionDataLoaded = [], //{model_id, design_id, parent_id, cateLists, optionLists }
      state.optionParentData = [] //{design_id, data}
    },
    async updateOptionDetailData(state, detailData){
      await Object.values(detailData).forEach(element => {
        element.forEach(detail => {
          const existDetailIndex = state.optionDetailData.findIndex(
            (item) => (
              item.id == detail.id
            ))
          if(existDetailIndex !== -1){
            state.optionDetailData[existDetailIndex] = detail
          } else{
            state.optionDetailData.push(detail)
          }
        })
      })
      state.optionDetailData = [...state.optionDetailData] 
    },
    changeItemData(state, data){
      state.itemData = data
    }
  },
  actions: {
    handleChangeStep(context, newStep){
      context.commit('changeStep', newStep)
    },
    handleChangePage(context, page){
      context.commit('changePage', page)
    },
    handleChangeItem(context, style_model_item_data){
      context.commit('changeStyleModelItem', style_model_item_data)
    },
    //do Back from step 3
    handleChangeModelTemp(context, modelTemp){
      context.commit('changeModelTemp', modelTemp)
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
    },
    handleSaveOptionDataLoaded(context, loadedData){
      context.commit('changeOptionDataLoaded', loadedData)
    },
    handleChangeKijiData(context, kijiData){
      context.commit('changeKijiData', kijiData)
    },
    handleChangeOptionParentData(context, parentData){
      context.commit('changeOptionParentData', parentData)
    },
    handleRefreshApp(context, data){
      context.commit('refreshApp')
    },
    handleUpdateOptionDetailData(context, detailData){
      context.commit('updateOptionDetailData', detailData)
    },
    handleChangeItemData(context, data){
      context.commit('changeItemData', data)
    }
  }
})
