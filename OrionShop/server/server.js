const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")

const app = express();

app.use(cors());

mongoose //Connect to mongoDB
    .connect("mongodb://0.0.0.0:27017/shop", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

const gameSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    desc: {type: String, required: true, unique: true},
    developer: {type: String, required: true, unique:false},
    publisher: {type: String, required: true, unique:false},
    releaseDate: {type: String, required: true},
    tags: [{}],
    gallery: [{}],
    thumbnail: {type:String, required:true},
    trailer: {type:String, required:false},
    price: {type:String},
})

const accountSchema = new mongoose.Schema({
    username: {type: String, required: true, unique:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true, unique:true}
})

const Account = mongoose.model("Account", accountSchema);
const Game = mongoose.model("Game", gameSchema);

app.use(express.json());

app.post("/create", (req,res) => { // POST request for a GAME
    const { name, desc, developer, publisher, releaseDate, tags, gallery, thumbnail, trailer, price } = req.body;

    const newGame = new Game({ name, desc, developer, publisher, releaseDate, tags, gallery, thumbnail, trailer, price });

    newGame
        .save()
        .then(() => {
            res.json({ msg: "Game added" });
        })
        .catch((err) => {
            res.status(500).json({ msg: err })
        })
});

app.post("/create/account", (req, res) => { // POST request for an ACCOUNT
    const { username, email, password } = req.body;

    const newAccount = new Account({username, email, password})

    newAccount
        .save()
        .then(() => {
            res.json({ msg: "Account added" });
        })
        .catch((err) => {
            res.status(500).json({ mag: err });
        })
})

app.get("/accounts/:username", (req,res) => { //GET request for an ACCOUNT by ID
    const { username } = req.params;
    
    Account.findById(username)
        .then((account) => {
            res.json(account);
        })
        .catch((err) => {
            res.status(500).json({ msg: err});
        })

})



app.get("/games", (req,res) => {
    Game.find()
        .then((game) => {
            res.status(201).json(game);
        })
        .catch((err) => {
            res.status(500).json({ msg: "err getting games" });
        })
})


app.get("/games/:id", (req, res) => {
    const { id } = req.params

    Game.findById(id)
        .then((game) => {
            res.json(game)
        })
        .catch((err) => {
            res.status(500).json({ msg: "err getting game"} )
        })
})

app.put("/games/:id", (req,res) =>{
    const { id } = req.params;
    const { name, desc, developer, publisher, releaseDate, tags, thumbnail, trailer } = req.body;

    Game.findByIdAndUpdate(id, {name, desc, developer, publisher, releaseDate, tags, thumbnail, trailer}, {new:true})
        .then((game) => {
            res.json(game);
        })
        .catch((err) => {
            res.status(500).json({ msg:"err updating game"})
        })
})

app.delete("/games/:id", (req,res) => {
    const { id } = req.params;

    Game.findByIdAndDelete(id)
        .then((game) => {
            if(game){
                res.json({ msg: "game deleted"})
            } else {
                res.json({ msg: "game not found"})
            }
        })
        .catch((err) => {
            res.status(500).json({msg: " err deleting game"});
        })
})


app.listen(3001, () => {
    console.log("Server is running!");
})