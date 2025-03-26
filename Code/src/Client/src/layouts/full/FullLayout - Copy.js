import React, { useState } from "react";
import { styled, Container, Box, Stack, Tooltip, Fab } from '@mui/material';
import { IconMessageChatbot } from '@tabler/icons-react';



import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import { Outlet } from "react-router";
// import Topbar from "./header/Topbar";

const MainWrapper = styled('div')(() => ({
  display: 'flex',
 // minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const FullLayout = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <>
      {/* ------------------------------------------- */}
      {/* Topbar */}
      {/* ------------------------------------------- */}
      {/* <Topbar /> */}
      <MainWrapper
        className='mainwrapper'
      >

        {/* ------------------------------------------- */}
        {/* Sidebar */}
        {/* ------------------------------------------- */}
        <Sidebar isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)} />


        {/* ------------------------------------------- */}
        {/* Main Wrapper */}
        {/* ------------------------------------------- */}
        <PageWrapper
          className="page-wrapper"
        >
          {/* ------------------------------------------- */}
          {/* Header */}
          {/* ------------------------------------------- */}
          {/* <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} /> */}
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}
          <Container sx={{
            paddingTop: "20px",
            maxWidth: '1200px',
          }}
          >
            {/* ------------------------------------------- */}
            {/* Page Route */}
            {/* ------------------------------------------- */}
            <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
              <Outlet />
            </Box>
            {/* ------------------------------------------- */}
            {/* End Page */}
            {/* ------------------------------------------- */}
          </Container>
        </PageWrapper>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="center"
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000, // Ensure the FAB stays on top of other elements
          }}
        >
          <Tooltip title="Ask me anything">
            <Fab color="secondary" variant="outline" aria-label="bot">
              <IconMessageChatbot width={40} />
            </Fab>
          </Tooltip>
        </Stack>
      </MainWrapper>
    </>
  );
};

export default FullLayout;
