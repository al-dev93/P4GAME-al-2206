//* déclarions globales
const maxAge = 70; // age maximun pour l'inscription
const minAge = 18; // age minimum pour l'inscription

//COMMENT: classe pour la définition des dates minimale et maximale
//  acceptées pour l’inscription
class DateForm {
  constructor(minAge, maxAge) {
    this.younger = minAge;
    this.older = maxAge;
    this.actualDate = new Date();
  }
  //COMMENT: méthode renvoyant le mois et le jour actuel au format
  //  compatible avec les attributs min et max du champ date
  getMonthDayDate() {
    let month = this.actualDate.getMonth() + 1;
    return (
      (month < 10 ? `0${month}` : `${month}`) + `-${this.actualDate.getDate()}`
    );
  }
  //COMMENT: méthode calculant l'année maximale et renvoyant la date maxi
  //  au format compatible avec max
  getMaxDate() {
    let year = this.actualDate.getFullYear() - this.younger;
    return `${year}-` + this.getMonthDayDate();
  }
  //COMMENT: méthode calculant l'année minimale et renvoyant la date mini
  //  au format compatible avec min
  getMinDate() {
    let year = this.actualDate.getFullYear() - this.older;
    return `${year}-` + this.getMonthDayDate();
  }
}

//COMMENT: Objet pour la gestion des dates d’inscription
const dateRegistration = new DateForm(minAge, maxAge);

//COMMENT: function ajoutant la classe responsive pour le menu sur affichage mobile
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//* gestion des éléments du DOM
//COMMENT:  ciblages des éléments pour le contrôle de la modale
const modalBackground = document.querySelector(".bground");
const buttonRegistration = document.querySelectorAll(".modal-btn");
//COMMENT: ciblage pour la fermeture de la modale
const modalClosure = document.querySelector(".close");
//COMMENT: ciblages pour la validation des champs du formulaire
const formData = document.querySelectorAll(".formData");
//COMMENT: ciblage pour la validation du formulaire
const formRegistration = document.getElementsByTagName("form")[0];
const formDisabled = document.querySelector(".modal-body");
const validationConfirm = document.querySelector(".confirm-submit");

//*  Gestion de la modale
//COMMENT: appel de l'ouverture au click sur le bouton
buttonRegistration.forEach((btn) => btn.addEventListener("click", openModal));

//NOTE: appel de la fonction de fermeture au click sur la croix
modalClosure.addEventListener("click", closeModal);

//COMMENT: fonction pour l'ouverture de la modale
function openModal() {
  const formBirthday = document.querySelector('input[type="date"]');
  //COMMENT: ouverture de la modale en retirant la classe disabled
  modalBackground.classList.remove("disabled");
  //COMMENT: fonction mettant à jour les attributs du champ date
  //  min et max avec l'objet dateRegistration
  formBirthday.setAttribute("min", dateRegistration.getMinDate());
  formBirthday.setAttribute("max", dateRegistration.getMaxDate());
}

//NOTE: fonction pour la fermeture de la modale
function closeModal() {
  //COMMENT: désactive le message de confirmation et la modale
  validationConfirm.classList.add("disabled");
  modalBackground.classList.add("disabled");
  //COMMENT: active à nouveau le formulaire
  formDisabled.classList.remove("disabled");
}

//* Gestion du formulaire
//NOTE: validation des champs du formulaire après changement
formData.forEach((value) => value.addEventListener("change", validContent));
function validContent(event) {
  const inputData = event.target;
  const formData = event.currentTarget;
  formData.setAttribute(
    "data-error-visible",
    inputData.validity.valid ? "false" : "true"
  );
}

//NOTE: validation du formulaire et envoi
formRegistration.addEventListener("submit", validSubmit);
function validSubmit(event) {
  const formInputRequired = document.querySelectorAll('input[required=""]');
  let numberOfErrors = 0;
  //NOTE: vérification de la validité de tous les champs requis
  for (const inputRequired of formInputRequired) {
    let formData = inputRequired.parentElement;
    if (inputRequired.value == "" || !inputRequired.validity.valid) {
      formData.setAttribute("data-error-visible", "true");
      numberOfErrors++;
    }
  }
  //COMMENT: si le formulaire ne contient pas d'erreurs ouverture du message de confirmation
  //  désactivation et réinitialisation du formulaire
  if (numberOfErrors == 0) {
    validationConfirm.classList.remove("disabled");
    formDisabled.classList.add("disabled");
    formRegistration.reset();
  }
  event.preventDefault();
}
