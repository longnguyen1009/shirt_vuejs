<template>
    <div class="selector__design_selector">
        <div class="selector_design">
            <div class="selector_design_part">
                <div>
                    <button type="button" class="btn btn-outline-dark" @click="changeModeViewAll"
                        :class="[viewMode == 'all' ? 'active' : '']">
                        全体を表示
                    </button>
                </div>
                <div class="selector_c3Cate">
                    <div v-for="c3CateItem in c3CategoryList" :key="c3CateItem.id" @click="c3CateChange(c3CateItem.id)"
                        class="c3CateBtn" :class="[
                            c3CateItem.id === c3CategoryId && viewMode != 'all'
                                ? 'active'
                                : '',
                        ]" :cate-id="c3CateItem.id">
                        {{ c3CateItem.name }}
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <b-button-group class="col-12">
                    <b-button variant="outline-dark" class="col-md-6 border py-3" :class="{ active: select_type == 1 }"
                        @click="changeSelectType(1)">コードから選択</b-button>
                    <b-button variant="outline-dark" class="col-md-6 border py-3" :class="{ active: select_type == 0 }"
                        @click="changeSelectType(0)">一覧から選択</b-button>
                </b-button-group>
            </div>
        </div>
        <div class="select-type-basic" v-if="select_type == 0">
            <div class="row my-4" v-if="stepNow == 1">
                <div class="col-12 d-flex justify-content-between">
                    <div class="stepBtn" v-for="step in stepList" :key="step.id"
                        :class="{ active: stepActive.includes(step.id) }" @click="changeStep(step.id)">
                        {{ step.name }}
                    </div>
                </div>
            </div>
            <div class="selector_list_parts border border-3 border-info" v-if="showPartCheck">
                <ul class="parts_list d-flex justify-content-start">
                    <li class="parts_item" v-for="part in partLists" :key="part.id"
                        :class="{ active: partsActive[part.id] }" @click="partSelect(part.id)">
                        <p class="parts_item_img"><img :src="server_img_path + 'save_images/' + part.img" alt=""></p>
                        <p class="parts_item_name">{{ part.name }}</p>
                    </li>
                </ul>
            </div>
            <div class="selector_list_parts border border-3 border-info mt-4" v-if="stepNow == 2">
                <div class="row d-flex justify-content-between align-items-center p-4">
                    <div class="common-btn-return" @click="returnStep(1)">
                        <i class="fas fa-chevron-circle-left"></i>&nbsp;&nbsp;戻る
                    </div>
                    <div class="fabric-select-btn">
                        <button type="button" class="btn btn-dark mx-2">
                            検索
                        </button>
                        <button type="button" class="btn btn-outline-dark mx-2" @click="submitFabric">
                            決定する
                        </button>
                    </div>
                </div>
                <ul class="fabric_list">
                    <li v-for="item in fabric_list" :key="item.product_id" class="fabric_item"
                        v-bind:id="'product_' + item.product_id" :class="[
                            fabric_selected == item.product_id ? 'active' : '',
                        ]">
                        <p class="kiji_img" style="display: none">
                            {{ item.kiji_image }}
                        </p>
                        <figure @click="changeFabric(item.product_id)">
                            <div class="prodcut__list__iconset">
                                <span class="product__list__icon icon_mizuiro">W</span>
                            </div>
                            <img :src="
                                    server_img_path +
                                    'product/' +
                                    item.main_image
                                " class="lazyitemlister" />
                        </figure>
                        <p class="product__list__info_opener" v-b-modal.modal-3
                            @click="showFabricDetail(item.product_id)">
                            INFO
                        </p>
                        <div class="product__list__data" @click="changeFabric(item.product_id)">
                            <p class="product__list__data__maker">
                                {{ item.product_code }}
                            </p>
                            <p class="product__list__data__name">
                                {{ item.name }}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="selector_list_parts border border-3 border-info mt-4" v-if="stepNow == 3">
                <div class="row d-flex justify-content-between align-items-center p-4">
                    <div class="common-btn-return" @click="returnStep(1)">
                        <i class="fas fa-chevron-circle-left"></i>&nbsp;&nbsp;戻る
                    </div>
                    <div class="fabric-select-btn">
                        <button type="button" class="btn btn-outline-dark mx-2" @click="submitMeasureData">
                            決定する
                        </button>
                    </div>
                </div>
                <div class="measure_data">
                    <div class="measure_data_input mt-3">
                        <div class="custom-file d-flex align-items-center">
                            <span>サイズ選択</span>
                            <select class="form-control form-control-inline">
                                <option>選択してください</option>
                                <option>テキスト</option>
                                <option>テキスト０１</option>
                            </select>
                            <span class="form-control-file-icon"
                                onclick="document.getElementById('exampleFormControlFile1').click();"><i
                                    class="fas fa-camera"></i></span>
                            <input type="file" class="
                                    form-control-file form-control-file-hidden
                                " id="exampleFormControlFile1" />
                        </div>
                        <div class="measure_size_input mt-4">
                            <div class="measure_size_row" v-for="sizeItem in measure_data" :key="sizeItem.id">
                                <div :id="'measure-ruler-' + sizeItem.id" class="measure-ruler">
                                    <span class="measure-ruler-label">{{sizeItem.name}}</span>
                                    <input type="text" class="measure-ruler-inputText" v-model="sizeItem.value" />
                                    <span v-if="sizeItem.id == 0" class="measure-ruler-label">なで肩</span>
                                    <button type="button" class="btn btn-outline-dark"
                                    @mousedown="mousedownMinus(sizeItem.id)"
                                    @mouseup="mouseup"
                                    >-</button>
                                    <div class="range-ruler">
                                        <input type="range" class="custom-range" :min="sizeItem.min" :max="sizeItem.max" :step="sizeItem.step" v-model="sizeItem.value">
                                        <ul class="range-labels">
                                            <li v-for="i in even(sizeItem.min, sizeItem.max, sizeItem.step)" :key="i" :class="{selected : (i == sizeItem.value)}"
                                            @click="(sizeItem.value = i)"><span class="range-num">
                                                <span v-if="i % 2 == 0">{{i}}</span></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <button type="button" class="btn btn-outline-dark"
                                    @mouseup="mouseup"
                                    @mousedown="mousedownAdd(sizeItem.id)">+</button>
                                    <span v-if="sizeItem.id == 0" class="measure-ruler-label">いかり肩</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- PART DETAIL -->
            <div class="selector_list_parts border border-3 border-info" v-if="showPartDetailCheck">
                <!-- PART DETAIL ITEM -->
                <div class="part-detail__comp">
                    <div class="row d-flex justify-content-between align-items-center p-4">
                        <div class="common-btn-return" @click="returnStep(1)">
                            <i class="fas fa-chevron-circle-left"></i>&nbsp;&nbsp;戻る
                        </div>
                        <div class="part-detail__confirm">
                            <button type="button" class="btn btn-outline-dark mx-2"
                            @click="partItemDetailConfirm(partDetailNow, partDetailIdTemp)">決定する</button>
                        </div>
                    </div>
                    <ul class="part-detail__list" v-if="partDetailNow !=='' ">
                        <li v-for="(partItem, partId) in partLists[partDetailNow].option" :key="partId" :partId="partItem.id"
                            @click="partItemDetailSelect(partItem.id)"
                            :class="{active: partDetailIdTemp == partItem.id}">
                            {{partItem.name}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="select-type-code" v-if="select_type == 1">
            <div class="selector_list_parts border border-3 border-info mt-4">
                <div class="row d-flex justify-content-end align-items-center p-4">
                    <div class="fabric-select-btn">
                        <button type="button" class="btn btn-outline-dark mx-2">決定する</button>
                    </div>
                </div>
                <div class="simu-selectcode">
                    <div class="simu-selectcode-item d-flex align-items-center">
                        <span class="simu-selectcode-name">サイズ選択</span>
                        <input type="text" class="form-control form-control-inline" v-model="size_code"/>
                        <!-- <select class="form-control form-control-inline">
                            <option>選択してください</option>
                            <option>テキスト</option>
                            <option>テキスト０１</option>
                        </select> -->
                        <span class="form-control-file-icon"
                            onclick="document.getElementById('selectCode-style').click();"><i
                                class="fas fa-camera"></i></span>
                        <input type="file" class="form-control-file form-control-file-hidden" id="selectCode-style" />
                    </div>
                    <div class="simu-selectcode-item d-flex align-items-center">
                        <span class="simu-selectcode-name">生地</span>
                        <input type="text" class="form-control form-control-inline" v-model="fabric_code"/>
                        <span class="form-control-file-icon"
                            onclick="document.getElementById('selectCode-kiji').click();"><i
                                class="fas fa-camera"></i></span>
                        <input type="file" class="form-control-file form-control-file-hidden" id="selectCode-kiji" />
                    </div>
                    <div class="simu-selectcode-item d-flex align-items-center">
                        <span class="simu-selectcode-name">ボタン</span>
                        <input type="text" class="form-control form-control-inline" v-model="button_code"/>
                        <span class="form-control-file-icon"
                            onclick="document.getElementById('selectCode-button').click();"><i
                                class="fas fa-camera"></i></span>
                        <input type="file" class="form-control-file form-control-file-hidden" id="selectCode-button" />
                    </div>
                    <div class="simu-selectcode-item d-flex align-items-center">
                        <span class="simu-selectcode-name">ポケット</span>
                        <input type="text" class="form-control form-control-inline" v-model="pocket_code"/>
                        <span class="form-control-file-icon"
                            onclick="document.getElementById('selectCode-boket').click();"><i
                                class="fas fa-camera"></i></span>
                        <input type="file" class="form-control-file form-control-file-hidden" id="selectCode-boket" />
                    </div>
                    <div class="simu-selectcode-item d-flex align-items-center">
                        <span class="simu-selectcode-name">背裏</span>
                        <input type="text" class="form-control form-control-inline" v-model="ura_code"/>
                        <span class="form-control-file-icon"
                            onclick="document.getElementById('selectCode-back').click();"><i
                                class="fas fa-camera"></i></span>
                        <input type="file" class="form-control-file form-control-file-hidden" id="selectCode-back" />
                    </div>
                </div>
            </div>
        </div>
        <div class="simu-popup" id="simu-popup01">
            <div class="simu-popup-content p-3">
                <p class="text-center mt-4 mb-4">
                    選択したスタイルを変更しますか？
                </p>
                <ul class="simu-popup-btn">
                    <button type="button" class="btn btn-outline-secondary" @click="popupCancel">キャンセル</button>
                    <span class="btn btn-warning"><a href="./test01/style.html">変更する</a></span>
                </ul>
            </div>
        </div>
        <div class="simu-popup" id="simu-popup02">
            <div class="simu-popup-content p-3">
                <p>生地変更すると下記の選択内容が適用されなくなります。</p>
                <ul class="simu-info-selected">
                    <li>ボタン：</li>
                    <li>補正1：</li>
                    <li>ポケット：</li>
                </ul>
                <p class="text-center mt-4 mb-4">
                    上記をクリアして変更しますか？
                </p>
                <ul class="simu-popup-btn">
                    <button type="button" class="btn btn-outline-secondary" @click="popupCancel">
                        キャンセル
                    </button>
                    <button type="button" class="btn btn-warning"
                        @click="changeFabricConfirmOK(fabric_selected, $event)">
                        変更する
                    </button>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "SimuDesign",
        components: {},
        data() {
            return {
                stepList: [
                    {id: 1,name: "スタイル"}, 
                    {id: 2,name: "生地"}, 
                    {id: 3,name: "サイズ補正"},
                ],
                measure_data: {
                    0: {id: 0,name: "補正1",value: 0, min : -10, max : 10, step : 0.5},
                    1: {id: 1,name: "補正2",value: 0, min : -10, max : 10, step : 0.5},
                    2: {id: 2,name: "補正3",value: 0, min : -10, max : 10, step : 0.5},
                    3: {id: 3,name: "補正4",value: 0, min : -10, max : 10, step : 0.5}
                },
                partLists: {
                    0: {id: 0,name: "ポケット",img: "08021549_5d43dcefd3791.jpg",option: {
                        0: {id: 15, name: '船形(直線)'},
                        1: {id: 16, name: 'バルカ(曲線)'},
                        2: {id: 17, name: 'パッチポケット'},
                        3: {id: 18, name: '両玉縁フラップ 有り'},
                        4: {id: 19, name: 'スラント両玉縁フラップ 有り'}
                    }},
                    1: {id: 1,name: "ボタン",img: "07291208_5d3e63493b8ca.jpg",option: {
                        0: {id: 20, name: '5B'},
                        1: {id: 21, name: '6B'}
                    }},
                    2: {id: 2,name: "補正1",img: "07291331_5d3e7686bfd43.jpg",option:{
                        0: {id: 21, name: 'テキスト'},
                        1: {id: 22, name: 'テキスト'},
                    }},
                    3: {id: 3,name: "背裏", img: "07291207_5d3e62efc5a64.jpg",option: {
                        0: {id: 23, name: '総裏'},
                        1: {id: 24, name: '背抜き'},
                        2: {id: 25, name: '裏無し'},
                    }},
                    4: {id: 4,name: "胴裏地", img: "07291114_5d3e5676161a2.jpg",option:{
                        0: {id: 26, name: 'テキスト'},
                        1: {id: 27, name: 'テキスト'},
                    }},
                    5: {id: 5,name: "○ ○ ○", img: "07291103_5d3e540a01264.jpg",option:{
                        0: {id: 28, name: 'テキスト'},
                        1: {id: 29, name: 'テキスト'},
                    }},
                    6: {id: 6,name: "○ ○ ○", img: "07291157_5d3e60aa4d877.jpg",option:{
                        0: {id: 30, name: 'テキスト'},
                        1: {id: 31, name: 'テキスト'},
                    }},
                    7: {id: 7,name: "○ ○ ○", img: "07291157_5d3e60aa4d877.jpg",option:{
                        0: {id: 32, name: 'テキスト'},
                        1: {id: 33, name: 'テキスト'},
                    }},
                },
                stepActive: [1],
                partsActive: [null,null,null,null,null,null,null,null], //{partID: 0, partDetailId: [15, 16, 17]}
                stepNow: 1,
                partDetailNow: '',
                partDetailIdTemp: '',
                select_type: 1, // select_type:　0:一覧から選択　/ 1: コードから選択
                fabric_selected: "",
                checkCompleteOrder: false,

                //QR Code
                camera: "auto",
                result: null,
                showScanConfirmation: false,
                interval: false
            };
        },
        props: ["viewMode","orderId","c3CategoryList","c3CategoryId","server_img_path","gender","fabric_id","fabric_list"],
        methods: {
            c3CateChange: function (c3CateId) {
                this.$emit("changeCategory", c3CateId);
            },
            changeModeViewAll: function () {
                this.$emit("view-mode", "all");
            },
            changeFabric(id) {
                this.$emit("changeFabric", id);
                this.fabric_selected = id;
            },
            changeFabricConfirmOK(id, event) {
                this.$emit("submitFabric", this.fabric_selected)
                this.stepActive.push(2)
                this.changeStep(1)
                this.popupCancel(event)
                this.partsActive[0] = null 
                this.partsActive[1] = null 
                this.partsActive[2] = null
            },
            partSelect(partId) {
                this.partDetailNow = partId
                this.partDetailIdTemp = this.partsActive[partId]
            },
            submitFabric: function () {
                if (this.fabric_selected != "") {
                    if (this.fabric_selected != this.fabric_id) {
                        //change fabric_id or the fisrt time has order_id
                        if (this.fabric_id != "" || this.orderId ) {
                            $("#simu-popup02").addClass("active");
                        } else {
                            //first time select
                            this.$emit("submitFabric", this.fabric_selected);
                            this.stepActive.push(2);
                            this.changeStep(1);
                        }
                    } else {
                        this.changeStep(1);
                    }
                } else {
                    alert("生地を選択していません。");
                }
            },
            submitMeasureData: function () {
                this.stepActive.push(3);
                this.changeStep(1);
            },
            showFabricDetail(id) {
                this.$emit("showFabricDetail", id);
            },
            changeStep(id) {
                if (this.stepNow == 1 && id == 1) {
                    $("#simu-popup01").addClass("active");
                } else {
                    this.stepNow = id;
                }
            },
            returnStep(step) {
                this.stepNow = 1;
                this.partDetailNow = ''
                this.partDetailIdTemp = ''
            },
            decreaseSize(id) {
                this.measure_data[id].value = this.measure_data[id].value - 1;
            },
            increaseSize(id) {
                this.measure_data[id].value = this.measure_data[id].value + 1;
            },
            changeStyleConfirmOK: function () {
                $("#simu-popup01").removeClass("active");
            },
            popupCancel: function (event) {
                $(event.target).parents(".simu-popup").removeClass("active");
            },
            getOrderDetail(id) {
                if (id) {
                    this.partsActive[0] = 19
                    this.partsActive[1] = 21
                    this.partsActive[2] = 22
                    this.partsActive[3] = 24
                    this.partsActive[4] = 27
                    this.partsActive[5] = 29
                    this.partsActive[6] = 31
                    this.partsActive[7] = 33

                    this.stepActive = [1, 3]
                    this.select_type = 1
                    this.measure_data[0].value = 2;
                    this.measure_data[1].value = 3;
                    this.measure_data[2].value = 4;
                    this.measure_data[3].value = 5;
                } else{
                    this.partsActive[0] = null
                    this.partsActive[1] = null
                    this.partsActive[2] = null
                    this.partsActive[3] = null
                    this.partsActive[4] = null
                    this.partsActive[5] = null
                    this.partsActive[6] = null
                    this.partsActive[7] = null
                }
            },
            changeSelectType(type) {
                this.select_type = type;
            },
            partItemDetailSelect(part_id){
                if(this.partDetailIdTemp == part_id){
                    this.partDetailIdTemp = ''
                } else{
                    this.partDetailIdTemp = part_id
                }
            },
            partItemDetailConfirm(partId, partDetailId){
                if(partDetailId){
                    this.partsActive[partId] = partDetailId
                    this.returnStep(1)
                } else{
                    alert(this.partLists[partId].name+'を選択していません。')
                }
                this.checkCompleteOrderUpdate();
            },
            checkCompleteOrderUpdate(){
                if(this.partsActive.every(function(i) { return i !== null; }) && this.fabric_id != '' && this.stepActive.includes(3)){
                    this.checkCompleteOrder = true
                } else{
                    this.checkCompleteOrder = false
                }
            },
            even: function(min, max, step){
                var length = (max - min) / step + 1;
                return new Array(length).fill(min).map((_, i) => min + i * step)
            },
            mousedownMinus(i){
                if(this.measure_data[i].value > this.measure_data[i].min){
                    this.measure_data[i].value = parseFloat(this.measure_data[i].value) - parseFloat(this.measure_data[i].step)
                    if(!this.interval){
                        this.interval = setInterval(() => this.sizeChange('down', i), 150)	
                    }
                }
            },
            mousedownAdd(i){
                if(this.measure_data[i].value < this.measure_data[i].max){
                    this.measure_data[i].value = parseFloat(this.measure_data[i].value) + parseFloat(this.measure_data[i].step)
                    if(!this.interval){
                        this.interval = setInterval(() => this.sizeChange('up', i), 150)	
                    }
                }
            },
            sizeChange(change, i){
                if(change == 'up' && this.measure_data[i].value < this.measure_data[i].max){
                    this.measure_data[i].value = parseFloat(this.measure_data[i].value) + parseFloat(this.measure_data[i].step)
                }
                if(change == 'down' && this.measure_data[i].value > this.measure_data[i].min){
                    this.measure_data[i].value = parseFloat(this.measure_data[i].value) - parseFloat(this.measure_data[i].step)
                }
            },
            mouseup() {
                clearInterval(this.interval)
                this.interval = false
            },
        },
        mounted() { },
        watch: {
            orderId: function () {
                this.getOrderDetail(this.orderId);
            },
            stepNow: function () {
                this.$emit("changeStepNow", this.stepNow);
                this.fabric_selected = this.fabric_id;
            },
            fabric_id: function () {
                this.fabric_selected = this.fabric_id;
            },
            checkCompleteOrder: function(){
                this.$emit("check-complete", this.checkCompleteOrder);
            },
            stepActive: function(){
                this.checkCompleteOrderUpdate()
            }

        },
        computed: {
            showPartCheck: function () {
                if (this.stepNow == 1 && (this.stepActive.includes(2) || this.orderId) && this.partDetailNow === '') {
                        return true;
                }
                return false;
            },
            fabric_code: function(){
                if(this.fabric_id){
                    return Object.keys(this.fabric_list)
                    .map((key) => this.fabric_list[key])
                    .filter((item) => item.product_id === this.fabric_id)[0].product_code;
                }

                return ''
            },
            button_code: function(){
                if(this.partsActive[1] !== null){
                    return "CODE-BUTON001"
                }
                return ''
            },
            pocket_code: function(){
                if(this.partsActive[0] !== null){
                    return "CODE-POCKET001"
                }
                return ''
            },
            ura_code: function(){
                if(this.partsActive[3] !== null){
                    return "CODE-URA001"
                }
                return ''
            },
            size_code: function(){
                if(this.orderId){
                    return "CODE-001"
                }
                return ''
            },
            showPartDetailCheck: function(){
                if(this.partDetailNow !== '' && this.stepNow == 1){
                    return true
                } else{
                    return false
                }
            }
        },
    };
</script>

<style scoped>
    .scan-confirmation {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.8);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
</style>