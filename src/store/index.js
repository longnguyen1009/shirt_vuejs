import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //initial info when load page
    initialData: {}, // {shop_id, shop_kind, customer_id, staff_id, cartItemId, orderItemId}

    //選択してるカテゴリ: SUITS,JACKET,TROUSERS.VEST：13, SHIRT:14
    category_select: null,

    //今のorderID, 0は初期化
    orderNowId: 0,

    //存在ORDER、カートから入れる
    orderTempItem: [], //[{id, style, model, item, option_selected, price, quality, combineId}]

    //simuPage has 4 step: 1:スタイル選択、2:オーダーシミュレーション、3:オーダー内容確認、4:オーダー完了
    step: 1,
    //step=1 has 2 page, スタイル選択：page = 1, とモデル選択: page = 2
    page: 1, //page 2 is model page

    //画像、URL
    // main_path: 'https://stg-personalorder.united-arrows.co.jp/',
    // simu_img_path: "/html/upload/simu_model/",
    // style_img_path: "https://ua-images.s3.ap-northeast-1.amazonaws.com/upload/save_image/",
    // model_img_path: "https://ua-images.s3.ap-northeast-1.amazonaws.com/upload/save_image/",
    // kiji_img_path: "https://ua-images.s3.ap-northeast-1.amazonaws.com/upload/save_image/",
    // option_img_path: "https://ua-images.s3.ap-northeast-1.amazonaws.com/upload/save_image/",
    // correct_detail_img_path: "/html/upload/correct_detail/",
    // option_shirt_svg_path: "/html/upload/simu_model/option_shirt/",

    main_path: 'https://ua.coremobile.win/',
    simu_img_path: "/html/upload/simu_model/",
    style_img_path: "/html/upload/save_image/",
    model_img_path: "/html/upload/save_image/",
    kiji_img_path: "/html/upload/save_image/",
    option_img_path: "/html/upload/save_image/",
    correct_detail_img_path: "/html/upload/correct_detail/",
    option_shirt_svg_path: "/html/upload/simu_model/option_shirt/",

    // 全てスタイル情報
    styleData: [], //[{id, name, brand, detail, img, model[], product_price}]

    //全てモデル情報
    modelData: [], //{modelId, data}

    //step2からモデル選択に戻すの一時情報
    modelTemp: null, //{styleId, modelId}

    //選択した情報
    styleSelected: 0,
    modelSelected: 0,
    itemSelected: [],

    //オプション選択形： コードスキャン:1、リスト選択:2
    optionMode: 2,

    //選択してるデザイン情報
    designActive: {}, //{combine_id, design_id, item_id}

    //選択してる生地ID
    kijiActive: null, 

    // 全て生地情報
    kijiData: [],

    //生地の絞り込み情報
    kijiSearchData: {},

    // 全てオプションカテゴリの情報
    optionParentData: [], //{design_id, genreData, parentData}

    //選択してるオプションカテゴリ
    optionDetailActive: null,

    //全てオプションItemの情報
    // catelist: [{cate_id, cate_name}]
    // optionLists [{cate_id: [{id, name, img, simu_img, ....}]
    optionDataLoaded: [], //{model_id, design_id, parent_id, cateLists, optionLists }

    //全てオプションItemの情報
    optionDetailData:[],
    
    //選択したオプション情報
    optionSelectedData:[], // list of {combine_id, item_id, design_id, parent_id, option_id, cate_id, option_img, simu_img, name}

    //raw html for option change img temp when change option
    optionTemp: null, // {option_id, option_img, type: type}

    //全てアイテム情報
    itemData: [], //{orderId, items, design[] in step 2}

    //エーラ、アラート
    errorCode: 0,
    errorData: [
      {errorCode: 1, text: '認証が失敗しました。'},
      {errorCode: 2, text: 'データリクエストにエラーが発生しました。もう一度お試しください。'},
      {errorCode: 3, text: 'ユーザー情報の確認に失敗しました。もう一度ログインしてください。'},
      {errorCode: 4, text: '一時保存に入りました。'},
      {errorCode: 5, text: 'オーダー完了しました。'},
      {errorCode: 6, text: 'アイテム組み合わせが見つかりません。もう一度確認してください。'},
      {errorCode: 7, text: 'この生地は在庫がなくなりました。もう一度確認してください。'},
      {errorCode: 8, text: '原価情報はエラーが発生されました。'},
      {errorCode: 9, text: 'メール送信はエラーが発生されました。'},
    ],
    loaddingData: false,

    //上代情報
    combinePriceData: [], //{model, combineid, price}

    //組み合わせID
    combineIdActive: 0,

    //選択してるスタイルID
    sizeActiveId: 0,

    //選択してる在庫の情報
    stockSelectedData: [], //{orderId, kiji, stockVal, stock_design, stock_min, stock_max }

    //オーダー完了ID
    orderCompleteId: 0,

    //配送情報
    deliData: [],
    //受け取り方法
    deliActive: 2,

    //採寸情報
    correctDetailData: [], //{correct_id, detail_data}

    //選択したサイズ情報
    sizeSelectedData: [],// {orderId, size_id, item_id, name, base_val...}

    //選択した補正情報
    correctSelectedData: [], //{order_id, size_id, design_id, correct_id, correct_name, size_link, base_val, correct_detail_id, correct_detail_name, correct_detail_val, correct_result}
    
    //選択してる採寸ID
    correct_detail_id_now: 0,

    //選択したネックサイズ情報
    neckSelectedData: [], //{orderId, id , name},

    //Onemeasureの採寸情報
    measureData: null,
    
    //前の一時保存ID
    stock_old_id: null,

    //パンツとスペアパンツコービーする
    
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
    correct_detail_img_path: state => state.correct_detail_img_path,
    option_shirt_svg_path: state => state.option_shirt_svg_path,

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
    kijiSearchData: state => state.kijiSearchData,
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
    combinePriceData: state =>state.combinePriceData,
    combineIdActive: state => state.combineIdActive,
    
    //step 4
    orderCompleteId: state => state.orderCompleteId,
    deliData: state => state.deliData,
    sizeSelectedData: state => state.sizeSelectedData,
    correctDetailData: state => state.correctDetailData,
    correctSelectedData: state => state.correctSelectedData,

    //stock
    stockSelectedData: state => state.stockSelectedData,
    main_path: state => state.main_path,
    correct_detail_id_now: state => state.correct_detail_id_now,

    neckSelectedData: state => state.neckSelectedData,
    measureData: state => state.measureData,
    stock_old_id: state => state.stock_old_id
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
    changeOptionMode(state, mode){
      state.optionMode = mode
    },
    changeDesign(state, designId){
      state.designActive = designId
    },
    changeKiji(state, kiji){
      state.kijiActive = kiji

      // update optionSelectedData when GRL and kiji change
      if(state.initialData.shop_kind == 2 && state.kijiData){
        let kijiObj = state.kijiData.find(item => item.id == state.kijiActive)
        if(kijiObj && kijiObj.glr_kind){
          state.optionSelectedData = state.optionSelectedData.filter(item => (item.orderId != state.orderNowId || (item.orderId == state.orderNowId && item.glr_kind && item.glr_kind.indexOf(kijiObj.glr_kind + '') != -1)))
        }
      }
    },
    updateKijiSearchData(state, searchData){
      state.kijiSearchData = searchData
    },
    changeStyleData(state, styleData){
      Object.values(styleData).forEach(element => {
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

        //check is pant and copy to spare pant
        let itemDataTemp = state.itemData.find(item => item.orderId == optionData.orderId)
        if(itemDataTemp){
          let designDataTemp = itemDataTemp.design
          let designNowTemp = designDataTemp.find(item => item.item_id == optionData.item_id && item.design_id == optionData.design_id)
          if(designNowTemp && designNowTemp.is_pant == true){
            let designSpareTemp = designDataTemp.find(item => item.design_id == optionData.design_id && item.is_spare_pant)
            if(designSpareTemp){
              let optionDataCopy = {...optionData, item_id: designSpareTemp.item_id}
              state.optionSelectedData.push(optionDataCopy)
            }
          }
        }
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
    changeKijiData(state, data){
      data.forEach(element => {
        let existKijiIndex = state.kijiData.findIndex(item => item.id == element.id)
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
        (item) => item.design_id == parentData.design_id && item.model == parentData.model
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

      state.optionSelectedData = state.optionSelectedData.filter(item => item.orderId != state.orderNowId)
      state.optionSelectedData = [...state.optionSelectedData]

      state.sizeSelectedData = state.sizeSelectedData.filter(item => item.orderId != state.orderNowId)
      state.sizeSelectedData = [...state.sizeSelectedData]

      state.correctSelectedData = state.correctSelectedData.filter(item => item.order_id != state.orderNowId)
      state.correctSelectedData = [...state.correctSelectedData]

      state.neckSelectedData = state.neckSelectedData.filter(item => item.orderId != state.orderNowId)
      state.neckSelectedData = [...state.neckSelectedData]

      state.optionDetailActive = null,
      
      state.itemData = state.itemData.filter(item => item.orderId != state.orderNowId)
      state.itemData = [...state.itemData]

      //raw html for option change img temp
      state.optionTemp = null,
      state.optionDataLoaded = [] //{model_id, design_id, parent_id, cateLists, optionLists }
      // state.optionParentData = [] //{design_id, data}
    },
    updateOptionDetailData(state, detailData){
      Object.values(detailData).forEach(element => {
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
    changeCustomerId(state, customer_id){
      state.initialData.customer_id = customer_id
    },
    restoreFromIniData(state, data){
      state.kijiActive = (data.product_id) ? data.product_id : null
      state.styleSelected = (data.style) ? Number(data.style) : null
      state.modelSelected = (data.model) ? Number(data.model) : null
      state.combineIdActive = (data.combineId) ? Number(data.combineId) : null
      state.itemSelected = (data.item) ? JSON.parse(data.item) : []
      state.optionSelectedData = (data.option_selected) ? JSON.parse(data.option_selected) : []
      state.sizeSelectedData = (data.size_selected) ? JSON.parse(data.size_selected) : []
      state.neckSelectedData = (data.necksize) ? JSON.parse(data.necksize) : []
      state.correctSelectedData = (data.correct_selected) ? JSON.parse(data.correct_selected) : []
      state.category_select = (data.category_select) ? Number(data.category_select) : null
      state.deliActive = (data.shipping) ? data.shipping: 2
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
      state.orderTempItem = state.orderTempItem.filter(item => item.id != 0)
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
          element.necksize = JSON.parse(element.necksize)
          element.correct_selected = JSON.parse(element.correct_selected)
          element.stock = Number(element.stock)
          element.arrive_date = element.arrive_date ? (new Date(element.arrive_date)) : null
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
    // changeCategorySelect(state, category){
    //   state.category_select = category
    // },
    updateOrderTempAllData(state){
      state.orderTempItem.forEach((element, index) => {
        //update selected option
        state.orderTempItem[index].option_selected = state.optionSelectedData.filter(item => item.orderId == element.id)
        state.orderTempItem[index].correct_selected = state.correctSelectedData.filter(item => item.order_id == element.id)
        state.orderTempItem[index].design = state.itemData.find(item => item.orderId == element.id).design
        state.orderTempItem[index].necksize = state.neckSelectedData.filter(item => item.orderId == element.id)
      })
      state.orderTempItem = [...state.orderTempItem]
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
        && item.item == sizeData.item
      ))
      if(sizeSelectedIndex !== -1){
        state.sizeSelectedData[sizeSelectedIndex] = sizeData
      } else{
        state.sizeSelectedData.push(sizeData)
        
        //check is pant and copy to spare pant
        let itemDataTemp = state.itemData.find(item => item.orderId == sizeData.orderId)
        if(itemDataTemp){
          let designDataTemp = itemDataTemp.design
          let designNowTemp = designDataTemp.find(item => item.item_id == sizeData.item && item.design_id == sizeData.design)
          if(designNowTemp && designNowTemp.is_pant == true){
            let designSpareTemp = designDataTemp.find(item => item.design_id == sizeData.design && item.is_spare_pant)
            if(designSpareTemp){
              console.log({...sizeData, item: designSpareTemp.item_id})
              let sizeDataCopy = {...sizeData, item: designSpareTemp.item_id}
              state.sizeSelectedData.push(sizeDataCopy)
            }
          }
        }
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
      state.correctDetailData = [...state.correctDetailData]
    },
    updateCorrectSelectedData(state, correctedData){
      correctedData.forEach(element => {
        let correctedIndex = state.correctSelectedData.findIndex(item => (
          item.order_id == element.order_id
          && item.design_id == element.design_id
          && item.item_id == element.item_id
          && item.correct_id == element.correct_id
        ))
        if(correctedIndex !== -1){
          state.correctSelectedData[correctedIndex] = element

          //check is pant and copy to spare pant
          let itemDataTemp = state.itemData.find(item => item.orderId == element.order_id)
          if(itemDataTemp){
            let designDataTemp = itemDataTemp.design
            let designNowTemp = designDataTemp.find(item => item.item_id == element.item_id && item.design_id == element.design_id)
            if(designNowTemp && designNowTemp.is_pant == true){
              let designSpareTemp = designDataTemp.find(item => item.design_id == element.design_id && item.is_spare_pant)
              let correctedIndex2 = state.correctSelectedData.findIndex(item => (
                item.order_id == element.order_id
                && item.design_id == element.design_id
                && item.item_id == designSpareTemp.item_id
                && item.correct_id == element.correct_id
              ))
              let correctElementCopy = {...element, item_id: designSpareTemp.item_id}
              if(designSpareTemp && correctedIndex2 == -1){
                state.correctSelectedData.push(correctElementCopy)
              } else if(correctedIndex2 != -1 && !state.correctSelectedData[correctedIndex2].correct_detail_id){
                state.correctSelectedData[correctedIndex2] = correctElementCopy
              }
            }
          }
        } else{
          state.correctSelectedData.push(element)

          //check is pant and copy to spare pant
          let itemDataTemp = state.itemData.find(item => item.orderId == element.order_id)
          if(itemDataTemp){
            let designDataTemp = itemDataTemp.design
            let designNowTemp = designDataTemp.find(item => item.item_id == element.item_id && item.design_id == element.design_id)
            if(designNowTemp && designNowTemp.is_pant == true){
              let designSpareTemp = designDataTemp.find(item => item.design_id == element.design_id && item.is_spare_pant)
              if(designSpareTemp){
                let correctElementCopy = {...element, item_id: designSpareTemp.item_id}
                state.correctSelectedData.push(correctElementCopy)
              }
            }
          }
        }
      })
      state.correctSelectedData = [...state.correctSelectedData]
    },
    updateCorrectSelectedDataBySize(state, correctedData){
      if(correctedData.length){
        correctedData.forEach(element => {
          let correctIndex = state.correctSelectedData.findIndex(item => (
            item.order_id == element.order_id
            && item.design_id == element.design_id
            && item.item_id == element.item_id
            && item.correct_id == element.correct_id
          ))
          if(correctIndex !== -1){
            state.correctSelectedData[correctIndex] = element
          } else{
            state.correctSelectedData.push(element)

            //check is pant and copy to spare pant
            let itemDataTemp = state.itemData.find(item => item.orderId == element.order_id)
            if(itemDataTemp){
              let designDataTemp = itemDataTemp.design
              let designNowTemp = designDataTemp.find(item => item.item_id == element.item_id && item.design_id == element.design_id)
              if(designNowTemp && designNowTemp.is_pant == true){
                let designSpareTemp = designDataTemp.find(item => item.design_id == element.design_id && item.is_spare_pant)
                if(designSpareTemp){
                  let correctElementCopy = {...element, item_id: designSpareTemp.item_id}
                  state.correctSelectedData.push(correctElementCopy)
                }
              }
            }
          }
        })

        state.correctSelectedData = [...state.correctSelectedData]
      }
    },
    // stock data
    updateStockSelectedData(state){
      let itemDataNow = state.itemData.find(item => item.orderId == state.orderNowId)
      let stockSelectedNowIndex = state.stockSelectedData.findIndex(item => item.orderId == state.orderNowId)
      if(state.kijiActive && itemDataNow && stockSelectedNowIndex != -1){
        let sizeSelectedNow = state.sizeSelectedData.find(item => item.orderId == state.orderNowId && item.design == itemDataNow.stock_design)
        let KijiNowIndex = state.kijiData.findIndex(item => item.id == state.kijiActive)
        if(KijiNowIndex !== -1 && sizeSelectedNow){
          state.stockSelectedData[stockSelectedNowIndex].kiji = state.kijiActive
          let KijiNow = state.kijiData[KijiNowIndex]
            let stockValTemp = 0
            let stockItemTemp = itemDataNow.stock.find(item => (item.design_id == itemDataNow.stock_design && item.size_id == sizeSelectedNow.id))
            if(KijiNow.fabric_kind == 1){
              stockValTemp = stockItemTemp ? (stockItemTemp.bichikusei_scale ? stockItemTemp.bichikusei_scale : 0) : 0
            } else{
              stockValTemp = stockItemTemp ? (stockItemTemp.sensei_scale ? stockItemTemp.sensei_scale : 0) : 0
            }
            state.stockSelectedData[stockSelectedNowIndex].stockVal = stockValTemp
        } else{
          state.stockSelectedData[stockSelectedNowIndex].kiji = null,
          state.stockSelectedData[stockSelectedNowIndex].stockVal = 0
        }
      }
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
    },
    removeSizeDataOfOrder(state){
      state.sizeSelectedData = state.sizeSelectedData.filter(item => item.orderId != state.orderNowId)
      state.correctSelectedData = state.correctSelectedData.filter(item => item.order_id != state.orderNowId)
    },

    //原価計算
    updateOrderCostTemp(state, Costs){
      Costs.forEach(element => {
        let orderId = element.orderId
        let orderTempIndex = state.orderTempItem.findIndex(item => item.id == orderId)
        if(orderTempIndex != -1){
          state.orderTempItem[orderTempIndex].cost_temp = element.cost
        }
      })
      state.orderTempItem = [...state.orderTempItem]
    },
    changeCorrectionSelectedId(state, id){
      state.correct_detail_id_now = id
    },
    updateNeckSelectedData(state, neckData){
      let neckIndex = state.neckSelectedData.findIndex(item => item.orderId == neckData.orderId)
      if(neckIndex !== -1){
        state.neckSelectedData[neckIndex] = neckData
      } else{
        state.neckSelectedData.push(neckData)
      }
      state.neckSelectedData = [...state.neckSelectedData]
    },
    updateOneMeasureData(state, measureData){
      state.measureData = measureData
    },
    updateStockOldId(state, value){
      state.stock_old_id = value
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
    handleChangeOptionMode(context, mode){
      context.commit('changeOptionMode', mode)
    },
    handleChangeDesign(context, designId){
      context.commit('changeDesign', designId)
    },
    handleChangeKiji(context, kiji){
      context.commit('changeKiji', kiji)
    },
    handleUpdateKijiSearchData(context, searchData){
      context.commit('updateKijiSearchData', searchData)
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
    handleChangeCustomerId(context, customer_id){
      context.commit('changeCustomerId', customer_id)
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
    // handleChangeCategoryOrder(context, category){
    //   context.commit('changeCategorySelect', category)
    // },
    handleUpdateOrderTempAllData(context, data){
      context.commit('updateOrderTempAllData')
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
    },
    handleRemoveSizeData(context){
      context.commit('removeSizeDataOfOrder')
    },

    //原価計算
    handleUpdateOrderCostTemp(context, data){
      context.commit('updateOrderCostTemp', data)
    },
    
    handleChangeCorrectionSelectedId(context, id){
      context.commit('changeCorrectionSelectedId', id)
    },
    handleUpdateNeckSelectedData(context, neckData){
      context.commit('updateNeckSelectedData', neckData)
    },
    handleUpdateOneMeasureData(context, measureData){
      context.commit('updateOneMeasureData', measureData)
    },
    handleUpdateStockOldId(context, value){
      context.commit('updateStockOldId', value)
    },
    handleChangeKijiFirstLoad(context){
      context.commit('changeFirstShowKiji')
    }
  }
})
