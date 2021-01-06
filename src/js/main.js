import { toggleShow, checkEmail, validatePassword, getUserOnline } from "./func.js";
("use strict");

/**
 * @module Main
 * @description  El modulo principal, el que engloba las caracteristicas comunes de cada pagina.
 */
window.addEventListener("load", function () {
    // CHANGE LOGIN
    changeLogIn();

    // LOG OUT
    logOut();

    // Login & Sing up
    loginEvent();

    // MENU
    let menuResponsive = document.querySelector(".menu__responsive");
    let menuButton = document.querySelector(".menu-button");

    menuButton.addEventListener("click", function () {
        toggleMenuIcon(menuButton);
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
        toggleSubMenuIcon(menuItemIcon);
    });

    // FORM NEWSLATER
    let formNewsLater = document.querySelector("#suscribe-form");
    formNewsLater.addEventListener("submit", function (e) {
        let inputEmail = formNewsLater.querySelector('input[name="email"]');
        let email = inputEmail.value;
        let esValido = checkEmail(email);
        let existe = isEmailSubscribe(email);

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

    document.addEventListener("click", function (e) {
        if (!e.target.classList.contains("sub-menu")) {
            hideSubMenu(subMenuDiv, subMenuBtn);
        }
    });

    let mediaqueryList = window.matchMedia("(min-width: 1250px)");
    mediaqueryList.addEventListener("change", function () {
        if (mediaqueryList.matches) {
            hideSubMenu(subMenuDiv, subMenuBtn);
            hideMenuResponsive(menuResponsive, menuButton);
        }
    });

    document.addEventListener("click", function (e) {
        let target = e.target;
        if (target.id === "swal2-checkbox") {
            togglePasswordVisibility();
        }
    });
});

// MENU

/**
 * Cambia las flechas del sub-menu-responsive.
 * @param {HTMLElement} menuItemIcon
 */
function toggleSubMenuIcon(menuItemIcon) {
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
function hideSubMenu(subMenuDiv, subMenuBtn) {
    subMenuDiv.classList.add("display-none");
    subMenuBtn.classList.remove("bg-gray");
}

/**
 * Cambia el icono del menu-responsive, una x cuando esta abierto unas barras cuando este cerrado
 * @param {HTMLElement} menuButton
 */
function toggleMenuIcon(menuButton) {
    let menuButtonIcon = menuButton.querySelector("i");
    if (menuButtonIcon.classList.contains("fa-times")) {
        menuButtonIcon.classList.replace("fa-times", "fa-bars");
    } else {
        menuButtonIcon.classList.replace("fa-bars", "fa-times");
    }
}

/**
 * Oculta el menu y el boton, a este se le agrega la clase "fa-bars".
 * @param {HTMLElement} menuResponsive
 * @param {HTMLElement} menuButton
 */
function hideMenuResponsive(menuResponsive, menuButton) {
    let menuButtonIcon = menuButton.querySelector("i");
    menuButtonIcon.classList.replace("fa-times", "fa-bars");
    menuResponsive.classList.remove("menu__responsive-show");
}

// NEWSLATTER

/**
 *
 * @param {String} email
 */
function isEmailSubscribe(email) {
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

// Login, Logout and Sing up

/**
 * Abstraccion para utilizar en ambos sing
 * @param {String} type
 */
function sing(type) {
    let denyButtonText, preConfirm, confirmButtonText;
    if (type === "in") {
        denyButtonText = "Create an account";
        preConfirm = logIn;
        confirmButtonText = "Login";
    } else if (type === "up") {
        denyButtonText = "Cancel";
        preConfirm = singUp;
        confirmButtonText = "Sign up";
    }
    return formAlert(confirmButtonText, denyButtonText, preConfirm);
}


/**
 * Evento de login y SingUp
 */
function loginEvent() {
    document.querySelectorAll("#log-in, #log-in-responsive").forEach((element) => {
        element.addEventListener("click", function () {
            sing("in").then((result) => {
                if (result.isConfirmed) {
                    if (result.value) {
                        if (result.value.login && result.value.password) {
                            welcomeAlert(result);
                            setUserOnline(result.value);
                            hideLogIn();
                            showLogOut();
                            try {
                                showCommentForm(result.value.login);
                            } catch (error) {}
                        }
                    }
                } else if (result.isDenied) {
                    sing("up").then((result) => {
                        if (result.isConfirmed) {
                            if (result.value) {
                                addUser(result.value);
                            }
                        }
                    });
                }
            });
        });
    });
}

/**
 * @returns {{login:String, password:String} | boolean} Estado del login, si hay algun problema es falso. Sino es retorna un objeto.
 */
function logIn() {
    const login = Swal.getPopup().querySelector("#login").value;
    const password = Swal.getPopup().querySelector("#password").value;

    let usuerExists = false;
    let correctPassword = false;

    let userList = getUserList();
    console.table(userList);
    userList.forEach((value) => {
        if (value.login === login) {
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

/**
 * @returns {{login:String, password:String} | boolean} Estado del singUp, si hay algun problema es falso. Sino es retorna un objeto.
 */
function singUp() {
    const login = Swal.getPopup().querySelector("#login").value;
    const password = Swal.getPopup().querySelector("#password").value;

    let usuerExists = false;
    let strenghtPasswordMsg = validatePassword(password);
    let userList = getUserList();
    userList.forEach((value) => {
        if (value.login === login) {
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
 * 
 */
function logOut() {
    document.querySelectorAll("#log-out, #log-out-responsive").forEach(element=>{
        element.addEventListener("click", function () {
            warningAlert().then((result) => {
                if (result.isConfirmed) {
                    setUserOnline("");
                    showLogin();
                    hideLogOut();
                    hideCommentForm();
                }
            });
        });
    })
}

function showLogin() {
    document.querySelector("#log-in").parentElement.classList.remove("display-none");
    document.querySelector("#log-in-responsive").parentElement.classList.remove("display-none");
}
function hideLogIn() {
    document.querySelector("#log-in").parentElement.classList.add("display-none");
    document.querySelector("#log-in-responsive").parentElement.classList.add("display-none");
}

function showLogOut() {
    document.querySelector("#log-out").parentElement.classList.remove("display-none");
    document.querySelector("#log-out-responsive").parentElement.classList.remove("display-none");
}

function hideLogOut() {
    document.querySelector("#log-out").parentElement.classList.add("display-none");
    document.querySelector("#log-out-responsive").parentElement.classList.add("display-none");
}

/**
 * Oculta o muestra la contraseña
 */
function togglePasswordVisibility() {
    let passwordInput = document.querySelector("#password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

// ALERT

function warningAlert() {
    return Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#555",
        confirmButtonText: "Yes, logout!",
        position: "top",
    });
}

function welcomeAlert(result) {
    Swal.fire({
        title: "Hello " + result.value.login,
        text: "Welcome back!",
        imageUrl: "./img/write.jpg",
        imageWidth: 400,
        imageHeight: 200,
        showConfirmButton: false,
        imageAlt: "Custom image",
        timer: 1500,
    });
}

/**
 *
 * @param {String} confirmButtonText
 * @param {String} denyButtonText
 * @param {Function} preConfirm
 */
function formAlert(confirmButtonText, denyButtonText, preConfirm) {
    return Swal.fire({
        title: "Liternauts",
        html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
            <input type="password" id="password" class="swal2-input" placeholder="Password">
            <div style="display:flex; justify-content:center; align-items: center;">
                Show password
                <input style="margin-left:5px"type="checkbox" id="swal2-checkbox">
            </div>`,
        confirmButtonText: confirmButtonText,
        denyButtonText: denyButtonText,
        showDenyButton: true,
        confirmButtonColor: "#e74c3c",
        denyButtonColor: "#e67e22",
        preConfirm: preConfirm,
        customClass: {
            validationMessage: "div",
        },
        showCloseButton: true,
        position: "top",
    });
}

// USER-ONLINE

function changeLogIn() {
    let userOnline = getUserOnline();
    if (userOnline) {
        document.querySelector("#log-in").parentElement.classList.add("display-none");
        document.querySelector("#log-out").parentElement.classList.remove("display-none");
        document.querySelector("#log-in-responsive").parentElement.classList.add("display-none");
        document.querySelector("#log-out-responsive").parentElement.classList.remove("display-none");
    }
}

// USER-LIST
/**
 * @returns {Array<{username:String, password: String}>}
 */
function getUserList() {
    let userList = JSON.parse(localStorage.getItem("userList"));
    if (userList) {
        return userList;
    } else {
        localStorage.setItem("userList", JSON.stringify([]));
        return getUserList();
    }
}

/**
 *
 * @param {{username:String, password: String}} user
 */
function addUser(user) {
    let userList = getUserList();
    userList.push(user);
    localStorage.setItem("userList", JSON.stringify(userList));
}

/**
 * @param {{username:String, password: String}} user
 */
function setUserOnline(user) {
    localStorage.setItem("userOnline", JSON.stringify(user));
}

// COMMENT FORM

function showCommentForm(login) {
    let formComment = document.querySelector(".form-comment");
    formComment.classList.remove("display-none");
    formComment.querySelector(".comment-username").textContent = `${login}`;
    return true;
}

function hideCommentForm() {
    let formComment = document.querySelector(".form-comment");
    formComment.classList.add("display-none");
    formComment.querySelector(".comment-username").textContent = ``;
}
