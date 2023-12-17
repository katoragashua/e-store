const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  username,
  email,
  verificationToken,
  origin,
}) => {
  const verificationLink = `${origin}/users/verify-email?token=${verificationToken}&email=${email}`;
  const verificationMessage = `
  <h1>Welcome to E-Store</h1>
  <h4>Please click on the <a href=${verificationLink}>link</a> to verify your account.</h4>
  `;

  await sendEmail({
    to: email,
    subject: "Verify Email",
    html: `<h2>Hello, ${username}</h2> ${verificationMessage}`,
  });
};

module.exports = sendVerificationEmail;
