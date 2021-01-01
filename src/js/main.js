'use strict';

window.addEventListener('load', function(){
    let menuResponsive=document.querySelector('.menu__responsive');
    let menuButton=document.querySelector('.menu-button');

    menuButton.addEventListener('click', function(){
        changenIconIn(menuButton);
        menuResponsive.classList.toggle('menu__responsive-show');
    });

    let mediaqueryList = window.matchMedia("(min-width: 1250px)");
    mediaqueryList.addEventListener('change', function(){
        if(mediaqueryList.matches){
            resetMenuResponsive(menuResponsive, menuButton);
        }
    });


    let btnMoveDown = document.querySelector('.btn-move-down');
    btnMoveDown.addEventListener('click', function(){
        startMoveDownAnimation();
    });
});

/**
 * Inicia la animacion de desplazamiento hacia abajo
 */
function startMoveDownAnimation() {
    let presentationOne = document.querySelector('#presentation-one');
    let listOfIntervalIds=[];
    let id = setInterval(() => {
        if (window.scrollY > 50 + presentationOne.clientHeight) {
            listOfIntervalIds.forEach(value => clearInterval(value));
        } else {
            window.scroll(window.scrollX, window.scrollY + 3);
            if (!listOfIntervalIds.includes(id)) {
                listOfIntervalIds.push(id);
            }
        }
    }, 1);
}

/**
 * 
 * @param {HTMLElement} menuButton 
 */
function changenIconIn(menuButton) {
    let menuButtonSVG = menuButton.querySelector('svg');
    if (menuButtonSVG.classList.contains('fa-times')) {
        menuButtonSVG.classList.replace('fa-times', 'fa-bars');
    } else {
        menuButtonSVG.classList.replace('fa-bars', 'fa-times');
    }
}

/**
 * Vuelvo a su forma normal al boton ocultandolo y al menu lo vuelve a esconder
 * @param {HTMLElement} menuResponsive 
 * @param {HTMLElement} menuButton 
 */
function resetMenuResponsive(menuResponsive, menuButton) {
    let menuButtonSVG = menuButton.querySelector('svg');
    menuButtonSVG.classList.replace('fa-times', 'fa-bars');
    menuResponsive.classList.remove('menu__responsive-show');
}

