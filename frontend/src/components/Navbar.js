import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BurgerMenu from './BurgerMenu'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0)
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const clickLogOut = () => {
    logout()
    navigate('/')
  }

  const clickLogIn = () => {
    logout()
    navigate('/login')
  }
  const clickSignUp = () => {
    logout()
    navigate('/signup')
  }

  return (
    <header>
      <div className="header-container">
        <div className="header-left">
          <BurgerMenu />
          <Link to="/">
            <img src="https://media.discordapp.net/attachments/932866678126161960/1281806964707295325/Untitled645.png?ex=66dd0f43&is=66dbbdc3&hm=4b9e19cdd690c927dd8f888f6e6c3cfe0689ea9d7cd312694ba758efce1bd13b&" alt="VoleVault" style={{ maxWidth: `${scrollY > 0 ? 200 : 350}px` }} />
          </Link>
        </div>
        <div className="header-right">
          {user && (
            <nav>
              <h3>{user.username}</h3>
              <button id='style2' onClick={clickLogOut}>Log out</button>
            </nav>
          )}
          {!user && (
            <nav>
              <button id='style1' onClick={clickLogIn}>Log in</button>
              <button id='style2' onClick={clickSignUp}>Sign up</button>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar