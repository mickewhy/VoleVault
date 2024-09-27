const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

userSchema.statics.signup = async function (username, email, password) {
    if (!username || !email || !password)
        throw Error('All fields must be filled')
    if (!validator.isEmail(email))
        throw Error('Invalid email')
    if (!validator.isStrongPassword(password))
        throw Error('Password not strong enough')

    const usernameExists = await this.findOne({ username })
    const emailExists = await this.findOne({ email })

    if (usernameExists)
        throw Error('Username already in use')
    if (emailExists)
        throw Error('Email already in use')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, email, password: hash })
    return user
}

userSchema.statics.login = async function (credential, password) {
    if (!credential || !password)
        throw Error('All fields must be filled')
    
    let email = null
    let username = null
    let user = null
    if(validator.isEmail(credential)){
        email = credential
        user = await this.findOne({ email })
        if (!user)
            throw Error('Incorrect email')
        username = user.username
    }
    else{
        username = credential
        user = await this.findOne({ username })
        if (!user)
            throw Error('Incorrect username')
        email = user.email
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match)
        throw Error('Incorrect password')

    return user
}

module.exports = mongoose.model('UserSchema', userSchema)