"use strict";
import { fetchPostBy, loadMainPosts} from "./fetch.js";
import {startMoveDownAnimation} from './func.js'
/**
 * @module Index
 */
window.addEventListener("load", function () {
    let btnMoveDown = document.querySelector(".btn-move-down");
    btnMoveDown.addEventListener("click", function () {
        startMoveDownAnimation("#presentation-one");
    });

    let articles = document.querySelector("#main-articles");
    loadMainPosts([10, 15, 50, 22], articles);
});


