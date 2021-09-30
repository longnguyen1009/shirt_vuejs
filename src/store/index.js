import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    //initial info
    initialData: {}, // {shop_id, shop_kind, customer_id, staff_id, cartItemId, orderItemId}

    category_select: null,

    orderNowId: 0,
    //存在ORDER
    orderTempItem: [], //[{id, style, model, item, option_selected, price, quality, combineId}]

    step: 1,
    page: 1, //page 2 is model page

    simu_img_path: "/html/upload/simu_model/",
    style_img_path: "/html/upload/save_image/",
    model_img_path: "/html/upload/save_image/",
    kiji_img_path: "/html/upload/save_image/",
    option_img_path: "/html/upload/save_image/",

    // styleData load from server
    styleData: [], //[{id, name, brand, detail, img, model[], product_price}]

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
    optionParentData: [], //{design_id, genreData, parentData}

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
    itemData: [], //{orderId, items[], design[] in step 2}

    //受け取り方法
    delivery_method: 1,

    errorCode: 0,
    errorData: [
      {errorCode: 1, text: '認証が失敗しました。'},
      {errorCode: 2, text: 'データリクエストにエラーが発生しました。もう一度お試しください。'},
      {errorCode: 3, text: 'ユーザー情報の確認に失敗しました。もう一度ログインしてください。'},
      {errorCode: 4, text: '一時保存に入りました。'},
      {errorCode: 5, text: 'オーダー完了しました。'},
      {errorCode: 6, text: 'アイテム組み合わせが見つかりません。もう一度確認してください。'},
    ],
    loaddingData: false,
    combinePriceData: [], //{model, combineid, price}
    priceActive: 0,
    combineIdActive: 0,
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
    itemData: state => state.itemData,
    delivery_method: state => state.delivery_method,
    initialData: state => state.initialData,
    errorCode: state => state.errorCode,
    errorData: state => state.errorData,
    loaddingData:state => state.loaddingData,

    //step 3
    orderNowId: state => state.orderNowId,
    orderTempItem: state => state.orderTempItem,
    category_select: state => state.category_select,
    priceActive: state => state.priceActive,
    combinePriceData: state =>state.combinePriceData,
    combineIdActive: state => state.combineIdActive
  },
  mutations: {
    changeStep(state, newStep){
      state.step = newStep
    },
    changePage(state, page){
      state.page = page
    },
    changeModelSelected(state, model){
      state.modelSelected = model
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
    async changeStyleData(state, styleData){
      await Object.values(styleData).forEach(element => {
          const existStyleIndex = state.styleData.findIndex(
            (item) => (
              item.id == element.id
          ))
          if(existStyleIndex !== -1){
            state.styleData[existStyleIndex] = element
          } else{
            state.styleData.push(element)
          }
      })
      state.styleData = [...state.styleData]
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
          item.orderId == optionData.orderId
          && item.combine_id == optionData.combine_id
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
      let existParentDataIndex = state.optionParentData.findIndex(
        (item) => item.design_id == parentData.design_id
      )
      if(existParentDataIndex !== -1){
        state.optionParentData[existParentDataIndex] = parentData
      } else{
        state.optionParentData.push(parentData)
      }
      state.optionParentData = [...state.optionParentData]
    },
    refreshApp(state){
      // state.styleSelected = 0,
      state.modelSelected = 0,
      state.itemSelected = [],
      state.optionMode = 2,
      state.designActive = {}, //{combine_id, design_id, item_id}
      state.kijiActive = null,
      state.kijiData = [],
      state.itemData = [],

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
      let orderItemIndex = state.itemData.findIndex(item => (item.orderId == data.orderId))
      if(orderItemIndex !== -1){
        state.itemData[orderItemIndex] = data
      } else{
        state.itemData.push(data)
      }
      state.itemData = [...state.itemData]
    },
    changeDeliData(state, deli_id){
      state.delivery_method = deli_id
    },
    changeInitialData(state, iniData){
      state.initialData = iniData
    },
    restoreFromIniData(state, data){
      state.kijiActive = ((data.product_id !== undefined) && (data.product_id !== null)) ? data.product_id : null
      state.styleSelected = ((data.style !== undefined) && (data.style !== null)) ? Number(data.style) : null
      state.modelSelected = ((data.model !== undefined) && (data.model !== null)) ? Number(data.model) : null
      state.combineIdActive = ((data.combineId !== undefined) && (data.combineId !== null)) ? Number(data.combineId) : null
      state.itemSelected = ((data.item !== undefined) && (data.item !== null)) ? JSON.parse(data.item) : []
      state.optionSelectedData = ((data.option_selected !== undefined) && (data.option_selected !== null)) ? JSON.parse(data.option_selected) : []
      state.category_select = ((data.category_select !== undefined) && (data.category_select !== null)) ? Number(data.category_select) : null
    },
    changeErrorCode(state, code){
      state.errorCode = code
    },
    changeCartItemId(state, cartItemId){
      state.initialData.cartItemId = cartItemId
    },
    changeLoaddingData(state, data){
      state.loaddingData = data
    },
    changeOrderNowId(state, orderTempId){
      state.orderNowId = orderTempId
    },
    updateOrderTempItem(state, orderTempItem){
      let orderTempIndex = state.orderTempItem.findIndex(item => item.id == orderTempItem.id)
      if(orderTempIndex !== -1){
        state.orderTempItem[orderTempIndex] = orderTempItem
      } else{
        state.orderTempItem.push(orderTempItem)
      }

      state.orderTempItem = [...state.orderTempItem]
    },
    changeOrderTempItem(state, arrOrderTemp){
      arrOrderTemp.forEach(element => {
        const existOrderTemp = state.orderTempItem.findIndex(item => item.id == element.id)
        if(existOrderTemp == -1){
          element.category_select = Number(element.category_select)
          element.style = Number(element.style)
          element.model = Number(element.model)
          element.combineId = Number(element.combineId)
          element.quantity = Number(element.quantity)
          element.item = JSON.parse(element.item)
          element.option_selected = JSON.parse(element.option_selected)
          state.orderTempItem.push(element)
        }
      })
      state.orderTempItem = [...state.orderTempItem]
    },
    changeOrder(state, orderId){
      state.orderNowId = orderId
      let OrderNows = state.orderTempItem.filter(item => item.id == orderId)
      if(OrderNows.length){
        let OrderNow = OrderNows[0]
        state.kijiActive = OrderNow.product_id
        state.category_select = OrderNow.category_select
        state.styleSelected = OrderNow.style,
        state.modelSelected = OrderNow.model,
        state.itemSelected = OrderNow.item
      }
    },
    changeCategorySelect(state, category){
      state.category_select = category
    },
    updateOptionSelectedOrderTemp(state){
      state.orderTempItem.forEach((element, index) => {
        state.orderTempItem[index].option_selected = state.optionSelectedData.filter(item => item.orderId == element.id)
      })
      state.orderTempItem = [...state.orderTempItem]
    },
    changePriceActive(state, price){
      state.priceActive = price
    },
    updateCombinePrice(state, combinePrice){
      combinePrice.forEach(element => {
        const existPrice = state.combinePriceData.findIndex(item => (
          item.model == element.model
          && item.combineId == element.combineId
          && item.rank == element.rank
        ))
        if(existPrice !== -1){
          state.combinePriceData[existPrice] = element
        } else{
          state.combinePriceData.push(element)
        }
      })
      
      state.combinePriceData = [...state.combinePriceData]
    },
    changeCombineIdActive(state, combineId){
      state.combineIdActive = combineId
    },
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
    },
    handleChangeDeliData(context, deli_id){
      context.commit('changeDeliData', deli_id)
    },
    handleChangeIniData(context, iniData){
      context.commit('changeInitialData', iniData)
    },
    handleRestoreFromIni(context, iniData){
      context.commit('restoreFromIniData', iniData)
    },
    handleChangeErrorCode(context, code){
      context.commit('changeErrorCode', code)
    },
    handleChangeCartItemId(context, cartItemId){
      context.commit('changeCartItemId', cartItemId)
    },
    handleChangeLoaddingData(context, data){
      context.commit('changeLoaddingData', data)
    },
    handleUpdateOrderTemp(context, orderTempItem){
      context.commit('updateOrderTempItem', orderTempItem)
    },
    handleChangeOrderTemp(context, arrOrderTemp){
      context.commit('changeOrderTempItem', arrOrderTemp)
    },
    handleChangeOrderNow(context, orderNowId){
      context.commit('changeOrderNowId', orderNowId)
    },
    handleChangeModelSelected(context, model){
      context.commit('changeModelSelected', model)
    },
    handleChangeOrder(context, orderId){
      context.commit('changeOrder', orderId)
    },
    handleChangeCategoryOrder(context, category){
      context.commit('changeCategorySelect', category)
    },
    handleUpdateOptionSelectedOrderTemp(context, data){
      context.commit('updateOptionSelectedOrderTemp')
    },
    handleChangePriceActive(context, priceActive){
      context.commit('changePriceActive', priceActive)
    },
    handleUpdateCombinePrice(context, combinePrice){
      context.commit('updateCombinePrice', combinePrice)
    },
    handleChangeCombineActive(context, combineId){
      context.commit('changeCombineIdActive', combineId)
    }
  }
})
