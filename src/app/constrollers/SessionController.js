

module.exports= {

    loginForm(req,res){
        return res.render('session/login')
    },
    login(req,res){
        //verificar se o usuario esta cadastrado
        req.session.userId = req.user.id

        return res.redirect("/users")
        //verificar se o password bate

        //depois colocar o usuario no req.session
    },
    //fazer o logout so usuario
    logout(req,res){
        req.session.destroy()
        return res.redirect('/')
    }
}  