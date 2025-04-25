/* global photographerTemplate, getPhotographers */
const displayData = (photographers) => {
  // On sélectionne la section du DOM où les cartes des photographes seront affichées
  const photographersSection = document.querySelector(".photographer_section");

  // Pour chaque photographe, on génère une carte DOM et on l'ajoute à la page
  photographers.forEach((photographer) => {
    // Création d’un modèle DOM pour le photographe à partir des données
    const photographerModel = photographerTemplate(photographer);

    // Récupère l'élément DOM prêt à être inséré dans la page (la carte du photographe)
    const userCardDOM = photographerModel.getUserCardDOM();

    // Ajoute la carte du photographe à la section principale
    photographersSection.appendChild(userCardDOM);
  });
};

  
const initPageIndex = async () => {
  try {
    // Récupération des données des photographes à partir du fichier JSON (appel asynchrone)
    const photographers = await getPhotographers("data/photographers.json");



    // Appelle la fonction d'affichage avec les données récupérées de photograph.js (pages) l-164
    displayData(photographers);
  } catch (err) {
    // Gestion des erreurs lors de la récupération des données
    console.error(err);
  }
};

// Lancement de la page avec récupération et affichage des photographes
initPageIndex();
