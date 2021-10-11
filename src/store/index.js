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
    itemData: [], //{orderId, items, design[] in step 2}

    //受け取り方法
    deliActive: 0,

    errorCode: 0,
    errorData: [
      {errorCode: 1, text: '認証が失敗しました。'},
      {errorCode: 2, text: 'データリクエストにエラーが発生しました。もう一度お試しください。'},
      {errorCode: 3, text: 'ユーザー情報の確認に失敗しました。もう一度ログインしてください。'},
      {errorCode: 4, text: '一時保存に入りました。'},
      {errorCode: 5, text: 'オーダー完了しました。'},
      {errorCode: 6, text: 'アイテム組み合わせが見つかりません。もう一度確認してください。'},
      {errorCode: 7, text: 'この生地は在庫がなくなりました。もう一度確認してください。'},
    ],
    loaddingData: false,
    combinePriceData: [], //{model, combineid, price}
    priceActive: 0,
    combineIdActive: 0,

    sizeActiveId: 0,

    stockSelectedData: [], //{orderId, kiji, stockVal, stock_design, stock_min, stock_max }

    //step 4
    orderCompleteId: 0,
    deliData: [],

    //size
    correctDetailData: [], //{correct_id, detail_data}

    sizeSelectedData: [],// {orderId, size_id, name, base_val...}
    correctSelectedData: [] //{order_id, size_id, design_id, correct_id, correct_name, size_link, base_val, correct_detail_id, correct_detail_name, correct_detail_val, correct_result}
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
    deliActive: state => state.deliActive,
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
    combineIdActive: state => state.combineIdActive,
    
    //step 4
    orderCompleteId: state => state.orderCompleteId,
    deliData: state => state.deliData,
    sizeSelectedData: state => state.sizeSelectedData,
    correctDetailData: state => state.correctDetailData,
    correctSelectedData: state => state.correctSelectedData,

    //stock
    stockSelectedData: state => state.stockSelectedData
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
      kijiData.forEach(element => {
        const existKijiIndex = state.kijiData.findIndex(
          (item) => (
            item.id == element.id
          ))
        if(existKijiIndex !== -1){
          state.kijiData[existKijiIndex] = element
        } else{
          state.kijiData.push(element)
        }
      })
     
      //Clone the array to trigger a UI update.
      state.kijiData = [...state.kijiData]
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
      // state.kijiData = [],
      // state.itemData = [],

      state.optionSelectedData = state.optionSelectedData.filter(item => item.orderId != state.orderTempItem), // list of {combine_id, item_id, design_id, parent_id, option_id, cate_id, option_img: simu_img, name}
      state.optionDetailActive = null,

      //raw html for option change img temp
      state.optionTemp = null,
      state.optionDataLoaded = [] //{model_id, design_id, parent_id, cateLists, optionLists }
      // state.optionParentData = [] //{design_id, data}
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
    changeInitialData(state, iniData){
      state.initialData = iniData
    },
    restoreFromIniData(state, data){
      state.kijiActive = (data.product_id) ? data.product_id : null
      state.styleSelected = (data.style) ? Number(data.style) : null
      state.modelSelected = (data.model) ? Number(data.model) : null
      state.combineIdActive = (data.combineId) ? Number(data.combineId) : null
      state.itemSelected = (data.item) ? JSON.parse(data.item) : []
      state.optionSelectedData = (data.option_selected) ? JSON.parse(data.option_selected) : []
      state.sizeSelectedData = (data.size_selected) ? JSON.parse(data.size_selected) : []
      state.correctSelectedData = (data.correct_selected) ? JSON.parse(data.correct_selected) : []
      state.category_select = (data.category_select) ? Number(data.category_select) : null
      state.deliActive = (data.shipping) ? data.shipping: 0
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
          element.size_selected = JSON.parse(element.size_selected)
          element.correct_selected = JSON.parse(element.correct_selected)
          element.stock = Number(element.stock)
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
    updateOrderTempAllData(state){
      state.orderTempItem.forEach((element, index) => {
        //update selected option
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
    updatePriceOfOrder(state, priceData){
      const orderIndex = state.orderTempItem.findIndex(item => (item.id == priceData.orderId))
      if(orderIndex !== -1){
        state.orderTempItem[orderIndex].price = priceData.price
      }
    },
    changeOrderCompleteId(state, orderId){
      state.orderCompleteId = orderId
    },
    changeDeliActive(state, deli_id){
      state.deliActive = deli_id
    },
    changeDeliData(state, deliData){
      if(!state.deliActive || deliData.findIndex(item => item.id == state.deliActive) == -1){
        state.deliActive = deliData[0].id
      }
      state.deliData = deliData
    },
    removeOrderTemp(state, orderId){
      state.orderTempItem = state.orderTempItem.filter(item => item.id != orderId)
      state.optionSelectedData = state.optionSelectedData.filter(item => item.orderId != orderId)
      state.itemData = state.itemData.filter(item => item.orderId != orderId)
    },
    updateSizeSelectedData(state, sizeData){
      const sizeSelectedIndex = state.sizeSelectedData.findIndex(item => (
        item.orderId == sizeData.orderId
        && item.design == sizeData.design
      ))
      if(sizeSelectedIndex !== -1){
        state.sizeSelectedData[sizeSelectedIndex] = sizeData
      } else{
        state.sizeSelectedData.push(sizeData)
      }
      state.sizeSelectedData = [...state.sizeSelectedData]
    },
    updateCorrectDetailData(state, correctData){
      const correcIndex = state.correctDetailData.findIndex(item => (
        item.correct_id == correctData.correct_id
      ))
      if(correcIndex !== -1){
        state.correctDetailData[correcIndex] = correctData
      } else{
        state.correctDetailData.push(correctData)
      }
      state.sizeSelectedData = [...state.sizeSelectedData]
    },
    updateCorrectSelectedData(state, correctedData){
      correctedData.forEach(element => {
        const correctedIndex = state.correctSelectedData.findIndex(item => (
          item.order_id == element.order_id
          && item.design_id == element.design_id
          && item.size_id == element.size_id
          && item.correct_id == element.correct_id
        ))
        if(correctedIndex !== -1){
          state.correctSelectedData[correctedIndex] = element
        } else{
          state.correctSelectedData.push(element)
        }
      })
      state.correctSelectedData = [...state.correctSelectedData]
    },
    updateCorrectSelectedDataBySize(state, correctedData){
      if(correctedData.length){
        const firstItem = correctedData[0]
        state.correctSelectedData = state.correctSelectedData.filter(item => !(
          item.order_id == firstItem.order_id && item.design_id == firstItem.design_id
        ))
        state.correctSelectedData = [...state.correctSelectedData, ...correctedData]
      }
    },

    // stock data
    updateStockSelectedData(state){
      let stockSelectedNowIndex = state.stockSelectedData.findIndex(item => item.orderId == state.orderNowId)
      let sizeSelectedNow = state.sizeSelectedData.find(item => item.orderId == state.orderNowId)
      let itemDataNow = state.itemData.find(item => item.orderId == state.orderNowId)
      if(state.kijiActive && sizeSelectedNow){
        let KijiNowIndex = state.kijiData.findIndex(item => item.id == state.kijiActive)
        if(KijiNowIndex !== -1){
          state.stockSelectedData[stockSelectedNowIndex].kiji = state.kijiActive
          let KijiNow = state.kijiData[KijiNowIndex]
          // if(KijiNow.stock_unlimited){
          //   state.stockSelectedData[stockSelectedNowIndex].stockVal = 0
          // } else{
            let stockValTemp = 0
            let stockItemTemp = itemDataNow.stock.find(item => (item.design_id == itemDataNow.stock_design && item.size_id == sizeSelectedNow.id))
            if(KijiNow.fabric_kind == 1){
              stockValTemp = stockItemTemp ? (stockItemTemp.sensei_scale ? stockItemTemp.sensei_scale : 0) : 0
            } else{
              stockValTemp = stockItemTemp ? (stockItemTemp.bichikusei_scale ? stockItemTemp.bichikusei_scale : 0) : 0
            }
            state.stockSelectedData[stockSelectedNowIndex].stockVal = stockValTemp
          // }
        } else{
          state.stockSelectedData[stockSelectedNowIndex].kiji = null,
          state.stockSelectedData[stockSelectedNowIndex].stockVal = 0
        }
      }

      console.log('update updateStockSelectedData')
      console.log(state.stockSelectedData)
    },
    updateInitialStockData(state){
      state.itemData.forEach(element => {
        let stockSenseiArr = []
        let stockBichikuseiArr = []
        let sensei_min = 0
        let bichikusei_min = 0
        element.stock.forEach(el => {
          stockSenseiArr.push(el.sensei_scale)
          stockBichikuseiArr.push(el.bichikusei_scale)
        })
        if(stockSenseiArr.length){
          sensei_min = Math.max(0,...stockSenseiArr)
          bichikusei_min = Math.max(0,...stockBichikuseiArr)
        }

        let stockDataIndex = state.stockSelectedData.findIndex(item => item.orderId == element.orderId)
        if(stockDataIndex !== -1){
          state.stockSelectedData[stockDataIndex].stock_design = element.stock_design
          state.stockSelectedData[stockDataIndex].sensei_min = sensei_min
          state.stockSelectedData[stockDataIndex].bichikusei_min = bichikusei_min
        } else{
          state.stockSelectedData.push(
            {orderId: element.orderId, kiji: null, stockVal: 0, stock_design: element.stock_design, sensei_min: sensei_min, bichikusei_min: bichikusei_min}
          )
        }
      })
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
    },
    handleChangeDeliActive(context, deli_id){
      context.commit('changeDeliActive', deli_id)
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
    handleUpdateOrderTempAllData(context, data){
      context.commit('updateOrderTempAllData')
    },
    handleChangePriceActive(context, priceActive){
      context.commit('changePriceActive', priceActive)
    },
    handleUpdateCombinePrice(context, combinePrice){
      context.commit('updateCombinePrice', combinePrice)
    },
    handleChangeCombineActive(context, combineId){
      context.commit('changeCombineIdActive', combineId)
    },
    handleUpdatePriceOfOrder(context, priceData){
      context.commit('updatePriceOfOrder', priceData)
    },
    handleChandeOrderComplete(context, orderId){
      context.commit('changeOrderCompleteId', orderId)
    },
    handleChangeDeliData(context, deliData){
      context.commit('changeDeliData', deliData)
    },
    handleRemoveOrderTemp(context, orderId){
      context.commit('removeOrderTemp', orderId)
    },
    handleUpdateSizeSelectedData(context, sizeData){
      context.commit('updateSizeSelectedData', sizeData)
    },
    handleUpdateCorrectionDetailData(context, correctionData){
      context.commit('updateCorrectDetailData', correctionData)
    },
    handleUpdateCorrectSelectedData(context, correctSelectedData){
      context.commit('updateCorrectSelectedData', correctSelectedData)
    },
    handleUpdateCorrectSelectedDataBySize(context, correctSelectedData){
      context.commit('updateCorrectSelectedDataBySize', correctSelectedData)
    },

    //stock update
    handleUpdateStockSelectedData(context, data){
      context.commit('updateStockSelectedData')
    },
    handleUpdateInitialStockData(context){
      context.commit('updateInitialStockData')
    }
  }
})
