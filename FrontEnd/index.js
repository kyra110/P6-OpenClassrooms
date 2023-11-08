/* Variables */
const btnAll = document.querySelector(".all");
const btnObjects = document.querySelector(".objects");
const btnApartment = document.querySelector(".apartment");
const btnHotelsRestaurants = document.querySelector(".hotels-restaurants");
const gallery = document.querySelector(".gallery");
const body = document.querySelector("body");

/* Chercher le tableau de works avec une requête à l'API */
async function fetchData() {
  const requete = await fetch("http://localhost:5678/api/works");
  return requete.json();
}

function main() {
  creationWorksDom();
}
main();

/* Création des works dans le dom */
function creationWorksDom() {
  fetchData().then((data) => {
    //cree pour chaque élément du tableau
    console.log(data);
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

/* Ajout des évènements au click sur bouton tous*/
btnAll.addEventListener("click", () => {
  gallery.innerHTML = "";
  fetchData().then((data) => {
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
});
/* Ajout des évènements au click sur bouton objet*/
btnObjects.addEventListener("click", () => {
  gallery.innerHTML = "";
  fetchData().then((data) => {
    console.log(data);
    data.forEach((work) => {
      if (work.categoryId === 1) {
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
/* Ajout des évènements au click sur bouton apartements*/
btnApartment.addEventListener("click", () => {
  gallery.innerHTML = "";
  fetchData().then((data) => {
    data.forEach((work) => {
      if (work.categoryId === 2) {
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
/* Ajout des évènements au click sur bouton hotel et restaurants*/
btnHotelsRestaurants.addEventListener("click", () => {
  gallery.innerHTML = "";
  fetchData().then((data) => {
    data.forEach((work) => {
      if (work.categoryId === 3) {
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
