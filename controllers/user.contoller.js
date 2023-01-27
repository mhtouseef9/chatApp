const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
 //Node.js natively does not load .env files, so we must utilize the dotenv package to load the file and expose the values via process.env.
require('dotenv').config();

exports.createUser = async (req, res) => {
    // pattern matching
     const { first_name, last_name, email, password } = req.body;
     const oldUser = await User.findOne({ email });
     if (oldUser) {
         return res.status(409).send("User Already Exist. Please Login");
     }

     var passwordHash = await bcrypt.hash(req.body.password, 10);
     req.body.passwordHash = passwordHash;
    User.create(req.body)
        .then(user =>
        {
            let token = generateJwt(user)
            res.status(200).send(userView(user, token));
        })
}

exports.login = async (req, res) => {
     const { email, password } = req.body;
     const user = await  User.findOne({email});
     if (user && await bcrypt.compare(password, user.passwordHash)) {
         let token = generateJwt(user)
         res.status(200).send(userView(user, token));
     }
     else
     {
         res.status(400).send("Invalid Credentials");
     }
}

exports.getUsers = (req, res) => {
    User.find()
        .then(users =>
            res.send(users)
        )
}

generateJwt = (user) => {
    return jwt.sign(
        { user: user },
        process.env.JWT_SECRET_KEY
        // {
        //     expiresIn: "2h",
        // }
    );
}

userView = (user, token) => {
    return  {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: token
    };
}
