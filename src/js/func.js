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
    let date=new Date().toLocaleDateString('lts');
    let dateString = date.split('/');
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
    return `${monthArray[month-1]} ${dateString[0]}, ${dateString[2]}`;
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
    document.querySelectorAll("img").forEach(function(value) { 
        value.onerror=function(){
            value.setAttribute('src', './img/404.png');
        }
    }); 
}; 

/**
 * Crea un Elemento
 * @param {String} tagName 
 * @param {String} className 
 * @param {String} id 
 * @returns {HTMLElement}
 */
function createElement(tagName, className=null, id=null){
    let element = document.createElement(tagName);
    if(className){
        element.className=className;
    }
    if(id){
        element.id=id;
    }
    return element;
}


/**
 * 
 * @param {HTMLElement} element 
 * @return {Boolean} Returns true if token is now present, and false otherwise.
 */
function toggleShow(element){
    return element.classList.toggle('display-none')
}

/**
 * Revisa si el email, es efectivamente un email
 * @param {String} email 
 */
function checkEmail(email){
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi.test(email);
}


export {getParameterByName, getRandomInt, getFormatedDate, checkImages, createElement, toggleShow, checkEmail};


