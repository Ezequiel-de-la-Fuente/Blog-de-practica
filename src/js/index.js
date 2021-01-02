'use strict';

window.addEventListener('load', function(){
    let btnMoveDown = document.querySelector('.btn-move-down');
    btnMoveDown.addEventListener('click', function(){
        startMoveDownAnimation();
        
    });

    let articles=document.querySelector('#main-articles');
    console.table(articles)
    for(let i=1;i<=4;i++){
        fetch(`https://jsonplaceholder.typicode.com/posts/${i}`)
            .then(article=>article.json())
            .then(article=>{
                let innerHTML=`<article class="main-article">
                <div class="main-article-img-container">
                    <img src="https://picsum.photos/id/${article.id}/300/200" alt="img">
                </div>

                <h4 class="main-article-title">${article.title}</h4>
                <p class="main-article-p">${article.body}</p>
                <a href="./article.html?postId-${article.id}" class="btn btn-orange">Reed more...</a>
                </article>`;

                articles.innerHTML+=innerHTML;
            })
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