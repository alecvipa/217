require('dotenv').config();

// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const email = process.env.email;
const superSecretPwd = process.env.superSecretPwd;
const tokenFb = process.env.tokenAccesoFB

// Create an instance of the express app.
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Redirect to https://xyncs.com
// const targetBaseUrl = 'https://www.mya307.com/inicio';



// Routes
app.get('/', function (req, res) {
    // res.redirect(targetBaseUrl);
    res.render('inicio');

});
app.get('/inicio', function (req, res) {
    // res.redirect(targetBaseUrl);
    res.render('inicio');

});

app.get('/privacidad', function (req, res) {
    // res.redirect(targetBaseUrl);
    res.render('privacidad');

});



// Nodemailer route

app.post("/ajax/email", function (request, response) {
    console.log(email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: email,
            pass: superSecretPwd
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    
    var htmlBody = `<h2>Correo de contacto</h2><p>Name: ${request.body.name} </p> <p>Phone: ${request.body.number} </p> <p> e-mail: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p> ¿Planea rentar en este mismo mes?: ${request.body.message} </p>`;
    var secondHtmlBody = `<h2>Gracias por dejar tus datos para: Oficina recién remodelada y amueblada en plaza la antigua</h2><h4>En breve te contactaremos ${request.body.name}<h4/> 
    <hr> <h5>¿Te gustaría ver el lugar en persona?</h5> <h5>Recuerda que incluímos todos los servicios</h5>
    <h5>Tendrías un lugar de estacionamiento gratuito y seguridad por medio de portero virtual</h5>`;
    let customerMail = `${request.body.email}`
    var mail = {
        from: '"Team: Xyncs Web Studio',
        to: 'hebrit_626@hotmail.com',
        subject: '¡Alguien ha dejado sus datos en Oficina 217!',
        html: htmlBody
    };
    var secondMail = {
        from: 'Team: Xyncs Web Studio',
        to: customerMail,
        subject: '¡Gracias por registrar tus datos en Oficina 217!',
        html: secondHtmlBody
    };
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log("message sent!");
        };
    });
    transporter.sendMail(secondMail, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log("message sent!");
        };
    })
});


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});