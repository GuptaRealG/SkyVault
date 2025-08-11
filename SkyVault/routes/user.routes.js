const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


// GET /register
router.get('/register', (req, res) => {
    res.render('register');
});

// POST /register
router.post(
  '/register',
[
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Email must be valid'),

  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'invalid request',
        errors: errors.array(),
      });
    }

    const {username,email,password}=(req.body);

    const hashPassword= await bcrypt.hash(password, 10);

    const newUser=await userModel.create({
        username,
        email,
        password:hashPassword,   
        
    })

    res.json(newUser)
  }
);

router.get('/login',(req,res)=>{
  res.render('login')
})

router.post('/login',[
    body('email').trim().isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min:6}).withMessage('Password should be valid')

],async (req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array(),
            message:'invalid request'
        })
    }

    const {email,password}=req.body

    const user=await userModel.findOne({
      email:email
    })

    if(!user){
      res.status(400).json({
        message:'username or password is incorrect'
      })
    }

    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
      res.status(400).json({
        message:'username or password is incorrect'
      })
    }

    const token=jwt.sign({
         userId:user._id,
         email:user.email,
         password:user.password
    },process.env.JWT_SECRETS
  )


  res.cookieParser('token',token);
  res.send('loggend in')

    
})




module.exports = router;


