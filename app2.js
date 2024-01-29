const expres=require('express')
const app=expres()
const bodyParser = require('body-parser');
const  PG =require('pg').Pool


const client=new PG({    
    user:'postgres',
    password:'Mishra*123',
    database:'myData2',
    host:'localhost',
    port:5432
})

client.connect()

// app.use(expres.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true}))

app.get('/',(req,res)=>{

    res.send("hello")
})

app.get('/showDB',(req,res)=>{

    client.query('Select * from myDB2',(err,data)=>{

        if(err){
            throw err
        }
        res.send(data.rows)
    })
})

app.post('/ins', async (req,res)=>{

    
try {
    const { data }=req.body
    await client.query('insert into myDB2(fname) values($1) returning *',[data])
    res.send('Done!!')
}
catch(err){
    throw err
}
})

app.delete('/del', async (req,res)=>{

    try {
    const { data }=req.body
    await client.query('delete from myDB2 where fname=$1 returning *',[data])
    res.send('Deleted')
    }
    catch(err){
        throw err
    }
})

app.put('/update',async (req,res)=>{

    try{

        const {d1}=req.body
        const {d2}=req.body

        await client.query('update myDB2 set fname=$1 where fname=$2',[d1,d2])

        res.send('Value Updated')
    }

    catch(err){
        throw err
    }
})




app.listen(8000,()=>{
    console.log('Server Up');
})