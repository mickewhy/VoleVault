import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useSignup } from "../hooks/useSignup"
import { useAuthContext } from '../hooks/useAuthContext'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const { signup, error, isLoading } = useSignup()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match!")
            return
        }
        await signup(username, email, password)
        setPasswordError(null)
    }

    return (
        <>
            {user && navigate('/')}
            {!user && (<div>
                <form className="signup" onSubmit={handleSubmit}>
                    <img src="/Logo.png" alt="logo" />
                    <h1>Create Account</h1>
                    <div className="form-input-boxes">
                        <div className="form-input-box">
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            /> <i>Email</i>
                        </div>
                        <div className="form-input-box">
                            <input
                                type="username"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                            /> <i>Username</i>
                        </div>
                        <div className="form-input-box">
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            /> <i>Password</i>
                        </div>
                        <div className="form-input-box">
                            <input
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                required
                            /> <i>Password Confirmation</i>
                        </div>
                    </div>

                    <button disabled={isLoading}>Sign up</button>
                    {error && <div className="error">{error}</div>}
                    {passwordError && <div className="error">{passwordError}</div>}
                </form>
                <div className="redirect-box">
                    <span>Already have an account? <a href="/login">Log in</a></span>
                </div>
            </div>)}
        </>
    )
}

export default Signup