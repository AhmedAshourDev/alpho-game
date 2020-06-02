"use strict";

function playAudio(letter) {
    let audio = new Audio("./list_audio_alphabet/" + letter.toUpperCase() + ".mp3");
    audio.play();
}

function loopAllAlphabet(callbackFunction) {
    for (var i = 65; i <= 90; i++) {
        callbackFunction(String.fromCharCode(i));
    }
}

var containerAlphabatButtons = document.getElementById("containerAlphabatButtons");
loopAllAlphabet(function( letter ) {
    containerAlphabatButtons.innerHTML += '<div class="letter" data-char="' + letter + '">' + letter.toLowerCase() + '</div>';
});

document.documentElement.onkeydown = function(event) {
    let __char = String.fromCharCode(event.keyCode);
    let elementHaveChar = document.querySelector("div[data-char='" + __char + "']");
    playAudio(__char);
    elementHaveChar.classList.remove("show_selec_letter");
    elementHaveChar.classList.add("show_selec_letter");
    setTimeout(function() {
        elementHaveChar.classList.remove("show_selec_letter");
    }, 500);
};