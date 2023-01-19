/*********************************************************************************
*  BTI425 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Kelvin Vora Student 
*  ID: 157616210 
*  Date: 13th Jan 2023
*
*  Cyclic Link: 
*  https://nice-gold-catfish-gear.cyclic.app
********************************************************************************/ 

const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
require('dotenv').config()
app.use(cors())
const HTTP_PORT = process.env.PORT

const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

app.use(express.json())

app.get("/", (req, res) => {
    res.status(201).send({ Message: "API Listening" })
})

app.post("/api/movies", (req, res) => {
    db.addNewMovie(req.body).then((movie) => {
        res.status(201).json({ NewMovieAdded: movie });
    }).catch((err) => {
        res.status(500).send(`Unable to add Movie`)
        console.log(err);
    })
})

app.get("/api/movies", (req, res) => {
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title).then((movies) => {
        if (movies == null) {
            res.status(204).send("No Content found!")
        }
        else {
            res.json(movies)
        }
    }).catch((err) => {
        res.status(500).send(`Unable to find any Movies`)
        console.log(err);
    })
})

app.get("/api/movies/:id", (req, res) => {
    db.getMovieById(req.params.id).then((movie) => {
        if (movie == null) {
            res.status(204).json("No Content found!")
        }
        else {
            res.send({ MovieById: movie })
        }
    }).catch((err) => {
        res.status(500).send(`Error finding Movie with ID ${req.params.id}`)
        console.log(err);
    })
})

app.put("/api/movies/:id", (req, res) => {
    db.updateMovieById(req.body, req.params.id).then((movie) => {
        res.send({ UpdatedMovie: movie + " movie is been updated" })
    }).catch((err) => {
        res.status(500).send(`Unable to Update the ${movie}`)
        console.log(err);
    })
})

app.delete("/api/movies/:id", (req, res) => {
    db.deleteMovieById(req.params.id).then((movie) => {
        res.json({ Msg: movie + "Movie deleted successfully" })
    }).catch((err) => {
        res.status(500).send(`Unable to delete the Movie ${movie}`)
        console.log(err);
    })
})

db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    })
}).catch((err) => {
    res.status(500).send(`Error while connecting to PORT ${HTTP_PORT}`)
        console.log(err);
});