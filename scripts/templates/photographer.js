// Fonction modèle pour créer un objet DOM représentant un photographe
function photographerTemplate(data) {
    // On extrait les propriétés utiles du photographe
    const { city, country, id, name, portrait, tagline, price } = data;

    // Construction du chemin vers l’image de portrait
    const picture = `assets/photographers/${portrait}`;

    // Fonction qui crée tout le HTML d’une "carte photographe"
    function getUserCardDOM() {
        // Création d’un conteneur principal
        const article = document.createElement("article");

        // Création d’un lien vers la page individuelle du photographe
        const link = document.createElement("a");
        link.setAttribute("href", `photographer.html?id=${id}`);
        link.setAttribute("aria-label", name); // pour l’accessibilité

        // Image du photographe
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);
        img.classList.add("profile-img"); // classe CSS pour la mise en forme

        // Nom du photographe
        const h2 = document.createElement("h2");
        h2.textContent = name;

        // Lieu (ville, pays)
        const location = document.createElement("p");
        location.classList.add("country");
        location.textContent = `${city}, ${country}`;

        // Slogan du photographe
        const taglineElem = document.createElement("p");
        taglineElem.classList.add("tagline");
        taglineElem.textContent = tagline;

        // Prix à la journée
        const priceElem = document.createElement("p");
        priceElem.classList.add("price");
        priceElem.textContent = `${price}€/jour`;

        // Ajout de l’image et du nom dans le lien
        link.appendChild(img);

        // Ajout de tous les éléments à l’article
        article.append(link, h2, location, taglineElem, priceElem);

        return article; // On retourne l’élément DOM complet
    }

    // On retourne le modèle avec ses données et sa fonction de génération
    return { name, picture, getUserCardDOM };
}
