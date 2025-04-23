const mediaTemplate = (data) => {
  // console.log(data);

  const cardMedia = () => {
    let media, source;
    const article = document.createElement("article");
    article.classList.add("media-infos");

    //photo ou vidéo et leur lien
    const a = document.createElement("a");
    a.setAttribute("href", "#lightbox");
    a.setAttribute("data-id", data.id);
    a.setAttribute("aria-label", `ouvrir ${data.title} en plein écran`);
    a.classList.add("link-lightbox");

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

    //description et favorite icons
    const description = document.createElement("div");
    description.classList.add("media-description");
    const nameMedia = document.createElement("p");
    nameMedia.classList.add("media-name");
    
    nameMedia.textContent = data.title;
    nameMedia.setAttribute("tabindex", "0");

    const favorite = document.createElement("div");
    favorite.setAttribute("data-id", data.id);
    favorite.classList.add("favorite");
    const btnIcon = document.createElement("button");
    btnIcon.setAttribute("aria-label", "pas encore aimé");

    const iconFavoriteFill = document.createElement("i");
    const iconFavoriteEmpty = document.createElement("i");

    iconFavoriteEmpty.classList.add("fa-regular", "fa-heart", "fa-heart-empty");
    iconFavoriteFill.classList.add("fa-solid", "fa-heart", "fa-heart-fill");

    const num = document.createElement("p");
    num.classList.add("number");
    num.textContent = data.likes;
    num.setAttribute("tabindex", "0");

    btnIcon.append(iconFavoriteEmpty, iconFavoriteFill);
    favorite.append(num, btnIcon);
    description.append(nameMedia, favorite);
    article.append(a, description);

    return article;
  }

  const addElLightbox = () => {
    const lightboxContent = document.querySelector(".lightbox-content");
    const htmlImage = `
        <img class="lightbox-media lightbox-image"src="${data.content}" alt="Photo ${data.title}" data-id="${data.id}">
        <h3 class="img-title">${data.title}</h3>
        `;
    const htmlVideo = `
        <video controls class="lightbox-media lightbox-video" data-id="${data.id}" aria-label="video ${data.title}">
            <source src="${data.content}" type="video/mp4">
        </video >
        <h3 class="video-title">${data.title}</h3>
        `;
    //effacer le média contenu avant de télécharger un nouveau média
    lightboxContent.innerHTML = "";

    if (data.type === "image")
      return lightboxContent.insertAdjacentHTML("beforeend", htmlImage);
    if (data.type === "video")
      {
        return lightboxContent.insertAdjacentHTML("beforeend", htmlVideo)};
    throw new Error("media's type not found");
  }

  //vérifier si le est déjà aimé
  const checkIsLiked = () => {
    const favorite = document.querySelector(`.favorite[data-id="${data.id}"]`);
    const heartEmp = favorite.querySelector(".fa-heart-empty");
    const heartFill = favorite.querySelector(".fa-heart-fill");

    if (data.isLiked === true) {
      heartFill.style.display = "block";
      heartEmp.style.display = "none";
      return
    }
    if (!data.isLike) {
      heartFill.style.display = "none";
      heartEmp.style.display = "block";
      return
    };
  }
  return { data, cardMedia, addElLightbox, checkIsLiked };
}