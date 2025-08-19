// this is file what generates by running Eaglercraft
// anyone who upload it to repo with site is dumbass :)

// MARK: SETTINGS:

{
   "relay" {
    "enabled": false
   } 
}



"use strict";
"undefined" != typeof window && (window.eaglercraftXClientScriptElement = document.currentScript),
	function() {
		function e(e) {
			console.log("LoaderBootstrap: [INFO] " + e)
		}

		function t(e) {
			console.log("LoaderBootstrap: [WARN] " + e)
		}

		function n(e) {
			console.error("LoaderBootstrap: [ERROR] " + e)
		}
		var a = null;

		function i() {
			return new Promise((function(e) {
				setTimeout(e, 20)
			}))
		}

		function o(e) {
			return new Promise((function(t) {
				fetch(e, {
					cache: "force-cache"
				}).then((function(e) {
					return e.arrayBuffer()
				})).then(t).catch((function(e) {
					n("Failed to fetch URL! " + e), t(null)
				}))
			}))
		}

		function r(e) {
			return e.startsWith("data:application/octet-stream;base64,") ? new Promise((function(i) {
				o(e).then((function(o) {
					if (o) i(o);
					else {
						t("Failed to decode base64 via fetch, doing it the slow way instead...");
						try {
							a ||= function() {
								const e = [];
								for (var t = 0; 64 > t; ++t) e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(t)] = t;
								return e[45] = 62, e[95] = 63,
									function(t, n) {
										var a = t.length - n;
										if (0 < a % 4) throw Error("Invalid string. Length must be a multiple of 4");
										var i = t.indexOf("=", n),
											o = (a = [i = -1 === i ? a : i - n, i === a ? 0 : 4 - i % 4])[0];
										a = a[1], i = new Uint8Array(3 * (o + a) / 4 - a);
										var r, A = 0;
										for (o = (0 < a ? o - 4 : o) + n, r = n; r < o; r += 4) n = e[t.charCodeAt(r)] << 18 | e[t.charCodeAt(r + 1)] << 12 | e[t.charCodeAt(r + 2)] << 6 | e[t.charCodeAt(r + 3)], i[A++] = n >> 16 & 255, i[A++] = n >> 8 & 255, i[A++] = 255 & n;
										return 2 === a ? (n = e[t.charCodeAt(r)] << 2 | e[t.charCodeAt(r + 1)] >> 4, i[A++] = 255 & n) : 1 === a && (n = e[t.charCodeAt(r)] << 10 | e[t.charCodeAt(r + 1)] << 4 | e[t.charCodeAt(r + 2)] >> 2, i[A++] = n >> 8 & 255, i[A++] = 255 & n), i.buffer
									}
							}();
							var r = a(e, 37);
							i(r)
						} catch (e) {
							n("Failed to decode base64! " + e), i(null)
						}
					}
				}))
			})) : o(e)
		}

		function A(e, t) {
			const n = document.createElement("h2");
			n.style.color = "#AA0000", n.style.padding = "25px", n.style.fontFamily = "sans-serif", n.style.marginBlock = "0px", n.appendChild(document.createTextNode(t)), e.appendChild(n), (t = document.createElement("h4")).style.color = "#AA0000", t.style.padding = "25px", t.style.fontFamily = "sans-serif", t.style.marginBlock = "0px", t.appendChild(document.createTextNode("Try again later")), e.style.backgroundColor = "white", e.appendChild(t)
		}
		window.main = async function() {
			if (void 0 === window.eaglercraftXOpts) n("window.eaglercraftXOpts is not defined!"), alert("window.eaglercraftXOpts is not defined!");
			else {
				var a = window.eaglercraftXOpts.container;
				if ("string" != typeof a) n("window.eaglercraftXOpts.container is not a string!"), alert("window.eaglercraftXOpts.container is not a string!");
				else {
					var l = window.eaglercraftXOpts.assetsURI;
					if ("string" != typeof l) {
						if ("object" != typeof l || "object" != typeof l[0] || "string" != typeof l[0].url) return n("window.eaglercraftXOpts.assetsURI is not a string!"), void alert("window.eaglercraftXOpts.assetsURI is not a string!");
						l = l[0].url
					}
					l.startsWith("data:") && delete window.eaglercraftXOpts.assetsURI;
					var c = document.getElementById(a);
					if (c) {
						for (; a = c.lastChild;) c.removeChild(a);
						(a = document.createElement("div")).style.width = "100%", a.style.height = "100%", a.style.setProperty("image-rendering", "pixelated"), a.style.background = 'center / contain no-repeat url("data:image/png;base64,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") white', c.appendChild(a), await i(), l.startsWith("data:") ? (e('Downloading EPW file "<data: ' + l.length + ' chars>"...'), l = await r(l)) : (e('Downloading EPW file "' + l + '"...'), l = await o(l));
						var d = !1;
						if (l ? 384 > l.byteLength && (n("The EPW file is too short"), d = !0) : d = !0, d) c.removeChild(a), A(c, "Failed to download EPW file!"), n("Failed to download EPW file!");
						else {
							var s = new DataView(l);
							608649541 === s.getUint32(0, !0) && 1297301847 === s.getUint32(4, !0) || (n("The file is not an EPW file"), d = !0);
							var f = l.byteLength;
							if (s.getUint32(8, !0) !== f && (n("The EPW file is the wrong length"), d = !0), d) c.removeChild(a), A(c, "EPW file is invalid!"), n("EPW file is invalid!");
							else {
								var w = new TextDecoder("utf-8"),
									h = s.getUint32(100, !0),
									p = s.getUint32(104, !0),
									u = s.getUint32(108, !0),
									g = s.getUint32(112, !0);
								if ((0 > h || h + p > f || 0 > u || u + g > f) && (n("The EPW file contains an invalid offset (component: splash)"), d = !0), d) c.removeChild(a), A(c, "EPW file is invalid!"), n("EPW file is invalid!");
								else if (h = new Uint8Array(l, h, p), u = new Uint8Array(l, u, g), w = URL.createObjectURL(new Blob([h], {
										type: w.decode(u)
									})), await
									function(e) {
										return new Promise((function(n) {
											const a = new Image;
											a.addEventListener("load", n), a.addEventListener("error", (function() {
												t("Failed to preload image: " + e), n()
											})), a.src = e, setTimeout(n, 50)
										}))
									}(w), e("Loaded splash img: " + w), a.style.background = 'center / contain no-repeat url("' + w + '"), 0px 0px / 1000000% 1000000% no-repeat url("' + w + '") white', await i(), g = s.getUint32(164, !0), h = s.getUint32(168, !0), u = s.getUint32(180, !0), s = s.getUint32(184, !0), (0 > g || g + h > f || 0 > u || u + s > f) && (n("The EPW file contains an invalid offset (component: loader)"), d = !0), d) c.removeChild(a), A(c, "EPW file is invalid!"), n("EPW file is invalid!");
								else {
									a = new Uint8Array(l, g, h), a = URL.createObjectURL(new Blob([a], {
										type: "text/javascript;charset=utf-8"
									})), e("Loaded loader.js: " + w), d = new Uint8Array(l, u, s), e("Loaded loader.wasm: " + (d = URL.createObjectURL(new Blob([d], {
										type: "application/wasm"
									})))), f = {};
									for (const [e, t] of Object.entries(window.eaglercraftXOpts)) "container" !== e && "assetsURI" !== e && (f[e] = t);
									window.__eaglercraftXLoaderContextPre = {
										rootElement: c,
										eaglercraftXOpts: f,
										theEPWFileBuffer: l,
										loaderWASMURL: d,
										splashURL: w
									}, e("Appending loader.js to document..."), (c = document.createElement("script")).type = "text/javascript", c.src = a, document.head.appendChild(c)
								}
							}
						}
					} else n(c = 'window.eaglercraftXOpts.container "' + a + '" is not a known element id!'), alert(c)
				}
			}
		}
	}.call(this);