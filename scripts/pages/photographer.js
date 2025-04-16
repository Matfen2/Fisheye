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

  // Utilise le template pour injecter les infos dans le DOM
  const model = photographerTemplate(data.photographer);
  model.cardPhotographer();  
}

// Initialise l'affichage
displayPhotographerProfile();
