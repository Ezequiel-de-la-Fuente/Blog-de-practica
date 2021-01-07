/**
 * @module Alerts
 */

function warningAlert() {
    return Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#555",
        confirmButtonText: "Yes, logout!",
        position: "top",
    });
}

function welcomeAlert(result) {
    Swal.fire({
        title: "Hello " + result.value.login,
        text: "Welcome back!",
        imageUrl: "./img/write.jpg",
        imageWidth: 400,
        imageHeight: 200,
        showConfirmButton: false,
        imageAlt: "Custom image",
        timer: 1500
    });
}

/**
 *
 * @param {String} confirmButtonText
 * @param {String} denyButtonText
 * @param {Function} preConfirm
 */
function formAlert(confirmButtonText, denyButtonText, preConfirm) {
    return Swal.fire({
        title: "Lorem - " + confirmButtonText,
        html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
            <input type="password" id="password" class="swal2-input" placeholder="Password">
            <div style="display:flex; justify-content:center; align-items: center;">
                Show password
                <input style="margin-left:5px"type="checkbox" id="swal2-checkbox">
            </div>`,
        confirmButtonText: confirmButtonText,
        denyButtonText: denyButtonText,
        showDenyButton: true,
        confirmButtonColor: "#e74c3c",
        denyButtonColor: "#e67e22",
        preConfirm: preConfirm,
        customClass: {
            validationMessage: "div",
        },
        showCloseButton: true,
        position: "top",
    });
}

/**
 *
 * @param {Function} preConfirm
 */
function supportFormAlert(preConfirm) {
    return Swal.fire({
        title: "Lorem - Support",
        html: `<input type="text" id="name-support" class="swal2-input" placeholder="Name">
            <input type="email" id="email-support" class="swal2-input" placeholder="Email">
            <textarea id="message-support" class="swal2-textarea" placeholder="Message"></textarea>`,
        confirmButtonText: "Contact us",
        denyButtonText: "Cancel",
        showDenyButton: true,
        confirmButtonColor: "#e74c3c",
        denyButtonColor: "#e67e22",
        preConfirm: preConfirm,
        customClass: {
            validationMessage: "div",
        },
        showCloseButton: true,
        position: "top",
    });
}

/**
 *
 * @param {Function} preConfirm
 */
function aboutUsAlert() {
    return Swal.fire({
        title: "Lorem - About us",
        html: `<h3>Nice to Meet You!</h3>
        <h4>Lorem ipsum</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit cum, magnis etiam tempor lacus facilisis auctor a suscipit curabitur, euismod penatibus per nostra mi aenean malesuada. Leo risus interdum tellus ad placerat et odio, lacinia hac habitant gravida facilisi. Nisi ultrices velit potenti nisl odio aliquet tellus magnis augue ornare nostra, libero vel sagittis nulla facilisi neque laoreet nec vivamus nibh.</p>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        position: "top",
    });
}

export { formAlert, warningAlert, welcomeAlert, supportFormAlert, aboutUsAlert };
