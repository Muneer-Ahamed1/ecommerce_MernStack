const dotenv = require("dotenv")
dotenv.config({
    path: "./src/.env"
})
const { PORT } = require("./config/index.js");
const express = require('express');
const app = express();
const User=require("./Models/User.js")
const cors=require("cors")
const config=require("./config/index.js")
const dbConnection = require("./utils/Database/dbConnection.js");
const errorHandler = require("./Middleware/errorHandlerMiddleware.js");
const ProcutRouter = require("./Routes/ProductRoutes.js");
const CategoryRouter = require("./Routes/CategoryRoutes.js");
const BrandRouter = require("./Routes/BrandRoutes.js");
const CartRouter = require("./Routes/CartRoutes.js");
const AuthRouter=require("./Routes/AuthRoutes.js");
const passport = require("passport");
const passportJwt = require("passport-jwt");
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require("express-session");
const crypto=require("crypto");
const {sanitizeUser}=require("./services/service.js")


dbConnection().then().catch((e) => {
    console.log(e)
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(session({
    secret: 'session_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  }));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());


passport.use(
    'local',
    new LocalStrategy({ usernameField: 'email' }, async function (
        email,
        password,
        done
    ) {
        // by default passport uses username
        console.log({ email, password });
        try {
            const user = await User.findOne({ email: email });
            console.log(email, password, user);
            if (!user) {
                return done(null, false, { message: 'invalid credentials' }); // for safety
            }
            crypto.pbkdf2(
                password,
                user.salt,
                310000,
                32,
                'sha256',
                async function (err, hashedPassword) {
                    if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                        return done(null, false, { message: 'invalid credentials' });
                    }
                    const token = jwt.sign(
                        sanitizeUser(user),
                        config.jwtSecretKey,
                    );
                    done(null, { id: user.id, role: user.role, token }); // this lines sends to serializer
                }
            );
        } catch (err) {
            done(err);
        }
    })
);
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecretKey;
passport.use(
    'jwt',
    new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await User.findById(jwt_payload.id);
            if (user) {
                return done(null, sanitizeUser(user)); // this calls serializer
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, { id: user.id, role: user.role });
    });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

//Routes
app.use("/",AuthRouter)
app.use("/product", ProcutRouter);
app.use("/category", CategoryRouter);
app.use("/brand", BrandRouter);
app.use("/cart", CartRouter);

//ErrorHandler middleware
app.get("/", (req, res) => {
    res.send("hello world")
})
app.use(errorHandler); //middleware exception handler not working
app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
})

