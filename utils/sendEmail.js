const sgMail = require("@sendgrid/mail");

const sendEmail = async ({ to, subject, html }) => {
  sgMail.setApiKey(process.env.BANANA_BANDIT_KEY);
  const msg = {
    to, // Change to your recipient
    from: "katoragashua@outlook.com", // Change to your verified sender
    subject,
    html,
  };
  const info = await sgMail.send(msg);
  return info;
};

module.exports = sendEmail;
