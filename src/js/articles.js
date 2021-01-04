
'use strict';

/**
 * @module Articles
 */
import {getParameterByName, checkImages} from './func.js';
import {fetchPostBy} from './fetch.js';
window.addEventListener('load', function(){
    loadPage();
});

function loadPage() {
    let id = parseInt(getParameterByName('page'));
    if (isNaN(id)) {
        id = 1;
    }
    let minId = (id - 1) * 16;
    if (minId != 0) {
        minId++;
    }
    let maxId = minId + 16;

    let linksDePaginacion = document.querySelectorAll('.paginacion a');
    if (getPostBy(minId, maxId)) {
        if (id === 1) {
            initialPage(linksDePaginacion, id);
        }
        else {
            middlePage(linksDePaginacion, id);
        }
    } else {
        lastPage(linksDePaginacion, id);
    }
}

function lastPage(linksDePaginacion, id) {
    linksDePaginacion[0].setAttribute('href', `./articles.html?page=${id - 1}`);
    linksDePaginacion[1].innerHTML = id;
    linksDePaginacion[2].setAttribute('href', `./articles.html?page=1`);
    linksDePaginacion[2].innerHTML = "Volver al inicio";
}

function middlePage(linksDePaginacion, id) {
    for (let i = 0; i < 3; i++) {
        linksDePaginacion[i].setAttribute('href', `./articles.html?page=${id - 1 + i}`);
        if (i == 1) {
            linksDePaginacion[i].innerHTML = id;
        }
    }
}

function initialPage(linksDePaginacion, id) {
    linksDePaginacion[0].style.display = "none";
    linksDePaginacion[2].setAttribute('href', `./articles.html?page=${id + 1}`);
}

function getPostBy(firstIndex=1, lastIndex=100){
    if(firstIndex<=0)firstIndex=1;
    else if(lastIndex>17)lastIndex--;

    let articles = document.querySelector('#articles');
    for(let i=firstIndex;i<=lastIndex;i++){
        if(i<=100){
            fetchPostBy(i)
                .then(function(post){
                    articles.innerHTML+=createItemThumbnai(post);
                    checkImages();
                });
        }else{
            return false;
        }
    }
    return true;
}

/**
 * 
 * @param {{id:string, title:string}} post 
 */
function createItemThumbnai(post){
    return `<div class="item-thumbnail" id="postId-${post.id}">
    <img src="https://picsum.photos/id/${post.id}/300/200">
    <div class="item-thumbnail-hover"></div>
    <div class="preloader"></div>
    <div class="title-container">
        <h4 class="item-thumbnail-title"><a href="./article.html?postId=${post.id}">${post.title}</a></h4>
    </div>
</div>`
}