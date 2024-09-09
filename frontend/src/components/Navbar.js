import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import BurgerMenu from './BurgerMenu'

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0); // Initial scroll position

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update scrollY on scroll event
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, []);

  return (
    <header>
      <div className="container">
        <BurgerMenu />
        <Link to="/">
          <img src="https://media.discordapp.net/attachments/932866678126161960/1281806964707295325/Untitled645.png?ex=66dd0f43&is=66dbbdc3&hm=4b9e19cdd690c927dd8f888f6e6c3cfe0689ea9d7cd312694ba758efce1bd13b&" alt="VoleVault" style={{ maxWidth: `${scrollY > 0 ? 200 : 350}px` }} />
        </Link>
      </div>
    </header>
  );
}

export default Navbar;