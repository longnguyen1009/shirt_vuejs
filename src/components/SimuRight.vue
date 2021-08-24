<template>
    <div class="container-simu_right">
        <div class="mt-2 mb-3">
            <p>
                <a
                    href=""
                    class="badge badge badge-light px-4 py-2 border border-info"
                    >一時保存</a
                >
            </p>
            <p class="my-1">
                <button
                    @click="completeOrderCheck"
                    class="badge px-4 py-2 border order_confirm_btn"
                    :class="{ completed: completeOrder }"
                >
                    オーダー内容確認
                </button>
            </p>
        </div>
        <div class="row">
            <div class="col simu_result_box">
                <div style="display: none" class="simulator__preloader">
                    <img v-bind:src="obj_bg_path" @load="svgLoaded" alt="" />
                </div>
                <div class="simulator__image_view border">
                    <div class="sample">
                        <img
                            :src="main_model_path.model_path"
                            class="img_torso"
                        />
                        <object
                            ref="carousel_or_anything"
                            type="image/svg+xml"
                            v-bind:data="main_model_path.svg_path"
                            @load="svgLoaded02"
                            class="suitmodel"
                            style="image-rendering: pixelated"
                        ></object>
                        <img
                            :src="main_model_path.shadow_path"
                            class="img_shadow"
                        />
                    </div>
                    <div class="options">
                        <img
                            :src="option_button_path"
                            class="img_option"
                            v-on:error="notfounder"
                        />
                        <img
                            :src="option_flower_path"
                            class="img_option"
                            v-on:error="notfounder"
                        />
                    </div>
                    <div class="loadding_bl">
                        <div class="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div
                        class="fullScreenBtn full_modal_show"
                        @click="modalFullviewShow"
                    >
                        <i class="fas fa-search-plus"></i>
                    </div>
                </div>
            </div>
            <div class="simu-modal-fullview">
                <div
                    id="modal-2"
                    title="オーダー（シミュレーター拡大）"
                    class="modal_content_fullScreeen"
                >
                    <div class="simulator__image_view">
                        <div class="sample">
                            <img
                                :src="main_model_path.model_path"
                                class="img_torso"
                            />
                            <object
                                ref="carousel_or_anything"
                                type="image/svg+xml"
                                v-bind:data="main_model_path.svg_path"
                                @load="svgLoaded02"
                                class="suitmodel02"
                                style="image-rendering: pixelated"
                            ></object>
                            <img
                                :src="main_model_path.shadow_path"
                                class="img_shadow"
                            />
                        </div>
                        <div class="options">
                            <img
                                :src="option_button_path"
                                class="img_option"
                                v-on:error="notfounder"
                            />
                            <img
                                :src="option_flower_path"
                                class="img_option"
                                v-on:error="notfounder"
                            />
                        </div>
                        <div class="loadding_bl">
                            <div class="lds-ellipsis">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div
                            class="
                                fullScreenBtn
                                fullScreenBtn02
                                full_modal_hide
                            "
                            @click="modalFullviewHide"
                        >
                            <i class="fas fa-search-minus"></i>
                        </div>
                    </div>
                    <div class="modal-simu_price" v-html="cloneData01"></div>
                </div>
            </div>
        </div>
        <!-- <button class="btn btn-outline-dark" @click="changeEriGata">Change 衿型</button> -->
    </div>
</template>

