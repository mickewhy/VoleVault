import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = async () => {
        // await fetch('/user/logout', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     // body: JSON.stringify({ credential, password })
        // })
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}