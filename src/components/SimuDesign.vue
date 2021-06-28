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
            <div class="row my-4" v-if="stepNow == '1'">
                <div class="col-12 d-flex justify-content-between">
                    <div class="stepBtn" v-for="step in stepList" :key="step.id"
                        :class="{ active: stepActive.includes(step.id) }" @click="changeStep(step.id)">
                        {{ step.name }}
                    </div>
                </div>
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
            <div class="selector_list_parts border border-3 border-info" v-if="checkShowPartList">
                <ul class="parts_list d-flex justify-content-start">
                    <li class="parts_item" v-for="part in partsList" :key="part.id"
                        :class="{ active: partsActive.includes(part.id) }" @click="partSelect(part.id)">
                        {{ part.name }}
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
                            <div class="d-flex justify-content-start align-items-center mb-4" 
                            v-for="sizeItem in measure_data" :key="sizeItem.id">
                                <div class="measure-size">
                                    <span class="measureInputLabel">{{
                                        sizeItem.name
                                        }}</span>
                                    <input type="text" v-model="sizeItem.value" />
                                </div>
                                <div :id="'measure-ruler-' + sizeItem.id" class="measure-ruler">
                                    <div id="example" class="range">
                                        <input id="input-example" type="range" min="1" max="6" steps="1" v-model="measure_data[sizeItem.id].value"/>
                                    </div>
                                    <ul id="labels-example" class="range-labels">
                                        <li v-for="i in 6" :key="i"
                                        :class="{selected: i == measure_data[sizeItem.id].value}"
                                        @click="(measure_data[sizeItem.id].value = i)">{{i}}</li>
                                    </ul>
                                </div>
                                <!-- <span class="ml-4" v-if="sizeItem.id == 0">いかり肩</span> -->
                            </div>
                        </div>
                    </div>
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
                    <button type="button" class="btn btn-outline-secondary" @click="popupCancel">
                        キャンセル
                    </button>
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
                    0: {id: 0,name: "なで肩",value: 0},
                    1: {id: 1,name: "補正2",value: 0},
                    2: {id: 2,name: "補正3",value: 0},
                    3: {id: 3,name: "補正4",value: 0},
                },
                partsList: {
                    0: {id: 0,name: "ポケット"},
                    1: {id: 1,name: "ボタン"},
                    2: {id: 2,name: "補正1"},
                    3: {id: 3,name: "背裏"},
                    4: {id: 4,name: "胴裏地"},
                    5: {id: 5,name: "○ ○ ○"},
                    6: {id: 6,name: "○ ○ ○"},
                    7: {id: 7,name: "○ ○ ○"},
                },
                stepActive: [1],
                stepNow: 1,
                c3StyleId: "",
                c3PartId: "",
                fabric_selected: "",
                partsActive: [],
                select_type: 1, // select_type:　0:一覧から選択　/ 1: コードから選択
                //QR Code
                camera: "auto",
                result: null,
                showScanConfirmation: false,
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
                if(this.partsActive.includes(0)){
                    this.partsActive.splice(this.partsActive.indexOf(0),1)
                }
                if(this.partsActive.includes(1)){
                    this.partsActive.splice(this.partsActive.indexOf(1),1)
                }
                if(this.partsActive.includes(2)){
                    this.partsActive.splice(this.partsActive.indexOf(2),1)
                }
            },
            partSelect(partId) {
                if (this.partsActive.includes(partId)) {
                    var index = this.partsActive.indexOf(partId);
                    this.partsActive.splice(index, 1);
                } else {
                    this.partsActive.push(partId);
                }
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
                    this.partsActive = [0, 1, 2, 3, 4, 5, 7];
                    this.stepActive = [1, 3]
                    this.select_type = 1
                    this.measure_data[0].value = 2;
                    this.measure_data[1].value = 3;
                    this.measure_data[2].value = 4;
                    this.measure_data[3].value = 5;
                }
            },
            changeSelectType(type) {
                this.select_type = type;
            },
            //QRCode
            async onInit(promise) {
                try {
                    await promise;
                } catch (e) {
                    alert(e);
                    console.error(e);
                } finally {
                    this.showScanConfirmation = this.camera === "off";
                }
            },
            async onDecode(content) {
                this.result = content;
                this.pause();
                await this.timeout(500);
                this.unpause();
            },
            unpause() {
                this.camera = "auto";
            },
            pause() {
                this.camera = "off";
            },
            timeout(ms) {
                return new Promise((resolve) => {
                    window.setTimeout(resolve, ms);
                });
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
            }
        },
        computed: {
            checkShowPartList: function () {
                if (this.stepNow == 1) {
                    if (this.stepActive.includes(2) || this.orderId) {
                        return true;
                    }
                }
                return false;
            },
            checkCompleteOrder: function(){
                if(this.partsActive.length == Object.keys(this.partsList).length && this.fabric_id != '' && this.stepActive.includes(3)){
                    return true
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
                if(this.partsActive.includes(1)){
                    return "CODE-BUTON001"
                }
                return ''
            },
            pocket_code: function(){
                if(this.partsActive.includes(0)){
                    return "CODE-POCKET001"
                }
                return ''
            },
            ura_code: function(){
                if(this.partsActive.includes(3)){
                    return "CODE-URA001"
                }
                return ''
            },
            size_code: function(){
                if(this.orderId){
                    return "CODE-001"
                }
                return ''
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