const userObj = (user) => {
  return {
    username: user.username,
    id: user._id,
    email: user.email,
    role: user.role,
  };
};

class User {
  constructor(user) {
    this.username = user.username;
    this.id = user._id;
    this.email = user.email;
    this.role = user.role;
  }
}

module.exports = {User, userObj}