/**
 *
 * @module Funcs
 */

/**
 *
 * @param {String} name
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * @returns {String} De la forma Janaury 20, 2010
 */
function getFormatedDate() {
    let date = new Date().toLocaleDateString("lts");
    let dateString = date.split("/");
    let month = parseInt(dateString[1]);
    let monthArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return `${monthArray[month - 1]} ${dateString[0]}, ${dateString[2]}`;
}

/**
 * Retorna un entero aleatorio entre min (incluido) y max (excluido)
 * @param {number} min
 * @param {number} max
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Revisa si las imagenes fueron cargadas correctamente
 */
function checkImages() {
    document.querySelectorAll("img").forEach(function (value) {
        value.onerror = function () {
            value.setAttribute("src", "./img/404.png");
        };
    });
}

/**
 * Crea un Elemento
 * @param {String} tagName
 * @param {String} className
 * @param {String} id
 * @returns {HTMLElement}
 */
function createElement(tagName, className = null, id = null) {
    let element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    if (id) {
        element.id = id;
    }
    return element;
}

/**
 *
 * @param {HTMLElement} element
 * @return {Boolean} Returns true if token is now present, and false otherwise.
 */
function toggleShow(element) {
    return element.classList.toggle("display-none");
}

/**
 * Revisa si el email, es efectivamente un email
 * @param {String} email
 */
function checkEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi.test(email);
}

/**
 * Valida la contraseña y devuelve su estado
 * @param {String} password
 */
function validatePassword(
    password,
    options = { minCharacters: 8, maxCharacters: 20, containLetters: true, containNumbers: true }
) {
    let length = password.length;
    let state = "Good";
    let minCharacters = false;
    let maxCharacters = false;
    let containNumbers = false;
    let containLetters = false;

    if (password.match(/\W/g)) return "Contain special characters!";

    if (length >= options.minCharacters && length <= options.maxCharacters) {
        minCharacters = true;
        maxCharacters = true;
        if (options.containLetters) {
            let letters = password.match(/[a-zA-Z]/gi);
            if (letters) {
                containLetters = true;
            } else {
                state = "Does not contain letters!";
            }
        }
        if (options.containNumbers) {
            let numbers = password.match(/\d/gi);
            if (!numbers) {
                state = "Does not contain numbers!";
            } else {
                containNumbers = true;
            }
        }
    } else if (length < options.minCharacters) {
        state = `Minimum ${options.minCharacters} characters in length!`;
    } else if (length > options.maxCharacters) {
        state = `Maximum ${options.maxCharacters} characters in length!`;
    }

    if (state !== "Good") {
        state = "";
        if (minCharacters && maxCharacters) {
            state += `<div><i class="fas fa-check"></i> ${options.minCharacters}-${options.maxCharacters} characters</div>`;
        } else {
            state += `<div><i class="fas fa-times"></i> ${options.minCharacters}-${options.maxCharacters} characters</div>`;
        }

        if (containLetters & containNumbers) {
            state += '<div><i class="fas fa-check"></i> Contain letters and numbers!</div>';
        } else {
            state += '<div><i class="fas fa-times"></i> Contain letters and numbers!</div>';
        }
    }
    return state;
}

/**
 * @returns {{username:String, password: String}} user 
 */
function getUserOnline(){
    let userOnline = JSON.parse(localStorage.getItem('userOnline'));
    if(userOnline){
        return userOnline;
    }else{
        localStorage.setItem('userOnline',JSON.stringify(""));
        return JSON.parse(localStorage.getItem('userOnline'));
    }
}

export {
    getParameterByName,
    getRandomInt,
    getFormatedDate,
    checkImages,
    createElement,
    toggleShow,
    checkEmail,
    validatePassword,
    getUserOnline
};
