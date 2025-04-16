// Fonction qui génère un modèle de photographe à partir de ses données
function photographerTemplate(data) {
    // Déstructure les données du photographe
    const { city, country, id, name, portrait, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`; // chemin de l'image
  
    // Génère une carte pour la page d'accueil
    function getUserCardDOM() {
      const article = document.createElement("article");
  
      // Lien vers la page du photographe
      const link = document.createElement("a");
      link.setAttribute("href", `photographer.html?id=${id}`);
      link.setAttribute("aria-label", name);
  
      // Image du photographe
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", `Portrait de ${name}`);
      img.classList.add("profile-img");
  
      // Nom, localisation, slogan et prix
      const h2 = document.createElement("h2");
      h2.textContent = name;
  
      const location = document.createElement("p");
      location.classList.add("country");
      location.textContent = `${city}, ${country}`;
  
      const taglineElem = document.createElement("p");
      taglineElem.classList.add("tagline");
      taglineElem.textContent = tagline;
  
      const priceElem = document.createElement("p");
      priceElem.classList.add("price");
      priceElem.textContent = `${price}€/jour`;
  
      // Assemble les éléments
      link.appendChild(img);
      article.append(link, h2, location, taglineElem, priceElem);
      return article;
    }
  
    // Génère le header de la page photographe.html
    function cardPhotographer() {
      const btnContact = document.querySelector(".contact_button");
  
      const info = document.createElement("div");
      info.classList.add("photograph-info");
  
      const h1 = document.createElement("h1");
      h1.classList.add("photograph-name");
      h1.textContent = name;
  
      const h2 = document.createElement("h2");
      h2.classList.add("photograph-country");
      h2.textContent = `${city}, ${country}`;
  
      const p = document.createElement("p");
      p.classList.add("photograph-tagline");
      p.textContent = tagline;
  
      // Image du photographe à droite
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("img-container");
  
      const img = document.createElement("img");
      img.classList.add("photograph-image");
      img.setAttribute("src", picture);
      img.setAttribute("alt", name);
  
      // Assemble les éléments dans le header
      imgContainer.appendChild(img);
      info.append(h1, h2, p);
      btnContact.before(info);
      btnContact.after(imgContainer);
    }
  
    // Retourne les fonctions disponibles à l'extérieur
    return { name, picture, cardPhotographer, getUserCardDOM };
  }
  