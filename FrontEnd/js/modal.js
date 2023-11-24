// @ts-nocheck
// Variables Globales
const modalContent = document.getElementById("modalContent");
const modalGallery = document.querySelector(".modalGallery");
//Fonction Principale pour l'affichage des works dans la Modale
function mainModal() {
  if (loged) {
    displayModal();
    displayWorksModal();
    closeModalGallery();
  }
}
mainModal();

// Affichage de la Modal uniquement si conecté grace au click sur le bouton modifié
function displayModal() {
  const modeEdition = document.querySelector(".div-edit span");
  modeEdition.addEventListener("click", () => {
    console.log("mode édition click");
    modalContent.style.display = "flex";
  });
}
// récupération des works & appel de la fonction de création de works dans la gallery de la modal
function displayWorksModal() {
  fetchWorks().then((works) => {
    //Boucle qui parcours  nos works
    works.forEach((work) => {
      createWorkModal(work);
    });
  });
}
// création des balises et injection des donnés a partir du fetchWorks
function createWorkModal(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const trash = document.createElement("span");
  trash.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  trash.id = work.id;
  img.src = work.imageUrl;
  figure.appendChild(img);
  figure.appendChild(trash);
  modalGallery.appendChild(figure);
  deleteWork(trash);
}

//Fermuture de la modal sur la croix
function closeModalGallery() {
  const xmarkModal = document.querySelector(".modalPortfolio span .fa-xmark");
  xmarkModal.addEventListener("click", () => {
    modalContent.style.display = "none";
  });

  //Fermeture de la modal sur le container grisé
  body.addEventListener("click", (e) => {
    if (e.target == modalContent) {
      modalContent.style.display = "none";
      console.log(e.target);
    }
  });
}

//Supression des works grace a la méthode DELETE & au Token user depuis la poubelle de la modale

const token = window.localStorage.token;
console.log(token);

//Objet de paramétrage pour requette DELETE avec token
const deleteWorkID = {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "same-origin",
};

//Supéssion au click sur la poubelle et mise a jour modale et gallery principale
function deleteWork(trash) {
  trash.addEventListener("click", (e) => {
    const workID = trash.id;
    console.log(trash);
    fetch(`http://localhost:5678/api/works/${workID}`, deleteWorkID).then(
      () => {
        modalGallery.innerHTML = "";
        gallery.innerHTML = "";
        displayWorksModal();
        displayWorksGallery();
      }
    );
  });
}
