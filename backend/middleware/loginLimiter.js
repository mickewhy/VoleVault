const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 5, // Limit each IP to 5 requests per `window` (here, per minute).
    handler: (req, res, next, options) => {
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

module.exports = loginLimiter