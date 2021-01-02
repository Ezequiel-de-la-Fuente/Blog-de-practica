'use strict';

window.addEventListener('load', function(){
    let btnMoveDown = document.querySelector('.btn-move-down');
    btnMoveDown.addEventListener('click', function(){
        startMoveDownAnimation();
        
    });
});

/**
 * Inicia la animacion de desplazamiento hacia abajo.
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