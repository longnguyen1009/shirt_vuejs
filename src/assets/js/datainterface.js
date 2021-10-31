function test2(){
  
var OneMeasureSDKParameters={
    appKey:'',//AppKey assigned to developers by TOZI Cloud
    appSecret:'',//AppSecret assigned to developers by TOZI Cloud
    taskId:null,

    userId:'userId',//String, User's id，defined by corporation
    name:"", //string, User's name
    gender:$("#userGender option:selected").val()==="male"?Gender.MALE:Gender.FEMALE, //User's gender：Gender.MALE、Gender.FEMALE
    height:Number($("#userHeight").val()),//Int,  User's height(cm)
    weight:Number($("#userWeight").val()),//Int, User's weight(kg)
    language:Language.ENGLISH,//Language.ENGLISH,//Language used by measurements showing（Be noticed that this parameter will not change
    //the language of your APP）：Language.ENGLISH（Default）、
    // Language.CHINESE（Simple Chinese）、Language.TRADITION_CHINESE（Traditional
    // Chinese）、Language.JAPANESE
    unit:Unit.METRIC, //Unit used by measurements showing：Unit.METRIC（cm/kg, Default), IUnit.IMPERIAL(inch/lbs)
    frontBitmap:'',//string, front pose image base64
    sideBitmap:'',//string, side pose image base64
    frontCameraAng:{//the camera angle when capture front pose image
        sensorFB:0,//int, get the front-back angle of your device;
        sensorLR:0//int, get the left-right angle of your device;
    },
    sideCameraAng:{//the camera angle when capture side pose image
        sensorFB:0,//int, get the front-back angle of your device;
        sensorLR:0//int, get the left-right angle of your device;
    },
    currentPose:Pose.FRONT,//the current pose while camera is opening: Pose.FRONT, Pose.Side
    profile2ModelData:[],//the result data from profileAPI after uploading images
};

//demo's function. loading demo
var tozLoadingDemo={
    start(){
        $("#tozLoadingDemo").remove();
        var loadingDiv='<div id="tozLoadingDemo" style="z-index: 100000;position: absolute;top:0;bottom:0;left:0;right:0;' +
            'background-color:rgba(0, 0, 0, 0.4);opacity: 1;display: flex;justify-content: center;align-items: center">Uploading </div>';
        $("body").append(loadingDiv);
    },
    end(){
        $("#tozLoadingDemo").remove();
    },
    success(){
        $("#tozLoadingDemo").remove();
        var loadingDiv='<div id="tozLoadingDemo" style="z-index: 100000;position: absolute;top:0;bottom:0;left:0;right:0;' +
            'background-color:rgba(255,255,255, 0.4);opacity: 1;display: flex;justify-content: center;align-items: center;color:greenyellow">Success </div>';
        $("body").append(loadingDiv);
        setTimeout(function () {
            $("#tozLoadingDemo").remove();
        },1000)
    }
};

//deal with events, such as failing to open camera or network connection timeout.
OneMeasureSDKLite.dealWithEvents=function(res){
    console.log(res);
    switch(res.statusCode){
        case 40001:
        case 40002:
        case 40003:
        case 40005:
        case 40008:
            $(".toz-container").hide();
            $(".toz-QRCode-container").show();
            break;
        default:
            break;
    }
    tozLoadingDemo.end();
    // alert(res.statusText);
};

//overwrite, on sensor ok
cameraView.setOnSensorListener.onSensorOk=function () {
    console.log('sensor ok');
    //control the vibration when sensor is ok.The inputting parameter is the continued time of vibration.
    cameraView.setOnSensorListener.startVibration(1);
    $("#captureImage").removeAttr("disabled");
};

//overwrite, on sensor error
cameraView.setOnSensorListener.onSensorError=function () {
    console.log('sensor error');
    //End the vibration when sensor is not ok.
    cameraView.setOnSensorListener.endVibration();
    $("#captureImage").attr("disabled","true");
};

//optional. set video style
cameraView.setVideoPosition=function() {
    var tozCameraVideo = document.getElementById('tozCameraVideo');
    var tozVideoContainer=document.getElementById('tozCameraView');
    var vH= tozCameraVideo.videoHeight;
    var vW=tozCameraVideo.videoWidth;
    var cH = tozVideoContainer.clientHeight;
    var cW = tozVideoContainer.clientWidth;

    if((vW*cH-vH*cW)<0) {
        var videoScale=vW/cW;
        var upMoveDistance=vH/videoScale-cH;
        $("#tozCameraVideo").css("height","").css("width",cW+"px");
        $("#tozCameraVideo").css("left","0px").css("top", (-upMoveDistance)+"px");
    }
    else if((vW*cH-vH*cW)>0) {
        var videoScale=vH/cH;
        var leftMoceDistance=(cW- (vW/videoScale))/2;
        $("#tozCameraVideo").css("width","").css("height",cH+"px");
        $("#tozCameraVideo").css("top","0px").css("left",leftMoceDistance+"px");
    }else{
        $("#tozCameraVideo").css("top","0px").css("left","0px");
    }
}

//optional. clip image by the video's position at parent container
function clipImage(jpeg,callback){
    var clipVideoX,clipVideoY,clipVideoW,clipVideoH;
    var tozCameraVideo = document.getElementById('tozCameraVideo');
    var tozVideoContainer=document.getElementById('tozCameraView');
    var vH= tozCameraVideo.videoHeight;
    var vW=tozCameraVideo.videoWidth;

    var cH = tozVideoContainer.clientHeight;
    var cW = tozVideoContainer.clientWidth;

    if((vW*cH-vH*cW)<0) {
        var scale=vW/cW;
        var upDist=vH/scale-cH;
        clipVideoX=0;
        clipVideoY=Math.floor(upDist*scale);
        clipVideoW=Math.floor(cW*scale);
        clipVideoH=Math.floor(cH*scale);
    }
    else if((vW*cH-vH*cW)>0) {
        var scale=vH/cH;
        var leftDist=(cW- (vW/scale))/2;
        clipVideoX=Math.floor(-leftDist*scale);
        clipVideoY=0;
        clipVideoW=Math.floor(cW*scale);
        clipVideoH=Math.floor(cH*scale);
    }else{
        clipVideoX=0;
        clipVideoY=0;
        clipVideoW=Math.floor(vW);
        clipVideoH=Math.floor(vH);
    }

    var img=new Image();
    img.onload=function () {
        var imgCanvas = document.createElement('canvas');
        imgCanvas.width = cW;
        imgCanvas.height = cH;
        imgCanvas.getContext('2d').drawImage(img,
            clipVideoX,clipVideoY, clipVideoW,clipVideoH,
            0, 0, imgCanvas.width, imgCanvas.height);

        callback(imgCanvas.toDataURL("image/jpeg"));
    }
    img.src=jpeg;
}

//optional. initial size list
function initialSizesList(measurementEntities) {
    $("#sizeTable").empty();
    for(var i=0;i<measurementEntities.length;i++){
        var iconHtml =
            "<tr  id='"+i+"'  class='toz-measure-cell'>"+
            "<td  class='toz-measure-icon'  >"+
            "<img src="+measurementEntities[i].imageUrl+ ">"+
            "</td>"+
            "<td >"+
            measurementEntities[i].sizeName
            +"</td>"+
            "<td>"+
            "<span>"+measurementEntities[i].meaValue+ measurementEntities[i].unit +"</span>"+
            "</td>"+
            "</tr>";
        $("#sizeTable").append(iconHtml);
    }
}

//demo's function. return interface view
function returnInterfaceView() {
    $(".toz-container").hide();
    $("#tozInterface").show();
}

//demo's function
$("#userGender").change(function () {
    OneMeasureSDKParameters.gender=$("#userGender option:selected").val()==="male"?Gender.MALE:Gender.FEMALE;//Int
});

//demo's function
$("#userHeight").change(function () {
    console.log("aaaaaaaaaa")
    OneMeasureSDKParameters.height= Number($("#userHeight").val());
});

//demo's function
$("#userWeight").change(function () {
    OneMeasureSDKParameters.weight= Number($("#userWeight").val());
});

//demo's function
$("#userName").change(function () {
    OneMeasureSDKParameters.name= $("#userName").val();
});

//demo's function
$("#userLanguage").change(function () {
    OneMeasureSDKParameters.language=$("#userLanguage option:selected").val();
});

//demo's function
$("#userUnit").change(function () {
    OneMeasureSDKParameters.unit=$("#userUnit option:selected").val();
});

//demo's function,click front button to open camera
$("#FrontCamera").on('click',function (e) {
    OneMeasureSDKParameters.currentPose=Pose.FRONT;
    $(".toz-container").hide();
    $("#tozCameraView").show();
    //check browser whether lack required sensors
    cameraView.lackRequiredSensors(function (lackSensors) {
        if(lackSensors){
            var tozWarning={
                'en-US':'Browser lack required sensor, please use devices with accelerometer to ensure getting precise result or enable Motion & Orientation Access at setting',
                'zh-HK':'您的設備不支持傳感器工作，請使用帶有重力傳感器的移動設備，以確保結果準確性,或在設置中開啟瀏覽器的傳感器權限',
                'ja-JP':'ブラウザに必要なセンサーがありません。正確な結果を得るために加速度センサー付きのデバイスを使用してください, または加速度センサーをONにする ',
                'zh-CN':'您的设备不支持传感器工作，请使用带有重力传感器的移动设备，以确保结果准确性,或在设置中开启浏览器的传感器权限'
            };
            alert(tozWarning[OneMeasureSDKParameters.language]);
        }else{
            cameraView.registerSensor();
        }
    });
    cameraView.onCreate();
});

//demo's function,click side button to open camera
$("#SideCamera").on('click',function (e) {
    OneMeasureSDKParameters.currentPose=Pose.SIDE;
    $(".toz-container").hide();
    $("#tozCameraView").show();
    cameraView.registerSensor();
    cameraView.onCreate();
});

//demo's function,caputure image
$("#captureImage").click(function () {
    function onImage(jpeg) {
        var sensorAngle=cameraView.setOnSensorListener.onSensorAngle();
        if(OneMeasureSDKParameters.currentPose==Pose.FRONT){ //If the pose is front, save these data in frontCameraAng and frontBitmap.
            OneMeasureSDKParameters.frontCameraAng=sensorAngle;
            // OneMeasureSDKParameters.frontBitmap= jpeg;
            // $("#frontThumbnail").attr("src",OneMeasureSDKParameters.frontBitmap);

            //Optional, clipping image by the video's position at parent container
            clipImage(jpeg,function (clipJpeg) {
                OneMeasureSDKParameters.frontBitmap= clipJpeg;
                $("#frontThumbnail").attr("src",OneMeasureSDKParameters.frontBitmap);
            });
        }else  if(OneMeasureSDKParameters.currentPose==Pose.SIDE){//If the pose is side, save these data in sideCameraAng and sideBitmap.
            OneMeasureSDKParameters.sideCameraAng=sensorAngle;
            // OneMeasureSDKParameters.sideBitmap= jpeg;
            // $("#sideThumbnail").attr("src",OneMeasureSDKParameters.sideBitmap);

            //Optional, clipping image by the video's position at parent container
            clipImage(jpeg,function (clipJpeg) {
                OneMeasureSDKParameters.sideBitmap= clipJpeg;
                $("#sideThumbnail").attr("src",OneMeasureSDKParameters.sideBitmap);
            });
        }
    }
    cameraView.captureImage(onImage);
    cameraView.onStop();
    cameraView.unregisterSensor();
    $(".toz-container").hide();
    $("#tozInterface").show();
});

//demo's function,close camera
$("#closeCamera").click(function () {
    cameraView.unregisterSensor();
    cameraView.onStop();
    $(".toz-container").hide();
    $("#tozInterface").show();
});

//demo's function,switch camera, change front camera to rear camera, or change rear camera to front camera
$("#switchCamera").click(function(){
    cameraView.toggleFacing();
    cameraView.onResume();
});

//demo's function,get Front image from Gallery
$("#getLocalFrontImage").click(function () {
    function onActivityResult(jpeg){
        OneMeasureSDKParameters.frontCameraAng={
            sensorFB:0,
            sensorLR:0
        };
        OneMeasureSDKParameters.frontBitmap=  jpeg;
        cameraView.rotateImage(jpeg,function (base64) {
            $("#frontThumbnail").attr("src",base64);
        });
    };
    cameraView.openGalleryFromActivity(onActivityResult);
});

//demo's function, get side image from Gallery
$("#getLocalSideImage").click(function () {
    function onActivityResult(jpeg){
        OneMeasureSDKParameters.sideCameraAng={
            sensorFB:0,
            sensorLR:0
        };
        OneMeasureSDKParameters.sideBitmap=jpeg;
        cameraView.rotateImage(jpeg,function (base64) {
            $("#sideThumbnail").attr("src",base64);
        });
    };
    cameraView.openGalleryFromActivity(onActivityResult);
});

//demo's function, upload front picture
$("#uploadFrontImg").click(function () {
    OneMeasureSDKParameters.gender=$("#userGender option:selected").val()==="male"?Gender.MALE:Gender.FEMALE;//Int

    OneMeasureSDKParameters.height= Number($("#userHeight").val());

    OneMeasureSDKParameters.weight= Number($("#userWeight").val());

    OneMeasureSDKParameters.name= $("#userName").val();

    OneMeasureSDKParameters.language=$("#userLanguage option:selected").val();

    OneMeasureSDKParameters.unit=$("#userUnit option:selected").val();

    function callback(result){
        console.log(result);
        tozLoadingDemo.end();
        if(result.sdkResponse.serverStatusCode==='0'){
            if(result.processData.imageProcessFeedback.frontImageErrors.content.length>0){
                var errorsAlert='';
                for(var i=0;i<result.processData.imageProcessFeedback.frontImageErrors.content.length;i++){
                    errorsAlert+=result.processData.imageProcessFeedback.frontImageErrors.content[i];
                }
                alert(errorsAlert);
            }else{
                OneMeasureSDKParameters.taskId=result.taskId;
                tozLoadingDemo.success();
            }

        }else{
            alert(result.sdkResponse.serverStatusCode+" "+result.sdkResponse.serverStatusText);
        }
    }

    tozLoadingDemo.start();
    //Before uploading, Please check Inputting Parameters: OneMeasureSDKParameters, bitmap, photoType, cameraAngle, taskId*,callback
    if((!OneMeasureSDKParameters.height)||(!OneMeasureSDKParameters.weight)||OneMeasureSDKParameters.frontBitmap===''){
        alert("Please check inputting parameters");
        tozLoadingDemo.end();
        return;
    }
    OneMeasureSDKLite.processImage(OneMeasureSDKParameters,OneMeasureSDKParameters.frontBitmap,PhotoType.FRONT,OneMeasureSDKParameters.frontCameraAng,OneMeasureSDKParameters.taskId, callback);
});

//demo's function, upload side picture
$("#uploadSideImg").click(function () {
    function callback(result){
        tozLoadingDemo.end();
        console.log(result);
        if(result.sdkResponse.serverStatusCode==='0'){
            if(result.processData.imageProcessFeedback.sideImageErrors.content.length>0){
                var errorsAlert='';
                for(var i=0;i<result.processData.imageProcessFeedback.sideImageErrors.content.length;i++){
                    errorsAlert+=result.processData.imageProcessFeedback.sideImageErrors.content[i];
                }
                alert(errorsAlert);
            }
            else{
                tozLoadingDemo.success();
            }
        }else{
            alert(result.sdkResponse.serverStatusCode+" "+result.sdkResponse.serverStatusText);
        }
    }

    tozLoadingDemo.start();
    //Inputting Parameters: OneMeasureSDKParameters, bitmap, photoType, cameraAngle, taskId*,callback
    if((!OneMeasureSDKParameters.height)||(!OneMeasureSDKParameters.weight)||OneMeasureSDKParameters.sideBitmap===''){
        alert("Please check inputting parameters");
        tozLoadingDemo.end();
        return;
    }
    OneMeasureSDKLite.processImage(OneMeasureSDKParameters,OneMeasureSDKParameters.sideBitmap,PhotoType.SIDE,OneMeasureSDKParameters.sideCameraAng,OneMeasureSDKParameters.taskId, callback);
});

//demo's function, get image profile
$("#getImagesProfile").click(function () {
    function callback(res){
        tozLoadingDemo.end();
        console.log(res);
        if(res.sdkResponse.serverStatusCode!="0") {
            alert(res.sdkResponse.serverStatusCode+":"+res.sdkResponse.serverStatusText);
        }else {
            OneMeasureSDKParameters.profile2ModelData=res.profile2ModelData;
            if(res.sdkResponse.serverStatusCode==="0"){
                $(".toz-container").hide();
                $("#tozPhotoView").css("z-index",10000);
                $("#tozPhotoView").show();
                $("#tozFrontPhoto").attr("src",res.profile2ModelData.frontProcessedBitmap);
                $("#tozSidePhoto").attr("src",res.profile2ModelData.sideProcessedBitmap);

                //Make sure that profile2ModelData is not occupied
                setTimeout(function () {
                    $("#tozAdjustView").css("z-index",0);
                    $("#tozAdjustView").show();
                    editOutlineView.initialize(res.profile2ModelData,true,true);//(profile2ModelData,coverFace,openMagnifier)
                },500)
            }else{//Error: failed to process image, please check detailed error message at profile2ModelData.ErrInfo
                console.log(res.sdkResponse.serverStatusText);
                alert(res.sdkResponse.serverStatusText);
            }
        }
    }

    tozLoadingDemo.start();
    OneMeasureSDKLite.getProfile(OneMeasureSDKParameters.taskId, callback);
});

//demo's function, get measurements after uploading images
$("#getMeasurementsByImg").click(function () {
    function callback(result) {
        tozLoadingDemo.end();
        console.log(result);
        if(result.sdkResponse.serverStatusCode==='0'){
            initialSizesList(result.measurementsData.measurementEntities);
            $(".toz-container").hide();
            $("#tozSizesList").show();
        }
        else{
            alert(result.sdkResponse.serverStatusCode+":"+result.sdkResponse.serverStatusText);
        }
    };

    tozLoadingDemo.start();
    OneMeasureSDKLite.getMeasurements(OneMeasureSDKParameters,OneMeasureSDKParameters.taskId, callback);
});

//demo's function, get measurements by uploading profile
$("#getMeasurementsByProfile").click(function () {
    function callback(result) {
        console.log(result);
        tozLoadingDemo.end();
        if(result.sdkResponse.serverStatusCode==='0'){
            initialSizesList(result.measurementsData.measurementEntities);
            $(".toz-container").hide();
            $("#tozSizesList").show();
        }
        else{
            alert(result.sdkResponse.serverStatusCode+":"+result.sdkResponse.serverStatusText);
        }
    };

    tozLoadingDemo.start();
    OneMeasureSDKLite.getMeasurementsByProfile(OneMeasureSDKParameters,OneMeasureSDKParameters.profile2ModelData, callback);
});

//demo's function, get measurements after uploading images
$("#getMeasurementsByTaskId").click(function () {
    function callback(result) {
        tozLoadingDemo.end();
        console.log(result);
        if(result.sdkResponse.serverStatusCode==='0'){
            initialSizesList(result.measurementsData.measurementEntities);
            $(".toz-container").hide();
            $("#tozSizesList").show();
        }
        else{
            alert(result.sdkResponse.serverStatusCode+":"+result.sdkResponse.serverStatusText);
        }
    };

    tozLoadingDemo.start();
    OneMeasureSDKLite.getMeasurementsByTask(OneMeasureSDKParameters.taskId, callback);
});

//demo's function, click front photo to adjust front-pose outline
$("#tozFrontPhoto").click(function () {
    //show adjustment view and hide photo view
    $("#tozPhotoView").css("z-index",0);
    $("#tozAdjustView").css("z-index",10000);

    //show front-pose contour lines and hide side-pose one
    $("#tozAdjustingFront").css("z-index",10);
    $("#tozAdjustingSide").css("z-index",-10);
});

//demo's function, click side photo to adjust side-pose outline
$("#tozSidePhoto").click(function () {
    //show adjustment view and hide photo view
    $("#tozPhotoView").css("z-index",0);
    $("#tozAdjustView").css("z-index",10000);

    //show side-pose contour lines and hide front-pose one
    $("#tozAdjustingFront").css("z-index",-10);
    $("#tozAdjustingSide").css("z-index",10);
});

//demo's function, return photo view
$(".toz-draw-outline-to-photo-view").click(function () {
    editOutlineView.getSavedProfile2ModelData(OneMeasureSDKParameters.profile2ModelData);
    $("#tozAdjustView").css("z-index",0);
    $("#tozPhotoView").css("z-index",10000);
});

//optional. stop browser zoom or default event
document.getElementById("tozAdjustView").addEventListener('touchmove', function(e) {
    e.preventDefault();
}, {passive:false});

//optional. detect device whether keep in portrait screen orientation mode
// window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
//     // if (window.orientation === 180 || window.orientation === 0) {}
//     if (window.orientation === 90 || window.orientation === -90 ){
//         var tozWarning={
//             'en-US':'Device must be in portrait screen orientation mode',
//             'zh-HK':'請保持手機豎直',
//             'ja-JP':'端末は縦長の画面方向モードにする必要があります',
//             'zh-CN':'请保持手机竖直'
//         }
//         alert(tozWarning[OneMeasureSDKParameters.language]);
//     }
// }, false);

//optional, get the list of  cameras' deviceId
$("#GetCamList").click(function () {
    cameraView.getCameraList(function (devices) {
        console.log(devices);

        $("#cameraListContainer").empty();

        var selectHtml="<select id='cameraList'>" ;
        for(var i = 0; i < devices.length; i ++){
            var device = devices[i];
            selectHtml+="<option id='"+device.deviceId+"' value='"+device.deviceId+"'>"+i+"</option>" ;
        };
        selectHtml+="</select>";
        $("#cameraListContainer").append(selectHtml);
    });
});

//optional, open camera by device id
$("#FrontByDeviceId").click(function () {
    OneMeasureSDKParameters.currentPose=Pose.FRONT;
    $(".toz-container").hide();
    $("#tozCameraView").show();
    //check browser whether lack required sensors
    cameraView.lackRequiredSensors(function (lackSensors) {
        if(lackSensors){
            var tozWarning={
                'en-US':'Browser lack required sensor, please use devices with accelerometer to ensure getting precise result or enable Motion & Orientation Access at setting',
                'zh-HK':'您的設備不支持傳感器工作，請使用帶有重力傳感器的移動設備，以確保結果準確性,或在設置中開啟瀏覽器的傳感器權限',
                'ja-JP':'ブラウザに必要なセンサーがありません。正確な結果を得るために加速度センサー付きのデバイスを使用してください, または加速度センサーをONにする ',
                'zh-CN':'您的设备不支持传感器工作，请使用带有重力传感器的移动设备，以确保结果准确性,或在设置中开启浏览器的传感器权限'
            };
            alert(tozWarning[OneMeasureSDKParameters.language]);
        }else{
            cameraView.registerSensor();
        }
    });
    cameraView.setCameraById($("#cameraList option:selected").val());
});

//optional, open camera by device id
$("#SideByDeviceId").click(function () {
    OneMeasureSDKParameters.currentPose=Pose.SIDE;
    $(".toz-container").hide();
    $("#tozCameraView").show();
    cameraView.registerSensor();
    cameraView.setCameraById($("#cameraList option:selected").val());
});

}

export default test2;