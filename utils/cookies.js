const { createJWT } = require("./jwt");

const attachCookies = async (res, user, refreshToken) => {
  const accessTokenJWT = await createJWT(user);
  const refreshTokenJWT = await createJWT({ user, refreshToken });
  const expiration = 1000 * 60 * 30;
  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    maxAge: expiration,
  });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    maxAge: oneDay,
  });
};

module.exports = attachCookies;
