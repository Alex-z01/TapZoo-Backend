const sgMail = require('@sendgrid/mail')
const keys = require('./config/keys');

// Set the API key
sgMail.setApiKey(keys.sgApi)

// Define the send verification email function
function sendVerificationEmail(recipient, code) {
    const msg = {
        to: `${recipient}`, // Change to your recipient
        from: 'no-reply@siphongames.com', // Change to your verified sender
        subject: 'TapZoo Verification Code',
        text: `Enter this code into the TapZoo client: ${code}`
      };

      // Use the send() method from the library to send the email
      sgMail.send(msg, function (err, info) {
        if (err) {
            console.log(err);
            console.log("email not sent");
        } else {
            console.log("email sent");
        }
      });
}

// Export the sendVerificationEmail() function
module.exports = {
    sendVerificationEmail : sendVerificationEmail
};
