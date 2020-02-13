const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../src/utils/geocode.js");
const forecast = require("../src/utils/forecast.js");



// console.log(__dirname);
// console.log(path.join(__dirname, "..", "public"));

const app = express();
const port = process.env.PORT || 3000;

/*Define paths for express*/
/*set up handle bars*/
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "..", "public")));

/*set up view name*/
const viewsPath = path.join(__dirname, "..", "templates", "views");
app.set("views", viewsPath);

const partialsPath = path.join(__dirname, "..", "templates", "partials");
hbs.registerPartials(partialsPath);


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Alexandre"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About robot",
        name: "Alexandre"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        message: "This is a test",
        title: "Help page",
        name: "Alexandre"
    });
});

app.get("/weather", (req, res) => {
    if(req.query.address === undefined || req.query.address === ""){
        return res.send({
            error: "Address must be provided."
        });
    }
    geocode(req.query.address, (error, response) => {
        if(!error){
            forecast(response.latitude, response.longitude, (error, response2) => {
                if(!error){
                    res.send({
                        forecast: response2,
                        location: response.location,
                        address: req.query.address
                    });
                }
                else{
                    res.send({
                        error: error
                    });
                }
            });
        }
        else{
            res.send({
                error: error
            })
        }
    });
});

app.get("/help/*", (req, res) => {
    res.render("notFound", {
        title: "404",
        message: "Help article not found.",
        name: "Alexandre"
    });
});

app.get("*", (req, res) => {
    res.render("notFound", {
        title: "404",
        message: "Page not found.",
        name: "Alexandre"
    });
});

app.listen(port, () => {
    console.log("Server is up on port " + port);
});