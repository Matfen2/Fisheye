// Classe de base MediaFactory avec les attributs communs à tous les médias
class MediaFactory {
  constructor(mediaObj) {
    this._id = mediaObj.id;                       // ID du média
    this._photographerId = mediaObj.photographerId; // ID du photographe propriétaire du média
    this._title = mediaObj.title;                 // Titre du média
    this._likes = mediaObj.likes;                 // Nombre de likes
    this._date = mediaObj.date;                   // Date d’ajout du média
    this._price = mediaObj.price;                 // Prix (peut être utilisé dans une logique de panier ou de rémunération)
  }

  // Getter du type (défini dans les classes filles)
  get type() {
    return this._type;
  }

  // Getters classiques
  get title() {
    return this._title;
  }

  get id() {
    return this._id;
  }

  get photographerId() {
    return this._photographerId;
  }

  get likes() {
    return this._likes;
  }

  // Setter pour modifier dynamiquement les likes (utile pour le bouton like)
  set likes(newValue) {
    this._likes = newValue; 
  }

  get date() {
    return this._date;
  }

  get price() {
    return this._price;
  }
}

// Classe dédiée aux vidéos, héritant de MediaFactory
class Video extends MediaFactory {
  constructor(mediaObj) {
    super(mediaObj);             // Appel au constructeur parent
    this._video = mediaObj.video; // Chemin du fichier vidéo
    this._type = "video";         // Type explicite (utile pour l’affichage conditionnel)
  }

  // Retourne le chemin complet vers le fichier vidéo
  get content() {
    return `assets/images/${this._video}`;
  }
}

// Classe dédiée aux images (renommée en Img pour éviter les conflits avec Image natif du navigateur)
class Img extends MediaFactory {
  constructor(mediaObj) {
    super(mediaObj);             // Appel au constructeur parent
    this._image = mediaObj.image; // Chemin du fichier image
    this._type = "image";         // Type explicite
  }

  // Retourne le chemin complet vers le fichier image
  get content() {
    return `assets/images/${this._image}`;
  }
}

// Fonction principale qui retourne un objet Img ou Video selon le contenu reçu
// eslint-disable-next-line no-unused-vars
const factory = (mediaObj) => {
  if (mediaObj.image && mediaObj.image.length > 0) {
    return new Img(mediaObj);
  }
  if (mediaObj.video && mediaObj.video.length > 0) {
    return new Video(mediaObj);
  }
  throw new Error("type media not found");
};
