import { toggleShow, checkEmail} from "./func.js";
("use strict");

/**
 * @module Main
 * @description  El modulo principal, el que engloba las caracteristicas comunes de cada pagina.
 */
window.addEventListener("load", function () {
    // MENU
    let menuResponsive = document.querySelector(".menu__responsive");
    let menuButton = document.querySelector(".menu-button");

    menuButton.addEventListener("click", function () {
        changenIconIn(menuButton);
        menuResponsive.classList.toggle("menu__responsive-show");
    });

    // SUBMENU
    let subMenuBtn = document.querySelector(".sub-menu");
    let subMenuDiv = document.querySelector(".sub-menu-div");

    subMenuBtn.addEventListener("click", function () {
        toggleShow(subMenuDiv);
        subMenuBtn.classList.toggle("bg-gray");
    });

    let subMenuResponsiveBtn = document.querySelector(".sub-menu__responsive");
    let subMenuResponsiveDiv = document.querySelector(".sub-menu__responsive-div");
    subMenuResponsiveBtn.addEventListener("click", function () {
        toggleShow(subMenuResponsiveDiv);
        subMenuResponsiveBtn.classList.toggle("bg-gray");

        let menuItemIcon = document.querySelector("#menu-item__icon");
        changeMenuItemIcon(menuItemIcon);
    });

    // FORM NEWSLATER

    let formNewsLater = document.querySelector("#suscribe-form");
    formNewsLater.addEventListener("submit", function (e) {
        let inputEmail = formNewsLater.querySelector('input[name="email"]');
        let email = inputEmail.value;
        let esValido = checkEmail(email);
        let existe = isEmailExists(email);

        if (esValido && !existe) {
            let emails = JSON.parse(localStorage.getItem("emailsNewslastter"));
            emails.push(email);
            localStorage.setItem("emailsNewslastter", JSON.stringify(emails));

            Swal.fire({
                icon: "success",
                title: "Congratulations",
                text: "You subscrine to our Newslatter",
                showConfirmButton: false,
                timer: 1500,
                width: 300,
            });
        } else if (existe) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your email is already subscribed!",
                width: 300,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something is wrong with your email!",
                width: 300,
            });
        }
        inputEmail.value="";
        e.preventDefault();
    });

    document.addEventListener("click", function (e) {
        if (!e.target.classList.contains("sub-menu")) {
            resetSubMenu(subMenuDiv, subMenuBtn);
        }
    });

    let mediaqueryList = window.matchMedia("(min-width: 1250px)");
    mediaqueryList.addEventListener("change", function () {
        if (mediaqueryList.matches) {
            resetSubMenu(subMenuDiv, subMenuBtn);
            resetMenuResponsive(menuResponsive, menuButton);
        }
    });
});

/**
 * Cambia las flechas del sub-menu-responsive.
 * @param {HTMLElement} menuItemIcon
 */
function changeMenuItemIcon(menuItemIcon) {
    if (menuItemIcon.classList.contains("fa-sort-down")) {
        menuItemIcon.classList.replace("fa-sort-down", "fa-sort-up");
        menuItemIcon.parentElement.style.top = "5px";
    } else {
        menuItemIcon.classList.replace("fa-sort-up", "fa-sort-down");
        menuItemIcon.parentElement.style.top = "-3px";
    }
}

/**
 *
 * @param {HTMLElement} subMenuDiv
 * @param {HTMLElement} subMenuBtn
 */
function resetSubMenu(subMenuDiv, subMenuBtn) {
    subMenuDiv.classList.add("display-none");
    subMenuBtn.classList.remove("bg-gray");
}

/**
 * Cambia el icono del menu-responsive, una x cuando esta abierto unas barras cuando este cerrado
 * @param {HTMLElement} menuButton
 */
function changenIconIn(menuButton) {
    let menuButtonSVG = menuButton.querySelector("svg");
    if (menuButtonSVG.classList.contains("fa-times")) {
        menuButtonSVG.classList.replace("fa-times", "fa-bars");
    } else {
        menuButtonSVG.classList.replace("fa-bars", "fa-times");
    }
}

/**
 * Oculta el menu y el boton, a este se le agrega la clase "fa-bars".
 * @param {HTMLElement} menuResponsive
 * @param {HTMLElement} menuButton
 */
function resetMenuResponsive(menuResponsive, menuButton) {
    let menuButtonSVG = menuButton.querySelector("svg");
    menuButtonSVG.classList.replace("fa-times", "fa-bars");
    menuResponsive.classList.remove("menu__responsive-show");
}

/**
 *
 * @param {String} email
 */
function isEmailExists(email) {
    let emails = localStorage.getItem("emailsNewslastter");
    if (emails) {
        let arrayEmails = JSON.parse(emails);
        for (let i = 0; i < arrayEmails.length; i++) {
            if (arrayEmails[i] === email) {
                return true;
            }
        }
        return false;
    } else {
        localStorage.setItem("emailsNewslastter", JSON.stringify([]));
        return false;
    }
}
