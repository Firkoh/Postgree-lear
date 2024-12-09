import express from 'express';
const app=express();
var port =4000;
let a=5;
console.log(a+a+a);
app.listen(port,()=>{console.log(`Server sedang berjalan pada server ${port}`)});