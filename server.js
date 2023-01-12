const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
require('dotenv').config()
app.use(cors())
const HTTP_PORT = process.env.PORT || 8080

const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

app.use(express.json())

app.get("/", (req, res) => {
    res.send({ Message: "API Listening" })
})

app.post("/api/movies", (req, res) => {
    db.addNewMovie(req.body).then((movie) => {
        res.send({NewMovieAdded: movie});
    }).catch((err) => {
        console.log(err);
    })
})

app.get("/api/movies", (req, res) => {
    db.getAllMovies(req.page, req.perPage, req.title).then((movies) => {
        res.send({Movies: movies})
    }).catch((err) => {
        console.log(err)
    })
})

app.get("/api/movies", (req, res) => {
    db.getMovieById(req.params).then((movie) => {
        res.send({MovieById: movie})
    }).catch((err) => {
        console.log(err);
    })
})

app.put("/api/movies", (req, res) => {
    db.updateMovieById(req.body, req.params).then((movie) => {
        res.send({UpdatedMovie: movie + " movie is been updated"})
    }).catch((err) => {
        console.log(err);
    })
})

app.delete("/api/movies", (req, res) => {
    db.deleteMovieById(req.params).then((movie) => {
        res.json({Msg: "Movie deleted successfully"})
    }).catch((err) => {
        console.log(err);
    })
})

db.initialize(MONGODB_CONN_STRING).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    })
}).catch((err) => {
    console.log(err);
});