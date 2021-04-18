let express=require('express');
let app=express();
let path=require('path');
let blogrouter=require("./routers/blog");
let mongoose=require("mongoose");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const methodoverride = require('method-override');
const User= require("./models/user");
const Session = require("express-session");
const authrouter=require("./routers/authrouter");
const user = require('./models/user');
const reviewrouter=require("./routers/review");


app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb+srv://anirudh:lockit1234@cluster0.licv2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex:true
    })
    .then(() => {
        console.log("Database Connected");
    })
    .catch(err => {
        console.log("DB Not Connected");
        console.log(err);
    })






app.use(Session({
        // milliseconds of a day
        resave: false,
        saveUninitialized: true,
        secret: 'SECRET'
      }));
      
      app.use(passport.initialize());
      app.use(passport.session());


      passport.serializeUser((user, done) => {
        done(null, user);
      });
   
passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
          
          done(null,user)
        });
      });


      









app.set("view engine","ejs");
app.set("View",path.join(__dirname,"views"));
app.use((req,res,next)=>{
    res.locals.current=req.user;
    next();
})
app.use(methodoverride('_method'))
app.use(express.static("public"));
//app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(authrouter);
app.use(blogrouter);
app.use(reviewrouter);







app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
  }));

//app.get("/auth/google/redirect",passport.authenticate('google').());


passport.use(
    new GoogleStrategy(
      {
        clientID: "784287410700-2krvqh92djat38ma05aetjkj5an5lbu8.apps.googleusercontent.com",
        clientSecret: "PvaHmQrasjmpITdZS248KRcR",
        callbackURL: process.env.PORT+"/auth/google/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //check if user already exists in our db with the given profile ID
        User.findOne({googleId: profile.id}).then((currentUser)=>{
            console.log(profile);
          if(currentUser){
            //if we already have a record with the given profile ID
            done(null, currentUser);
          } else{
               //if not, create a new user 
              new User({
                img: profile.photos[0].value
                  
                  ,
                googleId: profile.id,
                name: profile.name.givenName,
              }).save().then((newUser) =>{
                done(null, newUser);
              });
           } 
        })
      })
  );

app.listen(process.env.PORT || 3000,()=>{
console.log("started");
});