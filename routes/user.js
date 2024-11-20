const express = require('express');
const router = express.Router();
const {body,validationResult} = require('express-validator')
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.get('/register',(req,res)=>{
res.render('register')
})

router.post('/register',
    body('email').trim().isEmail(),
    body('password').trim().isLength({min:3}),
    body('username').trim().isLength({min:3}),
    async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array(),message:'Invalid-Data'})
  }
  const {email,password,username} = req.body;
  const hashpassword =  await bcrypt.hash(password,10)
  const newUser = await User.create({ email,username,password:hashpassword });
 res.status(200).json({newUser: newUser
    })
  })

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', 
  body('email').trim().isEmail(),
  body('password').trim().isLength({min:3}),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: 'Invalid-Data' });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Username or password found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Password/userName' });
    }

    const token = jwt.sign({
      id: user._id,
      username: user.username,
      email: user.email
    },process.env.JWT_Secret,
  )
     res.cookie('token', token).json({ message: 'Logged In Successfully' });
  }
)


module.exports = router;