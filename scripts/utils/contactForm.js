// Sélection des éléments DOM nécessaires
const modal = document.getElementById("contact_modal"); // Modale du formulaire
const form = document.querySelector("form"); // Formulaire
const inputs = document.querySelectorAll("form input"); // Tous les champs input
const inpFName = document.querySelector("#first-name");
const inpLName = document.querySelector("#last-name");
const inpMail = document.querySelector("#email");
const message = document.querySelector("#message");

const bodyEl = document.querySelector("body");
const headerEl = document.querySelector("header");
const mainEl = document.querySelector("main");

// Fonction pour afficher la modale
const displayModal = () => {
  initForm(); // Réinitialise le formulaire
  modal.style.display = "flex"; // Affiche la modale avec flex
  inpFName.focus(); // Focus automatique sur le prénom

  // Accessibilité : rôles et attributs ARIA
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-labelledby", "modal");
  modal.setAttribute(
    "aria-description",
    "formulaire de contact au photographe"
  );

  // Empêche le scroll en arrière-plan
  bodyEl.style.overflow = "hidden";
  headerEl.setAttribute("aria-hidden", "true");
  mainEl.setAttribute("aria-hidden", "true");
};

// Fonction pour fermer la modale
const closeModal = () => {
  modal.style.display = "none"; // Cache la modale
  form.reset(); // Réinitialise les champs

  // Suppression des attributs ARIA
  modal.removeAttribute("role");
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-labelledby");
  modal.removeAttribute("aria-description");

  // Réactive le scroll
  bodyEl.style.overflow = "auto";
  headerEl.removeAttribute("aria-hidden");
  mainEl.removeAttribute("aria-hidden");
};

// Affiche un message d'erreur
const displayError = (elDom, message) => {
  const inputEl = document.querySelector(elDom);
  inputEl.style.display = "block";
  inputEl.innerHTML = message;
};

// Cache un message d'erreur
const closeError = (elDom) => {
  const inputEl = document.querySelector(elDom);
  inputEl.style.display = "none";
};

// Fonction générique de validation
const checkInputValid = (inp, condition, pError, message) => {
  if (condition) {
    inp.classList.remove("input-error"); // Supprime la classe d’erreur
    closeError(pError); // Cache le message d’erreur
    return true;
  } else {
    inp.classList.add("input-error"); // Ajoute la classe d’erreur
    displayError(pError, message); // Affiche un message d’erreur
    return false;
  }
};

// Vérifie si l’input respecte un format (regex)
const getCondition = (input, regexFormat) => {
  const val = input.value.trim();
  return val.length > 0 && regexFormat.test(val);
};

// Validation du prénom
const checkFNameValid = () => {
  const nameFormat = /^[a-zA-Z- ]*$/; // Lettres, tirets et espaces
  return checkInputValid(
    inpFName,
    getCondition(inpFName, nameFormat),
    ".err-fname",
    "Veuillez entrer votre prénom avec au moins une lettre."
  );
};

// Validation du nom
const checkLNameValid = () => {
  const nameFormat = /^[a-zA-Z- ]*$/;
  return checkInputValid(
    inpLName,
    getCondition(inpLName, nameFormat),
    ".err-lname",
    "Veuillez entrer entrer votre nom avec au moins une lettre."
  );
};

// Validation de l’email
const checkMailValid = () => {
  const mailFormat = /^[a-z0-9._-]+@[a-z0-9-]+\.[a-z]{2,}$/i; // Regex email
  return checkInputValid(
    inpMail,
    getCondition(inpMail, mailFormat),
    ".err-email",
    "Email doit être sous forme abc@xyz.com"
  );
};

// Ajout d'écouteurs d'événement sur les champs pour valider à la volée
inpFName.addEventListener("change", checkFNameValid);
inpLName.addEventListener("change", checkLNameValid);
inpMail.addEventListener("change", checkMailValid);

// Gestion de la soumission du formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Empêche le rechargement de la page
  const allValid = [checkFNameValid(), checkLNameValid(), checkMailValid()].every(Boolean); // Vérifie tous les champs
  if (allValid) {
    // Affiche les données dans la console
    console.log("Données du form:");
    console.log(`Nom : ${inpLName.value}`);
    console.log(`Email: ${inpMail.value}`);
    console.log(`Message: ${message.value}`);
    form.reset(); // Réinitialise les champs
    closeModal(); // Ferme la modale
  } else {
    console.log("formulaire n'est pas terminé !");
  }
});

// Permet de fermer la modale avec la touche Escape
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    closeModal();
  }
});

// Réinitialise le formulaire et les messages d'erreur
const initForm = () => {
  form.reset();
  const messagesError = document.querySelectorAll('form div p');
  inputs.forEach(inp => inp.classList.remove("input-error"));
  messagesError.forEach(mes => mes.style.display = "none");
};

// Boutons pour ouvrir et fermer la modale
document.querySelector(".contact_button").addEventListener("click", displayModal);
document.querySelector(".btn-close").addEventListener("click", closeModal);
