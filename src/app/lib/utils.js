module.exports = {
    
    date(timestamp){
        const date = new Date(timestamp)
        //EM TODOS ELES COLOCAR UTC NA FRENTE PRA PEGAR A DATA UNIVERSAL E NAO A DATA LOCAL
        //ano 
        const year = date.getFullYear()

        //mes cm vai de 0 a 11 adiciono mais 1 para retornar um numero
        const month =`0${date.getMonth() + 1}`.slice(-2)

        //data de 1 a 31
        const day = `0${date.getDate()}`.slice(-2)
       
        /*console.log(`${year}-${month}-${day}`)*/
        const hour = date.getHours()
        const minutes = date.getMinutes()
        
        return {
            day,
            month,
            year,
            hour,
            minutes,
            iso:`${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
            
    },
    formatPrice(price){
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price/100)
    },
    formatCpfCnpj(value){
        value = value.replace(/\D/g,"")

        if(value.length > 15){
            value = value.slice(0, -1)
        }

        //check if is cpf or cnpj

        if(value.length > 11){
            //1122233344445

            //11.22233344445
            value = value.replace(/(\d{3})(\d)/,"$1.$2")
            //11.222.33344445
            value = value.replace(/(\d{3})(\d)/,"$1.$2")
            //11.222.333/44445
            value = value.replace(/(\d{3})(\d)/,"$1/$2")
            //11.222.333/4444-55
            value = value.replace(/(\d{4})(\d)/,"$1-$2")
        }else{
            //cpf 111.222.333-44
            value = value.replace(/(\d{3})(\d)/,"$1.$2")

            value = value.replace(/(\d{3})(\d)/,"$1.$2")

            value = value.replace(/(\d{3})(\d)/,"$1-$2")
        }

        return value
    },
    formatCep(value){
        value = value.replace(/\D/g,"")


        //para remover o ultimo numero sempre q exceder
        if(value.length > 8)
            value = value.slice(0, -1)       

        value = value.replace(/(\d{5})(\d)/,"$1-$2")

        return value
    }
}