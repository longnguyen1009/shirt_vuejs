function test(){

var a9_0x246e = [
  "index",
  "getStream",
  "resolutionGetFail",
  "checkList",
  "width",
  "height",
  "mediaDevices",
  "getUserMedia",
  "getStreamSuccess",
  "catch",
  "streamInfo",
  "tozCameraId",
  "srcObject",
  "src",
  "URL",
  "createObjectURL",
  "stream",
  "onloadedmetadata",
  "selected",
  "videoWidth",
  "getVideoTracks",
  "forEach",
  "stop",
  "max",
  "min",
  "JS40005",
  "name",
  "NotAllowedError",
  "JS40006",
  "getUserMediaSecFail",
  "SecurityError",
  "JS40007",
  "remove",
  "<form\x20id=\x22inputImgFormGalleryForm\x22\x20style=\x22display:\x20none;\x22\x20><input\x20\x20\x20id=\x22InputImgFormGallery\x22\x20\x20type=\x22file\x22\x20></form>",
  "InputImgFormGallery",
  "change",
  "getImgBase64WithoutCanvas",
  "inputImgFormGalleryForm",
  "click",
  "#inputImgFormGalleryForm",
  "files",
  "onload",
  "target",
  "result",
  "readAsDataURL",
  "JS40008",
  "videoHeight",
  "loopCount",
  "loopMaxNum",
  "setVideoPosition",
  "play",
  "createElement",
  "canvas",
  "drawImage",
  "toDataURL",
  "image/jpeg",
  "enabled",
  "pause",
  "kind",
  "push",
  "enumerateDevices",
  "log",
  "userAgent",
  "toLowerCase",
  "match",
  "chrome",
  "opera",
  "safari",
  "split",
  "body",
  "trigger",
  "_Events",
  "language",
  "JS40002",
  "firefox",
  "JS40003",
  "JS40001",
  "deviceFrequency",
  "_currentSensorFB",
  "_currentSensorLR",
  "vibrateState",
  "listenerHandler",
  "prototype",
  "vibrate",
  "webkitVibrate",
  "devicemotion",
  "removeEventListener",
  "DeviceMotionEvent",
  "addEventListener",
  "requestPermission",
  "then",
  "granted",
  "deviceMotionHandler",
  "bind",
  "JS40004",
  "accelerationIncludingGravity",
  "test",
  "interval",
  "abs",
  "onSensorOk",
  "cameraState",
  "user",
  "environment",
  "resolution",
  "tozCameraVideo",
  "getElementById",
  "initState",
  "length",
  "checkIndex",
  "resolutionSearch",
  "constraints",
  "facingMode",
  "exact",
];
(function(_0x363515, _0xdc3184) {
  var _0x1c83e5 = function(_0x3c4bb9) {
    while (--_0x3c4bb9) {
      _0x363515["push"](_0x363515["shift"]());
    }
  };
  _0x1c83e5(++_0xdc3184);
})(a9_0x246e, 0x191);
var a9_0x3fee = function(_0x1a12f9, _0x4d0b33) {
  _0x1a12f9 = _0x1a12f9 - 0x0;
  var _0x218cec = a9_0x246e[_0x1a12f9];
  return _0x218cec;
};
("use strict"); //针对浏览器低版本进行提示
function BrowserVersionWarning() {
  try {
    var _0x4e3af5 = {};
    var _0x3f85e5 = navigator[a9_0x3fee("0x0")][a9_0x3fee("0x1")]();
    var _0x2614c7;
    (_0x2614c7 = _0x3f85e5["match"](/msie ([\d.]+)/))
      ? (_0x4e3af5["ie"] = _0x2614c7[0x1])
      : (_0x2614c7 = _0x3f85e5[a9_0x3fee("0x2")](/firefox\/([\d.]+)/))
      ? (_0x4e3af5["firefox"] = _0x2614c7[0x1])
      : (_0x2614c7 = _0x3f85e5[a9_0x3fee("0x2")](/chrome\/([\d.]+)/))
      ? (_0x4e3af5[a9_0x3fee("0x3")] = _0x2614c7[0x1])
      : (_0x2614c7 = _0x3f85e5[a9_0x3fee("0x2")](/opera.([\d.]+)/))
      ? (_0x4e3af5[a9_0x3fee("0x4")] = _0x2614c7[0x1])
      : (_0x2614c7 = _0x3f85e5["match"](/version\/([\d.]+).*safari/))
      ? (_0x4e3af5[a9_0x3fee("0x5")] = _0x2614c7[0x1])
      : 0x0;
    if (_0x4e3af5["chrome"]) {
      var _0x2e6f44 = _0x4e3af5[a9_0x3fee("0x3")][a9_0x3fee("0x6")](".");
      if (Number(_0x2e6f44[0x0]) <= 0x34) {
        $(a9_0x3fee("0x7"))[a9_0x3fee("0x8")](a9_0x3fee("0x9"), [
          {
            statusCode: 0x9c42,
            statusText:
              tozEventsLang[OneMeasureSDKParameters[a9_0x3fee("0xa")]][
                a9_0x3fee("0xb")
              ],
          },
        ]);
      }
    } else if (_0x4e3af5[a9_0x3fee("0xc")]) {
      var _0x30e578 = _0x4e3af5[a9_0x3fee("0xc")][a9_0x3fee("0x6")](".");
      if (Number(_0x30e578[0x0]) <= 0x23) {
        $("body")[a9_0x3fee("0x8")](a9_0x3fee("0x9"), [
          {
            statusCode: 0x9c42,
            statusText:
              tozEventsLang[OneMeasureSDKParameters[a9_0x3fee("0xa")]][
                a9_0x3fee("0xb")
              ],
          },
        ]);
      }
    } else if (_0x4e3af5["opera"]) {
      var _0x3413d1 = _0x4e3af5[a9_0x3fee("0x4")][a9_0x3fee("0x6")](".");
      if (Number(_0x3413d1[0x0]) <= 0x27) {
        $(a9_0x3fee("0x7"))[a9_0x3fee("0x8")]("_Events", [
          {
            statusCode: 0x9c42,
            statusText:
              tozEventsLang[OneMeasureSDKParameters[a9_0x3fee("0xa")]][
                a9_0x3fee("0xb")
              ],
          },
        ]);
      }
    } else if (_0x4e3af5["ie"]) {
      var _0x3413d1 = _0x4e3af5["ie"][a9_0x3fee("0x6")](".");
      $(a9_0x3fee("0x7"))[a9_0x3fee("0x8")](a9_0x3fee("0x9"), [
        {
          statusCode: 0x9c43,
          statusText:
            tozEventsLang[OneMeasureSDKParameters[a9_0x3fee("0xa")]][
              a9_0x3fee("0xd")
            ],
        },
      ]);
    } else if (_0x4e3af5[a9_0x3fee("0x5")]) {
      var _0x3413d1 = _0x4e3af5[a9_0x3fee("0x5")][a9_0x3fee("0x6")](".");
      if (Number(_0x3413d1[0x0]) <= 0xb && Number(_0x3413d1[0x1]) < 0x2) {
        $(a9_0x3fee("0x7"))[a9_0x3fee("0x8")](a9_0x3fee("0x9"), [
          {
            statusCode: 0x9c41,
            statusText:
              tozEventsLang[OneMeasureSDKParameters[a9_0x3fee("0xa")]][
                a9_0x3fee("0xe")
              ],
          },
        ]);
      }
    }
  } catch (_0x16bff4) {}
}
var tozSensorListener = function() {
  this[a9_0x3fee("0xf")] = 0x0;
  this[a9_0x3fee("0x10")] = 0x0;
  this[a9_0x3fee("0x11")] = 0x0;
  this[a9_0x3fee("0x12")] = ![];
  this[a9_0x3fee("0x13")] = null;
};
tozSensorListener[a9_0x3fee("0x14")] = {
  onSensorAngle: function() {
    var _0x4867c1 = this;
    return {
      sensorFB: _0x4867c1[a9_0x3fee("0x10")],
      sensorLR: _0x4867c1["_currentSensorLR"],
    };
  },
  startVibration: function(_0x1fbe33) {
    var _0x529921 = this;
    try {
      if (_0x529921[a9_0x3fee("0x12")] === ![]) {
        _0x529921["vibrateState"] = !![];
        if (navigator[a9_0x3fee("0x15")]) {
          navigator["vibrate"](_0x1fbe33 ? _0x1fbe33 : 0x1);
        } else if (navigator[a9_0x3fee("0x16")]) {
          navigator[a9_0x3fee("0x16")](_0x1fbe33 ? _0x1fbe33 : 0x1);
        }
      }
    } catch (_0x4b8099) {}
  },
  endVibration: function() {
    var _0x5c468b = this;
    _0x5c468b[a9_0x3fee("0x12")] = ![];
  },
  lackRequiredSensors: function(_0x5d1dfc) {
    var _0x1f0610 = -0x1;
    function _0x1c6c8f() {
      _0x1f0610 = 0x1;
      _0x5d1dfc(!![]);
    }
    function _0x1dd154() {
      _0x1f0610 = 0x0;
      _0x5d1dfc(![]);
    }
    function _0x3ea530(_0x441837) {
      _0x3d491e(_0x441837);
    }
    function _0x3d491e(_0x24bc6a) {
      var _0x58619f = _0x24bc6a["accelerationIncludingGravity"];
      if (
        !_0x58619f["x"] ||
        _0x58619f["x"] === null ||
        _0x58619f["x"] === undefined
      ) {
        window["removeEventListener"](a9_0x3fee("0x17"), _0x3ea530, ![]);
        _0x1c6c8f();
      } else {
        window[a9_0x3fee("0x18")](a9_0x3fee("0x17"), _0x3ea530, ![]);
        _0x1dd154();
      }
    }
    function _0x39d675() {
      if (window[a9_0x3fee("0x19")]) {
        try {
          window[a9_0x3fee("0x1a")](a9_0x3fee("0x17"), _0x3ea530, ![]);
        } catch (_0x202f91) {
          _0x1c6c8f();
        }
      } else {
        _0x1c6c8f();
      }
    }
    function _0x2fc145() {
      try {
        DeviceOrientationEvent[a9_0x3fee("0x1b")]()[a9_0x3fee("0x1c")](
          (_0x5ed3df) => {
            if (_0x5ed3df == a9_0x3fee("0x1d")) {
              _0x39d675();
            } else {
              _0x1c6c8f();
            }
          }
        );
      } catch (_0x5df4e7) {
        _0x39d675();
        if (_0x1f0610 === -0x1) {
          setTimeout(function() {
            if (_0x1f0610 === -0x1) {
              _0x1c6c8f();
            }
          }, 0x1f4);
        }
      }
    }
    _0x2fc145();
  },
  registerSensor: function() {
    var _0x57dd1e = this;
    if (window[a9_0x3fee("0x19")]) {
      _0x57dd1e[a9_0x3fee("0x13")] = _0x57dd1e[a9_0x3fee("0x1e")][
        a9_0x3fee("0x1f")
      ](_0x57dd1e);
      try {
        DeviceOrientationEvent[a9_0x3fee("0x1b")]()[a9_0x3fee("0x1c")](
          (_0xfeb33d) => {
            if (_0xfeb33d == a9_0x3fee("0x1d")) {
              window["addEventListener"](
                "devicemotion",
                _0x57dd1e[a9_0x3fee("0x13")],
                ![]
              );
            } else {
              $(a9_0x3fee("0x7"))["trigger"](a9_0x3fee("0x9"), [
                {
                  statusCode: 0x9c44,
                  statusText:
                    tozEventsLang[OneMeasureSDKParameters["language"]][
                      a9_0x3fee("0x20")
                    ],
                },
              ]);
            }
          }
        );
      } catch (_0x5a4219) {
        window[a9_0x3fee("0x1a")](
          a9_0x3fee("0x17"),
          _0x57dd1e[a9_0x3fee("0x13")],
          ![]
        );
      }
    } else {
      $("body")[a9_0x3fee("0x8")](a9_0x3fee("0x9"), [
        {
          statusCode: 0x9c44,
          statusText:
            tozEventsLang[OneMeasureSDKParameters[a9_0x3fee("0xa")]][
              a9_0x3fee("0x20")
            ],
        },
      ]);
    }
  },
  unregisterSensor: function() {
    var _0x188bf4 = this;
    window["removeEventListener"](
      "devicemotion",
      _0x188bf4["listenerHandler"],
      ![]
    );
  },
  deviceMotionHandler: function(_0x39ab28) {
    var _0xe3dab5 = navigator[a9_0x3fee("0x0")][a9_0x3fee("0x1")]();
    var _0x41b952 = this;
    var _0x110479 = _0x39ab28[a9_0x3fee("0x21")];
    _0x41b952[a9_0x3fee("0x10")] = _0x110479["z"]
      ? (_0x110479["z"] / 9.81) * 0x5a
      : 0x0;
    _0x41b952[a9_0x3fee("0x11")] = _0x110479["x"]
      ? (_0x110479["x"] / 9.81) * 0x5a
      : 0x0;
    var _0xa1026 = 0x1e;
    if (/iphone|ipad|ipod|mac/[a9_0x3fee("0x22")](_0xe3dab5)) {
      _0xa1026 = parseInt(0x1 / _0x39ab28[a9_0x3fee("0x23")] / 0x1e);
    } else if (/android/[a9_0x3fee("0x22")](_0xe3dab5)) {
      _0xa1026 = parseInt(0x1 / (_0x39ab28[a9_0x3fee("0x23")] * 0.001) / 0x1e);
    } else {
      _0xa1026 = parseInt(0x1 / (_0x39ab28[a9_0x3fee("0x23")] * 0.001) / 0x1e);
    }
    if (_0xa1026 > 0x32) {
      _0xa1026 = 0x32;
    }
    if (_0x41b952[a9_0x3fee("0xf")] < _0xa1026) {
      _0x41b952["deviceFrequency"]++;
    } else if (_0x41b952[a9_0x3fee("0xf")] >= _0xa1026) {
      _0x41b952["deviceFrequency"] = 0x0;
      if (
        (Math[a9_0x3fee("0x24")](_0x110479["z"]) <= 0.763 &&
          Math[a9_0x3fee("0x24")](_0x110479["x"]) < 0.545 &&
          Math[a9_0x3fee("0x24")](_0x110479["y"]) <= 10.791 &&
          Math[a9_0x3fee("0x24")](_0x110479["y"]) >= 8.829) ||
        _0x110479["x"] === null ||
        _0x110479["x"] === undefined
      ) {
        setOnSensorListener[a9_0x3fee("0x25")]();
      } else {
        setOnSensorListener["onSensorError"]();
      }
    }
  },
};
var tozSensorListener = new tozSensorListener();
var _camera_that;
var tozCameraView = function() {
  _camera_that = this;
  this[a9_0x3fee("0x26")] = {
    constraints: {
      audio: ![],
      video: {
        facingMode: "environment",
        width: { min: 0x500 },
        height: { min: 0x2d0 },
      },
    },
    initState: ![],
    facingMode: { exact: [a9_0x3fee("0x27"), a9_0x3fee("0x28")], index: 0x1 },
  };
  this[a9_0x3fee("0x29")] = {
    max: { height: 0x780, width: 0x500 },
    min: { height: 0x258, width: 0x12c },
    selected: { height: 0x0, width: 0x0 },
    checkList: [
      { width: 0xa0, height: 0x78 },
      { width: 0x140, height: 0xb4 },
      { width: 0x140, height: 0xf0 },
      { width: 0x280, height: 0x168 },
      { width: 0x280, height: 0x1e0 },
      { width: 0x300, height: 0x240 },
      { width: 0x400, height: 0x240 },
      { width: 0x500, height: 0x2d0 },
    ],
    checkIndex: 0x7,
  };
  this["streamInfo"] = {
    tozCameraId: a9_0x3fee("0x2a"),
    tozCameraVideo: document[a9_0x3fee("0x2b")]("tozCameraVideo"),
    stream: null,
    loopMaxNum: 0xa,
    loopCount: 0x0,
  };
};
tozCameraView[a9_0x3fee("0x14")] = {
  openCamera: function() {
    if (!_camera_that["cameraState"][a9_0x3fee("0x2c")]) {
      _camera_that["getCameraList"](function(_0x2f878f) {
        if (_0x2f878f[a9_0x3fee("0x2d")] > 0x0) {
          _camera_that["resolution"][a9_0x3fee("0x2e")] =
            _camera_that[a9_0x3fee("0x29")]["checkList"][a9_0x3fee("0x2d")] -
            0x1;
          _camera_that[a9_0x3fee("0x2f")]();
        } else {
          _camera_that[a9_0x3fee("0x26")][a9_0x3fee("0x30")] = {
            audio: ![],
            video: {
              facingMode:
                _camera_that["cameraState"][a9_0x3fee("0x31")][
                  a9_0x3fee("0x32")
                ][
                  _camera_that["cameraState"][a9_0x3fee("0x31")][
                    a9_0x3fee("0x33")
                  ]
                ],
            },
          };
          _camera_that[a9_0x3fee("0x34")]();
        }
      });
    } else {
      _camera_that[a9_0x3fee("0x34")]();
    }
  },
  resolutionSearch: function(_0x4df2b5) {
    if (_camera_that[a9_0x3fee("0x29")]["checkIndex"] < 0x0) {
      _camera_that[a9_0x3fee("0x35")]();
      return;
    }
    if (_0x4df2b5) {
      _camera_that[a9_0x3fee("0x26")][a9_0x3fee("0x30")] = {
        audio: ![],
        video: {
          deviceId: { exact: _0x4df2b5 },
          width: {
            min:
              _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x36")][
                _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x2e")]
              ][a9_0x3fee("0x37")],
          },
          height: {
            min:
              _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x36")][
                _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x2e")]
              ][a9_0x3fee("0x38")],
          },
        },
      };
    } else {
      _camera_that["cameraState"][a9_0x3fee("0x30")] = {
        audio: ![],
        video: {
          facingMode:
            _camera_that[a9_0x3fee("0x26")][a9_0x3fee("0x31")]["exact"][
              _camera_that[a9_0x3fee("0x26")][a9_0x3fee("0x31")][
                a9_0x3fee("0x33")
              ]
            ],
          width: {
            min:
              _camera_that["resolution"][a9_0x3fee("0x36")][
                _camera_that["resolution"][a9_0x3fee("0x2e")]
              ][a9_0x3fee("0x37")],
          },
          height: {
            min:
              _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x36")][
                _camera_that["resolution"]["checkIndex"]
              ][a9_0x3fee("0x38")],
          },
        },
      };
    }
    if (navigator["mediaDevices"] === undefined) {
      navigator[a9_0x3fee("0x39")] = {};
    }
    navigator[a9_0x3fee("0x39")]
      [a9_0x3fee("0x3a")](_camera_that[a9_0x3fee("0x26")]["constraints"])
      [a9_0x3fee("0x1c")](_camera_that[a9_0x3fee("0x3b")])
      [a9_0x3fee("0x3c")](function(_0x4ff9a1) {
        _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x2e")]--;
        _camera_that[a9_0x3fee("0x2f")](_0x4df2b5);
      });
  },
  resolutionGetSuccess: function(_0x566f7c) {
    _camera_that[a9_0x3fee("0x3d")][a9_0x3fee("0x2a")] = document[
      "getElementById"
    ](_camera_that[a9_0x3fee("0x3d")][a9_0x3fee("0x3e")]);
    if (
      a9_0x3fee("0x3f") in _camera_that[a9_0x3fee("0x3d")][a9_0x3fee("0x2a")]
    ) {
      _camera_that[a9_0x3fee("0x3d")][a9_0x3fee("0x2a")][
        "srcObject"
      ] = _0x566f7c;
    } else {
      _camera_that[a9_0x3fee("0x3d")][a9_0x3fee("0x2a")][
        a9_0x3fee("0x40")
      ] = window[a9_0x3fee("0x41")][a9_0x3fee("0x42")](_0x566f7c);
    }
    _camera_that["streamInfo"][a9_0x3fee("0x43")] = _0x566f7c;
    _camera_that[a9_0x3fee("0x3d")][a9_0x3fee("0x2a")][
      a9_0x3fee("0x44")
    ] = function(_0x2609be) {
      var _0x2347a8 = this;
      _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x45")][a9_0x3fee("0x37")] =
        _0x2347a8[a9_0x3fee("0x46")];
      _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x45")][a9_0x3fee("0x38")] =
        _0x2347a8["videoHeight"];
      _0x566f7c[a9_0x3fee("0x47")]()[a9_0x3fee("0x48")](function(_0x4c37ab) {
        _0x4c37ab[a9_0x3fee("0x49")]();
      });
      if (
        _camera_that[a9_0x3fee("0x29")]["selected"][a9_0x3fee("0x38")] >
          _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x4a")][
            a9_0x3fee("0x38")
          ] ||
        _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x45")][a9_0x3fee("0x37")] >
          _camera_that[a9_0x3fee("0x29")]["max"]["width"]
      ) {
        _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x2e")]--;
        _camera_that["resolutionSearch"]();
        return;
      }
      if (
        _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x45")][a9_0x3fee("0x38")] <
          _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x4b")][
            a9_0x3fee("0x38")
          ] ||
        _camera_that["resolution"]["selected"]["width"] <
          _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x4b")][a9_0x3fee("0x37")]
      ) {
        $(a9_0x3fee("0x7"))[a9_0x3fee("0x8")]("_Events", [
          {
            statusCode: 0x9c45,
            statusText:
              tozEventsLang[OneMeasureSDKParameters[a9_0x3fee("0xa")]][
                a9_0x3fee("0x4c")
              ],
          },
        ]);
        return;
      }
      _camera_that[a9_0x3fee("0x26")][a9_0x3fee("0x2c")] = !![];
      _camera_that[a9_0x3fee("0x34")]();
    };
  },
  resolutionGetFail: function() {
    _camera_that[a9_0x3fee("0x26")]["initState"] = !![];
    _camera_that[a9_0x3fee("0x26")]["constraints"] = {
      audio: ![],
      video: {
        facingMode:
          _camera_that["cameraState"][a9_0x3fee("0x31")][a9_0x3fee("0x32")][
            _camera_that[a9_0x3fee("0x26")][a9_0x3fee("0x31")][
              a9_0x3fee("0x33")
            ]
          ],
      },
    };
    _camera_that["getStream"]();
  },
  getUserMediaFirFail: function(_0x54ba71, _0x2f192f) {
    if (
      _0x54ba71["name"] === "PermissionDeniedError" ||
      _0x54ba71[a9_0x3fee("0x4d")] === a9_0x3fee("0x4e")
    ) {
      _camera_that["cameraState"][a9_0x3fee("0x2c")] = ![];
      $("body")["trigger"](a9_0x3fee("0x9"), [
        {
          statusCode: 0x9c46,
          statusText:
            tozEventsLang[OneMeasureSDKParameters["language"]][
              a9_0x3fee("0x4f")
            ],
        },
      ]);
    } else {
      navigator[a9_0x3fee("0x39")]
        [a9_0x3fee("0x3a")]({
          audio: ![],
          video: {
            facingMode:
              _camera_that["cameraState"][a9_0x3fee("0x31")][a9_0x3fee("0x32")][
                _camera_that["cameraState"][a9_0x3fee("0x31")][
                  a9_0x3fee("0x33")
                ]
              ],
          },
        })
        [a9_0x3fee("0x1c")](_0x2f192f)
        ["catch"](_camera_that[a9_0x3fee("0x50")]);
    }
  },
  getUserMediaSecFail: function(_0x4842c8) {
    _camera_that[a9_0x3fee("0x26")]["initState"] = ![];
    if (_0x4842c8[a9_0x3fee("0x4d")] === a9_0x3fee("0x51")) {
      $("body")[a9_0x3fee("0x8")](a9_0x3fee("0x9"), [
        {
          statusCode: 0x9c47,
          statusText:
            tozEventsLang[OneMeasureSDKParameters["language"]][
              a9_0x3fee("0x52")
            ],
        },
      ]);
    } else {
      $(a9_0x3fee("0x7"))[a9_0x3fee("0x8")](a9_0x3fee("0x9"), [
        {
          statusCode: 0x9c48,
          statusText:
            tozEventsLang[OneMeasureSDKParameters["language"]]["JS40008"],
          detail: _0x4842c8,
        },
      ]);
    }
  },
  openGalleryFromActivity: function(_0x4ddd9a) {
    var _0xaa7eb0 = this;
    try {
      document[a9_0x3fee("0x2b")]("inputImgFormGalleryForm")[
        a9_0x3fee("0x53")
      ]();
    } catch (_0x37075c) {}
    $(a9_0x3fee("0x7"))["append"](a9_0x3fee("0x54"));
    var _0x221ddc = document[a9_0x3fee("0x2b")](a9_0x3fee("0x55"));
    _0x221ddc["addEventListener"](a9_0x3fee("0x56"), function(_0x370593) {
      _0xaa7eb0[a9_0x3fee("0x57")](_0x4ddd9a);
      document[a9_0x3fee("0x2b")](a9_0x3fee("0x58"))[a9_0x3fee("0x53")]();
    });
    _0x221ddc[a9_0x3fee("0x59")]();
  },
  getImgBase64WithoutCanvas: function(_0x41222e) {
    var _0x44f984 = $(a9_0x3fee("0x5a"))["find"]("input")[0x0][
      a9_0x3fee("0x5b")
    ][0x0];
    var _0x5367e8 = new FileReader();
    var _0x6f7a3b;
    _0x5367e8[a9_0x3fee("0x5c")] = function(_0x354148) {
      _0x6f7a3b = _0x354148[a9_0x3fee("0x5d")][a9_0x3fee("0x5e")];
      _0x41222e(_0x6f7a3b);
    };
    _0x5367e8[a9_0x3fee("0x5f")](_0x44f984);
  },
  getStream: function() {
    try {
      navigator[a9_0x3fee("0x39")]
        [a9_0x3fee("0x3a")](_camera_that["cameraState"][a9_0x3fee("0x30")])
        [a9_0x3fee("0x1c")](_camera_that["getStreamSuccess"])
        [a9_0x3fee("0x3c")](function(_0x4c44ad) {
          _camera_that["getUserMediaFirFail"](
            _0x4c44ad,
            _camera_that[a9_0x3fee("0x3b")]
          );
        });
    } catch (_0x24e2f1) {
      $(a9_0x3fee("0x7"))[a9_0x3fee("0x8")](a9_0x3fee("0x9"), [
        {
          statusCode: 0x9c48,
          statusText:
            tozEventsLang[OneMeasureSDKParameters["language"]][
              a9_0x3fee("0x60")
            ],
          detail: _0x24e2f1,
        },
      ]);
    }
  },
  getStreamSuccess: function(_0x4987f3) {
    _camera_that["streamInfo"]["tozCameraVideo"] = document[a9_0x3fee("0x2b")](
      _camera_that[a9_0x3fee("0x3d")][a9_0x3fee("0x3e")]
    );
    if ("srcObject" in _camera_that[a9_0x3fee("0x3d")][a9_0x3fee("0x2a")]) {
      _camera_that["streamInfo"][a9_0x3fee("0x2a")]["srcObject"] = _0x4987f3;
    } else {
      _camera_that[a9_0x3fee("0x3d")][a9_0x3fee("0x2a")][
        a9_0x3fee("0x40")
      ] = window[a9_0x3fee("0x41")][a9_0x3fee("0x42")](_0x4987f3);
    }
    _camera_that["streamInfo"]["stream"] = _0x4987f3;
    _camera_that["streamInfo"][a9_0x3fee("0x2a")][
      "onloadedmetadata"
    ] = function(_0x3ce09c) {
      var _0xc3d609 = this;
      setTimeout(function() {
        if (
          _0xc3d609[a9_0x3fee("0x46")] * _0xc3d609[a9_0x3fee("0x61")] <
            _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x45")][
              a9_0x3fee("0x37")
            ] *
              _camera_that[a9_0x3fee("0x29")]["selected"]["height"] &&
          _camera_that["streamInfo"][a9_0x3fee("0x62")] <
            _camera_that["streamInfo"][a9_0x3fee("0x63")]
        ) {
          _camera_that[a9_0x3fee("0x3d")][a9_0x3fee("0x62")]++;
          _camera_that["streamInfo"]["stream"]
            ["getVideoTracks"]()
            [a9_0x3fee("0x48")](function(_0x3377e6) {
              _0x3377e6["stop"]();
            });
          navigator["mediaDevices"]
            ["getUserMedia"](_camera_that[a9_0x3fee("0x26")][a9_0x3fee("0x30")])
            ["then"](_camera_that[a9_0x3fee("0x3b")])
            [a9_0x3fee("0x3c")](_camera_that[a9_0x3fee("0x50")]);
        } else {
          _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x45")][
            a9_0x3fee("0x37")
          ] = _0xc3d609[a9_0x3fee("0x46")];
          _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x45")]["height"] =
            _0xc3d609[a9_0x3fee("0x61")];
          if (
            _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x45")]["height"] >
              _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x4a")][
                a9_0x3fee("0x38")
              ] ||
            _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x45")][
              a9_0x3fee("0x37")
            ] >
              _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x4a")][
                a9_0x3fee("0x37")
              ]
          ) {
            _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x2e")]--;
            _camera_that[a9_0x3fee("0x2f")]();
            return;
          }
          if (
            _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x45")]["height"] <
              _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x4b")][
                a9_0x3fee("0x38")
              ] ||
            _camera_that["resolution"][a9_0x3fee("0x45")][a9_0x3fee("0x37")] <
              _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x4b")][
                a9_0x3fee("0x37")
              ]
          ) {
            $(a9_0x3fee("0x7"))[a9_0x3fee("0x8")](a9_0x3fee("0x9"), [
              {
                statusCode: 0x9c45,
                statusText:
                  tozEventsLang[OneMeasureSDKParameters[a9_0x3fee("0xa")]][
                    a9_0x3fee("0x4c")
                  ],
              },
            ]);
            return;
          }
          _camera_that[a9_0x3fee("0x26")][a9_0x3fee("0x2c")] = !![];
          cameraView[a9_0x3fee("0x64")]();
          _camera_that[a9_0x3fee("0x3d")][a9_0x3fee("0x2a")][
            a9_0x3fee("0x65")
          ]();
        }
      }, 0x1f4);
    };
  },
  captureImage: function(_0x17a258) {
    var _0x380d21 = document[a9_0x3fee("0x66")](a9_0x3fee("0x67"));
    _0x380d21[a9_0x3fee("0x37")] =
      _camera_that[a9_0x3fee("0x3d")]["tozCameraVideo"][a9_0x3fee("0x46")];
    _0x380d21["height"] =
      _camera_that[a9_0x3fee("0x3d")]["tozCameraVideo"][a9_0x3fee("0x61")];
    _0x380d21["getContext"]("2d")[a9_0x3fee("0x68")](
      _camera_that[a9_0x3fee("0x3d")][a9_0x3fee("0x2a")],
      0x0,
      0x0,
      _0x380d21[a9_0x3fee("0x37")],
      _0x380d21[a9_0x3fee("0x38")]
    );
    _0x17a258(_0x380d21[a9_0x3fee("0x69")](a9_0x3fee("0x6a")));
  },
  switchCamera: function() {
    try {
      _camera_that[a9_0x3fee("0x3d")]["stream"]
        [a9_0x3fee("0x47")]()
        ["forEach"](function(_0x17f144) {
          _0x17f144[a9_0x3fee("0x49")]();
        });
    } catch (_0x4e0582) {}
    _camera_that["cameraState"][a9_0x3fee("0x2c")] = ![];
    if (_camera_that["cameraState"][a9_0x3fee("0x31")]["index"] === 0x1) {
      _camera_that[a9_0x3fee("0x26")][a9_0x3fee("0x31")]["index"] = 0x0;
    } else {
      _camera_that["cameraState"][a9_0x3fee("0x31")][a9_0x3fee("0x33")] = 0x1;
    }
  },
  startCamera: function() {
    _camera_that[a9_0x3fee("0x3d")][a9_0x3fee("0x43")]
      [a9_0x3fee("0x47")]()
      [a9_0x3fee("0x48")](function(_0x31f239) {
        _0x31f239[a9_0x3fee("0x6b")] = !![];
      });
  },
  pauseCamera: function() {
    _camera_that[a9_0x3fee("0x3d")][a9_0x3fee("0x43")]
      ["getVideoTracks"]()
      [a9_0x3fee("0x48")](function(_0xba32c1) {
        _0xba32c1[a9_0x3fee("0x6c")]();
      });
  },
  cancelCamera: function() {
    _camera_that["streamInfo"]["stream"]
      ["getVideoTracks"]()
      [a9_0x3fee("0x48")](function(_0x680d64) {
        _0x680d64[a9_0x3fee("0x49")]();
      });
  },
  setFacing: function(_0x402015) {
    this[a9_0x3fee("0x26")][a9_0x3fee("0x31")][a9_0x3fee("0x33")] = _0x402015;
  },
  getFacing: function() {
    return this[a9_0x3fee("0x26")][a9_0x3fee("0x31")][a9_0x3fee("0x33")];
  },
  onRequestPermissionsResult: function(_0x24c7a2, _0x28e3fc) {
    try {
      navigator["mediaDevices"]
        [a9_0x3fee("0x3a")]({ audio: ![], video: !![] })
        [a9_0x3fee("0x1c")](_0x24c7a2)
        [a9_0x3fee("0x3c")](_0x28e3fc);
    } catch (_0x49ea83) {
      _0x28e3fc();
    }
  },
  getCameraList: function(_0x2557d3) {
    function _0x45b9f3() {
      _0x100951 = [];
      navigator["mediaDevices"]
        ["getUserMedia"]({ audio: ![], video: !![] })
        [a9_0x3fee("0x1c")]((_0x1b8827) => {
          navigator[a9_0x3fee("0x39")]
            ["enumerateDevices"]()
            [a9_0x3fee("0x1c")](function(_0x48fc3f) {
              for (
                var _0x9a2c31 = 0x0;
                _0x9a2c31 < _0x48fc3f[a9_0x3fee("0x2d")];
                _0x9a2c31++
              ) {
                var _0x43f63a = _0x48fc3f[_0x9a2c31];
                if (_0x43f63a[a9_0x3fee("0x6d")] === "videoinput") {
                  _0x100951[a9_0x3fee("0x6e")](_0x43f63a);
                }
              }
              _0x1b8827[a9_0x3fee("0x47")]()[a9_0x3fee("0x48")](function(
                _0x23ca6d
              ) {
                _0x23ca6d[a9_0x3fee("0x49")]();
              });
              _0x2557d3(_0x100951);
            });
        })
        [a9_0x3fee("0x3c")]((_0x3ffdad) => {
          console["log"](_0x3ffdad);
          _0x2557d3(_0x100951);
        });
    }
    var _0x100951 = [];
    try {
      navigator["mediaDevices"]
        [a9_0x3fee("0x6f")]()
        ["then"](function(_0x3eaab3) {
          for (
            var _0xd1682e = 0x0;
            _0xd1682e < _0x3eaab3["length"];
            _0xd1682e++
          ) {
            var _0x25cf42 = _0x3eaab3[_0xd1682e];
            if (_0x25cf42[a9_0x3fee("0x6d")] === "videoinput") {
              _0x100951[a9_0x3fee("0x6e")](_0x25cf42);
            }
          }
          if (_0x100951[a9_0x3fee("0x2d")] === 0x0) {
            _0x45b9f3();
          } else {
            _0x2557d3(_0x100951);
          }
        });
    } catch (_0x11fb34) {
      console[a9_0x3fee("0x70")](_0x11fb34);
      _0x2557d3(_0x100951);
    }
  },
  setCameraById: function(_0x546c5d) {
    _camera_that[a9_0x3fee("0x29")][a9_0x3fee("0x2e")] =
      _camera_that[a9_0x3fee("0x29")]["checkList"][a9_0x3fee("0x2d")] - 0x1;
    _camera_that[a9_0x3fee("0x2f")](_0x546c5d);
  },
};
var tozCameraView = new tozCameraView();

