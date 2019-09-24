'use strict';
let welcome = document.querySelectorAll("#welcome > path");
for (var i = 0; i < welcome.length; i++) {
  console.log(`Length of ${i} is: ${welcome[i].getTotalLength()}`);
}
function removeLoader(){

    let loader = document.querySelector("#loader");
    loader.classList.add("removeLoader");
}
setTimeout(function () {
  removeLoader();
}, 3400);
function openSearch() {
  let icon =  document.querySelector(".fa-search");
  let google = document.querySelector("#google");
if (google.classList.contains("openSearch")) {
  google.classList.remove("openSearch");
}else {
  google.classList.add("openSearch");

}

}
function openModal() {
  let modal = document.querySelector(".modal");
  modal.classList.add("open");
}
function closeModal() {
  let modal = document.querySelector(".modal");
  modal.classList.remove("open");
}
function pushItem() {
  let nameInp = document.querySelector("#name");
  let linkInp = document.querySelector("#link");
  let hexInp = document.querySelector("#hex");
  let name = nameInp.value;
  let link = linkInp.value;
  let hex = hexInp.value;

  if (link.length > 6 && hex.length > 0) {
    if (link.substr(0, 7) == "http://" || link.substr(0, 8) == "https://") {
      SaveColorToLocalStorage(name, link, hex);
      console.log(localStorage);
      appendLinks();
    } else {
      let mystr = link;
      console.log(mystr);
      mystr = "http://" + link;
      SaveColorToLocalStorage(name, mystr, hex);
      console.log(localStorage);
      appendLinks();
    }
  } else {
    console.log("Did you fill in the fields correctly?")
  }
}
function SaveColorToLocalStorage(name, link, color)
{
  var links = [];
  let id = JSON.parse(localStorage.getItem('links')||'[]').length + 1;
  var link = {
    id: id,
    name: name,
    link: link,
    color: color
  };
  links.push(link);
  links = links.concat(JSON.parse(localStorage.getItem('links')||'[]'));

  appendLinks();
  localStorage.setItem("links", JSON.stringify(links));
}

  let links = JSON.parse(localStorage.getItem('links') || "[]");
function appendLinks(){
  links = JSON.parse(localStorage.getItem('links') || "[]");
  let htmlTemplate = "";
  for (let link in links) {
      htmlTemplate += `
      <div>
      <a href="${links[link].link}" target="_blank" style="background:${links[link].color}">
          <p>
            ${links[link].name}
          </p>

          </a>
          <div class="btns">
            <button id="btnDelete" onclick="btnDelete(${link})">DELETE</button>
          </div>
          </div>
      `;
  }
  document.querySelector("main").innerHTML = htmlTemplate;
}
appendLinks();

function clearStorage(){
  if (confirm('Are you sure you want to delete the links?')) {
      localStorage.clear();

} else {
    // Do nothing!
}
}
console.log(localStorage);
function btnDelete(id){
      let index = id;
      links.splice(index, 1);
      localStorage.setItem("links", JSON.stringify(links));
      appendLinks();

}
let hex;

function colorChange(){
 hex = document.querySelector('#hex');
  hex.addEventListener("change", updateAll, false);
  hex.select();
}

function updateAll(event) {
    document.querySelector(".hex-code").style.background = event.target.value;
  };
