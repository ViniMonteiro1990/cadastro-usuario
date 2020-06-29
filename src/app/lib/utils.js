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
    }
}