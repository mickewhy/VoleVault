const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
    const { credential, password } = req.body

    try {
        const user = await User.login(credential, password)
        const username = user.username
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": username,
                    // "roles": user.roles,
                }
            },
            process.env.access_token_secret,
            { expiresIn: '7d' }
        )

        // const refreshToken = jwt.sign(
        //     { "UserInfo": { "username": user.username, } },
        //     process.env.refresh_token_secret,
        //     { expiresIn: '1d' }
        // )

        // res.cookie('jwt', refreshToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'None',
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // })

        res.status(200).json({ username, accessToken })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signupUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const user = await User.signup(username, email, password)
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": username,
                    // "roles": user.roles,
                }
            },
            process.env.access_token_secret,
            { expiresIn: '7d' }
        )

        res.status(200).json({ username, accessToken })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// const refreshUser = async (req, res) => {
//     const cookies = req.cookies
//     if (!cookies.jwt) return res.status(401).json({ message: 'Unauthorized' })
//     const refreshToken = cookies.jwt

//     jwt.verify(
//         refreshToken,
//         process.env.refresh_token_secret,
//         asyncHandler(async (err, decoded) => {
//             if (err) return res.status(403).json({ message: 'Forbidden' })
//             const foundUser = await User.findOne({ username: decoded.username })
//             if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })
//             const accessToken = jwt.sign(
//                 {
//                     "UserInfo": {
//                         "username": user.username,
//                         // "roles": user.roles,
//                     }
//                 },
//                 process.env.access_token_secret,
//                 { expiresIn: '10s' }
//             )

//             res.json({ accessToken })
//         })
//     )
// }

// const logoutUser = async (req, res) => {
//     const cookies = req.cookies
//     if (!cookies?.jwt) return res.sendStatus(204)
//     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
//     res.json({ message: 'Cookie cleared' })
// }

module.exports = { signupUser, loginUser, /*refreshUser, logoutUser*/ }