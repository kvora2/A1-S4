const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
require('dotenv').config()
app.use(cors())
const HTTP_PORT = process.env.PORT

const { rmSync } = require('fs')
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

app.use(express.json())

app.get("/", (req, res) => {
    res.send({ Message: "API Listening" })
})

app.post("/api/movies", (req, res) => {
    db.addNewMovie(req.body).then((movie) => {
        res.status(201).json({NewMovieAdded: movie});
    }).catch((err) => {
        res.status(500).json({Error: err})
    })
})

app.get("/api/movies", (req, res) => {
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title).then((movies) => {
        res.json(movies)
    }).catch((err) => {
        res.status(500).json({Error: err})
    })
})

app.get("/api/movies/:id", (req, res) => {
    db.getMovieById(req.params.id).then((movie) => {
        res.send({MovieById: movie})
    }).catch((err) => {
        res.status(500).json({Error: err})
    })
})

app.put("/api/movies/:id", (req, res) => {
    db.updateMovieById(req.body, req.params.id).then((movie) => {
        res.send({UpdatedMovie: movie + " movie is been updated"})
    }).catch((err) => {
        res.status(500).json({Error: err})
    })
})

app.delete("/api/movies/:id", (req, res) => {
    db.deleteMovieById(req.params.id).then((movie) => {
        res.json({Msg: movie + "Movie deleted successfully"})
    }).catch((err) => {
        res.status(500).json({Error: err})
    })
})

db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    })
}).catch((err) => {
    res.status(500).json({Error: err})
});