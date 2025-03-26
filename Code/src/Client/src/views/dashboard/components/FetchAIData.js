import React, { useEffect, useState } from "react";
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip, Select, MenuItem, IconButton, Link, Button,
    Modal,
    Stack
} from '@mui/material';
import { IconInfoCircle, IconRefresh, IconX, IconRobot } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';


const severityColors = {
    High: 'error.main',
    Medium: 'secondary.main',
    Low: 'primary.main',
    Critical: 'success.main'
};
const statusColors = {
    Escalated: 'error.main',
    Medium: 'secondary.main',
    Active: 'primary.main',
    Resolved: 'success.main'
};
function convertToLocalTime(utcDate) {
    const date = new Date(utcDate);
    return date.toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // AM/PM format
    });
}

const IncidentList = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [incidents, setIncidents] = useState([]);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [selectedBotIncident, setSelectedBotIncident] = useState(null);
    const [selectedAIBotResponse, setSelectedAIBotResponse] = useState([]);

    const handleOpen = (selectedIncident) => {
        if (selectedIncident) { // Ensure selectedIncident exists before opening modal
            setSelectedIncident(selectedIncident);
            setOpen(true);
        }    
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedIncident(null); // Reset incident data on close
        setSelectedBotIncident(null);
    };

    const handleRunCheck = () => {
        // Generate random CPU and memory usage
        const cpuUsage = (Math.random() * 100).toFixed(2); // Random between 0-100%
        const memoryUsage = (Math.random() * 32).toFixed(2); // Assuming max 32GB RAM
        setOpen(true)
    }
        

    const fetchAIIncident = async (incidentId) => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/incidents/' + incidentId); // Replace with your actual API URL
            const data = await response.json();
            setSelectedAIBotResponse(data.data.resolution.resolution_steps);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching incidents:", error);
            setLoading(false);
        }
    };
    const handleBotOpen = (selectedIncident) => {
        if (selectedIncident) { // Ensure selectedIncident exists before opening modal
            fetchAIIncident(selectedIncident.incidentId);
            setSelectedBotIncident(selectedIncident);
            setOpen(true);
        }
    };
    const handleBotClose = () => {
        setOpen(false);
        setSelectedIncident(null);
        setSelectedBotIncident(null); // Reset incident data on close
    };
    const checkIncidents = (incidents) => {
        if (incidents.relatedIncidents) {
            return incidents.relatedIncidents.join(', ');
        }
        return '';
    }
    // select
    // const [month, setMonth] = React.useState('1');

    // const handleChange = (event) => {
    //     setMonth(event.target.value);
    // };
    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/incidents'); // Replace with your actual API URL
                const data = await response.json();
                setIncidents(data.data.rows);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching incidents:", error);
                setLoading(false);
            }
        };

        fetchIncidents();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (

        <DashboardCard title="Incidents"
            action={
                <Button variant="outlined" color="secondary" endIcon={<IconRefresh width={18} />}>
                    Sync
                </Button>

            }
        >
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Assigned Team
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Server
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Last Updated
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Priority
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                </Typography>
                            </TableCell>
                            {/* <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Instructions
                                </Typography>
                            </TableCell> */}
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Action
                                </Typography>
                            </TableCell>
                            {/* <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Info
                                </Typography>
                            </TableCell> */}
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Bot
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {incidents.map((incident) => (
                            <TableRow key={incident.incidentId}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {incident.incidentId}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {incident.assignedTeam}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {incident.post}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {(incident.server)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {convertToLocalTime(incident.lastUpdated)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: severityColors[incident.severity],
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={incident.severity}
                                    ></Chip>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: statusColors[incident.status],
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={incident.status}
                                    ></Chip>
                                    {/* <Typography variant="h6">{incident.status}</Typography> */}
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" size="small"
                                        disabled={incident.status === 'Resolved'} // Disables the button when isDisabled is true
                                        onClick={() => handleOpen(incident)} >
                                        Execute
                                    </Button>
                                    {/* <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {(incident.status)}
                                    </Typography> */}
                                </TableCell>
                                {/* <TableCell>

                                    <Link href={`/incident-info/${incident.incidentId}`} underline="none">
                                        <IconButton
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                mr: 1,
                                            }}
                                        >
                                            <IconInfoCircle />
                                        </IconButton>
                                    </Link>
                                </TableCell> */}
                                <TableCell>
                                    {/* <Link href={`/incident-bot/${incident.incidentId}`} underline="none"> */}
                                    <IconButton
                                        variant="contained"
                                        color="primary"
                                        disabled={incident.status === 'Resolved'}
                                        sx={{
                                            mr: 1,
                                        }}
                                        onClick={() => handleBotOpen(incident)}
                                    >
                                        <IconRobot />

                                    </IconButton>
                                    {/* </Link> */}

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            {selectedIncident && (
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
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
                            borderRadius: 2,
                        }}
                    >
                        <Typography id="modal-title" variant="h4">
                            {selectedIncident ? selectedIncident.incidentId : "No Data"}
                        </Typography>
                        <IconButton
                            onClick={handleClose}
                            style={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                padding: 0,
                                color: 'gray'
                            }}>
                            <IconX />
                        </IconButton>

                        {/* <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Property
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Value
                                    </Typography>
                                </TableCell>

                            </TableRow>
                        </TableHead> */}
                        <TableBody>
                            <TableRow key={selectedIncident.incidentId}>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={700}>
                                        Incident Id
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {selectedIncident.incidentId}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow key={selectedIncident.server}>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={700}>
                                        Server
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {selectedIncident.server}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow key={selectedIncident.assignedTeam}>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={700}>
                                        Assigned Team
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {selectedIncident.assignedTeam}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow key={selectedIncident.description}>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={700}>
                                        Description
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {selectedIncident.description}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow key={selectedIncident.severity}>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={700}>
                                        Severity
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {selectedIncident.severity}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow key={selectedIncident.status}>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={700}>
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {selectedIncident.status}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>


                        {/* Right-Aligned Close Button */}
                        <Stack spacing={1} direction={{ xs: 'column', sm: 'row', mt: 2 }} justifyContent="right">

                            <Button onClick={handleClose} variant="contained" color="error">
                                Esclate
                            </Button>
                            <Button onClick={handleRunCheck} variant="contained" color="primary">
                                Run Check
                            </Button>

                            {/* <Button onClick={handleClose} variant="outlined" color="primary">
                                Close
                            </Button> */}
                        </Stack>
                    </Box>
                </Modal>
            )}
            {selectedBotIncident && (
                <Modal open={open} onClose={handleBotClose} aria-labelledby="modal-title">
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 900,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography id="modal-title" variant="h4">
                            {selectedBotIncident ? selectedBotIncident.incidentId : "No Data"}
                        </Typography>
                        <IconButton
                            onClick={handleBotClose}
                            style={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                padding: 0,
                                color: 'gray'
                            }}>
                            <IconX />
                        </IconButton>

                        {/* <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Property
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Value
                                    </Typography>
                                </TableCell>

                            </TableRow>
                        </TableHead> */}
                        <TableBody>
                            <TableRow key={selectedBotIncident.aiRecommendations}>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={700}>
                                        Related Incidents
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {selectedBotIncident.aiRecommendations.map((ele) => (
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {checkIncidents(ele)}
                                        </Typography>
                                    ))}
                                </TableCell>
                            </TableRow>

                            <TableRow key={selectedAIBotResponse}>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={700}>
                                        Suggestion
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {selectedAIBotResponse.map((ele) => (
                                        <div>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={500}>
                                                {ele.step}
                                            </Typography>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={300}>
                                                {ele.description}
                                            </Typography>
                                        </div>

                                    ))}
                                </TableCell>
                            </TableRow>
                        </TableBody>


                        {/* Right-Aligned Close Button */}
                        <Stack spacing={1} direction={{ xs: 'column', sm: 'row', mt: 2 }} justifyContent="right">

                            <Button onClick={handleBotClose} variant="contained" color="primary">
                                Close
                            </Button>

                            {/* <Button onClick={handleBotClose} variant="outlined" color="primary">
                                Close
                            </Button> */}
                        </Stack>
                    </Box>
                </Modal>
            )}
        </DashboardCard>
    );
};

export default IncidentList;
