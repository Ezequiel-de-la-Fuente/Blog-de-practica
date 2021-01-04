import { toggleShow, checkEmail } from "./func.js";
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
        inputEmail.value = "";
        e.preventDefault();
    });

    // SUPORT
    document.querySelector("#sing-in").addEventListener("click", function () {
        sing("in").then((result) => {
            if (result.isConfirmed) {
                if (result.value) {
                    if (result.value.login && result.value.password) {
                        Swal.fire(
                            `
                                    Login: ${result.value.login}
                                    Password: ${result.value.password}
                                    `.trim()
                        );
                    }
                }
            } else if (result.isDenied) {
                sing("up").then((result) => {
                    if (result.isConfirmed) {
                        if (result.value) {
                            console.log(`Login: ${result.value.login}\nPassword: ${result.value.password}`);
                        }
                    }
                });
            }
        });
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
 *
 * @param {String} password
 */
function validatePassword(
    password,
    options = { minCharacters: 8, maxCharacters: 20,containLetters: true, containNumbers: true }
) {
    let length = password.length;
    let state = "Good";
    let minCharacters=false;
    let maxCharacters=false;
    let containNumbers=false;
    let containLetters=false;

    if (password.match(/\W/g)) return "Contain special characters!";

    if (length >= options.minCharacters && length <= options.maxCharacters) {
        minCharacters=true;
        maxCharacters=true;
        if (options.containLetters) {
            let letters = password.match(/[a-zA-Z]/gi);
            if (letters) {
                containLetters=true;
            } else {
                state = "Does not contain letters!";
            }
        }
        if (options.containNumbers) {
            let numbers = password.match(/\d/gi);
            if (!numbers) {
                state = "Does not contain numbers!";
            }else{
                containNumbers=true;
            }
        }
    } else if (length < options.minCharacters) {
        state = `Minimum ${options.minCharacters} characters in length!`;
    } else if (length > options.maxCharacters) {
        state = `Maximum ${options.maxCharacters} characters in length!`;
    }

    if(state!=='Good'){
        state="";
        if(minCharacters && maxCharacters){
            state += `<div><i class="fas fa-check"></i> ${options.minCharacters}-${options.maxCharacters} characters</div>`;
        }else{
            state += `<div><i class="fas fa-times"></i> ${options.minCharacters}-${options.maxCharacters} characters</div>`;
        }

        if(containLetters & containNumbers){
            state += '<div><i class="fas fa-check"></i> Contain letters and numbers!</div>' ;
        }else{
            state += '<div><i class="fas fa-times"></i> Contain letters and numbers!</div>' ;
        }
    }
    return state;
}

function sing(type) {
    let denyButtonText, preConfirm;
    if (type === "in") {
        denyButtonText = "Create an account";
        preConfirm = singIn;
    } else if (type === "up") {
        denyButtonText = "Cancel";
        preConfirm = singUp;
    }
    setTimeout(()=>{
        document.querySelector('#swal2-checkbox').addEventListener('click', function(){
            let passwordInput = document.querySelector("#password");
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
            } else {
                passwordInput.type = "password";
            }
        })
    },100);
    return Swal.fire({
        title: "Liternauts",
        html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
            <input type="password" id="password" class="swal2-input" placeholder="Password">
            <div style="display:flex; justify-content:center; align-items: center;">
                Show password
                <input style="margin-left:5px"type="checkbox" id="swal2-checkbox">
            </div>`,
        confirmButtonText: "Sing " + type,
        denyButtonText: denyButtonText,
        showDenyButton: true,
        confirmButtonColor: "#e74c3c",
        denyButtonColor: "#e67e22",
        preConfirm: preConfirm,
        customClass:{
            validationMessage:'div'
        },
        showCloseButton: true,
        position:'top',
        
    });
}

function singIn() {
    const login = Swal.getPopup().querySelector("#login").value;
    const password = Swal.getPopup().querySelector("#password").value;

    let usuerExists = false;
    let correctPassword = false;
    // let userList = JSON.parse(localStorage.getItem('userList'));
    let userList = [
        { username: "Pepe", password: "2202" },
        { username: "Pepito", password: "2202" },
    ];
    console.log(userList);
    userList.forEach((value) => {
        if (value.username === login) {
            usuerExists = true;
            if (value.password === password) {
                correctPassword = true;
            }
        }
    });
    if (login && password) {
        if (usuerExists) {
            if (correctPassword) {
                return { login: login, password: password };
            } else {
                Swal.showValidationMessage(`Incorrect password!`);
                return false;
            }
        } else {
            Swal.showValidationMessage(`Incorrect username!`);
            return false;
        }
    } else {
        Swal.showValidationMessage(`Please enter username and password`);
    }
}

function singUp() {
    const login = Swal.getPopup().querySelector("#login").value;
    const password = Swal.getPopup().querySelector("#password").value;

    let usuerExists = false;
    let strenghtPasswordMsg = validatePassword(password);
    // let userList = JSON.parse(localStorage.getItem('userList'));
    let userList = [
        { username: "Pepe", password: "2202" },
        { username: "Pepito", password: "2202" },
    ];
    console.log(userList);
    userList.forEach((value) => {
        if (value.username === login) {
            usuerExists = true;
        }
    });
    if (login && password) {
        if (usuerExists) {
            Swal.showValidationMessage(`Username exists!`);
            return false;
        } else {
            if (strenghtPasswordMsg === "Good") {
                return { login: login, password: password };
            } else {
                Swal.showValidationMessage(strenghtPasswordMsg);
                return false;
            }
        }
    } else {
        Swal.showValidationMessage(`Please enter username and password`);
    }
}

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


function myFunction() {
    var x = document.getElementById("#password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
