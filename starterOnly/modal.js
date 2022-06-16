//COMMENT: déclarions globales
const maxAge = 70; // age maximun pour l'inscription
const minAge = 18; // age minimum pour l'inscription

//COMMENT: classe pour la définition des dates minimale et maximale
//  acceptées pour l'insciption
class DateForm {
  constructor(minAge, maxAge) {
    this.younger = minAge;
    this.older = maxAge;
    this.actualDate = new Date();
  }
  //COMMENT: méthode renvoyant le mois et le jour actuel au format
  //  compatible avec les attributs min et max du champ date
  getMonthDayDate() {
    let month = this.actualDate.getMonth()+1;
    return ((month < 10)? `0${month}`:`${month}`)+`-${this.actualDate.getDate()}`;
  }
  //COMMENT: méthode calculant l'année maximale et renvoyant la date maxi
  //  au format compatible avec max
  getMaxDate() {
    let year = this.actualDate.getFullYear()-this.younger;
    return `${year}-`+this.getMonthDayDate();
  }
  //COMMENT: méthode calculant l'année minimale et renvoyant la date mini
  //  au format compatible avec min
  getMinDate() {
    let year = this.actualDate.getFullYear()-this.older;
    return `${year}-`+this.getMonthDayDate();
  }
}

//COMMENT: Objet de gestion des dates d'insciption
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

//COMMENT: gestion des éléments du DOM
//  ciblages des élements pour le contrôle de la modale
const modalBackground = document.querySelector(".bground");
const buttonRegistration = document.querySelectorAll(".modal-btn");
//COMMENT: ciblage pour la fermeture de la modale
const modalClosure = document.querySelector(".close");
//COMMENT: ciblages pour la validation des champs du formulaire
const formData = document.querySelectorAll(".formData");
const formBirthday = document.querySelector('input[type="date"]');
const formInputRequired = document.querySelectorAll('input[required=""]');
//COMMENT: ciblage pour la validation du formulaire
const formRegistration = document.getElementsByTagName("form")[0];

//COMMENT: contrôle des évènements de la modale
buttonRegistration.forEach((btn) => btn.addEventListener("click", commandModal));

//COMMENT: évènement déclenchant la fermeture de la modale
modalClosure.addEventListener("click", commandModal);

//COMMENT: fonction pour l'ouverture et la fermeture de la modale
function commandModal(event) {
  if (event.currentTarget.className == "btn-signup modal-btn") {
    modalBackground.style.display = "block";
    //COMMENT: fonction mettant à jour les attributs 
    //  min et max à l'aide de l'objet dateRegistration
    formBirthday.setAttribute("min", dateRegistration.getMinDate());
    formBirthday.setAttribute("max", dateRegistration.getMaxDate());
  }
  else if (event.currentTarget.className == "close") {
    const modalContent = document.querySelector(".content");
    //COMMENT: animation pour la fermeture de la modale
    modalContent.animate([
      {opacity: 1, transform: 'translateY(0px)', easing: 'ease-out'},
      {opacity: 0, transform: 'translateY(-160px)'}
    ], 1000
    );
    //COMMENT: attend la fin de l'animation pour faire disparaitre la modale
    Promise.all(
      modalContent.getAnimations().map(animation => animation.finished)
    ).then(() => modalBackground.style.display = "none");
  }
}

//COMMENT: validation des champs du formulaire après changement
formData.forEach((value) => value.addEventListener("change", validContent));
function validContent(event) {
  const inputData = event.target;
  const formData = event.currentTarget;
  formData.setAttribute("data-error-visible", (inputData.validity.valid) ? "false" : "true");
}

//COMMENT: validation du formulaire avant l'envoi
formRegistration.addEventListener("submit", validSubmit);
function validSubmit(event) {
  let numberOfErrors = 0;
  for (const inputRequired of formInputRequired) {
    let formData = inputRequired.parentElement;
    if(inputRequired.value == "" || !inputRequired.validity.valid) {
      formData.setAttribute("data-error-visible", "true");
      numberOfErrors++;
    }
  }
  if(numberOfErrors > 0) event.preventDefault();
}
