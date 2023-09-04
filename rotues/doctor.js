const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>
{
    res.send('Doctor Get request ');
});

router.post('/', (req, res)=>
{
    res.send('Doctor post request ');
})

module.exports = router;