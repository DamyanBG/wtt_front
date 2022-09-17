import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import './Sidebar.scss';

import {
  Drawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useMediaQuery,
  Grid,
  Typography,
} from '@mui/material';

import MapIcon from '@mui/icons-material/Map';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ForestOutlinedIcon from '@mui/icons-material/ForestOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import GrassIcon from '@mui/icons-material/Grass';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import wttLogo from '@/assets/images/addtree/treefattrunk.png';

export default function Sidebar() {
  const { isAuthenticated, logout } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (isAuthenticated) {
      // Only logging out to the root seems to be allowed, so if the user is on a subpage like
      // /contact, they'll be sent back to /.
      logout({ returnTo: location.origin });
    } else {
      loginToCurrentPage();
    }
  };

  //if screen width > 900px isLarge == true, else isLarge == false
  const isLarge = useMediaQuery('(min-width:900px)');

  //listens for if window size changes from md to lg or vice versa
  React.useEffect(() => {
    setOpen(isLarge);
  }, [isLarge]);

  //Data to be displayed from the top of the sidebar
  const sidebarTop = [
    {
      title: 'Navigation',
      items: [
        {
          text: 'Map',
          icon: <MapIcon />,
          path: '/map',
        },
        { text: 'About', icon: <InfoOutlinedIcon />, path: '/about' },
        { text: 'Contact', icon: <MailOutlinedIcon />, path: '/contact' },
        { text: 'Data', icon: <AssessmentIcon />, path: '/data' },
      ],
    },
    {
      title: 'Personal',
      items: [
        {
          text: 'My Trees',
          icon: <ForestOutlinedIcon />,
          path: '/userprofile',
        },
        {
          text: 'Activity',
          icon: <NotificationsNoneIcon />,
          path: '/userprofile',
        },
      ],
    },
    {
      title: 'Input',
      items: [{ text: 'Plant', icon: <GrassIcon />, path: '/' }],
    },
  ];

  //Data to be displayed from the bottom of the sidebar
  const sidebarBottom = [
    {
      title: 'General',
      items: [
        {
          text: 'Help',
          icon: <HelpOutlineOutlinedIcon />,
          path: '/',
        },
        { text: 'Settings', icon: <SettingsIcon />, path: '/' },
      ],
    },
    {
      title: 'Auth',
      items: [
        {
          text: isAuthenticated ? 'Logout' : 'Login',
          icon: <LoginIcon />,
          path: null,
        },
      ],
    },
  ];

  const drawerOpen = '248px';
  const drawerClosed = '80px';

  return (
    <Drawer
      variant="permanent"
      id="Sidebar"
      sx={{
        width: open ? drawerOpen : drawerClosed,
      }}
      PaperProps={{
        sx: {
          width: open ? drawerOpen : drawerClosed,
          /** Had to put padding on list and grid items indead of whole drawer for text above button groups to align properly **/
          // padding: open ? '24px 24px 16px' : '24px 16px 16px',
          justifyContent: 'flex-end',
        },
      }}
    >
      <Grid
        container
        direction="column"
        sx={{
          height: '100vh',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
        }}
      >
        <Grid item>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{
              maxWidth: open ? drawerOpen : drawerClosed,
              padding: open ? '24px 24px' : '24px 16px',
            }}
          >
            <Grid item>
              <img
                src={wttLogo}
                alt="WTT logo"
                className="sidebar__logo"
                style={{ marginRight: open ? '8px' : '0px' }}
              />
            </Grid>
            <Grid item sx={{ display: open ? 'inline' : 'none' }}>
              <div
                className="title__font"
                style={{ marginRight: open ? '8px' : '0px' }}
              >
                WATER THE TREES
              </div>
            </Grid>
            <Grid item onClick={() => setOpen(!open)}>
              <div className="toggle__button">
                {open ? (
                  <ArrowBackIosNewIcon fontSize="inherit" />
                ) : (
                  <ArrowForwardIosIcon fontSize="inherit" />
                )}
              </div>
            </Grid>
          </Grid>

          <List disablePadding>
            {sidebarTop.map((list) => {
              const { title, items } = list;
              return (
                <div key={title}>
                  <Typography
                    align={open ? 'left' : 'center'}
                    sx={{
                      fontFamily: 'Montserrat',
                      padding: open ? '0px 24px' : '0px 0px',
                    }}
                  >
                    {title}
                  </Typography>

                  {items.map((item) => {
                    const { text, icon, path } = item;

                    return (
                      <ListItem
                        key={text}
                        component={Link}
                        to={path}
                        sx={{ padding: open ? '4px 24px' : '4px 16px' }}
                      >
                        <ListItemButton
                          disableGutters
                          sx={{
                            justifyContent: 'center',
                            maxWidth: open ? '200px' : '48px',
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: '40px',
                              justifyContent: open ? 'start' : 'center',
                            }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={text}
                            sx={{ display: open ? 'inline' : 'none' }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                  {title === 'Input' ? null : (
                    <hr
                      style={{
                        borderTop: '0.5px solid #323232',
                        margin: open ? '16px 24px' : '16px 16px',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </List>
        </Grid>
        <Grid item>
          <List disablePadding sx={{ paddingBottom: '16px' }}>
            {sidebarBottom.map((list) => {
              const { title, items } = list;
              return (
                <div key={title}>
                  {title === 'Auth' ? null : (
                    <Typography
                      align={open ? 'left' : 'center'}
                      sx={{
                        fontFamily: 'Montserrat',
                        padding: open ? '0px 24px' : '0px 0px',
                      }}
                    >
                      {title}
                    </Typography>
                  )}

                  {items.map((item) => {
                    const { text, icon, path } = item;

                    return (
                      <ListItem
                        key={text}
                        component={path ? Link : null}
                        to={path ? path : null}
                        sx={{ padding: open ? '4px 24px' : '4px 16px' }}
                      >
                        <ListItemButton
                          disableGutters
                          onClick={() =>
                            text === 'Logout' || text === 'Login'
                              ? handleClick()
                              : null
                          }
                          sx={{
                            justifyContent: 'center',
                            maxWidth: open ? '200px' : '48px',
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: '40px',
                              justifyContent: open ? 'start' : 'center',
                            }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={text}
                            sx={{ display: open ? 'inline' : 'none' }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                  {title === 'Auth' ? null : (
                    <hr
                      style={{
                        borderTop: '0.5px solid #323232',
                        margin: open ? '16px 24px' : '16px 16px',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Drawer>
  );
}
