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

export {fetchPostBy, fetchUserBy}