var a3_0x19ad = [
  "ご利用ください",
  "Safariブラウザを使用して",
  "\x20WeChatスキャンを使用する",
  "長押しで保存",
  "キャンセル",
  "画像処理に失敗しました",
  "エラー",
  "最新のデータ・インタフェースを取得するために失敗",
  "お待たせしました,ネットワークの接続を確認するか、後でもう一度実行してください？",
  "\x20待ち続ける",
  "ネットワークエラー,ネットワークの接続を確認するか、後でもう一度実行してください。",
  "正面写真",
  "写真を分析しています",
  "再分析",
  "身長を入力してください。",
  "体重を入力してください。",
  "专业版限定尺寸",
  "请确认您的身体轮廓是否正确",
  "点击图片可编辑轮廓",
  "AI识别较好，请依情况进行微调",
  "AI识别到有衣物等遮挡，建议手动调整",
  "量体结果",
  "量体尺寸",
  "您正在使用的浏览器不支持该应用",
  "您不能正常进行量体拍摄",
  "复制链接",
  "使用微信扫描",
  "长按保存",
  "浏览器暂不支持应用，请使用safari",
  "图片处理失败",
  "获取接口最新数据失败",
  "Powered\x20by\x20易量体",
  "让您久等了，请查看您的网络状态，稍后再试或者继续等待?",
  "稍后再试",
  "\x20继续等待",
  "网络出现异常,请查看网络设置或稍后重试",
  "识别分析",
  "侧面照",
  "重新拍照",
  "请填写您真实身高，AI会更准确哦",
  "请填写您真实体重，AI会更准确哦",
  "The\x20system\x20has\x20not\x20been\x20upgraded.\x20Please\x20upgrade\x20your\x20system\x20and\x20try\x20again.",
  "The\x20current\x20browser\x20does\x20not\x20support\x20photo\x20taking.\x20Please\x20change\x20Chrome,\x20Firefox\x20or\x20Safari\x20to\x20operate.",
  "Browser\x20lack\x20required\x20sensor,\x20please\x20use\x20devices\x20with\x20accelerometer\x20to\x20ensure\x20getting\x20precise\x20result",
  "Failed\x20to\x20open\x20the\x20camera.Please\x20refresh\x20your\x20webpage\x20or\x20clear\x20browser\x20cache\x20and\x20tyr\x20again.",
  "Failed\x20to\x20open\x20the\x20camera.\x20Please\x20authorize\x20the\x20browser\x20camera\x20in\x20the\x20settings.",
  "Failed\x20to\x20open\x20the\x20camera,\x20please\x20change\x20other\x20browser\x20and\x20try\x20again.",
  "Please\x20check\x20your\x20network\x20settings.",
  "Network\x20error",
  "Network\x20interruption",
  "Failed\x20to\x20get\x20the\x20QR\x20code.\x20Please\x20try\x20again.",
  "Failed\x20to\x20load\x20picture",
  "Failed\x20to\x20load\x20data.Please\x20try\x20again\x20.",
  "Sorry\x20to\x20have\x20kept\x20you\x20waiting.\x20Please\x20check\x20your\x20network\x20settings\x20and\x20try\x20again\x20or\x20keep\x20waiting",
  "係統未升級，請更新手機係統後再試",
  "當前瀏覽器不支持拍照功能，請使用\x20Chrome,\x20Firefox或Safari進行操作",
  "未打開攝像頭授權，請刷新網頁或清空瀏覽器緩存後再試",
  "瀏覽器未被授權使用攝像頭，請在設置中開啟對瀏覽器攝像頭的授權",
  "未成功打開攝像頭，請使用其他瀏覽器嚐試",
  "未知錯誤，請刷新瀏覽器再進行操作",
  "照片不合格，請重新上傳其他照片",
  "加載超時，請稍後再試",
  "網絡連接不順暢，請檢查您的網絡設置",
  "網絡故障",
  "網絡中斷",
  "二維碼獲取失敗，請重新操作",
  "圖片加載失敗",
  "讓您久等了,請查看您的網絡狀態，稍後再試或者繼續等待",
  "獲取最新接口失敗，請重試",
  "システムはアップグレードされていません。電話システムをアップグレードしてください。",
  "ブラウザのバージョンが低すぎます。ブラウザを更新してもう一度お試しください。",
  "現在のブラウザはカメラをサポートしていません。Chrome、Firefox、またはSafariを使用してください。",
  "ブラウザに必要なセンサーがありません。正確な結果を得るために加速度センサー付きのデバイスを使用してください",
  "ブラウザはカメラの使用を許可されていません設定でブラウザのカメラの許可を有効にしてください。",
  "写真の資格がありません。別の写真をアップロードしてください。",
  "画像を読み込めませんでした。",
  "読み込みがタイムアウトしました。しばらくしてからもう一度お試しください。",
  "ネットワーク接続がスムーズではありません。ネットワーク設定を確認してください。",
  "ネットワーク障害",
  "ネットワーク中断",
  "QRコードの取得に失敗しました。再操作してください",
  "データの読み込みがタイムアウトしました。もう一度お試しください",
  "お待たせしました,ネットワークの接続を確認するか、後でもう一度実行してください。",
  "APIの取得に失敗しました。再操作してください",
  "系统未升级，请更新手机系统",
  "浏览器版本过低，请更新浏览器后再试",
  "当前浏览器不支持拍照功能，请使用\x20Chrome,\x20Firefox或Safari进行操作",
  "您的设备不支持传感器工作，请使用带有重力传感器的移动设备，以确保结果准确性",
  "未打开摄像头授权，请刷新网页或清空浏览器缓存后再试",
  "未成功打开摄像头，请使用其他浏览器尝试",
  "未知错误，请刷新浏览器再进行操作",
  "照片不合格，请重新上传其他照片",
  "图片加载失败",
  "加载超时，请稍后再试",
  "网络连接不顺畅，请检查您的网络设置",
  "网络故障",
  "网络中断",
  "二维码获取失败，请重新操作",
  "数据加载失败，请重试",
  "让您久等了，请查看您的网络状态，稍后再试或者继续等待",
  "Available\x20in\x20pro\x20version",
  "Front",
  "Calculating\x20profile...<br>\x20Delay\x20may\x20occur\x20due\x20to\x20unstable\x20network\x20connection\x20in\x20some\x20area",
  "Please\x20check\x20your\x20profile",
  "Click\x20the\x20image\x20to\x20edit\x20the\x20profile",
  "View\x20Tutorials\x20>",
  "The\x20profile\x20needs\x20to\x20be\x20edited",
  "Are\x20you\x20sure\x20to\x20close\x20without\x20saving\x20your\x20changes?",
  "Result",
  "MEASUREMENTS",
  "Copy\x20link\x20successfully",
  "Your\x20browser\x20does\x20not\x20support\x20our\x20features",
  "Fail\x20to\x20measure",
  "Please",
  "Scan\x20with\x20wechat",
  "Click\x20to\x20save",
  "CANCEL",
  "Errors",
  "Fail\x20to\x20get\x20the\x20newest\x20API",
  "Powered\x20by\x201Measure",
  "Sorry\x20to\x20have\x20kept\x20you\x20waiting.\x20Please\x20check\x20your\x20network\x20settings\x20and\x20try\x20again\x20or\x20keep\x20waiting?",
  "Try\x20again",
  "\x20Wait",
  "Photo\x20Analysing",
  "Comprehensive\x20Analysing",
  "Network\x20cannot\x20be\x20connected.\x20Please\x20check\x20your\x20network\x20settings\x20or\x20try\x20again\x20later",
  "Please\x20input\x20your\x20height.",
  "Please\x20input\x20your\x20weight.",
  "專業版限定尺寸",
  "正在獲取身體輪廓...<br>\x20部分地區會由於網絡傳輸問題導致處理時間較長，請你耐心等待。",
  "點擊圖片可編輯輪廓",
  "查看教程\x20>",
  "AI識別較好，請依情況進行微調",
  "AI識別到有衣物等遮擋，建議手動調整",
  "生成尺寸",
  "量體結果",
  "量體尺寸",
  "您正在使用的瀏覽器不支持該應用",
  "請您使用",
  "使用Safari瀏覽器",
  "複製鏈接",
  "使用微信掃描",
  "長按保存",
  "瀏覽器暫不支持應用，請使用safari",
  "圖片處理失敗",
  "讓您久等了,請查看您的網絡狀態，稍後再試或者繼續等待?",
  "稍後再試",
  "\x20繼續等待",
  "網絡出現異常,請查看網絡設置或稍後重試。",
  "正面照",
  "側面照",
  "識別分析",
  "重新分析",
  "企業版限定サイズ",
  "体の輪郭",
  "体の輪郭を生成しています...<br>\x20処理時間はインターネットの回線速度によって長くなる場合がありますので、少々お待ちください",
  "体の輪郭が正しいかをご確認ください",
  "画像をクリックして輪郭の修正ができます",
  "お手引きを見る\x20>",
  "AI識別がよくできているが、状況に応じて微調整してください",
  "サイズ取得",
  "完了しました",
  "変更を破棄してよろしいですか？",
  "採寸サイズ",
  "リンクの成功をコピーします",
  "使用しているブラウザはアプリをサポートしていません\x20",
  "体の写真は普通には測定できません。",
];
(function(_0x140166, _0xbcf16e) {
  var _0x1c25c5 = function(_0x5b4fa6) {
    while (--_0x5b4fa6) {
      _0x140166["push"](_0x140166["shift"]());
    }
  };
  _0x1c25c5(++_0xbcf16e);
})(a3_0x19ad, 0x64);
var a3_0x2907 = function(_0x15a675, _0x5f4c48) {
  _0x15a675 = _0x15a675 - 0x0;
  var _0x36f3cc = a3_0x19ad[_0x15a675];
  return _0x36f3cc;
};
var tozLanguage = {
  "en-US": {
    public_pro_size: a3_0x2907("0x0"),
    public_front: a3_0x2907("0x1"),
    public_side: "Side",
    public_outline: "Profile",
    public_upload_note: a3_0x2907("0x2"),
    public_confirm_outline: a3_0x2907("0x3"),
    public_click_image: a3_0x2907("0x4"),
    public_show_tutorials: a3_0x2907("0x5"),
    public_perfect_note:
      "The\x20profile\x20is\x20good,you\x20can\x20edit\x20slightly",
    public_warning_note: a3_0x2907("0x6"),
    public_create_size: "Generate\x20Measurements",
    public_finish: "Done",
    public_cancel_adjusted: a3_0x2907("0x7"),
    public_size_result: a3_0x2907("0x8"),
    public_size_measurement: a3_0x2907("0x9"),
    public_copy_link_success: a3_0x2907("0xa"),
    public_no_support: a3_0x2907("0xb"),
    public_fail_camera: a3_0x2907("0xc"),
    public_sug_use: a3_0x2907("0xd"),
    public_use_safari: "Use\x20Safari\x20browser",
    public_copy_link: "Copy\x20link",
    public_use_wechat: a3_0x2907("0xe"),
    public_save_img: a3_0x2907("0xf"),
    public_sug_use_safari:
      "Your\x20browser\x20does\x20not\x20support\x20our\x20features,\x20please\x20use\x20safari",
    public_toast_cancel: a3_0x2907("0x10"),
    public_toast_confirm: "OK",
    public_fail_process: "Fail\x20to\x20process\x20images",
    public_error: a3_0x2907("0x11"),
    public_fail_get_API: a3_0x2907("0x12"),
    public_power_by: a3_0x2907("0x13"),
    public_timeout: a3_0x2907("0x14"),
    public_toast_try_again: a3_0x2907("0x15"),
    public_toast_wait: a3_0x2907("0x16"),
    public_over_max_time:
      "Network\x20cannot\x20be\x20connected.\x20Please\x20check\x20your\x20network\x20settings\x20or\x20try\x20again\x20later",
    public_progress_first_step: "Uploading\x20Front\x20Photo",
    public_progress_second_step: a3_0x2907("0x17"),
    public_progress_third_step: "Uploading\x20Side\x20Photo",
    public_progress_fourth_step: a3_0x2907("0x17"),
    public_progress_fifth_step: a3_0x2907("0x18"),
    public_process_reanalysis: "Reanalysis",
    public_process_retake: "Take\x20photos\x20again",
    public_network_interruption: a3_0x2907("0x19"),
    public_height_error: a3_0x2907("0x1a"),
    public_weight_error: a3_0x2907("0x1b"),
  },
  "zh-HK": {
    public_pro_size: a3_0x2907("0x1c"),
    public_front: "正麵",
    public_side: "側麵",
    public_outline: "身體輪廓",
    public_upload_note: a3_0x2907("0x1d"),
    public_confirm_outline: "請確認您的身體輪廓是否正確",
    public_click_image: a3_0x2907("0x1e"),
    public_show_tutorials: a3_0x2907("0x1f"),
    public_perfect_note: a3_0x2907("0x20"),
    public_warning_note: a3_0x2907("0x21"),
    public_create_size: a3_0x2907("0x22"),
    public_finish: "完成",
    public_cancel_adjusted: "您確定要放棄已經做出的修改嗎?",
    public_size_result: a3_0x2907("0x23"),
    public_size_measurement: a3_0x2907("0x24"),
    public_copy_link_success: "複製鏈接成功",
    public_no_support: a3_0x2907("0x25"),
    public_fail_camera: "您不能正常進行量體拍攝",
    public_sug_use: a3_0x2907("0x26"),
    public_use_safari: a3_0x2907("0x27"),
    public_copy_link: a3_0x2907("0x28"),
    public_use_wechat: a3_0x2907("0x29"),
    public_save_img: a3_0x2907("0x2a"),
    public_sug_use_safari: a3_0x2907("0x2b"),
    public_toast_cancel: "取消",
    public_toast_confirm: "確認",
    public_fail_process: a3_0x2907("0x2c"),
    public_error: "錯誤",
    public_fail_get_API: "獲取接口最新數據失敗",
    public_power_by: "Powered\x20by\x20易量體",
    public_timeout: a3_0x2907("0x2d"),
    public_toast_try_again: a3_0x2907("0x2e"),
    public_toast_wait: a3_0x2907("0x2f"),
    public_over_max_time: a3_0x2907("0x30"),
    public_progress_first_step: a3_0x2907("0x31"),
    public_progress_second_step: "識別分析",
    public_progress_third_step: a3_0x2907("0x32"),
    public_progress_fourth_step: a3_0x2907("0x33"),
    public_progress_fifth_step: "綜合分析",
    public_process_reanalysis: a3_0x2907("0x34"),
    public_process_retake: "重新拍照",
    public_network_interruption: a3_0x2907("0x30"),
    public_height_error: "請填寫您的真實身高",
    public_weight_error: "請填寫您的真實體重",
  },
  "ja-JP": {
    public_pro_size: a3_0x2907("0x35"),
    public_front: "正面",
    public_side: "側面",
    public_outline: a3_0x2907("0x36"),
    public_upload_note: a3_0x2907("0x37"),
    public_confirm_outline: a3_0x2907("0x38"),
    public_click_image: a3_0x2907("0x39"),
    public_show_tutorials: a3_0x2907("0x3a"),
    public_perfect_note: a3_0x2907("0x3b"),
    public_warning_note:
      "AIは、衣服の影や隠れを認識しています。手動で調整することをおすすめします",
    public_create_size: a3_0x2907("0x3c"),
    public_finish: a3_0x2907("0x3d"),
    public_cancel_adjusted: a3_0x2907("0x3e"),
    public_size_result: "採寸結果",
    public_size_measurement: a3_0x2907("0x3f"),
    public_copy_link_success: a3_0x2907("0x40"),
    public_no_support: a3_0x2907("0x41"),
    public_fail_camera: a3_0x2907("0x42"),
    public_sug_use: a3_0x2907("0x43"),
    public_use_safari: a3_0x2907("0x44"),
    public_copy_link: "リンクをコピー",
    public_use_wechat: a3_0x2907("0x45"),
    public_save_img: a3_0x2907("0x46"),
    public_sug_use_safari:
      "ブラウザはこのアプリをサポートしていません。Safariを使用してください。",
    public_toast_cancel: a3_0x2907("0x47"),
    public_toast_confirm: "確認",
    public_fail_process: a3_0x2907("0x48"),
    public_error: a3_0x2907("0x49"),
    public_fail_get_API: a3_0x2907("0x4a"),
    public_power_by: a3_0x2907("0x13"),
    public_timeout: a3_0x2907("0x4b"),
    public_toast_try_again: "後でやり直す",
    public_toast_wait: a3_0x2907("0x4c"),
    public_over_max_time: a3_0x2907("0x4d"),
    public_progress_first_step: a3_0x2907("0x4e"),
    public_progress_second_step: a3_0x2907("0x4f"),
    public_progress_third_step: "側面写真",
    public_progress_fourth_step: a3_0x2907("0x4f"),
    public_progress_fifth_step: "身体輪郭を分析しています",
    public_process_reanalysis: a3_0x2907("0x50"),
    public_process_retake: "写真を撮り直す",
    public_network_interruption: a3_0x2907("0x4d"),
    public_height_error: a3_0x2907("0x51"),
    public_weight_error: a3_0x2907("0x52"),
  },
  "zh-CN": {
    public_pro_size: a3_0x2907("0x53"),
    public_front: "正面",
    public_side: "侧面",
    public_outline: "身体轮廓",
    public_upload_note:
      "正在获取身体轮廓...<br>\x20部分地区会由于网络传输问题导致处理时间较长，请你耐心等待。",
    public_confirm_outline: a3_0x2907("0x54"),
    public_click_image: a3_0x2907("0x55"),
    public_show_tutorials: a3_0x2907("0x1f"),
    public_perfect_note: a3_0x2907("0x56"),
    public_warning_note: a3_0x2907("0x57"),
    public_create_size: a3_0x2907("0x22"),
    public_finish: "完成",
    public_cancel_adjusted: "您确定要放弃已经做出的修改吗？",
    public_size_result: a3_0x2907("0x58"),
    public_size_measurement: a3_0x2907("0x59"),
    public_copy_link_success: "复制链接成功",
    public_no_support: a3_0x2907("0x5a"),
    public_fail_camera: a3_0x2907("0x5b"),
    public_sug_use: "请您使用",
    public_use_safari: "使用Safari浏览器",
    public_copy_link: a3_0x2907("0x5c"),
    public_use_wechat: a3_0x2907("0x5d"),
    public_save_img: a3_0x2907("0x5e"),
    public_sug_use_safari: a3_0x2907("0x5f"),
    public_toast_cancel: "取消",
    public_toast_confirm: "确认",
    public_fail_process: a3_0x2907("0x60"),
    public_error: "错误",
    public_fail_get_API: a3_0x2907("0x61"),
    public_power_by: a3_0x2907("0x62"),
    public_timeout: a3_0x2907("0x63"),
    public_toast_try_again: a3_0x2907("0x64"),
    public_toast_wait: a3_0x2907("0x65"),
    public_over_max_time: a3_0x2907("0x66"),
    public_progress_first_step: a3_0x2907("0x31"),
    public_progress_second_step: a3_0x2907("0x67"),
    public_progress_third_step: a3_0x2907("0x68"),
    public_progress_fourth_step: a3_0x2907("0x67"),
    public_progress_fifth_step: "综合分析",
    public_process_reanalysis: "重新分析",
    public_process_retake: a3_0x2907("0x69"),
    public_network_interruption: a3_0x2907("0x66"),
    public_height_error: a3_0x2907("0x6a"),
    public_weight_error: a3_0x2907("0x6b"),
  },
};
var tozEventsLang = {
  "en-US": {
    JS40001: a3_0x2907("0x6c"),
    JS40002:
      "Browser\x20version\x20is\x20too\x20old,\x20please\x20change\x20another\x20browser\x20to\x20operation",
    JS40003: a3_0x2907("0x6d"),
    JS40004: a3_0x2907("0x6e"),
    JS40005: a3_0x2907("0x6f"),
    JS40006: a3_0x2907("0x70"),
    JS40007: a3_0x2907("0x71"),
    JS40008:
      "Unknown\x20error,\x20please\x20refresh\x20the\x20browser\x20and\x20try\x20again.",
    JS40009:
      "Your\x20photos\x20don\x27t\x20meet\x20the\x20requirement.\x20Please\x20reload\x20other\x20photos.",
    JS40010: "Failed\x20to\x20load\x20picture.",
    JS40011:
      "Loading\x20time\x20is\x20too\x20long.Please\x20try\x20again\x20later.",
    JS40012: a3_0x2907("0x72"),
    JS40013: a3_0x2907("0x73"),
    JS40014: a3_0x2907("0x74"),
    JS40015: a3_0x2907("0x75"),
    JS40016: a3_0x2907("0x76"),
    JS40017: a3_0x2907("0x77"),
    JS40018: a3_0x2907("0x78"),
    JS40019: "Failed\x20to\x20get\x20API.\x20Please\x20try\x20again.",
  },
  "zh-HK": {
    JS40001: a3_0x2907("0x79"),
    JS40002: "瀏覽器版本過低，請更新瀏覽器後再試",
    JS40003: a3_0x2907("0x7a"),
    JS40004:
      "您的設備不支持傳感器工作，請使用帶有重力傳感器的移動設備，以確保結果準確性",
    JS40005: a3_0x2907("0x7b"),
    JS40006: a3_0x2907("0x7c"),
    JS40007: a3_0x2907("0x7d"),
    JS40008: a3_0x2907("0x7e"),
    JS40009: a3_0x2907("0x7f"),
    JS40010: "圖片加載失敗",
    JS40011: a3_0x2907("0x80"),
    JS40012: a3_0x2907("0x81"),
    JS40013: a3_0x2907("0x82"),
    JS40014: a3_0x2907("0x83"),
    JS40015: a3_0x2907("0x84"),
    JS40016: a3_0x2907("0x85"),
    JS40017: "數據加載失敗，請重試",
    JS40018: a3_0x2907("0x86"),
    JS40019: a3_0x2907("0x87"),
  },
  "ja-JP": {
    JS40001: a3_0x2907("0x88"),
    JS40002: a3_0x2907("0x89"),
    JS40003: a3_0x2907("0x8a"),
    JS40004: a3_0x2907("0x8b"),
    JS40005:
      "カメラの認証がオンになっていません。ページを更新するか、ブラウザのキャッシュをクリアしてからもう一度お試しください。",
    JS40006: a3_0x2907("0x8c"),
    JS40007: a3_0x2907("0x8a"),
    JS40008: "不明なエラーです、ブラウザを更新してから操作してください。",
    JS40009: a3_0x2907("0x8d"),
    JS40010: a3_0x2907("0x8e"),
    JS40011: a3_0x2907("0x8f"),
    JS40012: a3_0x2907("0x90"),
    JS40013: a3_0x2907("0x91"),
    JS40014: a3_0x2907("0x92"),
    JS40015: a3_0x2907("0x93"),
    JS40016: "画像を読み込めませんでした",
    JS40017: a3_0x2907("0x94"),
    JS40018: a3_0x2907("0x95"),
    JS40019: a3_0x2907("0x96"),
  },
  "zh-CN": {
    JS40001: a3_0x2907("0x97"),
    JS40002: a3_0x2907("0x98"),
    JS40003: a3_0x2907("0x99"),
    JS40004: a3_0x2907("0x9a"),
    JS40005: a3_0x2907("0x9b"),
    JS40006: "浏览器未被授权使用摄像头，请在设置中开启对浏览器摄像头的授权",
    JS40007: a3_0x2907("0x9c"),
    JS40008: a3_0x2907("0x9d"),
    JS40009: a3_0x2907("0x9e"),
    JS40010: a3_0x2907("0x9f"),
    JS40011: a3_0x2907("0xa0"),
    JS40012: a3_0x2907("0xa1"),
    JS40013: a3_0x2907("0xa2"),
    JS40014: a3_0x2907("0xa3"),
    JS40015: a3_0x2907("0xa4"),
    JS40016: "图片加载失败",
    JS40017: a3_0x2907("0xa5"),
    JS40018: a3_0x2907("0xa6"),
    JS40019: "获取最新接口失败，请重试",
  },
};

