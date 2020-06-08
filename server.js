var http = require("http")
var url = require("url")
var path = require("path")
var { spawn } = require("child_process")

var letterData = "";
var server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    let data = url.parse(req.url).query;
    if (!!data) {
        let letter = data.split("=")[ 1 ];
        if (letter === "request" && letterData !== '') {
            console.log(letterData)
            res.write(letterData);
            letterData = "";
        } else if (letter !== "request") {
            letterData = letter;
            spawn("C:\\Program Files\\VideoLAN\\VLC\\vlc.exe", [ path.resolve(__dirname, "list_audio_alphabet", letter + ".mp3") ]);
        }
    }
    if (req.url === "/") {
        res.write(`<html>
        <head>
            <title>Alpho</title>
            <meta charset="utf-8">
            <meta viewport="width=device-width, initail-scale=1.0">
            <style>html, body {
                padding: 0px;
                margin: 0px;
            }
            
            #containerAlphabatButtons {
                max-width: 900px;
                min-width: 400px;
                position: absolute;
                top: 50%;
                left: 50%;
                padding-left: 20px;
                padding-right: 20px;
                transform: translate(-50%, -50%);
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            }
            
            .letter {
                background-color: #90ff5f;
                color: rgb(45, 93, 6);
                padding: 20px;
                font-size: 20px;
                font-family: fantasy;
                border-radius: 5px;
                margin: 10px;
                box-shadow: 0px 0px 2px 1px #cccccc;
                cursor: pointer;
                transition: all 0.5s ease-out;
            }
            
            .letter:active {
                background-color: #39781e;
            }
            </style>
        </head>
        <body>
            <div id="containerAlphabatButtons"></div>
            <script>
            
            function loopAllAlphabet(callbackFunction) {
                for (var i = 65; i <= 90; i++) {
                    callbackFunction(String.fromCharCode(i));
                }
            }
            var containerAlphabatButtons = document.getElementById("containerAlphabatButtons");
            loopAllAlphabet(function( letter ) {
                containerAlphabatButtons.innerHTML += '<div class="letter" onclick="sendDataLetter(this);" data-char="' + letter + '">' + letter.toLowerCase() + '</div>';
            });
    
            this.sendDataLetter = function sendDataLetter( element ) {
                var xmlhttp = new XMLHttpRequest();
                var data = element.getAttribute("data-char");
                xmlhttp.open("GET","?data=" + data, true);
                xmlhttp.send(null);
            };
    
            </script>
        </body>
    </html>`);
    } else if (req.url === "/controll") {
        res.write(`<html>
        <head>
            <title>Alpho</title>
            <meta charset="utf-8">
            <style>html, body {
                padding: 0px;
                margin: 0px;
            }
            
            #containerAlphabatButtons {
                max-width: 900px;
                min-width: 400px;
                position: absolute;
                top: 50%;
                left: 50%;
                padding-left: 20px;
                padding-right: 20px;
                transform: translate(-50%, -50%);
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            }
            
            .letter {
                background-color: #90ff5f;
                color: rgb(45, 93, 6);
                padding: 20px;
                font-size: 20px;
                font-family: fantasy;
                border-radius: 5px;
                margin: 10px;
                box-shadow: 0px 0px 2px 1px #cccccc;
                cursor: pointer;
                transition: all 0.5s ease-out;
            }
            
            .letter:hover {
                background-color: #39781e;
            }
            
            .show_selec_letter {
                color: black;
                background-color: #32621e;
                box-shadow: 0px 0px 20px 1px #cccccc;
                margin-top: 120px;
            }
            </style>
        </head>
        <body>
            <div id="containerAlphabatButtons"></div>
            <script>
            "use strict";
            function playAudio(letter) {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", "?audio=" + letter, true);
                xmlhttp.send();
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
            
            function doAinm(letter) {
                console.log(letter)
                let elementHaveChar = document.querySelector("div[data-char='" + letter.toUpperCase() + "']");
                elementHaveChar.classList.remove("show_selec_letter");
                elementHaveChar.classList.add("show_selec_letter");
                setTimeout(function() {
                    elementHaveChar.classList.remove("show_selec_letter");
                }, 500);
            }
            
            document.documentElement.onkeydown = function(event) {
                let __char = String.fromCharCode(event.keyCode);
                playAudio(__char);
                doAinm(__char);
            };
            
            setInterval(() => {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState === XMLHttpRequest.DONE) {
                        let letterData = xmlhttp.responseText;
                        if (!!letterData) {
                            doAinm(letterData);
                            console.log(letterData);
                        }
                    }
                };
                xmlhttp.open("GET", "?data=request", true);
                xmlhttp.send();
            }, 400);
            
            </script>
        </body>
    </html>`);
    } else {
        console.log(req.url)
    }
    res.end();
});

server.listen(4040);
