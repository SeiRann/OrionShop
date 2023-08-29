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
    password: {type: String, required:true, unique:false}
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

app.post("/create/account", async (req, res) => { // POST request for an ACCOUNT
    const { username, email, password } = req.body;

    try{
        const existingAccount = await Account.findOne({ $or: [{username}, {email}]});

        if(existingAccount ) {
            res.json({unique:false});
        } else {

            const hashedPassword = await bcrypt.hash(password, 10);

            const newAccount = new Account({
                username:username,
                email:email,
                password:hashedPassword
            });
            await newAccount.save();
            res.json({ unique: true});
        }
    } catch(error){
        console.error("Error during signup: ", error);
        res.status(500).json({message: "Internal server error"})
    }
})

app.post("/login", async (req,res) => { //POST request for an ACCOUNT by USERNAME
    const { username, password } = req.body;
    
    try{
        const account = await Account.findOne({ username });

        if(!account){
            res.status(404).json({ msg: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, account.password);

        if(passwordMatch){
            res.json({ success: true, account});
        } else {
            res.json({ success: false });
        }

    } catch(err){
        console.error("Error: ", err);
        res.status(500).json({ message: err});
    }
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