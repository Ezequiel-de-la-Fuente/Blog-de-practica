'use strict';
import {fetchPostBy} from './fetch.js'
/**
 * @module Index
 */
window.addEventListener('load', function(){
    let btnMoveDown = document.querySelector('.btn-move-down');
    btnMoveDown.addEventListener('click', function(){
        startMoveDownAnimation();
        
    });

    let articles=document.querySelector('#main-articles');
    for(let i=1;i<=4;i++){
        fetchPostBy(i)
            .then(post=>{
                articles.innerHTML+=createMainArticle(post);
            });
    }
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
/**
 * 
 * @param {{id:String, title:String, body:String}} post 
 * @returns {String} innerHTML
 */
function createMainArticle(post){
    let innerHTML = `<article class="main-article">
                <div class="main-article-img-container">
                    <img src="https://picsum.photos/id/${post.id}/700/500" alt="img">
                </div>

                <h4 class="main-article-title">${post.title}</h4>
                <p class="main-article-p">${post.body}</p>
                <a href="./article.html?postId=${post.id}" class="btn btn-orange">Reed more...</a>
                </article>`;
    return innerHTML;
}