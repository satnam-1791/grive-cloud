const express = require('express')
const router = express.Router()
const upload = require('../config/multerconfig')

router.get('/home',(req, res)=>{
 res.render('home');
})

router.post('/upload', upload.single('file'), async(req, res) => {

  await res.send(req.file)

  res.status(200).send(req.file)
})

module.exports = router;