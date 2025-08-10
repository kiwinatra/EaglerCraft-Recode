var TeaVM=(function(){'use strict';var e={};function t(e,t,n){return e[t>>n]}function n(e,t,n,r){e[t>>n]=r}function r(e,t){return new e.constructor(e.buffer,t)}function o(e,t){return new e.constructor(e.buffer,e.byteOffset,t)}function i(e,t,n){for(var r=0;r<n;r++)t[r]=e[r]}function a(e,t,n,r){for(var o=0;o<n;o++)r[o]=e[t+o]}function s(e,t,n,r){for(var o=0;o<n;o++)e[t+o]=r[o]}function c(e,t){return{value:e,align:t}}function u(e,t,n){if(t%n!=0)throw new Error("Unaligned access");return e[t>>2]}function f(e,t,n,r){if(t%n!=0)throw new Error("Unaligned access");e[t>>2]=r}e.readInt32=t,e.writeInt32=n,e.alias=r,e.clamp=o,e.copy=i,e.read=a,e.write=s,e.struct=c,e.readAligned=u,e.writeAligned=f;var l={core:e};return"object"==typeof exports?module.exports=l:"function"==typeof define&&define.amd?define([],function(){return l}):(window.TeaVM||(window.TeaVM={})).core=l})();

// Runtime Initialization
TeaVM.core.init=function(){var e=TeaVM.core;e.memory=new WebAssembly.Memory({initial:256});var t=new Uint32Array(e.memory.buffer);e.heap=t,e.heap8=new Int8Array(e.memory.buffer),e.heap16=new Int16Array(e.memory.buffer),e.heap32=t};

// Garbage Collection Support
TeaVM.core.gc={alloc:function(e){var t=TeaVM.core.heap32,n=t[0];t[0]=n+e;return n},free:function(){}};

// Exception Handling
TeaVM.core.exception={lastError:null,throwException:function(e){this.lastError=e;throw e},getException:function(){return this.lastError}};

// System Functions
TeaVM.core.sys={getTime:function(){return Date.now()},log:function(e){console.log(e)},abort:function(e){throw new Error("Abort: "+e)}};

// Threading Polyfill
TeaVM.core.thread={currentThread:0,createThread:function(){return++this.currentThread}};

// Math Polyfills
TeaVM.core.math={imul:Math.imul,clz32:Math.clz32};

// WASM Interop
TeaVM.core.wasm={exports:{},imports:{}};


// made by kiwinatra (aka shonaax) && :l1xduude <3