var _0x1fa7 = [
  "lang",
  "attr",
  "UpRange",
  "hmac",
  "msize00_020",
  "charCodeAt",
  "iconUrl",
  "now",
  "fsize00_020",
  "cameraAng",
  "getProfileBody",
  "random",
  "profile",
  "PxIndex",
  "userId",
  "WarnInfo",
  "https://www.emtailor.com/bnd/cloud/api/sdk/appkey/check",
  "length",
  "sidePaintLines",
  "Location",
  "METRIC",
  "sign",
  "https://www.emtailor.com/bnd/i18n/api/i18n/msg/getByCodeList",
  "dataURLtoBlob",
  "JSON",
  "_Events",
  "frontPaintLines",
  "sideLoose",
  "floor",
  "userHeight",
  "frontAllPoints",
  "LineType",
  "body",
  "name",
  "https://www.tozmart.com/bnd/tozapi/api/sdk/config/get",
  "CLooseIdx",
  "LineSelected",
  "src",
  "sort",
  "PxName",
  "getData",
  "appSecret",
  "getContext",
  "linesSelected",
  "width",
  "Horizonal_INV",
  "3/8",
  "mptsSelected",
  "sideMovePoint",
  "Name",
  "LineName",
  "randomString",
  "https://www.emtailor.com/bnd/tozapi/api/sdk/config/get",
  "drawImage",
  "1/8",
  "scale",
  "object",
  "createElement",
  "configContent",
  "outlineConfig",
  "ImgProc",
  "frontSizeLines",
  "userGender",
  "CSizeLines",
  "<img\x20id=\x22",
  "timestamp",
  "StartPt",
  "save",
  "en-US",
  "PxSelected",
  "transform",
  "side",
  "canvas",
  "PxProfess",
  "CPaintLines",
  "ProfileBody",
  "professFlag",
  "FRONT",
  "tozRI",
  "base64",
  "measureName",
  "EndPt",
  "url3d",
  "push",
  "3/4",
  "append",
  "translate",
  "image/jpeg",
  "data",
  "setAttribute",
  "frontLoose",
  "codeDesc",
  "constructor",
  "toFixed",
  "userWeight",
  "photoNum",
  "DnRange",
  "gender",
  "sideSizeLines",
  "height",
  "sideAddInfo",
  "md5",
  "fsize05_012",
  "frontAddInfo",
  "1/4",
  "parse",
  "zh-CN",
  "msize05_011",
  "getMovePoints",
  "public_pro_size",
  "IsShow",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAAAG5ElEQVR4Ae3Bf2zU9R3H8Ze9Qg85gZZfkYygjFjclu0PEzPicMrPZEuGBrrhj3XiYHOZCHMT52AbdFMwICg/5A9NgWSLiogkG9sqoKAURlB+WBqGk1CmtHPscOFnC0efy4U0FOiP6933x+fu3o+HsgsDuJNpVLCUVayjih3UUEecpDh11LCDKtaxiheoYBoj6S/jJQoZzgSepJIdnCAdcaqpZBbfoZSITHoo4m7msZVGvNTIVuZyF1GZ1FDEKCrYRiN+amQrc7mLqEx76MWDvMk5gnSW9dxPTKY1inmYjTQRlkb+xEP0lqEfP2YTF3DBBaqYRj/lK6ayDRe9w1TlF3ryOJ/isk/5GT2VDyhhHnGywX/5LX2Uy7iRJZwmm5ziOW5ULmIYlZwnGzXxEsOUS+jFMi6SzRIsIabcwP00kAuOUaZsx1C2kUu2MFTZiii/p4lc08hcipR9GEcdueowo5VNKGQxzeSyZhZRqOzAEN4nH7zPF+Q+JnCKfPE/viWXUcRK8s1yiuQmhnKAfHSAoXIPZZwhX52hTG5hAfluntzBagy8KBdQyBuYS9YSUbiI8jbmsr/QXeEhxi7Mld7lBoWD/nyIudZ+ShQ8+nII07aD9FWw6ME+TPv2cL2CQ4R3MB3bQkRBYR2mc2sVDFZiUrNc/uMpTOqekL+YjOmaB+QfxpLAdE2C8fIHQziD6brT3CTvEWEvJj17iMhrLMSk7xl5i1GYTDQzUt6hL8cxmWmgj7zCZkzm/ixvMB3jjUeUOYZjvFOqTFGN8c52ZYb7MN6arPQRpQHjrXp6KF0swnhvodLDLSQw3ktQqnRQjfHHdnUd92H8M1ldQ4wGjH/q6aGuYA7GX7OVOqJ8jvHXCaJKFTMw/puu1BChHuO/Y0SUCqZgglGuVPARJhiH1DkmYoIzQZ3hACY4u9UxxmCC9U11hFcxwXpF7aMn5zDBOktM7eEhTPDK1R42Y4JXpbbRn2ZM8BIMUFv4OSYcM9UW9mLCsVvX4lZMeL6oqzEfE54KXY1aTHj26UoUY8JVotYow4TrHrXGCky4nldr1GLCtU+XUYwJX4laUIYJ3z1qwQpM+J5XC2ox4dunSyjGuKGPkrgD44YRSmIKxg0/UBILMG54Wkmsx7jhdSVxAOOG/UqiEeOGRkncjHHHYDEe447R4jGMO34i5mPcUSGWY9yxRKzBuONlsR7jjtfEWxh3bBQ7Me54VxzAuGOvOIpxx8fiBMYdnwnjktOiCeOOJhHHuCMujmLcUSdqMe6oEX/HuGOn2Ixxx1tiA8Ydb4g/YNyxRqzEuGO5WIhxx3zxOMYdj4lvY9wxXgzDuOMmUUAC44ZGJXEQ44YaJbEB44Z1SuJZjBueVhI/xLihXEl8A+OGryuJYowbeukSajHhq1ELVmDCt0wtKMOEb6JaUIIJX29dRi0mXB+qNVZgwrVUrVGGCde9ao0STLh660rUYsKzX1djASY8v9PV+BImPDfrWuzDhGO32sITmHDMVFsYQDMmeAn6q21swQTvb2oPD2OC9321hxjnMcE6R5Hax1pMsP6ojjAGE6xR6hg1mOB8oM4wEROce9U5DmGC8ZFSwRRMMMqVCiIcw/ivnohSwwyM/36qVBHlBMZfx+mm1PFrjL+eUlcQox7jnwai6hoewPjnu+o6tmP8Ua10UEoC473z3KL0sBjjvWeVLmIcx3irgajSx4MYb31PmWE7xjvVyhS3YrxTqszxCMYbP5I3WI/J3AZ5hRhHMJk5Qkze4Ws0YdJ3nq/KW8zEpO9ReY+NmPRskB/ozSeYrvuUmPzBVziN6ZqTfFn+YTQJTOoucIf8RTkmdZPkP+ZgUvOkgsFqTOdeVlAoYCOmY3/lOgWHKB9g2reLIgWLfvwT07ZDlCh4lLAHc629FCscXM/bmCttoofCQyGvYC5bS4HCxjLMJS/KDczCNPMLuYNyLpDPEkySWxhBA/mqgRFyD/3YSj7aRD+5iQIquEg+uchvuE4uYzRx8sV/uFPuYxC7yAfVDFR2oJCF5LZmniGibMI4DpOrDjNG2YfuzOYsueYMs+mubMVg3iSXrGewsh3jOEIu+Ji7lRsoYg5nyWZn+BXdlUsYyCJOk41OsZCBykWUUMHnZJMTzKOPchk38Es+Ixv8m1n0VD4gynQ+wWVHeZSo8gtT2YmLdjJV+YohzOEfuOIgcxgiw20soYEw1bOY22Quo4CxrOEkQTvJasZSINMWunE7M3mNf+G3o7zKDG6nm0wqGMQkFrOTJrzUyA6eYxKDZNJDIaVMYBaV7CBOOuJUU8ksJjCcQhkvMYCRTKOCpaxiHVW8Rw11xEmKU0cN71HF61TyAhVMZST9lVX+D2OHh070fr3iAAAAAElFTkSuQmCC",
  "unit",
  "CAddInfo",
  "signMethod",
  "SIDE",
  "toDataURL",
  "onload",
  "CMovPxIdx",
  "msize05_012",
  "CallPx",
  "sourceType",
  "apiData",
  "1/2",
  "responseData",
  "nodeId",
  "getElementById",
  "ErrInfo",
  "appKey",
  "measureId",
  "weight",
  "fsize05_011",
  "Orientation",
  "sizeName",
  "currentNodeListIndex",
  "frontMovePoint",
  "ImgDir",
  "inch",
  "FaceRect",
  "nodeList",
  "model",
  "IMPERIAL",
  "Height",
  "stringify",
  "cutFlipBase64",
  "photoType",
  "HumanRect",
  "crossOrigin",
  "taskId",
  "5/8",
  "https://www.emtailor.com/bnd/i18n/api/i18n/msg/getByCode",
  "language",
  "Anonymous",
  "undefined",
  "match",
  "toString",
  "sizeDesc",
  "front",
  "getPaintLines",
  "substring",
  "ja-JP",
  "BASE_V2.5.3",
];
(function(_0x39d30f, _0x1fa767) {
  var _0x439eb3 = function(_0xe6a6d7) {
    while (--_0xe6a6d7) {
      _0x39d30f["push"](_0x39d30f["shift"]());
    }
  };
  _0x439eb3(++_0x1fa767);
})(_0x1fa7, 0x157);
var _0x439e = function(_0x39d30f, _0x1fa767) {
  _0x39d30f = _0x39d30f - 0x0;
  var _0x439eb3 = _0x1fa7[_0x39d30f];
  return _0x439eb3;
};
var SDKVersion = _0x439e("0x8e");
var masaicImg = { base64: _0x439e("0x5c") };
var tozFrontImage = { cutFlipBase64: null };
var tozFrontMasaic = null;
var tozSideMasaic = null;
var tozSideImage = { cutFlipBase64: null };
var userImgLoad = 0x2;
var mosaicImgLoad = 0x2;
var signMethod = { md5: "md5", hmac: _0x439e("0x92") };
var tozAPIUrl = {
  getAPIUrl: _0x439e("0x21"),
  getAPIUrl_HK: _0x439e("0xf"),
  getAPIUrl_JP: "https://jp.emtailor.com/bnd/tozapi/api/sdk/config/get",
  getMsgByCodeList: _0x439e("0x3"),
  getMsgByCode: _0x439e("0x83"),
  getCorpId: _0x439e("0x9f"),
  QRCodeUrl: null,
  currentNodeListIndex: 0x0,
  nodeList: [],
  timeoutDataGet: 0x493e0,
  uploadImageTime: 0x15f90,
};
var tozAPIDataType = {
  GETPROFILEBYIMG: 0x1,
  GETSIZESBYIMG: 0x2,
  GETRECOMBYIMG: 0x3,
  GETSIZESBYPROFILE: 0x4,
  GETRECOMBYPROFILE: 0x5,
};
var Pose = { FRONT: _0x439e("0x8a"), SIDE: _0x439e("0x34") };
var Gender = { FEMALE: 0x0, MALE: 0x1 };
var Language = {
  ENGLISH: _0x439e("0x31"),
  CHINESE: _0x439e("0x57"),
  TRADITION_CHINESE: "zh-HK",
  JAPANESE: _0x439e("0x8d"),
};
var Unit = { METRIC: "cm", IMPERIAL: _0x439e("0x76") };
var PhotoType = { FRONT: 0x1, SIDE: 0x2 };
var setIntervalMaxTimes = 0x3c;
var listForUrl = {};
const tozIsNullOrUndefined = (_0x50c410) =>
  _0x50c410 === null || _0x50c410 === undefined;
