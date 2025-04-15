// Fonction qui récupère les données des photographes depuis le fichier JSON
async function getPhotographers() {
    // On effectue une requête HTTP pour charger le fichier JSON
    const response = await fetch('data/photographers.json');

    // On transforme la réponse en objet JavaScript
    const data = await response.json();

    // On retourne l'objet contenant les photographes
    return data;
}

// Fonction pour afficher les photographes sur la page d’accueil
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    // Pour chaque photographe, on crée et insère sa "carte" dans le DOM
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer); // création du modèle
        const userCardDOM = photographerModel.getUserCardDOM(); // génération du DOM
        photographersSection.appendChild(userCardDOM); // insertion dans la page
    });
}

// Fonction principale appelée au démarrage
async function init() {
    const { photographers } = await getPhotographers(); // récupération des données
    displayData(photographers); // affichage dans le DOM
}

init(); // Démarrage du script
