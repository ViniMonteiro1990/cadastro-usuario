const User = require('../models/User')
const { formatCep, formatCpfCnpj } = require('.././lib/utils')
module.exports= {
    registerForm(req,res){
       
        return res.render('user/register')
    },
    async show(req,res){
        const {user} = req

        user.cpf_cpnj = formatCpfCnpj(user.cpf_cpnj)
        user.cep = formatCep(user.cep)

        return res.render('user/index', { user })
    },
    async post(req,res){

        const userId = await User.create(req.body)

        req.session.userId = userId
        
        return res.redirect('/users')

    },
    async update(req,res){
        //all fields
        try{

            const {user} = req
            let {name, email, cpf_cpnj, cep, address} = req.body
            cpf_cpnj = cpf_cpnj.replace(/\D/g, "")
            cep = cep.replace(/\D/g, "")

            await User.update(user.id,{
                name,
                email,
                cpf_cpnj,
                cep,
                address
            })
            return res.render('user/index',{
                user: req.body,
                success: "Conta atualizada com sucesso!"
            })

        }catch(err){
            console.error(err)
            return res.render('user/index',{
                user: req.body,
                error: "Algum erro aconteceu!"
            })
        }
        //preencheu a senha

        //password match
    },
    async delete(req,res) {
        try{
            await User.delete(req.body.id)
            req.session.destroy()

            return res.render("session/login",{
                success: "Conta deletada com sucesso!"
            })

        }catch(err){
            console.error(err)
            return res.render("user/index",{
            error: "Erro ao tentar deletar sua conta!"
            })
        }
    }
}