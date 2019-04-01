/*!
* screenfull
* v3.2.0 - 2017-04-16
* (c) Sindre Sorhus; MIT License
*/
!function () { "use strict"; var a = "undefined" == typeof window ? {} : window.document, b = "undefined" != typeof module && module.exports, c = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element, d = function () { for (var b, c = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], d = 0, e = c.length, f = {}; d < e; d++)if ((b = c[d]) && b[1] in a) { for (d = 0; d < b.length; d++)f[c[0][d]] = b[d]; return f } return !1 }(), e = { request: function (b) { var e = d.requestFullscreen; b = b || a.documentElement, /5\.1[.\d]* Safari/.test(navigator.userAgent) ? b[e]() : b[e](c && Element.ALLOW_KEYBOARD_INPUT) }, exit: function () { a[d.exitFullscreen]() }, toggle: function (a) { this.isFullscreen ? this.exit() : this.request(a) }, onchange: function (b) { a.addEventListener(d.fullscreenchange, b, !1) }, onerror: function (b) { a.addEventListener(d.fullscreenerror, b, !1) }, raw: d }; if (!d) return void (b ? module.exports = !1 : window.screenfull = !1); Object.defineProperties(e, { isFullscreen: { get: function () { return Boolean(a[d.fullscreenElement]) } }, element: { enumerable: !0, get: function () { return a[d.fullscreenElement] } }, enabled: { enumerable: !0, get: function () { return Boolean(a[d.fullscreenEnabled]) } } }), b ? module.exports = e : window.screenfull = e }();