function createSign(_0x8a5f41, _0x1f04ba) {
  function _0x1bb58a(_0x3ecbe5) {
    var _0x20ffcc = new Array();
    var _0x6bfed = 0x0;
    for (var _0x3c20c5 in _0x3ecbe5) {
      _0x20ffcc[_0x6bfed] = _0x3c20c5;
      _0x6bfed++;
    }
    var _0x535e33 = _0x20ffcc[_0x439e("0x13")]();
    var _0x4fb635 = {};
    for (var _0x3c20c5 in _0x535e33) {
      _0x4fb635[_0x535e33[_0x3c20c5]] = _0x3ecbe5[_0x535e33[_0x3c20c5]];
    }
    return _0x4fb635;
  }
  var _0x517f93 = _0x1bb58a(_0x8a5f41);
  var _0x14d62f = "";
  if (_0x8a5f41[_0x439e("0x5f")] === signMethod[_0x439e("0x52")]) {
    _0x14d62f += _0x1f04ba;
  }
  for (var _0x11ccd6 in _0x517f93) {
    var _0xcc4050 = _0x517f93[_0x11ccd6];
    _0x14d62f += _0x11ccd6 + _0xcc4050;
  }
  if (_0x8a5f41[_0x439e("0x5f")] === signMethod[_0x439e("0x52")]) {
    _0x14d62f += _0x1f04ba;
  }
  var _0x59d790 = "";
  if (_0x8a5f41["signMethod"] === signMethod["md5"]) {
    _0x59d790 = md5(_0x14d62f);
  }
  return _0x59d790["toUpperCase"]();
}
var cloneObj = function(_0x3fa46f) {
  var _0x3c3a1d,
    _0x19c434 = _0x3fa46f[_0x439e("0x49")] === Array ? [] : {};
  if (typeof _0x3fa46f !== _0x439e("0x25")) {
    return;
  } else if (window[_0x439e("0x5")]) {
    (_0x3c3a1d = JSON[_0x439e("0x7c")](_0x3fa46f)),
      (_0x19c434 = JSON[_0x439e("0x56")](_0x3c3a1d));
  } else {
    for (var _0x39ef6f in _0x3fa46f) {
      _0x19c434[_0x39ef6f] =
        typeof _0x3fa46f[_0x39ef6f] === _0x439e("0x25")
          ? cloneObj(_0x3fa46f[_0x39ef6f])
          : _0x3fa46f[_0x39ef6f];
    }
  }
  return _0x19c434;
};
function toInch(_0x10d1e5) {
  function _0x4ac5b1(_0x5a2e1c) {
    for (
      var _0x593aae = 0x0;
      _0x593aae < _0x4b7422[_0x439e("0xa0")];
      _0x593aae++
    ) {
      if (_0x5a2e1c <= _0x4b7422[_0x593aae]) {
        return _0x593aae;
      }
    }
    return _0x4b7422[_0x439e("0xa0")];
  }
  var _0x4b7422 = [
    0x1 / 0x8,
    0x1 / 0x4,
    0x3 / 0x8,
    0x1 / 0x2,
    0x5 / 0x8,
    0x3 / 0x4,
    0x7 / 0x8,
  ];
  var _0x8e2afb = [
    _0x439e("0x23"),
    _0x439e("0x55"),
    _0x439e("0x1b"),
    _0x439e("0x68"),
    _0x439e("0x82"),
    _0x439e("0x41"),
    "7/8",
  ];
  var _0x9023ec = Math[_0x439e("0x9")](_0x10d1e5 * 0.3937);
  if (_0x10d1e5 * 0.3937 - _0x9023ec > 0.875) {
    return _0x9023ec + 0x1;
  } else {
    return (
      _0x9023ec +
      "(" +
      _0x8e2afb[_0x4ac5b1(_0x10d1e5 * 0.3937 - _0x9023ec)] +
      ")"
    );
  }
}
var tozUploadImgDataProc = {
  dataURLtoBlob: function(_0x1f42c6) {
    var _0x12bf78 = _0x1f42c6["split"](","),
      _0x539ed9 = _0x12bf78[0x0][_0x439e("0x87")](/:(.*?);/)[0x1],
      _0x2a6571 = atob(_0x12bf78[0x1]),
      _0x3a1e00 = _0x2a6571[_0x439e("0xa0")],
      _0x1bd02f = new Uint8Array(_0x3a1e00);
    while (_0x3a1e00--) {
      _0x1bd02f[_0x3a1e00] = _0x2a6571[_0x439e("0x94")](_0x3a1e00);
    }
    return new Blob([_0x1bd02f], { type: _0x539ed9 });
  },
  getReqData: function(
    _0x586540,
    _0x45e808,
    _0x2ceca6,
    _0x57cc84,
    _0x57e918,
    _0x538bb5
  ) {
    var _0x18425b = this;
    var _0x244982 = new Image();
    _0x244982[_0x439e("0x62")] = function() {
      if (_0x244982[_0x439e("0x19")] * _0x244982[_0x439e("0x50")] > 0x1312d00) {
        $(_0x439e("0xd"))["trigger"](_0x439e("0x6"), [
          {
            statusCode: 0x9c49,
            statusText:
              tozEventsLang[OneMeasureSDKParameters[_0x439e("0x84")]][
                "JS40009"
              ],
          },
        ]);
      } else {
        var _0x4b681c = !_0x586540[_0x439e("0x81")]
          ? {
              appKey: _0x586540[_0x439e("0x6d")],
              timestamp: JSON[_0x439e("0x7c")](Date[_0x439e("0x96")]()),
              signMethod: signMethod[_0x439e("0x52")],
              cameraAng: JSON[_0x439e("0x7c")](_0x57cc84),
              userGender: Number(_0x586540[_0x439e("0x4e")]),
              userHeight: Number(_0x586540[_0x439e("0x50")]),
              userWeight: Number(_0x586540[_0x439e("0x6f")]),
              photoType: _0x2ceca6,
              sourceType: 0xa,
              userId: _0x586540[_0x439e("0x9d")],
              nodeId: tozAPIUrl[_0x439e("0x78")][
                tozAPIUrl["currentNodeListIndex"]
              ][_0x439e("0x6a")]
                ? tozAPIUrl["nodeList"][tozAPIUrl[_0x439e("0x73")]][
                    _0x439e("0x6a")
                  ]
                : null,
              unit: _0x586540[_0x439e("0x5d")],
              measureName: _0x586540["name"],
            }
          : {
              appKey: _0x586540["appKey"],
              timestamp: JSON[_0x439e("0x7c")](Date["now"]()),
              signMethod: signMethod[_0x439e("0x52")],
              cameraAng: JSON["stringify"](_0x57cc84),
              taskId: _0x586540[_0x439e("0x81")],
              userGender: Number(_0x586540[_0x439e("0x4e")]),
              userHeight: Number(_0x586540[_0x439e("0x50")]),
              userWeight: Number(_0x586540[_0x439e("0x6f")]),
              photoType: _0x2ceca6,
              sourceType: 0xa,
              userId: _0x586540[_0x439e("0x9d")],
              nodeId: tozAPIUrl[_0x439e("0x78")][tozAPIUrl[_0x439e("0x73")]][
                _0x439e("0x6a")
              ]
                ? tozAPIUrl[_0x439e("0x78")][tozAPIUrl[_0x439e("0x73")]][
                    _0x439e("0x6a")
                  ]
                : null,
              unit: _0x586540[_0x439e("0x5d")],
              measureName: _0x586540[_0x439e("0xe")],
            };
        var _0x1e014d = new FormData();
        if (_0x57e918) {
          _0x1e014d[_0x439e("0x42")](
            _0x439e("0x81"),
            _0x4b681c[_0x439e("0x81")]
          );
        }
        _0x1e014d[_0x439e("0x42")](
          _0x439e("0x2"),
          createSign(_0x4b681c, _0x586540[_0x439e("0x16")])
        );
        _0x1e014d[_0x439e("0x42")](
          "photoSrc",
          _0x18425b[_0x439e("0x4")](_0x45e808)
        );
        _0x1e014d["append"](_0x439e("0x8f"), _0x586540["language"]);
        _0x1e014d[_0x439e("0x42")](_0x439e("0x6d"), _0x4b681c[_0x439e("0x6d")]);
        _0x1e014d["append"](_0x439e("0x2e"), _0x4b681c[_0x439e("0x2e")]);
        _0x1e014d["append"](_0x439e("0x5f"), _0x4b681c[_0x439e("0x5f")]);
        _0x1e014d[_0x439e("0x42")](_0x439e("0x2b"), _0x4b681c[_0x439e("0x2b")]);
        _0x1e014d[_0x439e("0x42")](_0x439e("0xa"), _0x4b681c[_0x439e("0xa")]);
        _0x1e014d[_0x439e("0x42")](_0x439e("0x4b"), _0x4b681c["userWeight"]);
        _0x1e014d[_0x439e("0x42")](_0x439e("0x7e"), _0x4b681c["photoType"]);
        _0x1e014d[_0x439e("0x42")]("sourceType", _0x4b681c[_0x439e("0x66")]);
        _0x1e014d[_0x439e("0x42")](_0x439e("0x9d"), _0x4b681c[_0x439e("0x9d")]);
        _0x1e014d[_0x439e("0x42")](_0x439e("0x98"), _0x4b681c[_0x439e("0x98")]);
        _0x1e014d[_0x439e("0x42")](_0x439e("0x6a"), _0x4b681c[_0x439e("0x6a")]);
        _0x1e014d["append"](_0x439e("0x5d"), _0x4b681c[_0x439e("0x5d")]);
        _0x1e014d[_0x439e("0x42")](_0x439e("0x3d"), _0x4b681c[_0x439e("0x3d")]);
        _0x538bb5(_0x1e014d);
      }
    };
    _0x244982[_0x439e("0x12")] = _0x45e808;
  },
};
var profile2ModelDataProc = {
  getMovePoints: function(_0x5d65c0, _0x1c3c78) {
    var _0x53e141 = [];
    if (_0x1c3c78 != null) {
      for (
        var _0x544203 = 0x0;
        _0x544203 < _0x5d65c0[_0x439e("0xa0")];
        _0x544203++
      ) {
        if (_0x5d65c0[_0x544203][_0x439e("0x36")] === 0x0) {
          _0x53e141[_0x439e("0x40")]({
            PxIndex: _0x5d65c0[_0x544203]["PxIndex"],
            PxName: _0x5d65c0[_0x544203][_0x439e("0x14")],
            PxProfess: _0x5d65c0[_0x544203][_0x439e("0x36")],
            PxSelected: ![],
          });
          for (
            var _0x5da892 = 0x0;
            _0x5da892 < _0x1c3c78[_0x439e("0xa0")];
            _0x5da892++
          ) {
            if (
              _0x5d65c0[_0x544203][_0x439e("0x14")] ===
              _0x1c3c78[_0x5da892][_0x439e("0x14")]
            ) {
              _0x53e141[_0x53e141[_0x439e("0xa0")] - 0x1][
                _0x439e("0x32")
              ] = !![];
            }
          }
        } else if (_0x5d65c0[_0x544203][_0x439e("0x36")] === 0x1) {
          for (
            var _0x5da892 = 0x0;
            _0x5da892 < _0x1c3c78["length"];
            _0x5da892++
          ) {
            if (
              _0x5d65c0[_0x544203][_0x439e("0x14")] ===
              _0x1c3c78[_0x5da892][_0x439e("0x14")]
            ) {
              _0x53e141["push"]({
                PxIndex: _0x5d65c0[_0x544203][_0x439e("0x9c")],
                PxName: _0x5d65c0[_0x544203][_0x439e("0x14")],
                PxProfess: _0x5d65c0[_0x544203][_0x439e("0x36")],
                PxSelected: !![],
              });
            }
          }
        }
      }
    } else {
      for (
        var _0x544203 = 0x0;
        _0x544203 < _0x5d65c0[_0x439e("0xa0")];
        _0x544203++
      ) {
        _0x53e141[_0x439e("0x40")]({
          PxIndex: _0x5d65c0[_0x544203][_0x439e("0x9c")],
          PxName: _0x5d65c0[_0x544203][_0x439e("0x14")],
          PxProfess: _0x5d65c0[_0x544203][_0x439e("0x36")],
          PxSelected: !![],
        });
      }
    }
    return _0x53e141;
  },
  getPaintLines: function(_0x561dce, _0x17f13b) {
    var _0xa526d0 = [];
    if (_0x17f13b != null) {
      for (
        var _0x58b092 = 0x0;
        _0x58b092 < _0x561dce[_0x439e("0xa0")];
        _0x58b092++
      ) {
        _0xa526d0["push"]({
          DnRange: _0x561dce[_0x58b092][_0x439e("0x4d")],
          EndPt: _0x561dce[_0x58b092][_0x439e("0x3e")],
          ImgDir: _0x561dce[_0x58b092][_0x439e("0x75")],
          LineName: _0x561dce[_0x58b092][_0x439e("0x1f")],
          LineType: _0x561dce[_0x58b092][_0x439e("0xc")],
          Location: _0x561dce[_0x58b092][_0x439e("0x0")],
          StartPt: _0x561dce[_0x58b092][_0x439e("0x2f")],
          UpRange: _0x561dce[_0x58b092][_0x439e("0x91")],
          LineSelected: ![],
        });
        for (
          var _0x3a0d7e = 0x0;
          _0x3a0d7e < _0x17f13b[_0x439e("0xa0")];
          _0x3a0d7e++
        ) {
          if (
            _0x561dce[_0x58b092][_0x439e("0x1f")] ===
            _0x17f13b[_0x3a0d7e][_0x439e("0x1f")]
          ) {
            _0xa526d0[_0x58b092][_0x439e("0x11")] = !![];
          }
        }
      }
    } else {
      for (
        var _0x58b092 = 0x0;
        _0x58b092 < _0x561dce[_0x439e("0xa0")];
        _0x58b092++
      ) {
        _0xa526d0["push"]({
          DnRange: _0x561dce[_0x58b092][_0x439e("0x4d")],
          EndPt: _0x561dce[_0x58b092][_0x439e("0x3e")],
          ImgDir: _0x561dce[_0x58b092]["ImgDir"],
          LineName: _0x561dce[_0x58b092][_0x439e("0x1f")],
          LineType: _0x561dce[_0x58b092][_0x439e("0xc")],
          Location: _0x561dce[_0x58b092][_0x439e("0x0")],
          StartPt: _0x561dce[_0x58b092][_0x439e("0x2f")],
          UpRange: _0x561dce[_0x58b092][_0x439e("0x91")],
          LineSelected: !![],
        });
      }
    }
    return _0xa526d0;
  },
  getData: function(_0x36929c, _0x50f7f0) {
    var _0x34830c = this;
    var _0x36769f =
      _0x36929c[_0x439e("0x45")][_0x439e("0x67")][_0x439e("0x69")][
        _0x439e("0x9b")
      ][_0x439e("0x8a")];
    var _0x4fca8e =
      _0x36929c[_0x439e("0x45")][_0x439e("0x67")][_0x439e("0x69")][
        _0x439e("0x9b")
      ]["side"];
    var _0x2a0b7d, _0x5cdb9c;
    var _0x41c4ac, _0x570385;
    var _0x80cf96, _0x48f230;
    var _0x2c1b76, _0x57c52a;
    if (
      JSON[_0x439e("0x7c")](
        _0x36929c[_0x439e("0x45")][_0x439e("0x67")][_0x439e("0x69")][
          _0x439e("0x9b")
        ][_0x439e("0x28")]
      ) != "{}"
    ) {
      var _0x5d017a =
        _0x36929c[_0x439e("0x45")]["apiData"][_0x439e("0x69")][_0x439e("0x9b")][
          "outlineConfig"
        ][_0x439e("0x27")];
      _0x5d017a = JSON[_0x439e("0x56")](_0x5d017a);
      if (OneMeasureSDKParameters[_0x439e("0x4e")] === 0x0) {
        if (_0x5d017a["0"] === null) {
          _0x80cf96 = null;
          _0x48f230 = null;
          _0x2c1b76 = null;
          _0x57c52a = null;
        } else {
          _0x80cf96 = _0x5d017a["0"][0x0][_0x439e("0x1c")];
          _0x48f230 = _0x5d017a["0"][0x1][_0x439e("0x1c")];
          _0x2c1b76 = _0x5d017a["0"][0x0][_0x439e("0x18")];
          _0x57c52a = _0x5d017a["0"][0x1][_0x439e("0x18")];
        }
      } else if (OneMeasureSDKParameters[_0x439e("0x4e")] === 0x1) {
        if (_0x5d017a["1"] === null) {
          _0x80cf96 = null;
          _0x48f230 = null;
          _0x2c1b76 = null;
          _0x57c52a = null;
        } else {
          _0x80cf96 = _0x5d017a["1"][0x0][_0x439e("0x1c")];
          _0x48f230 = _0x5d017a["1"][0x1][_0x439e("0x1c")];
          _0x2c1b76 = _0x5d017a["1"][0x0]["linesSelected"];
          _0x57c52a = _0x5d017a["1"][0x1][_0x439e("0x18")];
        }
      }
    } else {
      _0x80cf96 = null;
      _0x48f230 = null;
      _0x2c1b76 = null;
      _0x57c52a = null;
    }
    _0x2a0b7d = _0x34830c[_0x439e("0x59")](
      _0x36769f["ProfileBody"][_0x439e("0x63")],
      _0x80cf96
    );
    _0x5cdb9c = _0x34830c[_0x439e("0x59")](
      _0x4fca8e[_0x439e("0x38")][_0x439e("0x63")],
      _0x48f230
    );
    _0x41c4ac = _0x34830c["getPaintLines"](
      _0x36769f[_0x439e("0x38")][_0x439e("0x37")],
      _0x2c1b76
    );
    _0x570385 = _0x34830c[_0x439e("0x8b")](
      _0x4fca8e[_0x439e("0x38")]["CPaintLines"],
      _0x57c52a
    );
    var _0x1dd3ac = {
      frontFaceRect: _0x36769f[_0x439e("0x29")][_0x439e("0x77")],
      sideFaceRect: _0x4fca8e[_0x439e("0x29")][_0x439e("0x77")],
      frontAllPoints: _0x36769f[_0x439e("0x38")][_0x439e("0x65")],
      sideAllPoints: _0x4fca8e["ProfileBody"][_0x439e("0x65")],
      frontProcessedBitmap: tozFrontImage[_0x439e("0x7d")],
      sideProcessedBitmap: tozSideImage[_0x439e("0x7d")],
      imageProcessFeedback: {
        frontImageErrors: _0x36769f[_0x439e("0x6c")],
        frontImageWarns: _0x36769f[_0x439e("0x9e")],
        sideImageErrors: _0x4fca8e[_0x439e("0x6c")],
        sideImageWarns: _0x4fca8e[_0x439e("0x9e")],
      },
      frontMovePoint: _0x2a0b7d,
      sideMovePoint: _0x5cdb9c,
      frontProcessedBitmapSize: [
        _0x36769f[_0x439e("0x29")]["HumanRect"][0x2] -
          _0x36769f[_0x439e("0x29")][_0x439e("0x7f")][0x0],
        _0x36769f[_0x439e("0x29")][_0x439e("0x7f")][0x3] -
          _0x36769f[_0x439e("0x29")][_0x439e("0x7f")][0x1],
      ],
      sideProcessedBitmapSize: [
        _0x4fca8e[_0x439e("0x29")][_0x439e("0x7f")][0x2] -
          _0x4fca8e[_0x439e("0x29")][_0x439e("0x7f")][0x0],
        _0x4fca8e[_0x439e("0x29")][_0x439e("0x7f")][0x3] -
          _0x4fca8e[_0x439e("0x29")][_0x439e("0x7f")][0x1],
      ],
      frontLoose: _0x36769f[_0x439e("0x38")][_0x439e("0x10")],
      sideLoose: _0x4fca8e[_0x439e("0x38")][_0x439e("0x10")],
      frontPaintLines: _0x41c4ac,
      sidePaintLines: _0x570385,
      frontSizeLines: _0x36769f["ProfileBody"][_0x439e("0x2c")],
      sideSizeLines: _0x4fca8e[_0x439e("0x38")][_0x439e("0x2c")],
      frontAddInfo: _0x36769f[_0x439e("0x38")][_0x439e("0x5e")],
      sideAddInfo: _0x4fca8e["ProfileBody"][_0x439e("0x5e")],
      measureId:
        _0x36929c[_0x439e("0x45")]["apiData"][_0x439e("0x69")][_0x439e("0x9b")][
          _0x439e("0x6e")
        ],
    };
    _0x50f7f0(_0x1dd3ac);
  },
};
var imageProc = {
  randomString: function() {
    var _0x28bb3e = 0x5;
    var _0x4e3904 = Math[_0x439e("0x9a")]()
      [_0x439e("0x88")](0x24)
      [_0x439e("0x8c")](0x2);
    while (_0x4e3904[_0x439e("0xa0")] < _0x28bb3e) {
      _0x4e3904 = Math[_0x439e("0x9a")]()
        ["toString"](0x24)
        [_0x439e("0x8c")](0x2);
    }
    return _0x4e3904[_0x439e("0x8c")](0x0, _0x28bb3e);
  },
  rotateImage: function(_0x1ea956, _0x459245) {
    var _0x278b26 = _0x439e("0x3b") + this[_0x439e("0x20")]();
    $("body")[_0x439e("0x42")](
      _0x439e("0x2d") + _0x278b26 + "\x22\x20style=\x22display:\x20none\x22>"
    );
    $("#" + _0x278b26)[_0x439e("0x90")](_0x439e("0x12"), _0x1ea956);
    var _0x1c7aa8 = document[_0x439e("0x26")](_0x439e("0x35"));
    var _0x463920 = _0x1c7aa8[_0x439e("0x17")]("2d");
    var _0x53cf13 = new Image();
    _0x53cf13["onload"] = function() {
      var _0x2287b9 = document["getElementById"](_0x278b26);
      EXIF[_0x439e("0x15")](_0x2287b9, function() {
        var _0x146ca1 = _0x53cf13[_0x439e("0x19")],
          _0x49fa0f = _0x53cf13[_0x439e("0x50")];
        var _0x57ce06 = this["exifdata"][_0x439e("0x71")];
        if (0x4 < _0x57ce06 && _0x57ce06 < 0x9) {
          _0x1c7aa8[_0x439e("0x19")] = _0x49fa0f;
          _0x1c7aa8[_0x439e("0x50")] = _0x146ca1;
        } else {
          _0x1c7aa8[_0x439e("0x19")] = _0x146ca1;
          _0x1c7aa8[_0x439e("0x50")] = _0x49fa0f;
        }
        _0x463920[_0x439e("0x30")]();
        switch (_0x57ce06) {
          case 0x2:
            _0x463920[_0x439e("0x33")](-0x1, 0x0, 0x0, 0x1, _0x146ca1, 0x0);
            break;
          case 0x3:
            _0x463920[_0x439e("0x33")](
              -0x1,
              0x0,
              0x0,
              -0x1,
              _0x146ca1,
              _0x49fa0f
            );
            break;
          case 0x4:
            _0x463920["transform"](0x1, 0x0, 0x0, -0x1, 0x0, _0x49fa0f);
            break;
          case 0x5:
            _0x463920[_0x439e("0x33")](0x0, 0x1, 0x1, 0x0, 0x0, 0x0);
            break;
          case 0x6:
            _0x463920[_0x439e("0x33")](0x0, 0x1, -0x1, 0x0, _0x49fa0f, 0x0);
            break;
          case 0x7:
            _0x463920[_0x439e("0x33")](
              0x0,
              -0x1,
              -0x1,
              0x0,
              _0x49fa0f,
              _0x146ca1
            );
            break;
          case 0x8:
            _0x463920[_0x439e("0x33")](0x0, -0x1, 0x1, 0x0, 0x0, _0x146ca1);
            break;
          default:
            break;
        }
        _0x463920[_0x439e("0x22")](_0x53cf13, 0x0, 0x0);
        _0x463920["restore"]();
        _0x459245(_0x1c7aa8[_0x439e("0x61")](_0x439e("0x44")));
        document[_0x439e("0x6b")](_0x278b26)["remove"]();
      });
    };
    _0x53cf13[_0x439e("0x12")] = _0x1ea956;
  },
  cuttingFlipImage: function(_0x1458a1, _0x40c840, _0xc86743, _0x5e4072) {
    var _0x500167 = new Image();
    _0x500167["onload"] = function(_0x5aa0c) {
      var _0x4b3202 = document[_0x439e("0x26")](_0x439e("0x35"));
      var _0x132145 = _0x4b3202["getContext"]("2d");
      _0x4b3202["width"] = _0x1458a1[_0x439e("0x29")]["Width"];
      _0x4b3202[_0x439e("0x50")] = _0x1458a1[_0x439e("0x29")][_0x439e("0x7b")];
      var _0x4cd282;
      var _0x3e280d;
      if (
        _0x500167["width"] / _0x500167[_0x439e("0x50")] >
        _0x4b3202[_0x439e("0x19")] / _0x4b3202[_0x439e("0x50")]
      ) {
        _0x3e280d = _0x4b3202[_0x439e("0x19")];
        _0x4cd282 =
          _0x4b3202[_0x439e("0x19")] /
          (_0x500167[_0x439e("0x19")] / _0x500167[_0x439e("0x50")]);
      } else {
        _0x3e280d =
          _0x4b3202[_0x439e("0x50")] *
          (_0x500167["width"] / _0x500167["height"]);
        _0x4cd282 = _0x4b3202["height"];
      }
      _0x132145["drawImage"](
        _0x500167,
        0x0,
        0x0,
        _0x500167[_0x439e("0x19")],
        _0x500167[_0x439e("0x50")],
        0x0,
        0x0,
        _0x3e280d,
        _0x4cd282
      );
      var _0x24b04c = new Image();
      _0x24b04c[_0x439e("0x62")] = function(_0xee101a) {
        var _0x4d66b4 = document[_0x439e("0x26")](_0x439e("0x35"));
        var _0x244abf = _0x4d66b4[_0x439e("0x17")]("2d");
        _0x4d66b4["width"] =
          _0x1458a1["ImgProc"][_0x439e("0x7f")][0x2] -
          _0x1458a1["ImgProc"][_0x439e("0x7f")][0x0];
        _0x4d66b4[_0x439e("0x50")] =
          _0x1458a1[_0x439e("0x29")]["HumanRect"][0x3] -
          _0x1458a1[_0x439e("0x29")][_0x439e("0x7f")][0x1];
        if (_0x1458a1[_0x439e("0x29")][_0x439e("0x1a")] === 0x1) {
          _0x244abf[_0x439e("0x43")](_0x4d66b4["width"], 0x0);
          _0x244abf["scale"](-0x1, 0x1);
        }
        if (_0x1458a1["ImgProc"]["Verizonal_INV"] === 0x1) {
          _0x244abf[_0x439e("0x43")](0x0, _0x4d66b4[_0x439e("0x50")]);
          _0x244abf[_0x439e("0x24")](0x1, -0x1);
        }
        _0x244abf[_0x439e("0x22")](
          _0x24b04c,
          _0x1458a1[_0x439e("0x29")][_0x439e("0x7f")][0x0],
          _0x1458a1[_0x439e("0x29")][_0x439e("0x7f")][0x1],
          _0x4d66b4[_0x439e("0x19")],
          _0x4d66b4[_0x439e("0x50")],
          0x0,
          0x0,
          _0x4d66b4[_0x439e("0x19")],
          _0x4d66b4[_0x439e("0x50")]
        );
        _0xc86743[_0x439e("0x7d")] = _0x4d66b4[_0x439e("0x61")](
          _0x439e("0x44")
        );
        userImgLoad--;
        if (userImgLoad === 0x0) {
          userImgLoad = 0x2;
          _0x5e4072();
        }
      };
      _0x24b04c["src"] = _0x4b3202[_0x439e("0x61")](_0x439e("0x44"));
    };
    _0x500167[_0x439e("0x12")] = _0x40c840;
  },
};
function addMosaicOnFace(
  _0xf6c4d8,
  _0x444d2a,
  _0x4e881b,
  _0x17de8b,
  _0x4064a2
) {
  var _0x38e46e = new Image();
  _0x38e46e[_0x439e("0x46")](_0x439e("0x80"), _0x439e("0x85"));
  _0x38e46e[_0x439e("0x12")] = masaicImg[_0x439e("0x3c")];
  var _0x3341f2 = new Image();
  _0x3341f2["onload"] = function(_0x11bada) {
    try {
      var _0x264ae4 = document["createElement"](_0x439e("0x35"));
      var _0x40f85f = _0x264ae4[_0x439e("0x17")]("2d");
      _0x264ae4[_0x439e("0x19")] = _0x444d2a[0x0];
      _0x264ae4["height"] = _0x444d2a[0x1];
      _0x40f85f[_0x439e("0x22")](
        _0x3341f2,
        0x0,
        0x0,
        _0x3341f2[_0x439e("0x19")],
        _0x3341f2[_0x439e("0x50")],
        0x0,
        0x0,
        _0x264ae4[_0x439e("0x19")],
        _0x264ae4[_0x439e("0x50")]
      );
      _0x40f85f[_0x439e("0x22")](
        _0x38e46e,
        0x0,
        0x0,
        _0x38e46e["width"],
        _0x38e46e[_0x439e("0x50")],
        _0x4e881b[0x0],
        _0x4e881b[0x1],
        _0x4e881b[0x2] - _0x4e881b[0x0],
        _0x4e881b[0x3] - _0x4e881b[0x1]
      );
    } catch (_0x2abb40) {
      console["log"](_0x2abb40);
    }
    if (_0x17de8b === PhotoType[_0x439e("0x3a")]) {
      tozFrontMasaic = _0x264ae4[_0x439e("0x61")](_0x439e("0x44"));
    } else if (_0x17de8b === PhotoType[_0x439e("0x60")]) {
      tozSideMasaic = _0x264ae4[_0x439e("0x61")](_0x439e("0x44"));
    }
    mosaicImgLoad--;
    if (mosaicImgLoad === 0x0) {
      mosaicImgLoad = 0x2;
      _0x4064a2();
    }
  };
  _0x3341f2[_0x439e("0x12")] = _0xf6c4d8;
}
var tozGetMeasurementsProc = {
  getProfileBody: function(_0x491de2, _0x3ec9eb) {
    if (_0x3ec9eb === PhotoType[_0x439e("0x3a")]) {
      return {
        CallPx: _0x491de2[_0x439e("0xb")],
        CMovPxIdx: _0x491de2[_0x439e("0x74")],
        CLooseIdx: _0x491de2[_0x439e("0x47")],
        CPaintLines: _0x491de2[_0x439e("0x7")],
        CSizeLines: _0x491de2[_0x439e("0x2a")],
        CAddInfo: _0x491de2[_0x439e("0x54")],
      };
    } else if (_0x3ec9eb === PhotoType["SIDE"]) {
      return {
        CallPx: _0x491de2["sideAllPoints"],
        CMovPxIdx: _0x491de2[_0x439e("0x1d")],
        CLooseIdx: _0x491de2[_0x439e("0x8")],
        CPaintLines: _0x491de2[_0x439e("0xa1")],
        CSizeLines: _0x491de2[_0x439e("0x4f")],
        CAddInfo: _0x491de2[_0x439e("0x51")],
      };
    }
  },
  getReqData: function(_0x1653b7, _0x234152) {
    var _0x26339b = this;
    var _0x314344 = {
      appKey: _0x1653b7[_0x439e("0x6d")],
      timestamp: JSON[_0x439e("0x7c")](Date["now"]()),
      signMethod: signMethod[_0x439e("0x52")],
      userGender: _0x1653b7[_0x439e("0x4e")],
      userHeight: _0x1653b7[_0x439e("0x50")],
      userWeight: _0x1653b7[_0x439e("0x6f")],
      measureId: _0x234152[_0x439e("0x6e")],
      photoNum: 0x2,
      userId: _0x1653b7[_0x439e("0x9d")],
      professFlag: 0x1,
      nodeId:
        tozAPIUrl[_0x439e("0x78")][tozAPIUrl[_0x439e("0x73")]][_0x439e("0x6a")],
      unit: _0x1653b7[_0x439e("0x5d")],
    };
    return {
      sign: createSign(_0x314344, _0x1653b7[_0x439e("0x16")]),
      lang: _0x1653b7[_0x439e("0x84")],
      frontProfileBody: JSON[_0x439e("0x7c")](
        _0x26339b["getProfileBody"](_0x234152, PhotoType[_0x439e("0x3a")])
      ),
      sideProfileBody: JSON[_0x439e("0x7c")](
        _0x26339b[_0x439e("0x99")](_0x234152, PhotoType[_0x439e("0x60")])
      ),
      professFlag: _0x314344[_0x439e("0x39")],
      photoNum: _0x314344[_0x439e("0x4c")],
      measureId: _0x314344[_0x439e("0x6e")],
      appKey: _0x314344[_0x439e("0x6d")],
      timestamp: _0x314344[_0x439e("0x2e")],
      signMethod: _0x314344[_0x439e("0x5f")],
      userGender: _0x314344[_0x439e("0x2b")],
      userHeight: _0x314344[_0x439e("0xa")],
      userWeight: _0x314344[_0x439e("0x4b")],
      userId: _0x314344[_0x439e("0x9d")],
      nodeId: _0x314344[_0x439e("0x6a")],
      unit: _0x314344[_0x439e("0x5d")],
    };
  },
  getMeasurementsDataByRes: function(_0x45d3e4, _0x26e9a4) {
    var _0x2cfd62 =
      _0x45d3e4[_0x439e("0x45")]["apiData"][_0x439e("0x69")][_0x439e("0x79")][
        "measureInfo"
      ];
    var _0x275de1 = [
      _0x439e("0x58"),
      _0x439e("0x64"),
      _0x439e("0x70"),
      _0x439e("0x53"),
    ];
    var _0x262bc = [_0x439e("0x93"), _0x439e("0x97")];
    var _0x11c8cc = [];
    for (var _0x2f820b = 0x0; _0x2f820b < _0x2cfd62["length"]; _0x2f820b++) {
      var _0x942aed = ![];
      var _0x53f326 = ![];
      var _0xd38f50 = _0x2cfd62[_0x2f820b]["Measure"];
      for (
        var _0x1e0b5f = 0x0;
        _0x1e0b5f < _0x275de1[_0x439e("0xa0")];
        _0x1e0b5f++
      ) {
        if (_0x2cfd62[_0x2f820b]["Name"] === _0x275de1[_0x1e0b5f]) {
          _0x942aed = !![];
        }
      }
      for (
        var _0x1e0b5f = 0x0;
        _0x1e0b5f < _0x262bc[_0x439e("0xa0")];
        _0x1e0b5f++
      ) {
        if (_0x2cfd62[_0x2f820b][_0x439e("0x1e")] === _0x262bc[_0x1e0b5f]) {
          _0x53f326 = !![];
        }
      }
      var _0x37509f = "";
      if (_0x2cfd62[_0x2f820b][_0x439e("0x5b")] === 0x0) {
        _0xd38f50 =
          tozLanguage[OneMeasureSDKParameters["language"]][_0x439e("0x5a")];
      } else if (
        _0x2cfd62[_0x2f820b][_0x439e("0x5b")] === 0x1 &&
        !(_0xd38f50 === "" || _0xd38f50 === 0x0)
      ) {
        if (_0x942aed) {
          _0xd38f50 = _0xd38f50[_0x439e("0x4a")](0x2);
          _0x37509f = "°";
        } else if (_0x53f326) {
          if (
            OneMeasureSDKParameters[_0x439e("0x5d")] === Unit[_0x439e("0x1")]
          ) {
            _0xd38f50 = _0xd38f50[_0x439e("0x4a")](0x2);
            _0x37509f = "KG";
          } else if (
            OneMeasureSDKParameters[_0x439e("0x5d")] === Unit[_0x439e("0x7a")]
          ) {
            _0xd38f50 = (_0xd38f50 * 2.2046)[_0x439e("0x4a")](0x2);
            _0x37509f = "lb";
          }
        } else {
          if (
            OneMeasureSDKParameters[_0x439e("0x5d")] === Unit[_0x439e("0x1")]
          ) {
            _0xd38f50 = _0xd38f50[_0x439e("0x4a")](0x2);
            _0x37509f = "cm";
          } else if (
            OneMeasureSDKParameters[_0x439e("0x5d")] === Unit[_0x439e("0x7a")]
          ) {
            _0xd38f50 = toInch(Number(_0xd38f50));
            _0x37509f = "\x22";
          }
        }
      }
      _0x11c8cc[_0x439e("0x40")]({
        sizeIdCode: _0x2cfd62[_0x2f820b][_0x439e("0x1e")],
        meaValue: _0xd38f50,
        imageUrl: _0x2cfd62[_0x2f820b][_0x439e("0x95")]
          ? _0x2cfd62[_0x2f820b][_0x439e("0x95")]
          : _0x439e("0x86"),
        sizeName: _0x2cfd62[_0x2f820b][_0x439e("0x72")]
          ? _0x2cfd62[_0x2f820b]["sizeName"]
          : _0x439e("0x86"),
        sizeIntro: _0x2cfd62[_0x2f820b][_0x439e("0x89")]
          ? _0x2cfd62[_0x2f820b][_0x439e("0x89")]
          : "undefined",
        unit: _0x37509f,
      });
    }
    _0x26e9a4(_0x45d3e4["code"], _0x45d3e4[_0x439e("0x48")], {
      measurementEntities: _0x11c8cc,
      model3dUrl: _0x45d3e4[_0x439e("0x45")][_0x439e("0x67")][_0x439e("0x69")][
        "model"
      ][_0x439e("0x3f")]
        ? _0x45d3e4[_0x439e("0x45")][_0x439e("0x67")]["responseData"][
            _0x439e("0x79")
          ][_0x439e("0x3f")]
        : null,
    });
  },
};

