/*****page de conexion js*****/
const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const tokenAdmin =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5OTQ2MDAxOCwiZXhwIjoxNjk5NTQ2NDE4fQ.P6XFYlRipnxbdLSMTWWlccNH-VgCR4j3ODXEgaj4F3Q";

/********Ecouteur d'évènement du Form de conexion***********/
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userEmail = email.value;
  const userPassword = password.value;
  const login = {
    email: userEmail,
    password: userPassword,
  };
  const chargeUtile = JSON.stringify(login);

  /****Envoi de la requette****/
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: chargeUtile,
  })
    // recupération de la réponse de la base de donnée
    .then((response) => {
      if (!response.ok) {
        email.style.border = "2px solid #FF0000";
        password.style.border = "2px solid #FF0000";
        const errorLogin = document.querySelector("p");
        errorLogin.textContent =
          "Le mot de passe ou l'identifiant que vous avez fourni est incorrect.";
        throw new Error("Je ne suis pas Admin");
      }
      return response.json(); // Cela parse la réponse JSON
    })
    .then((data) => {
      // Vous pouvez maintenant utiliser les données dans la variable "data"
      console.log(data);
      const userID = data.userId;
      const userToken = data.token;
      window.localStorage.loged = userToken;
      console.log("user ID: " + userID);
      console.log("user Token: " + userToken);
      if (userEmail === "sophie.bluel@test.tld" && userPassword === "S0phie") {
        console.log("je suis admin");
        email.style.border = "2px solid green";
        password.style.border = "2px solid green";
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
      console.error("Une erreur est survenue : ", error);
    });
});
