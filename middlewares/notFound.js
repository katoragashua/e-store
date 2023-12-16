const {StatusCodes} = require("http-status-codes")

const notFound = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).send("Page not found. Please check the URL.")
}

module.exports = notFound