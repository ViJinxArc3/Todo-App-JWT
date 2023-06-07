const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../validation');


    router.post('/register', async (req, res) => {
        // Validate data before creating a user
        const {error} = registerValidation(req.body)
        if (error) {
          return res.status(400).send(error.details[0].message);
        }

        //Checking if user email already exists in the database
        const emailExists = await User.findOne({email: req.body.email});
        if(emailExists) return res.status(400).send('Email already exists')

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)


        // Create a new user
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
        });
        //save new user
        try {
          const savedUser = await user.save();
          res.send({user: user._id});
          //catching error 
        } catch (err) {
          res.status(500).json({ message: err });
        }
});

//Login
router.post('/login', async (req, res) => {
    // Validate data before creating a user
    const {error} = loginValidation(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //Checking if email does not exist
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or Password is invalid')

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Email or Password is invalid')

    //create and assign a token
    const token = jwt.sign({_id: user._id}, 'Jeiehfdnms')
    res.header('auth-token', token).send(token)

});



module.exports = router;