var a4_0x2c77 = [
  "length",
  "fromCharCode",
  "concat",
  "charCodeAt",
  "charAt",
  "function",
  "amd",
  "md5",
];
(function(_0x12e1a8, _0x55904b) {
  var _0x35de4b = function(_0x200177) {
    while (--_0x200177) {
      _0x12e1a8["push"](_0x12e1a8["shift"]());
    }
  };
  _0x35de4b(++_0x55904b);
})(a4_0x2c77, 0xf8);
var a4_0x2add = function(_0x5a7d56, _0x2c4939) {
  _0x5a7d56 = _0x5a7d56 - 0x0;
  var _0x556302 = a4_0x2c77[_0x5a7d56];
  return _0x556302;
};
(function(_0x2058f0) {
  "use strict";
  function _0x104185(_0x5e8875, _0x5f2942) {
    var _0x4b7b5a = (_0x5e8875 & 0xffff) + (_0x5f2942 & 0xffff),
      _0x339f6d =
        (_0x5e8875 >> 0x10) + (_0x5f2942 >> 0x10) + (_0x4b7b5a >> 0x10);
    return (_0x339f6d << 0x10) | (_0x4b7b5a & 0xffff);
  }
  function _0x9363c7(_0x23101a, _0x708d64) {
    return (_0x23101a << _0x708d64) | (_0x23101a >>> (0x20 - _0x708d64));
  }
  function _0xfb8a2e(
    _0x58ab1b,
    _0x1d16c0,
    _0x5c30b4,
    _0xb017b3,
    _0x59a2b8,
    _0x4d587d
  ) {
    return _0x104185(
      _0x9363c7(
        _0x104185(
          _0x104185(_0x1d16c0, _0x58ab1b),
          _0x104185(_0xb017b3, _0x4d587d)
        ),
        _0x59a2b8
      ),
      _0x5c30b4
    );
  }
  function _0x58e3e6(
    _0x3928ef,
    _0x45dcf9,
    _0x803606,
    _0x74e621,
    _0x48987c,
    _0x4fde0a,
    _0x4da889
  ) {
    return _0xfb8a2e(
      (_0x45dcf9 & _0x803606) | (~_0x45dcf9 & _0x74e621),
      _0x3928ef,
      _0x45dcf9,
      _0x48987c,
      _0x4fde0a,
      _0x4da889
    );
  }
  function _0x3252b2(
    _0x29a3e3,
    _0x296548,
    _0x35e603,
    _0x1e4449,
    _0x2471ab,
    _0x131843,
    _0x581da5
  ) {
    return _0xfb8a2e(
      (_0x296548 & _0x1e4449) | (_0x35e603 & ~_0x1e4449),
      _0x29a3e3,
      _0x296548,
      _0x2471ab,
      _0x131843,
      _0x581da5
    );
  }
  function _0x34bacb(
    _0x5afd06,
    _0x1617e0,
    _0x40fdb6,
    _0x44f3e1,
    _0xca8200,
    _0x4f92c3,
    _0x2812a0
  ) {
    return _0xfb8a2e(
      _0x1617e0 ^ _0x40fdb6 ^ _0x44f3e1,
      _0x5afd06,
      _0x1617e0,
      _0xca8200,
      _0x4f92c3,
      _0x2812a0
    );
  }
  function _0xa37dff(
    _0x242284,
    _0x44b848,
    _0xf9ad28,
    _0x69c3ba,
    _0x490878,
    _0x4ecfa2,
    _0x50182e
  ) {
    return _0xfb8a2e(
      _0xf9ad28 ^ (_0x44b848 | ~_0x69c3ba),
      _0x242284,
      _0x44b848,
      _0x490878,
      _0x4ecfa2,
      _0x50182e
    );
  }
  function _0x4e29a8(_0x473c29, _0x25890c) {
    _0x473c29[_0x25890c >> 0x5] |= 0x80 << _0x25890c % 0x20;
    _0x473c29[(((_0x25890c + 0x40) >>> 0x9) << 0x4) + 0xe] = _0x25890c;
    var _0x2a54b7,
      _0x302e8b,
      _0x8be181,
      _0x508d56,
      _0x158cf2,
      _0x1a905b = 0x67452301,
      _0x1d9321 = -0x10325477,
      _0x5e7f66 = -0x67452302,
      _0x2fed40 = 0x10325476;
    for (
      _0x2a54b7 = 0x0;
      _0x2a54b7 < _0x473c29[a4_0x2add("0x0")];
      _0x2a54b7 += 0x10
    ) {
      _0x302e8b = _0x1a905b;
      _0x8be181 = _0x1d9321;
      _0x508d56 = _0x5e7f66;
      _0x158cf2 = _0x2fed40;
      _0x1a905b = _0x58e3e6(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7],
        0x7,
        -0x28955b88
      );
      _0x2fed40 = _0x58e3e6(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7 + 0x1],
        0xc,
        -0x173848aa
      );
      _0x5e7f66 = _0x58e3e6(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0x2],
        0x11,
        0x242070db
      );
      _0x1d9321 = _0x58e3e6(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7 + 0x3],
        0x16,
        -0x3e423112
      );
      _0x1a905b = _0x58e3e6(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7 + 0x4],
        0x7,
        -0xa83f051
      );
      _0x2fed40 = _0x58e3e6(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7 + 0x5],
        0xc,
        0x4787c62a
      );
      _0x5e7f66 = _0x58e3e6(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0x6],
        0x11,
        -0x57cfb9ed
      );
      _0x1d9321 = _0x58e3e6(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7 + 0x7],
        0x16,
        -0x2b96aff
      );
      _0x1a905b = _0x58e3e6(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7 + 0x8],
        0x7,
        0x698098d8
      );
      _0x2fed40 = _0x58e3e6(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7 + 0x9],
        0xc,
        -0x74bb0851
      );
      _0x5e7f66 = _0x58e3e6(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0xa],
        0x11,
        -0xa44f
      );
      _0x1d9321 = _0x58e3e6(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7 + 0xb],
        0x16,
        -0x76a32842
      );
      _0x1a905b = _0x58e3e6(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7 + 0xc],
        0x7,
        0x6b901122
      );
      _0x2fed40 = _0x58e3e6(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7 + 0xd],
        0xc,
        -0x2678e6d
      );
      _0x5e7f66 = _0x58e3e6(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0xe],
        0x11,
        -0x5986bc72
      );
      _0x1d9321 = _0x58e3e6(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7 + 0xf],
        0x16,
        0x49b40821
      );
      _0x1a905b = _0x3252b2(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7 + 0x1],
        0x5,
        -0x9e1da9e
      );
      _0x2fed40 = _0x3252b2(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7 + 0x6],
        0x9,
        -0x3fbf4cc0
      );
      _0x5e7f66 = _0x3252b2(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0xb],
        0xe,
        0x265e5a51
      );
      _0x1d9321 = _0x3252b2(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7],
        0x14,
        -0x16493856
      );
      _0x1a905b = _0x3252b2(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7 + 0x5],
        0x5,
        -0x29d0efa3
      );
      _0x2fed40 = _0x3252b2(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7 + 0xa],
        0x9,
        0x2441453
      );
      _0x5e7f66 = _0x3252b2(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0xf],
        0xe,
        -0x275e197f
      );
      _0x1d9321 = _0x3252b2(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7 + 0x4],
        0x14,
        -0x182c0438
      );
      _0x1a905b = _0x3252b2(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7 + 0x9],
        0x5,
        0x21e1cde6
      );
      _0x2fed40 = _0x3252b2(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7 + 0xe],
        0x9,
        -0x3cc8f82a
      );
      _0x5e7f66 = _0x3252b2(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0x3],
        0xe,
        -0xb2af279
      );
      _0x1d9321 = _0x3252b2(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7 + 0x8],
        0x14,
        0x455a14ed
      );
      _0x1a905b = _0x3252b2(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7 + 0xd],
        0x5,
        -0x561c16fb
      );
      _0x2fed40 = _0x3252b2(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7 + 0x2],
        0x9,
        -0x3105c08
      );
      _0x5e7f66 = _0x3252b2(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0x7],
        0xe,
        0x676f02d9
      );
      _0x1d9321 = _0x3252b2(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7 + 0xc],
        0x14,
        -0x72d5b376
      );
      _0x1a905b = _0x34bacb(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7 + 0x5],
        0x4,
        -0x5c6be
      );
      _0x2fed40 = _0x34bacb(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7 + 0x8],
        0xb,
        -0x788e097f
      );
      _0x5e7f66 = _0x34bacb(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0xb],
        0x10,
        0x6d9d6122
      );
      _0x1d9321 = _0x34bacb(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7 + 0xe],
        0x17,
        -0x21ac7f4
      );
      _0x1a905b = _0x34bacb(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7 + 0x1],
        0x4,
        -0x5b4115bc
      );
      _0x2fed40 = _0x34bacb(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7 + 0x4],
        0xb,
        0x4bdecfa9
      );
      _0x5e7f66 = _0x34bacb(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0x7],
        0x10,
        -0x944b4a0
      );
      _0x1d9321 = _0x34bacb(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7 + 0xa],
        0x17,
        -0x41404390
      );
      _0x1a905b = _0x34bacb(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7 + 0xd],
        0x4,
        0x289b7ec6
      );
      _0x2fed40 = _0x34bacb(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7],
        0xb,
        -0x155ed806
      );
      _0x5e7f66 = _0x34bacb(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0x3],
        0x10,
        -0x2b10cf7b
      );
      _0x1d9321 = _0x34bacb(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7 + 0x6],
        0x17,
        0x4881d05
      );
      _0x1a905b = _0x34bacb(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7 + 0x9],
        0x4,
        -0x262b2fc7
      );
      _0x2fed40 = _0x34bacb(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7 + 0xc],
        0xb,
        -0x1924661b
      );
      _0x5e7f66 = _0x34bacb(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0xf],
        0x10,
        0x1fa27cf8
      );
      _0x1d9321 = _0x34bacb(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7 + 0x2],
        0x17,
        -0x3b53a99b
      );
      _0x1a905b = _0xa37dff(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7],
        0x6,
        -0xbd6ddbc
      );
      _0x2fed40 = _0xa37dff(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7 + 0x7],
        0xa,
        0x432aff97
      );
      _0x5e7f66 = _0xa37dff(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0xe],
        0xf,
        -0x546bdc59
      );
      _0x1d9321 = _0xa37dff(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7 + 0x5],
        0x15,
        -0x36c5fc7
      );
      _0x1a905b = _0xa37dff(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7 + 0xc],
        0x6,
        0x655b59c3
      );
      _0x2fed40 = _0xa37dff(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7 + 0x3],
        0xa,
        -0x70f3336e
      );
      _0x5e7f66 = _0xa37dff(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0xa],
        0xf,
        -0x100b83
      );
      _0x1d9321 = _0xa37dff(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7 + 0x1],
        0x15,
        -0x7a7ba22f
      );
      _0x1a905b = _0xa37dff(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7 + 0x8],
        0x6,
        0x6fa87e4f
      );
      _0x2fed40 = _0xa37dff(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7 + 0xf],
        0xa,
        -0x1d31920
      );
      _0x5e7f66 = _0xa37dff(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0x6],
        0xf,
        -0x5cfebcec
      );
      _0x1d9321 = _0xa37dff(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7 + 0xd],
        0x15,
        0x4e0811a1
      );
      _0x1a905b = _0xa37dff(
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x473c29[_0x2a54b7 + 0x4],
        0x6,
        -0x8ac817e
      );
      _0x2fed40 = _0xa37dff(
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x5e7f66,
        _0x473c29[_0x2a54b7 + 0xb],
        0xa,
        -0x42c50dcb
      );
      _0x5e7f66 = _0xa37dff(
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x1d9321,
        _0x473c29[_0x2a54b7 + 0x2],
        0xf,
        0x2ad7d2bb
      );
      _0x1d9321 = _0xa37dff(
        _0x1d9321,
        _0x5e7f66,
        _0x2fed40,
        _0x1a905b,
        _0x473c29[_0x2a54b7 + 0x9],
        0x15,
        -0x14792c6f
      );
      _0x1a905b = _0x104185(_0x1a905b, _0x302e8b);
      _0x1d9321 = _0x104185(_0x1d9321, _0x8be181);
      _0x5e7f66 = _0x104185(_0x5e7f66, _0x508d56);
      _0x2fed40 = _0x104185(_0x2fed40, _0x158cf2);
    }
    return [_0x1a905b, _0x1d9321, _0x5e7f66, _0x2fed40];
  }
  function _0x476728(_0x26c168) {
    var _0x2b6f60,
      _0x579f4b = "";
    for (
      _0x2b6f60 = 0x0;
      _0x2b6f60 < _0x26c168[a4_0x2add("0x0")] * 0x20;
      _0x2b6f60 += 0x8
    ) {
      _0x579f4b += String[a4_0x2add("0x1")](
        (_0x26c168[_0x2b6f60 >> 0x5] >>> _0x2b6f60 % 0x20) & 0xff
      );
    }
    return _0x579f4b;
  }
  function _0xeacb3b(_0x8c377) {
    var _0x94fcf8,
      _0x516af4 = [];
    _0x516af4[(_0x8c377[a4_0x2add("0x0")] >> 0x2) - 0x1] = undefined;
    for (
      _0x94fcf8 = 0x0;
      _0x94fcf8 < _0x516af4[a4_0x2add("0x0")];
      _0x94fcf8 += 0x1
    ) {
      _0x516af4[_0x94fcf8] = 0x0;
    }
    for (
      _0x94fcf8 = 0x0;
      _0x94fcf8 < _0x8c377[a4_0x2add("0x0")] * 0x8;
      _0x94fcf8 += 0x8
    ) {
      _0x516af4[_0x94fcf8 >> 0x5] |=
        (_0x8c377["charCodeAt"](_0x94fcf8 / 0x8) & 0xff) << _0x94fcf8 % 0x20;
    }
    return _0x516af4;
  }
  function _0x475268(_0x1a76b8) {
    return _0x476728(
      _0x4e29a8(_0xeacb3b(_0x1a76b8), _0x1a76b8[a4_0x2add("0x0")] * 0x8)
    );
  }
  function _0x4b0768(_0x215f4d, _0x221211) {
    var _0x3ab0c8,
      _0x325d49 = _0xeacb3b(_0x215f4d),
      _0x1d5941 = [],
      _0x431155 = [],
      _0x599a23;
    _0x1d5941[0xf] = _0x431155[0xf] = undefined;
    if (_0x325d49[a4_0x2add("0x0")] > 0x10) {
      _0x325d49 = _0x4e29a8(_0x325d49, _0x215f4d["length"] * 0x8);
    }
    for (_0x3ab0c8 = 0x0; _0x3ab0c8 < 0x10; _0x3ab0c8 += 0x1) {
      _0x1d5941[_0x3ab0c8] = _0x325d49[_0x3ab0c8] ^ 0x36363636;
      _0x431155[_0x3ab0c8] = _0x325d49[_0x3ab0c8] ^ 0x5c5c5c5c;
    }
    _0x599a23 = _0x4e29a8(
      _0x1d5941[a4_0x2add("0x2")](_0xeacb3b(_0x221211)),
      0x200 + _0x221211[a4_0x2add("0x0")] * 0x8
    );
    return _0x476728(_0x4e29a8(_0x431155["concat"](_0x599a23), 0x200 + 0x80));
  }
  function _0x3b0bca(_0x20e58b) {
    var _0x381750 = "0123456789abcdef",
      _0x2c214a = "",
      _0x15e540,
      _0x29c7c4;
    for (_0x29c7c4 = 0x0; _0x29c7c4 < _0x20e58b["length"]; _0x29c7c4 += 0x1) {
      _0x15e540 = _0x20e58b[a4_0x2add("0x3")](_0x29c7c4);
      _0x2c214a +=
        _0x381750[a4_0x2add("0x4")]((_0x15e540 >>> 0x4) & 0xf) +
        _0x381750[a4_0x2add("0x4")](_0x15e540 & 0xf);
    }
    return _0x2c214a;
  }
  function _0x1e2ae9(_0x4b4895) {
    return unescape(encodeURIComponent(_0x4b4895));
  }
  function _0x167bab(_0x32c647) {
    return _0x475268(_0x1e2ae9(_0x32c647));
  }
  function _0x16d0be(_0x44206f) {
    return _0x3b0bca(_0x167bab(_0x44206f));
  }
  function _0x263a96(_0x507cb8, _0x51493a) {
    return _0x4b0768(_0x1e2ae9(_0x507cb8), _0x1e2ae9(_0x51493a));
  }
  function _0x171209(_0x42b52f, _0x11bcaa) {
    return _0x3b0bca(_0x263a96(_0x42b52f, _0x11bcaa));
  }
  function _0x4c1179(_0x398c10, _0x3b9c9f, _0x6804a0) {
    if (!_0x3b9c9f) {
      if (!_0x6804a0) {
        return _0x16d0be(_0x398c10);
      }
      return _0x167bab(_0x398c10);
    }
    if (!_0x6804a0) {
      return _0x171209(_0x3b9c9f, _0x398c10);
    }
    return _0x263a96(_0x3b9c9f, _0x398c10);
  }
  if (typeof define === a4_0x2add("0x5") && define[a4_0x2add("0x6")]) {
    define(function() {
      return _0x4c1179;
    });
  } else {
    _0x2058f0[a4_0x2add("0x7")] = _0x4c1179;
  }
})(this);

