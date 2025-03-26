import React, { useState } from "react";
import { IconButton, styled, Container, Box, Stack, Tooltip, Fab, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Modal, Typography } from '@mui/material';
import { IconMessageChatbot, IconX } from '@tabler/icons-react';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import { Outlet } from "react-router";

// import Topbar from "./header/Topbar";

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const CustomTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
    '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));


const FullLayout = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // State to control the visibility of the chatbot modal
  const [isChatOpen, setChatOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' }
  ]);

  const handleClose = () => {
    setChatOpen(false);
  };
  const fetchAIChat = async (message) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/incidents/chat?message=' + encodeURIComponent(message), {
        method: 'POST',
        body: JSON.stringify({ message })
      }); // Replace with your actual API URL
      const data = await response.json();
      setMessages([
        ...messages,
        { sender: 'user', text: message },
        { sender: 'bot', text: data.data.message }
      ]);
      setUserInput('');
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };
  // Function to handle user input and simulate chatbot response
  const handleUserInput = () => {
    const input = (userInput || '').trim();
    if (input) {
      fetchAIChat(input);
    }
  };

  return (
    <>
      <MainWrapper
        className='mainwrapper'
      >
        <Sidebar isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)} />

        <PageWrapper
          className="page-wrapper"
        >
     

           <Box sx={{ textAlign: "center", padding: "20px 0" }}>
    <Typography variant="h3" fontWeight="700" color="primary">
    Gen Al Integrated Platform Support Environment (IPE)
    </Typography>
  </Box>

          <Container sx={{
            paddingTop: "20px",
            maxWidth: '1200px',
          }}>
            <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
              <Outlet />
            </Box>
          </Container>
        </PageWrapper>

        {/* Chatbot Floating Action Button */}
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
            <Fab color="secondary" variant="outlined" aria-label="bot" onClick={() => setChatOpen(true)}>
              <IconMessageChatbot width={40} />
            </Fab>
          </Tooltip>
        </Stack>






        <Modal open={isChatOpen} onClose={handleClose} aria-labelledby="modal-title" style={{ overflow: 'auto', maxHeight: '700px' }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2
            }}
          >
            <Typography id="modal-title" variant="h4">
              Chat with Us
            </Typography>
            <IconButton
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: 8,
                right: 0,
                padding: 0,
                color: 'gray'
                
              }}>
              <IconX />
            </IconButton>
            {messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'baseline' }}>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={700} style={{ marginRight: '5px' }}>
                  {msg.sender === 'bot' ? 'Bot:' : 'You:'}
                </Typography>
                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                  {msg.text}
                </Typography>
              </div>
            ))}
            <CustomTextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              placeholder="Ask me anything..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUserInput()}
                        
            />
            {/* Right-Aligned Close Button */}
            <Stack spacing={1} direction={{ xs: 'column', sm: 'row', mt: 5, mb: 5 }} justifyContent="right" style={{ marginTop: '10px' }}>
              <Button onClick={handleUserInput} variant="contained" color="primary">
                Send
              </Button>
              {/* <Button onClick={handleClose} variant="contained" color="error">
                Close
              </Button> */}


            </Stack>
          </Box>
        </Modal>
      </MainWrapper>
    </>
  );
};

export default FullLayout;
