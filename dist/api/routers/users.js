const router = require('express')();

router.get('/', (req, res, next) => {
    res.status(200).render('./public/loginPage');
});

module.exports = router;

