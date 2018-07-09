var request = require('superagent');
var express = require('express');
var flash = require('connect-flash');
var router = express.Router();
var nodemailer = require('nodemailer');


router.get('/', function(req, res){
      res.render('index', {
        title:'UVC Tech'
  });
});
// Load resume page
router.get('/aboutuvc',function(req, res){
    res.render('aboutuvc', {
      title:'About UVC Tech'
  });
});
// design Route
router.get('/contactuvc', function(req, res){
     res.render('contactuvc', {
       title:'Contact Us'
  });
});
// product Route
router.get('/products', function(req, res){
     res.render('products', {
       title:'UVC Tech Products'
  });
});


//contact form
router.post('/send',(req,res) =>{
    const output =`
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>`;

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          host: 'parc.web-dns1.com',
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
              user: 'contact@uvctech.ca', // generated ethereal user
              pass: 'Q,0]wUrVsMp567'// generated ethereal password
          },

          tls:{
            rejectUnauthorized:false
          }
      });

      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Contact UVC" <contact@uvctech.ca>', // sender address
          to: 'contact@uvctech.ca', // list of receivers
          subject: 'Contact UVC Form', // Subject line
          text: output, // plain text body
          html: output // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          res.render('contactuvc',{msg:'Email has been sent'});

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });

});

module.exports = router;
