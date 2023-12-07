// @ts-nocheck
// Variables Globales
const modalContent = document.getElementById("modalContent");
const modalGallery = document.querySelector(".modalGallery");
//Variables pour l'affichage de la deuxieme mmodale partie
const buttonAddPhoto = document.querySelector(".container-button button");
const modalPortfolio = document.querySelector(".modalPortfolio");
const modalAddWorks = document.querySelector(".modalAddWorks");
//Variables Pour le form
const formAddWorks = document.querySelector(".modalAddWorks form");
const inputTitle = document.querySelector("#title");
const inputCategory = document.querySelector("#categoryInput");
const inputFile = document.querySelector("#file");
const previewImage = document.getElementById("previewImage");
//Fonction Principale pour l'affichage des works dans la Modale
function mainModal() {
  displayCategoryModal();
  if (user) {
    displayModal();
    displayWorksModal();
    closeModalGallery();
    displayModalAddWorks();
    returnToModalPortfolio();
    addWorks();
    prevImg();
    verifFormCompleted();
  }
}
mainModal();

// Affichage de la Modal uniquement si conecté grace au click sur le bouton modifié
function displayModal() {
  const modeEdition = document.querySelector(".div-edit span");
  modeEdition.addEventListener("click", () => {
    // console.log("mode édition click");
    modalContent.style.display = "flex";
    modalPortfolio.style.display = "flex";
    modalAddWorks.style.display = "none";
  });
}
// récupération des works & appel de la fonction de création de works dans la gallery de la modal
function displayWorksModal() {
  modalGallery.innerHTML = "";
  getWorks().then((works) => {
    //Boucle qui parcours  nos works
    // console.log(works);
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
  img.alt = work.title;
  figure.appendChild(img);
  figure.appendChild(trash);
  modalGallery.appendChild(figure);
  deleteWork(trash);
}
//Gestion de la fermeture des modales
function closeModalGallery() {
  //Fermuture de la modal sur la croix 1
  const xmarkModal = document.querySelector(".modalPortfolio span .fa-xmark");
  xmarkModal.addEventListener("click", () => {
    modalContent.style.display = "none";
  });
  //Fermuture de la modal sur la croix 2
  const xmarkModal2 = document.querySelector(".modalAddWorks span .fa-xmark");
  xmarkModal2.addEventListener("click", () => {
    modalContent.style.display = "none";
  });

  //Fermeture de la modal sur le container grisé
  body.addEventListener("click", (e) => {
    if (e.target == modalContent) {
      modalContent.style.display = "none";
      // console.log(e.target);
    }
  });
}

//Supression des works grace a la méthode DELETE & au Token user depuis la poubelle de la modale

// console.log(token);

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
    // console.log(trash);
    fetch(`http://localhost:5678/api/works/${workID}`, deleteWorkID).then(
      () => {
        displayWorksModal();
        displayWorksGallery();
      }
    );
  });
}

//fonction d'affichage au click sur btn:"ajouter-photo" de la modalAddWorks
function displayModalAddWorks() {
  buttonAddPhoto.addEventListener("click", () => {
    modalPortfolio.style.display = "none";
    modalAddWorks.style.display = "flex";
  });
}

// Retour sur modalPortfolio depuis la flèche de la modalAddWorks
function returnToModalPortfolio() {
  const arrowLeftModalWorks = document.querySelector(
    ".modalAddWorks .fa-arrow-left"
  );
  arrowLeftModalWorks.addEventListener("click", () => {
    modalPortfolio.style.display = "flex";
    modalAddWorks.style.display = "none";
  });
}

// Récupération des Valeurs du Formulaire
function addWorks() {
  formAddWorks.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", inputFile.files[0]);
    formData.append("title", inputTitle.value);
    formData.append("category", inputCategory.value);
    // console.log(inputFile.files[0]);
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi du fichier");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Fichier envoyé avec succès :", data);
        displayWorksModal();
        displayWorksGallery();
        formAddWorks.reset();
        modalPortfolio.style.display = "flex";
        modalAddWorks.style.display = "none";
        previewImage.style.display = "none";
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  });
}

//Fonction qui génère les catégorie dynamiquement pour la modale
async function displayCategoryModal() {
  const select = document.querySelector("form select");
  const categorys = await getCategory();
  categorys.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    select.appendChild(option);
  });
}
//fonction prévisualisation de l'image
function prevImg() {
  inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    // console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      previewImage.style.display = "none";
    }
  });
}
// fontion qui vérifie si tout les inputs sont remplis
function verifFormCompleted() {
  const buttonValidForm = document.querySelector(
    ".container-button-add-work  button"
  );
  formAddWorks.addEventListener("input", () => {
    if (!inputTitle.value == "" && !inputFile.files[0] == "") {
      buttonValidForm.classList.remove("button-add-work");
      buttonValidForm.classList.add("buttonValidForm");
    } else {
      buttonValidForm.classList.remove("buttonValidForm");
      buttonValidForm.classList.add("button-add-work");
    }
  });
}
