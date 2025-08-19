var TeaVM_MSVC = (function() {
	'use strict';
	var e = {};

	function t(t, n) {
		if (!t) throw new Error("Null pointer exception");
		return t[n]
	}

	function n(e, t, n) {
		if (!e) throw new Error("Null pointer exception");
		e[t] = n
	}

	function r(e, t) {
		return new ArrayBuffer(e << t)
	}

	function o(e) {
		return new Int8Array(e)
	}

	function i(e) {
		return new Uint8Array(e)
	}

	function a(e) {
		return new Int16Array(e)
	}

	function s(e) {
		return new Uint16Array(e)
	}

	function c(e) {
		return new Int32Array(e)
	}

	function u(e) {
		return new Uint32Array(e)
	}

	function f(e) {
		return new Float32Array(e)
	}

	function l(e) {
		return new Float64Array(e)
	}

	function d(e, t) {
		return {
			value: e,
			align: t
		}
	}

	function h(e, t, n, r) {
		if (t % r != 0) throw new Error("Unaligned access");
		return e[n]
	}

	function p(e, t, n, r, o) {
		if (t % r != 0) throw new Error("Unaligned access");
		e[n] = o
	}

	function m(e, t) {
		return e.length < t ? null : e.subarray(0, t)
	}

	function v(e, t) {
		return e.length <= t ? e : new e.constructor(e.buffer, e.byteOffset, t)
	}

	function g(e, t, n) {
		for (var r = 0; r < n; r++) t[r] = e[r]
	}

	function y(e, t, n, r) {
		for (var o = 0; o < n; o++) r[o] = e[t + o]
	}

	function w(e, t, n, r) {
		for (var o = 0; o < n; o++) e[t + o] = r[o]
	}
	e.readByte = t, e.writeByte = n, e.allocBuffer = r, e.int8Array = o, e.uint8Array = i, e.int16Array = a, e.uint16Array = s, e.int32Array = c, e.uint32Array = u, e.float32Array = f, e.float64Array = l, e.struct = d, e.readAligned = h, e.writeAligned = p, e.truncateArray = m, e.clampArray = v, e.copyArray = g, e.readArray = y, e.writeArray = w;
	var b = {
		msvc: e
	};
	return "object" == typeof exports ? module.exports = b : "function" == typeof define && define.amd ? define([], function() {
		return b
	}) : (window.TeaVM || (window.TeaVM = {})).msvc = b
})();


TeaVM_MSVC.msvc.memcpy = function(e, t, n, r, o, i) {
	for (var a = 0; a < i; a++) e[r + a] = t[o + a]
};
TeaVM_MSVC.msvc.memset = function(e, t, n, r) {
	for (var o = 0; o < r; o++) e[n + o] = t
};
TeaVM_MSVC.msvc.umul128 = function(e, t, n) {
	var r = (e & 65535) * (t & 65535),
		o = (e >>> 16) * (t & 65535) + (r >>> 16),
		a = (e & 65535) * (t >>> 16) + (o & 65535);
	n[0] = (a << 16) + (o >>> 16) + (e >>> 16) * (t >>> 16), n[1] = (e * t) >>> 0
};
TeaVM_MSVC.msvc.divmod64 = function(e, t, n, r) {
	var o = BigInt(e) << 32n | BigInt(t),
		i = BigInt(n) << 32n | BigInt(r),
		a = o / i;
	return [Number(a >> 32n), Number(a & 4294967295n), Number(o % i)]
};


TeaVM_MSVC.msvc.sehTry = function(e) {
	try {
		e()
	} catch (t) {
		TeaVM_MSVC.msvc.sehFilter(t)
	}
};
TeaVM_MSVC.msvc.sehFilter = function(e) {
	return 1
}; // EXCEPTION_EXECUTE_HANDLER


TeaVM_MSVC.msvc.tlsAlloc = function() {
	return ++TeaVM_MSVC.msvc.tlsIndex
};
TeaVM_MSVC.msvc.tlsIndex = 0;
TeaVM_MSVC.msvc.tlsGetValue = function(e) {
	return TeaVM_MSVC.msvc.tlsValues[e] || null
};
TeaVM_MSVC.msvc.tlsSetValue = function(e, t) {
	TeaVM_MSVC.msvc.tlsValues[e] = t
};
TeaVM_MSVC.msvc.tlsValues = {};

//mv servises handler, only for EXCEPTION_EXECUTE_HANDLER