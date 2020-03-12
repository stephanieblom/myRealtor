const sgMail = require('@sendgrid/mail');
const express = require( "express" );
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8080;
const app = express();

// to serve static content from the 'html' directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post( '/api/email', function( req, res ){
    console.log( `<< form data received: `, req.body );
    console.log(`sending message to ${req.body.to}`)

    sgMail.send(req.body);
    // respond with something
    res.send( { message: `sent email to: ${req.body.to}` } );
})


app.listen( PORT, function(){
    console.log( `RUNNING, http://localhost:${PORT}` );
});