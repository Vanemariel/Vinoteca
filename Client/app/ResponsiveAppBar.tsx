'use client';

import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

const routes = [
  {
    label: 'Provedores',
    path: '/provedores',
  },
  {
    label: 'Productos',
    path: '/productos',
  },
  {
    label: 'Ventas',
    path: '/ventas',
  },
  {
    label: 'Compras',
    path: '/compras',
  },

  {
    label: 'Historial Ventas',
    path: '/ventasHistorial',
  },
  {
    label: 'Historial Compras',
    path: '/comprasHistorial',
  },
  {
    label: 'Caja',
    path: '/caja',
  },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  const pathName = window.location.pathname;
  const isHomePage = pathName === '/';

  return (
    <>
      {!isHomePage && (
        <AppBar sx={{ background: "gray"}} position='static'>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Image src='/wine-logo.png' width={50} height={50} alt='logo' />
              </Box>

              <Typography
                variant='h6'
                noWrap
                component='a'
                href='/'
                sx={{
                  mr: 2,
                  ml: 1,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}>
                VINOTECA
              </Typography>

              {!isHomePage && (
                <>
                  <Box
                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size='large'
                      aria-label='account of current user'
                      aria-controls='menu-appbar'
                      aria-haspopup='true'
                      onClick={handleOpenNavMenu}
                      color='inherit'>
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id='menu-appbar'
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: 'block', md: 'none' },
                      }}>
                      {routes.map(({ label, path }) => (
                        <Link href={path} key={path}>
                          <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign='center'>{label}</Typography>
                          </MenuItem>
                        </Link>
                      ))}
                    </Menu>
                  </Box>

                  <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <Image src='/wine-logo.png' width={50} height={50} alt='logo' />
                  </Box>

                  <Typography
                    variant='h5'
                    noWrap
                    component='a'
                    href=''
                    sx={{
                      mr: 2,
                      ml: 1,
                      display: { xs: 'flex', md: 'none' },
                      flexGrow: 1,
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.2rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    VINOTECA
                  </Typography>

                  <Box
                    sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {routes.map(({ label, path }) => (
                      <Link href={path} key={path}>
                        <Button
                          onClick={handleCloseNavMenu}
                          sx={{ my: 2, color: 'white', display: 'block' }}>
                          {label}
                        </Button>
                      </Link>
                    ))}
                  </Box>

                  <Box sx={{ flexGrow: 0 }}>
                    <Menu
                      sx={{ mt: '45px' }}
                      id='menu-appbar'
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}>
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography textAlign='center'>{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
}

export default ResponsiveAppBar;
