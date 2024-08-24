require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const User=require("./models/user");
var jwt = require("jsonwebtoken");
const app=express();
const path = require("path");
var cors = require('cors')

const port=2020;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

async function connection(){
    await mongoose.connect(process.env.SECRET_KEY);
}

function verifyToken(req, res, next) {
    const token = req.cookies.token;  // Extract token from cookies

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const verified = jwt.verify(token, process.env.SECURITY_KEY_JWT);  // Verify token with secret
        req.user = verified;  // Add the verified user information to the request object
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
}

connection()
.then(()=>{
    console.log("Connection to DataBase Succeded!")
}).catch(()=>{
    console.log("Error Connecting to DataBase!")
})

app.post("/login",async(req,res)=>{
    try{
        let {email,pass}=req.body;
        let validUser=await User.find({
            email:email.trim().toLowerCase(),
            pass:pass.trim()
            });
        if(validUser.length!=0){
            const token=jwt.sign({_id: validUser[0]._id},process.env.SECURITY_KEY_JWT);
            res
            .cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"})
            .redirect(`/${validUser[0]._id}/home`);
        }else{
            res.send("Invalid User");
        }
    }catch(err){
        console.log(err);
    }
})

app.get("/login",(req,res)=>{
    res.render("login.ejs");
})

app.get("/signup",(req,res)=>{
    res.render("signup.ejs")
})

app.post("/signup",async(req,res)=>{
    try{
        let { name,email,password } = req.body;

                let newUser = new User({
                    name: name.toLowerCase(),
                    email: email.toLowerCase(),
                    pass: password
                });
                newUser.save()
                .then((res)=>{
                    console.log(res,"User Added!")
                })

                .catch((err) => {
                    console.log(err);
                });    
                res.redirect("/login"); 
    }catch{
        res.send("Unable to Signup!");
    }
});

app.get("/:id/home",verifyToken,(req,res)=>{
    let {id}=req.params;
    res.render("home.ejs",{id});
})

app.get("/home",(req,res)=>{
    let id="none"
    res.render("home.ejs",{id});
})

app.listen(port,()=>{
    console.log("listening on port ",2020);
})