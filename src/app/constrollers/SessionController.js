const crypto = require ('crypto')
const User = require('../models/User')
const mailer = require('../lib/mailer')
const {hash} = require('bcryptjs')

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

        try{
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

        await mailer.sendMail({
            to: user.email,
            from: 'no-reply@launchstore.com.br',
            subject: 'Recuperação de senha',
            html: `
                <h2>Perdeu a senha?</h2>
                <p>Não se preocupe, clique no link para recuperar a senha! </p>
                <p>
                    <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
                        RECUPERAR SENHA
                    </a>
                </p>
            `
        })


        //avisar o usuario que enviamos o email
        return res.render('session/forgot-password',{
            success: "Verifique seu email para recuperar sua senha"
        })

        }catch(err){
            console.error(err)
            return res.render('session/forgot-password',{
            error: "Erro inesperado, tente novamente!"
        })     
    }
    },
    resetForm(req,res){
        return res.render('session/password-reset', {token: req.query.token})
    },
    async reset(req,res){
        const user = req.user
        const {password, token} = req.body

        try{
            //cria um novo hash de senha
            const newPassword = await hash(password, 8)

            //atualiza o usuário
            await User.update(user.id,{
                password: newPassword,
                reset_token:"",
                reset_token_expires: "",
            })
            //avisa o usuário que ele tem uma nova senha
            return res.render('session/login',{
                user:req.body,
                success:"Senha alterada com sucesso! Faça o login."
            })

        }catch(err){
            console.error(err)
            return res.render('session/password-reset',{
            user:req.body,
            token,
            error: "Erro inesperado, tente novamente!"
        })
        }  
    }
}  