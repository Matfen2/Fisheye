// eslint-disable-next-line no-unused-vars
const photographerTemplate = (data) => {
  // Déstructuration des données du photographe
  const { city, country, id, name, portrait, price, tagline } = data;

  // Création du chemin vers l'image du photographe
  const picture = `assets/photographers/${portrait}`;

  const getUserCardDOM = () => {
    const link = document.createElement("a");
    const article = document.createElement("article");
    const img = document.createElement("img");

    // Le lien mène à la page détaillée du photographe
    link.setAttribute("href", `photographer.html?id=${id}`);
    img.setAttribute("src", picture);
    img.setAttribute("id", id);
    img.setAttribute("alt", `Portrait de ${name}`);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    // Le lien contient l'image et le nom
    link.append(img, h2);

    // Description contenant la localisation, tagline et tarif
    const descriptionBox = document.createElement("div");
    const h3 = document.createElement("h3");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");

    descriptionBox.classList.add("description");
    descriptionBox.setAttribute("tabindex", "0"); // Accessibilité clavier
    h3.classList.add("country");
    p1.classList.add("tagline");
    p2.classList.add("price");

    h3.textContent = `${city}, ${country}`;
    p1.textContent = tagline;
    p2.textContent = `${price}€/jour`;

    descriptionBox.append(h3, p1, p2);

    // Article final contenant tout
    article.append(link, descriptionBox);

    return article;
  };

  // Affichage des informations du photographe sur sa page dédiée (photographer.html).
    const cardPhotographer = () => {
      const btnContact = document.querySelector(".contact_button");
  
      const photographInfo = document.createElement("div");
      photographInfo.classList.add("photograph-info");
  
      const h1 = document.createElement("h1");
      h1.classList.add("photograph-name");
      h1.textContent = name;
  
      const h2 = document.createElement("h2");
      h2.classList.add("photograph-country");
      h2.textContent = city + ", " + country;
  
      const p = document.createElement("p");
      p.classList.add("photograph-tagline");
      p.textContent = tagline;
  
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("img-container");
  
      const img = document.createElement("img");
      img.classList.add("photograph-image");
      img.setAttribute("src", picture);
      img.setAttribute("alt", name);
      imgContainer.append(img);
  
      photographInfo.append(h1, h2, p);
      btnContact.before(photographInfo);
      btnContact.after(imgContainer);
    }
  
    const cardPrice = () => {
      const main = document.querySelector("#main");
  
      const cardPrice = document.createElement("section");
      cardPrice.classList.add("card-price");
  
      const sumPrice = document.createElement("h3");
      sumPrice.classList.add("sum-likes");
      const iconheart = document.createElement("i");
      iconheart.classList.add("fa-solid", "fa-heart");
  
      const pricePerDay = document.createElement("h3");
      pricePerDay.classList.add("price-per-day");
      pricePerDay.textContent = price + "€/jour";
  
      cardPrice.append(sumPrice, iconheart, pricePerDay);
      main.appendChild(cardPrice);
    }
  
    const nameForForm = () => {
      const btnClose = document.querySelector(".btn-close");
      const h2 = document.createElement("h2");
      h2.textContent = "Contactez-moi " + name;
      btnClose.before(h2);
    }
  
    return {
      city,
      country,
      id,
      name,
      portrait,
      price,
      tagline,
      getUserCardDOM,
      cardPhotographer,
      cardPrice,
      nameForForm,
    };
  }