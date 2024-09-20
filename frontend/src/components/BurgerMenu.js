import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PublishIcon from '@mui/icons-material/Publish'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import PersonIcon from '@mui/icons-material/Person'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'


const BurgerMenu = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setState({ ...state, [anchor]: open })
  }

  const list = (anchor, navigate) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ paddingLeft: '16px', paddingRight: '16px' }}>
        {['Home', 'Collections', 'Submissions', 'Taxa List'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{
              color: 'white',
              // borderRadius: '10px',
              '&:hover': {
                backgroundColor: '#333',
              },
            }} onClick={() => navigate(
              index === 0 ? '/' :
                index === 1 ? '/collections' :
                  index === 2 ? '/submissions' :
                    '/taxa'
            )}>
              <ListItemIcon sx={{ color: 'white' }}>
                {index === 0 ? <HomeIcon /> :
                  index === 1 ? <DashboardIcon /> :
                    index === 2 ? <PublishIcon /> :
                      <FormatListBulletedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: '#222', maxWidth: '95%', justifySelf: 'center', margin: 'auto' }} />
      <List sx={{ paddingLeft: '16px', paddingRight: '16px' }}>
        {['Contact'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{
              color: 'white',
              // borderRadius: '10px',
              '&:hover': {
                backgroundColor: '#333',
              },
            }} onClick={() => navigate(
              index === 0 ? '/contact' : ''
            )}>
              <ListItemIcon sx={{ color: 'white' }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div className="burger-menu-icon">
      {/* {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>   
      ))} */}
      <React.Fragment>
        <MenuIcon
          onClick={toggleDrawer("top", true)}
          style={{ cursor: "pointer", fill: "white" }}
        />
        <Drawer
          anchor={"top"}
          open={state["top"]}
          onClose={toggleDrawer("top", false)}
          PaperProps={{
            sx: {
              border: '1px solid #222',
              // borderBottomLeftRadius: '10px',
              // borderBottomRightRadius: '10px',
              // backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backgroundColor: '#111',
              width: '50%',
              justifySelf: 'center',
              overflow: 'visible',
            }
          }}
        >
          {list("top", useNavigate())}
        </Drawer>
      </React.Fragment>
    </div>
  )
}

export default BurgerMenu