const express = require('express');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT||3000;
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mynodesql'
});
db.connect((err)=>{
    if(err)
    {
        throw err;
    }
    console.log('My sql Connected');
});
app.get('/',(req,res)=>{
    res.send('App is Working Fine :)')
})
app.get('/createdb',(req,res)=>{
    let sql ='CREATE DATABASE mynodesql';
    db.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.send('Database has been Created Successfully');
    })
})
app.get('/createtable/:table',(req,res)=>
{
    let sql=`CREATE TABLE ${req.params.table}(id int AUTO_INCREMENT,name varchar(20),city varchar(20),PRIMARY KEY(id))`;
    db.query(sql,(err,result)=>{
        if(err){
            res.send(err)
            return;
        }
        console.log(result);
        res.send(`Table ${req.params.table} Created!! `);
    })
})
app.get('/addrow/:table/:name/:city',(req,res)=>{
    let sql = `insert into ${req.params.table} (name,city) values('${req.params.name}','${req.params.city}')`
    db.query(sql,(err,result)=>{
        if(err)
        {
            res.send(err);
            return;
        }
        res.send(`Values(name:${req.params.name},city:${req.params.city}) was inserted into table ${req.params.table}`);
    })
})
app.get('/:table',(req,res)=>{
    let sql = `select * from ${req.params.table}`
    db.query(sql,(err,result)=>{
        if(err)
        {
            res.send(err);
            return;
        }
        res.send(result);
    })
})
app.get('/:table/:id',(req,res)=>{
    let sql = `select * from ${req.params.table} where id=${req.params.id}`
    db.query(sql,(err,result)=>{
        if(err)
        {
            res.send(err);
            return;
        }
        res.send(result);
    })
})
app.get('/update/:table/:name/:id/:city',(req,res)=>{
    
    
    let sql = `update ${req.params.table} set city = '${req.params.city}',name='${req.params.name}' where id = ${req.params.id}`
    db.query(sql,(err,result)=>{
        if(err)
        {
            res.send(err);
            return;
        }
        res.send(result);
    })  
})
app.get('/updatename/:table/:name/:id',(req,res)=>{
    
    let sql = `update ${req.params.table} set name = '${req.params.name}' where id = ${req.params.id}`
    db.query(sql,(err,result)=>{
        if(err)
        {
            res.send(err);
            return;
        }
        res.send(result);
        return;
    })
})
app.get('/updatecity/:table/:id/:city',(req,res)=>{
    
    let sql = `update ${req.params.table} set city = '${req.params.city}' where id = ${req.params.id}`
    db.query(sql,(err,result)=>{
        if(err)
        {
            res.send(err);
            return;
        }
        res.send(result);
        return;
    })
})
app.get('/delete/:table/:id',(req,res)=>{
    let sql = `delete from ${req.params.table} where id=${req.params.id}`
    db.query(sql,(err,result)=>{
        if(err)
        {
            res.send(err);
            return;
        }
        res.send(result);
    })
})
app.listen(port,()=>{
    console.log(`Running on port ${port}`)
});
