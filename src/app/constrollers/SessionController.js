const crypto = require ('crypto')
const User = require('../models/User')

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
    },
    forgotForm(req,res){
        return res.render('session/forgot-password')
    },
    async forgot(req,res){
        const user = req.user

        //um token para esse usuario
        const token = crypto.randomBytes(20).toString('hex')

        //criar uma expiração
        let now = new Date()
        now = now.setHours(now.getHours() + 1)

        await User.update(user.id, {
            reset_token: token,
            reset_token_expires: now
        })

        //enviar email com um link de recuperação de senha

        //avisar o usuario que enviamos o email

    }

}  