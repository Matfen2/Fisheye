// eslint-disable-next-line no-unused-vars
const mediaTemplate = (data) => {
  // console.log(data);

  const cardMedia = () => {
    let media, source;
    const article = document.createElement("article"); // carte globale
    article.classList.add("media-infos");

    // Création du lien qui ouvrira la lightbox
    const a = document.createElement("a");
    a.setAttribute("href", "#lightbox");
    a.setAttribute("data-id", data.id);
    a.setAttribute("aria-label", `ouvrir ${data.title} en plein écran`);
    a.classList.add("link-lightbox");

    // Condition selon le type de média : image ou vidéo
    if (data.type === "video") {
      media = document.createElement("video");
      source = document.createElement("source");
      source.setAttribute("src", `${data.content}`);
      media.appendChild(source);
    } else if (data.type === "image") {
      media = document.createElement("img");
      media.setAttribute("src", `${data.content}`);
      media.setAttribute("alt", `Thumbnail de ${data.title}`);
    } else {
      throw new Error("Invalid type media");
    }

    a.appendChild(media);

    const description = document.createElement("div");
    description.classList.add("media-description");

    const nameMedia = document.createElement("p");
    nameMedia.classList.add("media-name");
    nameMedia.textContent = data.title;
    nameMedia.setAttribute("tabindex", "0"); // accessibilité clavier

    // Section des likes
    const favorite = document.createElement("div");
    favorite.setAttribute("data-id", data.id);
    favorite.classList.add("favorite");

    const btnIcon = document.createElement("button");
    btnIcon.setAttribute("aria-label", "pas encore aimé"); // accessibilité

    // Création des deux icônes (coeur vide et plein)
    const iconFavoriteFill = document.createElement("i");
    const iconFavoriteEmpty = document.createElement("i");

    iconFavoriteEmpty.classList.add("fa-regular", "fa-heart", "fa-heart-empty");
    iconFavoriteFill.classList.add("fa-solid", "fa-heart", "fa-heart-fill");

    // Affichage du nombre de likes
    const num = document.createElement("p");
    num.classList.add("number");
    num.textContent = data.likes;
    num.setAttribute("tabindex", "0");

    // Organisation finale
    btnIcon.append(iconFavoriteEmpty, iconFavoriteFill);
    favorite.append(num, btnIcon);
    description.append(nameMedia, favorite);
    article.append(a, description);

    return article;
  }

  const addElLightbox = () => {
    const lightboxContent = document.querySelector(".lightbox-content");

    // Template HTML selon le type de média
    const htmlImage = `
        <img class="lightbox-media lightbox-image" src="${data.content}" alt="Photo ${data.title}" data-id="${data.id}">
        <h3 class="img-title">${data.title}</h3>
    `;
    const htmlVideo = `
        <video controls class="lightbox-media lightbox-video" data-id="${data.id}" aria-label="video ${data.title}">
            <source src="${data.content}" type="video/mp4">
        </video>
        <h3 class="video-title">${data.title}</h3>
    `;

    // On vide l'ancien contenu avant d'insérer le nouveau média
    lightboxContent.innerHTML = "";

    // On insère le bon type
    if (data.type === "image")
      return lightboxContent.insertAdjacentHTML("beforeend", htmlImage);

    if (data.type === "video")
      return lightboxContent.insertAdjacentHTML("beforeend", htmlVideo);

    throw new Error("media's type not found");
  }


  const checkIsLiked = () => {
    const favorite = document.querySelector(`.favorite[data-id="${data.id}"]`);
    const heartEmp = favorite.querySelector(".fa-heart-empty");
    const heartFill = favorite.querySelector(".fa-heart-fill");

    if (data.isLiked === true) {
      heartFill.style.display = "block";
      heartEmp.style.display = "none";
      return;
    }

    // si isLiked est faux ou undefined
    if (!data.isLike) {
      heartFill.style.display = "none";
      heartEmp.style.display = "block";
      return;
    }
  }

  return { data, cardMedia, addElLightbox, checkIsLiked };
}