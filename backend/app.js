var express = require('express');
var app = express();
var bodyParser = require("body-parser");

//var validator = require('./validation').customValidators;
var config = 4200;
let connection = require('./db');
const FRONTEND_PATH = __dirname + '/../frontend/ng5/';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(FRONTEND_PATH));

app.post('/billing', (req, res) => {
    let userDetails = {
        p_name: req.body.p_name,
        p_id: req.body.p_id,
        quality : req.body.quality,
        price : req.body.price,
        gst : req.body.gst,
        interest : req.body.quality*((req.body.price)*(req.body.gst * 0.01)),
        Amount : req.body.Amount,
    }
    if (userDetails) {
        connection.query(`INSERT INTO bill SET ?`, userDetails, (err, result) => {
            if (err) {
                console.log(err);
                if (err.code == 'ER_DUP_ENTRY') res.status(409);
                else res.status(500);
                res.send("bill not inserted");
            } else {
                 
    connection.query('SELECT * FROM bill',(err,res1,fields)=>{
        if(err){
            res.send(err);
        }
        else{
            res.write('<table  width="100%" border="1px" style="border-collapse: collapse;padding: 15px;"><tr><td>p_id</td><td>p_name</td><td>quality</td><td>Amount</td></table>');
            res.write('<table  width="100%" border="1px" style="border-collapse: collapse;padding: 15px;"><tr><td>'+res1[res1.length-1].id+'</td><td>'+res1[res1.length-1].p_name+'</td><td>'+res1[res1.length-1].quality+'</td><td>'+res1[res1.length-1].Amount+'</td></table>');
            res.write('<br><center><form action="/billv" method="POST"> <input type="submit" value="save"></form></center>');       
            
        }
    });
}
        });
    }
        else res.status(400).send("Validation failed");
});  
app.post("/billv", (req, res) => {
    connection.query('SELECT * FROM bill',(err,res1,fields)=>{
        if(err){
            res.send(err);
        }
        else{
            res.write('<table  width="100%" border="1px" style="border-collapse: collapse;"><tr><td>p_id</td><td>Date</td><td>p_name</td><td>Amount</td></table>');
            for(var i=0;i<res1.length;i++)
            {
         
            res.write('<table  width="100%" border="1px" style="border-collapse: collapse;"><tr><td>'+res1[i].id+'</td><td>'+res1[i].created_ts+'</td><td>'+res1[i].p_name+'</td><td>'+res1[i].Amount+'</td></table>');
         }
        }
        res.end();
    });
});
app.listen(config, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is listening to ${config}`);
    }
});