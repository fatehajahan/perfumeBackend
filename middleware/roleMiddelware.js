function roleMiddleware (requiresRole){
    return (req, res, next)=>{
        if(!req.session.isAuth){
            return res.json({error:'unauthorized'})
        }
        if(req.session.user.role !== requiresRole){
            return res.json({error:'Access denied'})
        }
        next()
    }
}

module.exports = roleMiddleware