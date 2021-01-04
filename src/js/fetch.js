/**
 * 
 * @module Fetch
 */

/**
 * 
 * @param {number |String} id 
 */
function fetchPostBy(id) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(post => post.json());
}

/**
 * 
 * @param {number | String} id 
 */
function fetchUserBy(id){
    return fetch("https://jsonplaceholder.typicode.com/users/" + id)
                .then(user => user.json())
}

/**
 * 
 * @param {Array<number>} randomIds 
 * @param {HTMLCollection} articles 
 */
function loadMainPosts(randomIds, articles) {
    for (let i = 0; i < 4; i++) {
        fetchPostBy(randomIds[i])
            .then(post => {
                let innerHTML = `<article class="main-article">
                <div class="main-article-img-container">
                    <img src="https://picsum.photos/id/${post.id}/300/200" alt="img">
                </div>

                <h4 class="main-article-title">${post.title}</h4>
                <p class="main-article-p">${post.body}</p>
                <a href="./article.html?postId=${post.id}" class="btn btn-orange">Reed more...</a>
                </article>`;

                articles.innerHTML += innerHTML;
            }
            );
    }
}

export {fetchPostBy, fetchUserBy, loadMainPosts}