const crypto = require("node:crypto");

const hash = (string) => crypto.createHash("md5").update(string).digest("hex");

module.exports = hash;
