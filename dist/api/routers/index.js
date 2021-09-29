const router = require('express')();

router.use('/auth', require('./auth'));

router.use('/', require('./users'));

router.use('/*', (req, res, next) => {
    res.status(404).render('./public/404');
})

module.exports = router;