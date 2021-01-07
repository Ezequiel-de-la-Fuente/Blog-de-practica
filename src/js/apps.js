"use strict";
import { startMoveDownAnimation } from "./func.js";

window.addEventListener("load", function () {
    document.querySelector("#tell-me-more").addEventListener("click", function () {
        startMoveDownAnimation("#presentation-three");
    });
});
