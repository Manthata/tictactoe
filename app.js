const express = require("express")
const bodyParser = require("body-parser");
const { render } = require("ejs");
const fs = require("fs")




const app = express()
app.set('view engine', 'ejs');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

let initStuff = [];
let countr = 0;
app.listen(3000, function () {
    console.log("The server is listening on port 3000")
});

app.get("/", function (req, res) {
    res.render("landingPage")

});

app.post("/", function(req, res){
    gameinit = {
        player1 : req.body.player1,
        player2 : req.body.player2,
        setting : req.body.squares
    }
    console.log(gameinit)
    initStuff.push(gameinit)
    console.log(initStuff[0].player1)
    res.redirect("/startPage")
})



app.get("/startPage", function (req, res) {
    let decider = initStuff[countr].setting;
    
    function matrix(rows, cols, defaultValue) {
        var arr = [];
        // Creates all lines:
        for (var i = 0; i < rows; i++) {
            // Creates an empty line
            arr.push([]);
            // Adds cols to the empty line:
            arr[i].push(new Array(cols));
            for (var j = 0; j < cols; j++) {
                // Initializes:
                arr[i][j] = defaultValue;
            }
        }
        return arr;
    }
    console.log(decider)
    if (decider == "threeQ"){
        let diagram = matrix(3, 3, "")
        res.render("threeQ")
    }
    else if(decider == "fiveQ"){
        res.render("fiveQ")
    }
    countr++;
})
