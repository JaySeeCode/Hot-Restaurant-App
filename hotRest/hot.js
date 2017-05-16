/**
 * Created by artyfykes on 5/15/17.
 */
 var express = require('express');
 var bodyParser = require('body-parser');
 var path = require("path");
 var PORT = 5000;
 var reservations = [

 {
    name: "Art",
    phoneNumber: "704-433-5643",
    email: "test@email.com",
    uniqueId: "artemius"
},
{
    name: "Erique",
    phoneNumber: "704-878-3639",
    email: "test@email.com",
    uniqueId: "erique"
},
{
    name: "Ed",
    email: "test@email.com",
    phoneNumber: "704-277-8282",
    uniqueId: "edward"
},

];
var waitlist = [];

var app = express();

//Code for data parsing when receiving POST requests from the browser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//sets up our server
app.listen(PORT, function(){
    console.log("Server listening on port " + PORT);
})

//handles requests from the given path. in this case the homepage
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "./api/tables.html"));
});

app.get("/reservation", function(req, res) {
    res.sendFile(path.join(__dirname, "./api/waitlist.html"));
});

app.get('/tables', function(req, res){

    if(reservations.length >= 5){
        let tempArr = [];
        tempArr.push(reservations);
        tempArr.push(waitlist);

        res.json(tempArr);
    }else{
        res.json(reservations);
    }

    res.end();

})

app.get('/api/waitlist', function(req, res){

    res.json(waitlist);
    res.end()

})

app.get('/api/tables', function(req, res){

    res.json(reservations);
    res.end()

})

app.delete('/api/delete', function(req, res){

    reservations = [];
    waitlist = [];

    res.send("Records deleted");

})

//handles POST requests made from the reservation page of our site.
//stores reservation info as object into reservations array.
//if reservations array is longer than 5 indexes, then it will store the
//reservation in the witlist array.
app.post('/reservation', function(req, res){

    var newReservation = req.body;

    // console.log(newReservation);

    if(reservations.length >= 5){
        waitlist.push(newReservation);
        console.log(waitlist);
        res.json(newReservation);

    }else{

        reservations.push(newReservation);
        console.log(reservations);
        res.json(newReservation);

    }

});