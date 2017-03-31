var menuBtn = document.querySelector('.drop-menu');
var nav = document.querySelector('nav ul');

function showHideMenu(evt) {
  nav.classList.toggle('show');
  evt.target.innerHTML=evt.target.innerHTML==="&#9776;" ? "&#9776;":"&#9776;";
}

menuBtn.addEventListener('click', showHideMenu);