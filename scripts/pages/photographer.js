// Récupère l'identifiant du photographe depuis l'URL
const params = new URLSearchParams(window.location.search);
const photographerId = parseInt(params.get("id"), 10);

// Fonction asynchrone qui récupère les données JSON du photographe
async function getPhotographerData() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();

  // Retourne uniquement le photographe correspondant à l'ID
  return {
    photographer: data.photographers.find(p => p.id === photographerId),
  };
}

// Affiche les informations du photographe dans le header de la page
async function displayPhotographerProfile() {
  const data = await getPhotographerData();

  document.getElementById("modal-title").textContent = `Contactez-moi ${data.photographer.name}`;

  // Utilise le template pour injecter les infos dans le DOM
  const model = photographerTemplate(data.photographer);
  model.cardPhotographer();  

  const form = document.querySelector("#contact_modal form");
  form.setAttribute("novalidate", true); // ✅ désactive validation native

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();
    const firstName = document.getElementById("first");
    const lastName = document.getElementById("last");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    let isValid = true;
    if (!/^[a-zA-ZÀ-ÿ -]{1,}$/.test(firstName.value)) {
      showError(firstName, "Veuillez entrer votre prénom avec au moins une lettre.");
      isValid = false;
    }
    if (!/^[a-zA-ZÀ-ÿ -]{1,}$/.test(lastName.value)) {
      showError(lastName, "Veuillez entrer votre nom avec au moins une lettre.");
      isValid = false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
      showError(email, "Email doit être sous forme abc@xyz.com");
      isValid = false;
    }
    if (message.value.trim().length === 0) {
      showError(message, "Veuillez écrire un message.");
      isValid = false;
    }
    if (isValid) {
      console.log("Formulaire envoyé :", {
        prénom: firstName.value,
        nom: lastName.value,
        email: email.value,
        message: message.value
      });
      alert("Message envoyé avec succès !");
      form.reset();
      closeModal();
    }
  });

  function showError(element, message) {
    element.classList.add("error");
    const errorContainer = element.parentNode.querySelector(".error-message");
    if (errorContainer) errorContainer.textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
  }
}

// Initialise l'affichage
displayPhotographerProfile();
