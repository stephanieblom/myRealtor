const express = require('express');
const orm = require( './db/orm' );

const PORT = process.env.PORT || 8080;

const app = express();

app.use( express.static('public') );
app.use( express.urlencoded({ extended: false }) );

app.post( '/api/createUser', async function ( req, res ){
    const newUser = req.body;
    console.log('Received New User: ', newUser.firstName )
    const mongoResonse = await orm.saveUser( req.body );
    console.log( mongoResonse );
    res.send ( {message: 'user received! thx babe'})
})

app.listen( PORT, function(){
    console.log( `RUNNING, http://localhost:${PORT}` );

 });