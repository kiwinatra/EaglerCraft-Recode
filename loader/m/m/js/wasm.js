window.addEventListener("load", function() {
    if ((typeof WebAssembly !== "undefined") && (typeof WebAssembly.Suspending !== "undefined")) {
      try {
        if ("true" === window.localStorage.getItem("hideEaglerWASMAvailable")) {
          return;
        }
      } catch (ex) {}
      var el = document.getElementById("eaglerWASMAvailable");
      var chkbox = document.getElementById("eaglerWASMAvailableDontShow");

      function handleDontShow() {
        if (chkbox.checked) {
          try {
            window.localStorage.setItem("hideEaglerWASMAvailable", "true");
          } catch (ex) {}
        }
      }
      el.style.display = "block";
      document.getElementById("eaglerWASMAvailableYes").addEventListener("click", function() {
        handleDontShow();
        document.location.href = "./wasm/index.html";
      });
      document.getElementById("eaglerWASMAvailableNo").addEventListener("click", function() {
        handleDontShow();
        el.style.display = "none";
      });
    }
  });