var _0x8ca6 = [
  "apiStatus",
  "stringify",
  "frontMovePoint",
  "code",
  "timeoutDataGet",
  "getAPIUrl_JP",
  "cancelGetDataStatue",
  "push",
  "getReqData",
  "LoosePartStart",
  "endUpload",
  "height",
  "weight",
  "frontFaceRect",
  "JS40014",
  "_Events",
  "timeout",
  "unit",
  "public_weight_error",
  "tutorialInfoUrl",
  "responseData",
  "now",
  "userGender",
  "isLite",
  "front",
  "getMeasurementsDataByRes",
  "userId",
  "JS40015",
  "frontProcessedBitmapSize",
  "public_height_error",
  "uploadImageTime",
  "getTime",
  "\x20[code:",
  "<br>",
  "[ID:",
  "getData",
  "JS40013",
  "length",
  "sourceType",
  "userWeight",
  "sideLoose",
  "status",
  "sign",
  "sideFaceRect",
  "gender",
  "side",
  "application/x-www-form-urlencoded;charset=UTF-8",
  "viewState",
  "Reanalysis",
  "trigger",
  "GETSIZESBYPROFILE",
  "readyState",
  "sideProcessedBitmap",
  "traceId",
  "frontResult",
  "language",
  "errorInfo",
  "rotateImage",
  "frontLoose",
  "&lang=",
  "GET",
  "sdkProfileSize",
  "JS40011",
  "frontBitmap",
  "SIDE",
  "body",
  "getAPIUrl_HK",
  "JS40019",
  "40011",
  "width",
  "data",
  "?code=",
  "cuttingFlipImage",
  "sdkImgProcess",
  "sdkImgProcessLite",
  "nodeList",
  "JS40017",
  "BA10003",
  "measureName",
  "apiMsg",
  "appSecret",
  "abort",
  "public_network_interruption",
  "photoSrc",
  "get",
  "sdkDataGet",
  "frontProcessedBitmap",
  "MALE",
  "JS40012",
  "photoType",
  "apiList",
  "content",
  "post",
  "lang",
  "tozQRCodeImg",
  "apiData",
  "onload",
  "name",
  "QRCodeUrl",
  "FRONT",
  "sidePaintLines",
  "currentNodeListIndex",
  "longWaitDataGet",
  "GETPROFILEBYIMG",
  "warnInfo",
  "corpPushUrl",
  "frontPaintLines",
  "Intro",
  "apiVersion",
  "getElementById",
  "appKey",
  "frontAllPoints",
  "getAPIUrl",
  "sideProcessedBitmapSize",
  "nodeId",
  "JS40010",
  "cameraAng",
  "ajax",
  "JS40018",
  "application/json",
  "src",
  "taskId",
  "list",
  "getMsgByCodeList",
  "timestamp",
  "apiCode",
  "signMethod",
  "LoosePartEnd",
  "getMsgByCode",
  "JSON",
  "codeDesc",
  "append",
  "userHeight",
  "getCorpId",
  "v2.8",
  "profile",
  "sideAllPoints",
  "result",
  "md5",
  "FEMALE",
];
(function(_0x28ddae, _0x8ca621) {
  var _0x56da30 = function(_0x238942) {
    while (--_0x238942) {
      _0x28ddae["push"](_0x28ddae["shift"]());
    }
  };
  _0x56da30(++_0x8ca621);
})(_0x8ca6, 0x10f);
var _0x56da = function(_0x28ddae, _0x8ca621) {
  _0x28ddae = _0x28ddae - 0x0;
  var _0x56da30 = _0x8ca6[_0x28ddae];
  return _0x56da30;
};
function tozCommonAjaxError(_0x3f8810, _0x3b6cfd, _0x422fc5) {
  if (_0x3f8810[_0x56da("0x3c")] === 0x4)
    $(_0x56da("0x4a"))[_0x56da("0x3a")](_0x56da("0x18"), [
      {
        statusCode: 0x9c4d,
        statusText:
          tozEventsLang[OneMeasureSDKParameters["language"]][_0x56da("0x2d")],
        detail: _0x3f8810,
      },
    ]);
  else
    _0x3f8810[_0x56da("0x3c")] == 0x0
      ? $(_0x56da("0x4a"))["trigger"](_0x56da("0x18"), [
          {
            statusCode: 0x9c4e,
            statusText:
              tozEventsLang[OneMeasureSDKParameters[_0x56da("0x40")]][
                _0x56da("0x17")
              ],
            detail: _0x3f8810,
          },
        ])
      : $(_0x56da("0x4a"))[_0x56da("0x3a")](_0x56da("0x18"), [
          {
            statusCode: 0x9c4c,
            statusText:
              tozEventsLang[OneMeasureSDKParameters["language"]][
                _0x56da("0x61")
              ],
            detail: _0x3f8810,
          },
        ]);
}
function tozUpdateLanguage(_0x21b9b4) {
  var _0x480a48 = { codes: [] };
  for (var _0x1bed81 in tozEventsLang[_0x21b9b4]) {
    _0x480a48["codes"][_0x56da("0x10")]({ code: _0x1bed81, lang: _0x21b9b4 });
  }
  tozGetMsgByCodeList(_0x480a48, function(_0x2e485d) {
    if (_0x2e485d[_0x56da("0x6")][_0x56da("0xc")] === "0")
      for (var _0x472048 in tozEventsLang[_0x21b9b4]) {
        for (
          var _0x44799e = 0x0;
          _0x44799e <
          _0x2e485d[_0x56da("0x4f")][_0x56da("0x83")][_0x56da("0x2e")];
          _0x44799e++
        ) {
          _0x472048 ===
            _0x2e485d[_0x56da("0x4f")][_0x56da("0x83")][_0x44799e][
              _0x56da("0xc")
            ] &&
            (tozEventsLang[_0x21b9b4][_0x472048] =
              _0x2e485d[_0x56da("0x4f")][_0x56da("0x83")][_0x44799e][
                _0x56da("0x64")
              ]);
        }
      }
    else
      $(_0x56da("0x4a"))["trigger"](_0x56da("0x18"), [
        {
          statusCode: 0x9c51,
          statusText:
            tozEventsLang[OneMeasureSDKParameters[_0x56da("0x40")]][
              _0x56da("0x55")
            ],
        },
      ]);
  });
}
function tozGetAPIUrl() {
  tozGetAPIUrlByAJAX(tozAPIUrl[_0x56da("0x79")], function(
    _0x7ef10e,
    _0x3b0ab5,
    _0x437a24
  ) {
    _0x7ef10e[_0x56da("0x32")] != 0xc8 &&
      tozGetAPIUrlByAJAX(tozAPIUrl[_0x56da("0x4b")], function(
        _0x13f259,
        _0x513a66,
        _0xe86138
      ) {
        _0x13f259["status"] != 0xc8 &&
          tozGetAPIUrlByAJAX(tozAPIUrl[_0x56da("0xe")], function(
            _0x1b09c1,
            _0x3df9cc,
            _0x559c8b
          ) {
            _0x1b09c1[_0x56da("0x32")] != 0xc8 &&
              $(_0x56da("0x4a"))[_0x56da("0x3a")](_0x56da("0x18"), [
                {
                  statusCode: 0x9c53,
                  statusText:
                    tozEventsLang[OneMeasureSDKParameters[_0x56da("0x40")]][
                      _0x56da("0x4c")
                    ],
                },
              ]);
          });
      });
  });
}
function tozGetAPIUrlByAJAX(_0x1cd180, _0x145527) {
  var _0x4cb098 = {
      appKey: OneMeasureSDKParameters[_0x56da("0x77")],
      timestamp: JSON[_0x56da("0xa")](Date[_0x56da("0x1e")]()),
      signMethod: signMethod["md5"],
      apiVersion: _0x56da("0x3"),
    },
    _0x46c2b6 = {
      appKey: _0x4cb098[_0x56da("0x77")],
      timestamp: _0x4cb098[_0x56da("0x85")],
      signMethod: _0x4cb098["signMethod"],
      sign: createSign(_0x4cb098, OneMeasureSDKParameters[_0x56da("0x59")]),
      lang: OneMeasureSDKParameters[_0x56da("0x40")],
      apiVersion: _0x4cb098[_0x56da("0x75")],
    },
    _0x466f74 = $[_0x56da("0x7e")]({
      type: _0x56da("0x65"),
      url: _0x1cd180,
      headers: { "Content-type": _0x56da("0x37"), Accept: _0x56da("0x80") },
      data: _0x46c2b6,
      dataType: _0x56da("0x8a"),
      timeout: tozAPIUrl[_0x56da("0xd")],
      beforeSend: function() {},
      success: function(_0x5aba9e) {
        _0x5aba9e[_0x56da("0xc")] === "0"
          ? ((tozAPIUrl[_0x56da("0xd")] =
              _0x5aba9e[_0x56da("0x4f")][_0x56da("0xd")] * 0x3e8),
            (tozAPIUrl[_0x56da("0x6f")] =
              _0x5aba9e[_0x56da("0x4f")][_0x56da("0x6f")] * 0x3e8),
            (tozAPIUrl[_0x56da("0x6e")] = 0x0),
            (tozAPIUrl[_0x56da("0x54")] = _0x5aba9e["data"]["nodeList"]),
            (tozAPIUrl["isLite"] = tozIsNullOrUndefined(
              _0x5aba9e[_0x56da("0x4f")][_0x56da("0x20")]
            )
              ? 0x0
              : _0x5aba9e[_0x56da("0x4f")][_0x56da("0x20")]))
          : tozGetMsgByCode(_0x5aba9e[_0x56da("0xc")], function(_0x16b508) {
              $("body")[_0x56da("0x3a")](_0x56da("0x18"), [
                {
                  statusCode: 0x9c53,
                  statusText:
                    _0x16b508[_0x56da("0x4f")]["content"] +
                    _0x56da("0x29") +
                    _0x16b508["data"][_0x56da("0xc")] +
                    "]",
                },
              ]);
            });
      },
      complete: function(_0x536cb5, _0x538f58) {
        _0x538f58 === _0x56da("0x19") && _0x466f74["abort"]();
      },
      error: function(_0xb687cf, _0x1d47bc, _0x44b865) {
        _0x145527(_0xb687cf, _0x1d47bc, _0x44b865);
      },
    });
}
function tozGetCorpId() {
  var _0x2c338b = $[_0x56da("0x7e")]({
    type: _0x56da("0x65"),
    url: tozAPIUrl[_0x56da("0x2")],
    headers: { "Content-Type": _0x56da("0x80") },
    data: JSON[_0x56da("0xa")]({
      appKey: OneMeasureSDKParameters["appKey"],
      appSecret: OneMeasureSDKParameters[_0x56da("0x59")],
    }),
    beforeSend: function() {},
    success: function(_0x45d1dd) {
      if (_0x45d1dd["result"][_0x56da("0xc")] === "0") {
        tozAPIUrl[_0x56da("0x6b")] =
          _0x45d1dd[_0x56da("0x4f")][_0x56da("0x72")];
        try {
          new QRCode(
            document[_0x56da("0x76")](_0x56da("0x67")),
            tozAPIUrl[_0x56da("0x6b")]
          );
        } catch (_0x4361c4) {}
      }
    },
    complete: function(_0x474ef9, _0x26a059) {
      _0x26a059 === _0x56da("0x19") && _0x2c338b["abort"]();
    },
    error: function(_0x4db4d9, _0x5f14bb, _0x45dfbd) {
      if (_0x5f14bb === _0x56da("0x19")) {
        $(_0x56da("0x4a"))[_0x56da("0x3a")](_0x56da("0x18"), [
          {
            statusCode: 0x9c4f,
            statusText:
              tozEventsLang[OneMeasureSDKParameters[_0x56da("0x40")]][
                _0x56da("0x24")
              ],
          },
        ]);
        return;
      }
      tozCommonAjaxError(_0x4db4d9, _0x5f14bb, _0x45dfbd);
    },
  });
}
function tozGetMsgByCodeList(_0x16626f, _0x1d936d) {
  var _0xcc3464 = $[_0x56da("0x7e")]({
    type: _0x56da("0x65"),
    url: tozAPIUrl[_0x56da("0x84")],
    headers: { "Content-Type": _0x56da("0x80") },
    data: JSON[_0x56da("0xa")](_0x16626f),
    beforeSend: function() {},
    success: function(_0x36ea66) {
      _0x1d936d(_0x36ea66);
    },
    complete: function(_0x45d081, _0x4f21c9) {
      _0x4f21c9 === _0x56da("0x19") && _0xcc3464[_0x56da("0x5a")]();
    },
    error: function(_0x386509, _0x5a5a2b, _0x30e58e) {
      if (_0x5a5a2b === _0x56da("0x19")) {
        $(_0x56da("0x4a"))[_0x56da("0x3a")](_0x56da("0x18"), [
          {
            statusCode: 0x9c51,
            statusText:
              tozEventsLang[OneMeasureSDKParameters["language"]]["JS40017"],
          },
        ]);
        return;
      }
      tozCommonAjaxError(_0x386509, _0x5a5a2b, _0x30e58e);
    },
  });
}
function tozGetMsgByCode(_0x5b32b6, _0x225a96) {
  var _0xf226a4 = {
      code: _0x5b32b6,
      lang: OneMeasureSDKParameters[_0x56da("0x40")],
    },
    _0x30783f = $[_0x56da("0x7e")]({
      type: _0x56da("0x5d"),
      url:
        tozAPIUrl[_0x56da("0x89")] +
        _0x56da("0x50") +
        _0xf226a4[_0x56da("0xc")] +
        _0x56da("0x44") +
        _0xf226a4[_0x56da("0x66")],
      timeout: tozAPIUrl["timeoutDataGet"],
      success: function(_0x2218dc) {
        _0x225a96(_0x2218dc);
      },
      complete: function(_0x1478cc, _0x3737b6) {
        _0x3737b6 === _0x56da("0x19") && _0x30783f[_0x56da("0x5a")]();
      },
      error: function(_0x2609c0, _0x2a8a86, _0x3472a9) {
        if (_0x2a8a86 === _0x56da("0x19")) {
          $("body")[_0x56da("0x3a")](_0x56da("0x18"), [
            {
              statusCode: 0x9c51,
              statusText:
                tozEventsLang[OneMeasureSDKParameters[_0x56da("0x40")]][
                  _0x56da("0x55")
                ],
            },
          ]);
          return;
        }
        tozCommonAjaxError(_0x2609c0, _0x2a8a86, _0x3472a9);
      },
    });
}
function tozUploadBasicInfoByLite(_0x4a644, _0x120416) {
  var _0x5eec10 = !_0x4a644[_0x56da("0x82")]
      ? {
          appKey: _0x4a644["appKey"],
          timestamp: JSON[_0x56da("0xa")](Date[_0x56da("0x1e")]()),
          signMethod: signMethod[_0x56da("0x7")],
          userGender: Number(_0x4a644[_0x56da("0x35")]),
          userHeight: Number(_0x4a644[_0x56da("0x14")]),
          userWeight: Number(_0x4a644[_0x56da("0x15")]),
          sourceType: 0xa,
          userId: _0x4a644[_0x56da("0x23")],
          nodeId: tozAPIUrl["nodeList"][tozAPIUrl[_0x56da("0x6e")]]
            ? tozAPIUrl["nodeList"][tozAPIUrl[_0x56da("0x6e")]][_0x56da("0x7b")]
            : null,
          unit: _0x4a644[_0x56da("0x1a")],
          measureName: _0x4a644[_0x56da("0x6a")],
        }
      : {
          appKey: _0x4a644[_0x56da("0x77")],
          timestamp: JSON[_0x56da("0xa")](Date[_0x56da("0x1e")]()),
          signMethod: signMethod[_0x56da("0x7")],
          taskId: _0x4a644[_0x56da("0x82")],
          userGender: Number(_0x4a644[_0x56da("0x35")]),
          userHeight: Number(_0x4a644[_0x56da("0x14")]),
          userWeight: Number(_0x4a644[_0x56da("0x15")]),
          sourceType: 0xa,
          userId: _0x4a644[_0x56da("0x23")],
          nodeId: tozAPIUrl[_0x56da("0x54")][tozAPIUrl[_0x56da("0x6e")]]
            ? tozAPIUrl["nodeList"][tozAPIUrl[_0x56da("0x6e")]][_0x56da("0x7b")]
            : null,
          unit: _0x4a644[_0x56da("0x1a")],
          measureName: _0x4a644["name"],
        },
    _0x37b5e6 = new FormData();
  _0x4a644[_0x56da("0x82")] &&
    _0x37b5e6["append"]("taskId", _0x5eec10[_0x56da("0x82")]);
  _0x37b5e6[_0x56da("0x0")](_0x56da("0x77"), _0x5eec10["appKey"]),
    _0x37b5e6[_0x56da("0x0")](_0x56da("0x85"), _0x5eec10[_0x56da("0x85")]),
    _0x37b5e6[_0x56da("0x0")](_0x56da("0x87"), _0x5eec10[_0x56da("0x87")]),
    _0x37b5e6[_0x56da("0x0")](
      _0x56da("0x33"),
      createSign(_0x5eec10, _0x4a644[_0x56da("0x59")])
    ),
    _0x37b5e6[_0x56da("0x0")](_0x56da("0x66"), _0x4a644[_0x56da("0x40")]),
    _0x37b5e6[_0x56da("0x0")](_0x56da("0x1f"), _0x5eec10[_0x56da("0x1f")]),
    _0x37b5e6[_0x56da("0x0")](_0x56da("0x1"), _0x5eec10["userHeight"]),
    _0x37b5e6[_0x56da("0x0")]("userWeight", _0x5eec10[_0x56da("0x30")]),
    _0x37b5e6[_0x56da("0x0")](_0x56da("0x2f"), _0x5eec10[_0x56da("0x2f")]),
    _0x37b5e6[_0x56da("0x0")](_0x56da("0x23"), _0x5eec10["userId"]),
    _0x37b5e6[_0x56da("0x0")](_0x56da("0x7b"), _0x5eec10[_0x56da("0x7b")]),
    _0x37b5e6[_0x56da("0x0")](_0x56da("0x1a"), _0x5eec10[_0x56da("0x1a")]),
    _0x37b5e6["append"]("measureName", _0x5eec10["measureName"]);
  var _0x5ddd22 = $[_0x56da("0x7e")]({
    type: _0x56da("0x65"),
    url:
      tozAPIUrl[_0x56da("0x54")][tozAPIUrl["currentNodeListIndex"]]["apiList"][
        _0x56da("0x53")
      ],
    processData: ![],
    contentType: ![],
    data: _0x37b5e6,
    timeout: tozAPIUrl[_0x56da("0x27")],
    success: function(_0x4ce93c) {
      _0x4ce93c[_0x56da("0xc")] === "0"
        ? _0x120416({
            sdkResponse: {
              serverStatusCode: _0x4ce93c[_0x56da("0xc")],
              serverStatusText: _0x4ce93c["codeDesc"],
            },
            taskId: _0x4ce93c[_0x56da("0x4f")][_0x56da("0x82")],
            processData: {
              imageProcessFeedback: {
                frontImageErrors: { content: [] },
                frontImageWarns: { content: [] },
                sideImageErrors: { content: [] },
                sideImageWarns: { content: [] },
              },
            },
          })
        : _0x120416({
            sdkResponse: {
              serverStatusCode: _0x4ce93c[_0x56da("0xc")],
              serverStatusText: _0x4ce93c[_0x56da("0x8b")],
            },
            taskId: null,
            processData: {
              imageProcessFeedback: {
                frontImageErrors: { content: [] },
                frontImageWarns: { content: [] },
                sideImageErrors: { content: [] },
                sideImageWarns: { content: [] },
              },
            },
          });
    },
    complete: function(_0x45d78f, _0x347387) {
      _0x347387 === _0x56da("0x19") && _0x5ddd22[_0x56da("0x5a")]();
    },
    error: function(_0x7544b6, _0x326bca, _0x277d9b) {
      _0x120416({
        sdkResponse: {
          serverStatusCode: _0x326bca,
          serverStatusText: "timeout",
        },
        taskId: null,
        processData: {
          imageProcessFeedback: {
            frontImageErrors: { content: [] },
            frontImageWarns: { content: [] },
            sideImageErrors: { content: [] },
            sideImageWarns: { content: [] },
          },
        },
      });
    },
  });
}
function tozUploadImg(
  _0x511198,
  _0x14b328,
  _0x475e23,
  _0x1e0d0a,
  _0x2ab3d0,
  _0x24728a
) {
  var _0x4c783a = !(
      _0x511198[_0x56da("0x35")] != Gender[_0x56da("0x60")] &&
      _0x511198["gender"] != Gender[_0x56da("0x8")]
    ),
    _0x450f3e =
      _0x511198["height"] >= 0x5a && _0x511198[_0x56da("0x14")] <= 0x12c,
    _0x4356da =
      _0x511198["weight"] /
      ((_0x511198[_0x56da("0x14")] * _0x511198[_0x56da("0x14")]) / 0x2710),
    _0x4de592 = _0x4356da >= 0xe && _0x4356da <= 0x2d,
    _0x29499a = !(_0x475e23 != 0x1 && _0x475e23 != 0x2);
  if (!_0x450f3e) {
    tozGetMsgByCode("BA10003", function(_0x267e30) {
      _0x24728a({
        sdkResponse: {
          serverStatusCode: _0x267e30[_0x56da("0x4f")][_0x56da("0xc")],
          serverStatusText:
            tozLanguage[_0x511198[_0x56da("0x40")]][_0x56da("0x26")],
        },
        taskId: null,
        processData: {
          imageProcessFeedback: {
            frontImageErrors: { content: [] },
            frontImageWarns: { content: [] },
            sideImageErrors: { content: [] },
            sideImageWarns: { content: [] },
          },
        },
      });
    });
    return;
  }
  if (!_0x4de592) {
    tozGetMsgByCode(_0x56da("0x56"), function(_0x8ac9a4) {
      _0x24728a({
        sdkResponse: {
          serverStatusCode: _0x8ac9a4[_0x56da("0x4f")]["code"],
          serverStatusText:
            tozLanguage[_0x511198[_0x56da("0x40")]][_0x56da("0x1b")],
        },
        taskId: null,
        processData: {
          imageProcessFeedback: {
            frontImageErrors: { content: [] },
            frontImageWarns: { content: [] },
            sideImageErrors: { content: [] },
            sideImageWarns: { content: [] },
          },
        },
      });
    });
    return;
  }
  if (!(_0x4c783a && _0x29499a)) {
    tozGetMsgByCode(_0x56da("0x56"), function(_0x577376) {
      _0x24728a({
        sdkResponse: {
          serverStatusCode: _0x577376[_0x56da("0x4f")]["code"],
          serverStatusText: _0x577376[_0x56da("0x4f")]["content"],
        },
        taskId: null,
        processData: {
          imageProcessFeedback: {
            frontImageErrors: { content: [] },
            frontImageWarns: { content: [] },
            sideImageErrors: { content: [] },
            sideImageWarns: { content: [] },
          },
        },
      });
    });
    return;
  }
  var _0x585bb0 = new Image();
  (_0x585bb0[_0x56da("0x69")] = function() {
    if (_0x585bb0[_0x56da("0x4e")] * _0x585bb0[_0x56da("0x14")] > 0x1312d00) {
      tozGetMsgByCode("TA40001", function(_0x3664ab) {
        _0x24728a({
          sdkResponse: {
            serverStatusCode: _0x3664ab[_0x56da("0x4f")][_0x56da("0xc")],
            serverStatusText: _0x3664ab["data"]["content"],
          },
          taskId: null,
          processData: {
            imageProcessFeedback: {
              frontImageErrors: { content: [] },
              frontImageWarns: { content: [] },
              sideImageErrors: { content: [] },
              sideImageWarns: { content: [] },
            },
          },
        });
      });
      return;
    }
    var _0x209551 = !_0x511198[_0x56da("0x82")]
        ? {
            appKey: _0x511198["appKey"],
            timestamp: JSON[_0x56da("0xa")](Date[_0x56da("0x1e")]()),
            signMethod: signMethod[_0x56da("0x7")],
            cameraAng: JSON[_0x56da("0xa")](_0x1e0d0a),
            userGender: Number(_0x511198[_0x56da("0x35")]),
            userHeight: Number(_0x511198[_0x56da("0x14")]),
            userWeight: Number(_0x511198[_0x56da("0x15")]),
            photoType: _0x475e23,
            sourceType: 0xa,
            userId: _0x511198["userId"],
            nodeId: tozAPIUrl[_0x56da("0x54")][
              tozAPIUrl["currentNodeListIndex"]
            ]
              ? tozAPIUrl[_0x56da("0x54")][tozAPIUrl[_0x56da("0x6e")]][
                  _0x56da("0x7b")
                ]
              : null,
            unit: _0x511198[_0x56da("0x1a")],
            measureName: _0x511198[_0x56da("0x6a")],
          }
        : {
            appKey: _0x511198[_0x56da("0x77")],
            timestamp: JSON[_0x56da("0xa")](Date["now"]()),
            signMethod: signMethod[_0x56da("0x7")],
            cameraAng: JSON["stringify"](_0x1e0d0a),
            taskId: _0x511198[_0x56da("0x82")],
            userGender: Number(_0x511198[_0x56da("0x35")]),
            userHeight: Number(_0x511198[_0x56da("0x14")]),
            userWeight: Number(_0x511198[_0x56da("0x15")]),
            photoType: _0x475e23,
            sourceType: 0xa,
            userId: _0x511198[_0x56da("0x23")],
            nodeId: tozAPIUrl["nodeList"][tozAPIUrl[_0x56da("0x6e")]]
              ? tozAPIUrl[_0x56da("0x54")][tozAPIUrl[_0x56da("0x6e")]]["nodeId"]
              : null,
            unit: _0x511198[_0x56da("0x1a")],
            measureName: _0x511198["name"],
          },
      _0x245aa8 = new FormData();
    _0x2ab3d0 &&
      _0x245aa8[_0x56da("0x0")]("taskId", _0x209551[_0x56da("0x82")]);
    _0x245aa8[_0x56da("0x0")](
      "sign",
      createSign(_0x209551, _0x511198[_0x56da("0x59")])
    ),
      _0x245aa8[_0x56da("0x0")](
        _0x56da("0x5c"),
        tozUploadImgDataProc["dataURLtoBlob"](_0x14b328)
      ),
      _0x245aa8["append"](_0x56da("0x66"), _0x511198[_0x56da("0x40")]),
      _0x245aa8[_0x56da("0x0")](_0x56da("0x77"), _0x209551[_0x56da("0x77")]),
      _0x245aa8[_0x56da("0x0")]("timestamp", _0x209551[_0x56da("0x85")]),
      _0x245aa8[_0x56da("0x0")](_0x56da("0x87"), _0x209551[_0x56da("0x87")]),
      _0x245aa8["append"](_0x56da("0x1f"), _0x209551[_0x56da("0x1f")]),
      _0x245aa8[_0x56da("0x0")](_0x56da("0x1"), _0x209551["userHeight"]),
      _0x245aa8[_0x56da("0x0")]("userWeight", _0x209551["userWeight"]),
      _0x245aa8[_0x56da("0x0")](_0x56da("0x62"), _0x209551[_0x56da("0x62")]),
      _0x245aa8[_0x56da("0x0")]("sourceType", _0x209551[_0x56da("0x2f")]),
      _0x245aa8["append"](_0x56da("0x23"), _0x209551["userId"]),
      _0x245aa8[_0x56da("0x0")](_0x56da("0x7d"), _0x209551["cameraAng"]),
      _0x245aa8["append"](_0x56da("0x7b"), _0x209551[_0x56da("0x7b")]),
      _0x245aa8[_0x56da("0x0")](_0x56da("0x1a"), _0x209551["unit"]),
      _0x245aa8[_0x56da("0x0")]("measureName", _0x209551[_0x56da("0x57")]);
    function _0x483192(_0x2a8904, _0x329feb, _0x48d146) {
      if (_0x329feb === _0x56da("0x19")) {
        if (tozAPIUrl[_0x56da("0x20")] == 0x1)
          tozUploadBasicInfoByLite(_0x511198, _0x24728a);
        else {
          tozSecImgProfController[_0x56da("0x13")](function() {
            (tozSecImgProfController[_0x56da("0x3f")] = {
              sdkResponse: {
                serverStatusCode: "40011",
                serverStatusText:
                  tozEventsLang[OneMeasureSDKParameters["language"]]["JS40011"],
              },
            }),
              $(_0x56da("0x4a"))["trigger"](_0x56da("0x18"), [
                {
                  statusCode: 0x9c4b,
                  statusText:
                    tozEventsLang[OneMeasureSDKParameters[_0x56da("0x40")]][
                      "JS40011"
                    ],
                },
              ]);
          }, tozAdjustViewController[_0x56da("0x38")][_0x56da("0x39")]);
          return;
        }
      }
      tozAPIUrl["currentNodeListIndex"]++,
        tozAPIUrl[_0x56da("0x6e")] < tozAPIUrl[_0x56da("0x54")][_0x56da("0x2e")]
          ? tozUploadImgByAJAX(_0x245aa8, _0x24728a, _0x483192)
          : ((tozAPIUrl[_0x56da("0x6e")] = 0x0),
            tozSecImgProfController[_0x56da("0x13")](function() {
              _0x24728a({
                sdkResponse: {
                  serverStatusCode: _0x56da("0x2d"),
                  serverStatusText:
                    tozLanguage[OneMeasureSDKParameters["language"]][
                      _0x56da("0x5b")
                    ],
                },
                taskId: null,
                processData: {
                  imageProcessFeedback: {
                    frontImageErrors: { content: [] },
                    frontImageWarns: { content: [] },
                    sideImageErrors: { content: [] },
                    sideImageWarns: { content: [] },
                  },
                },
              });
            }, tozAdjustViewController[_0x56da("0x38")][_0x56da("0x39")]));
    }
    tozUploadImgByAJAX(_0x245aa8, _0x24728a, _0x483192);
  }),
    (_0x585bb0[_0x56da("0x81")] = _0x14b328);
}
function tozUploadImgByAJAX(_0x51037c, _0x413b12, _0x545524) {
  if (
    tozIsNullOrUndefined(
      tozAPIUrl["nodeList"][tozAPIUrl["currentNodeListIndex"]]
    ) ||
    tozIsNullOrUndefined(
      tozAPIUrl[_0x56da("0x54")][tozAPIUrl[_0x56da("0x6e")]]["apiList"]
    ) ||
    tozIsNullOrUndefined(
      tozAPIUrl[_0x56da("0x54")][tozAPIUrl["currentNodeListIndex"]][
        _0x56da("0x63")
      ][_0x56da("0x52")]
    )
  ) {
    $("body")["trigger"](_0x56da("0x18"), [
      {
        statusCode: 0x9c53,
        statusText:
          tozEventsLang[OneMeasureSDKParameters[_0x56da("0x40")]]["JS40019"],
      },
    ]);
    return;
  }
  var _0x5e55f5 = $["ajax"]({
    type: _0x56da("0x65"),
    url:
      tozAPIUrl[_0x56da("0x54")][tozAPIUrl["currentNodeListIndex"]][
        _0x56da("0x63")
      ][_0x56da("0x52")],
    processData: ![],
    contentType: ![],
    data: _0x51037c,
    timeout: tozAPIUrl[_0x56da("0x27")],
    success: function(_0xe3a27d) {
      if (_0xe3a27d[_0x56da("0xc")] != "0")
        _0x413b12({
          sdkResponse: {
            serverStatusCode: _0xe3a27d["code"],
            serverStatusText: _0xe3a27d[_0x56da("0x8b")],
          },
          taskId: null,
          processData: {
            imageProcessFeedback: {
              frontImageErrors: { content: [] },
              frontImageWarns: { content: [] },
              sideImageErrors: { content: [] },
              sideImageWarns: { content: [] },
            },
          },
        });
      else {
        if (
          _0xe3a27d[_0x56da("0xc")] === "0" &&
          (_0xe3a27d["data"][_0x56da("0x41")] ||
            _0xe3a27d[_0x56da("0x4f")][_0x56da("0x71")])
        ) {
          var _0x132358 = { content: [], id: [] },
            _0x3aeee1 = { content: [], id: [] },
            _0x5975a4 = { content: [], id: [] },
            _0x491ad7 = { codes: [] };
          if (_0xe3a27d[_0x56da("0x4f")][_0x56da("0x41")])
            for (
              var _0x4989b2 = 0x0;
              _0x4989b2 <
              _0xe3a27d[_0x56da("0x4f")][_0x56da("0x41")][_0x56da("0x2e")];
              _0x4989b2++
            ) {
              _0x491ad7["codes"][_0x56da("0x10")]({
                code:
                  _0xe3a27d[_0x56da("0x4f")][_0x56da("0x41")][_0x4989b2]["ID"],
                lang: OneMeasureSDKParameters["language"],
              });
            }
          if (_0xe3a27d[_0x56da("0x4f")][_0x56da("0x71")])
            for (
              var _0x4989b2 = 0x0;
              _0x4989b2 <
              _0xe3a27d[_0x56da("0x4f")][_0x56da("0x71")][_0x56da("0x2e")];
              _0x4989b2++
            ) {
              _0x491ad7["codes"]["push"]({
                code:
                  _0xe3a27d[_0x56da("0x4f")][_0x56da("0x71")][_0x4989b2]["ID"],
                lang: OneMeasureSDKParameters[_0x56da("0x40")],
              });
            }
          tozGetMsgByCodeList(_0x491ad7, function(_0x5a6acd) {
            if (_0x5a6acd["result"][_0x56da("0xc")] === "0") {
              var _0x1765c3 = {};
              for (
                var _0x1f7e2d = 0x0;
                _0x1f7e2d <
                _0x5a6acd[_0x56da("0x4f")][_0x56da("0x83")][_0x56da("0x2e")];
                _0x1f7e2d++
              ) {
                _0x1765c3[
                  _0x5a6acd[_0x56da("0x4f")][_0x56da("0x83")][_0x1f7e2d]["code"]
                ] = _0x5a6acd[_0x56da("0x4f")]["list"][_0x1f7e2d]["content"];
              }
              if (_0xe3a27d[_0x56da("0x4f")][_0x56da("0x41")])
                for (
                  var _0x1f7e2d = 0x0;
                  _0x1f7e2d <
                  _0xe3a27d[_0x56da("0x4f")][_0x56da("0x41")]["length"];
                  _0x1f7e2d++
                ) {
                  _0x3aeee1["id"][_0x56da("0x10")](
                    _0xe3a27d[_0x56da("0x4f")][_0x56da("0x41")][_0x1f7e2d]["ID"]
                  ),
                    _0x3aeee1["content"][_0x56da("0x10")](
                      _0x1765c3[
                        _0xe3a27d[_0x56da("0x4f")][_0x56da("0x41")][_0x1f7e2d][
                          "ID"
                        ]
                      ]
                    );
                }
              if (_0xe3a27d[_0x56da("0x4f")][_0x56da("0x71")])
                for (
                  var _0x1f7e2d = 0x0;
                  _0x1f7e2d <
                  _0xe3a27d[_0x56da("0x4f")][_0x56da("0x71")]["length"];
                  _0x1f7e2d++
                ) {
                  _0x5975a4["id"][_0x56da("0x10")](
                    _0xe3a27d[_0x56da("0x4f")][_0x56da("0x71")][_0x1f7e2d]["ID"]
                  ),
                    _0x5975a4[_0x56da("0x64")][_0x56da("0x10")](
                      _0x1765c3[
                        _0xe3a27d[_0x56da("0x4f")][_0x56da("0x71")][_0x1f7e2d][
                          "ID"
                        ]
                      ]
                    );
                }
            } else {
              if (_0xe3a27d[_0x56da("0x4f")]["errorInfo"])
                for (
                  var _0x1f7e2d = 0x0;
                  _0x1f7e2d <
                  _0xe3a27d[_0x56da("0x4f")]["errorInfo"][_0x56da("0x2e")];
                  _0x1f7e2d++
                ) {
                  _0x3aeee1["id"][_0x56da("0x10")](
                    _0xe3a27d[_0x56da("0x4f")][_0x56da("0x41")][_0x1f7e2d]["ID"]
                  ),
                    _0x3aeee1[_0x56da("0x64")]["push"](
                      _0xe3a27d[_0x56da("0x4f")][_0x56da("0x41")][_0x1f7e2d][
                        _0x56da("0x74")
                      ]
                    );
                }
              if (_0xe3a27d["data"][_0x56da("0x71")])
                for (
                  var _0x1f7e2d = 0x0;
                  _0x1f7e2d <
                  _0xe3a27d[_0x56da("0x4f")][_0x56da("0x71")][_0x56da("0x2e")];
                  _0x1f7e2d++
                ) {
                  _0x5975a4["id"][_0x56da("0x10")](
                    _0xe3a27d["data"][_0x56da("0x71")][_0x1f7e2d]["ID"]
                  ),
                    _0x5975a4[_0x56da("0x64")][_0x56da("0x10")](
                      _0xe3a27d["data"][_0x56da("0x71")][_0x1f7e2d][
                        _0x56da("0x74")
                      ]
                    );
                }
            }
            _0x413b12({
              sdkResponse: {
                serverStatusCode: _0xe3a27d[_0x56da("0xc")],
                serverStatusText: _0xe3a27d[_0x56da("0x8b")],
              },
              taskId:
                _0xe3a27d[_0x56da("0x4f")]["taskId"] != ""
                  ? _0xe3a27d[_0x56da("0x4f")][_0x56da("0x82")]
                  : null,
              processData: {
                imageProcessFeedback: {
                  frontImageErrors:
                    Number(_0x51037c[_0x56da("0x5d")](_0x56da("0x62"))) ===
                    PhotoType[_0x56da("0x6c")]
                      ? _0x3aeee1
                      : _0x132358,
                  frontImageWarns:
                    Number(_0x51037c[_0x56da("0x5d")]("photoType")) ===
                    PhotoType[_0x56da("0x6c")]
                      ? _0x5975a4
                      : _0x132358,
                  sideImageErrors:
                    Number(_0x51037c[_0x56da("0x5d")](_0x56da("0x62"))) ===
                    PhotoType[_0x56da("0x49")]
                      ? _0x3aeee1
                      : _0x132358,
                  sideImageWarns:
                    Number(_0x51037c[_0x56da("0x5d")](_0x56da("0x62"))) ===
                    PhotoType[_0x56da("0x49")]
                      ? _0x5975a4
                      : _0x132358,
                },
              },
            });
          });
        } else
          _0x413b12({
            sdkResponse: {
              serverStatusCode: _0xe3a27d[_0x56da("0xc")],
              serverStatusText: _0xe3a27d[_0x56da("0x8b")],
            },
            taskId: _0xe3a27d["data"][_0x56da("0x82")],
            processData: {
              imageProcessFeedback: {
                frontImageErrors: { content: [] },
                frontImageWarns: { content: [] },
                sideImageErrors: { content: [] },
                sideImageWarns: { content: [] },
              },
            },
          });
      }
    },
    complete: function(_0x270209, _0x3b7952) {
      _0x3b7952 === _0x56da("0x19") && _0x5e55f5[_0x56da("0x5a")]();
    },
    error: function(_0x827e97, _0xa11a98, _0x529c3f) {
      _0x545524(_0x827e97, _0xa11a98, _0x529c3f);
    },
  });
}
function tozLoopAjax(_0x422a25, _0x44f211, _0x48dc44, _0xda75ac, _0x339285) {
  var _0x43b43f,
    _0x1afd40 = $[_0x56da("0x7e")]({
      async: ![],
      type: _0x56da("0x65"),
      url: _0x422a25,
      headers: { "Content-type": _0x56da("0x37"), Accept: _0x56da("0x80") },
      data: _0x44f211,
      dataType: _0x56da("0x8a"),
      timeout: tozAPIUrl[_0x56da("0xd")],
      beforeSend: function() {
        _0x43b43f = new Date();
      },
      success: function(_0x230fbd) {
        var _0x4c3fe0 = _0x48dc44(_0x230fbd);
        if (!_0x4c3fe0) {
          if (
            new Date()[_0x56da("0x28")]() - _0xda75ac["getTime"]() >
            tozAPIUrl[_0x56da("0xd")]
          ) {
            $("body")["trigger"]("_Events", [
              {
                statusCode: 0x9c4b,
                statusText:
                  tozEventsLang[OneMeasureSDKParameters[_0x56da("0x40")]][
                    "JS40011"
                  ],
              },
            ]);
            return;
          }
          new Date()["getTime"]() - _0x339285[_0x56da("0x28")]() >
            tozAPIUrl[_0x56da("0x6f")] &&
            ((_0x339285 = new Date()),
            $("body")[_0x56da("0x3a")](_0x56da("0x18"), [
              {
                statusCode: 0x9c52,
                statusText:
                  tozEventsLang[OneMeasureSDKParameters["language"]][
                    _0x56da("0x7f")
                  ],
              },
            ]));
          if (tozAPIUrl[_0x56da("0xf")] === !![]) {
            tozAPIUrl[_0x56da("0xf")] = ![];
            return;
          }
          _0x43b43f[_0x56da("0x28")]() - new Date()[_0x56da("0x28")]() >
          tozAPIUrl["intervalTime"]
            ? tozLoopAjax(_0x422a25, _0x44f211, _0x48dc44, _0xda75ac, _0x339285)
            : setTimeout(function() {
                tozLoopAjax(
                  _0x422a25,
                  _0x44f211,
                  _0x48dc44,
                  _0xda75ac,
                  _0x339285
                );
              }, 0x1f4);
        }
      },
      complete: function(_0x5b7db7, _0xbf2c34) {
        _0xbf2c34 === _0x56da("0x19") && _0x1afd40["abort"]();
      },
      error: function(_0x39834b, _0x63cb83, _0x4c907a) {
        tozSecImgProfController[_0x56da("0x13")](function() {
          if (_0x63cb83 === _0x56da("0x19")) {
            (tozSecImgProfController[_0x56da("0x3f")] = {
              sdkResponse: {
                serverStatusCode: _0x56da("0x4d"),
                serverStatusText:
                  tozEventsLang[OneMeasureSDKParameters[_0x56da("0x40")]][
                    _0x56da("0x47")
                  ],
              },
            }),
              $("body")[_0x56da("0x3a")]("_Events", [
                {
                  statusCode: 0x9c4b,
                  statusText:
                    tozEventsLang[OneMeasureSDKParameters[_0x56da("0x40")]][
                      _0x56da("0x47")
                    ],
                },
              ]);
            return;
          }
          tozCommonAjaxError(_0x39834b, _0x63cb83, _0x4c907a);
        }, tozAdjustViewController["viewState"][_0x56da("0x39")]);
      },
    });
}
function tozGetProfile(_0x34ef57, _0x346a72) {
  if (
    tozIsNullOrUndefined(
      tozAPIUrl[_0x56da("0x54")][tozAPIUrl["currentNodeListIndex"]]
    ) ||
    tozIsNullOrUndefined(
      tozAPIUrl[_0x56da("0x54")][tozAPIUrl[_0x56da("0x6e")]][_0x56da("0x63")]
    ) ||
    tozIsNullOrUndefined(
      tozAPIUrl[_0x56da("0x54")][tozAPIUrl[_0x56da("0x6e")]][_0x56da("0x63")][
        _0x56da("0x5e")
      ]
    )
  ) {
    $(_0x56da("0x4a"))[_0x56da("0x3a")](_0x56da("0x18"), [
      {
        statusCode: 0x9c53,
        statusText:
          tozEventsLang[OneMeasureSDKParameters[_0x56da("0x40")]]["JS40019"],
      },
    ]);
    return;
  }
  var _0x1306f6 = {
      taskId: _0x34ef57,
      dataType: tozAPIDataType[_0x56da("0x70")],
      appKey: OneMeasureSDKParameters[_0x56da("0x77")],
      sizeLang: OneMeasureSDKParameters[_0x56da("0x40")],
    },
    _0x3a48be = new Date(),
    _0x48fb45 = new Date();
  tozLoopAjax(
    tozAPIUrl["nodeList"][tozAPIUrl[_0x56da("0x6e")]]["apiList"][
      _0x56da("0x5e")
    ],
    _0x1306f6,
    function(_0x1d5288) {
      if (_0x1d5288[_0x56da("0xc")] != "0")
        return (
          _0x346a72({
            sdkResponse: {
              serverStatusCode: _0x1d5288["code"],
              serverStatusText: _0x1d5288[_0x56da("0x8b")],
            },
            profile2ModelData: null,
          }),
          !![]
        );
      if (
        _0x1d5288[_0x56da("0xc")] === "0" &&
        _0x1d5288[_0x56da("0x4f")][_0x56da("0x32")] === 0x1
      ) {
        if (_0x1d5288[_0x56da("0x4f")][_0x56da("0x68")][_0x56da("0x9")] === 0x0)
          _0x1d5288[_0x56da("0x4f")][_0x56da("0x68")]["apiCode"]
            ? tozGetMsgByCode(
                _0x1d5288[_0x56da("0x4f")][_0x56da("0x68")][_0x56da("0x86")],
                function(_0x2afe77) {
                  _0x346a72({
                    sdkResponse: {
                      serverStatusCode:
                        _0x1d5288[_0x56da("0x4f")][_0x56da("0x68")][
                          _0x56da("0x86")
                        ],
                      serverStatusText:
                        _0x2afe77[_0x56da("0x4f")][_0x56da("0x64")] +
                        _0x56da("0x2a") +
                        "[" +
                        _0x1d5288[_0x56da("0x4f")][_0x56da("0x68")][
                          _0x56da("0x86")
                        ] +
                        ":" +
                        _0x1d5288[_0x56da("0x4f")][_0x56da("0x68")]["traceId"] +
                        "]",
                    },
                    profile2ModelData: null,
                  });
                }
              )
            : _0x346a72({
                sdkResponse: {
                  serverStatusCode: _0x1d5288["code"],
                  serverStatusText:
                    _0x1d5288[_0x56da("0x8b")] +
                    _0x56da("0x2b") +
                    _0x1d5288["data"][_0x56da("0x68")][_0x56da("0x3e")] +
                    "]",
                },
                profile2ModelData: null,
              });
        else
          _0x1d5288[_0x56da("0x4f")]["apiData"][_0x56da("0x9")] === 0x1 &&
            tozPretrProfileData(_0x1d5288, function(_0x5451a5) {
              _0x346a72({
                sdkResponse: {
                  serverStatusCode: _0x1d5288[_0x56da("0xc")],
                  serverStatusText: _0x1d5288[_0x56da("0x8b")],
                },
                profile2ModelData: _0x5451a5,
              });
            });
        return !![];
      }
      return ![];
    },
    _0x3a48be,
    _0x48fb45
  );
}
function tozPretrProfileData(_0x3b4fe8, _0x2aabbf) {
  imageProc["rotateImage"](OneMeasureSDKParameters[_0x56da("0x48")], function(
    _0x44de04
  ) {
    imageProc[_0x56da("0x42")](OneMeasureSDKParameters["sideBitmap"], function(
      _0x4f4f65
    ) {
      imageProc[_0x56da("0x51")](
        _0x3b4fe8[_0x56da("0x4f")][_0x56da("0x68")][_0x56da("0x1d")][
          _0x56da("0x4")
        ][_0x56da("0x21")],
        _0x44de04,
        tozFrontImage,
        function() {
          profile2ModelDataProc[_0x56da("0x2c")](_0x3b4fe8, _0x2aabbf);
        }
      ),
        imageProc[_0x56da("0x51")](
          _0x3b4fe8[_0x56da("0x4f")][_0x56da("0x68")][_0x56da("0x1d")][
            "profile"
          ][_0x56da("0x36")],
          _0x4f4f65,
          tozSideImage,
          function() {
            profile2ModelDataProc[_0x56da("0x2c")](_0x3b4fe8, _0x2aabbf);
          }
        );
    });
  });
}
function tozGetLooseColor(_0x406114) {
  if (_0x406114 === null) return [];
  var _0x27fd85 = [];
  for (
    var _0x1ca2c5 = 0x0;
    _0x1ca2c5 < _0x406114[_0x56da("0x2e")];
    _0x1ca2c5++
  ) {
    _0x27fd85["push"]([
      _0x406114[_0x1ca2c5][_0x56da("0x12")],
      _0x406114[_0x1ca2c5][_0x56da("0x88")],
    ]);
  }
  return _0x27fd85;
}
function tozDrawByProfile2ModelData(_0xab8b4c, _0x86b29b) {
  var _0x2eed82 = [];
  for (
    var _0x4ae033 = 0x0;
    _0x4ae033 < _0xab8b4c[_0x56da("0x73")][_0x56da("0x2e")];
    _0x4ae033++
  ) {
    _0x2eed82["push"](_0xab8b4c[_0x56da("0x73")][_0x4ae033]);
  }
  for (
    var _0x4ae033 = 0x0;
    _0x4ae033 < _0xab8b4c[_0x56da("0x6d")][_0x56da("0x2e")];
    _0x4ae033++
  ) {
    _0x2eed82[_0x56da("0x10")](_0xab8b4c[_0x56da("0x6d")][_0x4ae033]);
  }
  var _0x35a0f2 = {
    id: "null",
    dir: ["f", "s"],
    pts: { f: _0xab8b4c[_0x56da("0x78")], s: _0xab8b4c[_0x56da("0x5")] },
    url: { f: tozFrontMasaic, s: tozSideMasaic },
    movPxIdx: { f: _0xab8b4c[_0x56da("0xb")], s: _0xab8b4c["sideMovePoint"] },
    COLOR: {
      f: tozGetLooseColor(_0xab8b4c[_0x56da("0x43")]),
      s: tozGetLooseColor(_0xab8b4c[_0x56da("0x31")]),
    },
    imgSize: {
      f: _0xab8b4c["frontProcessedBitmapSize"],
      s: _0xab8b4c[_0x56da("0x7a")],
    },
    PaintLines: _0x2eed82 ? _0x2eed82 : [],
    openMagnifier: _0x86b29b,
  };
  tozAdjustAPI[_0x56da("0x2c")](_0x35a0f2);
}
function tozInitializeDraw(_0x2da4d5, _0x296a39, _0x4cff0f) {
  var _0x472ab4 = _0x2da4d5[_0x56da("0x5f")],
    _0xb5e5a8 = _0x2da4d5[_0x56da("0x3d")];
  _0x296a39 === !![]
    ? (addMosaicOnFace(
        _0x472ab4,
        _0x2da4d5[_0x56da("0x25")],
        _0x2da4d5[_0x56da("0x16")],
        PhotoType[_0x56da("0x6c")],
        function() {
          tozDrawByProfile2ModelData(_0x2da4d5, _0x4cff0f);
        }
      ),
      addMosaicOnFace(
        _0xb5e5a8,
        _0x2da4d5[_0x56da("0x7a")],
        _0x2da4d5[_0x56da("0x34")],
        PhotoType[_0x56da("0x49")],
        function() {
          tozDrawByProfile2ModelData(_0x2da4d5, _0x4cff0f);
        }
      ))
    : ((tozFrontMasaic = _0x472ab4),
      (tozSideMasaic = _0xb5e5a8),
      tozDrawByProfile2ModelData(_0x2da4d5, _0x4cff0f));
}
function tozGetMeasurementsByImage(_0x429266, _0x130888, _0x1e866d) {
  tozGetMeasurementsByTaskId(
    _0x130888,
    _0x1e866d,
    tozAPIDataType["GETSIZESBYIMG"]
  );
}
function tozGetMeasurementsByProfile(_0x5d53c0, _0x31d4a9, _0x167294) {
  if (
    tozIsNullOrUndefined(
      tozAPIUrl[_0x56da("0x54")][tozAPIUrl[_0x56da("0x6e")]]
    ) ||
    tozIsNullOrUndefined(
      tozAPIUrl[_0x56da("0x54")][tozAPIUrl[_0x56da("0x6e")]][_0x56da("0x63")]
    ) ||
    tozIsNullOrUndefined(
      tozAPIUrl[_0x56da("0x54")][tozAPIUrl["currentNodeListIndex"]][
        _0x56da("0x63")
      ]["sdkProfileSize"]
    )
  ) {
    $(_0x56da("0x4a"))[_0x56da("0x3a")](_0x56da("0x18"), [
      {
        statusCode: 0x9c53,
        statusText:
          tozEventsLang[OneMeasureSDKParameters["language"]][_0x56da("0x4c")],
      },
    ]);
    return;
  }
  var _0x5c40a0 = $[_0x56da("0x7e")]({
    type: "post",
    url:
      tozAPIUrl[_0x56da("0x54")][tozAPIUrl["currentNodeListIndex"]][
        _0x56da("0x63")
      ][_0x56da("0x46")],
    headers: { "Content-type": _0x56da("0x37"), Accept: _0x56da("0x80") },
    data: tozGetMeasurementsProc[_0x56da("0x11")](_0x5d53c0, _0x31d4a9),
    dataType: "JSON",
    timeout: tozAPIUrl[_0x56da("0xd")],
    beforeSend: function() {},
    success: function(_0x4c2fe4) {
      _0x4c2fe4[_0x56da("0xc")] === "0"
        ? tozGetMeasurementsByTaskId(
            _0x4c2fe4["data"][_0x56da("0x82")],
            _0x167294,
            tozAPIDataType[_0x56da("0x3b")]
          )
        : _0x167294({
            sdkResponse: {
              serverStatusCode: _0x4c2fe4[_0x56da("0xc")],
              serverStatusText: _0x4c2fe4[_0x56da("0x8b")],
            },
            measurementsData: null,
          });
    },
    complete: function(_0x5f5d3c, _0x164de2) {
      _0x164de2 === _0x56da("0x19") && _0x5c40a0[_0x56da("0x5a")]();
    },
    error: function(_0x573bdd, _0x47de59, _0x6156d3) {
      if (_0x47de59 === "timeout") {
        $(_0x56da("0x4a"))[_0x56da("0x3a")](_0x56da("0x18"), [
          {
            statusCode: 0x9c4b,
            statusText:
              tozEventsLang[OneMeasureSDKParameters[_0x56da("0x40")]][
                _0x56da("0x47")
              ],
          },
        ]);
        return;
      }
      tozCommonAjaxError(_0x573bdd, _0x47de59, _0x6156d3);
    },
  });
}
function tozGetMeasurementsByTaskId(_0x6d50c, _0x2d16c4, _0x1bd255) {
  var _0x3d7da0 = {
      taskId: _0x6d50c,
      dataType: _0x1bd255,
      sourceType: 0xa,
      appKey: OneMeasureSDKParameters[_0x56da("0x77")],
      sizeLang: OneMeasureSDKParameters[_0x56da("0x40")],
    },
    _0x3da0e0 = new Date(),
    _0x237949 = new Date();
  tozLoopAjax(
    tozAPIUrl["nodeList"][tozAPIUrl[_0x56da("0x6e")]][_0x56da("0x63")][
      "sdkDataGet"
    ],
    _0x3d7da0,
    function(_0x846344) {
      if (_0x846344["code"] != "0")
        return (
          _0x2d16c4({
            sdkResponse: {
              serverStatusCode: _0x846344[_0x56da("0xc")],
              serverStatusText: _0x846344[_0x56da("0x8b")],
            },
            measurementsData: null,
          }),
          !![]
        );
      if (
        _0x846344[_0x56da("0xc")] === "0" &&
        _0x846344[_0x56da("0x4f")][_0x56da("0x32")] === 0x1
      ) {
        if (_0x846344[_0x56da("0x4f")][_0x56da("0x68")][_0x56da("0x9")] === 0x0)
          _0x846344[_0x56da("0x4f")]["apiData"][_0x56da("0x86")]
            ? tozGetMsgByCode(
                _0x846344[_0x56da("0x4f")][_0x56da("0x68")][_0x56da("0x86")],
                function(_0x2ecd40) {
                  _0x2d16c4({
                    sdkResponse: {
                      serverStatusCode:
                        _0x846344[_0x56da("0x4f")][_0x56da("0x68")][
                          _0x56da("0x86")
                        ],
                      serverStatusText:
                        _0x2ecd40[_0x56da("0x4f")][_0x56da("0x64")] +
                        "[" +
                        _0x846344[_0x56da("0x4f")][_0x56da("0x68")][
                          _0x56da("0x86")
                        ] +
                        ":" +
                        _0x846344["data"]["apiData"]["traceId"] +
                        "]",
                    },
                    profile2ModelData: null,
                  });
                }
              )
            : _0x2d16c4({
                sdkResponse: {
                  serverStatusCode:
                    _0x846344[_0x56da("0x4f")][_0x56da("0x68")][_0x56da("0x9")],
                  serverStatusText:
                    _0x846344[_0x56da("0x4f")]["apiData"][_0x56da("0x58")] +
                    "[" +
                    _0x846344[_0x56da("0x4f")][_0x56da("0x68")][
                      _0x56da("0x86")
                    ] +
                    ":" +
                    _0x846344["data"][_0x56da("0x68")][_0x56da("0x3e")] +
                    "]",
                },
                measurementsData: null,
              });
        else
          _0x846344[_0x56da("0x4f")][_0x56da("0x68")][_0x56da("0x9")] === 0x1 &&
            tozGetMeasurementsProc[_0x56da("0x22")](_0x846344, function(
              _0x3c63f9,
              _0x30a60b,
              _0x257f08
            ) {
              _0x2d16c4({
                sdkResponse: {
                  serverStatusCode: _0x3c63f9,
                  serverStatusText: _0x30a60b,
                },
                measurementsData: _0x257f08,
              });
            });
        return !![];
      }
      return ![];
    },
    _0x3da0e0,
    _0x237949
  );
}
function tozGetTutorials(_0x3c3e76) {
  var _0x2f46bc = 0x0;
  function _0x3bda11(_0x3f7ab5, _0x2932ab, _0x5f01fc) {
    if (_0x2932ab === "timeout") {
      $(_0x56da("0x4a"))[_0x56da("0x3a")](_0x56da("0x18"), [
        {
          statusCode: 0x9c4a,
          statusText:
            tozEventsLang[OneMeasureSDKParameters[_0x56da("0x40")]][
              _0x56da("0x7c")
            ],
        },
      ]);
      return;
    }
    _0x2f46bc++,
      _0x2f46bc < tozAPIUrl[_0x56da("0x54")]["length"]
        ? tozGetTutorialsByAJAX(
            tozAPIUrl[_0x56da("0x54")][_0x2f46bc]["tutorialInfoUrl"],
            _0x3c3e76,
            _0x3bda11
          )
        : tozCommonAjaxError(_0x3f7ab5, _0x2932ab, _0x5f01fc);
  }
  tozGetTutorialsByAJAX(
    tozAPIUrl["nodeList"][_0x2f46bc][_0x56da("0x1c")],
    _0x3c3e76,
    _0x3bda11
  );
}
function tozGetTutorialsByAJAX(_0x3357ef, _0x154b6a, _0x53fb17) {
  var _0x5ae760 = $[_0x56da("0x7e")]({
    async: !![],
    crossDomain: !![],
    method: _0x56da("0x45"),
    url: _0x3357ef,
    timeout: 0xea60,
    beforeSend: function() {},
    success: function(_0x55e9f0) {
      _0x55e9f0["result"][_0x56da("0xc")] === "0"
        ? _0x154b6a(_0x55e9f0)
        : $(_0x56da("0x4a"))[_0x56da("0x3a")]("_Events", [
            {
              statusCode: 0x9c4a,
              statusText:
                tozEventsLang[OneMeasureSDKParameters["language"]][
                  _0x56da("0x7c")
                ],
              server: _0x55e9f0[_0x56da("0x6")],
            },
          ]);
    },
    complete: function(_0x3e2ce7, _0xf205e9) {
      _0xf205e9 === _0x56da("0x19") && _0x5ae760[_0x56da("0x5a")]();
    },
    error: function(_0x30d71c, _0xa90ad7, _0x3cb762) {
      _0x53fb17(_0x30d71c, _0xa90ad7, _0x3cb762);
    },
  });
}