<script>
export default {
    name: "SimuRight",
    directives: {
        //imagesLoaded
    },
    data() {
        return {
            cloneData01: "",
        };
    },
    props: [
        "server_img_path",
        "gender",
        "step",
        "obj_bg_path",
        "viewMode",
        "partNo",
        "partNo_zentai",
        "completeOrder",
    ],
    methods: {
        defaultLoaded() {
            $(".loadding_bl").addClass("on");
            setTimeout(function () {
                $(".loadding_bl").removeClass("on");
            }, 700);
        },
        svgLoaded() {
            var target = document.querySelector(".suitmodel").contentDocument;
            var tex = $(".simulator__preloader").find("img");
            $(target)
                .find("pattern")
                .not("#buttons")
                .find("image")
                .attr("xlink:href", tex[0].currentSrc)
                .attr("width", tex[0].naturalWidth)
                .attr("height", tex[0].naturalHeight);
            $(target)
                .find("pattern")
                .not("#buttons")
                .attr("width", tex[0].naturalWidth)
                .attr("height", tex[0].naturalHeight);
            this.modalSvgLoad();
        },
        //test change erigata 衿型
        changeEriGata(){
            var target = document.querySelector(".suitmodel").contentDocument;
            if($(target).find("pattern#img1").attr('style')){
                $(target).find("pattern").not('#img1').attr('style', 'display: none;');
                $(target).find("pattern#img1").removeAttr('style');
            } else{
                $(target).find("pattern").not('#img2').attr('style', 'display: none;');
                $(target).find("pattern#img2").removeAttr('style');
            }
        },
        modalSvgLoad() {
            var target = document.querySelector(".suitmodel02").contentDocument;
            var tex = $(".simulator__preloader").find("img");
            $(target)
                .find("pattern")
                .not("#buttons")
                .find("image")
                .attr("xlink:href", tex[0].currentSrc)
                .attr("width", tex[0].naturalWidth)
                .attr("height", tex[0].naturalHeight);
            $(target)
                .find("pattern")
                .not("#buttons")
                .attr("width", tex[0].naturalWidth)
                .attr("height", tex[0].naturalHeight);
        },
        svgLoaded02() {
            this.svgLoaded();
            setTimeout(function () {
                $(".loadding_bl").removeClass("on");
            }, 300);
        },
        modalFullviewShow: function () {
            this.cloneData01 = $(".simu_price").html();
            $(".simu-modal-fullview").addClass("active");
        },
        modalFullviewHide: function () {
            $(".simu-modal-fullview").removeClass("active");
        },
        notfounder: function (e) {
            e.target.src = this.server_img_path + "notfounder.png";
        },
        completeOrderCheck: function () {
            if (this.completeOrder) {
                window.location.replace("/sample/test01/cart.html");
            } else {
                alert("選択されていない項目があります。ご確認ください。");
                return false;
            }
        },
    },
    watch: {
        model_path_change: function () {
            $(".loadding_bl").addClass("on");
        },
    },
    mounted() {
        this.defaultLoaded();
    },
    computed: {
        //main model path
        main_model_path: function () {
            var model_path_temp = "";
            var svg_path_temp = "";
            var shadow_path_temp = "";
            if (this.viewMode != "") {
                model_path_temp =
                    this.server_img_path +
                    "simulator/svg_shadow/" +
                    this.partNo_zentai +
                    "/torso.png";
                svg_path_temp =
                    this.server_img_path +
                    "simulator/svg_shadow/" +
                    this.partNo_zentai +
                    "/svg.svg";
                shadow_path_temp =
                    this.server_img_path +
                    "simulator/svg_shadow/" +
                    this.partNo_zentai +
                    "/shadow.png";
            } else {
                if (this.partNo != "") {
                    model_path_temp =
                        this.server_img_path +
                        "simulator/svg_shadow/" +
                        this.partNo +
                        "/torso.png";
                    svg_path_temp =
                        this.server_img_path +
                        "simulator/svg_shadow/" +
                        this.partNo +
                        "/svg.svg";
                    shadow_path_temp =
                        this.server_img_path +
                        "simulator/svg_shadow/" +
                        this.partNo +
                        "/shadow.png";
                } else {
                    //default or view mode all but no zentai img
                    model_path_temp =
                        this.server_img_path +
                        "simulator/model/" +
                        this.gender +
                        "/sample/torso.png";
                    svg_path_temp =
                        this.server_img_path +
                        "simulator/model/" +
                        this.gender +
                        "/sample/model.svg";
                    shadow_path_temp =
                        this.server_img_path +
                        "simulator/model/" +
                        this.gender +
                        "/sample/shadow.png";
                }
            }
            return {
                model_path: model_path_temp,
                svg_path: svg_path_temp,
                shadow_path: shadow_path_temp,
            };
        },
        model_path_change: function () {
            return this.main_model_path.model_path;
        },
        //option path
        option_main_path: function () {
            var option_main_src = "";
            if (this.viewMode != "") {
                option_main_src =
                    this.server_img_path +
                    "simulator/options/" +
                    this.partNo_zentai.split("_all")[0] +
                    "/";
            } else {
                if (this.partNo != "") {
                    option_main_src =
                        this.server_img_path +
                        "simulator/options/" +
                        this.partNo +
                        "/";
                } else {
                    option_main_src =
                        this.server_img_path + "simulator/options/" + "3/";
                }
            }
            return option_main_src;
        },
        option_target: function () {
            //step 3
            var option_target_temp = "";
            if (this.viewMode == "all" || this.partNo == "") {
                option_target_temp = "all";
            } else {
                option_target_temp = "up";
            }
            return option_target_temp;
        },
        buttons: function () {
            return "19";
        },
        flowers: function () {
            return "05";
        },
        option_button_path: function () {
            return (
                this.option_main_path +
                this.option_target +
                "/button/" +
                this.buttons +
                ".png"
            );
        },
        option_flower_path: function () {
            return (
                this.option_main_path +
                this.option_target +
                "/flower/" +
                this.flowers +
                ".png"
            );
        },
    },
};
</script>
