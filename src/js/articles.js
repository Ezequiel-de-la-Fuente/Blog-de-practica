'use strict';

window.addEventListener('load', function(){
    let id=parseInt(getParameterByName('page'));
    if(isNaN(id)){
        id=1;
    }
    let minId = (id-1)*16;
    if(minId!=0){
        minId++;
    }
    let maxId=minId+16;
    let linksDePaginacion=document.querySelectorAll('.paginacion a');
    if(getPostBy(minId,maxId)){

        if(id===1){
            linksDePaginacion[0].style.display="none";
            linksDePaginacion[2].setAttribute('href', `./articles.html?page=${id+1}`);
        }
        else{
            for(let i=0;i<3;i++){
                linksDePaginacion[i].setAttribute('href', `./articles.html?page=${id-1+i}`);
                if(i==1){
                    linksDePaginacion[i].innerHTML=id;
                }
            }
        }
    }else{
        linksDePaginacion[0].setAttribute('href', `./articles.html?page=${id-1}`);
        linksDePaginacion[1].innerHTML=id;
        linksDePaginacion[2].setAttribute('href', `./articles.html?page=1`);
        linksDePaginacion[2].innerHTML="Volver al inicio";
    }

    
    

});

function getPostBy(firstIndex=1, lastIndex=100){
    if(firstIndex<=0)firstIndex=1;
    else if(lastIndex>17)lastIndex--;
    let articles = document.querySelector('#articles');
    for(let i=firstIndex;i<=lastIndex;i++){
        if(i<=100){
            fetch(`https://jsonplaceholder.typicode.com/posts/${i}`)
            .then(function(data){
                return data.json();
            })
            .then(function(article){
                let innerHTML=`<div class="item-thumbnail" id="postId-${article.id}">
                <img src="https://picsum.photos/id/${article.id}/300/200">
                <div class="item-thumbnail-hover"></div>
                <div class="preloader"></div>
                <div class="title-container">
                    <h4 class="item-thumbnail-title"><a href="./article.html?postId=${article.id}">${article.title}</a></h4>
                </div>
            </div>`;
                articles.innerHTML+=innerHTML;
                document.querySelector(`#postId-${article.id} img`).addEventListener('error', function(){
                    document.querySelector('#articles').removeChild(document.querySelector(`#postId-${article.id}`))
                })
                setTimeout(()=>{
                    try {
                        document.querySelector(`#postId-${article.id}`).querySelector('.preloader').classList.add('display-none');
                    } catch (error) {
                        
                    }
                }, 2000);
            })
        }else{
            return false;
        }
    }
    return true;
}


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