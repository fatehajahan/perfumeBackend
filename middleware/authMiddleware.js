function authMiddleware(req, res, next) {
    // console.log(req.session.isAuth)
    if (req.session.isAuth) {
        next()
    } else {
        res.json({ error: 'unauthorized' })
    }
}

module.exports = authMiddleware