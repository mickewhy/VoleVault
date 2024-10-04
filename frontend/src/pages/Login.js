import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(credential, password)
    }

    return (
        <div>
            <form className="login" onSubmit={handleSubmit}>
                <img src="/Logo.png" alt="logo" />
                <h1>Welcome Back</h1>
                <div className="form-input-boxes">
                    <div className="form-input-box">
                        <input
                            type="text"
                            onChange={(e) => setCredential(e.target.value)}
                            value={credential}
                            required
                        /> <i>Username or Email</i>
                    </div>
                    <div className="form-input-box">
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        /> <i>Password</i>
                    </div>
                </div>
                <a href="/reset">Forgot password?</a>
                <button disabled={isLoading}>Log in</button>
                {error && <div className="error">{console.log(error)}</div>}
            </form>
            <div className="redirect-box">
                <span>Don't have an account? <a href="/signup">Sign up</a></span>
            </div>
        </div>
    )
}

export default Login