var a0_0x599e = [
  "unregisterSensor",
  "getCameraList",
  "setCameraById",
  "GETSIZESBYIMG",
  "measurementsData",
  "bind",
  "dealWithEvents",
  "split",
  "BASE",
  "frontInit",
  "sideInit",
  "setOutlineGoodColor",
  "setMovePanColor",
  "setMovingPanColor",
  "FRONT",
  "#frontRetract",
  "click",
  "SIDE",
  "#sideRetract",
  "postAdjustRes",
  "frontAllPoints",
  "pts",
  "sideAllPoints",
  "frontPaintLines",
  "sidePaintLines",
  "paintLines",
  "length",
  "ImgDir",
  "push",
  "createElement",
  "canvas",
  "onload",
  "width",
  "drawImage",
  "base64",
  "image/jpeg",
  "src",
  "prototype",
  "log",
  "sensor\x20ok",
  "sensor\x20error",
  "endVibration",
  "FACING_FRONT",
  "FACING_BACK",
  "openCamera",
  "startCamera",
  "cancelCamera",
  "pauseCamera",
  "setFacing",
  "getFacing",
  "switchCamera",
  "openGalleryFromActivity",
  "rotateImage",
  "lackRequiredSensors",
  "registerSensor",
];
(function(_0x165337, _0x3d3544) {
  var _0x2d9d02 = function(_0x1bec22) {
    while (--_0x1bec22) {
      _0x165337["push"](_0x165337["shift"]());
    }
  };
  _0x2d9d02(++_0x3d3544);
})(a0_0x599e, 0x93);
var a0_0x41f4 = function(_0x3caf5c, _0x1d32f5) {
  _0x3caf5c = _0x3caf5c - 0x0;
  var _0x2c10cc = a0_0x599e[_0x3caf5c];
  return _0x2c10cc;
};
var setOnSensorListener = function() {};
setOnSensorListener[a0_0x41f4("0x0")] = {
  onSensorOk: function() {
    console[a0_0x41f4("0x1")](a0_0x41f4("0x2"));
  },
  onSensorError: function() {
    console[a0_0x41f4("0x1")](a0_0x41f4("0x3"));
  },
  onSensorAngle: function() {
    return tozSensorListener["onSensorAngle"]();
  },
  startVibration: function(_0x6aa5c1) {
    tozSensorListener["startVibration"](_0x6aa5c1);
  },
  endVibration: function() {
    tozSensorListener[a0_0x41f4("0x4")]();
  },
};
var setOnSensorListener = new setOnSensorListener();
var cameraView = function() {
  this[a0_0x41f4("0x5")] = 0x0;
  this[a0_0x41f4("0x6")] = 0x1;
};
cameraView[a0_0x41f4("0x0")] = {
  onCreate: function() {
    tozCameraView[a0_0x41f4("0x7")]();
  },
  onStart: function() {
    tozCameraView[a0_0x41f4("0x8")]();
  },
  onResume: function() {
    tozCameraView[a0_0x41f4("0x9")]();
    tozCameraView["openCamera"]();
  },
  onPause: function() {
    tozCameraView[a0_0x41f4("0xa")]();
  },
  onStop: function() {
    tozCameraView[a0_0x41f4("0x9")]();
  },
  onRequestPermissionsResult: function(_0x428352, _0x602ef5) {
    tozCameraView["onRequestPermissionsResult"](_0x428352, _0x602ef5);
  },
  captureImage: function(_0x4afe51) {
    tozCameraView["captureImage"](_0x4afe51);
  },
  setFacing: function(_0x52ee73) {
    tozCameraView[a0_0x41f4("0xb")](_0x52ee73);
  },
  getFacing: function() {
    return tozCameraView[a0_0x41f4("0xc")]();
  },
  toggleFacing: function() {
    tozCameraView[a0_0x41f4("0xd")]();
  },
  openGalleryFromActivity: function(_0x2daafa) {
    tozCameraView[a0_0x41f4("0xe")](_0x2daafa);
  },
  rotateImage: function(_0x2d4e57, _0x3ea47d) {
    imageProc[a0_0x41f4("0xf")](_0x2d4e57, _0x3ea47d);
  },
  lackRequiredSensors: function(_0x26a58d) {
    tozSensorListener[a0_0x41f4("0x10")](_0x26a58d);
  },
  registerSensor: function() {
    tozSensorListener[a0_0x41f4("0x11")]();
  },
  unregisterSensor: function() {
    tozSensorListener[a0_0x41f4("0x12")]();
  },
  setOnSensorListener: setOnSensorListener,
  setVideoPosition: function() {},
  getCameraList: function(_0x582b12) {
    tozCameraView[a0_0x41f4("0x13")](_0x582b12);
  },
  setCameraById: function(_0x5c2944) {
    tozCameraView[a0_0x41f4("0x14")](_0x5c2944);
  },
};
var cameraView = new cameraView();
var OneMeasureSDKLite = function() {};
OneMeasureSDKLite[a0_0x41f4("0x0")] = {
  processImage: function(
    _0x2f4cb3,
    _0x5b3ba7,
    _0x2012e2,
    _0x203fda,
    _0x5f019e,
    _0x502886
  ) {
    tozUploadImg(
      _0x2f4cb3,
      _0x5b3ba7,
      _0x2012e2,
      _0x203fda,
      _0x5f019e,
      _0x502886
    );
  },
  getProfile: function(_0x295ca9, _0xf6978d) {
    tozGetProfile(_0x295ca9, _0xf6978d);
  },
  getMeasurementsByTask: function(_0x2e17a2, _0x5b0902) {
    tozGetMeasurementsByTaskId(
      _0x2e17a2,
      _0x5b0902,
      tozAPIDataType[a0_0x41f4("0x15")]
    );
  },
  getMeasurementsByProfile: function(_0x76d1ad, _0x66dcf1, _0xc3b7e8) {
    tozGetMeasurementsByProfile(_0x76d1ad, _0x66dcf1, _0xc3b7e8);
  },
  getMeasurements: function(_0x4b752d, _0x4c27ff, _0x533125) {
    tozGetMeasurementsByImage(_0x4b752d, _0x4c27ff, _0x533125);
  },
  getRecomSizeByTask: function() {},
  getRecomSizeByProfile: function() {},
  getRecommendSize: function() {},
  dealWithEvents: function(_0x3a8511) {},
  getMeasurementsData: function() {
    return OneMeasureSDKParameters[a0_0x41f4("0x16")];
  },
};
var OneMeasureSDKLite = new OneMeasureSDKLite();
$("body")[a0_0x41f4("0x17")]("_Events", function(_0x7d27ab, _0x30054d) {
  OneMeasureSDKLite[a0_0x41f4("0x18")](_0x30054d);
});
var EditOutlineView = function() {};
EditOutlineView[a0_0x41f4("0x0")] = {
  initialize: function(_0x247052, _0x3be37e, _0x466695) {
    var _0x7778f4 = SDKVersion[a0_0x41f4("0x19")]("_");
    if (_0x7778f4[0x0] === a0_0x41f4("0x1a")) {
      tozAdjustInit[a0_0x41f4("0x1b")]();
      tozAdjustInit[a0_0x41f4("0x1c")]();
    }
    tozInitializeDraw(_0x247052, _0x3be37e, _0x466695);
  },
  setOutlineGoodColor: function(_0x4d6a79, _0x2f6a94) {
    tozAdjustAPI[a0_0x41f4("0x1d")](_0x4d6a79, _0x2f6a94);
  },
  setOutlineBadColor: function(_0x58af7c, _0x4fe07d) {
    tozAdjustAPI["setOutlineBadColor"](_0x58af7c, _0x4fe07d);
  },
  setMovePanColor: function(_0x5dba48, _0x105d28, _0xdd7a5b) {
    tozAdjustAPI[a0_0x41f4("0x1e")](_0x5dba48, _0x105d28, _0xdd7a5b);
  },
  setMovingPanColor: function(_0x3c635b, _0x350a5b, _0x310ec7) {
    tozAdjustAPI[a0_0x41f4("0x1f")](_0x3c635b, _0x350a5b, _0x310ec7);
  },
  undo: function(_0x4d8e2d) {
    if (_0x4d8e2d === Pose[a0_0x41f4("0x20")]) {
      $(a0_0x41f4("0x21"))[a0_0x41f4("0x22")]();
    } else if (_0x4d8e2d === Pose[a0_0x41f4("0x23")]) {
      $(a0_0x41f4("0x24"))[a0_0x41f4("0x22")]();
    }
  },
  getSavedProfile2ModelData: function(_0x8b1d82) {
    var _0x110825 = tozAdjustAPI[a0_0x41f4("0x25")]();
    _0x8b1d82[a0_0x41f4("0x26")] = _0x110825[a0_0x41f4("0x27")]["f"];
    _0x8b1d82[a0_0x41f4("0x28")] = _0x110825[a0_0x41f4("0x27")]["s"];
    _0x8b1d82[a0_0x41f4("0x29")] = [];
    _0x8b1d82[a0_0x41f4("0x2a")] = [];
    for (
      var _0x4bd4fa = 0x0;
      _0x4bd4fa < _0x110825[a0_0x41f4("0x2b")][a0_0x41f4("0x2c")];
      _0x4bd4fa++
    ) {
      if (_0x110825["paintLines"][_0x4bd4fa][a0_0x41f4("0x2d")] === "f") {
        _0x8b1d82[a0_0x41f4("0x29")][a0_0x41f4("0x2e")](
          _0x110825[a0_0x41f4("0x2b")][_0x4bd4fa]
        );
      } else if (
        _0x110825[a0_0x41f4("0x2b")][_0x4bd4fa][a0_0x41f4("0x2d")] === "s"
      ) {
        _0x8b1d82[a0_0x41f4("0x2a")][a0_0x41f4("0x2e")](
          _0x110825["paintLines"][_0x4bd4fa]
        );
      }
    }
  },
  setFaceCoverSrc: function(_0x504231) {
    var _0xb7aa44 = new Image();
    var _0x27481b = document[a0_0x41f4("0x2f")](a0_0x41f4("0x30"));
    var _0x1cc950 = _0x27481b["getContext"]("2d");
    _0xb7aa44[a0_0x41f4("0x31")] = function() {
      _0x27481b[a0_0x41f4("0x32")] = _0xb7aa44[a0_0x41f4("0x32")];
      _0x27481b["height"] = _0xb7aa44["height"];
      _0x1cc950[a0_0x41f4("0x33")](
        _0xb7aa44,
        0x0,
        0x0,
        _0xb7aa44[a0_0x41f4("0x32")],
        _0xb7aa44["height"],
        0x0,
        0x0,
        _0x27481b[a0_0x41f4("0x32")],
        _0x27481b["height"]
      );
      masaicImg[a0_0x41f4("0x34")] = _0x27481b["toDataURL"](a0_0x41f4("0x35"));
    };
    _0xb7aa44[a0_0x41f4("0x36")] = _0x504231;
  },
};
var editOutlineView = new EditOutlineView();

var a6_0x1604 = ["CHINESE", "TRADITION_CHINESE", "ENGLISH", "JAPANESE"];
(function(_0x32a4c9, _0x404522) {
  var _0x38b37b = function(_0x2172b7) {
    while (--_0x2172b7) {
      _0x32a4c9["push"](_0x32a4c9["shift"]());
    }
  };
  _0x38b37b(++_0x404522);
})(a6_0x1604, 0x11e);
var a6_0x1c12 = function(_0x1c8136, _0x59c8ba) {
  _0x1c8136 = _0x1c8136 - 0x0;
  var _0x250d7d = a6_0x1604[_0x1c8136];
  return _0x250d7d;
};
window["onload"] = function() {
  BrowserVersionWarning();
  tozGetAPIUrl();
  tozGetCorpId();
  tozUpdateLanguage(Language[a6_0x1c12("0x0")]);
  tozUpdateLanguage(Language[a6_0x1c12("0x1")]);
  tozUpdateLanguage(Language[a6_0x1c12("0x2")]);
  tozUpdateLanguage(Language[a6_0x1c12("0x3")]);
};

}

export default test;
