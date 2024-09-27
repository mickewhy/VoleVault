import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(username, email, password)
    }

    return (
        <div>
            <form className="signup" onSubmit={handleSubmit}>
                <img src="https://media.discordapp.net/attachments/932866678126161960/1281807802473381929/Untitled646.png?ex=66e4f90a&is=66e3a78a&hm=3c94d00f0f0ea82a31dd5dfde41e92cba73c83a1b3bc5a2831ff034150c35d6f&" alt="logo" />
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
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        /> <i>Password Confirmation</i>
                    </div>
                </div>

                <button disabled={isLoading}>Sign up</button>
                {error && <div className="error">{error}</div>}
            </form>
            <div className="redirect-box">
                <span>Already have an account? <a href="/login">Log in</a></span>
            </div>
        </div>
    )
}

export default Signup