const modal = document.getElementById("versionModal");
  const btn = document.getElementById("play-btn");
  const span = document.querySelector(".close-modal");
  
  btn.onclick = function(e) {
    e.preventDefault();
    modal.style.display = "block";
  }
  
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }