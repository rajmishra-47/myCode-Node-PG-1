const Client =require('pg').Pool


const client=new Client({

    
    user:'postgres',
    password:'Mishra*123',
    database:'Demo-1',
    host:'localhost',
    port:5432
})

c

module.exports=client