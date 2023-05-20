let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
};


// Récupérer l'URL de la page actuelle
var currentUrl = window.location.pathname;

// Sélectionner tous les liens de navigation
var navLinks = document.querySelectorAll('.navbar a');

// Parcourir les liens de navigation
for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];

    // Vérifier si l'URL du lien correspond à l'URL de la page actuelle
    if (link.getAttribute('href') === currentUrl) {
        // Vérifier si la largeur de l'écran est supérieure à 1090px
        if (window.innerWidth > 1090) {
            // Appliquer la classe "active" au lien correspondant
            link.classList.add('active');
        }
    }
}

