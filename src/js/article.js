"use strict";

window.addEventListener("load", function () {
    let postId = getParameterByName("postId");
    // console.log(postId)
    if(!postId){
        postId=1;
    }

    let articles=document.querySelector('#main-articles');
    let arrayNumber=[];
    // console.table(articles)
    for(let i=1;i<=4;i++){
        let number=1;
        do{
            number=getRandomInt(1, 100);
            if(!arrayNumber.includes(number)){
                arrayNumber.push(number);
            }else{
                break;
            }
        }while(number!==postId);
        fetch(`https://jsonplaceholder.typicode.com/posts/${number}`)
            .then(article=>article.json())
            .then(article=>{
                let innerHTML=`<article class="main-article">
                <div class="main-article-img-container">
                    <img src="https://picsum.photos/id/${article.id}/300/200" alt="img">
                </div>

                <h4 class="main-article-title">${article.title}</h4>
                <p class="main-article-p">${article.body}</p>
                <a href="./article.html?postId=${article.id}" class="btn btn-orange">Reed more...</a>
                </article>`;

                articles.innerHTML+=innerHTML;
            });
        }
    fetch("https://jsonplaceholder.typicode.com/posts/" + postId)
        .then((post) => post.json())
        .then((post) => {
            let articleDiv = document.querySelector(".article");
            fetch("https://jsonplaceholder.typicode.com/users/" + post.userId)
                .then((user) => user.json())
                .then((user) => {
                    articleDiv.innerHTML = `<h1 class="article-title">${post.title}</h1>
                    <h3 class="article-info">By ${user.username} posted ${getFormatedDate()}</h3>
                    <p class="article-p">Let’s imagine a man called Peter leaving the gym and running to his car with his duffel
                        bag over his head to protect himself from the rain. When he reaches the car and is about to open the
                        door, he stops because he sees Laura, his best friend’s girlfriend, kissing another man on the opposite
                        sidewalk. The girl is wearing a pair of sunglasses, but all the same, he recognizes her.</p>
                    <br>
                    <p class="article-p">
                        ${post.body}
                    </p>
                    <br>
                    <p class="article-p">Eventually, regardless of the rain, he returns the phone to his bag, gets out of the
                        car, crosses the
                        street, and enters the café. Laura is sitting at a table, chatting away with her companion. Peter
                        approaches them and sits in front of the girl. Looking at him from behind the sunglasses she has not yet
                        removed, she asks, “What are you doing here?” Peter ignores the question, sneers at her, and says,
                        “Would you call this a little mistake too, or is it just me?”</p>
                    <br>
                    <p class="article-p">All right, then! Let’s see how to introduce conflict in this story:</p>
        
        
                    <div class="article-img-container">
                        <img src="https://picsum.photos/id/${post.id}/1100/800" class="article-img">
                        <div class="preloader" id="preloader__big"></div>
                        <div class="title-container">
                            <h4 class="article-img-title">Lorem ipsum dolor sit amet consectetur adipisicing.</h4>
                        </div>
                    </div>
        
                    <div class="article-tipList">
                        <div class="article-tipList-item">
                            <span>Lorem ipsum dolor sit amet consectetur.</span>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, suscipit neque excepturi
                                cupiditate molestiae id dolorem iusto debitis aspernatur temporibus.</p>
                        </div>
        
                        <div class="article-tipList-item">
                            <span>Lorem ipsum dolor sit amet consectetur.</span>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, suscipit neque excepturi
                                cupiditate molestiae id dolorem iusto debitis aspernatur temporibus.</p>
                        </div>
        
                        <div class="article-tipList-item">
                            <span>Lorem ipsum dolor sit amet consectetur.</span>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, suscipit neque excepturi
                                cupiditate molestiae id dolorem iusto debitis aspernatur temporibus.
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro dicta dolore culpa? Placeat,
                                reiciendis soluta nobis maxime ratione optio magnam recusandae fugiat, ex perferendis temporibus
                                mollitia ducimus ipsa autem laborum.</p>
                        </div>
        
                        <div class="article-tipList-item">
                            <span>Lorem ipsum dolor sit amet consectetur.</span>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, suscipit neque excepturi
                                cupiditate molestiae id dolorem iusto debitis aspernatur temporibus.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo consequatur soluta maiores
                                voluptate nulla ratione non suscipit sint error voluptatem!
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, inventore! Suscipit voluptate
                                unde omnis consequuntur, esse, distinctio nostrum cupiditate accusantium molestiae ex, ipsam
                                ducimus quo delectus iste reiciendis nisi obcaecati.</p>
                        </div>
                    </div>`;
                    // [...document.querySelectorAll('.article-tipList-item span')].forEach((value, index)=>{
                    //     value.textContent=`${index+1}. ${value.textContent}`;
                    // })
                    checkImages();
                });
        });
});

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

// Retorna un entero aleatorio entre min (incluido) y max (excluido)
// ¡Usando Math.round() te dará una distribución no-uniforme!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

function checkImages() { 
    document.querySelectorAll("img").forEach(function(value) { 
        value.onerror=function(){
            value.setAttribute('src', './img/404.png');
        }
    }); 
}; 
