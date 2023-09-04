const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>
{
    res.send('Express server using route');
});

router.use('/doctor', require('./doctor'));

module.exports = router;