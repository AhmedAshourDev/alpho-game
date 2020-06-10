var http = require("http")
var url = require("url")
var path = require("path")
var fs = require("fs")
var timers = require("timers")
var { spawn } = require("child_process")

var letterData = "";
var port = 4040;
var softwareRunMyAudio = "C:\\Program Files\\VideoLAN\\VLC\\vlc.exe";
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
            var d = spawn(softwareRunMyAudio, [ path.resolve( __dirname, "..", "list_audio_alphabet", letter + ".mp3") ]);
            timers.setTimeout(() => d.kill(), 3000);
        }
    }
    switch (req.url) {
        case "/": res.write(fs.readFileSync(path.resolve( __dirname, "controllServer.html" ), "utf-8" )); break;
        case "/controll": res.write(fs.readFileSync(path.resolve( __dirname, "controll.html" ), "utf-8" )); break;
    }
    res.end();
});
server.listen(port);
console.log("server listen at port: " + port);