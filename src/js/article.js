"use strict";
/**
 * @module Article
 */
import { getParameterByName, getFormatedDate, getRandomInt, checkImages, getUserOnline, getComments } from "./func.js";
import { fetchPostBy, fetchUserBy, loadMainPosts, fetchCommentsBy } from "./fetch.js";

window.addEventListener("load", function () {
    let postId = getParameterByName("postId");
    if (!postId) {
        postId = 1;
    }

    let articles = document.querySelector("#main-articles");
    let randomIds = generateRandomIds([parseInt(postId)], 4);

    loadMainPosts(randomIds, articles);
    loadPost(postId);

    document.addEventListener("click", function (e) {
        let target = e.target;
        if (target.id === "comment-submit") {
            let commentBody = target.parentElement.querySelector("textarea").value;
            console.log(commentBody);
            if (commentBody) {
                let user = getUserOnline();
                let comments = document.querySelectorAll(".comment");
                comments[comments.length - 1].outerHTML += createComment(user.login, commentBody);
                target.parentElement.querySelector("textarea").value = "";
                let commentsArray = getComments();
                commentsArray.push({ postId: postId, username: user.login, body: commentBody });
                localStorage.setItem("comments", JSON.stringify(commentsArray));
            } else {
                Swal.fire({
                    title: "Your comment is empty!",
                    icon: "warning",
                });
            }
        }
    });
});

/**
 *
 * @param {string | number} postId
 */
function loadPost(postId) {
    fetchPostBy(postId).then((post) => {
        let articleDiv = document.querySelector(".article");
        fetchUserBy(post.userId).then((user) => {
            articleDiv.innerHTML = createArticle(post.title, post.body, post.id, user.username);
            fetchCommentsBy(postId).then((comments) => {
                comments.forEach((comment) => {
                    let commentObj = comment;
                    commentObj.username = commentObj.email.split("@")[0];
                    addComment(commentObj.username, commentObj.body);
                });
                try {
                    getComments().forEach((comment) => {
                        if (comment.postId === postId) {
                            addComment(comment.username, comment.body);
                        }
                    });
                } catch (error) {}
                let userOnline = getUserOnline();
                if (userOnline) {
                    document.querySelector(".article .comments").innerHTML += createFormComment(userOnline.login);
                } else {
                    document.querySelector(".article .comments").innerHTML += createFormComment();
                }
            });
            checkImages();
        });
    });
}
/**
 *
 * @param {String} username
 * @param {String} body
 */
function addComment(username, body) {
    document.querySelector(".article .comments").innerHTML += createComment(username, body);
}

/**
 *
 * @param {Array<number>} randomIds
 * @param {number} cant
 * @param {number=} min
 * @param {number=} max
 */
function generateRandomIds(randomIds, cant, min = 1, max = 100) {
    for (let i = 1; i <= cant; i++) {
        let number = getRandomInt(min, max);
        while (randomIds.includes(number)) {
            number = getRandomInt(min, max);
        }
        randomIds.push(number);
    }
    randomIds.shift();
    return randomIds;
}
/**
 *
 * @param {String} username
 * @param {String} body
 */
function createComment(username, body) {
    return `<div class="comment">
    <div class="comment-picture">
        <div class="comment-picture-icon">
            <i class="fas fa-user"></i>
        </div>
    </div>
    <div class="comment-header">
        <h4 class="comment-username">${username}</h4>
    </div>
    <p class="comment-p">
        ${body}
    </p>
    <span class="comment-date">Written on ${getFormatedDate()}.</span>
    </div>`;
}

/**
 *
 * @param {String} title
 * @param {String} body
 * @param {String | number} id
 * @param {String} username
 */
function createArticle(title, body, id, username) {
    return `<h1 class="article-title">${title}</h1>
    <h3 class="article-info">By ${username} posted ${getFormatedDate()}</h3>
    <p class="article-p">Let’s imagine a man called Peter leaving the gym and running to his car with his duffel
        bag over his head to protect himself from the rain. When he reaches the car and is about to open the
        door, he stops because he sees Laura, his best friend’s girlfriend, kissing another man on the opposite
        sidewalk. The girl is wearing a pair of sunglasses, but all the same, he recognizes her.</p>
    <br>
    <p class="article-p">
        ${body}
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
        <img src="https://picsum.photos/id/${id}/1100/800" class="article-img">
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

        

    </div>
    <div class="comments">
        <h2>Comments</h2>
    </div>`;
}

/**
 *
 * @param {String} username
 */
function createFormComment(username = "") {
    return `<div class="form-comment">
    <div class="comment-picture">
        <div class="comment-picture-icon">
            <i class="fas fa-user"></i>
        </div>
    </div>
    <div class="comment-header">
        <h4 class="comment-username">${username}</h4>
    </div>
    <textarea placeholder="Write a comment..." rows="8"></textarea>
    <button id="comment-submit">Submit</button>
</div>`;
}
