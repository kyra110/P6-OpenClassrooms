// @ts-nocheck
/* Variables */
const btnObjects = document.querySelector(".objects");
const btnApartment = document.querySelector(".apartment");
const btnHotelsRestaurants = document.querySelector(".hotels-restaurants");
const gallery = document.querySelector(".gallery");
const body = document.querySelector("body");

/* Chercher le tableau de works avec une requête à l'API */
async function fetchWorks() {
  const requete = await fetch("http://localhost:5678/api/works");
  return requete.json();
}
async function fetchCategory() {
  const requete = await fetch("http://localhost:5678/api/categories");
  return requete.json();
}

function main() {
  creationWorksDom();
}
main();

/* Création des works dans le dom */
function creationWorksDom() {
  fetchWorks().then((data) => {
    //cree pour chaque élément du tableau
    // console.log(data);
    data.forEach((work) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = work.title;
      img.src = work.imageUrl;
      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    });
  });
}
/*****Création des bouton dynamiquement******/
const containerFiltres = document.querySelector(".container-filtres");
const btnAll = document.createElement("button"); //premier bouton sans catégorie
btnAll.textContent = "TOUS";
btnAll.classList.add("buttons-filtres", "active");
btnAll.id = 0;
containerFiltres.appendChild(btnAll);
/*Boucle for pour creer les bouton par catégorie*/
function creationButtons() {
  fetchCategory().then((data) => {
    console.log(data);
    data.forEach((category) => {
      const btn = document.createElement("button");
      btn.classList.add("buttons-filtres");
      btn.textContent = category.name;
      btn.id = category.id;
      containerFiltres.appendChild(btn);
      console.log(category.id);
      console.log(category.name);
    });
  });
}
creationButtons();
/*Creation d'évènement sur le container filtres*/
//gère la classe active & remet a zéro l'affichage des works
containerFiltres.addEventListener("click", function (event) {
  if (event.target.classList.contains("buttons-filtres")) {
    document.querySelectorAll(".buttons-filtres").forEach(function (btn) {
      btn.classList.remove("active");
    });
    event.target.classList.add("active");
    gallery.innerHTML = "";
  }
  //creation des works a partir de la catégory et id button
  const idValue = event.target.id;
  fetchWorks().then((works) => {
    works.forEach((work) => {
      //creation d'un work que si son id et egal a la catégory
      //car on filtre les catégories différentes
      if (idValue == work.categoryId) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;
        img.src = work.imageUrl;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
      }
      if (idValue == 0) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;
        img.src = work.imageUrl;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
      }
    });
  });
});

/*****Partie ou l'utilisateur et conecté*****/
// Récupérez la valeur du token dans le local storage
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const logOut = document.getElementById("login-link");
const adminText = "Mode édition";
const adminLogo = `<i class="fa-regular fa-pen-to-square"></i>`;
const adminConexion = `<div class="admin-edit">
<p>${adminLogo}${adminText}</p>
</div>`;
// Vérifiez si l'utilisateur est conecté ou non
if (isLoggedIn) {
  // Modifications si L'utilisateur est connecté
  console.log("L'utilisateur est connecté");
  logOut.textContent = "logout";
  document.body.insertAdjacentHTML("beforebegin", adminConexion);
  // document.body.insertAdjacentHTML("afterbegin", adminConexion);
} else {
  // L'utilisateur n'est pas connecté
  console.log("L'utilisateur n'est pas connecté");
  logOut.textContent = "login";
}

/****Suprimer le userToken du local storage si click sur log Out******/
logOut.addEventListener("click", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    window.localStorage.loged = "";
    logOut.textContent = "login";
    localStorage.setItem("isLoggedIn", "false");
  } else {
    window.location.href = "login.html";
  }
});
