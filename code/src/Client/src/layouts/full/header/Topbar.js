import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, Button } from '@mui/material';
import adminmartLogo from '../../../assets/images/logos/logo-wrappixel.svg';
import { IconLifebuoy, IconGift, IconBriefcase } from '@tabler/icons-react';
import { Typography } from '@mui/material';
import { Link } from 'react-router';
import LivePreviewDropdown from './LivePreviewDropdown';
import BuyNowDropdown from './BuyNowDropdown';


const Topbar = (props) => {


  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.grey[600],
    zIndex: "50",
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '61px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  const GhostButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.transparent,
    boxShadow: "none",
    borderRadius: "7px",
    fontWeight: 500,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    "& .MuiButton-startIcon": {
      marginRight: "4px",
    }
  }));

  return (
    <AppBarStyled position="sticky" color="default">
    </AppBarStyled>
  );
};


export default Topbar;
