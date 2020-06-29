const User = require('../models/User')

async function post(req,res,next) {
    //check if has all fields
const keys = Object.keys(req.body)
    
for(key of keys) {

    if(req.body[key] == ""){
        return res.render('user/register', {
            user: req.body,
            error: 'Por favor preencha todos os campos'
        })
    }
}
//check if user exists [email,cpf_cpnj]
let {email, cpf_cpnj, password, passwordRepeat} = req.body

cpf_cpnj = cpf_cpnj.replace(/\D/g, "")
const user = await User.findOne(
    { where: {email},
        or: {cpf_cpnj}
    })

    if(user) return res.render('user/register', {
        user: req.body,
        error: 'Usuário ja cadastrado'
    })
//check password match
if(password != passwordRepeat) return res.render('user/register', {
        user: req.body,
        error: 'Senha e a repetição da senha estão diferentes'
    })
next()
}

module.exports = {
    post
}