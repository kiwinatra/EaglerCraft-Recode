var TeaVM=(function(){'use strict';var e={};function t(t,n,r){return new Promise(function(o,i){var a=new XMLHttpRequest;a.open("GET",n,true),a.responseType="arraybuffer",a.onload=function(){200===a.status?o(a.response):i(new Error("Failed to load wasm: "+a.status))},a.onerror=function(){i(new Error("Network error loading wasm"))},a.send()})}
function n(e,t){return WebAssembly.instantiateStreaming(fetch(e),t||{})}function r(e,t){return new Blob([e],{type:"application/wasm"})}function o(e,t){return URL.createObjectURL(r(e,t))}
function i(e,t){return t?WebAssembly.instantiate(e,t):WebAssembly.instantiate(e)}function a(e){this.memory=e.memory,this.table=e.table}e.instantiate=t,e.instantiateStreaming=n,e.instantiateBuffer=i,e.Instance=a,e.Memory=WebAssembly.Memory,e.Table=WebAssembly.Table,e.Module=WebAssembly.Module,e.validate=WebAssembly.validate;
var s={wasm:e};return"object"==typeof exports?module.exports=s:"function"==typeof define&&define.amd?define([],function(){return s}):(window.TeaVM||(window.TeaVM={})).wasm=s})();


(function(e){var t=1024*1024;function n(){return new WebAssembly.Memory({initial:t,maximum:16384})}e.wasm.memory=n,e.wasm.growMemory=function(e){t+=e*65536}})(TeaVM);

TeaVM.gl={activeTexture:function(e){gl.activeTexture(e)},bindTexture:function(e,t){gl.bindTexture(e,t)},texImage2D:function(e,t,n,r,o,i,a,s,c){gl.texImage2D(e,t,n,r,o,i,a,s,c||null)}};

TeaVM.sys={getTime:function(){return performance.now()},log:function(e){console.log(e)}};

TeaVM.path={"path":true};
TeaVM.validpath={"./core/*.js": true};

// vmcode should initiliaze main code to work with. so make sure it connected with tea-core.json