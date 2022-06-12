function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBackground = document.querySelector(".bground");
const buttonRegistration = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
// TODO #201 cibler le control de fermeture de la modale
const modalClosure = document.querySelector(".close");
// const textControl = document.getElementsByClassName(".text-control");

// modal event
buttonRegistration.forEach((btn) => btn.addEventListener("click", commandModal));
// TODO #202 évènement déclenchant la fermeture de la modale
modalClosure.addEventListener("click", commandModal);
// launch or close modal form
// TODO #203 fonction commandant l'ouverture ou la fermeture de la modale
function commandModal(event) {
  if (event.currentTarget.className == "btn-signup modal-btn")
    modalBackground.style.display = "block";
  else if (event.currentTarget.className == "close") {
    const modalContent = document.querySelector(".content");
    // TODO #204 animer la fermeture de la modale
    modalContent.animate([
      {opacity: 1, transform: 'translateY(0px)', easing: 'ease-out'},
      {opacity: 0, transform: 'translateY(-160px)'}
    ], 1000
    );
    // attend la fin de l'animation pour faire disparaitre la modale
    Promise.all(
      modalContent.getAnimations().map(animation => animation.finished)
    ).then(() => modalBackground.style.display = "none");
  }
}
// TODO créer la fonction de validation des champs du formulaire

// gestion des erreurs
formData.forEach((value) => value.addEventListener("focusout", validContent));
function validContent(event) {
  var inputData = event.target;
  var formData = event.currentTarget;
  formData.setAttribute("data-error-visible", (inputData.validity.valid) ? "false" : "true");
  console.log(formData);
}