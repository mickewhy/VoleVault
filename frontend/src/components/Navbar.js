import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BurgerMenu from './BurgerMenu'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0)
  const { logout } = useLogout()
  const { user } = useAuthContext()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="header-container">
        <BurgerMenu />
        <Link to="/">
          <img src="https://media.discordapp.net/attachments/932866678126161960/1281806964707295325/Untitled645.png?ex=66dd0f43&is=66dbbdc3&hm=4b9e19cdd690c927dd8f888f6e6c3cfe0689ea9d7cd312694ba758efce1bd13b&" alt="VoleVault" style={{ maxWidth: `${scrollY > 0 ? 200 : 350}px` }} />
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.username}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar